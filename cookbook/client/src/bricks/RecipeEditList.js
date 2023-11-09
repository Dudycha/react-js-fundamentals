import React, { useState, useEffect } from "react";
import { Modal, Form, Row, Col, Button, Image } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Icon from "@mdi/react";
import { mdiFileEdit } from "@mdi/js";
import DeleteRecipe from "../bricks/DeleteRecipe";
import { mdiDelete, mdiLoading } from "@mdi/js";


const STATE = {
    INACTIVE: 'inactive',
    PENDING: 'pending',
    ERROR: 'error',
    SUCCESS: 'success'
};



function RecipeEditList({ ingredientList,recipe }) {

    const handleCloseModal = () => setShow(false);

    const [isModalShown, setShow] = useState(false);
    const handleShowModal = () => {

        setShow(true);
    };

    function removeSelectedIngredient(ingredient) {
        return setFormData((formData) => {
          const newData = JSON.parse(JSON.stringify(formData));
          const index = newData.ingredients.findIndex((savedIngredient) => savedIngredient.id === ingredient.id);
          if (index > -1) {
            newData.ingredients.splice(index, 1);
          }
          return newData;
        });
      }

    const initialFormData = {
        name: "", description: "", imgUri: "", ingredients: []
    }
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [addRecipeCall, setAddRecipeCall] = useState({
        state: STATE.INACTIVE
    });

    useEffect(() => {
        if (recipe) {
            setFormData({
                name: recipe.name, description: recipe.description, imgUri: recipe.imgUri, ingredients: recipe.ingredients
            })
        }
    }, [recipe]);

    const handleClose = () => {

        setValidated(false);
        setFormData(initialFormData);
    }

    const setSelectedIngredientAmt = (ingredient, amount) => {
        return setFormData((formData) => {
          const newData = JSON.parse(JSON.stringify(formData));
          const foundIngredient = newData.ingredients.find((savedIngredient) => savedIngredient.id === ingredient.id);
          if (foundIngredient) {
            foundIngredient.amount = amount;
          }
          return newData;
        });
      };

    const setField = (name, val) => {
        return setFormData((formData) => {
            const newData = JSON.parse(JSON.stringify(formData));
            newData[name] = val;
            return newData;
        });
    };

    const setIngredientsField = (ingredientId) => {
        return setFormData((formData) => {
            const newData = JSON.parse(JSON.stringify(formData));
            const index = newData.ingredients.findIndex((savedIngredient) => savedIngredient.id === ingredientId);
            if (index <= -1) {
                newData.ingredients.push({ id: ingredientId, amount: 0, unit: "ks" })
            }

            return newData;
        });
    };

    const setSelectedIngredient = (ingredient, unit) => {
        return setFormData((formData) => {
            const newData = JSON.parse(JSON.stringify(formData));
            const foundIngredient = newData.ingredients.find((savedIngredient) => savedIngredient.id === ingredient.id);
            if (foundIngredient) {
                foundIngredient.unit = unit;
            }
            return newData;
        });
    };


    const handleSubmit = async (e) => {
        const form = e.currentTarget;

        e.preventDefault();
        e.stopPropagation();

        const payload = {
            ...formData, id: recipe ? recipe.id : null
        };

        if (!form.checkValidity()) {
            setValidated(true);
            return;
        }

        setAddRecipeCall({ state: STATE.PENDING });
        const res = await fetch(`http://localhost:8000/recipe/${recipe ? 'update' : 'create'}`, {
            method: "POST", headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.status >= 400) {
            setAddRecipeCall({ state: STATE.ERROR, error: data });
        } else {
            setAddRecipeCall({ state: STATE.SUCCESS, data });

            handleClose();
        }
        handleCloseModal();
    };




    return (
        <>
            <Modal show={isModalShown} onHide={handleCloseModal}>
                <Modal.Header closeButton>

                    <DeleteRecipe recipe={recipe} deleteRicipe={(id) => recipe.deleteRicipe(id)}
                        onError={(error) => recipe.onError(error)} />

                    <Modal.Title style={{ textAlign: 'center', width: '100%' }}>
                        Editovat recept: {recipe.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="recipeName">
                            <Form.Label>Název receptu</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.name}
                                onChange={(e) => setField("name", e.target.value)}
                                maxLength={70}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Popis</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={formData.description}
                                onChange={(e) => setField('description', e.target.value)}
                                required
                                maxLength={9999}
                                rows={5}
                                placeholder="Zadejte popis receptu"
                            />
                            <Form.Control.Feedback type="invalid">
                                Zadejte popis s maximální délkou 9999 znaků.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Obrázek</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.imgUri}
                                onChange={(e) => setField('imgUri', e.target.value)}
                                required
                                placeholder="Vložte URL obrázku"
                            />
                            {formData.imgUri && <Image className="img-fluid rounded mx-auto d-block m-3" alt={formData.name} src={formData.imgUri} />}
                            <Form.Control.Feedback type="invalid">
                                Enter image URL.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Label >Ingredience</Form.Label>
          {formData?.ingredients && formData.ingredients.map((ingredient) => (
            <Card className="mb-2" key={ingredient.id}>
              <Card.Body>
                <>
                  <Row key={ingredient.id} className="mb-2">
                    <Col>
                      <span className="fw-bold" style={{ fontSize: '1.5em' }}>{ingredientList.find((savedIngredient) => savedIngredient.id === ingredient.id)?.name}</span>
                    </Col>
                    <Col className="text-end">
                      <Button
                        variant="btn btn-outline-danger"
                        onClick={() => removeSelectedIngredient(ingredient)}
                        style={{ width: '50px' }}
                      >
                        <Icon size={1} style={{ verticalAlign: "top" }} path={mdiDelete} />
                      </Button>
                    </Col>
                  </Row>

                  <Row key={`${ingredient.id}-quantity`} className="mb-3">

                    <Form>
                      <Row className="text-center">
                        <Col>
                          <Form.Group>
                            <Form.Label>Množství</Form.Label>
                            <Form.Control
                              type="number"
                              value={formData.ingredients.find((savedIngredient) => savedIngredient.id === ingredient.id)?.amount}
                              onChange={(e) => setSelectedIngredientAmt(ingredient, parseFloat(e.target.value))}
                              min={0.1}
                              max={9999}
                              step={0.1}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Zadejte množství v rozsahu 0.1 - 9999.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group>
                            <Form.Label>Jednotky</Form.Label>
                            <Form.Select
                              value={formData.ingredients.find((savedIngredient) => savedIngredient.id === ingredient.id)?.unit}
                              onChange={(e) => setSelectedIngredient(ingredient, e.target.value)}
                              required
                            >
                              <option value="ks">ks</option>
                              <option value="g">g</option>
                              <option value="kg">kg</option>
                              <option value="ml">ml</option>
                              <option value="l">l</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Form>
                  </Row>

                </>
              </Card.Body>
            </Card>
          ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={addRecipeCall.state === STATE.PENDING}
                    >
                        {addRecipeCall.state === STATE.PENDING ? 'Ukládání...' : 'Uložit'}
                    </Button>
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
