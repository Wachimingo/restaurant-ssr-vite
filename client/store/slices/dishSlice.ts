import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Dish } from '../../interfaces/dish.mjs';

const initialState: Dish[] = [{} as any];

export const dishSlice = createSlice({
    name: 'Dishes',
    initialState,
    reducers: {
        getAllDishes: (state, action: PayloadAction<Dish[]>) => {
            state = [...state, ...action.payload];
        }
    }
});

export const { getAllDishes } = dishSlice.actions;
export default dishSlice.reducer;