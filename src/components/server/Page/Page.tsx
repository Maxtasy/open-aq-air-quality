import React from 'react';
import styles from './Page.module.scss';

export type PageProps = {
  children: React.ReactNode;
};

export function Page({ children }: PageProps) {
  return <main className={styles.Base}>{children}</main>;
}
