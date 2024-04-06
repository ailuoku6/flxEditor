import React, { useMemo } from 'react';

import { IFlxEditorPlugin } from "../../../types";

import './index.css';

export const EditorToolbar = ({ plugins, className }: { plugins: IFlxEditorPlugin[], className?: string }) => {
    const categoryWidgets = useMemo(() => {
        return plugins.reduce((acc, plugin) => {

            const category = plugin.widget?.category?.label || 'unknown';

            const widget = plugin.widget?.toolbarWidget || plugin.widget?.popupWidget;

            if (widget) {
                if (!acc.get(category)) {
                    // acc[category] = [];
                    acc.set(category, []);
                }
                acc.get(category)?.push(widget);
            }
            return acc;
        }, new Map<string, React.ReactNode[]>());
    }, []);

    return <div className={`toolbar-wrap ${className || ''}`} >
        {Array.from(categoryWidgets).map(([category, widgets], index) => {
            return <React.Fragment key={category}>
                {widgets}
                {/** 分割线 */}
                {index !== categoryWidgets.size - 1 && <div className='divider' />}
            </React.Fragment>
        })}
    </div>
}