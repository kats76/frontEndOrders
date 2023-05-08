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
