import React from 'react';
import { Button } from '../button/Button';
//@ts-ignore
import classes from './components.module.css';

export const Controls = ({ children, ...props }: any) => {
    return <Button bubble {...props}>
        {children}
    </Button>
}


export const Bubble = ({ children, type, ...props }: any) => {
    return <button className={`${classes.button} ${classes[type]}`} {...props}>
        {children}
    </button>
}
