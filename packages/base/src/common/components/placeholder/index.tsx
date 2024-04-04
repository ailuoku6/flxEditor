import React from 'react';

import './index.css';

export const LeafPlaceholder = ({ placeholder }: { placeholder: string }) => {
    return (
        <span data-slate-placeholder="true" contentEditable={false} className="leaf-placeholder">{placeholder}</span>
    )
}