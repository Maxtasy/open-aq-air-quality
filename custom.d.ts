import 'react';

declare module 'react' {
  interface CSSProperties {
    // Allow css custom properties.
    [key: `--${string}`]: string | number;
  }
}
