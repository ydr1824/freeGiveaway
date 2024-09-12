import logo from "./assets/logo.svg";
import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Item from "./item.jsx";
import { allItems } from "./all-items.jsx";

export default function ItemDetails() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const returnBtn = useRef(null);
  const navigate = useNavigate();
  const params = useParams();
  const index = params.id - 1;

  function goToLogin(event) {
    setIsLoggedIn(false);
    const hideBtn = event.target;
    hideBtn.style.display = "none";
    returnBtn.current.style.display = "none";
    setTimeout(() => navigate("../auth/login"), 2000);
  }

  return (
    <>
      <img src={logo} className="logo react" alt="Give Away logo" />

      <section>
        <button type="button" onClick={goToLogin}>
          Not Logged-In
        </button>
      </section>

      {isLoggedIn ? (
        <section>
          <h2>{allItems[index].name}</h2>

          <section>
            <Item
              key={allItems[index].id}
              img={allItems[index].url}
              condition={allItems[index].condition}
            />

            <h3>Description:</h3>
            <p>{allItems[index].description}</p>
          </section>

          <section>
            <button
              type="button"
              onClick={() =>
                navigate("/my-cart", {
                  state: {
                    item_id: allItems[index].id,
                    name: allItems[index].name,
                    url: allItems[index].url,
                    condition: allItems[index].condition,
                  },
                })
              }
            >
              Get Item
            </button>
          </section>
        </section>
      ) : (
        <h2>Log-in to view Item!</h2>
      )}

      <section ref={returnBtn}>
        <button type="button" onClick={() => navigate("/")}>
          Return To Main Page
        </button>
      </section>
    </>
  );
}
