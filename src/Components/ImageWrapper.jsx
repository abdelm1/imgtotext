import React from "react";

const ImageWrapper = ({ uploadFile, loading }) => {
  return (
    <div className="image-wrapper">
      {loading ? (
        <img class="loading" src="https://discuss.wxpython.org/uploads/default/original/2X/6/6d0ec30d8b8f77ab999f765edd8866e8a97d59a3.gif"/>
      ) : (
        <form>
          <input
            type="file"
            class="custom-file-input"
            name="image"
            onChange={(e) => uploadFile(e)}
          />
        </form>
      )}
    </div>
  );
};

export default ImageWrapper;
