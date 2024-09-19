import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import "react-datepicker/dist/react-datepicker.css";

import DateNavigator from '~/components/transactions/dateNavigator';
import TransactionTable from "~/components/transactions/transactionTable";
import Monetary from '~/components/monetary'

const sumByCategory = (transactions) => {
  const categoryMap = new Map();

  transactions.forEach(({ category, color, transactions: transactionList }) => {
    transactionList.forEach(({ value }) => {
      if (value < 0) {
        const numericValue = Math.abs(value);
        if (categoryMap.has(category)) {
          const existing = categoryMap.get(category);
          categoryMap.set(category, { value: existing.value + numericValue, color: existing.color });
        } else {
          categoryMap.set(category, { value: numericValue, color });
        }
      }
    });
  });

  // Convert map to array and sort by value in descending order
  const sortedCategories = Array.from(categoryMap, ([category, { value, color }]) => [category, value, color])
    .sort((a, b) => b[1] - a[1]);

  return sortedCategories;
};

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState([["Category", "Amount"]]);
  const [dailyBalance, setDailyBalance] = useState(0);
  const [outflows, setOutflows] = useState(0);
  const [inflows, setInflows] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [buttonClicked, setButtonClicked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("#FFFFFF");
  const [categoryTransactions, setCategoryTransactions] = useState([]);

  const addNewTransaction = () => {
    setButtonClicked(true);
    setTimeout(() => {
      setButtonClicked(false);
    }, 100);

    const newTransaction = { category: "", description: "", value: 0, color: "#FFFFFF" };
    setTransactions([...transactions, newTransaction]);
  };

  useEffect(() => {
    const mockTransactions = [
      {
        category: "Food",
        color: "#FF5733",
        transactions: [
          { description: "Weekly groceries", value: -250, date: "2024-09-16"},
          { description: "Lunch", value: -50, date: "2024-09-17"},
        ],
      },
      {
        category: "Education",
        color: "#C70039",
        transactions: [
          { description: "AutoCAD course", value: -250, date: "2024-09-15" },
          { description: "English course", value: -40, date: "2024-09-17" },
        ],
      },
      {
        category: "Transport",
        color: "#900C3F",
        transactions: [{ description: "Taxi", value: -30, date: "2024-09-17" }],
      },
      {
        category: "Health",
        color: "#581845",
        transactions: [{ description: "Medication", value: -20, date: "2024-09-16" }],
      },
      {
        category: "Leisure",
        color: "#FF9D00",
        transactions: [{ description: "Cinema", value: -60, date: "2024-09-16" }],
      },
      {
        category: "Salary",
        color: "#2CA02C",
        transactions: [{ description: "Uber reimbursement", value: 25, date: "2024-09-16"}],
      },
    ];
    setTransactions(mockTransactions);

    const sortedData = sumByCategory(mockTransactions);
    const formattedData = [["Category", "Value"], ...sortedData.map(([category, value]) => [category, value])];
    setChartData(formattedData);

    const inflowsSum = mockTransactions.reduce((acc, { transactions: transList }) => {
      return acc + transList.reduce((sum, trans) => trans.value > 0 ? sum + parseFloat(trans.value) : sum, 0);
    }, 0);

    const outflowsSum = mockTransactions.reduce((acc, { transactions: transList }) => {
      return acc + transList.reduce((sum, trans) => trans.value < 0 ? sum + parseFloat(trans.value) : sum, 0);
    }, 0);

    setInflows(<Monetary value={inflowsSum.toFixed(2)} />);
    setOutflows(<Monetary value={outflowsSum.toFixed(2)} />);
    setDailyBalance(<Monetary value={(inflowsSum + outflowsSum).toFixed(2)} />);
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      const maxNegativeCategory = transactions.reduce((max, category) => {
        const maxNegativeTransaction = category.transactions.reduce((max, current) => {
          return current.value < 0 && (max === null || current.value < max.value) ? current : max;
        }, null);
        if (maxNegativeTransaction) {
          return !max || (maxNegativeTransaction.value < max.value) ? { category: category.category, color: category.color } : max;
        }
        return max;
      }, null);

      if (maxNegativeCategory) {
        setSelectedCategory(maxNegativeCategory.category);
        setSelectedColor(maxNegativeCategory.color);
        const category = transactions.find(transaction => transaction.category === maxNegativeCategory.category);
        if (category) {
          const maxNegativeTransaction = category.transactions.reduce((max, current) => {
            return current.value < 0 && (max === null || current.value < max.value) ? current : max;
          }, null);
          if (maxNegativeTransaction) {
            setCategoryTransactions([maxNegativeTransaction]);
          } else {
            setCategoryTransactions([]);
          }
        }
      }
    }
  }, [transactions]);

  const handleChartSelect = ({ chartWrapper }) => {
    const chart = chartWrapper.getChart();
    const selection = chart.getSelection();
    if (selection.length > 0) {
      const selectedRow = selection[0].row;
      const category = chartData[selectedRow + 1][0];
      setSelectedCategory(category);
      const color = transactions.find(transaction => transaction.category === category)?.color || "#FFFFFF";
      setSelectedColor(color);
    }
  };

  return (
    <div className="p-4 flex flex-wrap justify-between">
      <div className="w-full lg:w-1/2 mb-6">
        <DateNavigator currentDate={currentDate} setCurrentDate={setCurrentDate} />
        <TransactionTable transactions={transactions} addNewTransaction={addNewTransaction} buttonClicked={buttonClicked}/>
      </div>

      <div className="w-full lg:w-1/2 lg:sticky lg:top-0 h-screen flex flex-col flex-grow">
        <div className="chart-container">
          <Chart
            chartType="PieChart"
            data={chartData}
            options={{
              title: 'Expenses by Category',
              pieHole: 0.4,
              is3D: false,
              legend: { position: 'left' },
              slices: chartData.slice(1).reduce((acc, _, index) => {
                acc[index] = { color: transactions.find(transaction => transaction.category === chartData[index + 1][0])?.color || "#000000" };
                return acc;
              }, {}),
            }}
            width={"100%"}
            height={"400px"}
            legendToggle
            chartEvents={[
              {
                eventName: "select",
                callback: handleChartSelect,
              },
            ]}
          />
        </div>
        <div className="flex gap-4">
          <div className="mt-6 bg-white p-4 shadow-md rounded w-1/2 ml-6">
            <h3 className="text-lg font-bold">Daily Balance:</h3>
            <p className="text-xl">{dailyBalance}</p>
            <div className="flex justify-between mt-4">
              <p>Outflows: {outflows}</p>
              <p>Inflows: {inflows}</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 w-1/2">
            <div className="p-4 rounded shadow-md" style={{ backgroundColor: selectedColor }}>
              <h4 className="font-bold">{selectedCategory}</h4>
              {categoryTransactions.length > 0 ? (
                categoryTransactions.map((transaction, index) => (
                  <div key={index} className="flex justify-between mb-2">
                    <span>{transaction.description}</span>
                    <Monetary value={parseFloat(transaction.value)} />
                  </div>
                ))
              ) : (
                <p>No transactions found for this category.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}