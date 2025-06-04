import React, { MouseEvent, useEffect, useRef, useState } from "react";
import MainButton from "../mainButton";
import { FaTimes } from "react-icons/fa";
import IconPicker from "../category/iconPicker";
import CategoriesSearch from "../category/categoriesSearch";
import { Form } from "@remix-run/react";
import { Category } from "~/types/category";
import { CategoryIcon } from "@/components/CategoryIcon";
import { MonetaryInput } from "../Monetary";

interface AddCategoryModalProps {
  onClose: () => void;
  isIncome: boolean;
  categories: Category[];
  planning: string;
}

export default function AddCategoryModal({
  onClose,
  isIncome,
  categories,
  planning,
}: AddCategoryModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [name, setName] = useState<string>("");
  const [nameOnFocus, setNameOnFocus] = useState<boolean>(false);
  const [isIconPickerOpen, setIsIconPickerOpen] = useState<boolean>(false);
  const [selectedIcon, setSelectedIcon] = useState<number>(-1);
  const [description, setDescription] = useState<string>("");
  const [uuid, setUuid] = useState<string>("");
  const categoryType = isIncome ? "Income" : "Expense";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener(
      "mousedown",
      handleClickOutside as unknown as EventListener
    );
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside as unknown as EventListener
      );
    };
  }, [onClose]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSelect = (name: string) => {
    setName(name);
    const picked = categories.find((category) => category.name === name);
    if (picked) {
      setSelectedIcon(picked.icon);
      setDescription(picked.description);
      setUuid(picked.uuid!);
    }
    setNameOnFocus(false);
  };

  const handleIconPicker = (icon: number) => {
    setSelectedIcon(icon);
    setIsIconPickerOpen(false);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setDescription(inputValue);
  };

  return (
    <Form
      method="post"
      action="/plannings"
      onSubmit={() => onClose()}
      className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div ref={modalRef} className="bg-white rounded-xl drop-shadow-xl">
        <div className="relative">
          <button
            className="absolute top-4 right-4 m-2 cursor-pointer"
            onClick={onClose}
          >
            <FaTimes className="text-wallet_orange" />
          </button>
          <p className="p-6 text-lg font-bold text-wallet_orange">
            {categoryType} Category
          </p>
        </div>
        <input name="planning" type="hidden" value={planning} />
        <div className="px-8 font-normal italic">
          <div className="flex flex-col">
            <div className="pt-2">
              <div className="px-2">name</div>
              <input name="uuid" type="hidden" value={uuid} />
              <input
                name="name"
                type="text"
                placeholder="Food"
                value={name}
                onChange={handleTitleChange}
                onFocus={() => setNameOnFocus(true)}
                maxLength={30}
                className={`rounded-xl text-sm p-2 w-full placeholder-text-sm bg-wallet_gray
                  ${ name == "" ? "border border-red-400" : "" }`}
              />
              {nameOnFocus && (
                <CategoriesSearch name={name} onSelect={onSelect} categories={categories} />
              )}
            </div>
            <div className="pt-2 flex">
              <div className="flex-grow">
                <div className="px-2">Value Planned</div>
                <MonetaryInput
                  name="planned"
                  defaultValue={0.0}
                  hideSign
                  positiveSign={isIncome}
                  className="rounded-xl text-sm p-2 w-full placeholder-text-sm bg-wallet_gray font-sans"
                />
              </div>
              <div className="m-1">
                <div className="px-2">Icon</div>
                <input name="icon" type="hidden" value={selectedIcon} />
                <button
                  name="icon"
                  onClick={() => setIsIconPickerOpen(!isIconPickerOpen)}
                  type="button"
                  className="flex items-center justify-center rounded-full text-sm p-2 bg-wallet_gray w-full"
                >
                  <CategoryIcon id={selectedIcon} />
                </button>
              </div>
            </div>
            {isIconPickerOpen && (
              <IconPicker
                selected={selectedIcon}
                handleSelection={handleIconPicker}
              />
            )}
            <div className="pt-2">
              <div className="px-2">Description</div>
              <input
                name="description"
                type="text"
                placeholder="Food expenses"
                maxLength={100}
                onChange={handleDescriptionChange}
                value={description}
                className="rounded-xl text-sm p-2 w-full placeholder-text-sm bg-wallet_gray"
              />
            </div>
          </div>
        </div>
        <div className="p-6 flex items-center justify-center">
          <MainButton
            disabled={name == ""}
            onClick={() => {}}
            type="submit"
          >
            Add Category
          </MainButton>
        </div>
      </div>
    </Form>
  );
}
