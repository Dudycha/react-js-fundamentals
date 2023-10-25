import React , { useState, useMemo } from "react";
import PageGridList from "./CookbookGridList";
import PageTableList from "./CookbookTableList";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Card from "react-bootstrap/Card";
import Icon from "@mdi/react";
import { mdiTable, mdiViewGridOutline , mdiMagnify} from "@mdi/js";

import styles from "../css/cookBook.module.css";

import foodImg from '../assets/burger.PNG';


 
function CookbookList(props) {
  const [viewType, setViewType] = useState("grid");
  const isGrid = viewType === "grid";
  const [searchBy, setSearchBy] = useState("");

  const filteredCookbookList = useMemo(() => {
    return props.cookbookList.filter((item) => {
      return (
        item.name
          .toLocaleLowerCase()
          .includes(searchBy.toLocaleLowerCase()) 
      );
    });
  }, [searchBy]);

  function handleSearch(event) {
    event.preventDefault();
    setSearchBy(event.target["searchInput"].value);
  }

  function handleSearchDelete(event) {
    if (!event.target.value) setSearchBy("");
  }

  return (
    <div>
      <Navbar bg="light">
        <div className="container-fluid">
          <Navbar.Brand>Seznam studentů</Navbar.Brand>
          <div>
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                id={"searchInput"}
                style={{ maxWidth: "150px" }}
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
                    if (currentState === "grid") return "table";
                    else return "grid";
                  })
                }
              >
                 <Icon size={1} path={isGrid ? mdiTable : mdiViewGridOutline} />{" "}
                {isGrid ? "Tabulka" : "Grid"}
              </Button>
            </Form>
          </div>
        </div>
      </Navbar>
      {isGrid ? (
        <PageGridList cookbookList={filteredCookbookList} />
      ) : (
        <PageTableList cookbookList={filteredCookbookList} />
      )}
    </div>
  );
}

export default CookbookList;
