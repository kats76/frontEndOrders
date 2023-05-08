import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from './components/LoginScreen/LoginScreen';
import AdminPage from './pages/AdminPage'
import SupervisorPage from './pages/SupervisorPage'
import ServicioPage from './pages/ServicioPage'

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen/>}/>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/supervisor" element={<SupervisorPage />} />
          <Route path="/servicio" element={<ServicioPage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
