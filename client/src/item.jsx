import { Link } from "react-router-dom";
import { useState } from "react";

export default function Item({
  itemId,
  name,
  img,
  condition,
  description,
  item,
  hasLoaded,
}) {
  
  
  const itemData = {
    itemId,
    name,
    img,
    condition,
    description,
    //item : item,
    hasLoaded,
  };
  const idType = typeof itemId;

  const itemElement = (
    <figure>
      <img src={img} alt={name} width="300" height="300"></img>
      <figcaption>{name}</figcaption>
    </figure>
  );

  return (
    <div className="single-item">
      {idType === "number" ? (
        <Link to={{ pathname: `/item-details/${itemId}`, state: itemData }}>
          {itemElement}
        </Link>
      ) : (
        itemElement
      )}

      <p>
        Condition: <b>{condition}</b>
      </p>
    </div>
  );
}
