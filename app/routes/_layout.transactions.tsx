import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import "react-datepicker/dist/react-datepicker.css";
import DateNavigator from '~/components/transactions/dateNavigator';
import TransactionTable from "~/components/transactions/transactionTable";
import Monetary from '~/components/monetary';
import { LoaderFunction, useLoaderData, useFetcher } from "@remix-run/react";
import GetAuthToken from "~/services/getAuthToken.server";
import GetTransactionsByDate from "~/services/getTransactionByDate.server";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const date = url.searchParams.get('date')
  const token = await GetAuthToken(request);
  const transactions = await GetTransactionsByDate(token, date);
  return transactions;
};

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const sumByCategory = (transactions) => {
  const categoryMap = new Map();

  transactions.forEach(({ category_name, value }) => {
    const numericValue = parseFloat(value);
    if (numericValue < 0) {
      const absValue = Math.abs(numericValue);
      if (categoryMap.has(category_name)) {
        const existing = categoryMap.get(category_name);
        categoryMap.set(category_name, { value: existing.value + absValue });
      } else {
        categoryMap.set(category_name, { value: absValue });
      }
    }
  });

  const sortedCategories = Array.from(categoryMap, ([category, { value }]) => [category, value])
    .sort((a, b) => b[1] - a[1]);

  return sortedCategories;
};

export default function Transactions() {
  const fetcher = useFetcher();
  const transactions = useLoaderData();
  const [chartData, setChartData] = useState([["Category", "Amount"]]);
  const [dailyBalance, setDailyBalance] = useState(0);
  const [outflows, setOutflows] = useState(0);
  const [inflows, setInflows] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [buttonClicked, setButtonClicked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("#FFFFFF");
  const [categoryTransactions, setCategoryTransactions] = useState([]);
  const [categoryColorMap, setCategoryColorMap] = useState({});

  useEffect(() => {
    const formattedDate = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD
    fetcher.load(`/transactions?date=${formattedDate}`);
  }, [currentDate]);

  useEffect(() => {
    const sortedData = sumByCategory(fetcher.data || transactions);

    const colorMap = {};
    sortedData.forEach(([category]) => {
      colorMap[category] = generateRandomColor();
    });
    setCategoryColorMap(colorMap);

    const formattedData = [["Category", "Value"], ...sortedData.map(([category, value]) => [category, value])];
    setChartData(formattedData);

    if (sortedData.length > 0) {
      const initialCategory = sortedData[0][0];
      setSelectedCategory(initialCategory);
      setSelectedColor(colorMap[initialCategory] || "#FFFFFF");
      const filteredTransactions = (fetcher.data || transactions).filter(transaction => transaction.category_name === initialCategory);
      setCategoryTransactions(filteredTransactions);
    }

    const inflowsSum = (fetcher.data || transactions).reduce((acc, trans) => {
      return acc + (parseFloat(trans.value) > 0 ? parseFloat(trans.value) : 0);
    }, 0);

    const outflowsSum = (fetcher.data || transactions).reduce((acc, trans) => {
      return acc + (parseFloat(trans.value) < 0 ? parseFloat(trans.value) : 0);
    }, 0);

    setInflows(<Monetary value={inflowsSum.toFixed(2)} />);
    setOutflows(<Monetary value={Math.abs(outflowsSum).toFixed(2)} />);
    setDailyBalance(<Monetary value={(inflowsSum + outflowsSum).toFixed(2)} />);
  }, [transactions, fetcher.data]); 

  const handleChartSelect = ({ chartWrapper }) => {
    const chart = chartWrapper.getChart();
    const selection = chart.getSelection();
    if (selection.length > 0) {
      const selectedRow = selection[0].row;
      const category = chartData[selectedRow + 1][0];
      setSelectedCategory(category);
      setSelectedColor(categoryColorMap[category] || "#FFFFFF");
      const filteredTransactions = (fetcher.data || transactions).filter(transaction => transaction.category_name === category);
      setCategoryTransactions(filteredTransactions);
    }
  };

  const addNewTransaction = () => {
    setButtonClicked(true);
    setTimeout(() => {
      setButtonClicked(false);
    }, 100);

    const newTransaction = { category: "", description: "", value: 0 };
    setTransactions([...transactions, newTransaction]);
  };

  return (
    <div className="p-4 flex flex-wrap justify-between">
      <div className="w-full lg:w-1/2 mb-6">
        <DateNavigator currentDate={currentDate} setCurrentDate={setCurrentDate} />
        <TransactionTable transactions={fetcher.data || transactions} addNewTransaction={addNewTransaction} buttonClicked={buttonClicked} />
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
              slices: chartData.slice(1).reduce((acc, [category], index) => {
                acc[index] = { color: categoryColorMap[category] || "#000000" };
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
            <div 
              className="p-4 rounded shadow-md border-8" 
              style={{ borderColor: selectedColor }}
            >
              <h4 className="font-bold text-center">{selectedCategory}</h4>
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
