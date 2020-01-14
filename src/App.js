import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListBookComponent from "./component/library/ListBookComponent";
import AddBookComponent from "./component/library/AddBookComponent";
import EditBookComponent from "./component/library/EditBookComponent";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Router>
          <div className="col-md-6">
            <h1 className="text-center" style={style}>React Library Application</h1>
            <Switch>
              <Route path="/" exact component={ListBookComponent} />
              <Route path="/books" component={ListBookComponent} />
              <Route path="/add-book" component={AddBookComponent} />
              <Route path="/edit-book" component={EditBookComponent} />
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
}

const style = {
  color: 'red',
  margin: '10px'
}

export default App;
