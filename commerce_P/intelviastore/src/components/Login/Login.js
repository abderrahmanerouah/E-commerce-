
import React, {useState} from "react";
// import logo from './logo.svg';

import {useSpring, animated} from 'react-spring';
import useAuth from '../../Auth/useAuth';







function Auth() {



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
            <animated.form action='' id='loginform'style={loginProps} ><LoginForm /></animated.form> 
            <animated.form action='' id='registerform'style={registerProps} ><RegisterForm/></animated.form> 
            </div>
            <animated.div className="forgot-panel" style={loginProps} id="forgot-panel">
              <a href=" ">Forgot your password </a>
            </animated.div>
        </div>
    </div>
  );
}


//8888888888888888888888888888888888888888888888888888888888888888888888888


function LoginForm( ){

const Auth = useAuth();

  function validation () {
    const UsernameErr = {};
    const PasswordErr={};
    let isValid = true;

    if(Username.trim().length<4){
      UsernameErr.UsernameShort = "Invalid user name";
      isValid =false;
    }

    if(Password.trim().length<5){
      PasswordErr.PasswordSolve = "Invalid Password ";
      isValid =false;
    }

    setUserNameErr(UsernameErr);
    setPasswordErr(PasswordErr);

    if(isValid){
      login();
    }
    return isValid;

  }

    const [Username , setfullName] = useState('');
    const [ Password , setpassword ] = useState('');

    const [UsernameErr , setUserNameErr] = useState({});
    const [PasswordErr , setPasswordErr] =useState({});

    const  login = () => {

        console.log({Username , Password})

return fetch('http://localhost:51858/api/authenticate/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({Username , Password})
      })
        .then(data => data.json()).then(data =>  Auth.logIn(data.token) )

        
    }



  return( 

      <React.Fragment> 

      <label for='username'  >USERNAME</label>
      <input type='text' id='username' value = {Username} onChange={name => setfullName(name.currentTarget.value)} />
      {Object.keys(UsernameErr).map((key)=>{
           return <div style={{color : "red" , fontSize: 15}}> {UsernameErr[key]}</div>
         })}


      <label for='password'  >PASSWORD</label>
      <input type='password' id='password' value={Password} onChange={pass => setpassword(pass.currentTarget.value)}  />
      {Object.keys(PasswordErr).map((key)=>{
           return <div style={{color : "red" , fontSize: 15  }}> {PasswordErr[key]}</div>
            })}

      <input onClick={validation}  value='submit' className='submit'/>
      </React.Fragment>
   
  )
}

//8888888888888888888888888888888888888888888888888888888888888888888888888888888888


function RegisterForm () {



    const [Username , setUserName] = useState('');
    const [Email , setemail] = useState('');
    const [ Password , setpassword ] = useState('');

    const [UsernameErr , setUserNameErr] = useState({});
    const [EmailErr , setemailErr] = useState({});
    const [PasswordErr , setPasswordErr] =useState({});
  
    const onSubmit = (e)=>{
      e.preventDefault();

      const isValid = formValidation();

      //return api wen valid ..
      if(isValid){
        setUserName("");
        setemail("");
        setUserName("");
      }
    }

   function formValidation (){
      const UsernameErr = {};
      const EmailErr = {};
      const PasswordErr={};
      let isValid = true;

      if(Username.trim().length<4){
        UsernameErr.UsernameShort = "Invalid user name";
        isValid =false;
      }

      //  if(Username || Email || Password === ""){
      //   UsernameErr.UsernameShort = "Username champ is Empty ";
      //   EmailErr.EmailSolve = " Email champ is Empty ";
      //   PasswordErr.PasswordSolve = "Pssword champ is Empty "
      //  }
       
      if(!Email.includes("@gmail.com")){
        EmailErr.EmailSolve = "Inccorect Email ";
      }

      if(Password.trim().length<5){
        PasswordErr.PasswordSolve = "Invalid Password ";
      }

      setUserNameErr(UsernameErr);
      setemailErr(EmailErr);
      setPasswordErr(PasswordErr);

    if(isValid){
      Register();
    }
      return isValid;
    }

const Register = ()=>{

return fetch('http://localhost:51858/api/authenticate/register', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({Username ,Email ,Password})
      })
        .then(data =>  data.json())
    }
    
return(
<React.Fragment>

    <form onSubmit={onSubmit} >
     
    <label htmlfor='Username'>FULL NAME</label>
           <input type='text' name="Username"  value = {Username}  onChange={Username => setUserName(Username.currentTarget.value)}  
             id='Username'/>
     
         {Object.keys(UsernameErr).map((key)=>{
           return <div style={{color : "red" , fontSize: 15}}> {UsernameErr[key]}</div>
         })}

         
           <labe   htmlfor='email'>Email</labe>
           <input type='text' value={Email}  onChange={Email=> setemail(Email.currentTarget.value)}  
             id='email'  />
           {Object.keys(EmailErr).map((key)=>{
           return <div style={{color : "red" , fontSize: 15  }}> {EmailErr[key]}</div>
         })}
          
           <label  htmlfor='password'>PASSWORD</label>
           <input type='password' value={Password}  onChange={Password => setpassword(Password.currentTarget.value) }  
            id='password' />
             {Object.keys(PasswordErr).map((key)=>{
           return <div style={{color : "red" , fontSize: 15  }}> {PasswordErr[key]}</div>
            })}
         
           <label  htmlfor='confirmationpassword'>CONFIRMATION PASSWORD</label>
           <input type='password'  id='confirmationpassword'/>
           <input onClick={ formValidation}   value='submit' className='submit'/> 
    </form>
 </React.Fragment>

  );
  }
    


  
export default Auth ;