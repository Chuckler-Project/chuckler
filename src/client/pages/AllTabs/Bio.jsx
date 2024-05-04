import React, { useState } from 'react';
import '../../stylesheets/bio.css';
// import homeIcon from '../../images/home.png';
// import profileIcon from '../../images/profileIcon.png';
// import chatIcon from '../../images/chatIcon.png';
// import logout from '../../images/logout1.png';
// import Tabs from '../Tabs.jsx';
// import TabNavItem from '../Components/TabNavItem.jsx';

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
  // <div className="background">
  //   <div className="main-container">
  //      <div className="navigation">
  //       <a className="button" href="/" onClick={handleLogOut}>
  //           <img src={logout} style={{width:'30px'}}/>
  //           <div className="logout">LOGOUT</div>
  //       </a>
  //      </div>
  //           <Tabs userData={userData} activeTab={activeTab}/>
  //       <ul className="nav">
  //           <TabNavItem title={homeIcon} id="tab1" activeTab={activeTab} setActiveTab={setActiveTab}/>
  //           <TabNavItem title={chatIcon} id="tab2" activeTab={activeTab} setActiveTab={setActiveTab}/>
  //           <TabNavItem title={profileIcon} id="tab3" activeTab={activeTab} setActiveTab={setActiveTab}/>
  //       </ul>
  //    </div>
  // </div>
    <div className='background'>
    <div className="main-container">
      <h1>About Me</h1>
      {/* <div className="info">
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
      </div> */}
      <div className="">
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
    </div>
  );
};

export default BioPage;
