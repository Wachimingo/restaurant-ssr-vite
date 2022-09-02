import React, { Suspense, useState } from 'react';
import type { FC } from 'react';
import type { Dish } from '../../interfaces/dish.mjs';
import { Div, Main, Section } from '../_common/html/containers/Containers';
import { Button } from '../_common/button/Button';
import { H1 } from '../_common/html/h/H';
import { Modal } from '../_common/modal/Modal';
import { useFetch } from '../../hooks/useFetch';
import CardList from './components/CardList';
import Table from './components/Table';

import { MongoDB } from '../../../server/databases/mongo/mongoDBFactory.mjs';
import DishModel from '../../../server/databases/mongo/models/dish.mjs';


let dishes: any = [{}];

//@ts-ignore
if (import.meta.env.SSR) {
    const mongoConnect = new MongoDB();
    dishes = await mongoConnect.get(DishModel);
}

//@ts-ignore
if (!import.meta.env.SSR) {
    const [get]: Function[] = useFetch('dishes');

    dishes = await get({
        filter: JSON.stringify({ forToday: true }),
        selects: 'name price image forToday'
    });
}

type Selecteds = {
    id: string,
    name: string,
    description: string,
    price: number
};

export const Sell: FC = (): JSX.Element => {
    const [counters, setCounters] = useState<number[]>(() => dishes.map(() => 0));
    const [total, setTotal] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [selecteds, setSelecteds] = useState<Selecteds[]>([]);
    const [isOpen, setIsOpen] = useState<Boolean>(false);

    const addToCart = (dish: Dish, i: number): void => {
        if (counters[i] < 1) {
            setSelecteds((oldSelecteds: Selecteds[]) => [...oldSelecteds, {
                id: dish?.id,
                name: dish?.name,
                description: dish?.description,
                price: dish?.price
            }]);
        }
        counters[i]++;
        setCounters((oldCounters: number[]) => [...oldCounters, counters[i]]);
        setTotal((oldTotal: number) => oldTotal + dish.price);
        setAmount((oldAmount: number) => oldAmount + 1);
    }

    const removeFromCart = (id: string, price: number, i: number): void => {
        if (counters[i] > 0) {
            counters[i]--;
            setCounters((oldCounters: number[]) => [...oldCounters, counters[i]]);
            setTotal((oldTotal: number) => oldTotal - price);
            setAmount((oldAmount: number) => oldAmount - 1);
        }
        if (counters[i] < 1) {
            setSelecteds((oldSelecteds) => oldSelecteds.filter((dish) => dish.id !== id));
        }
    }

    return <>
        <Main>
            <H1>Sell</H1>
        </Main>
        <Section>
            <Suspense>
                <CardList dishes={dishes} counters={counters} addToCart={addToCart} removeFromCart={removeFromCart} />
            </Suspense>
        </Section>
        <Section column>
            <Div width='50%'>
                <Table selecteds={selecteds} dishes={dishes} counters={counters} amount={amount} total={total} />
            </Div>
            <Button type="info" onClick={() => total > 0 ? setIsOpen(true) : undefined}>Checkout</Button>
        </Section>
        <Modal wrapperId='checkout' isOpen={isOpen} setIsOpen={setIsOpen}>
            <H1>Checkout Details:</H1>
            <Section column>
                <Table selecteds={selecteds} dishes={dishes} counters={counters} amount={amount} total={total} />
                <br />
                <Button type='success'>Pay now</Button>
            </Section>
        </Modal>
    </>
}

export default Sell;