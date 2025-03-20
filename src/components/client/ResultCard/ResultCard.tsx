import { X } from 'lucide-react';
import React from 'react';
import styles from './ResultCard.module.scss';

export type CardProps = {
  onRemove: () => void;
  children: React.ReactNode;
};

export function ResultCard({ onRemove, children }: CardProps) {
  return (
    <div className={styles.Container}>
      {children}

      <button className={styles.Close} onClick={onRemove}>
        <X />
      </button>
    </div>
  );
}
