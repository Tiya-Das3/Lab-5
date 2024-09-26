// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <UserForm />
    </div>
  );
}

function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    college: '',
    occupation: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    
    // Check if name is empty
    if (!formData.name) {
      newErrors.name = "Name is required.";
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }

    // Check if phone contains only numbers
    const phonePattern = /^[0-9]+$/;
    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!phonePattern.test(formData.phone)) {
      newErrors.phone = "Phone number must contain only digits.";
    }

    // Check if address, college, and occupation are filled
    if (!formData.address) {
      newErrors.address = "Address is required.";
    }
    if (!formData.college) {
      newErrors.college = "College name is required.";
    }
    if (!formData.occupation) {
      newErrors.occupation = "Occupation is required.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
    } else {
      setErrors({});
      setSuccessMessage("Form submitted successfully!");
      // Clear form data after submission
      setFormData({ name: '', email: '', phone: '', address: '', college: '', occupation: '' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>User Registration Form</h2>
      
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={errors.name ? 'error-input' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={errors.email ? 'error-input' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className={errors.phone ? 'error-input' : ''}
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>

      <div>
        <label>Residential Address:</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className={errors.address ? 'error-input' : ''}
        ></textarea>
        {errors.address && <span className="error-message">{errors.address}</span>}
      </div>

      <div>
        <label>College:</label>
        <input
          type="text"
          name="college"
          value={formData.college}
          onChange={handleInputChange}
          className={errors.college ? 'error-input' : ''}
        />
        {errors.college && <span className="error-message">{errors.college}</span>}
      </div>

      <div>
        <label>Occupation:</label>
        <input
          type="text"
          name="occupation"
          value={formData.occupation}
          onChange={handleInputChange}
          className={errors.occupation ? 'error-input' : ''}
        />
        {errors.occupation && <span className="error-message">{errors.occupation}</span>}
      </div>

      <button type="submit">SUBMIT</button>

      {successMessage && <div className="success-message">{successMessage}</div>}
    </form>
  );
}

export default App;
