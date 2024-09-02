import { allItems, singleItem } from "./all-items.jsx";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function AddItem() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [itemName, setItemName] = useState("");
  const [itemUrl, setItemUrl] = useState("");
  const [condition, setCondition] = useState("");
  const myRef = useRef(null);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const newSingleItem = singleItem;
    newSingleItem.id = allItems.length + 1;
    newSingleItem.name = itemName;
    newSingleItem.url = itemUrl;
    newSingleItem.condition = condition;
    allItems.push(newSingleItem);
    console.log(newSingleItem);
    console.log(allItems);
    const SuccessMsg = myRef.current;
    SuccessMsg.style.display = "block";
  }

  function handleAddBtn() {
    setItemName("");
    setItemUrl("");
    setCondition("");
  }

  function handleReturnBtn() {
    navigate("/");
  }

  function goToLogin(event) {
    setIsLoggedIn(false);
    setTimeout(() => navigate("/login"), 2000);
  }

  return (
    <>
      <button type="button" onClick={goToLogin}>
        Not Logged-In
      </button>
      {isLoggedIn ? (
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="item-name">Item Name</label>
            <input
              type="text"
              id="item_Name"
              name="item_name"
              onChange={(event) => setItemName(event.target.value)}
              value={itemName}
            ></input>
            <label htmlFor="link">URL</label>
            <input
              type="text"
              id="link"
              name="link"
              onChange={(event) => setItemUrl(event.target.value)}
              value={itemUrl}
            ></input>

            <label htmlFor="condition">Condition</label>
            <select
              id="dropDown"
              name="condition"
              onChange={(event) => setCondition(event.target.value)}
              value={condition}
            >
              <option>New</option>
              <option>Refurbished</option>
              <option>Open Box</option>
              <option>Used</option>
              <option>Damaged</option>
            </select>

            <button type="submit">Submit</button>
          </form>

          <div ref={myRef} style={{ display: "none" }}>
            <h2 className="msg">you added a new item successfully!!</h2>
            <button type="button" onClick={handleAddBtn}>
              Add Another Item
            </button>
            <button type="button" onClick={handleReturnBtn}>
              Return To Main Page
            </button>
          </div>
        </div>
      ) : (
        <h2>Log-in to add Item</h2>
      )}
    </>
  );
}
