import { Link } from "react-router-dom";

export default function Item({ itemId, name, img, condition }) {
  return (
    <div className="single-item">
      <Link to={"/details"}>
        <figure>
          <img src={img} alt={name} width="400" height="400"></img>
          <figcaption>{name}</figcaption>
        </figure>
      </Link>
      <span>
        Condition: <b>{condition}</b>
      </span>
    </div>
  );
}
