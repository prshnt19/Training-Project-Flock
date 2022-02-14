import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../service/AuthService";
import { validateEmail } from "../../utils/Utils";
import "./style.css";

const RegisterPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("sessionToken")) {
      AuthService.checkAuth().then((data) => {
        navigate("/", { replace: true });
      });
    }
  }, []);

  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeHandler = (prop: string) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setRegisterInfo({ ...registerInfo, [prop]: event.target.value });
    };
  };

  const clickHandler = () => {
    if (validateEmail(registerInfo.email) && registerInfo.password !== "" && registerInfo.name !== "") {
      AuthService.registerUser(registerInfo).then(() => {
        navigate("/");
      });
    } else {
      alert("Incorrect Details");
    }
  };

  return (
    <Box className="registerpage-wrapper">
      <Box className="registerpage-body">
        <Box className="registerpage-header">
          <Typography variant="h5">New User! Register Here</Typography>
        </Box>
        <Box className="registerpage-form">
          {/* <form method="POST"> */}
          <Box className="registerpage-form-body">
            <TextField
              required
              margin="normal"
              id="name"
              label="Name"
              onChange={changeHandler("name")}
            />

            <TextField
              required
              margin="normal"
              id="email"
              label="Email"
              onChange={changeHandler("email")}
            />
            <TextField
              required
              margin="normal"
              id="password"
              label="Password"
              type="password"
              onChange={changeHandler("password")}
            />
            <Button id="register-botton" type="submit" variant="contained" onClick={clickHandler}>
              Register
            </Button>
          </Box>
          {/* </form> */}
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterPage;
