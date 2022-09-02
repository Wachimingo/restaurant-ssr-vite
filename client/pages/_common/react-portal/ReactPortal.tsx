import React, { useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

const createWrapperAndAppendToBody = (wrapperId: any) => {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute("id", wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
}

export const ReactPortal = ({ children, wrapperId = 'react-portal-wrapper' }: any) => {
    const [wrapperElement, setWrapperElement] = useState<any>(null);

    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId) as HTMLElement;
        let systemCreated = false;
        if (!element) {
            systemCreated = true;
            element = createWrapperAndAppendToBody(wrapperId);
        }
        setWrapperElement(element);
        return () => {
            if (systemCreated && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }
    }, [wrapperId]);

    if (wrapperElement === null) return null;

    return createPortal(children, wrapperElement as HTMLElement);
}