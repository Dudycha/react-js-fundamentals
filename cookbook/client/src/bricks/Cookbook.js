import React from "react";
import Card from "react-bootstrap/Card";
import Icon from "@mdi/react";
import { mdiFoodForkDrink , mdiIdentifier,mdiBookOpenVariant,mdiSemanticWeb ,mdiCog   } from "@mdi/js";
import burgerImg from '../assets/burger.PNG';


class Cookbook extends React.Component {
  render() {
    return (
      <Card>
        <Card.Body> 
     
          <div>
            <Icon path={mdiFoodForkDrink } size={2} color="red" />{" "}
            <strong>{this.props.cookbook.name}</strong>
          </div> 

        </Card.Body>
      </Card>
    );
  }
}

export default Cookbook;
