import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Login from "./routes/(non-authenticated)/login/login.tsx"; 
import Signup from "./routes/(non-authenticated)/signup/signup.tsx"; 
import Home from "./routes/(non-authenticated)/equipment-home/equipment-home.tsx"; 
import EquipmentDetails from "./routes/(non-authenticated)/equipment-home/equipment-details.tsx"; 

import ReservationStatus from "./routes/(authenticated)/user/reservation.tsx";
import AccountSettings from "./routes/(authenticated)/user/account-settings.tsx";
 
import AdminEquipmentPage from "./routes/(authenticated)/admin/equipment.tsx"; 
import AdminHistoryPage from "./routes/(authenticated)/admin/reservation.tsx";  
import AdminTeamPage from "./routes/(authenticated)/admin/manage-team.tsx";
import AdminSettingPage from "./routes/(authenticated)/admin/account-settings.tsx";
// import { ProtectedAdmin, ProtectedRoute, ProtectedUser } from "./components/protected-routes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/admin",
    element: <Navigate to="/admin/equipment" replace />,
  },
  // Login page
  {
    path: "/login",
    element: <Login />,
  },
  // Signup page
  {
    path: "/signup",
    element: <Signup />,
  },
  // Home page
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/account-settings",
    element: <AccountSettings />,
  },

  // Equipment details page
  {
    path: "/item/:id",
    element: <EquipmentDetails />,
  },
  //Reservation Status page
  {
    path: "/reservation",
    element: <ReservationStatus />,
  },
  // Admin: add equipment page
  {
    path: "/admin/equipment",
    element: <AdminEquipmentPage />,
  },
  // Admin: reservation page
  {
    path: "/admin/reservation",
    element: <AdminHistoryPage />,
  },
  // Admin: mange team page
  {
    path: "/admin/team",
    element: <AdminTeamPage />,
  },
  // Admin: account setting page
  {
    path: "/admin/account-settings",
    element: <AdminSettingPage />,
  },  
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;




