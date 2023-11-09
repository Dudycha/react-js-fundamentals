import { Modal, Form, Row, Col, Button, Image } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiDelete, mdiLoading } from "@mdi/js";
import styles from "../css/recipe.module.css";
import Card from "react-bootstrap/Card";

const STATE = {
  INACTIVE: 'inactive', PENDING: 'pending', SUCCESS: 'success', ERROR: 'error',
};

function CreateRecipe({ ingredientList, show, recipe, setAddRecipeShow, onComplete }) {


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
    setAddRecipeShow({ state: false });
    setValidated(false);
    setFormData(initialFormData);
  }

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

      if (typeof onComplete === 'function') {
        onComplete(data);
      }

      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered >
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{recipe ? 'Upravit recept' : 'Vytvořit nový recept'}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Název</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) => setField('name', e.target.value)}
              required
              minLength={1}
              maxLength={50}
              placeholder="Zadejte název receptu"
            />
            <Form.Control.Feedback type="invalid">
              Zadejte název receptu s délkou 1-50 znaků.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Popis</Form.Label>
            <Form.Control
              as="textarea"
              value={formData.description}
              onChange={(e) => setField('description', e.target.value)}
              required
              maxLength={9999}
              rows={3}
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

          <Form.Group as={Col} className="mb-3">
            <Form.Label>Přidat Ingredience</Form.Label>
            <Form.Select
              value={""}
              onChange={(e) => setIngredientsField(e.target.value)}
            >
              <option value="" disabled>Vyber ingredienci k přidání</option>
              {ingredientList.map((ingredient) => (
                <option key={ingredient.id} value={ingredient.id}>{ingredient.name}</option>
              ))}
            </Form.Select>
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
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Zrušit
          </Button>
          <Button type="submit" variant="primary"   onClick={handleClose}>
            Uložit recept
          
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}


export default CreateRecipe;
