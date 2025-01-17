import { useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm.jsx";
import ExpenseTable from "./components/ExpenseTable.jsx";
import Data from "./components/Data.js";

function App() {
  const [expense, setExpense] = useState({
    title: "",
    category: "",
    amount: "",
  });

  const [expenses, setExpenses] = useState(Data);
  const [editingRowId, setEditingRowId] = useState("");

  return (
    <>
      <main>
        <h1>Track Your Expense</h1>
        <div className="expense-tracker">
          <ExpenseForm
            setExpenses={setExpenses}
            expense={expense}
            setExpense={setExpense}
            editingRowId={editingRowId}
            setEditingRowId={setEditingRowId}
          />
          <ExpenseTable
            expenses={expenses}
            setExpenses={setExpenses}
            setExpense={setExpense}
            setEditingRowId={setEditingRowId}
          />
        </div>
      </main>
    </>
  );
}

export default App;
