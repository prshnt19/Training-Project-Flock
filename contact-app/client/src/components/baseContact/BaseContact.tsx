import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setSelectedContact } from "../../redux/selectedContact";

import "./BaseContact.css";
import { grey } from "@mui/material/colors";
import Contact from "../../model/Contact";

interface BaseContactProps {
  heading_text: string;
  button_text: string;
  rootStyle: string;
  ContactHandler: (contact: Contact) => void;
}

const BaseContact = (props: BaseContactProps) => {
  const dispatch = useAppDispatch();
  const contact = useAppSelector((state) => state.selectedContact.value);

  // const validateEmail = (email: string) => {
  //   return email.match(
  //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //   );
  // };

  // const validateName = (name: string) => {
  //   return name.match(
  //     /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
  //   );
  // };

  // const validateContactNumber = (contactNumber: string) => {
  //   return contactNumber.match(
  //     /^[0-9]{15}$/
  //   );
  // };

  const changeHandler = (prop: string) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      if (props.button_text !== "Edit") {
        dispatch(
          setSelectedContact({ ...contact, [prop]: event.target.value })
        );
      }
    };
  };

  const ContactHandler = () => {
    props.ContactHandler(contact);
  };

  return (
    <Box className={props.rootStyle} border={1} borderColor={grey[400]}>
      <Typography variant="h4" color="#575757">
        {props.heading_text}
      </Typography>
      <form>
        <Box className="contactinfo">
          <TextField
            fullWidth
            margin="normal"
            id="outlined-required"
            label="Name"
            value={contact.name}
            onChange={changeHandler("name")}
          />
          <TextField
            fullWidth
            margin="normal"
            id="outlined-required"
            label="Contact Number"
            value={contact.contact}
            onChange={changeHandler("contact")}
          />
          <TextField
            fullWidth
            margin="normal"
            id="outlined-required"
            label="Email Id"
            value={contact.email}
            onChange={changeHandler("email")}
          />
          <TextField
            fullWidth
            margin="normal"
            id="outlined-multiline-flexible"
            label="Address"
            value={contact.address}
            multiline
            minRows={2}
            maxRows={3}
            onChange={changeHandler("address")}
          />
        </Box>
        <Box className="contact-add">
          <Button id="base-contact-button" type="button" variant="contained" onClick={ContactHandler}>
            {props.button_text}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export { BaseContact };
