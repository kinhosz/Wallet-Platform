import { FC, ReactNode } from "react";

const MainButton: FC<{
    children: ReactNode;
    className?: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    type?: "button" | "submit";
}> = ({ children, onClick, className, disabled, type }) => {

    const handleOnClick = () => {
        if (disabled) return null;
        return onClick;
    }

    return (
        <button className={
                `text-md text-white p-2 bg-wallet_orange rounded-xl border border-black shadow-lg
                hover:bg-wallet_orange_dark active:shadow-inner active:border-white ${className}
                ${ disabled ? 'button-disabled' : ''}`
            } onClick={handleOnClick} type={disabled ? `button` : type}
        >
            {children}
        </button>
    );
}

export default MainButton;
