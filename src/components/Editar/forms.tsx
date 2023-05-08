import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { rows } from '../../data/DataOrdenes';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import handleClose from '../OrdersTable/OrdersTable';

const theme = createTheme();

export default function Forms() {
    const [cliente, setCliente] = React.useState('');

  
    const handleChange = (event: SelectChangeEvent) => {
      setCliente(event.target.value);
    }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  const data = new FormData(event.currentTarget);
    console.log({
        cliente: data.get('cliente')
    });
  };


  return (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs"sx={{ backgroundColor: 'white'}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3.5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main',marginTop:"20px"}}>
            <EditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Editar Orden
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <div>
                <FormControl sx={{minWidth: 190 ,marginBottom:1.5 }}>
                    <InputLabel id="demo-simple-select-standard-label">Cliente</InputLabel>
                        <Select
                        labelId="demo-simple-select-standard-label"
                        id="Cliente"
                        value={cliente}
                        onChange={handleChange}
                        autoWidth
                        label="cliente"
                        >
                        {rows.map((row) => (
                        <MenuItem key={row.id} value={row.cliente}>
                        {row.cliente}
                        </MenuItem>
                        ))}
                        </Select>
                </FormControl>
                </div>
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                  autoComplete="given-name"
                  name="Contacto"
                  required
                  id="Contacto"
                  label="Contacto"
                  InputProps={{
                    readOnly: true,
                  }}
                />
            </Grid>
        </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="Areas"
                  required
                  fullWidth
                  id="Areas"
                  label="Areas"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Direccion"
                  label="Dirección"
                  name="Direccion"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Observaciones"
                multiline
                fullWidth
                rows={4}
            />
              </Grid>
              <Grid item xs={12}>
              <DateTimePicker
              label="Fecha y Hora" 
              slotProps={{ textField: { fullWidth: true } }} />
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{paddingBottom:"10px"}}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Enviar
            </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </LocalizationProvider>
  );
}