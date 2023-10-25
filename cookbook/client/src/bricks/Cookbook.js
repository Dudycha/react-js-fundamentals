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
            <img src={this.props.cookbook.img} alt="Popis obrázku" />
          </div>      
          <div>
            <Icon path={mdiFoodForkDrink } size={2} color="red" />{" "}
            <strong>{this.props.cookbook.name}</strong>
          </div> 
          <div>
            <Icon path={mdiBookOpenVariant} size={1.5} color="blue" />{" "}
            {this.props.cookbook.description}
          </div>
          <div>
            <Icon path={ mdiSemanticWeb } size={1.5} color="grey" />{" "}
            {this.props.cookbook.ingredients}
          </div>
          <div>
            <Icon path={mdiCog } size={1.5} color="black" />{" "}
            {this.props.cookbook.process}
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default Cookbook;
