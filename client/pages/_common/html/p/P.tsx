import React from 'react';
import classes from './p.module.css';

export const P = ({ children, ...props }: any) => {
    return <p className={classes.paragraph}>
        {children}
    </p>
}