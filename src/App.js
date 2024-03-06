import React, { useState } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PieChart } from 'react-minimal-pie-chart';
import Toggle from 'react-toggle';

// Expense Form Component
const ExpenseForm = ({ onAddExpense, onUpdateChart }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [credit, setCredit] = useState(false); // Default state for credit/debit toggle

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !amount.trim() || !category.trim()) {
      return;
    }
    const adjustedAmount = credit ? +amount : -amount; // Adjust amount based on toggle state


    const newExpense = {
      id: Math.random().toString(),
      title,
      category,
      amount: adjustedAmount,
      credit: credit ? 'Credit' : 'Debit', // Set credit/debit based on toggle state
      date: new Date().toLocaleString() // Include the current date
    };

    console.log(newExpense);

    onAddExpense(newExpense);

    setTitle('');
    setCategory('');
    setAmount('');
    onUpdateChart();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='forminpt'>
        <div>
          <label className='title'>TITLE<br /></label>
          <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label className='category'>CATEGORY<br /></label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Salary">Salary</option>
          </select>
        </div>
        <div>
          <label className='amount'>AMOUNT<br /></label>
          <input type='number' value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div>
          <div class="toggle-switch">
            <Toggle
              checked={credit} // Set the checked state of toggle
              onChange={() => setCredit(!credit)} // Toggle credit state
            />
            <h1>{credit ? 'Credit' : 'Debit'}</h1>
          </div>
          <button className='addbtn' type='submit'><FontAwesomeIcon icon={['fas', 'fa-square-plus']} /></button>
        </div>
      </div>
    </form>
  )
}

// App component
function App() {
  const [expenses, setExpenses] = useState([]);
  const [chartData, setChartData] = useState([
    { title: 'Income', value: 100, color: '#E38627' },
    { title: 'Expense', value: 150, color: '#C13C37' },
  ]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense])
  }

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  }

  const updateChart = ()=>{
    const newData = [
      { title: 'New Data 1', value: totalAmount * 100, color: '#E38627' },
      { title: 'New Data 2', value: Math.random() * 100, color: '#C13C37' },
    ];
    setChartData(newData);
  }

const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);

 // Calculate total income (sum of positive amounts)
 const totalIncome = expenses
 .filter((expense) => expense.amount > 0)
 .reduce((total, expense) => total + expense.amount, 0);

// Calculate total debited amount (sum of negative amounts)
const totalDebit = expenses
 .filter((expense) => expense.amount < 0)
 .reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="App">
      <header className="App-header">
        <div className='walleticon'>
          <FontAwesomeIcon className='walleticon' icon={['fas', 'fa-wallet']} />
        </div>
        <div className='Head'>Expense Manager for Rutuja
        </div>
        <FontAwesomeIcon className='rupeeicon' icon={['fas', 'fa-indian-rupee-sign']} />
      </header>
      <div className='Mid'>
        <div>
          <ExpenseForm onAddExpense={addExpense} onUpdateChart={updateChart}/>
        </div>
        <div className='piechart1'>
          <PieChart data={chartData} />
          <div className='chrttxt'>Credit / Debit</div>
        </div>
        {/* <div className='piechart2'><PieChart
          data={[
            { title: 'One', value: 10, color: '#E38627' },
            { title: 'Two', value: 15, color: '#C13C37' },
            { title: 'Three', value: 20, color: '#6A2135' },
          ]} />
          <div className='chrttxt'>
            Category Wise
          </div>
        </div>
        <div className='piechart3'><PieChart
          data={[
            { title: 'One', value: 10, color: '#E38627' },
            { title: 'Two', value: 15, color: '#C13C37' },
            { title: 'Three', value: 20, color: '#6A2135' },
          ]} />
          <div className='chrttxt'>
            Title Wise
          </div>
        </div> */}
      </div>
      <hr className="hr" />
      <div className='dd'>
        <div className="banceamt">Total Credited Amount: {totalIncome} <FontAwesomeIcon className="rupeeicon" icon={['fas', 'fa-indian-rupee-sign']} /></div>
        <div className="banceamt">Total Debited Amount: {Math.abs(totalDebit)} <FontAwesomeIcon className="rupeeicon" icon={['fas', 'fa-indian-rupee-sign']} /></div>
        <div className="banceamt">Balance Amount: {totalIncome + totalDebit} <FontAwesomeIcon className="rupeeicon" icon={['fas', 'fa-indian-rupee-sign']} /></div>
      </div>
      <div className="Table">
        <table>
          <thead>
            <tr>
              <th >Date</th>
              <th>TITLE</th>
              <th>CATEGORY</th>
              <th>AMOUNT</th>
              <th>CREDIT/DEBIT</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) =>
              <tr key={expense.id}>
                <td className='td1'>{expense.date}</td>
                <td className='td2'>{expense.title}</td>
                <td className='td3'>{expense.category}</td>
                <td className='td4'>{expense.amount}</td>
                <td className='td5'>{expense.credit}</td>
                <td className='td6'><button className='delete-btn' onClick={() => deleteExpense(expense.id)}><FontAwesomeIcon className='deltbtn' icon={['fas', 'fa-trash-can']} /></button></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
library.add(fab, fas, far)