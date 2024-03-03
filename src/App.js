import React, {useState} from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { PieChart } from '@mui/x-charts/PieChart';

//Expense Form Component
const ExpenseForm =({onAddExpense}) =>{
  const[title,setTitle] = useState('');
  const[category,setCategory] = useState('');
  const[amount,setAmount] = useState('');

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
          <input type='text' value={category} onChange={(e) => setCategory(e.target.value)}/>
        </div>
        <div>
        <label className='amount'>AMOUNT<br/></label>
        <input type='number'value={amount} onChange={(e) => setAmount(e.target.value)}/>
        </div>
      <button type='submit'><FontAwesomeIcon className='addbtn' icon={['fas', 'fa-square-plus']} /> <h3>ADD EXPENSE</h3></button>
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
        <div className='Head'><h1>Expense Manager for Rutuja </h1>
        </div>
        <FontAwesomeIcon className='rupeeicon' icon={['fas', 'fa-indian-rupee-sign']} /> 

      </header>
      <ExpenseForm onAddExpense={addExpense}/>
      <div className='banceamt'>Balance Amount: {totalAmount}
      </div>
   <div className='Table'>  
    <table>
      <thead>
        <tr>
          <th>TITLE</th>
          <th>CATEGORY</th>
          <th>AMOUNT</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) =>
        <tr key={expense.id}>
          <td>{expense.title}</td>
          <td>{expense.category}</td>
          <td>{expense.amount}</td>
          <td><button className='delete-btn' onClick={() =>deleteExpense(expense.id)}><FontAwesomeIcon className='deltbtn' icon={['fas', 'fa-trash-can']} /></button></td>
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