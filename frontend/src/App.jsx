import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthProvider } from "./jsx/contexts/authContext/index.jsx";

import Home from "./jsx/routes/(non-authenticated)/home/home.tsx";
import ItemDetails from "./jsx/routes/(non-authenticated)/item-details/item-details.tsx";

import UserReservation from "./jsx/routes/(authenticated)/user/user-reservation.tsx";
import UserAccountSettings from "./jsx/routes/(authenticated)/user/user-account-settings.tsx";

import AdminItem from "./jsx/routes/(authenticated)/admin/admin-item.tsx";
import AdminReservation from "./jsx/routes/(authenticated)/admin/admin-reservation.tsx";
import AdminAccountSettings from "./jsx/routes/(authenticated)/admin/admin-account-settings.tsx";
import AdminPermission from "./jsx/routes/(authenticated)/admin/admin-permission.tsx";
import AdminUserList from "./jsx/routes/(authenticated)/admin/admin-userlist.tsx";
import {
  ProtectedAdmin,
  ProtectedRoute,
  ProtectedUser,
} from "./jsx/components/protected-routes/protected-routes.jsx";

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
    element: <ItemDetails />,
  },
  // under here needs authorization
  {
    path: "/account-settings",
    element: (
      <ProtectedRoute>
        <UserAccountSettings />
      </ProtectedRoute>
    ),
  },
  //Reservation Status page
  {
    path: "/reservation",
    element: (
      <ProtectedRoute>
        <ProtectedUser>
          <UserReservation />
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
          <AdminItem />
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
          <AdminReservation />
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
          <AdminUserList />
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
          <AdminPermission />
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
          <AdminAccountSettings />
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
