import React from "react"
import { Row, Col, Container } from "react-bootstrap"
import { TitleProvider } from "../../apis/TitleProvider"
import PaymentAggregate from './PaymentAggregate'
import { useState } from 'react'
import PaymentHistory from "./PaymentHistory"
import { Navigate } from "react-router-dom"
import { useConsumer, useResource } from "../../apis/ContextAPIProvider"
import { useModalResource } from "../../templates/MainLayout"
import { CurrencyExchange } from "react-bootstrap-icons"

const Payments = () => {

    const { isLoggedin } = useConsumer()
    const payments = useResource()('payments');
    const { toggleModal} = useModalResource()

    const [showtable, setTableShow] = useState(true)

    const handleChange = (event) => {
        if (event.target.selectedIndex == 0) {
            setTableShow(true)
        } else {
            setTableShow(false)
        }
    }

    const showMonth = () => {
        const date = (new Date()).toDateString().split(" ")
        return date[1].concat(' ').concat(date[3])
    }

    return (
        isLoggedin() === false ? <Navigate to="/login" replace={true} /> :
            <Container fluid className="px-3" id="content">
                <TitleProvider titleText="Payments" />
                <Row className="px-2 py-4 d-flex justify-content-between align-items-center">
                    <Col className="px-2">
                        <span className="fs-3 fw-bold text-secondary">Payments</span>
                    </Col>
                    <Col className="px-2 text-center">
                        <span className="fs-3 fw-bold text-secondary">{showMonth()}</span>
                    </Col>
                    <Col className="px-2 d-flex justify-content-end">
                        <button className="btn btn-success rounded-2 fs-6 btn-sm d-flex align-items-center justify-content-center" onClick={()=> toggleModal('payment')}>
                            <span className="me-2">
                                <CurrencyExchange />
                            </span>
                            <span>
                                Make Payment
                            </span>
                        </button>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={12} lg={12} className="d-flex justify-content-end">
                        <select className="form-select" style={{ width: '125px' }} onChange={(e) => handleChange(e)}>
                            <option value="2">Payments</option>
                            <option value="2">History</option>
                        </select>
                    </Col>
                </Row>

                {showtable ? <PaymentAggregate payments={payments} /> : <PaymentHistory payments={payments} />}

            </Container >
    )
}

export default Payments
