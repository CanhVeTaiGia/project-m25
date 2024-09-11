"use client";
import { ProductType } from "@/interface/productType";
import { useState } from "react";

interface SliderProps {
  products: ProductType[];
}
const Slider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const images = [
    "https://firebasestorage.googleapis.com/v0/b/m25-project.appspot.com/o/sliders%2Fman-hinh-laptop-4k-uhd-la-gi-2.png?alt=media&token=256c6b6a-2ed2-47f0-8e1b-f97756e64312",
    "https://firebasestorage.googleapis.com/v0/b/m25-project.appspot.com/o/sliders%2F1411_Asus2mn7.png?alt=media&token=5ff15b9a-9ed8-43ef-ba4f-2f9df2b362d0",
    "https://firebasestorage.googleapis.com/v0/b/m25-project.appspot.com/o/sliders%2Fman-hinh-may-tinh-do-phan-giai-4.png?alt=media&token=e378b690-57a8-40b8-81d5-fc207d94bf7f",
  ];

  const back = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1);
    }else if(currentIndex >= 0){
      setCurrentIndex(images.length + currentIndex - 1)
    }
  };

  const next = () => {
    if (currentIndex < images.length) {
      setCurrentIndex(currentIndex + 1);
    } else if (currentIndex <= images.length) {
      setCurrentIndex(images.length - currentIndex + 1);
    }
  };

  return (
    <article className="relative w-full flex flex-shrink-0 overflow-hidden shadow-2xl">
      <div className="rounded-full bg-gray-600 text-white absolute top-5 right-5 text-sm px-2 text-center z-[1]">
        <span>{currentIndex}</span>/<span>{images.length}</span>
      </div>
      {images.map((image, index) => (
        <figure
          key={index}
          className={`h-96 ${currentIndex === index + 1 ? "block" : "hidden"}`}
        >
          <img
            src={image}
            alt="Slide"
            className="absolute inset-0 z-[1] h-full w-full object-cover "
          />
        </figure>
      ))}
      <button
        onClick={back}
        className="absolute left-14 top-1/2 -translate-y-1/2 w-11 h-11 flex justify-center items-center rounded-full shadow-md z-10 bg-gray-100 hover:bg-gray-200"
      >
        <svg
          className="w-8 h-8 font-bold transition duration-500 ease-in-out transform motion-reduce:transform-none text-gray-500 hover:text-gray-600 hover:-translate-x-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-14 top-1/2 -translate-y-1/2 w-11 h-11 flex justify-center items-center rounded-full shadow-md z-[1] bg-gray-100 hover:bg-gray-200"
      >
        <svg
          className="w-8 h-8 font-bold transition duration-500 ease-in-out transform motion-reduce:transform-none text-gray-500 hover:text-gray-600 hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </article>
  );
};

export default Slider;
