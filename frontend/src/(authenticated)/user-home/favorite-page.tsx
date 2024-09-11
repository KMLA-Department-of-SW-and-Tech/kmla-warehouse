import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface FavoriteItem {
  name: string;
  reservationStatus: string;
}

const favoriteItems: FavoriteItem[] = [
  { name: '전자물품1', reservationStatus: '예약자 1명' },
  { name: '전자물품2', reservationStatus: '예약자 3명' },
  { name: '전자물품3', reservationStatus: '예약자 없음' },
];

const Favorites = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>즐겨찾기</h2>
      <div>
        {favoriteItems.map((item, index) => (
          <div key={index} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{item.name}</h3>
            <p>{item.reservationStatus}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
