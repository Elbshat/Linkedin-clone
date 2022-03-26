import { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth, onAuthStateChanged } from "./firebase";

import { setUser } from "./redux/actions";
import Home from "./components/Home";
import Login from "./components/Login";
import PrivateRoute from "./PrivateRoute";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userAuth);

  useEffect(() => {
    onAuthStateChanged(auth, (userInfo) => {
      if (userInfo) {
        dispatch(setUser(userInfo));
      } else {
        dispatch(setUser(null));
      }
    });
  }, [dispatch]);
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/home">
            <Home />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
