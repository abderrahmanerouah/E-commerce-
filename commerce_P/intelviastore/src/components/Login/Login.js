import React, {useState,Component} from "react";
import {useSpring, animated} from 'react-spring';
import { useFormik } from 'formik';






function App() {




const [registrationFormStatus , setRegistrationFormStatus] = useState(false);

const loginProps = useSpring({
left : registrationFormStatus ?  -500: 0 ,

})
const registerProps = useSpring({
left : registrationFormStatus ? 0 : 500 ,
})

const loginBtnProps = useSpring({borderBottom :registrationFormStatus ? 'solid 0px transparent' : 'solid 2px #1059FF'})

const registerBtnProps = useSpring({borderBottom :registrationFormStatus ?  'solid 2px #1059FF'  : 'solid 0px transparent'})


  function registerClicked(){ setRegistrationFormStatus(true)}
  function loginClicked(){ setRegistrationFormStatus(false)}

  return (
<div className="container">
        <div className="intelvia-wrapper">
            <div className="nav-buttons">
              <animated.button style={loginBtnProps} onClick={loginClicked } id="loginBtn" class="active">Login</animated.button>  
              <animated.button style={registerBtnProps} onClick={registerClicked } id="registerBtn">Register</animated.button>
            </div>
            <div className="form-group">
            <animated.form action='' id='loginform'style={loginProps} ><LoginForm/></animated.form> 
            <animated.form action='' id='registerform'style={registerProps} ><RegisterForm/></animated.form> 
            </div>
            <animated.div className="forgot-panel" style={loginProps} id="forgot-panel">
              <a href="#">Forgot your password </a>
            </animated.div>
        </div>
    </div>
  );
}

function LoginForm(){


    const [Username , setfullName] = useState('');
    const [ Password , setpassword ] = useState('');

    const  login = () => {
  

console.log({Username , Password})
return fetch('http://localhost:51858/api/authenticate/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({Username , Password})
      })
        .then(data => data.json()).then(data => console.log(data))
    }

  return(

      <React.Fragment> 
      <label for='username'  >USERNAME</label>
      <input type='text' id='username' value = {Username} onChange={name => setfullName(name.currentTarget.value)} />
      <label for='password'  >PASSWORD</label>
      <input type='text' id='password' value={Password} onChange={pass => setpassword(pass.currentTarget.value)}  />
      <input onClick={login}  value='submit' className='submit'/>
      </React.Fragment>
   
  )
}

//8888888888888888888888888888888888888888888888888888888888888888888888888888888888



function RegisterForm(){

    const [Username , setfullName] = useState('');
    const [Email , setemail] = useState('');
    const [ Password , setpassword ] = useState('');


const  register = () => {
return fetch('http://localhost:51858/api/authenticate/register', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({Username ,Email ,Password})
      })
        .then(data => data.json())
    }


    const validate = values => {
      const errors = {};
    
      if (!values.Username) {
        errors.Username = 'Required';
      } else if (values.Username.length > 15) {
        errors.Username = 'Must be 15 characters or less';
      }
    
      if (!values.Email) {
        errors.Email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)) {
        errors.Email = 'Invalid email address';
      }
      if (!values.Password) {
        errors.Password = 'Required';
      } else if (values.Username.length > 10) {
        errors.Email = 'Invalid password';
      }
      return errors;
    };
    
    const SignupForm = () => {
      const formik = useFormik({
        initialValues: {
          Username: '',
          email: '',
          Password:'',

        },
        validate,
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });
return(
<React.Fragment>
  <form onSubmit={formik.handleSubmit}>
      <label for='fullname'>FULL NAME</label>
      <input type='text' name="Username" value = {formik.values.Username} onChange={name => setfullName(name.currentTarget.value )  (formik.handleChange) }onBlur={formik.handleBlur} id='fullname' />
      {formik.touched.Username && formik.errors.Username ? (
         <div>{formik.errors.Username}</div>
       ) : null}
      <label  for='email'>Email</label>
      <input type='email' name="email" value={formik.values.email} onChange={email =>  setemail(email.currentTarget.value) (formik.handleChange)} onBlur={formik.handleBlur} id='email' required/>
      {formik.touched.email && formik.errors.email ? (
         <div>{formik.errors.email}</div>
       ) : null}
      <label for='password'>PASSWORD</label>
      <input type='password'  name="Password" value={formik.values.Password} onChange={pass => setpassword(pass.currentTarget.value) (formik.handleChange)}  onBlur={formik.handleBlur}id='password' className="password" required/>
      {formik.touched.Password && formik.errors.Password ? (
         <div>{formik.errors.Password}</div>
       ) : null}
      
      <label for='confirmationpassword'>CONFIRMATION PASSWORD</label>
      <input type='password'  id='confirmationpassword' required/>
 
      <input onClick={register} value='submit' className='submit'/> 
  </form>
 </React.Fragment>

  )

}
}

export default App ;


