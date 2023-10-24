import React from "react";
import Card from "react-bootstrap/Card";
import Icon from "@mdi/react";
import { mdiFoodForkDrink , mdiBookOpenVariant,mdiCog } from "@mdi/js";
import styles from "../css/cookBook.module.css";

import foodImg from '../assets/burger.PNG';



function Page(props) {
  return (  
    <div className="container">       
    <Card>
    <img src={foodImg} alt = "xzy" className={styles.imgSize} />
      <Card.Header>Featured</Card.Header>
      <Card.Body>
        <div>
          <Icon path={mdiFoodForkDrink } size={2} color="red" />{" "}
          {props.page.name} {props.page.description}
        </div>
        <div>
          <Icon path={mdiBookOpenVariant} size={2} color="green" />{" "}
          {props.page.ingredients}
        </div>
        <div>
          <Icon path={mdiCog } size={2} color="grey" />{" "}
          {props.page.process}
        </div>
      </Card.Body>
    </Card>
    </div>
  );
}

export default Page;
