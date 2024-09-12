import { SignUp } from "./SignUp"
import { Login } from "./Login"
import { useNavigate } from "react-router-dom"



export function MainPage(){
    const navigate = useNavigate()

    return(
        <>
       
       <div> This is the main page
       <button onClick={() => navigate('/sign-up')}>Sign UP </button>

        <button onClick={() => navigate('/login')}>Login</button>
        </div>
        </>
    )
}