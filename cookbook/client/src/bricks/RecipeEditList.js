import Icon from "@mdi/react";
import { Modal } from 'react-bootstrap';
import { mdiFileEdit } from "@mdi/js";
import { useState } from 'react'

function RecipeEditList() {
    const [isModalShown, setShow] = useState(false);

    const handleShowModal = () => setShow(true);
    const handleCloseModal = () => setShow(false);

    return (
        <>

            <Modal show={isModalShown} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                <Modal.Title style={{ textAlign: 'center', width: '100%' }}>
                   Editace
                 </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>

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