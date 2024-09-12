import { useNavigate } from "react-router-dom"
import { useRef } from "react"

export function Login(){
    const navigate = useNavigate()
    const emailElem = useRef(null)
    const passwordElem = useRef(null)
    const submitHandler = async (event) => {
        event.preventDefault();
        
        const email = event.target.username.value;
        const password = event.target.password.value;

        try {
            const response = await fetch('.../auth/login', {
              method: 'POST',
              // mode: 'cors',
              credentials: 'include',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ email, password })
            });
            
            if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
            }
      
            const result = await response.json();
            setCurrentUser(result.user_id)
      
            console.log(result);
            navigate("/",{state: {userId : result.user_id}})
          } catch (error) {
            console.error('Error:', error);
          }
          
        };
        

    return (
        <>
        This is the Login Component
        <form className="login-form" onSubmit={submitHandler}>
        <section className={'login-form__username'}>
        <label htmlFor="username">Email</label>
        <input 
        ref={emailElem} 
        id="username" 
        name="username" 
        type="text"  />
        </section>
        <section className='login-form__password'>
        <label htmlFor="password">Password</label>
        <input 
        ref={passwordElem} 
        id="password" 
        name="password" 
        type="password"  />
        </section>
        <section className='login-form__actions'>
        <button type="submit">Log in</button>
        
        </section>
      </form> 
      Yuo don't have an Account click here 
        <button onClick={() => navigate('/sign-up')}>Sign UP </button>
        </>
    )
}