import { UserType } from "@/interface/userType";
import React from "react";

interface AdminFooterProps {
  handleNext: () => void | null;
  handlePrev: () => void | null;
  totalPage: number;
  currentIndex: {
    first: number;
    last: number;
  };
  userLength: number;
  handleSetPage: (page: number) => void;
}
export const AdminFooter: React.FC<AdminFooterProps> = ({
  handleNext,
  handlePrev,
  totalPage,
  currentIndex,
  userLength,
  handleSetPage,
}) => {
  return (
    <footer className="w-[100%] text-black flex justify-center gap-[10px]">
      <button
        onClick={handlePrev}
        className={`py-[5px] ${
          currentIndex.first <= 0
            ? "bg-[#000000] cursor-default text-white"
            : "bg-[#fff]"
        } rounded-[5px] px-[10px] `}
      >
        Prev
      </button>
      {Array.from({ length: totalPage }).map((_, index: number) => {
        return index === currentIndex.first / 6 ? (
          <button
            className="p-[5px] w-[30px] rounded-[5px] text-white bg-[#08f]"
            key={index}
          >
            {index + 1}
          </button>
        ) : (
          <button
            onClick={() => handleSetPage(index)}
            className="p-[5px] w-[30px] rounded-[5px]  bg-[#fff]"
            key={index}
          >
            {index + 1}
          </button>
        );
      })}
      <button
        onClick={handleNext}
        className={`py-[5px] ${
          currentIndex.last >= userLength - 1
            ? "bg-[#000] text-white cursor-default"
            : "bg-[#fff]"
        } rounded-[5px] px-[10px] bg-[#08f]`}
      >
        Next
      </button>
    </footer>
  );
};
