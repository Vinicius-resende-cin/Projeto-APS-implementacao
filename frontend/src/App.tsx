import { Routes, Route } from "react-router-dom";
import OrderDetails from "./pages/OrderDetails";
import "./App.css";
import Login from "./pages/Login";
import OrderList from "./pages/OrderList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<OrderList />} />
        <Route path="details" element={<OrderDetails />} />
      </Routes>
    </div>
  );
}

export default App;
