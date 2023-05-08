// import NavBar from '../components/NavBar/NavBar';
// import OrdersTable from '../components/OrdersTable/OrdersTable';
// import { useLocation } from "react-router-dom";

// function ServicioPage() {
//   const location = useLocation();
//   const user = location.state?.user;

//   return (
//     <div className="App">
//       <h1>Bienvenido, {user.nombre}</h1>
//     </div>
//   );
// }

// export default ServicioPage;
import NavBar from '../components/NavBar/NavBar';
import OrdersTableS from '../components/OrdersTable/OrdersTableS';


function SupervisorPage() {
  return (
    <div className="App">
      <NavBar/>
      <OrdersTableS/>
    </div>
  );
}

export default SupervisorPage;

