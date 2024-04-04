import React from 'react';

import './index.css';

export const LeafPlaceholder = ({ placeholder, className }: { placeholder: string; className?: string }) => {
    return (
        <span data-slate-placeholder="true" contentEditable={false} className={`leaf-placeholder ${className || ''}`}>{placeholder}</span>
    )
}