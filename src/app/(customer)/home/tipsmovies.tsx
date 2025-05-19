import React from "react";
import Image from "next/image";
import { Clapperboard } from "lucide-react";

const Tipsmovies = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-1/2">
        <Image
          src="/images/infoimg.png"
          alt="Banner image"
          width={600} // required
          height={400} // required
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="w-full md:w-1/2">
        <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className=" mb-4">
              <Clapperboard className="text-[#d96c2c]" />
              <h2 className="text-1xl text-gray-900 mb-2">Get To Know Us</h2>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 ">
                The Best Movie Ticket Distributor
              </h1>
              <p className="text-1xl text-gray-600 max-w-2xl mx-auto">
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed
                eiusmod tempor incididunt labore dolore magna aliquae nim ad
                minim. Sed risus augue, commodo ornare felis non, eleifend
                pharetra eleifend.
              </p>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-2/3">
                <div className="bg-gray-50 p-2 rounded-lg">
                  <h3 className="text-1xl font-bold text-gray-900">
                    Unlimited Awards
                  </h3>
                  <p className="text-gray-600">
                    We've designed a culture that allows our stewards to
                    assimilate.
                  </p>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  <h3 className="text-1xl font-bold text-gray-900 mb-2">
                    Our Directors
                  </h3>
                  <p className="text-gray-600">
                    We've designed a culture that allows our stewards to
                    assimilate.
                  </p>
                </div>
              </div>
              <div className="w-full bg-[#F3F3F3] md:w-1/3 p-8 border-b-[9px] border-[#d96c2c]">
                <p className="text-gray-600">
                  Seeking a Career in a Movie Production
                </p>
              </div>
            </div>
            <div className="pt-4">
              <button className="bg-[#d96c2c] text-white px-8 py-3 rounded-none font-medium hover:bg-gray-800 transition-colors mb-4">
                Discover More
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tipsmovies;
