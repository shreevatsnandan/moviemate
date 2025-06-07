"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import PageHeader from "@/app/admin/page-header";

const MovieForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

const pageHeader = {
  breadcrumb: [
    {
      name: "Dashboard",
      href: "/admin",
    },
    {
      name: "Movies",
      href: "/admin/movies/all",
    },
    {
      name: "Add Movies",
    },
  ],
};


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    genre: [] as string[],
    language: "",
    releaseDate: "",
    posterUrl: "",
    trailerUrl: [] as string[],
    rating: "PG-13",
    addedBy: "1"
  });

  const genreOptions = [
    "Action",
    "Comedy",
    "Drama",
    "Horror",
    "Sci-Fi",
    "Thriller",
    "Romance",
    "Fantasy",
    "Animation",
    "Documentary",
  ];

  const ratingOptions = ["G", "PG", "PG-13", "R", "NC-17"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      if (checked) {
        return { ...prev, genre: [...prev.genre, value] };
      } else {
        return { ...prev, genre: prev.genre.filter((g) => g !== value) };
      }
    });
  };

  const handleTrailerUrlChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    setFormData((prev) => {
      const newTrailerUrls = [...prev.trailerUrl];
      newTrailerUrls[index] = value;
      return { ...prev, trailerUrl: newTrailerUrls };
    });
  };

  const addTrailerUrlField = () => {
    setFormData((prev) => ({
      ...prev,
      trailerUrl: [...prev.trailerUrl, ""],
    }));
  };

  const removeTrailerUrlField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      trailerUrl: prev.trailerUrl.filter((_, i) => i !== index),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) return null;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/aws_upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      const data = await response.json();
      return data.fileUrl;
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload file");
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

      try 
      {
        let posterUrl = formData.posterUrl;
        if (selectedFile) {
          const uploadedUrl = await uploadFile();
          if (uploadedUrl) {
            posterUrl = uploadedUrl;
          }
        }

        const movieData = {
          ...formData,
          duration: parseInt(formData.duration),
          releaseDate: new Date(formData.releaseDate),
          posterUrl: posterUrl,
          trailerUrl: formData.trailerUrl.filter(url => url.trim() !== ""),
        };

        const response = await fetch("/api/moviesdb", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(movieData),
        }); 
        if (!response.ok) {
          throw new Error("Failed to create movie");
        }

        const result = await response.json();
        toast.success("Movie added successfully!");
        router.push("/movies"); 
        router.refresh(); 
      } 
      catch (error) 
      {
        console.error("Error:", error);
        toast.error("Failed to add movie");
      } 
      finally 
      {
        setIsLoading(false);
      }
  };

  return (
    <>
    <PageHeader breadcrumbs={pageHeader.breadcrumb}></PageHeader>
    <div className="max-w-full p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add New Movie</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title*
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description*
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
        </div>

        {/* Duration */}
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Duration (minutes)*
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
        </div>

        {/* Genre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Genre*</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {genreOptions.map((option) => (
              <div key={option} className="flex items-center">
                <input
                  type="checkbox"
                  id={`genre-${option}`}
                  value={option}
                  checked={formData.genre.includes(option)}
                  onChange={handleGenreChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor={`genre-${option}`} className="ml-2 text-sm text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Language */}
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">
            Language*
          </label>
          <input
            type="text"
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
        </div>

        {/* Release Date */}
        <div>
          <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700">
            Release Date*
          </label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
        </div>

        {/* Poster Image */}
        <div>
          <label htmlFor="poster" className="block text-sm font-medium text-gray-700">
            Poster Image*
          </label>
          <div className="flex gap-4">
            <input
              type="file"
              id="poster"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            />
            {!selectedFile && (
              <input
                type="text"
                name="posterUrl"
                value={formData.posterUrl}
                onChange={handleChange}
                placeholder="Or enter image URL"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              />
            )}
          </div>
          {selectedFile && (
            <p className="mt-2 text-sm text-gray-500">Selected file: {selectedFile.name}</p>
          )}
        </div>

        {/* Trailer URLs */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Trailer URLs</label>
          {formData.trailerUrl.map((url, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="url"
                value={url}
                onChange={(e) => handleTrailerUrlChange(e, index)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              />
              <button
                type="button"
                onClick={() => removeTrailerUrlField(index)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addTrailerUrlField}
            className="mt-2 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            + Add Trailer URL
          </button>
        </div>

        {/* Rating */}
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          >
            {ratingOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Adding..." : "Add Movie"}
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default MovieForm;