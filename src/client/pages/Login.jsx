import React from 'react';
import { Link } from 'react-router-dom';
import userIcon from '../images/user.png';
import passwordIcon from '../images/password.png';
import '../stylesheets/loginSignup.css';

const Login = () => {
  return (
    <div className="login-container">
      <div className="title">Get Started</div>

      <div className="inputs">
        <div className="input">
          <img src={userIcon} alt="" />
          <input type="text" placeholder="Name" />
        </div>
        <div className="input">
          <img src={passwordIcon} alt="password-icon" />
          <input type="password" placeholder="Password" />
        </div>
      </div>
      <div className="buttons">
        <button className="submit"><Link to='/main'>Login</Link></button>
      </div>
    </div>
  );
};

export default Login;








//Brandans code 
// import React from 'react';
// import userIcon from '../images/user.png';
// import passwordIcon from '../images/password.png';
// import { Link } from 'react-router-dom';

// import '../stylesheets/loginSignup.css';

// const LoginSignup = () => {
//   return (
//     <div className="container">
//       <div className="header">
//         <div className="text">Get Started</div>
//         <div className="underline" />
//       </div>
//       <div className="inputs">
//         <div className="input">
//           <img src={userIcon} alt="" />
//           <input type="text" placeholder="Name" />
//         </div>
//         <div className="input">
//           <img src={passwordIcon} alt="password-icon" />
//           <input type="password" placeholder="Password" />
//         </div>
//       </div>
//       <div className="submit-container">
//         <button className="submit">Sign Up</button>
//         <button className="submit"><Link to='/main'>Login</Link></button>
//       </div>
//     </div>
//   );
// };

// export default LoginSignup;
