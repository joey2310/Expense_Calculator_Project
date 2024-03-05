import React, {useState} from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PieChart } from 'react-minimal-pie-chart';
import Toggle from 'react-toggle';

//Expense Form Component
const ExpenseForm =({onAddExpense}) =>{
  const[title,setTitle] = useState('');
  const[category,setCategory] = useState('');
  const[amount,setAmount] = useState('');
  const [checked, setChecked] = useState(false);

  const handleSubmit =(e) => {
    e.preventDefault();

  if (!title.trim() || !amount.trim() || !category.trim()){
    return;
  }

  const newExpense = {
    id: Math.random().toString(),
    title,
    category,
    amount: +amount,
  };
 console.log(newExpense);

  onAddExpense(newExpense);

  setTitle('');
  setCategory('');
  setAmount('');
}

return(
  <form onSubmit={handleSubmit}>
    <div className='forminpt'>
        <div>
          <label className='title'>TITLE<br/></label>
          <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div>
        <label className='category'>CATEGORY<br/></label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>
        <div>
        <label className='amount'>AMOUNT<br/></label>
        <input type='number'value={amount} onChange={(e) => setAmount(e.target.value)}/>
        </div>
        <div>
        <div class="toggle-switch">
        <Toggle
          onChange={(event) => setChecked(event.target.checked)}
        /><h1>{checked ? 'Credit' : 'Debit'}</h1>
        </div>
      <button className='addbtn' type='submit'><FontAwesomeIcon icon={['fas', 'fa-square-plus']} /></button>
        </div>
      </div>
      </form>
)
}

function App() {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) =>{
    setExpenses([...expenses,expense])
  }

  const deleteExpense =(id) =>{
    setExpenses(expenses.filter((expense) => expense.id !==id));
  }

  const totalAmount = expenses.reduce((total,expense) => total + expense.amount,0);

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
      <ExpenseForm onAddExpense={addExpense}/>
      </div>
      <div className='piechart1'><PieChart
      data={[
    { title: 'Income', value: 100, color: '#E38627' },
    { title: 'Expense', value: 150, color: '#C13C37' },
      ]}/>
      <div className='chrttxt'>
      Debit / Credit
      </div>
      </div>
      <div className='piechart2'><PieChart
      data={[
    { title: 'One', value: 10, color: '#E38627' },
    { title: 'Two', value: 15, color: '#C13C37' },
    { title: 'Three', value: 20, color: '#6A2135' },
      ]}/>
      <div className='chrttxt'>
      Category Wise
      </div>
      </div>
      <div className='piechart3'><PieChart
      data={[
    { title: 'One', value: 10, color: '#E38627' },
    { title: 'Two', value: 15, color: '#C13C37' },
    { title: 'Three', value: 20, color: '#6A2135' },
      ]}/>
      <div className='chrttxt'>
      Title Wise
      </div>
      </div>
      </div>
      <hr className='hr'></hr>
      <div className='banceamt'>Balance Amount: {totalAmount} <FontAwesomeIcon className='rupeeicon' icon={['fas', 'fa-indian-rupee-sign']} /> 
      </div>
   <div className='Table'>  
    <table>
      <thead>
        <tr>
          <th>Date</th>
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
          <td>{expense.date}</td>
          <td>{expense.title}</td>
          <td>{expense.category}</td>
          <td>{expense.amount}</td>
          <td>{expense.cedit}</td>
          <td className='td5'><button className='delete-btn' onClick={() =>deleteExpense(expense.id)}><FontAwesomeIcon className='deltbtn' icon={['fas', 'fa-trash-can']} /></button></td>
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