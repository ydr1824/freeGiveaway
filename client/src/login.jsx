import login_logo from "./assets/login.svg"
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export function Login() {
  const navigate = useNavigate();
  const emailElem = useRef(null);
  const passwordElem = useRef(null);
  const submitHandler = async (event) => {
    event.preventDefault();

    const email = event.target.username.value;
    const password = event.target.password.value;

    try {
      const response = await fetch(".../auth/login", {
        method: "POST",
        // mode: 'cors',
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const result = await response.json();
      setCurrentUser(result.user_id);

      console.log(result);
      navigate("/", { state: { userId: result.user_id } });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <img src={login_logo} className="logo react" alt="login logo" />
      <h1>THE LOGIN PAGE!</h1>
      <form className="login-form" onSubmit={submitHandler}>
        <section className={"login-form__username"}>
          <label htmlFor="username">Email</label>
          <br/>
          <input ref={emailElem} id="username" name="username" type="text" />
        </section>
        <section className="login-form__password">
          <label htmlFor="password">Password</label>
          <br/>
          <input
            ref={passwordElem}
            id="password"
            name="password"
            type="password"
          />
        </section>
        <section className="login-form__actions">
          <button type="submit">Log in</button>
        </section>
      </form>
      <h3>You don't have an Account? click here: </h3>
      <button type="button" onClick={() => navigate("/sign-up")}>
        Sign Up
      </button>

      <section>
        <button type="button" onClick={() => navigate("/")}>
          Return To Main Page
        </button>
      </section>
    </>
  );
}
