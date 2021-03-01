import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { SAGA_ACTIONS } from "./services/action";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SAGA_ACTIONS.FETCH_USERS_REQUEST });
  }, []);

  const obtainedUsers = useSelector((state) => state.users);
  console.log(obtainedUsers);

  return <div className="App"></div>;
}

export default App;
