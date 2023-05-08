// import * as React from 'react';
// import { alpha } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// // import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { visuallyHidden } from '@mui/utils';
// import { rows } from '../../data/DataOrdenes';
// import { Data } from '../../interfaces/Ordenes';
// import { Button } from '@mui/material'; 
// import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
// import AddIcon from '@mui/icons-material/Add';
// import { Modal } from '@mui/material';
// import Forms from '../Editar/forms';
// import FormsAdd from '../Forms/forms';
// import { useState } from 'react';
// import { useLocation } from "react-router-dom";
// import StopIcon from '@mui/icons-material/Stop';

// const styles = {
//   tableCell: {
//     '&:nth-of-type(1), &:nth-of-type(2)': {
//       width: 300
//     }
//   }
// }

// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// type Order = 'asc' | 'desc';

// function getComparator<Key extends keyof any>(
//   order: Order,
//   orderBy: Key
// ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
//   const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// interface HeadCell {
//   disablePadding: boolean;
//   id: keyof Data;
//   label: string;
//   numeric: boolean;
// }

// const headCells: readonly HeadCell[] = [
//   {
//     id: 'orden',
//     numeric: false,
//     disablePadding: true,
//     label: 'N. Orden',
//   },
//   {
//     id: 'cliente',
//     numeric: false,
//     disablePadding: false,
//     label: 'Cliente',
//   },
//   {
//     id: 'contacto',
//     numeric: false,
//     disablePadding: false,
//     label: 'Contacto',
//   },
//   {
//     id: 'direccion',
//     numeric: false,
//     disablePadding: false,
//     label: 'Dirección',
//   },
//   {
//     id: 'areas',
//     numeric: false,
//     disablePadding: false,
//     label: 'Areas',
//   },
//   {
//     id: 'estado',
//     numeric: false,
//     disablePadding: false,
//     label: 'Estado',
//   },
//   {
//     id: 'supervisor',
//     numeric: false,
//     disablePadding: false,
//     label: 'supervisor',
//   }
// ];

// interface EnhancedTableProps {
//   numSelected: number;
//   onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
//   onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   order: Order;
//   orderBy: string;
//   rowCount: number;
// }

// function EnhancedTableHead(props: EnhancedTableProps) {
//   const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
//     props;
//   const createSortHandler =
//     (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
//       onRequestSort(event, property);
//     };

//   return (
//     <TableHead sx={{ bgcolor:  '#EBEBEB'  }}>
//       <TableRow >
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? 'right' : 'left'}
//             padding={headCell.disablePadding ? 'none' : 'normal'}
//             sortDirection={orderBy === headCell.id ? order : false}
//             sx={{ cursor: 'pointer', fontWeight: 'bold'}}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : 'asc'}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//           <TableCell sx={{ cursor: 'pointer', fontWeight: 'bold'}}>
//             Configurar
//         </TableCell>
//       </TableRow>
//     </TableHead>
//   );
// }

// interface EnhancedTableToolbarProps {
//   numSelected: number;
// }

// function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
//   const { numSelected } = props;
//   const [open, setOpen] = useState(false);


// function ServicioPage() {
//   const location = useLocation();
//   const user = location.state?.user;}

//   function handleOpen() {
//     setOpen(true);
//   }

//   function handleClose() {
//     setOpen(false);
//   }

//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} Selecionados
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//           fontWeight= 'bold'
//         >
//           ORDENES 
//         </Typography>
//       )}
//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Agregar ">
//           <Button  onClick={handleOpen}variant="outlined" startIcon={<AddIcon />}>Agregar
//           </Button>
//         </Tooltip>
//       )}
//       <Modal open={open} onClose={handleClose} style={{backgroundColor: 'rgba(255, 255, 255, 0.3)',outline: 'none'}}>
//         <FormsAdd/>
//       </Modal>
//     </Toolbar>
//   );
// }


