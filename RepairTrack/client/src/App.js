import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner } from "reactstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ApplicationViews from "./components/ApplicationViews";
import { onLoginStatusChange } from "./modules/authManager";
import { getCurrentUserType } from "./modules/userProfileManager";

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

  // console.log("ADMIN", isAdmin);
  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      <ApplicationViews isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      <Footer isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
    </Router>
  );
}

export default App;
