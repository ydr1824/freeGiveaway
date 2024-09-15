import login_logo from "./assets/login.svg";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

export function Login(props) {
  function ChangePageTitle() {
    document.title = props.title;
  }

  useEffect(() => ChangePageTitle, []);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();

    const email = event.target.username.value;
    const password = event.target.password.value;
    console.log(email, password);

    try {
      const response = await fetch("http://localhost:3000/register/login", {
        method: "POST",
        //credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const result = await response.text();
      console.log(result);
      //setCurrentUser(result.user_id);

      setMsg(result);
      setShowMsg(true);

      setTimeout(() => {
        navigate("/", { state: { userId: result.user_id } });
      }, 5000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <section>
        <h1>THE LOGIN PAGE!</h1>
        <img src={login_logo} className="logo react" alt="login logo" />
      </section>

      {showMsg ? (
        <h1>{msg}</h1>
      ) : (
        <>
          <section>
            <h3>Please fill out the fields below to log-in to Give-Away:</h3>
          </section>

          <form className="login-form" onSubmit={submitHandler}>
            <section className={"login-form__username"}>
              <label htmlFor="username">Email</label>
              <br />
              <input
                id="username"
                name="username"
                type="text"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
              />
            </section>
            <section className="login-form__password">
              <label htmlFor="password">Password</label>
              <br />
              <input
                id="password"
                name="password"
                type="password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
              />
            </section>
            <section className="login-form__actions">
              <button type="submit">Log in</button>
            </section>
          </form>
          <h3>You don't have an Account?</h3>
          <button type="button" onClick={() => navigate("/sign-up")}>
            Sign Up
          </button>
        </>
      )}

      <section>
        <button type="button" onClick={() => navigate("/")}>
          Return To Main Page
        </button>
      </section>
    </>
  );
}
