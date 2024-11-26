import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Login from "./routes/(non-authenticated)/login/login.tsx"; 
import Signup from "./routes/(non-authenticated)/signup/signup.tsx"; 

import Home from "./routes/(non-authenticated)/equipment-home/equipment-home.tsx"; 
import EquipmentDetails from "./routes/(non-authenticated)/equipment-home/equipment-details.tsx"; 
import ReservationStatus from "./routes/(authenticated)/user/reservation.tsx";
 
import AdminEquipmentPage from "./routes/(authenticated)/admin/equipment.tsx"; 
import AdminHistoryPage from "./routes/(authenticated)/admin/reservation.tsx";  
import AdminTeamPage from "./routes/(authenticated)/admin/manage-team.tsx";
import AdminSettingPage from "./routes/(authenticated)/admin/account-settings.tsx";
import { ProtectedAdmin, ProtectedRoute, ProtectedUser } from "./components/protected-routes.jsx";
import AccountSettings from "./routes/(authenticated)/user/account-settings.tsx";

const intermediatePath = "" // /kmla-warehouse possible

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
  // Home page
  {
    path: `${intermediatePath}/home`,
    element: <Home />
  },
  {
    path: `${intermediatePath}/account-settings`,
    element: <ProtectedRoute><ProtectedUser><AccountSettings /></ProtectedUser></ProtectedRoute>,
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




