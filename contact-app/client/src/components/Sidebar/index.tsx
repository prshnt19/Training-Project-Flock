import React from "react";
import { IconButton } from "@mui/material";
import ContactList from "../ContactList";
import { setMenu } from "../../redux/menu";
import { useAppDispatch } from "../../redux/hooks";
import { setSearchText } from "../../redux/searchText";
import AddIcon from "@material-ui/icons/Add";
import { setSelectedContact } from "../../redux/selectedContact";
import { emptyContact } from "../../utils/Utils";
import "./style.css";

const Sidebar = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="sidebar">
      <div className="search-box">
        <div className="search-bar">
          <input
            placeholder="Search Contact"
            onChange={(e) => {
              dispatch(setSearchText(e.target.value));
            }}
          />
        </div>
        <div className="add-contact">
          <IconButton
            style={{ height: "35px", width: "35px", borderRadius: "100%" }}
            aria-label="add"
            title="Add Contact"
            onClick={() => {
              dispatch(setSelectedContact(emptyContact));
              dispatch(setMenu("AddContact"));
            }}
          >
            <AddIcon style={{ height: "25px", width: "25px" }} />
          </IconButton>
        </div>
      </div>
      <ContactList />
    </div>
  );
};

export default Sidebar;
