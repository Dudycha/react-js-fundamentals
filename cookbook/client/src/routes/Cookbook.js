
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from "react";
import Icon from "@mdi/react";
import {mdiLoading} from "@mdi/js";
import {Alert} from "react-bootstrap";
import CookbookList from "../bricks/CookbookList";
import styles from "../css/recipe.module.css";

const StateType = {
  PENDING: 'pending', 
  SUCCESS: 'success', 
  ERROR: 'error',
};

function Cookbook() {

  const [recipeListCall, setRecipeListCall] = useState({
    state: StateType.PENDING,
  });
  const [ingredientListCall, setIngredientListCall] = useState({
    state: StateType.PENDING,
  });
 

  useEffect(() => {
    fetch(`http://localhost:8000/recipe/list`, {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setRecipeListCall({state: StateType.ERROR, error: responseJson});
      } else {
        setRecipeListCall({state: StateType.SUCCESS, data: responseJson});
      }
    }).catch((exception) => setIngredientListCall({state: StateType.ERROR, error: exception}));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/ingredient/list`, {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setIngredientListCall({state: StateType.ERROR, error: responseJson});
      } else {
        setIngredientListCall({state: StateType.SUCCESS, data: responseJson});
      }
    }).catch((exception) => setIngredientListCall({state: StateType.ERROR, error: exception}));
  }, []);

  function getChild() {

    

    if (ingredientListCall.state === StateType.PENDING || recipeListCall.state === StateType.PENDING) {
      return (
        <div className={styles.loading}>
          <Icon size={2} path={mdiLoading} spin={true} />
        </div>
      );
    } else if (ingredientListCall.state === StateType.ERROR || recipeListCall.state === StateType.ERROR) {
      return (
        <div className={styles.error}>
           <div>Nepodařilo se načíst data o třídě.</div>
          <div>Ingredients: {ingredientListCall.state}</div>
          <div>Recepies: {recipeListCall.state}</div>
         
          <pre>{JSON.stringify(ingredientListCall.error, null, 2)}</pre>
        </div>
      );
    } else if (ingredientListCall.state === StateType.SUCCESS || recipeListCall.state === StateType.SUCCESS) {
      return (
        <>
       
             <CookbookList recipeList={recipeListCall.data} ingredientList = {ingredientListCall.data}/>

         
        </>
      );
    } else {
      return null;
    }


  }

  return <div className="App">{getChild()}</div>;
}

export default Cookbook;