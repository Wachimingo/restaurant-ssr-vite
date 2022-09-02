import React from 'react';
import { Div } from '../html/containers/Containers';
import classes from './card.module.css'

export const Card = ({ children, ...props }: any) => {
    return (
        <Div className={classes.cardWrapper} {...props}>
            <Div column={props.column}>
                {children}
            </Div>
        </Div>
    )
};