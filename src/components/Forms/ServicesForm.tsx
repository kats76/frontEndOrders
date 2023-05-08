import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useState } from 'react';
import Webcam from "react-webcam";



const theme = createTheme();

export default function SevicesForm() {

  const [openDialog, setOpenDialog] = useState(false);
  const webcamRef = React.useRef<Webcam>(null);
  const [image, setImage] = React.useState<string | null>(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setImage(imageSrc ? imageSrc : null);
  }, [webcamRef, setImage]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    console.log({

    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" sx={{ backgroundColor: 'white' }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 3.5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main', marginTop: "20px" }}>
              <AddIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Agregar Información
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>

              </Grid>
              <Grid container spacing={2}>

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
                  <label htmlFor="photo-upload">
                    <Button
                      fullWidth
                      variant="contained"
                      component="span"
                      startIcon={<CloudUploadIcon />}
                      onClick={() => setOpenDialog(true)}
                    >
                      Subir Fotos
                    </Button>
                    <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth={true}>
                      <DialogContent>
                        <DialogContent >
                          <DialogContent style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%'
                          }}>
                            <Webcam
                              audio={false}
                              ref={webcamRef}
                              screenshotFormat="image/jpeg"
                              width={400}
                              height={400}
                            />
                          </DialogContent>
                          <Button type="submit"
                            fullWidth
                            variant="contained" onClick={capture}>Tomar Foto</Button>
                        </DialogContent>
                        <DialogTitle style={{ textAlign: 'center' }}>Vista Previa</DialogTitle>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            }}>
                        {image && <img src={image} alt="Imagen capturada por la cámara" />}
                        </div>
                        <DialogContent>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(event) => {
                              const files = event.target.files;
                              console.log(files);
                            }}
                          />
                        </DialogContent>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
                        <Button onClick={() => {
                          // Enviar las imagenes al servidor
                          setOpenDialog(false);
                        }}>Guardar</Button>
                      </DialogActions>
                    </Dialog>
                  </label>
                </Grid>
              </Grid>

              <Grid item xs={12} sx={{ paddingBottom: "10px" }}>
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