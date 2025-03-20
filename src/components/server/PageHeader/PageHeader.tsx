import React from 'react';
import styles from './PageHeader.module.scss';

export type PageHeaderProps = {
  heading: React.ReactNode;
  text?: React.ReactNode;
};

export async function PageHeader({ heading, text }: PageHeaderProps) {
  return (
    <header className={styles.Container}>
      {heading}

      {text && <div className={styles.Text}>{text}</div>}
    </header>
  );
}
