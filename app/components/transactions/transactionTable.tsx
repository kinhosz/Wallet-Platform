import React, { useState } from "react";
import { MdAdd } from 'react-icons/md';
import { TbEdit } from "react-icons/tb";
import Monetary from "../monetary";
import NewTransaction from "./newTransaction";

const TransactionRow = ({ category, description, value }) => {
  return (
    <tr className="border-b">
      <td className="px-4 py-2">{category}</td>
      <td className="px-4 py-2">{description}</td>
      <td className="px-4 py-2 text-center">
        <Monetary value={value}/>
      </td>
      <td className="text-center">
        <button className={`px-3 py-1 rounded-lg cursor-pointer`}>
          <TbEdit size={20} />
        </button>
      </td>
    </tr>
  );
};

const TransactionTable = ({ transactions, buttonClicked }) => {
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar a visibilidade do pop-up

  // Função para abrir o pop-up
  const handleAddNewTransaction = () => {
    setShowPopup(true);
  };

  // Função para fechar o pop-up
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      {showPopup && <NewTransaction onClose={handleClosePopup} />}

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
          {transactions.map((category, catIndex) => (
            category.transactions.map((transaction, transIndex) => (
              <TransactionRow
                key={`${catIndex}-${transIndex}`}
                category={category.category}
                description={transaction.description}
                value={transaction.value}
                type={transaction.type}
              />
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;