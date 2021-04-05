import React, { Suspense } from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { People } from "./modules/People";
import { PersonDetails } from "./modules/PersonDetails";
import { PaginationController } from "./contexts/PaginationContext";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/DefaultTheme";
import Navbar from "./components/Navbar";
import { SearchController } from "./contexts/SearchContext";
import { DataController } from "./contexts/DataContext";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <SearchController>
        <DataController>
          <Navbar />
          <PaginationController>
            <Router>
              <Switch>
                <Route exact path='/'>
                  <People />
                </Route>
                <Route exact path='/person/:name'>
                  <PersonDetails />
                </Route>
              </Switch>
            </Router>
          </PaginationController>
        </DataController>
      </SearchController>
    </MuiThemeProvider>
  );
}

export default App;
