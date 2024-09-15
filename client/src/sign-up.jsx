import login_logo from "./assets/login.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { SignupSchema } from "./sign-up-schema.js";

export function SignUp(props) {
  const navigate = useNavigate();

  function ChangePageTitle() {
    document.title = props.title;
  }

  useEffect(() => ChangePageTitle, []);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      // userName: '',
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: signUpHandler,
  });

  async function signUpHandler(values) {
    console.log("done")

    const res = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        //username: values.userName,
        password: values.password,
      }),
    });
    const result = await res.json();
    console.log(result);
   
    //navigate("/");
  }

  return (
    <>
      <section>
        <h1>THE SIGN-UP PAGE!</h1>
        <img src={login_logo} className="logo react" alt="login logo" />
      </section>

      <section>
        <h3>
          Please fill out the fields below to Create Account on Give-Away:
        </h3>
      </section>

      <div className="sign-up-div">
        <form
          className="sign-up-form"
          onSubmit={formik.handleSubmit}
        >
          <section className="sign-up-form__name">
            <label htmlFor="firstName"> First Name </label>
            <br />
            <input
              value={formik.values.firstName}
              id="firstName"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="err-msg">
              {formik.touched.firstName ? formik.errors.firstName : ""}{" "}
            </p>

            <label htmlFor="lastName"> Last Name</label>
            <br />
            <input
              value={formik.values.lastName}
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="err-msg">
              {formik.touched.lastName ? formik.errors.lastName : ""}{" "}
            </p>
          </section>
          <section className="sign-up-form__email">
            <label htmlFor="email"> Email</label>
            <br />
            <input
              value={formik.values.email}
              id="email"
              name="email"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="err-msg">
              {formik.touched.email ? formik.errors.email : ""}{" "}
            </p>
          </section>
          <section className="sign-up-form__phone">
            <label htmlFor="phone"> Phone</label>
            <br />
            <input
              value={formik.values.phone}
              id="phone"
              name="phone"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="err-msg">
              {formik.touched.phone ? formik.errors.phone : ""}{" "}
            </p>
          </section>
          {/* <section className="sign-up-form__username">
                        <label htmlFor="username"> Username</label>
                        <input
                            value={formik.values.userName}
                            id="userName"
                            name="userName"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <p className="err-msg">{formik.touched.userName ? formik.errors.userName : ""} </p>
                    </section> */}
          <section className="sign-up-form__password">
            <label htmlFor="password"> Password</label>
            <br />
            <input
              value={formik.values.password}
              id="password"
              name="password"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="err-msg">
              {formik.touched.password ? formik.errors.password : ""}{" "}
            </p>
          </section>
          <section className="sign-up-form__confirmPassword">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <br />
            <input
              value={formik.values.confirmPassword}
              id="confirmPassword"
              name="confirmPassword"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="err-msg">
              {formik.touched.confirmPassword
                ? formik.errors.confirmPassword
                : ""}{" "}
            </p>
          </section>
          <section className="sign-up-form__actions">
            <button type="submit" className={formik.errors ? "" : "disabled"}>
              {" "}
              Sign Up
            </button>
          </section>
        </form>
        <h3>You have an Account already? click here:</h3>
        <button onClick={() => navigate("../auth/login")}>Login</button>

        <section>
          <button type="button" onClick={() => navigate("/")}>
            Return To Main Page
          </button>
        </section>
      </div>
    </>
  );
}
