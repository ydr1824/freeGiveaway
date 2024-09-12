import { useState, useEffect } from "react";
import logo from "./assets/logo.svg";
import "./App.css";
import { Link } from "react-router-dom";
import { allItems } from "./all-items.jsx";
import Item from "./item.jsx";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <img src={logo} className="logo react" alt="Give Away logo" />
      </div>

      <h1>WELCOME TO "GIVE-AWAY"!!!</h1>

      <button type="button" onClick={() => navigate("auth/login")}>
        Login
      </button>

      <button type="button" onClick={() => navigate("/sign-up")}>
        Create Account
      </button>

      <h2>Our Hot Deals!!</h2>

      {allItems.map((item) => (
        <Item
          key={item.id}
          itemId={item.id}
          name={item.name}
          img={item.url}
          condition={item.condition}
        ></Item>
      ))}
      <section>
        <Link to={"/add-item"} className="link">
          <button type="button">Add New Item</button>
        </Link>
      </section>
      <a href="#top">Return to top of the page</a>
    </>
  );
}

export default App;
