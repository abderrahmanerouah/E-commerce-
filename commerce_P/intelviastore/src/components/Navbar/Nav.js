import React  from 'react';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import useAuth from '../../Auth/useAuth';
import '../../App.css';


export default function Navbaar() {

   const  {logOut} = useAuth();

  return(
    <div className=" nvb">
    <Navbar collapseOnSelect bg="light" expand="md" className="mb-3 navb ">
      <Navbar.Brand href="/" className="font-weight-bold text-muted">
        ProductStore
      </Navbar.Brand>
      <Nav>
          <Nav.Link href="/Dashboard" >Dashboard</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="/Preferences" >Product</Nav.Link>
        </Nav>
      
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <Nav.Link onClick={logOut} >Logout</Nav.Link>
        </Nav>
     
        
      </Navbar.Collapse>
    </Navbar>
    
  </div>
  );
}

