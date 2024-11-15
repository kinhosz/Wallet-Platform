import React from 'react';
import { useCurrency } from '~/context/currency';
import { getCurrencySymbol } from '../helper/getCurrencySymbol';

const Monetary: React.FC<{
    className?: string;
    value: number;
    decorate?: boolean;
}> = ({
    className,
    value,
    decorate = false
}) => {
    const negative = Math.sign(value) === -1;
    const finalValue = Math.abs(value).toFixed(2);
    const currency = useCurrency();

    return (
        <div className={`font-sans ${ decorate ? (negative ? 'text-wallet_red': 'text-green-500') : 'text-black'} ${className}`}>
            {getCurrencySymbol(currency)}{' '}{finalValue}
        </div>
    );
};

export default Monetary;
