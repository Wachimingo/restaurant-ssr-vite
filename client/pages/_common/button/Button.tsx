import React from "react";
//@ts-ignore
import classes from './button.module.css';

export const Button = ({ children, bubble, type, ...props }: any) => {
    let btnStyle = bubble ? 'bubble' : 'button';
    return <button className={`${classes[btnStyle]} ${classes[type]}`} {...props}>
        {children}
    </button>
}