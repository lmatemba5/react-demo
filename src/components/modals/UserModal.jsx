import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const UserModal = ({user, show, handleSubmit, toggleModal}) => {
    return (
        <Modal size={"md"} show={show} aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header className="py-1 px-3 bg-danger text-white">
                <Modal.Title>{user ? "EDIT USER":"ADD NEW USER"}</Modal.Title>
                <Button className="badge text-white p-2 px-3 border-0" onClick={()=>toggleModal('user')} style={{ background: 'rgba(120, 0,0, .8' }}>X</Button>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={(e)=> handleSubmit(e, 'user')}>
                    <input name='id' defaultValue={user ? user.id: ''} hidden />
                    <div className="form-group">
                        <label htmlFor="name" className="form-label fs-5">Name</label>
                        <div className="col">
                            <input type="text" name="name"  defaultValue={user ? user.name: ''} className="form-control" required autoComplete="name"
                            />
                        </div>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="username" className="form-label fs-5">Username</label>
                        <div className="col">
                            <input type="text" name="username"  defaultValue={user ? user.username: ''} className="form-control" required autoComplete="username"
                            />
                        </div>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="role" className="form-label fs-5">Role</label>
                        <div className="col">
                            <select className="form-select" name="role"  defaultValue={user ? user.role: ''} required>
                                <option value="">--select--</option>
                                <option value="2">Field Officer</option>
                                <option value="3">Financial Officer</option>
                                <option value="1">Administrator</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group mt-3 d-flex justify-content-end align-items-center">
                        <Button variant="primary" type="submit" name="submit" style={{ minWidth: '80px' }}>
                            {user ? "Save Chnages": "ADD" }
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default UserModal
