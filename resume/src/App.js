import React, { useState } from 'react';
import './App.css';

function App() {
  const initialState = {
    summary: '',
    education: [''],
    skills: [''],
    careerObjective: '',
    experience: [''],
    phoneNumber: '',
    email: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [step, setStep] = useState(0);
  const [phoneError, setPhoneError] = useState('');

  const steps = [
    'Professional Summary',
    'Education Qualifications',
    'Academic and Non-Academic Skills',
    'Career Objective',
    'Experience and Internships',
    'Phone Number',
    'Email Address',
  ];

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;

    // For fields with multiple entries like education, skills, experience
    if (Array.isArray(formData[name])) {
      const updatedArray = [...formData[name]];
      updatedArray[index] = value;
      setFormData({ ...formData, [name]: updatedArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    if (phone.length <= 10) {
      setFormData({ ...formData, phoneNumber: phone });
      setPhoneError('');
    } else {
      setPhoneError('Phone number must not exceed 10 digits.');
    }
  };

  const handleAddField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(steps.length); // Move to display the generated resume
  };

  const renderField = () => {
    switch (step) {
      case 0: // Professional Summary
        return (
          <div className="form-group">
            <label>Professional Summary</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Write your professional summary here"
              required
            />
          </div>
        );

      case 1: // Education
        return (
          <div className="form-group">
            <label>Education Qualifications</label>
            {formData.education.map((edu, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="education"
                  value={edu}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Enter your qualification"
                />
              </div>
            ))}
            <button type="button" onClick={() => handleAddField('education')}>
              Add More Education
            </button>
          </div>
        );

      case 2: // Skills
        return (
          <div className="form-group">
            <label>Academic and Non-Academic Skills</label>
            {formData.skills.map((skill, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="skills"
                  value={skill}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Enter a skill"
                />
              </div>
            ))}
            <button type="button" onClick={() => handleAddField('skills')}>
              Add More Skills
            </button>
          </div>
        );

      case 3: // Career Objective
        return (
          <div className="form-group">
            <label>Career Objective</label>
            <textarea
              name="careerObjective"
              value={formData.careerObjective}
              onChange={handleChange}
              placeholder="State your career objective"
              required
            />
          </div>
        );

      case 4: // Experience
        return (
          <div className="form-group">
            <label>Experience and Internships</label>
            {formData.experience.map((exp, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="experience"
                  value={exp}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Enter your experience"
                />
              </div>
            ))}
            <button type="button" onClick={() => handleAddField('experience')}>
              Add More Experience
            </button>
          </div>
        );

      case 5: // Phone Number
        return (
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
              placeholder="Enter your phone number"
              required
            />
            {phoneError && <span className="error">{phoneError}</span>}
          </div>
        );

      case 6: // Email
        return (
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
        );

      default:
        return (
          <Resume {...formData} />
        );
    }
  };

  return (
    <div className="App">
      <div className="form-container">
        {step < steps.length ? (
          <form onSubmit={handleNext}>
            <h1>{steps[step]}</h1>
            {renderField()}
            <div className="form-navigation">
              {step > 0 && <button onClick={handlePrev}>Previous</button>}
              <button type="submit">{step === steps.length - 1 ? 'Submit' : 'Next'}</button>
            </div>
          </form>
        ) : (
          <Resume {...formData} />
        )}
      </div>
    </div>
  );
}

const Resume = ({ summary, education, skills, careerObjective, experience, phoneNumber, email }) => (
  <div className="resume-container">
    <h1>Your Resume</h1>
    <section className="resume-section">
      <h2>Professional Summary</h2>
      <p>{summary}</p>
    </section>
    <section className="resume-section">
      <h2>Education Qualifications</h2>
      <ul>
        {education.map((edu, index) => (
          <li key={index}>{edu}</li>
        ))}
      </ul>
    </section>
    <section className="resume-section">
      <h2>Academic and Non-Academic Skills</h2>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </section>
    <section className="resume-section">
      <h2>Career Objective</h2>
      <p>{careerObjective}</p>
    </section>
    <section className="resume-section">
      <h2>Experience and Internships</h2>
      <ul>
        {experience.map((exp, index) => (
          <li key={index}>{exp}</li>
        ))}
      </ul>
    </section>
    <section className="resume-section">
      <h2>Contact Information</h2>
      <p>Phone: {phoneNumber}</p>
      <p>Email: {email}</p>
    </section>
  </div>
);

export default App;
