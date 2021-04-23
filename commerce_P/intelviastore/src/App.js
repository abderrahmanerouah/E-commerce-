
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Preferences';
import RegisterForm from './components/Login/Login';
import React , {useState , useEffect} from "react"
import AuthContext from './Auth/context';
import authStorage from './Auth/storage';


 



function App() {



  const [user , setUser] = useState();

const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
    
  };

  useEffect(()=>{
      restoreUser();
  }, [])

  return (


<AuthContext.Provider value={{user , setUser }} >
    <div className="wrapper">
      <BrowserRouter>

    {user ?
     <Switch>  
          <Route path=''>
               <Dashboard />
          </Route>
            <Route path='/Preferences'>
               <Preferences/>
          </Route>
     </Switch> :
     <Switch>
            <Route path=''>
               <RegisterForm />
            </Route>
     </Switch> 
     
           }
      </BrowserRouter>
    </div>
    </AuthContext.Provider>
  );
}

export default App; 