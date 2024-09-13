import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import axios from 'axios';

//import Login from "./non-authenticated/login/page.tsx"; 
//import Signup from "./non-authenticated/signup/page.tsx"; 

//import Home from "./(authenticated)/equipment-home/equipment-home.tsx"; 
//import EquipmentDetails from "./(authenticated)/equipment-home/equipment-details.tsx"; 
//import FavoritePage from "./(authenticated)/user-home/favorite-page.tsx"; 
//import ReservationStatus from "./(authenticated)/user-home/reservation-status.tsx"
//import UserHistoryPage from "./(authenticated)/user-home/history-page.tsx"; 
//import AddEquipmentPage from "./admin/add-equipment-page.tsx"; 
import AdminHistoryPage from "./admin/history-page.tsx";  


const router = createBrowserRouter([
  // Home page
 
  /*
  {
    path: "/kmla-warehouse/home",
    element: <Home />,
  },
  // Equipment details page
  
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
  
  // Admin: add equipment page
  {
    path: "/kmla-warehouse/admin/upload-item",
    element: <AddEquipmentPage />,
  },
  
  */
  // Admin: history page
  {
    path: "/kmla-warehouse/admin/history",
    element: <AdminHistoryPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;




