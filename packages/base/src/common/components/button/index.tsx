import React from 'react';

import './index.css';

interface Props {
    onMouseDown?: (e: React.MouseEvent) => void;
    /** 推荐使用react-icons组件 */
    icon?: React.ReactNode;
    selected?: boolean;
    disabled?: boolean;
}

export const BaseButton = ({ onMouseDown, icon, disabled, selected }: Props) => {
    return <div className={`base-button ${disabled ? 'base-button-disabled' : ''} ${selected ? 'base-button-selected' : ''}`} onMouseDown={disabled ? undefined : onMouseDown}>
        {icon}
    </div>
}