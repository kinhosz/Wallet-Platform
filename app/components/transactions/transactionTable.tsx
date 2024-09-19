import { MdAdd } from 'react-icons/md';
import { TbEdit } from "react-icons/tb";
import Monetary from "../monetary";

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

const TransactionTable = ({ transactions, addNewTransaction, buttonClicked }) => {
  return (
    <table className="min-w-full bg-white shadow-md rounded">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left">Categoria</th>
          <th className="px-4 py-2 text-left">Descrição</th>
          <th className="px-4 py-2 text-center">Valor</th>
          <th className="px-4 py-2 text-center">
            <button
              className={`px-3 py-1 border-2 border-orange-500 rounded-lg ${buttonClicked ? 'bg-orange-300' : 'bg-white'} text-orange-500 cursor-pointer`}
              onClick={addNewTransaction}
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
  );
};

export default TransactionTable;