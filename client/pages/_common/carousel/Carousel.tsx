import React from 'react';
import classes from './carousel.module.css';
import { IMG } from '../img/Img';

export const Carousel = ({ data }) => {
    const indicator = data?.map((item, i) => <a
        key={`indicator_${i}`}
        href={`#slide-${i}`}
        className={classes.slideIndicator}
    >
        {i + 1}
    </a>
    );
    const items = data?.map((item, i) => <span
        key={`item_${i}`}
        id={`slide-${i}`}
        className={classes.slideItem}
    >
        <IMG src={`/_images/${item.image}`} />
    </span>);

    return <div className={classes.slider}>
        {indicator}
        <div className={classes.slides}>
            {items}
        </div>
    </div>
}

export default Carousel;