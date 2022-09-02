import React from 'react';
import { Button } from '../../../_common/button/Button';

export const Controls = ({ children, ...props }: any) => {
    return <Button bubble {...props}>
        {children}
    </Button>
}
