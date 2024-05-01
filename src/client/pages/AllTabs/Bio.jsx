import React, { useState } from 'react';

const BioPage = () => {
  const [age, setAge] = useState('');
  const [interests, setInterests] = useState('');

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleInterestsChange = (e) => {
    setInterests(e.target.value);
  };

  return (
    <div className="biography-page">
      <h1>About Me</h1>
      <div className="form-group">
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={age}
          onChange={handleAgeChange}
          placeholder="Enter your age"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="interests">Interests:</label>
        <textarea
          id="interests"
          name="interests"
          value={interests}
          onChange={handleInterestsChange}
          placeholder="Tell us about your interests"
          required
        />
      </div>
      <button type="submit">Save</button>
    </div>
  );
};

export default BioPage;
