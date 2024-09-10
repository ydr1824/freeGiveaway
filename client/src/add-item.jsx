import logo from "./assets/logo.svg";
import { allItems, singleItem } from "./all-items.jsx";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { itemSchema } from "./ItemSchema.js";

export default function AddItem() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [itemName, setItemName] = useState("");
  const [itemUrl, setItemUrl] = useState("");
  const [condition, setCondition] = useState("Unknown");
  const [description, setDescription] = useState("");
  const formSection = useRef(null);
  let descriptionRef = useRef(null);
  const itemAddedSection = useRef(null);
  const itemAddedMsg = useRef(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
        itemName: '',
        itemLink: '',
        condition: '',
        description: ''
    },
    validationSchema: itemSchema,
    onSubmit: handleSubmit
  })



  function handleSubmit(event) {
    event.preventDefault();
    const newSingleItem = singleItem;
    newSingleItem.id = allItems.length + 1;
    newSingleItem.name = itemName;
    newSingleItem.url = itemUrl;
    newSingleItem.condition = condition;
    newSingleItem.description = description;

    allItems.push(newSingleItem);
    console.log(newSingleItem);
    console.log(allItems);
    formSection.current.style.display = "none";
    itemAddedSection.current.style.display = "block";
    itemAddedMsg.current.style.display = "block";
    console.log(description);
  }

  function handleResetBtn() {
    setItemName("");
    setItemUrl("");
    setCondition("");
    setDescription("");
  }

  function handleAddBtn() {
    setItemName("");
    setItemUrl("");
    setCondition("");
    formSection.current.style.display = "block";
    descriptionRef.current.value = "";
    itemAddedSection.current.style.display = "none";
  }

  function handleReturnBtn() {
    navigate("/");
  }

  function goToLogin(event) {
    setIsLoggedIn(false);
    const hideBtn = event.target;
    hideBtn.style.display = "none";
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
          <form ref={formSection} onSubmit={formik.handleSubmit}>
            <label htmlFor="item_Name">Item Name:</label>
            <br />
            <input
              type="text"
              id="item_Name"
              name="item_Name"
              onChange={formik.handleChange}
              value={formik.values.itemName}
              onBlur={formik.handleBlur}
            ></input>
            <p className="err-msg">{formik.touched.itemName ? formik.errors.itemName : ""} </p>
            <br />
            <label htmlFor="link">URL:</label>
            <br />
            <input
              type="text"
              id="link"
              name="link"
              onChange={formik.handleChange}
              value={formik.values.itemLink}
              onBlur={formik.handleBlur}
            ></input>
            <p className="err-msg">{formik.touched.itemLink? formik.errors.itemLink : ""} </p>

            <br />

            <label htmlFor="condition">Condition:</label>
            <br />
            <select
              id="condition"
              name="condition"
              onChange={formik.handleChange}
              value={formik.values.condition}
              onBlur={formik.handleBlur}
            >
              <option value="Unknown">Select One Option</option>
              <option>New</option>
              <option>Refurbished</option>
              <option>Open Box</option>
              <option>Used</option>
              <option>Damaged</option>
            </select>
            <p className="err-msg">{formik.touched.condition? formik.errors.condition: ""} </p>
            <section>
              <label htmlFor="description">Description:</label>
              <br />
              <textarea
                id="description"
                name="description"
                //ref={descriptionRef}
                value={formik.values.description}
                rows="8"
                cols="40"
                placeholder="Type here your item description:"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              <p className="err-msg">{formik.touched.description? formik.errors.description: ""} </p>
            </section>
            <section>
              {" "}
              <button type="submit">Submit</button>
              <button type="reset" onClick={handleResetBtn}>
                Reset
              </button>
            </section>
          </form>

          <section ref={itemAddedSection} style={{ display: "none" }}>
            <h2 className="msg" ref={itemAddedMsg}>
              you added a new item successfully!!
            </h2>

            <section>
              <figure>
                <img
                  src={itemUrl}
                  alt={itemName}
                  width="300"
                  height="300"
                ></img>
                <figcaption>
                  <i>{itemName}</i>
                </figcaption>
                <p>Description: {description}</p>
                <p>
                  Condition: <b>{condition}</b>
                </p>
              </figure>
            </section>

            <button type="button" onClick={handleAddBtn}>
              Add Another Item
            </button>
            <button type="button" onClick={handleReturnBtn}>
              Return To Main Page
            </button>
          </section>
        </section>
      ) : (
        <h2>Log-in to add Item!</h2>
      )}
    </>
  );
}