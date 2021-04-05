import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { People } from "./modules/People";
import { PersonDetails } from "./modules/PersonDetails";
import { PaginationController } from "./contexts/PaginationContext";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/DefaultTheme";
import Navbar from "./modules/Navbar";
import { SearchController } from "./contexts/SearchContext";
import { DataController } from "./contexts/DataContext";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <DataController>
        <PaginationController>
          <SearchController>
            <Router>
              <Navbar />
              <Switch>
                <Route exact path='/'>
                  <People />
                </Route>
                <Route exact path='/person/:name'>
                  <PersonDetails />
                </Route>
              </Switch>
            </Router>
          </SearchController>
        </PaginationController>
      </DataController>
    </MuiThemeProvider>
  );
}

export default App;
