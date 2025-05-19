import { Metadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

export const siteConfig = {
  name: "Movie Mate",
  url: "https://moviemate.com",
  ogImage: "https://moviemate.com/og.jpg",
  description:
    "Movie Mate is your ultimate movie companion, providing personalized recommendations, reviews, and a community of film enthusiasts.",
  links: {
    twitter: "https://twitter.com/moviemate",
    instagram: "https://www.instagram.com/moviemate",
  },
};

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - Movie Mate` : siteConfig.name,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - Movie Mate` : title,
      description,
      url: "https://moviemate.vercel.app",
      siteName: "Movie Mate",
      images: {
        url: "https://s3.amazonaws.com/moviemate/movie.png",
        width: 1200,
        height: 630,
      },
      locale: "en_US",
      type: "website",
    },
  };
};
