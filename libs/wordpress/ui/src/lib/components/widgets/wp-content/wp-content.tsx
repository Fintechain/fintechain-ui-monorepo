import React from 'react';
import parse, { DOMNode, HTMLReactParserOptions } from 'html-react-parser';
import { convertWpToTailwind } from './wpToTailwindMap';

interface WordPressContentProps {
    content: string;
}

const WordPressContent: React.FC<WordPressContentProps> = ({ content }) => {
    const options: HTMLReactParserOptions = {
        replace: (domNode: any) => {
            if (
                domNode instanceof Element &&
                domNode.attribs &&
                domNode.attribs.class
            ) {
                domNode.attribs.class = convertWpToTailwind(domNode.attribs.class);
            }
            return domNode;
        },
    };

    return <div>{parse(content, options)}</div>;
};

export default WordPressContent;