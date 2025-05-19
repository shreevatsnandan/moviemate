import BannerCarousel from "@/app/(customer)/home/banner";
import TrailerCarousel from "@/app/(customer)/home/trailer";
import Tipsmovies from "@/app/(customer)/home/tipsmovies";

export default function Home() {
  return (
    <>
      <BannerCarousel />
      <TrailerCarousel />
      <Tipsmovies />
    </>
  );
}
