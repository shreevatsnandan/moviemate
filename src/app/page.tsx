import Navbar from "../components/Navbar";
import BannerCarousel from "@/components/Banner";
import TrailerCarousel from "@/components/Trailer";
import Tipsmovies from "@/components/Tipsmovies";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />

        <BannerCarousel />
        <TrailerCarousel/>
        <Tipsmovies/>
    </>
  );
}
