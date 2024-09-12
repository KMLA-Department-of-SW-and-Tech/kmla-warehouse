import React from "react";
import Header from "../../components/header";

interface FavoriteItem {
  name: string;
  reservationStatus: string;
}

const favoriteItems: FavoriteItem[] = [
  { name: '전자물품1', reservationStatus: '예약자 1명' },
  { name: '전자물품2', reservationStatus: '예약자 3명' },
  { name: '전자물품3', reservationStatus: '예약자 0명' },
];

const Favorites = () => {
  return (
    <>
      <Header />
      <div style={{ padding: '20px' }}>
        <h2>즐겨찾기</h2>
        <p style={{ fontSize: '2em', fontWeight: 'bold' }}>Favorite</p> {/* Add this line */}
        <div>
          {favoriteItems.map((item, index) => (
            <div key={index} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <h3>{item.name}</h3>
              <p>{item.reservationStatus}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Favorites;
