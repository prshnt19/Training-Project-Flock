import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { setMenu } from "../../redux/menu";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { grey } from "@mui/material/colors";
import "./ShowContact.css";

const ShowContact = () => {
  const dispatch = useAppDispatch();
  const contact = useAppSelector((state) => state.selectedContact.value);

  const showContactHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setMenu("EditContact"));
  };

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
            value={contact.name}
          />
          <TextField
            fullWidth
            margin="normal"
            id="outlined-read-only-input"
            label="Contact Number"
            value={contact.contact}
          />
          <TextField
            fullWidth
            margin="normal"
            id="outlined-read-only-input"
            label="Email Id"
            value={contact.email}
          />
          <TextField
            fullWidth
            margin="normal"
            id="outlined-read-only-input"
            label="Address"
            value={contact.address}
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

export { ShowContact };
