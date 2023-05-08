import { rows } from '../../data/DataOrdenes';
import ServicesForm from '../Forms/ServicesForm';
import { Modal } from '@mui/material';
import BackupIcon from '@mui/icons-material/Backup';
import StopIcon from '@mui/icons-material/Stop';
import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Button } from '@mui/material';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { Data, ApiResponse } from '../../interfaces/Ordenes';
import axios, { AxiosResponse } from 'axios';

const OrdersTableServices = () => {
  const locationToken = useLocation();
  const user = locationToken.state?.user;
  const token: string = user.data.token
  const ussr: string = user.data.userName
  const [rows, setRows] = useState<Data[]>([]);
  const [filteredRows, setFilteredRows] = useState<Data[]>([]);

  useEffect(() => {
    axios 
      .get('http://wmonit.eastus.cloudapp.azure.com:5003/api/Orden', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response: AxiosResponse) => {
        const apiResponse: ApiResponse = response.data;
        const data: Data[] = apiResponse.data.map(item => {
          return {
            id: item.id,
            numero: item.numero,
            cliente: item.cliente,
            contacto: item.contacto,
            direccion: item.direccion,
            areas: item.areas,
            estado: item.estado,
            supervisor: item.supervisor,
            grupo: item.grupo,
            eliminado: item.eliminado,
            fecha: item.fecha,
          };
        });
        setRows(data);
        const filteredData = data.filter(row => row.grupo?.includes(ussr)).filter(row => row.estado === "Iniciado");
        setFilteredRows(filteredData);
        console.log(filteredRows);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, [token]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
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
                <TableRow key={area.nombre}>
                  <TableCell align="left" style={{ color: "#1976D2", fontWeight: 'bold', width: "90px" }} >{filteredRow.numero}</TableCell>
                  <TableCell >{filteredRow.contacto}</TableCell>
                  <TableCell>{area.nombre}</TableCell>
                  <TableCell>{area.observaciones}</TableCell>
                  <TableCell>{filteredRow.supervisor}</TableCell>
                  <TableCell>{filteredRow.grupo?.join(", ")}</TableCell>
                  <TableCell align="right"><Button onClick={handleStart} variant="outlined" startIcon={<PlayCircleFilledWhiteIcon />}>
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
          <ServicesForm />
        </Modal>
      </Table>
    </TableContainer>
  );
};

export default OrdersTableServices;

