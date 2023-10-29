import React, {useState, useMemo} from "react";
import RecipeGridList from "./RecipeGridList";
import RecipeTableList from "./RecipeTableList";
import styles from "../css/recipe.module.css";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Icon from "@mdi/react";
import {mdiTable, mdiViewGridOutline, mdiMagnify} from "@mdi/js";

const DisplayType = {
  BIG_GRID: 'big_grid',
  SMALL_GRID: 'small_grid',
  TABLE: 'table',
};

function CookbookList(props) {
  const [viewType, setViewType] = useState(DisplayType.BIG_GRID);
  const [searchBy, setSearchBy] = useState("");

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
        return <RecipeGridList recipeList={filteredCookbookList} ingredientList={props.ingredientList} isBigCard={true}/>;
      case DisplayType.SMALL_GRID:
        return <RecipeGridList recipeList={filteredCookbookList} ingredientList={props.ingredientList} isBigCard={false}/>;
      case DisplayType.TABLE:
        return <RecipeTableList recipeList={filteredCookbookList}/>;
      default:
        return <RecipeGridList recipeList={filteredCookbookList} isBigCard={true}/>;
    }
  }


  return (
      <div>
        <Navbar bg="light">
          <div className="container-fluid">
            <Navbar.Brand>Seznam receptů</Navbar.Brand>
            <div>
              <Form className="d-flex" onSubmit={handleSearch}>
                <Form.Control
                    id={"searchInput"}
                    style={{maxWidth: "150px"}}
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={handleSearchDelete}
                />
                <Button
                    style={{marginRight: "8px"}}
                    variant="outline-success"
                    type="submit"
                >
                  <Icon size={1} path={mdiMagnify}/>
                </Button>
                <Button
                    variant="outline-primary"
                    onClick={() =>
                        setViewType((currentState) => {
                          switch (viewType) {
                            case DisplayType.BIG_GRID:
                              return DisplayType.SMALL_GRID;
                            case DisplayType.SMALL_GRID:
                              return DisplayType.TABLE;
                            case DisplayType.TABLE:
                              return DisplayType.BIG_GRID;
                            default:
                              return DisplayType.BIG_GRID;
                          }
                        })
                    }
                >
                  <Icon size={1} path={mdiTable}/>{" "}
                  {"View Type"}
                </Button>
              </Form>
            </div>
          </div>
        </Navbar>
        <div className={styles.recipeList}>
          {switchView(viewType)}
        </div>
      </div>
  );
}

export default CookbookList;