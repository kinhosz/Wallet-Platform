import React from 'react';
import { CiWarning } from 'react-icons/ci';

const WarningField: React.FC<{
    condition: boolean;
    message: string;
}> = ({
    condition,
    message
}) => {
    if (!condition) return null;
    return (
        <div className='font-wallet_secondary text-white text-sm flex items-center'>
            <CiWarning className="mx-2" />
            <span>{message}</span>
        </div>
    );
};

export default WarningField;
