import React from "react";
import Card from "react-bootstrap/Card";
import Icon from "@mdi/react";
import { mdiFoodForkDrink, mdiCog } from "@mdi/js";
import styles from "../css/recipe.module.css";
import { mdiFileEdit } from "@mdi/js";
import Button from "react-bootstrap/Button";
import DeleteRecipe from "../bricks/DeleteRecipe";

import RecipeEditList from "../bricks/RecipeEditList";

class RecipeBigCard extends React.Component {
  render() {
    return (
      <div className={styles.recipeBig}>
        <Card className={styles.recipeBigCard}>
          <Card.Body className={styles.recipeBigBody}>
            <img alt={this.props.recipe.name} src={this.props.recipe.imgUri} className={styles.recipeBigImg} />
            <div className={styles.recipeContent}>
              <h2 className={styles.recipeBigName}>

                <Icon path={mdiFoodForkDrink} size={2} color="red" />{" "}
                {this.props.recipe.name}

                <RecipeEditList ingredientList={this.props.ingredientList} recipe={this.props.recipe} />
              </h2>


              <div className={styles.recipeDesc}>

                <div className={styles.recipeBigDescIcon}>



                </div>
                <div className={styles.recipeBigDescText}>
                  {this.props.recipe.description}
                </div>
              </div>

            </div>

          </Card.Body>

        </Card>
      </div>
    );
  }
}

export default RecipeBigCard;