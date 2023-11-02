import React, { useState, useMemo } from "react";
import RecipeGridList from "./RecipeGridList";
import RecipeTableList from "./RecipeTableList";
import CreateRecipe from "./CreateRecipe";
import styles from "../css/recipe.module.css";
import RecipeEditList from "../bricks/RecipeEditList";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Icon from "@mdi/react";
import { mdiTable, mdiViewGridOutline, mdiMagnify, mdiPlus, mdiGridLarge, mdiGrid } from "@mdi/js";

const DisplayType = {
  BIG_GRID: 'big_grid',
  SMALL_GRID: 'small_grid',
  TABLE: 'table',
};

function CookbookList(props) {
  const [viewType, setViewType] = useState(DisplayType.BIG_GRID);
  const [searchBy, setSearchBy] = useState("");
  
  const [isModalShown, setIsModalShown] = useState(false);

  const handleShowModal = () => setIsModalShown(true);
  const handleCloseModal = () => setIsModalShown(false);


  const filteredCookbookList = useMemo(() => {
    return props.recipeList.filter((item) => {
      return (
        item.name
          .toLocaleLowerCase()
          .includes(searchBy.toLocaleLowerCase()) ||
        item.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
      );
    });
  }, [props.recipeList, searchBy]);

  function handleSearch(event) {
    event.preventDefault();
    setSearchBy(event.target["searchInput"].value);
  }

  function handleSearchDelete(event) {
    if (!event.target.value) setSearchBy("");
  }

  function switchView(viewType) {
    switch (viewType) {
      case DisplayType.BIG_GRID:
        return <RecipeGridList recipeList={filteredCookbookList} ingredientList={props.ingredientList} isBigCard={true} />;
      case DisplayType.SMALL_GRID:
        return <RecipeGridList recipeList={filteredCookbookList} ingredientList={props.ingredientList} isBigCard={false} />;
      case DisplayType.TABLE:
        return <RecipeTableList recipeList={filteredCookbookList} />;
      default:
        return <RecipeGridList recipeList={filteredCookbookList} isBigCard={true} />;
    }
  }


  return (

    <div style={{ paddingTop: "60px" }}>
      <Navbar bg="light">
        <div className="container-fluid">
          <Navbar bg="light">
            <div className="nvBar">

              <Navbar.Brand>Seznam receptů</Navbar.Brand>

              {/* ... zbytek kódu */}
            </div>
          </Navbar>

          <div>
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                id={"searchInput"}
                style={{ maxWidth: "350px" }}
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleSearchDelete}
              />
              <Button
                style={{ marginRight: "8px" }}
                variant="outline-success"
                type="submit"

              >
                <Icon size={1} path={mdiMagnify} />
              </Button>

              <Button
                variant="outline-primary"
                onClick={() =>
                  setViewType((currentState) => {
                    return DisplayType.BIG_GRID;
                  })
                }
              >
                <Icon size={1} path={mdiGridLarge} />{" "}
              </Button>

              <Button
                variant="outline-primary"
                onClick={() =>
                  setViewType((currentState) => {
                    return DisplayType.SMALL_GRID;
                  })
                }
              >
                <Icon size={1} path={mdiGrid} />{" "}

              </Button>

              <Button
                variant="outline-primary"

                onClick={() =>
                  setViewType((currentState) => {
                    return DisplayType.TABLE;
                  })
                }
              >
                <Icon size={1} path={mdiTable} />{" "}

              </Button>


            </Form>
          </div>
        </div>

        <Button
  style={{ marginRight: "8px", width: "170px" }}
  variant="success"
  type="button"
  onClick={handleShowModal}
>
  <Icon size={1} path={mdiPlus} />
  {"Vytvořit recept"}
</Button>
<CreateRecipe isModalShown={isModalShown} onHide={handleCloseModal} />
      </Navbar>
      <div className={styles.recipeList}>
        {switchView(viewType)}
      </div>
    </div>
  );
}

export default CookbookList;