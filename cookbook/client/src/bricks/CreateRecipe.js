import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function CreateRecipe({ isModalShown, onHide }) {
  return (
    <Modal show={isModalShown} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Vytvořit recept</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="recipeName">
            <Form.Label>Jméno receptu</Form.Label>
            <Form.Control type="text" placeholder="Zadejte jméno receptu" />
          </Form.Group>

          <Form.Group controlId="recipePreparation">
            <Form.Label>Příprava receptu</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Zadejte přípravu receptu" />
          </Form.Group>

          <Form.Group controlId="recipeIngredients">
            <Form.Label>Ingredience</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Zadejte ingredience" />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Zavřít
        </Button>
        <Button variant="primary">
          Uložit recept
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateRecipe;
