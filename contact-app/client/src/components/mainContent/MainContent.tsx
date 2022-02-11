import React, { useEffect } from "react";
import { AddContact } from "../addContact/AddContact";
import { ShowContact } from "../showContact/ShowContact";
import { EditContact } from "../editContact/EditContact";
import { Sidebar } from "../sidebar/Sidebar";
import { Navbar } from "../navbar/Navbar";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setContacts } from "../../redux/contacts";
import { useNavigate } from "react-router-dom";
// import { ContactService } from "../../service/ContactService";
import { AuthService } from "../../service/AuthService";
import Contact from "../../model/Contact";
import "./MainContent.css";
// import { db } from "../../db/db";
import { DBService } from "../../db/DBService";

const emptyContact: Contact = {
  id: 0,
  userId: 0,
  name: "",
  contact: "",
  email: "",
  address: "",
  score: 0,
};

const MainContent = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    AuthService.checkAuth()
      .then((userId) => {
        if (userId) {
          DBService.getContacts(userId).then((contacts) => {
            dispatch(setContacts(contacts));
          });
        } else {
          navigate("/login", { replace: true });
        }
      });
  }, []);

  const value = useAppSelector((state) => state.menu.value);
  const Menu = () => {
    if (value === "AddContact") return <AddContact />;
    if (value === "ShowContact") return <ShowContact />;
    if (value === "EditContact") return <EditContact />;
    return <></>;
  };

  return (
    <>
      <Navbar />
      <div className="body-wrapper">
        <Sidebar />
        <div className="main-wrapper">
          <Menu />
        </div>

        {/* <Fab
          aria-label="add"
          style={logoutFabStyle}
          title="Logut"
          onClick={logoutHandler}
        >
          <LogoutIcon />
        </Fab> */}
      </div>
    </>
  );
};

export { MainContent, emptyContact };
