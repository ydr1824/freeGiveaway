import { useState, useEffect, useRef } from "react";
import logo from "./assets/logo.svg";
import "./App.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { allItems } from "./all-items.jsx";
import Item from "./item.jsx";

function App(props) {
  const [askToLogin, setAskToLogin] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  //console.log(state);

  function ChangePageTitle() {
    document.title = props.title;
  }

  function askForLogin(time) {
    setTimeout(() => setAskToLogin(true), time);
  }
  useEffect(() => {
    ChangePageTitle(), askForLogin(5000);
  }, []);

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/items", {
          method: "GET",
        });

        const result = await response.json();
        console.log(result);

        setHasLoaded(true);
        setItems(result);
      } catch (error) {
        console.error(error.message);
      }
    };
    getItems();
  }, []);

  return (
    <>
      <h1>WELCOME TO "GIVE-AWAY"!!!</h1>

      <div>
        <img src={logo} className="logo react" alt="Give Away logo" />
      </div>

      {askToLogin ? (
        <section>
          <h2>Please Log-in to enjoy the best experience! </h2>
        </section>
      ) : (
        ""
      )}

      <section>
        <button type="button" onClick={() => navigate("auth/login")}>
          Login
        </button>

        <p>Don't have an account yet?</p>

        <button type="button" onClick={() => navigate("/sign-up")}>
          Create Account
        </button>
      </section>

      {askToLogin ? (
        <>
          <button type="button" onClick={() => setAskToLogin(false)}>
            Dismiss
          </button>
          <button
            type="button"
            onClick={() => {
              setAskToLogin(false);
              askForLogin(15000);
            }}
          >
            Remind Me Later
          </button>
        </>
      ) : (
        <>
          {hasLoaded ? (
            <section>
              <div>
                <h1>from server!</h1>
              </div>
              <h2>Discover Our Hot Deals!!</h2>

              {items.map((item) => (
                <Item
                  key={item.id}
                  itemId={item.id}
                  name={item.name}
                  img={item.url}
                  condition={item.condition}
                  description={item.description}
                  item={item}
                  hasLoaded={true}
                ></Item>
              ))}
            </section>
          ) : (
            <div>
              <div>
                <h1>from client-side!</h1>
              </div>

              <section>
                <h2>Discover Our Hot Deals!!</h2>

                {allItems.map((item) => (
                  <Item
                    key={item.id}
                    itemId={item.id}
                    name={item.name}
                    img={item.url}
                    condition={item.condition}
                    hasLoaded={false}
                  ></Item>
                ))}
              </section>
            </div>
          )}

          <section>
            <Link to={"/add-item-formik"} className="link">
              <button type="button">Add New Item</button>
            </Link>
          </section>
          <a href="#top">Return to top of the page</a>
        </>
      )}
    </>
  );
}

export default App;
