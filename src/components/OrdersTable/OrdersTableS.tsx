import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Button } from '@mui/material';
import StopIcon from '@mui/icons-material/Stop';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { Data, ApiResponse } from '../../interfaces/Ordenes';
import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from 'axios';

const OrdersTableS = () => {
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
        setFilteredRows(data.filter(row => row.supervisor === ussr));
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, [token]);

  interface OrderState {
    [key: string]: string;
  }

  const [orderState, setOrderState] = useState<OrderState>({});

  const handleClicks = (row: Data) => {
    const newState = { ...orderState };
    if (!newState[row.numero]) {
      newState[row.numero] = 'Iniciado';
    } else if (newState[row.numero] === 'Iniciado') {
      newState[row.numero] = 'Terminar';
    } else {
      newState[row.numero] = 'Terminado';
    }
    setOrderState(newState);

    const newRows = [...filteredRows];
    const rowIndex = newRows.findIndex(r => r.numero === row.numero);
    if (newState[row.numero] === 'Iniciado') {
      newRows[rowIndex] = {
        ...newRows[rowIndex],
        estado: 'Iniciado'
      };
    } else {
      newRows[rowIndex] = {
        ...newRows[rowIndex],
        estado: 'Terminado'
      };
    }
    setFilteredRows(newRows);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ cursor: 'pointer', fontWeight: 'bold' }}>Orden</TableCell>
            {/* <TableCell sx={{ cursor: 'pointer', fontWeight: 'bold' }}>Cliente</TableCell> */}
            <TableCell sx={{ cursor: 'pointer', fontWeight: 'bold' }}>Contacto</TableCell>
            <TableCell sx={{ cursor: 'pointer', fontWeight: 'bold' }}>Direccion</TableCell>
            <TableCell sx={{ cursor: 'pointer', fontWeight: 'bold' }}>Areas</TableCell>
            <TableCell sx={{ cursor: 'pointer', fontWeight: 'bold' }}>Estado</TableCell>
            <TableCell sx={{ cursor: 'pointer', fontWeight: 'bold' }}>Supervisor</TableCell>
            <TableCell sx={{ cursor: 'pointer', fontWeight: 'bold' }}>Grupo</TableCell>
            <TableCell sx={{ cursor: 'pointer', fontWeight: 'bold' }}>Configurar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((filteredRows) => (
            <TableRow key={filteredRows.id}>
              <TableCell align="left" style={{ color: "#1976D2", fontWeight: 'bold', width: "90px" }} >{filteredRows.numero}</TableCell>
              {/* <TableCell align="right" style={{ width: "145px" }}>{filteredRows.cliente}</TableCell> */}
              <TableCell align="left" style={{ width: "170px" }}>{filteredRows.contacto}</TableCell>
              <TableCell>{filteredRows.direccion}</TableCell>
              <TableCell>{filteredRows.areas.map(area => area.nombre).join(", ")}</TableCell>
              <TableCell>{filteredRows.estado}</TableCell>
              <TableCell>{filteredRows.supervisor}</TableCell>
              <TableCell>{filteredRows.grupo?.join(", ")}</TableCell>
              <TableCell align="right"><Button
                disabled={filteredRows.estado === 'Terminado'}
                onClick={() => handleClicks(filteredRows)}
                variant="outlined"
                startIcon={
                  filteredRows.estado === 'Terminado' ? <StopIcon /> :
                    orderState[filteredRows.numero] === 'Iniciado' ? <StopIcon /> :
                      orderState[filteredRows.numero] === 'Terminar' ? <StopIcon /> :
                        <PlayCircleFilledWhiteIcon />
                }
              >
                {filteredRows.estado === 'Terminado' && 'Terminado'}
                {filteredRows.estado === 'Pendiente' && (orderState[filteredRows.numero] === 'Terminar' ? 'Terminar' : 'Iniciar')}
                {filteredRows.estado === 'Iniciado' && 'Terminar'}

              </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdersTableS;