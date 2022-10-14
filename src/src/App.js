import { useState, useEffect, useContext } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import Main from "./components/Main/Main";
import Login from "./components/Login/Login";
import DeckBuilder from "./components/DeckBuilder/DeckBuilder";
import Play from "./components/Play/Play";
import Lobby from "./components/Play/Game/Lobby";
import User from "../src/hooks/auth";
import Alert from 'react-bootstrap/Alert';
import io from "socket.io-client";

const App = () => {
  const user = useContext(User);
  const location = useLocation();

  const [networkState, setNetworkState] = useState("notConnected");

  useEffect(() => {
    const socket = io("https://cheekia-server.loca.lt");
    user.connect(socket);
    socket.on("connect", () => {
      setNetworkState("connected");
    });

    socket.on("disconnect", () => {
      setNetworkState("notConnected");
    });
    return () => socket.close(); // eslint-disable-next-line
  }, []);

  if (networkState === "notConnected") {
    return (
      <Alert variant="danger">
        <Alert.Heading>Network Error</Alert.Heading>
        <p>
          Failed to establish connection to the Cheekia Servers... :()
        </p>
      </Alert>
    );
  }

  if (user.userID) {
    return (
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/main">
          <Main />
        </Route>
        <Route path="/deckbuilder">
          <DeckBuilder />
        </Route>
        <Route path="/play">
          <Play />
        </Route>
        <Route path="/game/:id">
          <Lobby />
        </Route>
      </Switch>
    );
  } else {
    if (location.pathname == "/login") {
      return <Login />;
    } else {
      return <Redirect to="/login" />;
    }
  }
};

export default App;
