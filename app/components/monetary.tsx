import React from 'react';
import { useCurrency } from '~/context/currency';

const MonetarySymbol: React.FC = () => {
    const currency = useCurrency();
    return (
        <>
            {currency === 'BRL' && 'R$ '}
            {currency === 'GBP' && '£ '}
            {currency === 'USD' && '$ '}
            {currency === 'EUR' && '€ '}
        </>
    );
}

const Monetary: React.FC<{
    className?: string;
    value: number;
}> = ({
    className,
    value
}) => {
    const negative = Math.sign(value) === -1;
    const finalValue = Math.abs(value).toFixed(2);

    return (
        <div className={`font-sans text-sm ${ negative ? 'text-wallet_red': 'text-black'} ${className}`}>
            <MonetarySymbol />{' '}{finalValue}
        </div>
    );
};

export default Monetary;
