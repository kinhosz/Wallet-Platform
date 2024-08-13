import { BR, EU, GB, US } from 'country-flag-icons/react/3x2';
import React, { FC, ReactNode, useState } from 'react';
import { MdChevronRight, MdKeyboardArrowDown } from 'react-icons/md';

const RowField: FC<{
    children: ReactNode;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    currency: string;
}> = ({ children, onClick, currency }) => {
    return (
        <button className="grid grid-cols-2 border border-black bg-white rounded-xl mx-1 place-items-center"
            onClick={onClick}>
            {children}
            <div className="text-xl p-4">{currency}</div>
        </button>
    );
};

const CurrencySelector: React.FC<{
    currency: string;
    saveCurrencyCode: (code: string) => void;
}> = ({
    currency,
    saveCurrencyCode,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleSelection = (selectedCurrency: string) => {
        setIsModalOpen(false);
        saveCurrencyCode(selectedCurrency);
    }

    return (
        <div className="relative">
            <button 
                className={`text-sm sm:text-lg p-2 rounded-xl flex items-center border border-black
                    shadow-lg hover:bg-wallet_orange_dark active:shadow-inner active:border-white
                    ${isModalOpen ? 'shadow-inner bg-wallet_orange_dark' : 'bg-wallet_orange'}`}
                onClick={() => setIsModalOpen(!isModalOpen)}
            >
                { currency === 'BRL' && <BR title="BRL" className="rounded-full w-10" />}
                { currency === 'EUR' && <EU title="EUR" className="rounded-full w-10" />}
                { currency === 'USD' && <US title="USD" className="rounded-full w-10" />}
                { currency === 'GBP' && <GB title="GBP" className="rounded-full w-10" />}
                <div className="hidden sm:block">{currency}</div>
                { isModalOpen ? <MdKeyboardArrowDown size={26} color="white" /> : <MdChevronRight size={26} color="white" /> }
            </button>
            { isModalOpen ? (
                <div className="absolute top-14 right-0 bg-wallet_gray rounded-xl -ml-12 sm:ml-0 text-black z-40">
                    <p className="text-center mb-4">Select your currency</p>
                    <RowField onClick={() => handleSelection('BRL')} currency={'BRL'}>
                        <BR title="Brazilian Real" className="rounded-full w-12" />
                    </RowField>
                    <RowField onClick={() => handleSelection('EUR')} currency={'EUR'}>
                        <EU title="Euro" className="rounded-full w-12" />
                    </RowField>
                    <RowField onClick={() => handleSelection('GBP')} currency={'GBP'}>
                        <GB title="British Pound Sterling" className="rounded-full w-12" />
                    </RowField>
                    <RowField onClick={() => handleSelection('USD')} currency={'USD'}>
                        <US title="United States Dollar" className="rounded-full w-12" />
                    </RowField>
                </div>
            ) : null}
        </div>
    );
};

export default CurrencySelector;
