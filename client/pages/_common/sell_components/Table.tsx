import React from 'react';
import { Table, TR, TH, TD } from '../table/Table';

export default ({ selecteds, dishes, counters, amount, total }) => {
    return <Table>
        <thead>
            <TR>
                <TH>Name</TH>
                <TH>Price</TH>
                <TH>Amount</TH>
                <TH>Total</TH>
            </TR>
        </thead>
        <tbody>
            {
                selecteds?.map((dish) => {
                    // const index = items.indexOf(item); // as the counter state position of the items is based in the items array, we need to get the position in that variable, else the render won't find what to render
                    const indexArray = dishes.map((OldItem: any, i: number) => {
                        if (OldItem!.name === dish.name) {
                            return i;
                        } return undefined;
                    })
                    const index: any = indexArray.filter((x: any) => { return x !== undefined });
                    return <TR key={`${dish.name}-row`}>
                        <TD>{dish.name}</TD>
                        <TD>${dish.price}</TD>
                        <TD>{counters[index]}</TD>
                        <TD>${(dish.price * counters[index]).toFixed(2)}</TD>
                    </TR>
                })
            }
            <TR>
                <TD colSpan={2}>Totals</TD>
                <TD>Plates:{amount}</TD>
                <TD>${total.toFixed(2)}</TD>
            </TR>
        </tbody>
    </Table>
}