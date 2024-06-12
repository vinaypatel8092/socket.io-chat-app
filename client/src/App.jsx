import React, { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const App = () => {
  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        withCredentials: true,
      }),
    []
  );

  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message );
    setMessage("");
  };

  useEffect(() => {
    socket.on("connect", () => {
     console.log("Connected", socket.id);
    });

    socket.on("receive-message", (data) => {
      console.log(data);
    });

    socket.on("welcome", (e) => {
      console.log(e);
    })

    return () => {
      socket.disconnect();
    }
  }, []);

  return <Container maxWidth="sm">
    <Typography variant="h6" component="div" gutterBottom>
        Welcome to Socket.io
    </Typography>

    <form onSubmit={handleSubmit}>
      <TextField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        id="outlined-basic"
        label="Message"
        variant="outlined"
      />
      
      <Button type="submit" variant="contained" color="primary">
        Send
      </Button>
    </form>
  </Container>;
};

export default App;
