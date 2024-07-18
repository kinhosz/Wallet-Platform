import { Link } from '@remix-run/react';
import React from 'react';

const TabSheet: React.FC<{
    active: boolean;
    title: string;
    to: string;
}> = ({
    active,
    title,
    to,
}) => {
    return (
        <Link to={to} className={`w-32 h-10 text-center border-black rounded-t-xl flex items-center justify-center ${
            active ? 'bg-white text-wallet_orange border-t border-r border-l'
                : `bg-wallet_orange text-white border hover:shadow-2xl hover:bg-wallet_orange_dark
                    active:shadow-inner active:border-white`
                }`
            }
        >
            {title}
        </Link>
    )
};

export default TabSheet;
