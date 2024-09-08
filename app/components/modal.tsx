import { MouseEvent, useEffect, useRef, useState } from "react";
import MainButton from "./mainButton";
import { useCurrency } from "~/context/currency";
import { getCurrencySymbol } from "./helper/getCurrencySymbol";

interface ModalProps {
    onClose: () => void;
}

export default function Modal({ onClose }: ModalProps) {
    const currency = useCurrency();
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        function handleClickOutside(event: MouseEvent ) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        }
        document.addEventListener('mousedown', handleClickOutside as unknown as EventListener);
        return () => {
            document.addEventListener('mousedown', handleClickOutside as unknown as EventListener);
        }
    }, [onClose]);

    const formatCurrency = (num: string) => {
        let decimal = num.replace(/\D/g, '');
        while(decimal.length < 3) decimal = "0" + decimal;
        while(decimal.length > 3 && decimal[0] == '0') decimal = decimal.slice(1);

        const symbol = getCurrencySymbol(currency);
        const formatted = symbol + " " + decimal.slice(0, -2) + "," + decimal.slice(-2);
        return formatted;
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const formattedValue = formatCurrency(inputValue);
        setValue(formattedValue);
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center">
            <div
                ref={modalRef}
                className="bg-white rounded-xl drop-shadow-xl"
            >
                <p className="p-6 text-lg font-bold text-wallet_orange">New Category</p>
                <div className="px-8 font-normal italic">
                    <div className="flex flex-col">
                        <div className="pt-2">
                            <div className="px-2">Title</div>
                            <input name="title" type="text" placeholder="Food"
                                className='rounded-xl text-sm p-2 w-full placeholder-text-sm bg-wallet_gray'
                            />
                        </div>
                        <div className="pt-2 flex">
                            <div className="w-2/3">
                                <div className="px-2">Value Planned</div>
                                <input name="value" type="text" placeholder="0,00" onChange={handleNumberChange} value={value}
                                    className='rounded-xl text-sm p-2 w-full placeholder-text-sm bg-wallet_gray font-sans'
                                />
                            </div>
                            <div className="ml-2 w-1/3">
                                <div className="px-2">Icon</div>
                                <input name="icon" type="text" placeholder="icon"
                                    className='rounded-xl text-sm p-2 w-full placeholder-text-sm bg-wallet_gray'
                                />
                            </div>
                        </div>
                        <div className="pt-2">
                            <div className="px-2">Description</div>
                            <input name="description" type="text" placeholder="Food expenses"
                                className='rounded-xl text-sm p-2 w-full placeholder-text-sm bg-wallet_gray'
                            />
                        </div>
                    </div>
                </div>
                <div className="p-6 flex items-center justify-center">
                    <MainButton onClick={() => {}}>
                        Add Category
                    </MainButton>
                </div>
            </div>
        </div>
    );
}
