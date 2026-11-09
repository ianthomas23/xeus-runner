import typedocSidebar from './docs/api/typedoc-sidebar.cjs';

const kinds = { classes: 'Classes', interfaces: 'Interfaces', functions: 'Functions' };

function byKind(items) {
  const groups = {};
  for (const item of items) {
    const id = item.id ?? item.link.id;
    const label = kinds[id.split('/')[1]] ?? 'Namespaces';
    (groups[label] ??= []).push(item);
  }
  return Object.entries(groups).map(([label, items]) => ({ type: 'category', label, items }));
}

export default {
  docs: [
    'index',
    {
      type: 'category',
      label: 'Examples',
      items: ['examples/python_mpl'],
    },
    {
      type: 'category',
      label: 'API',
      link: { type: 'doc', id: 'api/index' },
      items: typedocSidebar.map((c) => ({ ...c, items: byKind(c.items) })),
    },
  ],
};
