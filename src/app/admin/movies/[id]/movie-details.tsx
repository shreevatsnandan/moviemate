"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  User,
  Users,
  Globe,
  Shield,
} from "lucide-react";
import Image from "next/image";

// Mock data - in a real app, this would come from an API
const movies = [
  {
    id: "1",
    title: "Spider Man: Ho Way Nome",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O. But his tragic past may doom the project and his team to disaster.",
    releaseDate: "2010-07-16",
    categories: ["Sci-Fi", "Action", "Thriller"],
    languages: ["English", "Japanese"],
    censorRating: "PG-13",
    director: "Christopher Nolan",
    cast: [
      { name: "Leonardo DiCaprio", role: "Dom Cobb" },
      { name: "Marion Cotillard", role: "Mal" },
      { name: "Tom Hardy", role: "Eames" },
      { name: "Elliot Page", role: "Ariadne" },
      { name: "Ken Watanabe", role: "Saito" },
      { name: "Dileep Rao", role: "Yusuf" },
    ],
    poster: "/images/banner2.jpg",
    duration: "148 minutes",
    budget: "$160 million",
    boxOffice: "$836.8 million",
  },
];

export function MovieDetails({ movieId }: { movieId: string }) {
  const router = useRouter();
  // Find the movie by ID
  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Movie Not Found</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/movies/all")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl md:text-2xl font-bold">{movie.title}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Movie Poster */}
        <div className="lg:col-span-1 sticky top-20 self-start">
          <Card className="p-0">
            <CardContent className="p-0">
              <div className="aspect-[2/3] relative">
                <Image
                  src={movie.poster || "/placeholder.svg"}
                  alt={movie.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Movie Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Movie Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {movie.description}
                </p>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Release Date:</span>
                  <span className="text-sm">{movie.releaseDate}</span>
                </div>

                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Director:</span>
                  <span className="text-sm">{movie.director}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Rating:</span>
                  <Badge variant="outline">{movie.censorRating}</Badge>
                </div>

                {movie.duration && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Duration:</span>
                    <span className="text-sm">{movie.duration}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Categories and Languages */}
          <Card>
            <CardHeader>
              <CardTitle>Categories & Languages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {movie.categories.map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Languages
                </h4>
                <div className="flex flex-wrap gap-2">
                  {movie.languages.map((language) => (
                    <Badge key={language} variant="outline">
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cast */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Cast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {movie.cast.map((actor, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{actor.name}</p>
                      {actor.role && (
                        <p className="text-sm text-muted-foreground">
                          {actor.role}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          {(movie.budget || movie.boxOffice) && (
            <Card>
              <CardHeader>
                <CardTitle>Box Office</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {movie.budget && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Budget
                      </p>
                      <p className="text-lg font-semibold">{movie.budget}</p>
                    </div>
                  )}
                  {movie.boxOffice && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Box Office
                      </p>
                      <p className="text-lg font-semibold">{movie.boxOffice}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
