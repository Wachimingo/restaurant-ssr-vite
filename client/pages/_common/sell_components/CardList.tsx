import React from 'react';
import { Dish } from '../../../interfaces/dish.mjs';
import { Div } from '../../_common/html/containers/Containers';
import { P } from '../../_common/html/p/P';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import Card from './core/Card';
import { Controls } from './core/Controls';

export default ({ dishes, counters, addToCart, removeFromCart }) => {
    return <>
        {
            dishes?.map((dish: Dish, i: number) => {
                return <Card key={`${dish.name}_card_${i}`} {...dish}>
                    <Div>
                        <P>Amount: {counters[i]}</P>
                    </Div>
                    <Div>
                        <Controls type='success' onClick={(): void => addToCart(dish, i)}><FaShoppingCart /></Controls>
                        <Controls type='error' onClick={(): void => removeFromCart(dish._id, dish.price, i)}><FaTrash /></Controls>
                    </Div>
                </Card>
            })
        }
    </>
}