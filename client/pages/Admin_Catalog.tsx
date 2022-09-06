import React, { Suspense, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { Div, Section, Main } from './_common/html/containers/Containers';
import { Modal } from './_common/modal/Modal';
import { H1, H2 } from './_common/html/h/H';
import Card from './_common/admin_catalog_components/Card';
import { FaArrowAltCircleUp, FaArrowCircleDown, FaCog, FaTrash } from 'react-icons/fa'
import { useFetch } from '../hooks/useFetch';
import { useForm } from 'react-hook-form';
import { DishForm } from './_common/admin_catalog_components/Form';
import { Controls, Bubble } from './_common/admin_catalog_components/Controls';
import type { Dish } from '../interfaces/dish.mjs';

const [get, , patch, remove] = useFetch('dishes');

const _dishes = await get({ selects: 'name description price image forToday' });

export const Catalog: FC = () => {
    const [dishes, setDishes] = useState<Dish[]>(_dishes);
    const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
    const [isPost, setIsPost] = useState<Boolean>(true);
    const { register, handleSubmit, reset, setValue, formState: { isSubmitSuccessful } } = useForm();

    const loadItem = ({ name, description, price, image, id }: Dish) => {
        setValue('name', name);
        setValue('description', description);
        setValue('price', price);
        setValue('img', image);
        setValue('id', id);
        setIsPost(false);
        setIsModalOpen(true);
    }

    const clearForm = () => {
        reset({
            name: '',
            description: '',
            price: '',
            image: '',
            img: '',
            id: '',
        });
    }
    const removeItem = async (id: string) => {
        await remove({ id });
        setDishes((dishes: Dish[]) => {
            const newDishes: Dish[] = dishes?.filter((dish: Dish) => dish._id !== id);
            return newDishes;
        });
    }

    const openPostModal = () => {
        const modal = document.createElement('link');
        modal.rel = 'stylesheet';
        modal.href = '/css/modal.css';
        document.head.appendChild(modal);
        const form = document.createElement('link');
        form.rel = 'stylesheet';
        form.href = '/css/form.css';
        document.head.appendChild(form);
        setIsPost(true);
        setIsModalOpen((isOpen: Boolean) => !isOpen);
    }

    const toggleForToday = async (id: string, forToday: Boolean) => {
        const res = await patch({ id, forToday: !forToday });
        setDishes((oldDishes: Dish[]) => {
            const newDishes: Dish[] = oldDishes.map((dish: Dish) => {
                if (dish._id === id) dish = res;
                return dish;
            })
            return newDishes;
        })
    }

    const renderDishes: ReactNode = dishes?.map((dish: Dish, i: number) => {
        return <Card key={`${dish.name}_card_${i}`} {...dish}>
            <Div>
                <Controls type='warning' onClick={() => { loadItem(dish) }}>
                    <FaCog />
                </Controls>
                <Controls type='error' onClick={() => removeItem(dish.id)}>
                    <FaTrash />
                </Controls>
                <Controls type={dish.forToday ? 'error' : 'success'} onClick={() => toggleForToday(dish._id, dish.forToday)}>
                    {
                        dish.forToday
                            ?
                            <FaArrowCircleDown />
                            :
                            <FaArrowAltCircleUp />
                    }
                </Controls>
            </Div>
        </Card>
    });

    return <>
        <Main>
            <H1>Catalog</H1>
        </Main>
        <Section>
            <Suspense>
                {renderDishes}
            </Suspense>
            <Bubble type='info' onClick={() => openPostModal()}>+</Bubble>
        </Section>
        <Modal wrapperId='catalog' isOpen={isModalOpen} setIsOpen={setIsModalOpen} setIsPost={setIsPost} clearForm={clearForm}>
            <H2>{isPost ? 'Add' : 'Modify'}</H2>
            <DishForm
                handleSubmit={handleSubmit}
                register={register}
                setIsModalOpen={setIsModalOpen}
                isPost={isPost}
                setIsPost={setIsPost}
                setDishes={setDishes}
            />
        </Modal>
    </>
}

export default Catalog;