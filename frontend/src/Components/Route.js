
import { Routes, Route } from 'react-router-dom';
import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';
const RouteComp = () => {
 return (
    <>
       <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />

       </Routes>
    </>
 );
};

export default RouteComp;