// export default function EnhancedTable() {
//   const location = useLocation();
//   const [order, setOrder] = React.useState<Order>('asc');
//   const [orderBy, setOrderBy] = React.useState<keyof Data>('id');
//   const [selected, setSelected] = React.useState<readonly string[]>([]);
//   const [page, setPage] = React.useState(0);
//   const [dense, setDense] = React.useState(false);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);
//   const [open, setOpen] = useState(false);
//   const [orderState, setOrderState] = useState<{ [key: string]: string }>({});

// const user = location.state?.user;
//     const filteredRows = rows.filter(row => row.supervisor === user.nombre);

//   const handleRequestSort = (
//     event: React.MouseEvent<unknown>,
//     property: keyof Data,
//   ) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.checked) {
//       const newSelected = filteredRows.map((n) => n.orden);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   function handleOpen() {
//     setOpen(true);
//   }

//   function handleClose() {
//     setOpen(false);
//   }

//   const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected: readonly string[] = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }

//     setSelected(newSelected);
//   };

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setDense(event.target.checked);
//   };

//   const isSelected = (name: string) => selected.indexOf(name) !== -1;

//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//   const visibleRows = React.useMemo(
//     () =>
//       stableSort(filteredRows, getComparator(order, orderBy)).slice(
//         page * rowsPerPage,
//         page * rowsPerPage + rowsPerPage,
//       ),
//     [order, orderBy, page, rowsPerPage],
//   );

//   interface FilteredRow {
//     estado: string;
//     orden: string;
//   }

//   function handleClicks(filteredRows: FilteredRow) {
//     let newState = { ...orderState };
//     if (!newState[filteredRows.orden] || newState[filteredRows.orden] === 'Iniciar') {
//       newState[filteredRows.orden] = 'Terminar';
//     } else if (newState[filteredRows.orden] === 'Terminar') {
//       newState[filteredRows.orden] = 'Terminado';
//     }
//     setOrderState(newState);
//   }

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Paper sx={{ width: '100%', mb: 2}}>
//         <EnhancedTableToolbar numSelected={selected.length} />
//         <TableContainer sx={{ bgcolor: '#f5f5f5' }}>
//           <Table
//             sx={{ minWidth: 750 }}
//             aria-labelledby="tableTitle"
//             size={dense ? 'small' : 'medium'}
//           >
//             <EnhancedTableHead
//               numSelected={selected.length}
//               order={order}
//               orderBy={orderBy}
//               onSelectAllClick={handleSelectAllClick}
//               onRequestSort={handleRequestSort}
//               rowCount={filteredRows.length}
//             />
//             <TableBody>
//               {visibleRows.map((filteredRows, index) => {
//                 const isItemSelected = isSelected(filteredRows.orden);
//                 const labelId = `enhanced-table-checkbox-${index}`;

