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
import AdminUserListPage from "./jsx/routes/(authenticated)/admin/admin-userlist.tsx";
import { ProtectedAdmin, ProtectedRoute, ProtectedUser } from "./jsx/components/protected-routes.jsx";
// import { ProtectedAdmin, ProtectedRoute, ProtectedUser } from "./jsx/components/protected-routes.jsx";

const router = createBrowserRouter([
  // Replacements
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/admin",
    element: <Navigate to="/admin/item" replace />,
  },

  

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
    element: (
      <ProtectedRoute>
        <AccountSettings />
      </ProtectedRoute>
    ),
  },
  //Reservation Status page
  {
    path: "/reservation",
    element: (
      <ProtectedRoute>
        <ProtectedUser>
          <ReservationStatus />
        </ProtectedUser>
      </ProtectedRoute>
    ),
  },


  
  // ADMIN: add equipment page
  {
    path: "/admin/item",
    element: (
      <ProtectedRoute>
        <ProtectedAdmin>
          <AdminEquipmentPage />
        </ProtectedAdmin>
      </ProtectedRoute>
    ),
  },
  // ADMIN: reservation page
  {
    path: "/admin/reservation",
    element: (
      <ProtectedRoute>
        <ProtectedAdmin>
          <AdminReservationPage />
        </ProtectedAdmin>
      </ProtectedRoute>
    ),
  },
  // ADMIN: userlist page
  {
    path: "/admin/userlist",
    element: (
      <ProtectedRoute>
        <ProtectedAdmin>
          <AdminUserListPage />
        </ProtectedAdmin>
      </ProtectedRoute>
    ),
  },
  // ADMIN: user permission page
  {
    path: "/admin/permission",
    element: (
      <ProtectedRoute>
        <ProtectedAdmin>
          <AdminPermissionPage />
        </ProtectedAdmin>
      </ProtectedRoute>
    ),
  },
  // ADMIN: account setting page
  {
    path: "/admin/account-settings",
    element: (
      <ProtectedRoute>
        <ProtectedAdmin>
          <AdminSettingPage />
        </ProtectedAdmin>
      </ProtectedRoute>
    ),
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




