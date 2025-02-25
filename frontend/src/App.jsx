import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { AuthProvider } from "./jsx/contexts/authContext/index.jsx";

// import Login from "./jsx/routes/(non-authenticated)/login/login.tsx"; 
// import Signup from "./jsx/routes/(non-authenticated)/signup/signup.tsx"; 
import Home from "./jsx/routes/(non-authenticated)/home/home.tsx"; 
import EquipmentDetails from "./jsx/routes/(non-authenticated)/equpment-details/equipment-details.tsx"; 

import ReservationStatus from "./jsx/routes/(authenticated)/user/reservation.tsx";
import AccountSettings from "./jsx/routes/(authenticated)/user/account-settings.tsx";
 
import AdminEquipmentPage from "./jsx/routes/(authenticated)/admin/equipment.tsx"; 
import AdminHistoryPage from "./jsx/routes/(authenticated)/admin/reservation.tsx";  
import AdminTeamPage from "./jsx/routes/(authenticated)/admin/manage-team.tsx";
import AdminSettingPage from "./jsx/routes/(authenticated)/admin/account-settings.tsx";
// import { ProtectedAdmin, ProtectedRoute, ProtectedUser } from "./jsx/components/protected-routes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/admin",
    element: <Navigate to="/admin/equipment" replace />,
  },
  // // Login page
  // {
  //   path: "/login",
  //   element: <Login />,
  // },
  // // Signup page
  // {
  //   path: "/signup",
  //   element: <Signup />,
  // },
  // Home page
  {
    path: "/home",
    element: <Home />,
  },
  // Equipment details page
  {
    path: "/item/:id",
    element: <EquipmentDetails />,
  },
  // under here needs authorization
  {
    path: "/account-settings",
    element: <AccountSettings />,
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
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;




