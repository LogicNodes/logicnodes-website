/// <reference types="astro/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.svg?component' {
  import type { ComponentType, SVGProps } from 'react';
  const component: ComponentType<SVGProps<SVGSVGElement>>;
  export default component;
}

declare module '*.svg?react' {
  import type { ComponentType, SVGProps } from 'react';
  const component: ComponentType<SVGProps<SVGSVGElement>>;
  export default component;
}

declare module '*.svg?url' {
  const url: string;
  export default url;
} 