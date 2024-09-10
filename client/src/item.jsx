import { Link } from "react-router-dom";

export default function Item({ itemId, name, img, condition }) {
  const idType = typeof itemId;

  return (
    <div className="single-item">
      {idType === "number" ? (
        <Link to={`/item-details/${itemId}`}>
          <figure>
            <img src={img} alt={name} width="400" height="400"></img>
            <figcaption>{name}</figcaption>
          </figure>
        </Link>
      ) : (
        <figure>
          <img src={img} alt={name} width="300" height="300"></img>
          <figcaption>{name}</figcaption>
        </figure>
      )}

      <p>
        Condition: <b>{condition}</b>
      </p>
    </div>
  );
}
