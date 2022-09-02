import React, { Suspense } from 'react';
import type { FC, ReactNode } from 'react';
import Card from './components/Card';
import { Container, Section, Main } from '../_common/html/containers/Containers';
import { H1 } from '../_common/html/h/H';
import { useFetch } from '../../hooks/useFetch';
import type { Dish } from '../../interfaces/dish.mjs';
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
    const [get] = useFetch('dishes');
    dishes = await get({ selects: 'name description price image forToday' });
}

export const Catalog: FC = () => {
    const renderDishes: ReactNode = dishes?.map((dish: Dish, i: number) => {
        return <Card key={`${dish.name}_card_${i}`} {...dish} />
    });

    return <Container>
        <Main>
            <H1>Catalog</H1>
        </Main>
        <Section>
            <Suspense>
                {renderDishes}
            </Suspense>
        </Section>
    </Container>
}

export default Catalog;