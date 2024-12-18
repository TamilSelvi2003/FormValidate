import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    userName: '',
    Age: '',
    Email: '',
    password: '',
    confirmPassword: ''
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [edit, setEdit] = useState(null); 

  const HandleSubmit = (e) => {
    e.preventDefault();

    const { userName, Age, Email, password, confirmPassword } = formData;

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!userName || !Age || !Email || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }
    if (userName.length < 5) {
      alert("UserName should have at least 5 characters");
      return;
    }
    if (!emailPattern.test(Email)) {
      alert("Invalid Email");
      return;
    }
    if (password.length < 6) {
      alert("Password should have at least 6 characters");
      return;
    }
    if (confirmPassword !== password) {
      alert("Confirm password is incorrect");
      return;
    }

    if (edit !== null) {
      const updatedValue = [...submittedData];
      updatedValue[edit] = { userName, Age, Email, password, confirmPassword };
      setSubmittedData(updatedValue);
      setEdit(null); // Reset edit mode
    } else {
      setSubmittedData((prevData) => [
        ...prevData,
        { userName, Age, Email, password, confirmPassword }
      ]);
    }

    setFormData({
      userName: '',
      Age: '',
      Email: '',
      password: '',
      confirmPassword: ''
    });
    alert("Form submitted successfully");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (index) => {
    let selectData = submittedData[index];
    setFormData(selectData);
    setEdit(index); // Set the index of the item to be edited
  };

  const handleRemove = (index) => {
    let newData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(newData);
  };

  return (
    <>
      <form onSubmit={HandleSubmit}>
        <input
          type="text"
          value={formData.userName}
          name="userName"
          onChange={handleInput}
          placeholder="User Name"
        />
        <br />
        <input
          type="number"
          value={formData.Age}
          name="Age"
          onChange={handleInput}
          placeholder="Your Age"
        />
        <br />
        <input
          type="email"
          value={formData.Email}
          name="Email"
          onChange={handleInput}
          placeholder="Your Email Address"
        />
        <br />
        <input
          type="password"
          value={formData.password}
          name="password"
          onChange={handleInput}
          placeholder="Your Password"
        />
        <br />
        <input
          type="password"
          value={formData.confirmPassword}
          name="confirmPassword"
          onChange={handleInput}
          placeholder="Confirm Password"
        />
        <br />
        <button type="submit">{edit !== null ? 'Update' : 'Submit'}</button>
      </form>
      <h3>Submitted data</h3>
      <table border={1}>
        <thead>
          <tr>
            <th>UserName</th>
            <th>Age</th>
            <th>Email</th>
            <th>Password</th>
            <th>ConfirmPassword</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {submittedData.map((data, index) => (
            <tr key={index}>
              <td>{data.userName}</td>
              <td>{data.Age}</td>
              <td>{data.Email}</td>
              <td>{data.password}</td>
              <td>{data.confirmPassword}</td>
              <td>
                <button type="button" onClick={() => handleEdit(index)}>Edit</button>
                <button type="button" onClick={() => handleRemove(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
