import React, { ReactNode } from 'react';

interface ModalProps {
  title: string;
  children: ReactNode;
  footer: ReactNode;
  onBackdropClick?: () => void;
}

export default function Modal({ title, children, footer, onBackdropClick }: ModalProps) {
  return (
    <div
      className="modal-overlay"
      onClick={e => {
        if (e.target === e.currentTarget) onBackdropClick?.();
      }}
    >
      <div className="modal-card">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">{footer}</div>
      </div>
    </div>
  );
}
