import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthProvider } from "./jsx/contexts/authContext/index.jsx";
// import Login from "./jsx/routes/(non-authenticated)/login/login.tsx"; 
// import Signup from "./jsx/routes/(non-authenticated)/signup/signup.tsx"; 
import Home from "./jsx/routes/(non-authenticated)/home/home.tsx"; 
import EquipmentDetails from "./jsx/routes/(non-authenticated)/item-details/item-details.tsx"; 

import ReservationStatus from "./jsx/routes/(authenticated)/user/user-reservation.tsx";
import AccountSettings from "./jsx/routes/(authenticated)/user/user-account-settings.tsx";
 
import AdminEquipmentPage from "./jsx/routes/(authenticated)/admin/admin-item.tsx"; 
import AdminReservationPage from "./jsx/routes/(authenticated)/admin/admin-reservation.tsx";  
// import AdminTeamPage from "./jsx/routes/(authenticated)/admin/manage-team.tsx";
import AdminSettingPage from "./jsx/routes/(authenticated)/admin/admin-account-settings.tsx";
import AdminPermissionPage from "./jsx/routes/(authenticated)/admin/admin-permission.tsx";
// import { ProtectedAdmin, ProtectedRoute, ProtectedUser } from "./jsx/components/protected-routes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/admin",
    element: <Navigate to="/admin/item" replace />,
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


  
  // ADMIN: add equipment page
  {
    path: "/admin/item",
    element: <AdminEquipmentPage />,
  },
  // ADMIN: reservation page
  {
    path: "/admin/reservation",
    element: <AdminReservationPage />,
  },
  // ADMIN: user permission page
  {
    path: "/admin/permission",
    element: <AdminPermissionPage />,
  },
  // ADMIN: account setting page
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




