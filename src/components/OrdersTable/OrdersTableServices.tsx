import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from "@mui/material";
import { rows } from '../../data/DataOrdenes';
import Button from '@mui/material/Button';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import ServicesForm from '../Forms/ServicesForm';
import { Modal } from '@mui/material';
import BackupIcon from '@mui/icons-material/Backup';


const OrdersTableServices = () => {
  const [open, setOpen] = useState(false);

  const handleOpen= () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStart = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const date = new Date();
        const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        const currentTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        // Aquí puedes guardar la información en el estado o enviarla al servidor
        console.log(currentDate, currentTime, location);
      });
    } else {
      alert("La geolocalización no está disponible en este navegador.");
    }
  };
  

  const location = useLocation();
  const user = location.state?.user;
  const filteredRows = rows.filter(row => row.grupo?.includes(user?.nombre)).filter(row => row.estado === "Iniciado");

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ cursor: 'pointer', fontWeight: 'bold' }}>Orden</TableCell>
            <TableCell sx={{ cursor: 'pointer', fontWeight: 'bold' }}>Contacto</TableCell>
            <TableCell sx={{ cursor: 'pointer', fontWeight: 'bold' }}>Areas</TableCell>
            <TableCell sx={{ cursor: 'pointer', fontWeight: 'bold' }}>Trabajo</TableCell>
            <TableCell sx={{ cursor: 'pointer', fontWeight: 'bold' }}>Supervisor</TableCell>
            <TableCell sx={{ cursor: 'pointer', fontWeight: 'bold' }}>Grupo</TableCell>
            <TableCell sx={{ cursor: 'pointer', fontWeight: 'bold' }}>Configurar</TableCell>
            <TableCell sx={{ cursor: 'pointer', fontWeight: 'bold' }}>Contenido</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((filteredRow) => (
            <React.Fragment key={filteredRow.id}>
              {filteredRow.areas.map((area) => (
                <TableRow key={area.Nombre}>
                  <TableCell align="left" style={{ color: "#1976D2", fontWeight: 'bold', width: "90px" }} >{filteredRow.orden}</TableCell>
                  <TableCell >{filteredRow.contacto}</TableCell>
                  <TableCell>{area.Nombre}</TableCell>
                  <TableCell>{area.Observaciones}</TableCell>
                  <TableCell>{filteredRow.supervisor}</TableCell>
                  <TableCell>{filteredRow.grupo?.join(", ")}</TableCell>
                  <TableCell align="right"><Button onClick={handleStart}variant="outlined" startIcon={<PlayCircleFilledWhiteIcon />}>
                    Iniciar
                  </Button>
                  </TableCell>
                  <TableCell align="right"><Button onClick={handleOpen} variant="outlined" startIcon={<BackupIcon />}>
                    Información
                  </Button>
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
        <Modal open={open} onClose={handleClose} >
          <ServicesForm/>
        </Modal>
      </Table>
    </TableContainer>
  );
};

export default OrdersTableServices;

