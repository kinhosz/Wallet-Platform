import { FC, ReactNode } from "react";

const MainButton: FC<{
    children: ReactNode;
    className?: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ children, onClick, className }) => {
    return (
        <button className={
                `text-md text-white p-2 bg-wallet_orange rounded-xl border border-black shadow-lg
                hover:bg-wallet_orange_dark active:shadow-inner active:border-white ${className}`
            } onClick={onClick}
        >
            {children}
        </button>
    );
}

export default MainButton;
