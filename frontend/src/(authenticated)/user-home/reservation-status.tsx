import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Reservation {
  name: string;
  status: string;
  dateRange: string;
}

const reservations: Reservation[] = [
  { name: '전자물품1', status: '수령완료', dateRange: '24/09/01 ~ 24/10/01' },
  { name: '전자물품2', status: '사용중', dateRange: '24/08/20 ~ 24/08/23' },
  { name: '전자물품3', status: '반납완료', dateRange: '24/04/12 ~ 25/04/22' },
];

const ReservationStatus = () => {
  const [filter, setFilter] = useState('전체');

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>예약현황</h2>
      <div>
        <button onClick={() => handleFilterChange('전체')}>전체</button>
        <button onClick={() => handleFilterChange('수령완료')}>수령완료</button>
        <button onClick={() => handleFilterChange('사용중')}>사용중</button>
        <button onClick={() => handleFilterChange('반납완료')}>반납완료</button>
      </div>
      <div>
        {reservations
          .filter(
            (reservation) => filter === '전체' || reservation.status === filter
          )
          .map((reservation, index) => (
            <div key={index} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <h3>{reservation.name}</h3>
              <p>상태: {reservation.status}</p>
              <p>예약기간: {reservation.dateRange}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ReservationStatus;
