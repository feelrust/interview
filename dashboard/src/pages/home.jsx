import axios from "axios";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [urlList, setUrlList] = useState([]);

  async function handleAddLink() {
    const { data } = await axios.post("/add", { orginURl: url });
    setUrlList((prev) => [data, ...prev]);
  }

  useEffect(() => {
    axios.get("/").then((response) => {
      const { data } = response;
      setUrlList(data);
    });
  }, []);

  return (
    <div className="mt-16 flex flex-col items-center grow w-full h-screen mx-auto">
      <h1 className="text-center font-bold text-4xl mb-8">Url Management</h1>
      <div className="w-1/2 flex gap-2 mb-24">
        <input
          value={url}
          onChange={(ev) => setUrl(ev.target.value)}
          type="text"
          placeholder={"Add Url"}
        />
        <button
          onClick={handleAddLink}
          className="bg-gray-200 px-4 rounded-2xl"
        >
          Add&nbsp;Link
        </button>
      </div>
      {urlList.length > 0 &&
        urlList.map((item, index) => (
          <div className="w-1/2 grid grid-cols-3 gap-4 text-left">
            <p className="col-span-2 text-left">
              {index + 1}. &nbsp;
              {item.origin}
            </p>
            <p>{item.token}</p>
          </div>
        ))}
    </div>
  );
}
