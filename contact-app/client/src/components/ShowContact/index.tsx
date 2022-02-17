import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

import { setMenu } from "../../redux/menu";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import "./style.css";

const ShowContact: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const contact = useAppSelector((state) => state.selectedContact.value);

  const showContactHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setMenu("EditContact"));
  };

  const { name, contactNumber, email, address } = contact;

  return (
    <Box className="contact-wrapper-show" border={1} borderColor={grey[400]}>
      <Typography variant="h4" color="#575757">
        Contact Information
      </Typography>
      <form onSubmit={showContactHandler}>
        <Box className="contactinfo">
          <TextField
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
            id="outlined-read-only-input"
            label="Name"
            value={name}
          />
          <TextField
            fullWidth
            margin="normal"
            id="outlined-read-only-input"
            label="Contact Number"
            value={contactNumber}
          />
          <TextField
            fullWidth
            margin="normal"
            id="outlined-read-only-input"
            label="Email Id"
            value={email}
          />
          <TextField
            fullWidth
            margin="normal"
            id="outlined-read-only-input"
            label="Address"
            value={address}
            multiline
            minRows={2}
            maxRows={2}
          />
        </Box>
        <Box className="contact-add">
          <Button id="base-contact-button" type="submit" variant="contained">
            Edit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ShowContact;
