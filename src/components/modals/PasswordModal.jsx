import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const PasswordModal = ({ show , handleSubmit, toggleModal}) => {
    const [type, setType] = useState('password')

    const changeType = () => {
        if (type.startsWith('text')) {
            setType('password')
        } else {
            setType('text')
        }
    }
    return (
        <Modal size={"sm"} show={show} aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header className="py-1 px-2 bg-danger text-white">
                <Modal.Title className="fs-5">Change Password</Modal.Title>
                <Button className="badge text-white p-2 px-3 border-0" onClick={()=>toggleModal('password')} style={{ background: 'rgba(120, 0,0, .8' }}>X</Button>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={(e)=> handleSubmit(e, 'password')}>
                    <div className="form-group mt-2">
                        <label htmlFor="npwd" className="mb-0 form-label">New Password</label>
                        <div className="col">
                            <input type={type} name="npwd" className="form-control" required
                            />
                        </div>
                    </div>

                    <div className="form-group mt-2">
                        <label htmlFor="cnpwd" className="mb-0 form-label">Confirm New password</label>
                        <div className="col">
                            <input type={type} name="cnpwd" className="form-control" required
                            />
                        </div>
                    </div>

                    <div className="form-group mt-3 d-flex justify-content-between align-items-center">
                        <Button className="btn-sm" variant="secondary" onClick={changeType}>
                            {type.startsWith('text') ? "Hide": "Show"}
                        </Button>
                        <Button className="btn-sm" variant="primary" type="submit" name="submit">
                            Apply
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default PasswordModal