import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  return (
    <>
      <h3>THE LOGIN PAGE!</h3>
      <p>============================</p>
      <h1>Waiting for Mr. Lebowitz's code...</h1>

      <button type="button" onClick={() => navigate("/")}>
        Return To Main Page
      </button>
    </>
  );
}

export default Login;
