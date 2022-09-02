/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
// import { Toggle } from 'pages/_common';
import { Link } from 'react-router-dom';
//@ts-ignore
import classes from './navbar.module.css';

export const NavBar = () => {
    // const x = window.matchMedia("(min-width: 768px)");
    // const resizedWindow = (x: any) => {
    //     setIsOpen(x.matches)
    // }

    // x.addEventListener('change', resizedWindow);
    // const [isOpen, setIsOpen] = useState(x.matches);

    return (
        <div className={classes.headerWrapper}>
            <div
                className={classes.burguer}
            // onClick={() => setIsOpen(isOpen => !isOpen)}
            >
                <div />
                <div />
                <div />
            </div>
            <div className={classes.menu}>
                <div>
                    <Link className={classes.navLink} to='/'>Home</Link>
                    <Link className={classes.navLink} to='/catalog'>Catalog</Link>
                    <Link className={classes.navLink} to='sell'>Sell</Link>
                </div>
            </div>
            {/* <Toggle isActive={id === 'dark'} onToggle={setTheme} /> */}
        </div>
    )
};