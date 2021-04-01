import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { People } from "./components/People";
import { Person } from "./components/Person";
import { PaginationController } from "./contexts/PaginationContext";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <PaginationController>
            <People />
          </PaginationController>
        </Route>
        <Route exact path='/person/:id' component={Person} />
      </Switch>
    </Router>
  );
}

export default App;
