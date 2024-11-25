import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Login from "./(non-authenticated)/login/page.tsx"; 
import Signup from "./(non-authenticated)/signup/page.tsx"; 

import Home from "./(authenticated)/equipment-home/equipment-home.tsx"; 
import EquipmentDetails from "./(authenticated)/equipment-home/equipment-details.tsx"; 
import ReservationStatus from "./(authenticated)/user-home/reservation-status.tsx";
 
import AdminEquipmentPage from "./admin/equipment-page.tsx"; 
import AdminHistoryPage from "./admin/reservation-page.tsx";  
import AdminTeamPage from "./admin/manage-team-page.tsx";
import AdminSettingPage from "./admin/admin-setting.tsx";
import { ProtectedAdmin, ProtectedRoute, ProtectedUser } from "./components/protected-routes.jsx";
import AccountSettings from "./(authenticated)/user-home/account-settings.tsx";

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
  {
    path: "/kmla-warehouse/account-settings",
    element: <ProtectedRoute><ProtectedUser><AccountSettings /></ProtectedUser></ProtectedRoute>,
  },
  // Home page
  {
    path: "/kmla-warehouse/home",
    element: <ProtectedRoute><ProtectedUser><Home /></ProtectedUser></ProtectedRoute>,
  },
  // Equipment details page
  {
    path: "/kmla-warehouse/item/:id",
    element: <ProtectedRoute><ProtectedUser><EquipmentDetails /></ProtectedUser></ProtectedRoute>,
  },
  //Reservation Status page
  {
    path: "/kmla-warehouse/reservation-status",
    element: <ProtectedRoute><ProtectedUser><ReservationStatus /></ProtectedUser></ProtectedRoute>,
  },
  // Admin: add equipment page
  {
    path: "/kmla-warehouse/admin/equipment",
    element: <ProtectedRoute><ProtectedAdmin><AdminEquipmentPage /></ProtectedAdmin></ProtectedRoute>,
  },
  // Admin: reservation page
  {
    path: "/kmla-warehouse/admin/reservation",
    element: <ProtectedRoute><ProtectedAdmin><AdminHistoryPage /></ProtectedAdmin></ProtectedRoute>,
  },
  // Admin: mange team page
  {
    path: "/kmla-warehouse/admin/team",
    element: <ProtectedRoute><ProtectedAdmin><AdminTeamPage /></ProtectedAdmin></ProtectedRoute>,
  },
  // Admin: account setting page
  {
    path: "/kmla-warehouse/admin/setting",
    element: <ProtectedRoute><ProtectedAdmin><AdminSettingPage /></ProtectedAdmin></ProtectedRoute>,
  },  
  {
    path: "/",
    element: <Navigate to="/kmla-warehouse/home" replace />,
},
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;




