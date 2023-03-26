import React, { useState } from "react"
import { Row, Col, Button, Container } from "react-bootstrap"
import { TitleProvider } from "../../apis/TitleProvider"
import ActiveClients from "./ActiveClients"
import WithdrawnClients from "./WithDrawnClients"
import { Navigate } from "react-router-dom"
import Popup from "../../apis/Popup"
import { useConsumer, useResource } from "../../apis/ContextAPIProvider"
import { useModalResource } from "../../templates/MainLayout"

const Clients = () => {
    const { isLoggedin, getRole, updateState} = useConsumer()
    const {toggleModal, updateObject} = useModalResource()
    const clients = useResource()('clients')
    const role = getRole()
    const [active, setActive] = useState(true)
    
    const toggleChecked = async (client) => {
        Popup("Checking.....", true)
        
        const timeout = setTimeout(()=>{
            let value = clients.filter(c=> c.id !== client.id)
            client.checked = true
            value.push(client)
            Popup("Success")
            updateState('clients', value);
            clearTimeout(timeout)
        },1500)
    }

    const handleDelete = async (client) => {
        Popup("Withdrawing.....", true)
        
        const timeout = setTimeout(()=>{
            let value = clients.filter(c=> c.id !== client.id)
            client.status = 0
            value.push(client)
            Popup("Success")
            updateState('clients', value);
            clearTimeout(timeout)
        },1500)
        
    }

    const handleTrash = async (client) => {
        Popup("Deleting.....", true)
        
        const timeout = setTimeout(()=>{
            let value = clients.filter(c=> c.id !== client.id)
            Popup("Success")
            updateState('clients', value);
            clearTimeout(timeout)
        },1500)
        
    }

    const handleRestore = async (client) => {
        Popup("Restoring.....", true)
        
        const timeout = setTimeout(()=>{
            let value = clients.filter(c=> c.id !== client.id)
            client.status = 1
            value.push(client)
            Popup("Success")
            updateState('clients', value);
            clearTimeout(timeout)
        },1500)
    }

    return (
        isLoggedin() === false ? <Navigate to="/login" replace={true} /> :
            <Container fluid id="content" className="px-3" sticky="top" style={{ minHeight: 'calc(100vh - 60px)' }}>
                <TitleProvider titleText="Clients" />
                <Row className="px-2 py-4">
                    <Col>
                        <span className="fs-3 fw-bold text-secondary">{active ? (role === 2 ? "Clients" : 'Active Clients') : 'Withdrawn Clients'}</span>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-center">
                        <Button variant="primary" className="btn-sm rounded-2 me-2" style={{ display: (role === 1 ? "" : "none") }} onClick={() => toggleModal('client')}>
                            ADD CLIENT
                        </Button>
                    </Col>
                </Row>

                <Row style={{ display: (role === 1 ? "" : "none") }}>
                    <Col className="d-flex justify-content-end align-items-center">
                        <Button variant="success" onClick={(e) => setActive(true)} className={active ? "d-none" : "btn-sm rounded-2 me-2"}>
                            Show Active Clients
                        </Button>
                        <Button variant="secondary" onClick={(e) => setActive(false)} className={active ? "rounded-2 me-2 btn-sm" : "d-none"}>
                            Show Widthdran Clients
                        </Button>
                    </Col>
                </Row>

                {active ? <ActiveClients clients={clients} toggleChecked={toggleChecked} role={role} handleEdit={updateObject} handleDelete={handleDelete} /> : <WithdrawnClients clients={clients} handleTrash={handleTrash} handleRestore={handleRestore} />}
            </Container>
    )
}

export default Clients
