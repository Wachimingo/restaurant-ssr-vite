// import config from '../config.json';
// const { SERVER, PORT, PROTOCOL } = config;
// const HOST = new URL(`${PROTOCOL}://${SERVER}:${PORT}`).href;

import type { Dish } from "../interfaces/dish.mjs";

export const useFetch = (resource: string) => {
    let fetchUrl = `/${resource.trim().toLocaleLowerCase()}`;
    //@ts-ignore
    if (import.meta.env.SSR) {
        fetchUrl = new URL(`http://127.0.0.1:3000/${resource.trim().toLocaleLowerCase()}`).href;
    }
    const get: Function = async (body?: any) => {
        const filter: Object | string = body.filter ? body.filter : '';
        const selects: string = body.selects ? body.selects : '';
        try {
            // const res = await fetch(`${ HOST }${ resource }?filter = ${ filter }& selects=${ selects } `, {
            const res: Response = await fetch(`${fetchUrl}?filter=${filter}&selects=${selects}`, {
                method: "GET",
                // mode: "cors",
                headers: {
                    "content-type": "application/json",
                }
            });
            if (res.ok) {
                const data: Dish[] = await res.json();
                return data;
            }
        } catch (error: any) {
            console.log('%cError caught in useFetch->get method:', "color: red", error.message);
            return [{}];
        }
    };

    const post: Function = async (body: any) => {
        try {
            // const res = await fetch(`${ HOST }${ resource } `, {
            const res: Response = await fetch(fetchUrl, {
                method: "POST",
                // mode: "cors",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(body)
            });
            if (res.ok) {
                const data: Dish = await res.json();
                return data;
            }
        } catch (error: any) {
            console.log('%cError caught in useFetch->post method:', "color: red", error.message);
        }
    };

    const patch: Function = async (body: any) => {
        try {
            // const res = await fetch(`${ HOST }${ resource } /${body.id}`, {
            const res: Response = await fetch(`${fetchUrl}/${body.id}`, {
                method: "PATCH",
                // mode: "cors",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(body)
            });
            if (res.ok) {
                const data: Dish = await res.json();
                return data;
            }
        } catch (error: any) {
            console.log('%cError caught in useFetch->patch method:', "color: red", error.message);
        }
    };

    const remove: Function = async (body: any) => {
        try {
            // const res = await fetch(`${HOST}${resource}/${body.id}`, {
            const res: Response = await fetch(`${fetchUrl}/${body.id}`, {
                method: "DELETE",
                // mode: "cors",
            });
            if (res.ok) {
                const data: Dish = await res.json();
                return data;
            }
        } catch (error: any) {
            console.log('%cError caught in useFetch->post remove:', "color: red", error.message);
        }
    };

    return [get, post, patch, remove];
};

export default useFetch;