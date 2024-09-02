import { useNavigate } from "react-router-dom";
export default function ItemDetails() {
  const navigate = useNavigate();
  return (
    <>
      <h1>This will soon be the "Item-Details" page...</h1>

      <button type="button" onClick={() => navigate("/")}>
        Return To Main Page
      </button>
    </>
  );
}
