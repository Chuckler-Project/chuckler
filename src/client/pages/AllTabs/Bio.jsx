import React, { useState } from 'react';
import '../../stylesheets/bio.css';
// import homeIcon from '../../images/home.png';
// import profileIcon from '../../images/profileIcon.png';
// import chatIcon from '../../images/chatIcon.png';
// import logout from '../../images/logout1.png';
// import Tabs from '../Tabs.jsx';
// import TabNavItem from '../Components/TabNavItem.jsx';

const BioPage = () => {
  const [interests, setInterests] = useState('');

  const handleInterestsChange = (e) => {
    setInterests(e.target.value);
  };

  function saveFormData() {
    const userBio = document.getElementById('interests').value;

    fetch('/bio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userBio }),
    })
    .then(response => {
      if (response.ok) {
        console.log('Data saved successfully!');
      } else {
        console.error('Failed to save data.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  

  return (

    <div className='background'>
    <div className="main-container">
      <h1>About Me</h1>
      <div className="">
        <label htmlFor="interests">Interests:</label>
        <textarea
        className="text-box"
          id="interests"
          name="interests"
          value={interests}
          onChange={handleInterestsChange}
          placeholder="Tell us about your interests"
          required
        />
      </div>
      <button className="save-button" type="submit" onClick={saveFormData}>Save</button>
    </div>
    </div>
  );
};

export default BioPage;
