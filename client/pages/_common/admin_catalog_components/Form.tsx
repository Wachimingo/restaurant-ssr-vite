import React from "react"
import { useFetch } from "../../../hooks/useFetch";
import type { Dish } from "../../../interfaces/dish.mjs";
import { toBase64 } from "../../../utils/64base";

const [, post, patch,] = useFetch('dishes');

type DishFormProps = {
    id?: string,
    image?: any
    file?: any
    img?: string,
}

export const DishForm = ({ handleSubmit, register, setIsModalOpen, isPost, setIsPost, setDishes }) => {
    const submitHandler = async (data: DishFormProps) => {
        let id = data.id;
        data.image = data?.file[0] ? await toBase64(data.file[0]) : data.img;
        data.file = undefined;
        data.img = undefined;
        if (isPost) {
            data.id = undefined;
            const res: Dish = await post(data);
            setDishes((dishes: Dish[]) => [...dishes, res])
        };
        if (!isPost) {
            const res: Dish = await patch(data);
            setDishes((dishes: Dish[]) => {
                const updatedDishes: Dish[] = dishes.map((dish: Dish) => {
                    if (dish._id === id) dish = res;
                    return dish;
                })
                id = undefined;
                return updatedDishes;
            });
            //set the form to POST again.
            setIsPost(false);
        }
        setIsModalOpen(false);
    };

    return <form onSubmit={handleSubmit(submitHandler)}>
        <label htmlFor='name'>Name:</label>
        <input type='text' id='name' {...register('name')} />

        <label htmlFor='description'>Description:</label>
        <input type='text' id='description' {...register('description')} />

        <label htmlFor='price'>Price:</label>
        <input type='number' step={0.01} pattern="^\d*(\.\d{0,2})?$" min={0} id='price' {...register('price')} />

        <label htmlFor='file'>Image:</label>
        <input type='file' id='file' {...register('file')} />

        <input type='text' id='id' {...register('id')} style={{ display: "none" }} />
        <input type='text' id='img' {...register('img')} style={{ display: "none" }} />
        <input type='submit' value='Submit' />
    </form>
}