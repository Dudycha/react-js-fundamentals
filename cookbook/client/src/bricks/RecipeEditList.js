import React, { useState, useEffect } from "react";
import { Modal, Form } from 'react-bootstrap';
import Icon from "@mdi/react";
import { mdiFileEdit } from "@mdi/js";

function RecipeEditList(props) {
    const [isModalShown, setShow] = useState(false);
    const [recipeDescription, setRecipeDescription] = useState('');

    const handleShowModal = () => {
        setRecipeDescription(props.recipe.description);
        setShow(true);
    };
    const handleCloseModal = () => setShow(false);

    const [recipeListCall, setRecipeListCall] = useState({ state: "pending" });

    useEffect(() => {
        if (isModalShown) fetchData();
    }, [isModalShown]);



  

    const fetchData = async () => {
        setRecipeListCall({ state: "pending" });

        const res = await fetch(`http://localhost:8000/recipe/list?recipeId=${props.recipe.id}`);
        const data = await res.json();
        
        if (res.status >= 400) {
            setRecipeListCall({ state: "error", error: data });
        } else {
            setRecipeListCall({ state: "success", data });
        }
    };

    const handleDescriptionChange = (event) => {
        setRecipeDescription(event.target.value);
    };

    return (
        <>
            <Modal show={isModalShown} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ textAlign: 'center', width: '100%' }}>
                        Editovat recept: {props.recipe.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="recipeName">
                            <Form.Label>Název receptu</Form.Label>
                            <Form.Control type="text" placeholder="Enter recipe name" defaultValue={props.recipe.name} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="recipeDescription">
                     <Form.Label>Popis</Form.Label>
                <Form.Control as="textarea" rows={5} value={recipeDescription} onChange={handleDescriptionChange} />
                </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {"..."}
                </Modal.Footer>
            </Modal>

            <Icon
                path={mdiFileEdit}
                style={{ color: "grey", cursor: "pointer" }}
                size={1}
                onClick={handleShowModal}
            />
        </>
    )
}

export default RecipeEditList;
