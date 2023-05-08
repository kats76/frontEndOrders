// import NavBar from '../components/NavBar/NavBar';
// import OrdersTable from '../components/OrdersTable/OrdersTable';
// import { useLocation } from "react-router-dom";

// function AdminPage() {
//   const location = useLocation();
//   const user = location.state?.user;

//   return (
//     <div className="App">
//       <h1>Bienvenido, {user.nombre}</h1>
//       <NavBar/>
//       <OrdersTable/>
//     </div>
//   );
// }

// export default AdminPage;

import NavBar from '../components/NavBar/NavBar';
import OrdersTable from '../components/OrdersTable/OrdersTable';


function AdminPage() {
  return (
    <div className="App">
      <NavBar/>
      <OrdersTable/>
    </div>
  );
}

export default AdminPage;
