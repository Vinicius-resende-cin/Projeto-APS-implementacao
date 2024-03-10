import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useState } from "react";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import KeyIcon from "@mui/icons-material/Key";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("Logging in with:", email, password);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      margin="0"
      sx={{
        background: "linear-gradient(45deg, #2196F3 30%, #00BCD4 90%)",
        color: "white",
      }}
      gap="2.5rem"
      padding="2rem"
      textAlign="center"
    >
      <Typography
        variant="h4"
        fontFamily="inherit"
        textAlign="center"
        fontWeight={700}
        sx={{
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        Sistema de Controle de Entregas
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        width="20rem"
        maxWidth="100%"
        height="30rem"
        boxShadow="rgb(38, 57, 77) 0px 20px 30px -10px"
        padding="2rem"
        sx={{ background: "white", color: "black" }}
        gap="1rem"
        justifyContent="center"
      >
        <Typography
          variant="h5"
          fontFamily="inherit"
          textAlign="start"
          fontSize={25}
          color="#4A4A4A"
          marginBottom="1rem"
        >
          Login
        </Typography>
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          rowGap="2rem"
          marginBottom="2rem"
        >
          <TextField
            type="text"
            placeholder="E-mail"
            value={email}
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            variant="standard"

            // InputProps={{
            //   startAdornment: (
            //     <InputAdornment position="start">
            //       <PersonOutlineIcon sx={{ color: "#2196F3" }} />{" "}
            //     </InputAdornment>
            //   ),
            // }}
          ></TextField>
          <TextField
            type="password"
            placeholder="Senha"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="standard"

            // InputProps={{
            //   startAdornment: (
            //     <InputAdornment position="start">
            //       <KeyIcon sx={{ color: "#2196F3" }} />
            //     </InputAdornment>
            //   ),
            // }}
          />
        </Box>

        <Button
          type="button"
          onClick={handleLogin}
          sx={{
            background: "linear-gradient(45deg, #2196F3 30%, #00BCD4 90%)",
            color: "white",
            transition: "transform 0.3s ease",
            "&:hover": {
              // background: "#00BCD4",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
            },
            borderRadius: "0",
          }}
        >
          Login
        </Button>
        <Box
          display="flex"
          width="100%"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          marginTop="1rem"
        >
          <Divider
            orientation="horizontal"
            sx={{ width: "40%", margin: "0 0.5rem" }}
          />
          ou
          <Divider
            orientation="horizontal"
            sx={{ width: "40%", margin: "0 0.5rem" }}
          />{" "}
        </Box>
        <div
          id="g_id_onload"
          data-client_id="418897438529-0pbplnsrar7au7ffhj0h7s7rcf636l21.apps.googleusercontent.com"
          data-context="signin"
          data-ux_mode="popup"
          data-login_uri="http://localhost:3000/login"
          data-auto_prompt="false"
        ></div>

        <div
          className="g_id_signin"
          data-type="standard"
          data-shape="rectangular"
          data-theme="outline"
          data-text="signin_with"
          data-size="large"
          data-logo_alignment="left"
          data-width="255"
        ></div>
      </Box>
    </Box>
  );
}
