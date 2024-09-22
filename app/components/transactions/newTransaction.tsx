import React, { useState, useRef, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const NewTransaction = ({ onClose }) => {
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    category: '',
    date: getCurrentDate(),
    amount: '',
    description: '',
    type: '-'
  });

  const popupRef = useRef(null);
  const dateInputRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose(); 
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const input = dateInputRef.current;
    if (input) {
      input.addEventListener('focus', () => {
        input.showPicker(); 
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };

  const handleTypeChange = (newType) => {
    setFormData({ ...formData, type: newType });
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50"
      style={{ zIndex: 9999 }}
    >
      <div ref={popupRef} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative z-50">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">New Transaction</h2>
          <button className="text-red-500" onClick={onClose}>
            &#x2716;
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div className="mt-4 flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                ref={dateInputRef}
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <div className="flex items-center">
                {/* Seletor customizado com ícones */}
                <div className="flex space-x-2 mr-2">
                  <button
                    type="button"
                    onClick={() => handleTypeChange('-')}
                    className={`p-2 rounded border ${formData.type === '-' ? 'bg-red-100' : ''}`}
                  >
                    <FaMinus className="text-red-500" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTypeChange('+')}
                    className={`p-2 rounded border ${formData.type === '+' ? 'bg-green-100' : ''}`}
                  >
                    <FaPlus className="text-green-500" />
                  </button>
                </div>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg shadow-md"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTransaction;