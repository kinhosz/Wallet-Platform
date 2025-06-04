import React, { useState } from "react";
import { FaPlusMinus } from "react-icons/fa6";
import { useCurrency } from "~/context/currency";
import { getCurrencySymbol } from "~/helper/getCurrencySymbol";

const MonetaryInput: React.FC<{
  name: string;
  defaultValue: number;
  className?: string;
  hideSign?: boolean;
  positiveSign?: boolean;
}> = ({ name, defaultValue, className, hideSign = false, positiveSign = true }) => {
  const currency = useCurrency();
  const [negative, setNegative] = useState(Math.sign(defaultValue) === -1);

  const addCurrencyPrefix = (num: string, negative: boolean) => {
    let decimal = num.replace(/\D/g, "");
    while (decimal.length < 3) decimal = "0" + decimal;
    while (decimal.length > 3 && decimal[0] == "0") decimal = decimal.slice(1);

    const symbol = getCurrencySymbol(currency);
    const sign_symbol = (hideSign ? '' : (negative ? '-' : ''));
    const formatted =
      symbol + " " + sign_symbol + decimal.slice(0, -2) + "," + decimal.slice(-2);
    return formatted;
  };

  const [value, setValue] = useState(
    addCurrencyPrefix(Math.abs(defaultValue).toFixed(2).replace('.', ''), negative)
  );

  const convertToFloatFormat = (value: string) => {
    if (value == "") return value;
    const cleanedValue = value.replace(/[^0-9,]/g, "").replace(",", ".");
    const floatValue = parseFloat(cleanedValue);
    const mult = (hideSign ? (positiveSign ? 1 : -1) : negative ? -1 : 1);
    const float_value = (mult * Math.round(floatValue * 100)) / 100;
    return float_value;
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(addCurrencyPrefix(inputValue, negative));
  };

  const handleSignButton = () => {
    setNegative(!negative);
    setValue(addCurrencyPrefix(value, !negative));
  }

  return (
    <div className={`${className} flex`}>
      <input
        name={name}
        type="hidden"
        value={convertToFloatFormat(value)}
      />
      { !hideSign && (
        <button className="bg-white drop-shadow border border-black rounded-md font-bold px-2 mx-1"
          onClick={handleSignButton} type="button">
          <FaPlusMinus size={8} />
        </button>
      )}
      <input className="border-none bg-transparent p-0 m-0 outline-none w-auto"
        name={`display_${name}`}
        type="text"
        size={12}
        onChange={handleNumberChange}
        value={value}
      />
    </div>
  );
};

export default MonetaryInput;
