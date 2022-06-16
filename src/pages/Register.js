import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/auth-context";

//import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Logo from "../img/Logo.PNG";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const Register = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const { signup, error, isLoading, isLoggedIn } = authCtx;
  const onFormSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signup({
      email: data.get("email"),
      firstname: data.get("firstName"),
      lastname: data.get("lastName"),
      username: data.get("username"),
      password: data.get("password"),
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          marginTop: 8,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          alt="Logo"
          src={Logo}
          variant="rounded"
          sx={{ width: 56, height: 56, bgcolor: "primary.main" }}
        />

        {/* <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <AccountCircleRoundedIcon />
        </Avatar> */}

        <Typography component="h1" variant="h4">
          Create a new account
        </Typography>

        <Grid
          container
          component="form"
          onSubmit={onFormSubmit}
          noValidate
          columnSpacing={3}
          sx={{ mt: 1 }}
        >
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="username"
              label="Username"
              id="username"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 3 }}
              disabled={isLoading ? true : false}
            >
              Create Account
            </Button>
          </Grid>

          {error && (
            <Grid item xs={12} mt={1}>
              <Typography variant="body2" color="red" align="center">
                {error}
              </Typography>
            </Grid>
          )}

          <Grid item xs={12} mt={1}>
            <Typography variant="body2" align="center">
              {"Already have an account? "}
              <Link href="/login" variant="body2">
                {"Log in"}
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Register;
