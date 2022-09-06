import React from 'react';
//@ts-ignore
import classes from './containers.module.css';


export const Container = ({ children, backgroundImage, ...props }: any) => {
    if (backgroundImage) {
        return <div
            className={classes.backgroundContainer}
            {...props}
            style={{
                backgroundImage: `url(${backgroundImage})`
            }}
        >
            {children}
        </div>
    }
    return <div className={classes.backgroundContainer} {...props}>
        {children}
    </div>
}

export const Main = ({ children, column, row, ...props }: any) => {
    let direction = column ? 'column' : 'row';
    return <main
        className={`${classes.container} ${classes[direction]}`}
        {...props}
    >
        {children}
    </main>
}

export const Div = ({ children, column, ...props }: any) => {
    let direction = column ? 'column' : 'row';
    return <div
        className={`${classes.container} ${classes[direction]}`}
        {...props}
    >
        {children}
    </div>
}

export const Section = ({ children, column, ...props }: any) => {
    let direction = column ? 'column' : 'row';
    return <section
        className={`${classes.container} ${classes[direction]}`}
        {...props}
    >
        {children}
    </section>
}