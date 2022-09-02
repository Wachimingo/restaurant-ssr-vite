import { configureStore } from '@reduxjs/toolkit';
import dishSlice from './slices/dishSlice';

export const store = configureStore({
    reducer: {
        dishes: dishSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;