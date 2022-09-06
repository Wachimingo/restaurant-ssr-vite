import React from 'react';
import type { ReactElement } from 'react';
import { H4 } from '../html/h/H';
import { P } from '../html/p/P';
import { Card } from '../card/Card';
import { IMG } from '../img/Img';

type CardProps = {
    name: string,
    description: string,
    price: number,
    image: string,
    children?: React.ReactNode | React.ReactNode[],
    props?: any
}

export default ({ name, description, price, image, children, ...props }: CardProps): ReactElement => <Card column>
    {children}
    <IMG src={`/_images/${image}`} width='100%' height='250px' />
    <H4>{name}</H4>
    <P>{description}</P>
    <P>${price}</P>
</Card>