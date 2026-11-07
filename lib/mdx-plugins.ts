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

// Turns the first local image of a paragraph into a sized next/image `<Image>`
export function remarkImgToJsx() {
  return async (tree: MdNode) => {
    const paragraphs: MdNode[] = [];

    visit(tree, 'paragraph', (node: MdNode) => {
      if (node.children?.some((child) => child.type === 'image')) {
        paragraphs.push(node);
      }
    });

    await Promise.all(
      paragraphs.map(async (paragraph) => {
        const image = paragraph.children!.find((child) => child.type === 'image')!;
        const file = path.join(process.cwd(), 'public', image.url ?? '');

        if (!image.url?.startsWith('/') || !existsSync(file)) {
          return;
        }

        const { width, height } = await sharp(file).metadata();

        image.type = 'mdxJsxFlowElement';
        image.name = 'Image';
        image.attributes = [
          { type: 'mdxJsxAttribute', name: 'alt', value: image.alt },
          { type: 'mdxJsxAttribute', name: 'src', value: image.url },
          { type: 'mdxJsxAttribute', name: 'width', value: width },
          { type: 'mdxJsxAttribute', name: 'height', value: height },
        ];
        paragraph.type = 'div';
      })
    );
  };
}
