import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { AuthService } from "../../service/AuthService";
import { validateEmail } from "../../utils/Utils";
import "./style.css";

const LoginPage: React.FC<{}> = function () {
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("sessionToken")) {
      AuthService.checkAuth().then((userId) => {
        if (userId) {
          navigate("/", { replace: true });
        }
      });
    }
  }, []);

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (prop: string) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setLoginInfo({ ...loginInfo, [prop]: event.target.value });
    };
  };

  const handleSignIn = async () => {
    if (validateEmail(loginInfo.email)) {
      AuthService.loginUser(loginInfo)
        .then(() => {
          navigate("/", { replace: true });
        })
        .catch((err) => {
          alert("Invalid Email or Password");
        });
    } else {
      alert("Please Enter Correct Email");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Box className="loginpage-wrapper">
      <Box className="loginpage-body">
        <Box className="loginpage-header">
          <h2>Login</h2>
        </Box>
        <Box className="loginpage-form">
          <Box className="loginpage-form-body">
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
            <Button type="submit" variant="contained" onClick={handleSignIn}>
              Sign In
            </Button>
          </Box>
        </Box>
        <Box className="loginpage-footer">
          <Typography
            className="register-heading"
            variant="h6"
            style={{ marginBottom: "30px" }}
          >
            Don't have an account?
          </Typography>
          <Button variant="contained" onClick={handleRegister}>
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
