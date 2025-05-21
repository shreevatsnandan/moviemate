// src/components/Selectshow.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Selectshow.module.css";

// Dummy movie data
const dummyMovies = [
  { id: 1, title: "Avengers: Endgame", release_date: "2023-05-01" },
  { id: 2, title: "Spider-Man: No Way Home", release_date: "2023-06-15" },
  { id: 3, title: "The Batman", release_date: "2023-07-20" },
  {
    id: 4,
    title: "Black Panther: Wakanda Forever",
    release_date: "2023-12-10",
  },
  { id: 5, title: "Avatar: The Way of Water", release_date: "2024-01-05" },
];

// Hall names with capacities
const HALLS = [
  { name: "Hall A", capacity: 120 },
  { name: "Hall B", capacity: 150 },
  { name: "Hall C", capacity: 100 },
  { name: "Hall D", capacity: 200 },
  { name: "Premium Hall", capacity: 80 },
];

const MovieShowtimeSelector = ({ movieId }: { movieId: number }) => {
  const router = useRouter();
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showtimesByHall, setShowtimesByHall] = useState<
    Record<string, { time: string; id: string }[]>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const [movieData, setMovieData] = useState<{
    title: string;
    release_date: string;
  }>();

  useEffect(() => {
    const movie = dummyMovies.find((m) => m.id === movieId);
    if (movie) {
      setMovieData({
        title: movie.title,
        release_date: movie.release_date,
      });
    } else {
      // Fallback if movie not found
      setMovieData({
        title: "Movie Not Found",
        release_date: new Date().toISOString().split("T")[0],
      });
    }
  }, [movieId]);

  // Generate available dates based on release date
  useEffect(() => {
    if (!movieData) return;

    const today = new Date();
    const release = new Date(movieData.release_date);
    const startDate = release > today ? release : today;

    const dates = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }

    setAvailableDates(dates);
    setSelectedDate(dates[0]);
    setIsLoading(false);
  }, [movieData]);

  // Generate showtimes grouped by hall when date is selected
  useEffect(() => {
    if (!selectedDate || !movieData) return;

    const hallShowtimes: Record<string, { time: string; id: string }[]> = {};

    // Determine how many halls to use (3-5 halls)
    const numHalls = 3 + Math.floor(Math.random() * 3);
    const shuffledHalls = [...HALLS].sort(() => 0.5 - Math.random());
    const selectedHalls = shuffledHalls.slice(0, numHalls);

    selectedHalls.forEach((hall) => {
      // Generate 2-4 showtimes per hall
      const numShowtimes = 2 + Math.floor(Math.random() * 3);
      const showtimes = [];

      for (let i = 0; i < numShowtimes; i++) {
        const hour = 10 + Math.floor(Math.random() * 10); // 10am-8pm
        const minute = Math.random() > 0.5 ? 0 : 30; // :00 or :30
        const time = `${hour}:${minute === 0 ? "00" : "30"}`;

        showtimes.push({
          time,
          id: `${hall.name}-${time}-${
            selectedDate.toISOString().split("T")[0]
          }`,
        });
      }

      // Sort showtimes by time
      showtimes.sort((a, b) => {
        const timeA = parseInt(a.time.replace(":", ""));
        const timeB = parseInt(b.time.replace(":", ""));
        return timeA - timeB;
      });

      hallShowtimes[hall.name] = showtimes;
    });

    setShowtimesByHall(hallShowtimes);
  }, [selectedDate, movieData]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const handleShowtimeClick = (
    hall: string,
    showtime: { time: string; id: string }
  ) => {
    if (!selectedDate) return;

    router.push(
      `/select-seat`
    );
  };

  if (isLoading || !movieData) {
    return <div className={styles.loadingContainer}>Loading showtimes...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.datesCarousel}>
        {availableDates.map((date, index) => (
          <div
            key={index}
            className={`${styles.dateItem} ${
              date.toDateString() === selectedDate?.toDateString()
                ? styles.selectedDate
                : ""
            }`}
            onClick={() => setSelectedDate(date)}
          >
            <div>{formatDate(date).split(",")[0]}</div>
            <div>{formatDate(date).split(",")[1]}</div>
          </div>
        ))}
      </div>

      <h3>Available Showtimes</h3>
      {Object.keys(showtimesByHall).length > 0 ? (
        <div className={styles.hallsContainer}>
          {Object.entries(showtimesByHall).map(([hall, showtimes]) => (
            <div key={hall} className={styles.hallSection}>
              <h4 className={styles.hallName}>{hall}</h4>
              <div className={styles.showtimesList}>
                {showtimes.map((showtime) => (
                  <button
                    key={showtime.id}
                    className={styles.showtimeButton}
                    onClick={() => handleShowtimeClick(hall, showtime)}
                  >
                    {showtime.time}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noShowtimes}>
          No showtimes available for this date
        </div>
      )}
    </div>
  );
};

export default MovieShowtimeSelector;
