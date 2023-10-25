import React from "react";
import Card from "react-bootstrap/Card";
import Icon from "@mdi/react";
import { mdiAccountSchoolOutline, mdiIdentifier } from "@mdi/js";

class Cookbook extends React.Component {
  render() {
    return (
      <Card>
        <Card.Body>
          <div>
            <Icon path={mdiAccountSchoolOutline} size={1} color="grey" />{" "}
            {this.props.cookbook.name} 
          </div> 
        </Card.Body>
      </Card>
    );
  }
}

export default Cookbook;
