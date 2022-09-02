import React from 'react';
import classes from './img.module.css';


export const IMG = ({ children, width, height, ...props }: any) => {
    if (width || height) {
        return <img
            {...props}
            style={{
                width: width ?? '150px',
                height: height ?? '150px'
            }}
        >
            {children}
        </img>
    }
    return <img className={classes.baseImg} {...props}>
        {children}
    </img>
}