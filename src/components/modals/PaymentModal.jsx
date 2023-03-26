import React,{useState} from 'react'
import { Modal, Button } from 'react-bootstrap'
import { CurrencyExchange } from 'react-bootstrap-icons'
import { useResource } from '../apis/ContextAPIProvider'

const PaymentModal = ({show, handleSubmit, toggleModal}) => {

    const clients = useResource()('clients')
    const [client, setClient] = useState(null)

    const switchClient = (id) =>{
        const clt = clients.filter(f=> f.id === Number(id))[0]
        setClient(clt)
    }

    return (
        <Modal size={"md"} show={show} aria-labelledby="contained-modal-title-vcenter"
            centered scrollable>
            <Modal.Header className="py-1 px-3 bg-danger text-white">
                <Modal.Title>Make Payment</Modal.Title>
                <Button className="badge text-white p-2 px-3 border-0 shadow-sm" style={{ background: 'rgba(120, 0,0, .8' }} onClick={()=>toggleModal('payment')}>X</Button>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={(e)=> handleSubmit(e, 'payment')}>
                    <div className="modal-body mb-0">
                        <div className="row px-2">
                            <div className="col-md-12">
                                <div className="row mb-2">
                                    <label htmlFor="client" className="col-2 form-label">Client: </label>
                                    <div className="col-10">
                                        <select className="form-select" name="client" required onChange={(e)=> switchClient(e.target.options[e.target.options.selectedIndex].value)}>
                                            <option value="">--select--</option>
                                            {
                                                clients.map(c => {
                                                    return (
                                                        <option value={c.id} key={c.id}>{c.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row px-2">
                            <div className="col-md-6">
                                <div className="mb-2">
                                    <label htmlFor="amount" className="form-label">Amount</label>
                                    <input type="number" className="form-control" name="amount" autoComplete="off" required />
                                </div>
                            </div>

                            {
                                client ?
                                    client.category == 0 ? "" : client.category == 1 ?
                                        <div className="col-md-6">
                                            <div className="mb-2">
                                                <label htmlFor="subscription" className="form-label">Subscription</label>
                                                <input type="number" disabled value={client ? client.subscription : null} className="form-control" />
                                            </div>
                                        </div> :
                                        <div className="col-md-6">
                                            <div>
                                                <label htmlFor="tax" className="form-label">Tax (%)</label>
                                                <input type="number" placeholder={client ? "Tax is " +client.tax: null} className="form-control" name="tax" required />
                                            </div>
                                        </div> : ""
                            }
                        </div>

                        {
                            client ?
                            client.category === 1 ? "" :
                                    <div className="row px-2 mb-2" >
                                        <div className="col">
                                            <div className="mb-2">
                                                <label htmlFor="subscription" className="form-label">Subscription</label>
                                                <input type="number" disabled value={client ? client.subscription : null} className="form-control" />
                                            </div>
                                        </div>
                                    </div> : ""
                        }

                        <div className="row px-2 mb-2" >
                            <div className="col">
                                <div className="mb-2">
                                    <label htmlFor="credit_note" className="form-label">Invoice Note (Optional)</label>
                                    <textarea type="text" placeholder="Your note here..." className="form-control" name="credit_note" autoComplete='credit_note'></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-0">
                            <div className="col d-flex justify-content-end align-items-center">
                                <button className="btn btn-sm btn-primary d-flex justify-content-center align-items-center" type='submit'>
                                    <span className='me-2'>
                                        <CurrencyExchange />
                                    </span>
                                    <span>Pay</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default PaymentModal
