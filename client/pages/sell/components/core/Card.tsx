import React from 'react';
import { Card } from '../../../_common/card/Card';
import { IMG } from '../../../_common/img/Img';
import { H4, H3 } from '../../../_common/html/h/H';

type CardProps = {
    name: string,
    description: string,
    price: number,
    image: string,
    children?: React.ReactNode | React.ReactNode[],
}

export default ({ name, price, image, children }: CardProps) => <Card column>
    <IMG src={`../_images/${image}`} width='100%' height='250px' />
    <H4>{name}</H4>
    <H3>${price}</H3>
    {children}
</Card>