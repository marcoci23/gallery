import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (fetching) {
      axios
        .get(
          `https://jsonplaceholder.typicode.com/photos?_limit=15&_page=${page}`
        )
        .then((response) => {
          setImages([...images, ...response.data]);
          setPage((prevState) => prevState + 1);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener("scroll", scroll);

    return function () {
      document.removeEventListener("scroll", scroll);
    };
  }, []);

  const scroll = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
    }
  };
  // const fetchData = async () => {
  //   const response = await axios.get(
  //     "https://jsonplaceholder.typicode.com/photos?_limit=14&_page=2"
  //   );

  //   setImages(response.data);
  // };

  // fetchData();

  // const addElements = () => {
  //   this.fetchData();
  //   console.log("added");
  // };

  return (
    <div className="App">
      <h1>Photo Gallery</h1>
      <div className="images">
        {images.map((img, index) => {
          return (
            <div className="image" key={img.id}>
              <img src={img.url}></img>
              <div className="info">
                <h3>Image {index + 1}</h3>
                <p>Title: {img.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
