import React from "react";
import "./App.css";
import {BrowserRouter as Router , Switch, Route} from "react-router-dom";
import { SignUp } from "./pages/auth/signup";
import { Login } from "./pages/auth/login";
import { Home } from "./pages/homepage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path= '/login'>
          <Login />
        </Route>
        <Route path= '/signup'>
          <SignUp />
        </Route>
        <Route  path= ''>
          <Home />
        </Route>
        
      </Switch>
    </Router>
    
  );
}

export default App;
