import React, { useRef, useState } from "react";
import Input from "./Input.jsx";
import Select from "./Select.jsx";

export default function ExpenseForm({
  expense,
  setExpense,
  setExpenses,
  editingRowId,
  setEditingRowId,
}) {
  const [errors, setErrors] = useState({});
  const validationConfig = {
    title: [
      {
        required: true,
        message: "Please enter  title",
      },
      { minLength: 3, message: "Title should be atleast of 3 characters" },
      {
        pattern: /^[a-zA-Z ]+$/,
        message: "Only letters allowed",
      },
    ],
    category: [
      {
        required: true,
        message: "Please select a category",
      },
    ],
    amount: [
      {
        required: true,
        message: "Please enter an amount",
      },
      {
        pattern: /^[0-9]*\d$/,
        message: "Only numbers allowed",
      },
    ],
  };

  const validateForm = (formData) => {
    const errorsData = {};

    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorsData[key] = rule.message;
          return true;
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          errorsData[key] = rule.message;
          return true;
        }
        if (rule.minLength && value.length < 3) {
          errorsData[key] = rule.message;
          return true;
        }
      });
    });

    setErrors(errorsData);
    return errorsData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateResult = validateForm(expense);
    if (Object.keys(validateResult).length) return;

    setExpenses((prevState) => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() },
    ]);

    setExpense({
      title: "",
      category: "",
      amount: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevState) => ({ ...prevState, [name]: value }));
    setErrors({});
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <Input
        label="Title"
        id="title"
        name="title"
        value={expense.title}
        onChange={handleChange}
        error={errors.title}
      />

      <Select
        id="category"
        label="category"
        name="category"
        value={expense.category}
        onChange={handleChange}
        options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
        defaultOption="Select Category"
        error={errors.category}
      />
      <Input
        label="Amount"
        id="amount"
        name="amount"
        value={expense.amount}
        onChange={handleChange}
        error={errors.amount}
      />
      <button className="add-btn">Add</button>
    </form>
  );
}