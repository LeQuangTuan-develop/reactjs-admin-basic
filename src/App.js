import './app.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from './context/AuthContext'
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Messenger from "./pages/messenger/Messenger"
import Admin from './pages/admin/Admin';

function App() {
  const {user} = useContext(AuthContext)

  return (
    <Router>
      {user ? 
      <>
      <Switch>
        <Route exact path="/messenger">
          <Messenger />
        </Route>
        <Route path="/">
          <Admin />
        </Route>
      </Switch>
      
      </>
      :
      <Switch>
        <Route path="/register" >
          <Register />
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/:something">
          <Redirect to="/" />
        </Route>
      </Switch>
      }
    </Router>
  );
}

export default App;
