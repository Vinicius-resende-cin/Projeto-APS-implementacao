import { Routes, Route, Link } from "react-router-dom";
import OrderDetails from "./pages/OrderDetails";
import "./App.css";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <div>
              <h1>Delivery Control</h1>
              <Link to="details?orderId=1">Order 1</Link>
            </div>
          }
        />
        <Route path="details" element={<OrderDetails />} />
      </Routes>
    </div>
  );
}

export default App;
