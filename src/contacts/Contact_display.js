import React, { useState, useEffect } from "react";
import "./contact_display.css";
// import Button from '@material-ui/core/Button';
import SearchComponent from "../search/ContactSearch";


import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ContactDisplay = ()=>{
// function ContactDisplay() {
  const [contacts, setContacts] = React.useState([]);
  const [editId,setEditId] = React.useState([]);


const navigate = useNavigate()
  React.useEffect(() => {
    getContacts();
  }, []);

  let getContacts = async () => {
    try{
      let response = await fetch("https://ivy-phonebook.herokuapp.com/phonebook/contactView");
      let data = await response.json();
      setContacts(data);
    }catch(err){
      console.log("error", err)
    }

  };
  // console.log("fetched data: ", contacts);

  const handleDelete=(e) =>{

    console.log(e)
    const url = `https://ivy-phonebook.herokuapp.com/phonebook/deleteContact/${e}/`;
    axios.post(url).then(response=>console.log(response.data)).catch(err=>console.log(err))
    window.location.reload()
  }
  const openEditHandler =(value) =>{
    setEditId(value.id)
    console.log(value,'VALUE')
navigate('/edit-contact', {
  state:{
    value: value
  }
})

  }

  return (
    <div className='contact_view'>
      <div className="container">
      <div className="row">
      <div className="col-sm-8">

      </div>
      <div className="col-sm-4"></div>

      </div>
      </div>

      {/* menu bar to each page */}
      <div className='menu-barContainer'>
        <div className='menu-bar'>
          {/* links to pages */}

          {/* <span>All contacts</span> */}
          <Link to='/add-contact'>
            <span>Add contact</span>
          </Link>

          {/* <Link to='/SearchComponent'>
            <span>SearchComponent</span>
          </Link> */}

          <span></span>

        </div>
        <SearchComponent contacts={contacts} setContacts={setContacts}/>
      </div>

      <h1 className="text-center">Contacts</h1>

      {contacts ? (
        <div className='container'>
          {" "}
          <table className="table table-stripped">
            <thead>

            <tr>
              <th>S.No</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Phone Number</th>
              <th>Email</th>
            </tr>
            </thead>
            <tbody>

            {contacts.map((contact, index) => (
              <tr key={contact.id}>

                <td>{contact.id}</td>
                <td>{contact.firstName}</td>
                <td>{contact.lastName}</td>
                <td>{contact.phoneNumber}</td>
                <td>{contact.email}</td>
                <td>
                  <button className="btn-primary btn m-2" style={{backgroundColor:"#28a9d7"}} onClick={()=>openEditHandler(contact)}>edit</button>

                  <button type="submit" onClick={()=>handleDelete(contact.id)}className="btn-primary btn m-2" style={{backgroundColor:"red"}}>delete</button>
                  </td>
              </tr>


            ))}{" "}
            </tbody>

          </table>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default ContactDisplay;
