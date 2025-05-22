'use client';
import Link from 'next/link';

export default function BookingConfirmation() {
  // Hardcoded booking data
  const bookingData = {
    seats: ['A5', 'A6', 'A7'],
    movie: {
      title: "Avengers: Endgame",
      type: "3D Dolby Atmos",
      duration: "3h 1m",
      rating: "PG-13",
      showtime: "May 25, 2024 - 7:30 PM",
      theater: "Cineplex Downtown (Screen 5)",
      poster: "/avengers-endgame.jpg"
    },
    pricing: {
      seatPrice: 12.99,
      taxRate: 0.08, 
      convenienceFee: 2.50
    }
  };

  // Calculate totals
  const numSeats = bookingData.seats.length;
  const subtotal = bookingData.pricing.seatPrice * numSeats;
  const tax = subtotal * bookingData.pricing.taxRate;
  const total = subtotal + tax + bookingData.pricing.convenienceFee;

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Booking Confirmation</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Movie Details & Terms */}
        <div className="lg:w-2/3 space-y-6">
          {/* Movie Details Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Movie Information</h2>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-full sm:w-1/3 bg-gray-200 rounded-lg flex items-center justify-center min-h-48">
                <span className="text-gray-500">Movie Poster</span>
              </div>
              <div className="w-full sm:w-2/3">
                <h3 className="text-xl font-bold">{bookingData.movie.title}</h3>
                <div className="flex gap-4 mt-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {bookingData.movie.type}
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                    {bookingData.movie.rating}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex">
                    <span className="w-24 font-medium">Duration:</span>
                    <span>{bookingData.movie.duration}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 font-medium">Showtime:</span>
                    <span>{bookingData.movie.showtime}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 font-medium">Theater:</span>
                    <span>{bookingData.movie.theater}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 font-medium">Seats:</span>
                    <span className="font-bold">{bookingData.seats.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terms & Conditions Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>
            <div className="prose prose-sm">
              <ul className="list-disc pl-5 space-y-2">
                <li>Tickets once booked cannot be exchanged or refunded</li>
                <li>Please arrive at least 15 minutes before showtime</li>
                <li>Latecomers may not be admitted until a suitable break</li>
                <li>Children under 3 are not permitted in the theater</li>
                <li>Outside food and drinks are prohibited</li>
                <li>Mobile tickets or printed confirmation required</li>
                <li>Recording devices are strictly prohibited</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column - Billing */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 sticky top-4">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Tickets ({numSeats})</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Convenience Fee</span>
                <span>₹{bookingData.pricing.convenienceFee.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Tax ({(bookingData.pricing.taxRate * 100).toFixed(0)}%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              
              <div className="border-t border-gray-300 pt-3 mt-3 font-bold text-lg flex justify-between">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition">
                Proceed to Payment
              </button>
              
              <button 
                onClick={() => window.print()}
                className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 py-3 px-4 rounded-lg font-medium transition"
              >
                Print Ticket
              </button>
              
              <Link 
                href="/" 
                className="block text-center text-blue-600 hover:text-blue-800 mt-4 text-sm"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}