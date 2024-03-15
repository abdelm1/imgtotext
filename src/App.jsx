import React, { useState, useEffect } from "react";
import Tesseract from "tesseract.js";
import TextWrapper from "./Components/TextWrapper";
import ImageWrapper from "./Components/ImageWrapper";
import axios from "axios";
import Footer from "./Components/Footer";

// create account on imgbb and go to > about section > and get that api key and put it here

const API_KEY = "b8111a5249b240381182a08f94b5ad7b";
function App() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [text, setText] = useState(null);

  const convertImageToText = async () => {
    setLoading(true);
    const result = await Tesseract.recognize(imageUrl, "eng");
    setText(result.data.text);
    setLoading(false);
  };

  const uploadFile = async (e) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${API_KEY}`,
        formData,
        config
      );
      setImageUrl(res.data.data.url);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (imageUrl != null) {
      convertImageToText();
    }
  }, [imageUrl]);
  console.log(`${process.env.REACT_APP_API_KEY}`);
  return (
    <div className="App">
      <h1 class="title">IMAGE TO TEXT</h1>
      <div className="container">
        {loading && <div className="loader"></div>}
        {text == null ? (
          <ImageWrapper loading={loading} uploadFile={uploadFile} />
        ) : (
          <TextWrapper text={text} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
