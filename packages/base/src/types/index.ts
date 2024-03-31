import type { BaseEditor } from "slate";
// import { Node } from "slate";

declare module "slate" {
    interface CustomTypes {
        Editor: BaseEditor;
        Element: BlockElement;
        Text: TextElement;
    }
}

export interface BlockElement {
    children: BaseNode[];
    type?: string;
    className?: string;
    id?: string;
    [key: string]: unknown;
}

export interface TextElement {
    text: string;
    leafType?: string;
    className?: string;
    id?: string;
    [key: string]: unknown;
}

export interface TextBlockElement {
    children: TextElement[];
    [key: string]: unknown;
}

// type BaseElement = BlockElement | TextElement;
type BaseNode = BlockElement | TextElement | TextBlockElement;

export * from './editor';
