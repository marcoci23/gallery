import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import './App.css';

function App() {
  // console.log(document.documentElement.clientHeight)
  // console.log(document.documentElement.getBoundingClientRect().bottom)
  const [images, setImages] = useState(null);
  const fetchData = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=14&_page=1')
    setImages(response.data)
  }
  fetchData()
  // window.addEventListener('scroll', function () {
  //   if (document.documentElement.clientHeight > document.documentElement.getBoundingClientRect().bottom - 100) { }
  // })
  return (
    <div className='App'>
      <h1>Photo Gallery</h1>
      <div>
        {/* <button className="btn" onClick={fetchData}>Click</button> */}
      </div>
      <div className='images' id='img'>
        {
          images && images.map((img, index) => {
            return (
              <div className='image' key={img.id}>
                <img src={img.url}></img>
                <div className='info'>
                  <h3>Image {index + 1}</h3>
                  <p>Title: {img.title}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;