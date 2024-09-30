import React, { MouseEvent, useEffect, useRef, useState } from "react";
import MainButton from "../mainButton";
import { useCurrency } from "~/context/currency";
import { getCurrencySymbol } from "../../helper/getCurrencySymbol";
import { FaTimes } from "react-icons/fa";
import getCategoryIcon from "../category/getCategoryIcon";
import IconPicker from "../category/iconPicker";
import CategoriesSearch from "../category/categoriesSearch";

interface AddCategoryModalProps {
    onClose: () => void;
}

export default function AddCategoryModal({ onClose }: AddCategoryModalProps) {
    const currency = useCurrency();
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [planned, setPlanned] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [titleOnFocus, setTitleOnFocus] = useState<boolean>(false);
    const [isIconPickerOpen, setIsIconPickerOpen] = useState<boolean>(false);
    const [selectedIcon, setSelectedIcon] = useState<number>(-1);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent ) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        }
        document.addEventListener('mousedown', handleClickOutside as unknown as EventListener);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside as unknown as EventListener);
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
        setPlanned(formattedValue);
    };
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }
    const onSelect = (title: string) => {
        setTitle(title);
        setTitleOnFocus(false);
    }
    const handleIconPicker = (icon: number) => {
        setSelectedIcon(icon);
        setIsIconPickerOpen(false);
    }
    const categoryIcon = getCategoryIcon(selectedIcon);

    return (
        <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center">
            <div
                ref={modalRef}
                className="bg-white rounded-xl drop-shadow-xl"
            >
                <div className="relative">
                    <button className="absolute top-4 right-4 m-2 cursor-pointer" onClick={onClose}>
                        <FaTimes className="text-wallet_orange" />
                    </button>
                    <p className="p-6 text-lg font-bold text-wallet_orange">Add Category</p>
                </div>
                <div className="px-8 font-normal italic">
                    <div className="flex flex-col">
                        <div className="pt-2">
                            <div className="px-2">Title</div>
                            <input name="title" type="text" placeholder="Food" value={title} onChange={(handleTitleChange)}
                                onFocus={() => setTitleOnFocus(true)} maxLength={30}
                                className={`rounded-xl text-sm p-2 w-full placeholder-text-sm bg-wallet_gray
                                    ${title == '' ? 'border border-red-400' : ''}`}
                            />
                            { titleOnFocus && <CategoriesSearch title={title} onSelect={onSelect} />}
                        </div>
                        <div className="pt-2 flex">
                            <div className="flex-grow">
                                <div className="px-2">Value Planned</div>
                                <input name="planned" type="text" placeholder="0,00" onChange={handleNumberChange} value={planned}
                                    className={`rounded-xl text-sm p-2 w-full placeholder-text-sm bg-wallet_gray font-sans
                                        ${planned == '' ? 'border border-red-400' : ''}`}
                                />
                            </div>
                            <div className="m-1">
                                <div className="px-2">Icon</div>
                                <input name="icon" type="hidden" value={selectedIcon} />
                                <button name="icon" onClick={() => setIsIconPickerOpen(!isIconPickerOpen)}
                                    className='flex items-center justify-center rounded-full text-sm p-2 bg-wallet_gray w-full'
                                >
                                    { categoryIcon }
                                </button>
                            </div>
                        </div>
                        { isIconPickerOpen && <IconPicker selected={selectedIcon} handleSelection={handleIconPicker} /> }
                        <div className="pt-2">
                            <div className="px-2">Description</div>
                            <input name="description" type="text" placeholder="Food expenses"  maxLength={100}
                                className='rounded-xl text-sm p-2 w-full placeholder-text-sm bg-wallet_gray'
                            />
                        </div>
                    </div>
                </div>
                <div className="p-6 flex items-center justify-center">
                    <MainButton disabled={title == '' || planned == ''}
                        onClick={() => {}}
                    >
                        Add Category
                    </MainButton>
                </div>
            </div>
        </div>
    );
}
