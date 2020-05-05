import React from "react";
import "./App.css";
import {BrowserRouter as Router , Switch, Route} from "react-router-dom";
import { SignUp } from "./pages/auth/signup";
import { Login } from "./pages/auth/login";
import { Home } from "./pages/homepage";
import { AuthenticatedRoute } from "./components/routes/authenticatedRoutes";

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
          <AuthenticatedRoute  path= ''>
            <Home />
          </AuthenticatedRoute>
          
        </Switch>
      </Router>
    
  );
}

export default App;
