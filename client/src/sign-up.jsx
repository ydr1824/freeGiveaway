import { useNavigate } from "react-router-dom";
function SignUp() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Working on it...</h1>
      <button type="button" onClick={() => navigate("/")}>
        Return To Main Page
      </button>
    </>
  );
}

export default SignUp;
