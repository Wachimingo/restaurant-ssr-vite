import React, { Suspense } from 'react';
import type { FC, ReactNode } from 'react';
import Card from './_common/catalog_components/Card';
import { Container, Section, Main } from './_common/html/containers/Containers';
import { H1 } from './_common/html/h/H';
import { useFetch } from '../hooks/useFetch';
import type { Dish } from '../interfaces/dish.mjs';

const [get] = useFetch('dishes');
const dishes = await get({ selects: 'name description price image forToday' });

export const Catalog: FC = (): JSX.Element => {
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