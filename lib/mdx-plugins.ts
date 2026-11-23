import { existsSync } from 'fs';
import path from 'path';
import GithubSlugger from 'github-slugger';
import sharp from 'sharp';
import { visit } from 'unist-util-visit';

export type TocItem = {
  value: string;
  url: string;
  depth: number;
};

type MdNode = {
  type: string;
  value?: string;
  alt?: string | null;
  url?: string;
  depth?: number;
  name?: string;
  attributes?: unknown[];
  children?: MdNode[];
};

function toText(node: MdNode): string {
  if (node.value !== undefined) {
    return node.value;
  }

  return node.children?.map(toText).join('') ?? '';
}

export function remarkTocHeadings() {
  return (tree: MdNode, file: { data: Record<string, unknown> }) => {
    // rehype-slug also uses a fresh slugger per document, so duplicate headings get matching suffixes
    const slugger = new GithubSlugger();
    const toc: TocItem[] = [];

    visit(tree, 'heading', (node: MdNode) => {
      const value = toText(node);
      toc.push({ value, url: `#${slugger.slug(value)}`, depth: node.depth ?? 0 });
    });

    file.data.toc = toc;
  };
}

type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

// must match the sticky headings in components/MDXComponents.tsx
const STICKY_HEADING_DEPTHS = [2, 3];

// Wraps each sticky heading and its content in a <section>, so the heading unsticks once its section scrolls past
export function rehypeSectionize() {
  return (tree: HastNode) => {
    const root: HastNode = { type: 'root', children: [] };
    const open: { depth: number; node: HastNode }[] = [{ depth: 0, node: root }];

    for (const child of tree.children ?? []) {
      const match = child.type === 'element' ? /^h([1-6])$/.exec(child.tagName ?? '') : null;

      if (match) {
        const depth = Number(match[1]);

        while (open.at(-1)!.depth >= depth) {
          open.pop();
        }

        if (STICKY_HEADING_DEPTHS.includes(depth)) {
          const section: HastNode = {
            type: 'element',
            tagName: 'section',
            properties: {},
            children: [],
          };
          open.at(-1)!.node.children!.push(section);
          open.push({ depth, node: section });
        }
      }

      open.at(-1)!.node.children!.push(child);
    }

    tree.children = root.children;
  };
}

type JsxAttribute = { type: string; name?: string; value?: unknown };

function localImageFile(url: unknown): string | null {
  if (typeof url !== 'string' || !url.startsWith('/')) {
    return null;
  }

  const file = path.join(process.cwd(), 'public', url);

  return existsSync(file) ? file : null;
}

function jsxAttribute(name: string, value: unknown): JsxAttribute {
  return { type: 'mdxJsxAttribute', name, value };
}

// Sizes local images so they don't shift layout: markdown images become `<Image>`, `<Figure>` gains width/height
export function remarkImgToJsx() {
  return async (tree: MdNode) => {
    const jobs: Promise<void>[] = [];

    visit(tree, (node: MdNode, _index, parent: MdNode | undefined) => {
      if (node.type === 'image') {
        const file = localImageFile(node.url);

        if (!file) {
          return;
        }

        jobs.push(
          sharp(file)
            .metadata()
            .then(({ width, height }) => {
              const { alt, url } = node;

              node.type = 'mdxJsxTextElement';
              node.name = 'Image';
              node.attributes = [
                jsxAttribute('alt', alt),
                jsxAttribute('src', url),
                jsxAttribute('width', width),
                jsxAttribute('height', height),
              ];
              node.children = [];

              if (parent?.type === 'paragraph') {
                parent.type = 'div';
              }
            })
        );

        return;
      }

      const isJsx = node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement';

      if (!isJsx || node.name !== 'Figure') {
        return;
      }

      const attributes = (node.attributes ?? []) as JsxAttribute[];

      if (attributes.some((attribute) => attribute.name === 'width')) {
        return;
      }

      const file = localImageFile(attributes.find((attribute) => attribute.name === 'src')?.value);

      if (!file) {
        return;
      }

      jobs.push(
        sharp(file)
          .metadata()
          .then(({ width, height }) => {
            attributes.push(jsxAttribute('width', width), jsxAttribute('height', height));
          })
      );
    });

    await Promise.all(jobs);
  };
}