//                 return (
//                   <TableRow
//                     // hover
//                     // onClick={(event) => handleClick(event, row.orden)}
//                     // role="checkbox"
//                     // aria-checked={isItemSelected}
//                     // tabIndex={-1}
//                     // key={row.orden}
//                     // selected={isItemSelected}
//                     // sx={{ cursor: 'pointer'}}
//                   >
//                     <TableCell align="left" style={{ color:"#1976D2",fontWeight: 'bold',width: "90px"}}>{filteredRows.orden}</TableCell>
//                     <TableCell align="right" style={{width: "134px"}}>{filteredRows.cliente}</TableCell>
//                     <TableCell align="right" style={{width: "130px"}}>{filteredRows.contacto}</TableCell>
//                     <TableCell align="right">{filteredRows.direccion}</TableCell>
//                     <TableCell align="right">{filteredRows.areas}</TableCell>
//                     <TableCell align="right">{filteredRows.estado}</TableCell>
//                     <TableCell align="right">{filteredRows.supervisor}</TableCell>
//                     <TableCell align="right">     <Button
//       disabled={filteredRows.estado === 'Entregado'}
//       onClick={() => handleClicks(filteredRows)}
//       variant="outlined"
//       startIcon={orderState[filteredRows.orden] === 'Terminar' ? <StopIcon /> : <PlayCircleFilledWhiteIcon />}
//     >
//       {orderState[filteredRows.orden] || 'Iniciar'}
//     </Button>
//                         </TableCell>
//                   </TableRow>
//                 );
//               })}
//               {emptyRows > 0 && (
//                 <TableRow
//                   style={{
//                     height: (dense ? 33 : 53) * emptyRows,
//                   }}
//                 >
//                   <TableCell colSpan={6} />
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           style={{ color:'#1976D2'}}
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           labelRowsPerPage={"Filas por página"}
//           labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
//         />
//       </Paper>
//       <FormControlLabel
//         control={<Switch checked={dense} onChange={handleChangeDense} />}
//         label="Comprimido"
//       />
//               <Modal open={open} onClose={handleClose} style={{backgroundColor: 'rgba(255, 255, 255, 0.3)',outline: 'none'}}>
//             <Forms/>
//         </Modal>
//     </Box>
//   );
// }

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { rows } from '../../data/DataOrdenes';
import { useLocation } from "react-router-dom";
import { Button } from '@mui/material';
import StopIcon from '@mui/icons-material/Stop';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { useState } from 'react';
import { Data } from '../../interfaces/Ordenes';


const OrdersTableS = () => {

  const location = useLocation();
  const user = location.state?.user;
  const [filteredRows, setFilteredRows] = useState<Data[]>(rows.filter(row => row.supervisor === user.nombre));

  interface OrderState {
    [key: string]: string;
  }

  const [orderState, setOrderState] = useState<OrderState>({});

  const handleClicks = (row: Data) => {
    const newState = { ...orderState };
    if (!newState[row.orden]) {
      newState[row.orden] = 'Iniciado';
    } else if (newState[row.orden] === 'Iniciado') {
      newState[row.orden] = 'Terminar';
    } else {
      newState[row.orden] = 'Terminado';
    }
    setOrderState(newState);

    const newRows = [...filteredRows];
    const rowIndex = newRows.findIndex(r => r.orden === row.orden);
    if (newState[row.orden] === 'Iniciado') {
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
            <TableCell sx={{ cursor: 'pointer', fontWeight: 'bold' }}>Cliente</TableCell>
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
              <TableCell align="left" style={{ color: "#1976D2", fontWeight: 'bold', width: "90px" }} >{filteredRows.orden}</TableCell>
              <TableCell align="right" style={{ width: "145px" }}>{filteredRows.cliente}</TableCell>
              <TableCell align="right" style={{ width: "130px" }}>{filteredRows.contacto}</TableCell>
              <TableCell>{filteredRows.direccion}</TableCell>
              <TableCell>{filteredRows.areas.map(area => area.Nombre).join(", ")}</TableCell>
              <TableCell>{filteredRows.estado}</TableCell>
              <TableCell>{filteredRows.supervisor}</TableCell>
              <TableCell>{filteredRows.grupo?.join(", ")}</TableCell>
              <TableCell align="right"><Button
                disabled={filteredRows.estado === 'Terminado'}
                onClick={() => handleClicks(filteredRows)}
                variant="outlined"
                startIcon={
                  filteredRows.estado === 'Terminado' ? <StopIcon /> :
                    orderState[filteredRows.orden] === 'Iniciado' ? <StopIcon /> :
                      orderState[filteredRows.orden] === 'Terminar' ? <StopIcon /> :
                        <PlayCircleFilledWhiteIcon />
                }
              >
                {filteredRows.estado === 'Terminado' && 'Terminado'}
                {filteredRows.estado === 'Pendiente' && (orderState[filteredRows.orden] === 'Terminar' ? 'Terminar' : 'Iniciar')}
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