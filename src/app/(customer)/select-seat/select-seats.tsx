'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SelectSeats() {
    const router = useRouter();
 const initialSeats = [
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  ['B', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 'B', 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1],
  [1, 'B', 1, 1, 0, 0, 0, 1, 'B', 1, 0, 0, 0, 1, 1],
  [1, 1, 'B', 1, 0, 0, 0, 1, 1, 'B', 0, 0, 0, 1, 1],
  [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 'B'],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 'B', 1, 1, 1, 'B', 1, 1, 1, 1, 0, 0]
];

  const [seats, setSeats] = useState(initialSeats);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (rowIndex, seatIndex) => {
    const seatValue = seats[rowIndex][seatIndex];
    
    // Don't allow selection if seat is booked or doesn't exist
    if (seatValue === 'B' || seatValue === 0) return;

    const newSeats = [...seats];
    const seatKey = `${String.fromCharCode(65 + rowIndex)}${seatIndex + 1}`;

    if (selectedSeats.includes(seatKey)) {
      // Deselect seat
      newSeats[rowIndex][seatIndex] = 1;
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatKey));
    } else {
      // Select seat
      newSeats[rowIndex][seatIndex] = 'S'; // 'S' for selected
      setSelectedSeats([...selectedSeats, seatKey]);
    }

    setSeats(newSeats);
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    const bookingData = {
      selectedSeats
    };
    const newSeats = [...seats];
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
    router.push('/booking-confirmation');
  };

  return (
        <>
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <div className="flex justify-center gap-8  mb-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-green-500 flex items-center justify-center text-white text-xs"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-red-500 flex items-center justify-center text-white text-xs"></div>
          <span>Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center text-white text-xs"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gray-300 flex items-center justify-center text-xs"></div>
          <span>Unavailable</span>
        </div>
      </div>

      <div className="bg-gradient-to-b from-blue-600 to-blue-700 text-white text-center py-3 mb-8 rounded shadow-md font-bold">
        SCREEN
      </div>
      
      <div className="flex flex-col gap-3 mb-8">
        <div className="flex ml-8 justify-evenly">
          {Array.from({ length: seats[0].length }, (_, i) => (
            <div key={`col-${i}`} className="w-7 text-center text-sm text-gray-600">{i + 1}</div>
          ))}
        </div>
        
        {seats.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex justify-evenly gap-3">
            <div className="w-6 font-bold">{String.fromCharCode(65 + rowIndex)}</div>
            {row.map((seat, seatIndex) => (
              <button
                key={`seat-${rowIndex}-${seatIndex}`}
                className={`w-7 h-7 rounded flex items-center justify-center text-xs transition-all
                  ${seat === 0 ? 'invisible cursor-not-allowed' :
                    seat === 'B' ? 'bg-red-500 text-white cursor-not-allowed' :
                    seat === 'S' ? 'bg-blue-500 text-white' :
                    'bg-green-500 text-white hover:scale-110'}`}
                onClick={() => handleSeatClick(rowIndex, seatIndex)}
                disabled={seat === 0 || seat === 'B'}
              >
                {seat === 0 ? '' : seatIndex + 1}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="mb-4">Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</p>
        <button 
          onClick={handleBooking}
          disabled={selectedSeats.length === 0}
          className={`px-6 py-2 rounded font-bold transition-colors
            ${selectedSeats.length === 0 ? 
              'bg-gray-400 cursor-not-allowed' : 
              'bg-orange-500 hover:bg-orange-600 text-white'}`}
        >
          Book Selected Seats
        </button>
      </div>
    </div>
    </>
  );
}