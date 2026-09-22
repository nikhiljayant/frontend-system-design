import { useEffect, useState } from "react";

import MemeCard from "../components/MemeCard";
import MemeCardShimmer from "../components/MemeCardShimmer";

// --------------------------------------------------------

const Meme = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);

    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  const handleInfiniteScroll = () => {
    // window.scrollY = Till what point the user has scrolled
    // window.innerHeight = Height of the Viewport
    // document.body.scrollHeight = Height of the whole web page
    if (window.scrollY + window.innerHeight === document.body.scrollHeight) {
      handleFetchMemes();
    }
  };

  const handleFetchMemes = async () => {
    setLoading(true);

    const data = await fetch("https://meme-api.com/gimme/20");
    const response = await data.json();

    setLoading(false);
    if (response?.memes && response?.memes?.length > 0) {
      setMemes((prev) => [...prev, ...response?.memes]);
    }
  };

  useEffect(() => {
    handleFetchMemes();
  }, []);

  return (
    <div className="flex flex-wrap justify-evenly p-[30px] gap-[15px]">
      {memes.length > 0 &&
        memes.map((item, idx) => <MemeCard key={idx} item={item} />)}

      {loading && <MemeCardShimmer />}
    </div>
  );
};

export default Meme;
