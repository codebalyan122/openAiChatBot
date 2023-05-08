import React from "react";

const Images = ({ image, name }) => {
  return <img className="w-12" src={image} alt={name} />;
};

export default Images;
