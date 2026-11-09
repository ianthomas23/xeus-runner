import { useColorMode } from '@docusaurus/theme-common';
import { useEffect, useRef } from 'react';

export default function ExampleFrame({ src }) {
  const { colorMode } = useColorMode();
  const ref = useRef(null);
  const setTheme = () => {
    ref.current.contentDocument.documentElement.dataset.theme = colorMode;
  };
  useEffect(setTheme, [colorMode]);
  return <iframe ref={ref} src={src} onLoad={setTheme} width="100%" height="800" />;
}
