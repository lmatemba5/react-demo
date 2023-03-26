import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const ClientModal = ({client, show, handleSubmit, toggleModal}) => {
    return (
        <Modal size={"md"} show={show} aria-labelledby="contained-modal-title-vcenter"
            centered scrollable>
            <Modal.Header className="py-1 px-3 bg-danger text-white">
                <Modal.Title>{client ? "EDIT CLIENT" : "ADD CLIENT"}</Modal.Title>
                <Button className="badge text-white p-2 px-3 border-0 shadow-sm" onClick = {()=>toggleModal('client')} style={{ background: 'rgba(120, 0,0, .8' }}>X</Button>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={(e)=>handleSubmit(e, 'client')}>
                    <div className="modal-body">
                        <input name='id' hidden defaultValue={client ? client.id: ""}/>
                        <div className='row'>
                            <div className="col-md-6 mb-2">
                                <div className='form-group'>
                                    <label htmlFor="name" className="mb-0 form-label">Name</label>
                                    <input type="text" className="form-control" name="name" required autoComplete="name" 
                                    defaultValue={client ? client.name: ""}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className='form-group'>
                                    <label htmlFor="zone" className="mb-0 form-label">Zone</label>
                                    <select className="form-select" name="zone" defaultValue={client ? client.zone: ""} required >
                                        <option value="" >--select--</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                        <option value="E">E</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6 mb-2'>
                                <div className="form-group">
                                    <label htmlFor="category" className="mb-0 form-label">Category</label>
                                    <select className="col form-select" name="category" defaultValue={client ? client.category: ""}required>
                                        <option value="" >--select--</option>
                                        <option value="1">Individual</option>
                                        <option value="2">Corporate</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-md-6 mb-2'>
                                <div className="form-group">
                                    <label htmlFor="subscription" className="mb-0 form-label">Subscription</label>
                                    <input type="number" defaultValue={client ? client.subscription: null} required className="col form-control" name="subscription" autoComplete="off" />
                                </div>
                            </div>
                        </div>

                        <div className="row mt-2 d-flex align-items-center">
                            <label htmlFor="phone" className="col-md-2 form-label">Phone</label>
                            <div className='col-md-10'>
                                <input type="text" defaultValue={client ? client.phone: ""} required className="form-control" name="phone" autoComplete="phone" />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className='col d-flex align-items-center justify-content-end'>
                                <button type="submit" className="btn btn-sm btn-primary" data-bs-dismiss="modal">
                                    { client ? "Save Changes" : "ADD"}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default ClientModal
