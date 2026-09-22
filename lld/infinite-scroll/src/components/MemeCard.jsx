const MemeCard = ({ item }) => {
  return (
    <div className=" flex flex-col gap-[5px] w-[200px] rounded-md p-[10px] border border-slate-400">
      <img
        alt="Meme"
        src={item?.url}
        className="w-full h-[150px] object-cover"
      />
      <p className="text-[14px] font-semibold">{item?.author}</p>
      <p className="text-[13px]">{item?.title}</p>
    </div>
  );
};

export default MemeCard;
