const AccordianItem = ({ item, isOpen, setIsOpen }) => {
  return (
    <div className="border rounded-md p-[10px]">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={setIsOpen}
      >
        <span className="font-semibold">{item.title}</span>
        <span className="text-[20px]">⌄</span>
      </div>

      <div
        style={{
          maxHeight: isOpen ? "500px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.35s ease",
        }}
      >
        <p style={{ marginTop: "8px" }}>{item.content}</p>
      </div>
    </div>
  );
};

export default AccordianItem;
