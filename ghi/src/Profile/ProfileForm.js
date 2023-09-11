import { useForm } from "react-hook-form";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

export default function ProfileForm({
  userData,
  // setUserData
}) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [disabled, setDisabled] = useState(true);
  const [newProfile, setNewProfile] = useState();
  const [username, setUsername] = useState(user.username);
  const { token } = useAuthContext();

  const updateAccount = async (id, data) => {
    const account = { ...user, ...data };
    const url = `http://localhost:8000/api/accounts/${id}`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(account),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(url, fetchConfig);
      if (!response.ok) {
        console.error("Error updating profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const ValidationTextField = styled(TextField)({
    "& .MuiFormLabel-asterisk": {
      color: "white",
    },
    "& input:valid + fieldset": {
      borderColor: "#E0E3E7",
      borderWidth: 1,
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 1,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 4,
      padding: "4px !important",
    },
  });

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: user.email,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
    },
  });
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit((data) => {
        !disabled && updateAccount(user.id, data);
        setDisabled(!disabled);
      })}
      sx={{ mt: 1 }}
    >
      <ValidationTextField
        disabled={disabled}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        {...register("first_name")}
        label="First Name"
        autoComplete="first-name"
      />
      <ValidationTextField
        disabled={disabled}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        {...register("last_name")}
        label="Last Name"
        autoComplete="last-name"
      />
      <ValidationTextField
        disabled={disabled}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Email Address"
        {...register("email")}
        autoComplete="email"
        autoFocus
        sx={{}}
      />
      <ValidationTextField
        disabled={disabled}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Username"
        {...register("username")}
        autoComplete="username"
        autoFocus
      />
      {/* <ImageDrop /> */}

      {disabled ? (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update Account
        </Button>
      ) : (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Save Changes
        </Button>
      )}
    </Box>
  );
}
