import React from 'react';
import classes from './h.module.css';

export const H1 = ({ children, ...props }: any) => {
    return <h1 className={classes.baseH1}>
        {children}
    </h1>
}
export const H2 = ({ children, ...props }: any) => {
    return <h2 className={classes.baseH2}>
        {children}
    </h2>
}
export const H3 = ({ children, ...props }: any) => {
    return <h3 className={classes.baseH3}>
        {children}
    </h3>
}
export const H4 = ({ children, ...props }: any) => {
    return <h4 className={classes.baseH4}>
        {children}
    </h4>
}