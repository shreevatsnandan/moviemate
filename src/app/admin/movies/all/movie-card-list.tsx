"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data
const movies = [
  {
    id: "1",
    title: "Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    releaseDate: "2010-07-16",
    categories: ["Sci-Fi", "Action", "Thriller"],
    languages: ["English", "Japanese"],
    censorRating: "PG-13",
    director: "Christopher Nolan",
    cast: [
      { name: "Leonardo DiCaprio", role: "Dom Cobb" },
      { name: "Marion Cotillard", role: "Mal" },
      { name: "Tom Hardy", role: "Eames" },
    ],
    poster: "/images/banner1.jpg",
  },
  {
    id: "2",
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    releaseDate: "1994-09-23",
    categories: ["Drama"],
    languages: ["English"],
    censorRating: "R",
    director: "Frank Darabont",
    cast: [
      { name: "Tim Robbins", role: "Andy Dufresne" },
      { name: "Morgan Freeman", role: "Ellis Boyd 'Red' Redding" },
    ],
    poster: "/images/banner2.jpg",
  },
  {
    id: "3",
    title: "The Dark Knight",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    releaseDate: "2008-07-18",
    categories: ["Action", "Crime", "Drama"],
    languages: ["English"],
    censorRating: "PG-13",
    director: "Christopher Nolan",
    cast: [
      { name: "Christian Bale", role: "Bruce Wayne / Batman" },
      { name: "Heath Ledger", role: "Joker" },
      { name: "Aaron Eckhart", role: "Harvey Dent / Two-Face" },
    ],
    poster: "/images/banner3.jpg",
  },
  {
    id: "4",
    title: "Pulp Fiction",
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    releaseDate: "1994-10-14",
    categories: ["Crime", "Drama"],
    languages: ["English"],
    censorRating: "R",
    director: "Quentin Tarantino",
    cast: [
      { name: "John Travolta", role: "Vincent Vega" },
      { name: "Samuel L. Jackson", role: "Jules Winnfield" },
      { name: "Uma Thurman", role: "Mia Wallace" },
    ],
    poster: "/images/banner2.jpg",
  },
  {
    id: "5",
    title: "The Godfather",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    releaseDate: "1972-03-24",
    categories: ["Crime", "Drama"],
    languages: ["English", "Italian", "Latin"],
    censorRating: "R",
    director: "Francis Ford Coppola",
    cast: [
      { name: "Marlon Brando", role: "Don Vito Corleone" },
      { name: "Al Pacino", role: "Michael Corleone" },
      { name: "James Caan", role: "Sonny Corleone" },
    ],
    poster: "/images/banner1.jpg",
  },
  {
    id: "6",
    title: "Forrest Gump",
    description:
      "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man.",
    releaseDate: "1994-07-06",
    categories: ["Drama", "Romance"],
    languages: ["English"],
    censorRating: "PG-13",
    director: "Robert Zemeckis",
    cast: [
      { name: "Tom Hanks", role: "Forrest Gump" },
      { name: "Robin Wright", role: "Jenny Curran" },
      { name: "Gary Sinise", role: "Lieutenant Dan Taylor" },
    ],
    poster: "/images/banner3.jpg",
  },
];

export function MovieCardList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [censorFilter, setCensorFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  // Filter movies based on search and filters
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "" ||
      categoryFilter === "all" ||
      movie.categories.includes(categoryFilter);
    const matchesLanguage =
      languageFilter === "" ||
      languageFilter === "all" ||
      movie.languages.includes(languageFilter);
    const matchesCensor =
      censorFilter === "" ||
      censorFilter === "all" ||
      movie.censorRating === censorFilter;

    return matchesSearch && matchesCategory && matchesLanguage && matchesCensor;
  });

  // Pagination
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const paginatedMovies = filteredMovies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get unique values for filters
  const categories = [...new Set(movies.flatMap((movie) => movie.categories))];
  const languages = [...new Set(movies.flatMap((movie) => movie.languages))];
  const censorRatings = [...new Set(movies.map((movie) => movie.censorRating))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Movies All</h1>
          <p className="text-muted-foreground">
            Manage your movies, add new ones, and edit existing ones.
          </p>
        </div>
      </div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Input
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={languageFilter} onValueChange={setLanguageFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Languages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Languages</SelectItem>
            {languages.map((language) => (
              <SelectItem key={language} value={language}>
                {language}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={censorFilter} onValueChange={setCensorFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Ratings" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ratings</SelectItem>
            {censorRatings.map((rating) => (
              <SelectItem key={rating} value={rating}>
                {rating}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Movie Cards */}
      {paginatedMovies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No movies found. Try adjusting your filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedMovies.map((movie) => (
            <Card
              key={movie.id}
              className="overflow-hidden hover:shadow-lg transition-shadow p-0"
            >
              <div
                className="aspect-[3/4] relative"
                style={{ height: "300px", width: "auto" }}
              >
                <Image
                  src={movie.poster || "/placeholder.svg"}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                  {movie.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {movie.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Release Date:</span>
                    <span>{movie.releaseDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Rating:</span>
                    <Badge variant="outline">{movie.censorRating}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {movie.categories.slice(0, 2).map((category) => (
                      <Badge
                        key={category}
                        variant="secondary"
                        className="text-xs"
                      >
                        {category}
                      </Badge>
                    ))}
                    {movie.categories.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{movie.categories.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Link href={`/admin/movies/${movie.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {filteredMovies.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredMovies.length)} of{" "}
            {filteredMovies.length} movies
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
