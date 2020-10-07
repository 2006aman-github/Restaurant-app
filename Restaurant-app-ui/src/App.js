import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Menu from "./components/Menu";
// d2ea6f5fcd3ca442e5eddf1429511d5d
function App() {
  const [menu, setMenu] = useState(true);
  // APP KEY
  // 1a8a49d2e98164ae927468111ac6dc08

  // APP ID
  // 0e3b1be9
  return <div className="App">{menu ? <Menu /> : <Home />}</div>;
}

export default App;
