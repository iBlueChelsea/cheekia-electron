import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import User from "../../hooks/auth";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Login = () => {
  const history = useHistory();
  const user = useContext(User);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [invalidPasswordError, setInvalidPasswordError] = useState("");

  const inputHandler = (event) => {
    const newLoginData = { ...loginData };
    newLoginData[event.target.id] = event.target.value;
    setLoginData(newLoginData);
  };

  const loginHandler = (event) => {
    event.preventDefault();
    axios
      .post("https://cheekia-server.loca.lt/login", {
        username: loginData.username,
        password: loginData.password,
      })
      .then((response) => {
        if (response.data.error) {
          setInvalidPasswordError(response.data.error);
        }

        if (response.data.userID) {
          user.login(response.data.userID);
          history.replace("/main");
        }
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Form onSubmit={loginHandler}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>User name</Form.Label>
            <Form.Control
              required
              onChange={inputHandler}
              type="text"
              placeholder=""
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              onChange={inputHandler}
              type="password"
              placeholder=""
              isInvalid={!!invalidPasswordError}
            />
            <Form.Control.Feedback type="invalid">
              {invalidPasswordError}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
