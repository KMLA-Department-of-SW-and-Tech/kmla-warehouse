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
import { WaitRefreshRequestOnPageRefresh } from "./components/wait-for-refresh-request-on-page-refresh.jsx";

const intermediatePath = "" // /kmla-warehouse possible

const router = createBrowserRouter([
  {
    path: `${intermediatePath}/`,
    element: <Navigate to={`${intermediatePath}/home`} replace />,
  },
  {
    path: "/",
    element: <Navigate to={`${intermediatePath}/home`} replace />,
  },
  {
    path: "/admin",
    element: <Navigate to={`${intermediatePath}/admin/equipment`} replace />,
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
    element: (
      <WaitRefreshRequestOnPageRefresh>
        <Home />
      </WaitRefreshRequestOnPageRefresh>
    ),
  },
  {
    path: `${intermediatePath}/account-settings`,
    element: (
        <WaitRefreshRequestOnPageRefresh>
          <ProtectedRoute><ProtectedUser>
            <AccountSettings />
          </ProtectedUser></ProtectedRoute>
        </WaitRefreshRequestOnPageRefresh>
      ),
  },

  // Equipment details page
  {
    path: `${intermediatePath}/item/:id`,
    element: (
      <WaitRefreshRequestOnPageRefresh>
        <ProtectedRoute><ProtectedUser>
          <EquipmentDetails />
        </ProtectedUser></ProtectedRoute>
      </WaitRefreshRequestOnPageRefresh>
    ),
  },
  //Reservation Status page
  {
    path: `${intermediatePath}/reservation`,
    element: (
      <WaitRefreshRequestOnPageRefresh>
        <ProtectedRoute><ProtectedUser>
          <ReservationStatus />
        </ProtectedUser></ProtectedRoute>
      </WaitRefreshRequestOnPageRefresh>
    ),
  },
  // Admin: add equipment page
  {
    path: `${intermediatePath}/admin/equipment`,
    element: (
      <WaitRefreshRequestOnPageRefresh>
        <ProtectedRoute><ProtectedAdmin>
          <AdminEquipmentPage />
        </ProtectedAdmin></ProtectedRoute>
      </WaitRefreshRequestOnPageRefresh>
    ),
  },
  // Admin: reservation page
  {
    path: `${intermediatePath}/admin/reservation`,
    element: (
      <WaitRefreshRequestOnPageRefresh>
        <ProtectedRoute><ProtectedAdmin>
          <AdminHistoryPage />
        </ProtectedAdmin></ProtectedRoute>
      </WaitRefreshRequestOnPageRefresh>
    ),
  },
  // Admin: mange team page
  {
    path: `${intermediatePath}/admin/team`,
    element: (
      <WaitRefreshRequestOnPageRefresh>
        <ProtectedRoute><ProtectedAdmin>
          <AdminTeamPage />
        </ProtectedAdmin></ProtectedRoute>
      </WaitRefreshRequestOnPageRefresh>
    ),
  },
  // Admin: account setting page
  {
    path: `${intermediatePath}/admin/account-settings`,
    element: (
      <WaitRefreshRequestOnPageRefresh>
        <ProtectedRoute><ProtectedAdmin>
          <AdminSettingPage />
        </ProtectedAdmin></ProtectedRoute>
      </WaitRefreshRequestOnPageRefresh>
    ),
  },  
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;




