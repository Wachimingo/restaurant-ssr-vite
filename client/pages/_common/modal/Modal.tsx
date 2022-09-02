import React from 'react';
import { ReactPortal } from '../react-portal/ReactPortal';
import { Div } from '../html/containers/Containers';
import classes from './modal.module.css';

export const Modal = ({ children, isOpen, setIsOpen, setIsPost, wrapperId = 'default', ...props }: any) => {
    if (!isOpen) return null;
    const closeWhenClickOutside = (event: Event) => {
        if (event.target == document.getElementById(`${wrapperId}-modal`)) {
            if (props.clearForm) props.clearForm();
            window.removeEventListener('click', closeWhenClickOutside);
            if (setIsPost) setIsPost(true);
            setIsOpen(false);
        }
    }
    window.addEventListener('click', closeWhenClickOutside);

    const closeWhenXClick = () => {
        if (props.clearForm) props.clearForm();
        if (setIsPost) setIsPost(true);
        setIsOpen(false);
    }
    return <ReactPortal wrapperId={wrapperId}>
        <Div className={classes['modal-wrapper']}>
            <Div className={classes['modal-content']} style={{ backgroundColor: 'white' }}>
                <span className={classes['close-button']} onClick={() => closeWhenXClick()}>&times;</span>
                {children}
            </Div>
        </Div>
    </ReactPortal>
}