import { MarkdownPageEvent } from 'typedoc-plugin-markdown';

const kinds = { classes: 'Classes', interfaces: 'Interfaces', functions: 'Functions' };

export function load(app) {
  app.renderer.on(MarkdownPageEvent.END, (page) => {
    if (page.url !== 'index.md') return;
    page.contents = page.contents.replace(/(^- .*\n?)+/gm, (list) => {
      const groups = {};
      for (const line of list.trim().split('\n')) {
        const label = kinds[line.match(/\]\((\w+)\//)[1]] ?? 'Namespaces';
        (groups[label] ??= []).push(line);
      }
      return Object.entries(groups)
        .map(([label, lines]) => `### ${label}\n\n${lines.join('\n')}\n`)
        .join('\n');
    });
  });
}
