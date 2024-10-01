import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import axios from 'axios';

import Login from "./(non-authenticated)/login/page.tsx"; 
import Signup from "./(non-authenticated)/signup/page.tsx"; 

import Home from "./(authenticated)/equipment-home/equipment-home.tsx"; 
import EquipmentDetails from "./(authenticated)/equipment-home/equipment-details.tsx"; 
import ReservationStatus from "./(authenticated)/user-home/reservation-status.tsx";
 
import AdminEquipmentPage from "./admin/equipment-page.tsx"; 
import AdminHistoryPage from "./admin/reservation-page.tsx";  
import AdminTeamPage from "./admin/manage-team-page.tsx";
import AdminSettingPage from "./admin/admin-setting.tsx";
import { ProtectedRoute } from "./components/protected-routes.jsx";



const router = createBrowserRouter([
  // Login page
  {
    path: "/kmla-warehouse/login",
    element: <Login />,
  },
  // Signup page
  {
    path: "/kmla-warehouse/signup",
    element: <Signup />,
  },
  // Home page
  {
    path: "/kmla-warehouse/home",
    element: <ProtectedRoute><Home /></ProtectedRoute>,
  },
  // Equipment details page
  {
    path: "/kmla-warehouse/item/:id",
    element: <ProtectedRoute><EquipmentDetails /></ProtectedRoute>,
  },
  //Reservation Status page
  {
    path: "/kmla-warehouse/reservation-status",
    element: <ProtectedRoute><ReservationStatus /></ProtectedRoute>,
  },
  
  // Admin: add equipment page
  {
    path: "/kmla-warehouse/admin/equipment",
    element: <ProtectedRoute><AdminEquipmentPage /></ProtectedRoute>,
  },
  // Admin: reservation page
  {
    path: "/kmla-warehouse/admin/reservation",
    element: <ProtectedRoute><AdminHistoryPage /></ProtectedRoute>,
  },
  // Admin: mange team page
  {
    path: "/kmla-warehouse/admin/team",
    element: <ProtectedRoute><AdminTeamPage /></ProtectedRoute>,
  },
  // Admin: account setting page
  {
    path: "/kmla-warehouse/admin/setting",
    element: <ProtectedRoute><AdminSettingPage /></ProtectedRoute>,
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;




