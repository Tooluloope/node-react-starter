import React from "react";
import "./App.css";
import {BrowserRouter as Router , Switch} from "react-router-dom";
import { SignUp } from "./pages/auth/signup";
import { Login } from "./pages/auth/login";
import { Home } from "./pages/homepage";
import { AuthenticatedRoute } from "./components/routes/authenticatedRoutes";
import { UnAuthenticatedRoute } from "./components/routes/unauthenticatedRoutes";

function App() {

  return (
      <Router>
        <Switch>
          <UnAuthenticatedRoute path= '/login'>
            <Login />
          </UnAuthenticatedRoute>
          <UnAuthenticatedRoute path= '/signup'>
            <SignUp />
          </UnAuthenticatedRoute>
          <AuthenticatedRoute  path= ''>
            <Home />
          </AuthenticatedRoute>
          
        </Switch>
      </Router>
    
  );
}

export default App;
