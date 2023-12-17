import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import OrderDetails from "./pages/OrderDetails";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Hello, World!</h1>
              <Link to="details?orderId=123">Order 123</Link>
            </div>
          }
        />
        <Route path="details" element={<OrderDetails />} />
      </Routes>
    </div>
  );
}

export default App;
