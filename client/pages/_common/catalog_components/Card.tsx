import React from 'react';
import { Card } from '../card/Card';
import { IMG } from '../img/Img';
import { H4 } from '../html/h/H';
import { P } from '../html/p/P';

type CardProps = {
    name: string,
    description: string,
    price: number,
    image: string,
    children?: React.ReactNode | React.ReactNode[],
}

export default ({ name, description, price, image, children }: CardProps) => <Card column>
    {children}
    <IMG src={`../_images/${image}`} width='100%' height='250px' />
    <H4>{name}</H4>
    <P>{description}</P>
    <P>${price}</P>
</Card>