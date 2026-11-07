import type { TocItem } from '../lib/mdx-plugins';

type NestedTocItem = TocItem & { children?: NestedTocItem[] };

type TOCInlineProps = {
  toc: TocItem[];
  fromHeading?: number;
  toHeading?: number;
  asDisclosure?: boolean;
  exclude?: string | string[];
  collapse?: boolean;
  ulClassName?: string;
  liClassName?: string;
};

function createNestedList(items: TocItem[]): NestedTocItem[] {
  const nestedList: NestedTocItem[] = [];
  const stack: NestedTocItem[] = [];

  for (const item of items) {
    const newItem: NestedTocItem = { ...item };

    while (stack.length > 0 && stack[stack.length - 1].depth >= newItem.depth) {
      stack.pop();
    }

    const parent = stack.length > 0 ? stack[stack.length - 1] : null;

    if (parent) {
      parent.children = parent.children || [];
      parent.children.push(newItem);
    } else {
      nestedList.push(newItem);
    }

    stack.push(newItem);
  }

  return nestedList;
}

export function TOCInline({
  toc,
  fromHeading = 1,
  toHeading = 6,
  asDisclosure = false,
  exclude = '',
  collapse = false,
  ulClassName = '',
  liClassName = '',
}: TOCInlineProps) {
  const re = new RegExp(`^(${Array.isArray(exclude) ? exclude.join('|') : exclude})$`, 'i');

  const filteredToc = toc.filter(
    (heading) =>
      heading.depth >= fromHeading && heading.depth <= toHeading && !re.test(heading.value)
  );

  const createList = (items: NestedTocItem[] | undefined) => {
    if (!items || items.length === 0) {
      return null;
    }

    return (
      <ul className={ulClassName}>
        {items.map((item, index) => (
          <li key={index} className={liClassName}>
            <a href={item.url}>{item.value}</a>
            {createList(item.children)}
          </li>
        ))}
      </ul>
    );
  };

  const nestedList = createNestedList(filteredToc);

  if (!asDisclosure) {
    return createList(nestedList);
  }

  return (
    <details open={!collapse}>
      <summary className="ml-6 pt-2 pb-2 text-xl font-bold">Table of Contents</summary>
      <div className="ml-6">{createList(nestedList)}</div>
    </details>
  );
}
