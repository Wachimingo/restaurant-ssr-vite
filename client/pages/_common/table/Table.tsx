import React from 'react';
import classes from './table.module.css';

export const Table = ({ children, ...props }: any) => {
    return <table className={classes.table} {...props}>
        {children}
    </table>
}

export const TH = ({ children, ...props }: any) => {
    return <th className={classes.th} {...props}>
        {children}
    </th>
}

export const TD = ({ children, ...props }: any) => {
    return <td className={classes.th} {...props}>
        {children}
    </td>
}
export const TR = ({ children, ...props }: any) => {
    return <tr className={classes.tr} {...props}>
        {children}
    </tr>
}