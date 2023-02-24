import React,{useState, useEffect} from "react"
import { Row, Col } from "react-bootstrap"
import { CurrencyDollar, Coin } from "react-bootstrap-icons"
import { CurrencyFormatter } from "../apis/TitleProvider"
import { Link } from "react-router-dom"
import { CountUp } from 'use-count-up'
import { useResource } from "../apis/ContextAPIProvider"
import { sumPayments } from "../admin/DashboardContent"

const Board = () => {
    const payments = useResource()('payments')
    const [revenue, setRevenue] = useState(0)
    const [balance, setBalance] = useState(0)

    const getPercent = (value) => {
        value = Number((value / (revenue+balance)) * 100).toFixed(0)
        return isNaN(value) ? 0 : value
    }

    useEffect(()=>{
        const values = sumPayments(payments)

        setRevenue(values.revenue)
        setBalance(values.balance)
    },[payments])

    return (
        <div className="container expandonprint">
            <Row style={{ fontSize: '16px' }}>
                <Col item="true" xs={12} md={3} className="mt-4 expandonprint">
                    <Link className='nav-link' to="payments">
                        <div className='card p-0 border-danger rounded-4' style={{ boxShadow: '2px 2px 4px lightgrey', borderWidth: '0px 0px 0px 4px' }}>
                            <div className='card-body bg-white rounded-4'>
                                <div className='row d-flex align-items-center'>
                                    <div className='col-8 d-flex align-items-center flex-column'>
                                        <span className="w-100" >Total Receivables</span>
                                        <span className="w-100 fw-bolder">
                                            <span className="me-2" >
                                                K<CountUp isCounting end={balance} duration={3.2} formatter={CurrencyFormatter} />
                                            </span>
                                            <span className='text-success'>
                                                {getPercent(balance)}%
                                            </span>
                                        </span>
                                    </div>
                                    <div className='col-4 d-flex justify-content-end'>
                                        <CurrencyDollar size={50} color="white" className='rounded-4 bg-primary p-3' style={{ boxShadow: '2px 2px 4px lightgrey' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </Col>

                <Col item="true" xs={12} md={3} className="mt-4 expandonprint">
                    <Link className='nav-link' to="payments">
                        <div className='card p-0 border-danger rounded-4' style={{ boxShadow: '2px 2px 4px lightgrey', borderWidth: '0px 0px 0px 4px' }}>
                            <div className='card-body bg-white rounded-4'>
                                <div className='row d-flex align-items-center'>
                                    <div className='col-8 d-flex align-items-center flex-column'>
                                        <span className="w-100" >Total Revenues</span>
                                        <span className="w-100 fw-bolder">
                                            <span className="me-2" >
                                                K<CountUp isCounting end={revenue} duration={3.2} formatter={CurrencyFormatter} />
                                            </span>
                                            <span className='text-success'>
                                                {getPercent(revenue)}%
                                            </span>
                                        </span>
                                    </div>
                                    <div className='col-4 d-flex justify-content-end'>
                                        <Coin size={50} color="white" className='rounded-4 bg-primary p-3' style={{ boxShadow: '2px 2px 4px lightgrey' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </Col>
            </Row>
        </div>
    )
}

export default class FiDashboard extends React.Component {

    render() {
        return <Board />
    }
}