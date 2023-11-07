import React from "react";
import Table from "react-bootstrap/Table";
import {shortenText} from "../helpers/common";
import RecipeEditList from "../bricks/RecipeEditList";

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
               
               <td style={{ fontWeight: 'bold' }}>{shortenText(recipe.name,45)}</td>
                <td>{shortenText(recipe.description,190)}</td>
                <td><RecipeEditList recipe={recipe} /></td>
              </tr>
          );
        })}
       
        </tbody>
       
      </Table>
  );
}

export default RecipeTableList;