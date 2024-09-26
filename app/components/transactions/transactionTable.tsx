import React, { useState, useEffect, useRef } from "react";
import { MdAdd, MdSave } from 'react-icons/md';
import { TbEdit } from "react-icons/tb";
import Monetary from "../monetary";

const TransactionRow = ({ description, value, category_name, onSave, onCancel }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCategory, setEditedCategory] = useState(category_name);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedValue, setEditedValue] = useState(value);

  const rowRef = useRef(null);

  const handleSave = () => {
    onSave(editedCategory, editedDescription, editedValue);
    setIsEditing(false);
  };

  const handleClickOutside = (event) => {
    if (rowRef.current && !rowRef.current.contains(event.target)) {
      setIsEditing(false);
      onCancel();
    }
  };

  useEffect(() => {
    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  return (
    <tr ref={rowRef} className="border-b">
      <td className="px-4 py-2">
        {isEditing ? (
          <input
            type="text"
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value)}
            className="border p-1 rounded w-full max-w-[150px]"
          />
        ) : (
          category_name
        )}
      </td>
      <td className="px-4 py-2">
        {isEditing ? (
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="border p-1 rounded w-full max-w-[250px]"
          />
        ) : (
          description
        )}
      </td>
      <td className="px-4 py-2 text-center">
        {isEditing ? (
          <input
            type="number"
            value={editedValue}
            onChange={(e) => setEditedValue(Number(e.target.value))}
            className="border p-1 rounded w-full max-w-[100px] text-center"
          />
        ) : (
          <Monetary value={value} />
        )}
      </td>
      <td className="text-center">
        {isEditing ? (
          <button
            className="px-3 py-1 rounded-lg bg-green-500 text-white"
            onClick={handleSave}
          >
            <MdSave size={20} />
          </button>
        ) : (
          <button
            className="px-3 py-1 rounded-lg cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            <TbEdit size={20} />
          </button>
        )}
      </td>
    </tr>
  );
};

const TransactionTable = ({ transactions, buttonClicked }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleAddNewTransaction = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSaveTransaction = (transIndex, newCategory, newDescription, newValue) => {
    const updatedTransactions = transactions.map((transaction, tIndex) => {
      if (tIndex === transIndex) {
        return {
          ...transaction,
          category_name: newCategory,
          description: newDescription,
          value: newValue
        };
      }
      return transaction;
    });

    console.log("Transações atualizadas:", updatedTransactions);
  };

  return (
    <div>
      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-center">Value</th>
            <th className="px-4 py-2 text-center">
              <button
                className={`px-3 py-1 border-2 border-orange-500 rounded-lg ${buttonClicked ? 'bg-orange-300' : 'bg-white'} text-orange-500 cursor-pointer`}
                onClick={handleAddNewTransaction}
              >
                <MdAdd size={20} />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, transIndex) => (
            <TransactionRow
              key={transIndex}
              occurred_at={transaction.occurred_at}
              category_name={transaction.category_name}
              description={transaction.description}
              value={transaction.value}
              onSave={(newCategory, newDescription, newValue) =>
                handleSaveTransaction(transIndex, newCategory, newDescription, newValue)
              }
              onCancel={() => console.log("Edição cancelada")}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
