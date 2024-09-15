import logo from "./assets/logo.svg";
import { allItems, singleItem } from "./all-items.jsx";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { itemSchema } from "./item-schema.js";

export default function AddItemFormik(props) {
  function ChangePageTitle() {
    document.title = props.title;
  }

  useEffect(() => ChangePageTitle, []);

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [itemName, setItemName] = useState("");
  const [itemUrl, setItemUrl] = useState("");
  const [condition, setCondition] = useState("Unknown");
  const [description, setDescription] = useState("");
  const pageMsg = useRef(null);
  const formSection = useRef(null);
  let descriptionRef = useRef(null);
  const itemAddedSection = useRef(null);
  const itemAddedMsg = useRef(null);
  const navigate = useNavigate();
  const newSingleItem = singleItem;

  const formik = useFormik({
    initialValues: {
      itemName: "",
      itemLink: "",
      condition: "",
      description: "",
    },
    validationSchema: itemSchema,
    onSubmit: submitHandler,
  });

  /* name,
  description,
  //long_description: longDescription,
  image_url: urlFileName,
  category_id: categoryId,
  condition_id: conditionId,
  user_id: userId,*/

  async function postItem(newSingleItem) {
    console.log(newSingleItem);
    try {
      const response = await fetch("http://localhost:3000/items/", {
        method: "POST",

        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: newSingleItem.name,
          description: newSingleItem.description,

          image_url: newSingleItem.url,
          category_id: 1,
          condition_id: 1,
          user_id: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const result = await response.json();
      console.log(result);
    } catch (e) {
      console.error("this is an error:", e);
    }
  }

  function submitHandler(values, { resetForm }) {
    /*event.preventDefault();
    setItemName(formik.values.itemName);
    setItemUrl(formik.values.itemLink);
    setCondition(formik.values.condition);
    setDescription(formik.values.description);
  */

    newSingleItem.id = allItems.length + 1;
    newSingleItem.name = formik.values.itemName;
    newSingleItem.url = formik.values.itemLink;
    newSingleItem.condition = formik.values.condition;
    newSingleItem.description = formik.values.description;

    allItems.push(newSingleItem);
    console.log(newSingleItem);
    console.log(allItems);

    pageMsg.current.style.display = "none";
    formSection.current.style.display = "none";
    itemAddedSection.current.style.display = "block";
    itemAddedMsg.current.style.display = "block";
    console.log(description);

    resetForm();
    postItem(newSingleItem);
  }

  function handleAddBtn() {
    setItemName("");
    setItemUrl("");
    setCondition("");
    pageMsg.current.style.display = "block";
    formSection.current.style.display = "block";
    descriptionRef.current.value = "";
    itemAddedSection.current.style.display = "none";
  }

  function handleReturnBtn() {
    navigate("/");
  }

  function goToLogin(event) {
    setIsLoggedIn(false);
    pageMsg.current.style.display = "none";
    const hideBtn = event.target;
    hideBtn.style.display = "none";
    setTimeout(() => navigate("../auth/login"), 2000);
  }

  return (
    <>
      <div>
        <img src={logo} className="logo react" alt="Give Away logo" />
      </div>

      <h2 ref={pageMsg}>
        Please fill out the fields below to submit your new Item to Give-Away!
      </h2>

      <section>
        <button type="button" onClick={goToLogin}>
          Not Logged-In
        </button>
      </section>

      {isLoggedIn ? (
        <section>
          <form ref={formSection} onSubmit={formik.handleSubmit}>
            <label htmlFor="itemName">Item Name:</label>
            <br />
            <input
              type="text"
              id="itemName"
              name="itemName"
              onChange={formik.handleChange}
              value={formik.values.itemName}
              onBlur={formik.handleBlur}
            ></input>
            <p className="err-msg">
              {formik.touched.itemName ? formik.errors.itemName : ""}{" "}
            </p>
            <br />
            <label htmlFor="itemLink">URL:</label>
            <br />
            <input
              type="text"
              id="itemLink"
              name="itemLink"
              onChange={formik.handleChange}
              value={formik.values.itemLink}
              onBlur={formik.handleBlur}
            ></input>
            <p className="err-msg">
              {formik.touched.itemLink ? formik.errors.itemLink : ""}{" "}
            </p>

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
            <p className="err-msg">
              {formik.touched.condition ? formik.errors.condition : ""}{" "}
            </p>
            <section>
              <label htmlFor="description">Description:</label>
              <br />
              <textarea
                id="description"
                name="description"
                ref={descriptionRef}
                value={formik.values.description}
                rows="8"
                cols="40"
                placeholder="Type here your item description:"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              <p className="err-msg">
                {formik.touched.description ? formik.errors.description : ""}{" "}
              </p>
            </section>
            <section>
              {" "}
              <button type="submit">Submit</button>
              <button type="reset" onClick={() => formik.resetForm()}>
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
                  src={newSingleItem.url}
                  alt={newSingleItem.name}
                  width="300"
                  height="300"
                ></img>
                <figcaption>
                  <i>{newSingleItem.name}</i>
                </figcaption>
                <p>Description: {newSingleItem.description}</p>
                <p>
                  Condition: <b>{newSingleItem.condition}</b>
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
