// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner } from "reactstrap";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { onLoginStatusChange } from "./modules/authManager";
import { getCurrentUserType } from "./modules/userManager";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const [isAdmin, setIsAdmin] = useState(false);

  const userIsAdmin = () => {
    getCurrentUserType().then((userType) => {
      if (userType.name === "Admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
  };

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      userIsAdmin();
    }
  }, [isLoggedIn]);

  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark" />;
  }

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      <ApplicationViews isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
    </Router>
  );
}

export default App;
