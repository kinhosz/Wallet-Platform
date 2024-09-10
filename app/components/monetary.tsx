import React from 'react';
import { useCurrency } from '~/context/currency';
import { getCurrencySymbol } from '../helper/getCurrencySymbol';

const Monetary: React.FC<{
    className?: string;
    value: number;
}> = ({
    className,
    value
}) => {
    const negative = Math.sign(value) === -1;
    const finalValue = Math.abs(value).toFixed(2);
    const currency = useCurrency();

    return (
        <div className={`font-sans ${ negative ? 'text-wallet_red': 'text-black'} ${className}`}>
            {getCurrencySymbol(currency)}{' '}{finalValue}
        </div>
    );
};

export default Monetary;
