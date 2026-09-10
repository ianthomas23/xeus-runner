// Two kernels accessing this at the same time will cause problems.
// Need to check if another kernel is requesting the code mirror resources to avoid doing it twice.

declare const CodeMirror: any;

const CODE_MIRROR_VERSION = '6.65.7';
const CODE_MIRROR_BASE = `https://cdnjs.cloudflare.com/ajax/libs/codemirror/${CODE_MIRROR_VERSION}`;

export namespace CodeMirrorNs {
  export function applyToDiv(div: HTMLDivElement, language: string) {
    const CodeMirror = (globalThis as any).CodeMirror;
    div.classList.add('cm-s-default');
    CodeMirror.runMode(div.textContent, getLanguage(language), div, {
      lineNumbers: false,
      theme: 'default',
    });
  }

  export async function init(language: string): Promise<void> {
    language = getLanguage(language);
    await Promise.all([
      loadStylesheet(`${CODE_MIRROR_BASE}/codemirror.min.css`),
      loadScript(`${CODE_MIRROR_BASE}/codemirror.min.js`),
    ]);
    await loadScript(`${CODE_MIRROR_BASE}/addon/runmode/runmode.min.js`);
    await loadScript(`${CODE_MIRROR_BASE}/mode/${language}/${language}.min.js`);
  }

  export function supportsLanguage(language: string): boolean {
    return language !== 'shakespearelang';
  }
}

function getLanguage(input: string): string {
  input = input.toLowerCase();
  const mapping = new Map<string, string>([
    ['c', 'clike'],
    ['c++', 'clike'],
    ['lfortran', 'fortran'],
    ['sqlite', 'sql'],
    // shakespearelang not supported
  ]);
  return mapping.get(input) ?? input;
}

async function loadScript(url: string): Promise<void> {
  await import(url);
}

// Function to load a stylesheet dynamically
async function loadStylesheet(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load stylesheet: ${url}`));
    document.head.appendChild(link);
  });
}
