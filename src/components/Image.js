import React from "react";

const Image = ({ id, url, title, setShowLocation }) => (
  <li onClick={() => setShowLocation(id)}>
    <img src={url} alt={title} />
  </li>
);

export default Image;
