import React, { useState, useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import { People, PersonCheck, GraphUpArrow } from "react-bootstrap-icons"
import { CurrencyFormatter } from "../apis/TitleProvider"
import { CountUp } from 'use-count-up'

const Board = () => {
    const [data, setData] = useState({
        clients: 0,
        checked: 0,
        zone: ''
    })

    useEffect(() => {
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const checked = numbers[Number(Math.random() * 10).toFixed(0)]
        let clients = 0, i = 0;

        while (Number(checked) > Number(clients)) {
            if (Number(numbers[i]) > Number(checked) && Number(numbers[i]) !== 10) {
                clients = numbers[i + 1];
                break;
            } else if (Number(numbers[i]) === 10) {
                clients = numbers[i];
                break;
            }

            i += 1;
        }

        const interval = setTimeout(() => {

            const d = {
                zone: ['A', 'B', 'C', 'D', 'E'][Number((Math.random()* 5).toFixed(0))],
                checked,
                clients
            }

            localStorage.setItem('zone', d.zone)
            setData(d)
            clearTimeout(interval)
        }, 2000)
    }, [])

    const showProgress = () => {
        let percent = data?.checked === 0 ? 0 : Number((data?.checked / data?.clients) * 100).toFixed(0)
        percent = isNaN(percent) ? 0 : percent

        return (
            <div className={'text-center text-white progress-bar-striped bg-' + (percent < 26 ? "danger" : percent < 51 ? 'info' : percent < 76 ? 'primary' : 'success')}
                style={{ width: percent + '%' }}>
                {percent === 0 ? '' : percent + '%'}
            </div>
        )
    }

    return (
        <div className="container expandonprint">
            <Row style={{ fontSize: '16px' }}>
                <Col item="true" xs={12} md={3} className="mt-4 expandonprint">
                    <div className='card p-0 border-danger rounded-4' style={{ boxShadow: '2px 2px 4px lightgrey', borderWidth: '0px 0px 0px 4px' }}>
                        <div className='card-body bg-white rounded-4'>
                            <div className='row d-flex align-items-center'>
                                <div className='col-8 d-flex align-items-center flex-column'>
                                    <span className="w-100" >
                                        Clients [{data.zone}]
                                    </span>
                                    <span className="w-100 fw-bolder">
                                        <span className="me-2" >
                                            <CountUp isCounting end={data?.clients} duration={3.2} formatter={CurrencyFormatter} />
                                        </span>
                                    </span>
                                </div>
                                <div className='col-4 d-flex justify-content-end'>
                                    <People size={50} color="white" className='rounded-4 bg-primary p-3' style={{ boxShadow: '2px 2px 4px lightgrey' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col item="true" xs={12} md={3} className="mt-4 expandonprint">
                    <div className='card p-0 border-danger rounded-4' style={{ boxShadow: '2px 2px 4px lightgrey', borderWidth: '0px 0px 0px 4px' }}>
                        <div className='card-body bg-white rounded-4'>
                            <div className='row d-flex align-items-center'>
                                <div className='col-8 d-flex align-items-center flex-column'>
                                    <span className="w-100" >Processed</span>
                                    <span className="w-100 fw-bolder">
                                        <span className="me-2" >
                                            <CountUp isCounting end={data?.checked} duration={3.2} formatter={CurrencyFormatter} />
                                        </span>
                                        <span className='text-success'>
                                            <span className='text-secondary me-2'>of</span>
                                            <CountUp isCounting end={data?.clients} duration={3.2} formatter={CurrencyFormatter} />
                                        </span>
                                    </span>
                                </div>
                                <div className='col-4 d-flex justify-content-end'>
                                    <PersonCheck size={50} color="white" className='rounded-4 bg-primary p-3' style={{ boxShadow: '2px 2px 4px lightgrey' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col item="true" xs={12} md={6} className="mt-4 expandonprint">
                    <div className='card p-0 border-danger rounded-4' style={{ boxShadow: '2px 2px 4px lightgrey', borderWidth: '0px 0px 0px 4px' }}>
                        <div className='card-body bg-white rounded-4'>
                            <div className='row d-flex align-items-center'>
                                <div className='col-10 d-flex align-items-center flex-column'>
                                    <span className="w-100" >Work Progress</span>
                                    <div className="progress w-100 mt-1" style={{ height: '16px' }}>
                                        {
                                            showProgress()
                                        }
                                    </div>
                                </div>
                                <div className='col-2 d-flex justify-content-end'>
                                    <GraphUpArrow size={50} color="white" className='rounded-4 bg-primary p-3' style={{ boxShadow: '2px 2px 4px lightgrey' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default class FODashboard extends React.Component {

    render() {

        return (
            <Board/>
        )
    }
}