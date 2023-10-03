import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Popup from './pages/Popup';
import './App.css';


function App() {
  return(
    <Router initialEntries={['/popup']}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />  
        <Route path="/popup" element={<Popup />} />
      </Routes>
    </Router>
  )
}

export default App;
