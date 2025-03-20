import { cmod, cn } from '@/lib/utils';
import React from 'react';
import styles from './Text.module.scss';

export type TextProps = {
  /**
   * The element type to render the text as.
   *
   * @default 'p'
   */
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  /**
   * The variant of the text.
   *
   * @default 'body-md'
   */
  variant?: 'heading-md' | 'heading-lg' | 'heading-xl' | 'body-sm' | 'body-md' | 'body-lg';

  /**
   * The alignment of the text.
   *
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right';

  /**
   * The text transform.
   */
  transform?: 'uppercase';

  children: React.ReactNode;
};

export function Text({
  as: ComponentTag = 'p',
  variant = 'body-md',
  align = 'left',
  transform,
  children,
}: TextProps) {
  return (
    <ComponentTag
      className={cn(
        styles.Base,
        styles[cmod({ variant })],
        styles[cmod({ align })],
        transform && styles[cmod({ transform })]
      )}
    >
      {children}
    </ComponentTag>
  );
}
