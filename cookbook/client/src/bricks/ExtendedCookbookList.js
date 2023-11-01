import React from "react";

function ExtendedCookbookList(props) {
  return (
    <div>
      {props.cookbookList.map((cookbook) => (
        <div key={cookbook.id}>
          <img src={cookbook.imgUri}  />
          <p>{cookbook.name}</p>
          <p>{cookbook.description.substring(0, 50)}...</p> 
        </div>
      ))}
    </div>
  );
}

export default ExtendedCookbookList;