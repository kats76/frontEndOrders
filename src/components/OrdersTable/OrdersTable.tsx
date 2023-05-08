import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from "@mui/material";
// import { rows } from '../../data/DataOrdenes';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FormsAdd from '../Forms/forms';
import Forms from '../Editar/forms';
import { Modal } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Data, ApiResponse } from '../../interfaces/Ordenes';
import axios, { AxiosResponse } from 'axios';
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


const OrdersTable = () => {
  const locationToken = useLocation();
  const user = locationToken.state?.user;
  const token: string = user.data.token
  const ussr: string = user.data.userName
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [rows, setRows] = useState<Data[]>([]);

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
        console.log(data,ussr);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, [token]);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  return (
    <Box>
      <Toolbar>
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
          fontWeight='bold'
        >
          ORDENES
        </Typography>
        <Tooltip title="Agregar ">
          <Button onClick={handleOpenAdd} startIcon={<AddIcon />}>Agregar</Button>
        </Tooltip>
        <Modal open={openAdd} onClose={handleOpenAdd} onClick={handleCloseAdd}>
          <FormsAdd />
        </Modal>
      </Toolbar>
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
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="left" style={{ color: "#1976D2", fontWeight: 'bold', width: "90px" }} >{row.numero}</TableCell>
                {/* <TableCell align="right" style={{ width: "145px" }}>{row.cliente}</TableCell> */}
                <TableCell align="right" style={{ width: "130px" }}>{row.contacto}</TableCell>
                <TableCell>{row.direccion}</TableCell>
                <TableCell>{row.areas.map(area => area.nombre).join(", ")}</TableCell>
                <TableCell>{row.estado}</TableCell>
                <TableCell>{row.supervisor}</TableCell>
                <TableCell>{row.grupo?.join(", ")}</TableCell>
                <TableCell align="right"><Button onClick={handleOpenEdit} variant="outlined" startIcon={<EditIcon />}>
                  Editar
                </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Modal open={openEdit} onClose={handleCloseEdit}>
          <Forms />
        </Modal>
      </TableContainer>
    </Box>
  );
};

export default OrdersTable;

