import React from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Regeister";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import CreatePost from "./Pages/CreatePost"
import AboutUs from './Pages/AboutUs';

const App = () => {
  return (
   <Router>
      <div className="App">
        <Switch>
          <Route exact path="/"><Home/></Route>
          <Route exact path="/aboutus"><AboutUs/></Route>
          {/* <Route exact path="/aboutus"><AboutUs/></Route> */}
          <Route exact path="/login"><Login/></Route>
          <Route exact path="/register"><Register/></Route>
          <Route exact path="/createpost"><CreatePost/></Route>
          <Route exact path="*"><NotFound/></Route>
        </Switch>
     
      </div>
    </Router>
  )
}

export default App