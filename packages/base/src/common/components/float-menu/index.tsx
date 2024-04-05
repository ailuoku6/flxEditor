import React, { ReactNode, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Editor, Range } from 'slate';
import { useFocused, useSlate } from 'slate-react';
import { EditorHelper } from '../../../core';

import './index.css';

export const Portal = ({ children }: { children?: ReactNode }) => {
    return typeof document === 'object'
        ? ReactDOM.createPortal(children, document.body)
        : null
}

export const FloatMenu = ({ editorHelper }: { editorHelper: EditorHelper }) => {
    const ref = useRef<HTMLDivElement>(null)
    const editor = useSlate()
    const inFocus = useFocused()

    useEffect(() => {
        const el = ref.current
        const { selection } = editor

        if (!el) {
            return
        }

        if (
            !selection ||
            !inFocus ||
            Range.isCollapsed(selection) ||
            Editor.string(editor, selection) === ''
        ) {
            el.removeAttribute('style')
            return
        }

        const domSelection = window.getSelection()
        if (!domSelection) {
            return;
        }
        const domRange = domSelection.getRangeAt(0)
        const rect = domRange.getBoundingClientRect()
        el.style.opacity = '1'
        el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`
        el.style.left = `${rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2}px`
    })

    return (
        <Portal>
            <div
                ref={ref}
                className='float-menu'
                onMouseDown={e => {
                    e.preventDefault()
                }}
            >
                {editorHelper.getPlugins().filter(p => p.widget?.renderWidgetOnPupup).map(p => <div key={p.name}>{p.widget?.toolBarWidget}</div>)}
            </div>
        </Portal>
    )
}