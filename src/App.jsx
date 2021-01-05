import React from "react";
import Users from "./components/Users";
import { Provider } from "react-redux";
import generateStore from "./redux/store";

function App() {
  const store = generateStore();

  return (
    <Provider store={store}>
      <Users />
    </Provider>
  );
}

export default App;
