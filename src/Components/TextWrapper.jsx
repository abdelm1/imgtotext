import React from "react";

const TextWrapper = (props) => {
  return (
    <>
      <textarea className="text-wrapper">{props.text}</textarea>
    </>
  );
};

export default TextWrapper;
