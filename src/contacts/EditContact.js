import React, { useState, useEffect } from "react";
import axios from "axios";
import "../form/contact_form.css";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

const EditContactUrl = `https://ivy-phonebook.herokuapp.com/phonebook/contactEdit/4/`;
const editcontactPost = (contact) => axios.post(EditContactUrl, contact);

function EditContact(props) {
  const dataContent = useLocation();
  const navigate = useNavigate();

  const [firstName, setFirstNames] = React.useState(
    dataContent.state.value.firstName
  );
  const [lastName, setLastName] = React.useState(
    dataContent.state.value.lastName
  );
  const [phoneNumber, setPhoneNumber] = React.useState(
    dataContent.state.value.phoneNumber
  );
  const [email, setEmail] = React.useState(dataContent.state.value.email);
  const [idname, setIdname] = React.useState();

  const EditContactsk = `https://ivy-phonebook.herokuapp.com/phonebook/contactEdit/${idname}/`;

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     setIdname(100)
  //     editcontactPost({
  //       firstName :firstName,
  //   lastName : lastName,
  //   phoneNumber :phoneNumber,
  //   email : email,
  //   id: dataContent.state.value.id
  //     })

  const handleSubmit = (e) => {
    e.preventDefault();
    setIdname(100);
    editcontactPost();
    axios
      .post(
        `https://ivy-phonebook.herokuapp.com/phonebook/contactEdit/${dataContent.state.value.id}/`,
        {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          email: email,
          id: dataContent.state.value.id,
        }
      )
      .then((response) => {
        console.log(response.data);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  // navigate('/')

  // console.log(EditContactsk)
  //     // console.log("dispatch",newContact)
  // }

  return (
    <div>

      <div className='contact_form'>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <div className='form_title'>
              <div className='contact_title'>
                <h2>Add Contact</h2>
              </div>
            </div>

            <label>First Name</label>
            <input
              type='text'
              name='firstName'
              onChange={(e) => setFirstNames(e.target.value)}
              value={firstName}
            ></input>

            <label>Last Name</label>
            <input
              type='text'
              name='lastName'
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            ></input>

            <label>Phone number</label>
            <input
              type='tel'
              name='phoneNumber'
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
            ></input>

            <label>Email</label>
            <input
              type='email'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></input>
          </fieldset>
          <div className='button_container'>
            <button type='submit' style={{marginTop:"10px",backgroundColor:"#0892d0",border:"None"}}>Edit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditContact;
