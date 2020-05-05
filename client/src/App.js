import React from "react";
import "./App.css";
import {BrowserRouter as Router , Switch, Route} from "react-router-dom";
import { SignUp } from "./pages/auth/signup";

function App() {
  return (
    <Router>
      <Switch>
        <Route to= '/signup'>
          <SignUp />
        </Route>
      </Switch>
    </Router>
    
  );
}

export default App;
