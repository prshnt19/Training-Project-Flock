import React, { useEffect } from "react";
import { AddContact } from "../addContact/AddContact";
import { ShowContact } from "../showContact/ShowContact";
import { EditContact } from "../editContact/EditContact";
import { Sidebar } from "../sidebar/Sidebar";
import { Navbar } from "../navbar/Navbar";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setContacts } from "../../redux/contacts";
import { useNavigate } from "react-router-dom";
import { ContactService } from "../../service/ContactService";
import { AuthService } from "../../service/AuthService";
import { DBService } from "../../db/DBService";
import "./MainContent.css";

const MainContent = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const fetchContacts = async () => {
    console.log("fetching contacts");
    const contacts = await ContactService.getContacts();
    DBService.putContacts(contacts);
    dispatch(setContacts(contacts)); // TODO: Use Delta Sync
  };

  useEffect(() => {
    AuthService.checkAuth()
      .then((userId) => {
        if (userId) {
          DBService.getContacts(userId).then((contacts) => { // TODO: CallBack hell
            dispatch(setContacts(contacts));
          });
        } else {
          localStorage.removeItem("sessionToken");
          navigate("/login", { replace: true });
        }
      });

    fetchContacts();
    const interval = setInterval(fetchContacts, 60000);

    return () => {
      console.log("clearing interval");
      clearInterval(interval);
    }
  }, []);

  const value = useAppSelector((state) => state.menu.value);
  const Menu = () => {
    if (value === "AddContact") return <AddContact />;
    if (value === "ShowContact") return <ShowContact />;
    if (value === "EditContact") return <EditContact />;
    return <></>;
  };

  return (
    <div>
      <Navbar />
      <div className="body-wrapper">
        <Sidebar />
        <div className="main-wrapper">
          <Menu />
        </div>
      </div>
    </div>
  );
};

export { MainContent };
