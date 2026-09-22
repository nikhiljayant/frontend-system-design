import ShimmerUI from "./ShimmerUI";

// ---------------------------------

const MemeCardShimmer = () => {
  return (
    <>
      {Array.from({ length: 10 }, (_, idx) => (
        <div
          key={idx}
          className="flex flex-col gap-[5px] w-[200px] rounded-md p-[10px] border border-slate-300"
        >
          <ShimmerUI css={"w-full h-[150px] rounded-md"} />
          <ShimmerUI css={"w-[50px] h-[15px] rounded-md"} />
          <ShimmerUI css={"w-full h-[15px] rounded-md"} />
          <ShimmerUI css={"w-full h-[15px] rounded-md"} />
        </div>
      ))}
    </>
  );
};

export default MemeCardShimmer;
