import React, { useState, useMemo } from "react";
import PageGridList from "./CookbookGridList";
import PageTableList from "./CookbookTableList";
import ExtendedCookbookList from "./ExtendedCookbookList";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Card from "react-bootstrap/Card";
import Icon from "@mdi/react";
import {
  mdiTable,
  mdiViewGridOutline,
  mdiViewList, 
  mdiMagnify
} from "@mdi/js";

import styles from "../css/cookBook.module.css";

function CookbookList(props) {
  const [viewType, setViewType] = useState("grid");
  const isGrid = viewType === "grid";
  const isTable = viewType === "table";
  const isList = viewType === "list"; 
  const [searchBy, setSearchBy] = useState("");

  const filteredCookbookList = useMemo(() => {
    return props.cookbookList.filter((item) => {
      return item.name.toLowerCase().includes(searchBy.toLowerCase());
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
                    if (currentState === "table") return "list"; 
                    return "grid";
                  })
                }
              >
                <Icon size={1} path={isGrid ? mdiTable : isTable ? mdiViewList : mdiViewGridOutline} />{" "}
                {isGrid ? "Tabulka" : isTable ? "List" : "Grid"} {}
              </Button>
            </Form>
          </div>
        </div>
      </Navbar>
      {isGrid ? (
  <PageGridList cookbookList={filteredCookbookList} />
) : isTable ? (
  <PageTableList cookbookList={filteredCookbookList} />
) : (
  <ExtendedCookbookList cookbookList={filteredCookbookList} /> 
)}
    </div>
  );
}

export default CookbookList;
