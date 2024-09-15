import logo from "./assets/logo.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import Item from "./item";

export default function MyCart(props) {
  function ChangePageTitle() {
    document.title = props.title;
  }

  useEffect(() => ChangePageTitle, []);

  const navigate = useNavigate();
  const location = useLocation();

  const [confirmed, setConfirmed] = useState(false);
  const [watchingItem, setWatchingItem] = useState(false);
  const [buttonMsg, setButtonMsg] = useState("Return To Main Page");

  const selectedItem = {
    id: location.state.item_id,
    name: location.state.name,
    url: location.state.url,
    condition: location.state.condition,
  };

  function handleConfirmBtn() {
    const confirmedOrder = selectedItem;
    setConfirmed(true);
    setButtonMsg("Continue Shopping");
  }

  function handleWatchListBtn() {
    const addToWatchList = selectedItem;
    setWatchingItem(true);
    setButtonMsg("Continue Shopping");
  }
  return (
    <>
      <img src={logo} className="logo react" alt="Give Away logo" />

      {confirmed ? (
        <h1>Order Confirmed Successfully!</h1>
      ) : watchingItem ? (
        <h1>Item Added Successfully To Your Watch List!</h1>
      ) : (
        <>
          <h1>Please confirm your order:</h1>
          <h2>{selectedItem.name}</h2>
          <img
            src={selectedItem.url}
            alt={selectedItem.name}
            width="300"
            height="300"
          ></img>
          <section>
            <button type="button" onClick={handleConfirmBtn}>
              Confirm
            </button>

            <button type="button" onClick={handleWatchListBtn}>
              Add To Watch List
            </button>
          </section>
        </>
      )}

      <section>
        <button type="button" onClick={() => navigate("/")}>
          {buttonMsg}
        </button>
      </section>
    </>
  );
}
