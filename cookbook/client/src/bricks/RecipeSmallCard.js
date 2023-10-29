import React from "react";
import Card from "react-bootstrap/Card";
import Icon from "@mdi/react";
import {mdiFoodForkDrink , mdiCog} from "@mdi/js";
import styles from "../css/recipe.module.css";
import {shortenText} from "../helpers/common";

class RecipeSmallCard extends React.Component {

  render() {


    return (
        <div className={styles.recipeSmall}>
          <Card className={styles.recipeSmallCard}>
            <Card.Body className={styles.recipeSmallBody}>
              <div>
                <h2 className={styles.recipeSmallname}>
                  <Icon path={mdiFoodForkDrink} size={2} color="red"/>{" "}
                  {this.props.recipe.name}
                </h2>
                <img alt={this.props.recipe.name} src={this.props.recipe.imgUri} className={styles.recipeSmallImg}/>

                <div className={styles.recipeDesc}>
                  <div className={styles.recipeSmallDescIcon}>
                    <Icon path={mdiCog} size={1.5} color="grey"/>{" "}
                  </div>

                  <div className={styles.recipeSmallDescTxt}>
                    {shortenText(this.props.recipe.description, 50)}
                    <ul className={styles.ingredientsList}>
                      {this.props.recipe.ingredients.slice(0, 4).map((ingredient) =>{
                            const foundIngredient = this.props.ingredientList.find((ingredientInList)=>ingredientInList.id === ingredient.id);
                            return <li key={foundIngredient.id}>{foundIngredient.name}</li>;
                          }
                      )}
                      {this.props.recipe.ingredients.length > 4 && <li>...</li>}
                    </ul>
                  </div>

                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
    );
  }
}

export default RecipeSmallCard;