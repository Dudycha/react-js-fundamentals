import React from "react";
import Table from "react-bootstrap/Table";
import {shortenText} from "../helpers/common";

function RecipeTableList(props) {
  return (
      <Table>
        <thead>
        <tr>
          <th>Název receptu</th>
          <th>Popis receptu</th>
        </tr>
        </thead>
        <tbody>
        {props.recipeList.map((recipe) => {
          return (
              <tr key={recipe.id}>
                <td>{recipe.name}</td>
                <td>{shortenText(recipe.description,150)}</td>
              </tr>
          );
        })}
        </tbody>
      </Table>
  );
}

export default RecipeTableList;