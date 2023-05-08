import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Usuario } from "../../interfaces/Users";
import { serviceUsuarios } from './serviceUsuarios';

const theme = createTheme();

export default function SignIn() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  var [nombreU, setNombreU] = React.useState("");
  const navigate = useNavigate();

  const handleLogin = (user: Usuario | null) => {
    // La implementación depende de cómo hayas definido esta función
  };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const response = await serviceUsuarios.Login(username, password);
        // handleLogin(response); // llama a la función `handleLogin` con los datos de usuario devueltos por la API
        switch (response.data.perfil) {
          case 10000:
            navigate('/admin', { state: { user: response } });
            console.log(response.data)
            break;
          case 10001:
            navigate('/supervisor', { state: { user: response } });
            break;
          case 10002:
            navigate('/servicio', { state: { user: response } });
            break;
          default:
            break;
        }
      } catch (error) {
        alert('Credenciales incorrectas');
      }
    };
    
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            p: 2,
            border: '1px solid grey',
            marginTop: 5,
            paddingBottom: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inicia Sección
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="user"
              label="Nombre de usuario"
              name="user"
              autoComplete="user"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar Sección
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

