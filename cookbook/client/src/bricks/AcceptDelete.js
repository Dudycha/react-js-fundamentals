import { Popover, OverlayTrigger, Button } from 'react-bootstrap';

export default function AcceptDelete({ onConfirm, children }) {
    const handleConfirm = () => {
        if (typeof onConfirm === "function") {
            onConfirm();
        }
    }



    const closePopup = () => document.body.click();


    const popover = (
        <Popover id="popover-basic">
            <Popover.Header className="text-center" as="h3">{"Smazat?"}</Popover.Header>
            <Popover.Body className="text-center" style={{ width: '200px' }}>
                Opravdu smazat?
                <div className='d-flex flex-column gap-2 mt-3 w-100'>
                    <Button onClick={handleConfirm} variant='warning'>Smazat</Button>
                    <Button variant='light' onClick={closePopup}> Cancel</Button>
                </div>
            </Popover.Body>
        </Popover>
    );


    return (
        <>
            <OverlayTrigger
                overlay={popover}
                trigger="click"
                placement="right"
                rootClose
            >
                {children}
            </OverlayTrigger>
        </>
    );
}
