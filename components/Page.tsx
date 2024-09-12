import React from "react";

interface PageProps {
  handleNext: () => void;
  handlePrev: () => void;
  theIndex: number;
  totalPage: number;
  length: number;
  setPage: (page: number) => void;
}
const Page: React.FC<PageProps> = ({
  handleNext,
  handlePrev,
  theIndex,
  totalPage,
  length,
  setPage,
}) => {
  return (
    <div className="w-[100%] flex justify-center mt-[20px]">
      <button
        className={`w-[80px] ${
          theIndex <= 0 ? "bg-[black] text-white" : "bg-[white] text-black"
        }  py-[10px] rounded-[5px]`}
        onClick={handlePrev}
      >
        Lui
      </button>
      {Array.from({ length: totalPage }).map((_: any, index: number) => {
        return (
          <button
            onClick={() => setPage(index)}
            key={index}
            className={`py-[10px] ml-[10px] rounded-[5px] ${
              theIndex / 8 === index ? "bg-[#08f] text-white" : "bg-[white]"
            } w-[40px]`}
          >
            {index + 1}
          </button>
        );
      })}
      <button
        className={`w-[80px] ${
          theIndex / 8 + 1 >= totalPage
            ? "bg-[black] text-white"
            : "bg-white text-black"
        }   ml-[10px] py-[10px] rounded-[5px]`}
        onClick={handleNext}
      >
        Tiến
      </button>
    </div>
  );
};

export default Page;
