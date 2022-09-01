import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AddContact from "../AddContact";
import ShowContact from "../ShowContact";
import EditContact from "../EditContact";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { AuthService, ContactService } from "../../service";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setContacts } from "../../redux/contacts";
import { DBService } from "../../db/DBService";
import "./style.css";

const menu: { [key: string]: React.FC<{}>} = {
  "AddContact": AddContact,
  "ShowContact": ShowContact,
  "EditContact": EditContact,
  "": () => <></>,
};

const MainContent: React.FC<{}> = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getContacts = async () => {
    const userId = await AuthService.checkAuth();
    if (userId) {
      DBService.getContacts(userId).then((contacts) => {
        dispatch(setContacts(contacts));
      });
    } else {
      localStorage.removeItem("sessionToken");
      navigate("/login", { replace: true });
    }
  }

  const fetchContactsFromServer = async () => {
    const contacts = await ContactService.getContacts();
    dispatch(setContacts(contacts)); // TODO: Use Delta Sync
  };

  useEffect(() => {
    getContacts();
    fetchContactsFromServer();
    const interval = setInterval(fetchContactsFromServer, 600000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  const value = useAppSelector((state) => state.menu.value);
  const Menu = menu[value];

  return (
    <>
      <Navbar />
      <div className="body-wrapper">
        <Sidebar />
        <div className="main-wrapper">
          <Menu />
        </div>
      </div>
    </>
  );
};

export default MainContent;
