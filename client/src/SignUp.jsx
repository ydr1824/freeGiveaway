import { useNavigate } from "react-router-dom"
import { useFormik } from 'formik'
import { SignupSchema } from "./signUpSchema"



export function SignUp() {
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: "",
           // userName: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: SignupSchema,
        onSubmit: signUpHandler
    })

    async function signUpHandler(values) {
        const res = await fetch('.../users/create', {
            method: 'POST',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phone: values.phone,
                //username: values.userName,
                password: values.password,
            })
        })
        const result = await res.json()
        console.log(result)

        navigate('/login')
    }

    return (
        <>

            <div className="sign-up-div">
                this is the signup Component
                <form className="sign-up-form" onSubmit={formik.handleSubmit}>
                    <section className="sign-up-form__name" >
                        <label htmlFor="firstName"> First Name</label>
                        <input
                            value={formik.values.firstName}
                            id="firstName"
                            name="firstName"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <p className="err-msg">{formik.touched.firstName ? formik.errors.firstName : ""} </p>

                        <label htmlFor="lastName"> Last Name</label>
                        <input
                            value={formik.values.lastName}
                            id="lastName"
                            name="lastName"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <p className="err-msg">{formik.touched.lastName ? formik.errors.lastName : ""} </p>
                    </section>
                    <section className="sign-up-form__email">
                        <label htmlFor="email"> Email</label>
                        <input
                            value={formik.values.email}
                            id="email"
                            name="email"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <p className="err-msg">{formik.touched.email ? formik.errors.email : ""} </p>
                    </section>
                    <section className="sign-up-form__phone">
                        <label htmlFor="phone"> Phone</label>
                        <input
                            value={formik.values.phone}
                            id="phone"
                            name="phone"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <p className="err-msg">{formik.touched.phone ? formik.errors.phone : ""} </p>
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
                        <input
                            value={formik.values.password}
                            id="password"
                            name="password"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <p className="err-msg">{formik.touched.password ? formik.errors.password : ""} </p>
                    </section>
                    <section className="sign-up-form__confirmPassword">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            value={formik.values.confirmPassword}
                            id="confirmPassword"
                            name="confirmPassword"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <p className="err-msg">{formik.touched.confirmPassword ? formik.errors.confirmPassword : ""} </p>
                    </section>
                    <section className="sign-up-form__actions">
                        <button type="submit" className={formik.errors ? "" : 'disabled'}> Sign Up</button>
                    </section>
                </form>
                Yuo have an Account already? click here 
                <button onClick={() => navigate('/login')}>Login</button>
            </div>

        </>
    )

}