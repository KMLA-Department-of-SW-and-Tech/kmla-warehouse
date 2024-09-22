import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import axios from 'axios';

//import Login from "./non-authenticated/login/page.tsx"; 
// import Signup from "./non-authenticated/signup/page.tsx"; 

import Home from "./(authenticated)/equipment-home/equipment-home.tsx"; 
import EquipmentDetails from "./(authenticated)/equipment-home/equipment-details.tsx"; 
// import FavoritePage from "./(authenticated)/user-home/favorite-page.tsx"; 
// import ReservationStatus from "./(authenticated)/user-home/reservation-status.tsx"
// import UserHistoryPage from "./(authenticated)/user-home/history-page.tsx"; 
// 
import AdminEquipmentPage from "./admin/equipment-page.tsx"; 
import AdminHistoryPage from "./admin/history-page.tsx";  
import AdminHome from "./admin/admin-home.tsx";
import AdminTeamPage from "./admin/manage-team-page.tsx";
import AdminSettingPage from "./admin/admin-setting.tsx";
import LoginPage from "./(non-authenticated)/login/page.tsx";


const router = createBrowserRouter([
  // Home page
  {
    path: "/kmla-warehouse/home",
    element: <Home />,
  },
  // Login page
  {
    path: "/kmla-warehouse/login",
    element: <LoginPage />,
  },
  // Equipment details page
  
  /*
  {
    path: "/kmla-warehouse/item/:itemId",
    element: <EquipmentDetails />,
  },
  // Favorite page
  {
    path: "/kmla-warehouse/favorites",
    element: <FavoritePage />,
  },
  // Reservation Status page
  {
    path: "/kmla-warehouse/reservation-status",
    element: <ReservationStatus />,
  },
  // User rental history page
  {
    path: "/kmla-warehouse/rental-history",
    element: <UserHistoryPage />,
  },
  // Signup page
  {
    path: "/kmla-warehouse/signup",
    element: <Signup />,
  },
  */
  {
    path: "/kmla-warehouse/admin/home",
    element: <AdminHome />,
  },

  
  
  // Admin: add equipment page
  {
    path: "/kmla-warehouse/admin/equipment",
    element: <AdminEquipmentPage />,
  },
  

  // Admin: reservation page
  {
    path: "/kmla-warehouse/admin/reservation",
    element: <AdminHistoryPage />,
  },

  // Admin: mange team page
  {
    path: "/kmla-warehouse/admin/team",
    element: <AdminTeamPage />,
  },

  // Admin: account setting page
  {
    path: "/kmla-warehouse/admin/setting",
    element: <AdminSettingPage />,
  }


]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;




