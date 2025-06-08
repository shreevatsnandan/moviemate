export interface Movie {
  id: string;
  title: string;
  description: string;
  poster: string;
  genre: string;
  duration: string;
  rating: number;
  releaseDate: string;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: "standard" | "premium" | "vip";
  price: number;
  isBooked: boolean;
}

export interface Hall {
  id: string;
  name: string;
  rows: number;
  seatsPerRow: number;
  layout: Seat[][];
  type: string;
}

export interface Showtime {
  id: string;
  movieId: string;
  hallId: string;
  hallName: string;
  date: string;
  time: string;
  price: number;
  availableSeats: number;
}

export interface Booking {
  id: string;
  userId: string;
  movieId: string;
  showtimeId: string;
  seats: Seat[];
  total: number;
  status: "confirmed" | "cancelled";
  createdAt: string;
}

export const movies: Movie[] = [
  {
    id: "1",
    title: "The Dark Knight",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster: "/placeholder.svg?height=600&width=400",
    genre: "Action",
    duration: "2h 32m",
    rating: 9.0,
    releaseDate: "2008-07-18",
  },
  {
    id: "2",
    title: "Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster: "/placeholder.svg?height=600&width=400",
    genre: "Sci-Fi",
    duration: "2h 28m",
    rating: 8.8,
    releaseDate: "2010-07-16",
  },
  {
    id: "3",
    title: "Interstellar",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster: "/placeholder.svg?height=600&width=400",
    genre: "Sci-Fi",
    duration: "2h 49m",
    rating: 8.6,
    releaseDate: "2014-11-07",
  },
  {
    id: "4",
    title: "The Avengers",
    description:
      "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
    poster: "/placeholder.svg?height=600&width=400",
    genre: "Action",
    duration: "2h 23m",
    rating: 8.0,
    releaseDate: "2012-05-04",
  },
];

// Generate seat layout for a hall
const generateSeatLayout = (
  rows: number,
  seatsPerRow: number,
  hallType: string
): Seat[][] => {
  const layout: Seat[][] = [];

  for (let row = 0; row < rows; row++) {
    const seatRow: Seat[] = [];
    for (let seat = 1; seat <= seatsPerRow; seat++) {
      let seatType: "standard" | "premium" | "vip" = "standard";
      let price = 12;

      // Premium seats in middle rows
      if (row >= Math.floor(rows * 0.3) && row <= Math.floor(rows * 0.7)) {
        seatType = "premium";
        price = 18;
      }

      // VIP seats in the best rows (back third)
      if (hallType === "premium" && row >= Math.floor(rows * 0.7)) {
        seatType = "vip";
        price = 25;
      }

      seatRow.push({
        id: `${String.fromCharCode(65 + row)}${seat}`,
        row: String.fromCharCode(65 + row),
        number: seat,
        type: seatType,
        price,
        isBooked: Math.random() < 0.15, // 15% chance of being booked
      });
    }
    layout.push(seatRow);
  }

  return layout;
};

export const halls: Hall[] = [
  {
    id: "1",
    name: "Hall A - Standard",
    rows: 8,
    seatsPerRow: 8,
    type: "standard",
    layout: generateSeatLayout(8, 8, "standard"),
  },
  {
    id: "2",
    name: "Hall B - Premium",
    rows: 8,
    seatsPerRow: 10,
    type: "premium",
    layout: generateSeatLayout(8, 10, "premium"),
  },
  {
    id: "3",
    name: "Hall C - IMAX",
    rows: 8,
    seatsPerRow: 8,
    type: "imax",
    layout: generateSeatLayout(8, 8, "imax"),
  },
];

export const showtimes: Showtime[] = [
  // The Dark Knight
  {
    id: "1",
    movieId: "1",
    hallId: "1",
    hallName: "Hall A - Standard",
    date: "Today",
    time: "2:00 PM",
    price: 12,
    availableSeats: 85,
  },
  {
    id: "2",
    movieId: "1",
    hallId: "2",
    hallName: "Hall B - Premium",
    date: "Today",
    time: "5:30 PM",
    price: 18,
    availableSeats: 62,
  },
  {
    id: "3",
    movieId: "1",
    hallId: "3",
    hallName: "Hall C - IMAX",
    date: "Today",
    time: "8:00 PM",
    price: 25,
    availableSeats: 145,
  },
  // Inception
  {
    id: "4",
    movieId: "2",
    hallId: "1",
    hallName: "Hall A - Standard",
    date: "Today",
    time: "1:30 PM",
    price: 12,
    availableSeats: 92,
  },
  {
    id: "5",
    movieId: "2",
    hallId: "2",
    hallName: "Hall B - Premium",
    date: "Today",
    time: "4:45 PM",
    price: 18,
    availableSeats: 58,
  },
  // Interstellar
  {
    id: "6",
    movieId: "3",
    hallId: "3",
    hallName: "Hall C - IMAX",
    date: "Today",
    time: "7:15 PM",
    price: 25,
    availableSeats: 128,
  },
  // The Avengers
  {
    id: "7",
    movieId: "4",
    hallId: "1",
    hallName: "Hall A - Standard",
    date: "Today",
    time: "3:00 PM",
    price: 12,
    availableSeats: 76,
  },
  {
    id: "8",
    movieId: "4",
    hallId: "2",
    hallName: "Hall B - Premium",
    date: "Today",
    time: "6:30 PM",
    price: 18,
    availableSeats: 45,
  },
];
