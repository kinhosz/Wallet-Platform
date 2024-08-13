import { FC, ReactNode } from "react";

const SecondaryButton: FC<{
    children: ReactNode;
    className?: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ children, onClick, className }) => {
    return (
        <button className={`
            border border-wallet_orange text-wallet_orange rounded-full
            px-4 mx-2 text-xs hover:bg-wallet_orange_light hover:text-white
            active:border-white ${className}`
        }
            onClick={onClick}>
            {children}
        </button>
    );
}

export default SecondaryButton;
