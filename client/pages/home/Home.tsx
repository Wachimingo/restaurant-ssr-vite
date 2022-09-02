import React, { Suspense } from 'react';
import type { FC } from 'react';
import { Container, Div, Main, Section } from '../_common/html/containers/Containers';
import { H1, H2, H3, H4 } from '../_common/html/h/H';
import { P } from '../_common/html/p/P';
import { IMG } from '../_common/img/Img';
import { useFetch } from '../../hooks/useFetch';
import type { Dish } from '../../interfaces/dish.mjs';
import { Carousel } from '../_common/carousel/Carousel';
//@ts-ignore
import logo from '../../assets/logo.webp';
//@ts-ignore
import lunch from '../../assets/lunch.webp';
//@ts-ignore
import breakfast from '../../assets/breakfast.webp';
//@ts-ignore
import dinner from '../../assets/dinner.webp';
//@ts-ignore
import home_background from '../../assets/home_background.webp';
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

    dishes = await get({
        filter: JSON.stringify({
            forToday: true
        }),
        selects: 'image'
    });
}

export const Home: FC = () => {
    return <Container backgroundImage={home_background}>
        <Main column>
            <H1>Restaurant</H1>
            <IMG src={logo} />
            <H2>Nice taste</H2>
            <P>Today's menu:</P>
            <Suspense>
                <Carousel data={dishes} />
            </Suspense>
        </Main>
        <Section column>
            <H3>Enjoy our:</H3>
            <Div>
                <Div column>
                    <H4>Breakfast</H4>
                    <IMG src={breakfast} width='20rem' height='20rem' />
                </Div>
                <Div column>
                    <H4>Lunch</H4>
                    <IMG src={lunch} width='20rem' height='20rem' />
                </Div>
                <Div column>
                    <H4>Dinner</H4>
                    <IMG src={dinner} width='20rem' height='20rem' />
                </Div>
            </Div>
        </Section>
        <br />
    </Container>
}

export default Home;