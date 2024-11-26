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

const intermediatePath = "/kmla-warehouse" // make it an empty string if no intermediate path

const router = createBrowserRouter([
  {
    path: `${intermediatePath}`,
    element: <Navigate to={`${intermediatePath}/home`} replace />,
  },
  {
    path: "/",
    element: <Navigate to={`${intermediatePath}/home`} replace />,
  },
  // Login page
  {
    path: `${intermediatePath}/login`,
    element: <Login />,
  },
  // Signup page
  {
    path: `${intermediatePath}/signup`,
    element: <Signup />,
  },
  {
    path: `${intermediatePath}/account-settings`,
    element: <ProtectedRoute><ProtectedUser><AccountSettings /></ProtectedUser></ProtectedRoute>,
  },
  // Home page
  {
    path: `${intermediatePath}/home`,
    element: <Home />
  },
  // Equipment details page
  {
    path: `${intermediatePath}/item/:id`,
    element: <ProtectedRoute><ProtectedUser><EquipmentDetails /></ProtectedUser></ProtectedRoute>,
  },
  //Reservation Status page
  {
    path: `${intermediatePath}/reservation`,
    element: <ProtectedRoute><ProtectedUser><ReservationStatus /></ProtectedUser></ProtectedRoute>,
  },
  // Admin: add equipment page
  {
    path: `${intermediatePath}/admin/equipment`,
    element: <ProtectedRoute><ProtectedAdmin><AdminEquipmentPage /></ProtectedAdmin></ProtectedRoute>,
  },
  // Admin: reservation page
  {
    path: `${intermediatePath}/admin/reservation`,
    element: <ProtectedRoute><ProtectedAdmin><AdminHistoryPage /></ProtectedAdmin></ProtectedRoute>,
  },
  // Admin: mange team page
  {
    path: `${intermediatePath}/admin/team`,
    element: <ProtectedRoute><ProtectedAdmin><AdminTeamPage /></ProtectedAdmin></ProtectedRoute>,
  },
  // Admin: account setting page
  {
    path: `${intermediatePath}/admin/account-settings`,
    element: <ProtectedRoute><ProtectedAdmin><AdminSettingPage /></ProtectedAdmin></ProtectedRoute>,
  },  
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;




