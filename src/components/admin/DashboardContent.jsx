import React, { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap"
import { CurrencyDollar, ListCheck, People, Coin } from "react-bootstrap-icons"
import { CurrencyFormatter } from "../apis/TitleProvider"
import { Link } from "react-router-dom"
import { CountUp } from 'use-count-up'
import Popup from '../apis/Popup'
import ReactApexChart from "react-apexcharts"
import { paymentReduce } from "../sharedpages/payments/PaymentAggregate"
import { useResource } from "../apis/ContextAPIProvider"

export const sumPayments = (payments) => {
    let balance = 0, revenue = 0
    paymentReduce(payments).map(p => {
        balance += (p.carry + p.subscription - p.paid)
        revenue += p.paid
        return () => { }
    })

    return { balance, revenue }
}

const Board = ({ barOptions, withdrawnOptions}) => {
    const [data, setData] = useState({prg: {checked: 0, clients:3}, ncl: 5, wdn: 1})
    const [revenue, setRevenue] = useState(0)
    const [balance, setBalance] = useState(0)
    const payments = useResource()('payments')

    const getPercent = (value) => {
        value = Number((value / (balance + revenue)) * 100).toFixed(0)
        return isNaN(value) ? 0 : value
    }

    useEffect(() => {
        const values = sumPayments(payments)

        setRevenue(values.revenue)
        setBalance(values.balance)
    }, [payments])

    const changeZone =  (event) => {
        Popup('Switching zone..', true)
        
        const numbers = [0,1,2,3,4,5,6,7,8,9,10];
        const checked = numbers[Number(Math.random() * 10).toFixed(0)]
        let clients = 0, i=0;


        while(Number(checked) > Number(clients)){
            if(Number(numbers[i]) > Number(checked) && Number(numbers[i]) != 10){
                clients = numbers[i+1];
                break;
            }else if(Number(numbers[i]) == 10){
                clients = numbers[i];
                break;
            }

            i += 1;
        }

        const interval = setTimeout(() => {
            setData({
                ...data,
                prg:{
                    checked,
                    clients
                }
            })
            Popup('Switching completed')
            clearTimeout(interval)
        }, 2000)
        
    }

    const showProgress = () => {
        let percent = data?.prg?.checked === 0 ? 0 : Number((data?.prg?.checked / data?.prg?.clients) * 100).toFixed(0)
        percent = isNaN(percent) ? 0 : percent

        return (
            <div className={'text-center text-white progress-bar-striped bg-' + (percent < 26 ? "danger" : percent < 51 ? 'info' : percent < 76 ? 'primary' : 'success')}
                style={{ width: percent + '%' }}>
                {percent === 0 ? '' : percent + '%'}
            </div>
        )
    }

    return (
        <div className="expandonprint" >
            <Row style={{ fontSize: '14px' }}>
                <Col item="true" xs={12} md={3} className="mt-4 expandonprint" >
                    <Link className='nav-link' to="clients">
                        <div className='card p-0 border-danger rounded-4' style={{ boxShadow: '2px 2px 4px lightgrey', borderWidth: '0px 0px 0px 4px' }}>
                            <div className='card-body bg-white rounded-4'>
                                <div className='row d-flex align-items-center'>
                                    <div className='col-8 d-flex align-items-center flex-column'>
                                        <span className="w-100" >New Clients</span>
                                        <span className="w-100 fw-bolder " >
                                            <CountUp isCounting end={data?.ncl ? data?.ncl : 0} duration={3.2} formatter={CurrencyFormatter} />
                                        </span>
                                    </div>
                                    <div className='col-4 d-flex justify-content-end'>
                                        <ListCheck size={50} color="white" className='rounded-4 bg-primary p-3' style={{ boxShadow: '2px 2px 4px lightgrey' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </Col>

                <Col item="true" xs={12} md={3} className="mt-4 expandonprint">
                    <Link className='nav-link' to="clients">
                        <div className='card p-0 border-danger rounded-4' style={{ boxShadow: '2px 2px 4px lightgrey', borderWidth: '0px 0px 0px 4px' }}>
                            <div className='card-body bg-white rounded-4'>
                                <div className='row d-flex align-items-center'>
                                    <div className='col-8 d-flex align-items-center flex-column'>
                                        <span className="w-100"  >Inactive Clients</span>
                                        <span className="w-100 fw-bolder" >
                                            <CountUp isCounting end={data?.wdn ? data?.wdn : 0} duration={3.2} formatter={CurrencyFormatter} />
                                        </span>
                                    </div>
                                    <div className='col-4 d-flex justify-content-end'>
                                        <People size={50} color="white" className='rounded-4 bg-primary p-3' style={{ boxShadow: '2px 2px 4px lightgrey' }} />
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


            <Row>
                <Col xs={12} md={12} lg={12} className="expandonprint mt-4">
                    <Row className="mb-2">
                        <Col>
                            <label className="fw-bold fs-5 text-secondary">Work Progress</label>
                        </Col>
                    </Row>
                    <div className='card bg-white rounded-4 border-0 px-3' style={{ maxHeight: '280px', boxShadow: '1px 1px 5px lightgrey' }}>
                        <div className='row mb-3'>

                            <div className='col-md-3 mb-1 text-center d-flex flex-column justify-content-center'>
                                <span className="mb-3 fw-bold">Zone</span>
                                <label className="d-flex justify-content-center">
                                    <select className="form-select" style={{ width: '65px' }} onChange={changeZone}>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                        <option value="E">E</option>
                                    </select>
                                </label>
                            </div>

                            <div className='col-md-3 mb-1 text-center d-flex flex-column justify-content-center'>
                                <span className="mb-3 fw-bold">Processed</span>
                                <span>{data?.prg?.checked} of {data?.prg?.clients}</span>
                            </div>

                            <div className='col-md-6 col-sm-12 px-4 align-items-center d-flex flex-column justify-content-center'>
                                <span className="mb-3 fw-bold text-white">Progress</span>
                                <div className="progress mb-3 w-100 mt-1 " style={{ height: '16px' }}>
                                    {
                                        showProgress()
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col xs={12} md={6} className="mt-4 expandonprint">
                    <Row className="mb-2">
                        <Col>
                            <label className="fw-bold fs-5 text-secondary">Clients Distribution</label>
                        </Col>
                    </Row>
                    <div className="card bg-white rounded-4 p-0  border-0" style={{ boxShadow: '2px 2px 4px lightgrey' }}>
                        <div className="card-body p-0">
                            <ReactApexChart
                                options={barOptions.options}
                                series={barOptions.series}
                                type="bar"
                                width="100%"
                                height={250}
                            />
                        </div>
                    </div>
                </Col>
                <Col xs={12} md={6} className="mt-4 expandonprint">
                    <Row className="mb-2">
                        <Col>
                            <label className="fw-bold fs-5 text-secondary">Clients Withdrawn</label>
                        </Col>
                    </Row>
                    <div className="card bg-white rounded-4 p-0 border-0" style={{ boxShadow: '2px 2px 4px lightgrey' }}>
                        <div className="card-body p-0">
                            <ReactApexChart
                                options={withdrawnOptions.options}
                                series={withdrawnOptions.series}
                                type="line"
                                height={250}
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default class DashboardContent extends React.Component {
    state = {
        barOptions: {
            series: [{
                name: '',
                data: [10, 20, 5, 15]
            }],
            options: {
                chart: {
                    toolbar: {
                        show: false
                    },
                    height: 350,
                    type: 'column',
                },
                grid: {
                    xaxis: {
                        lines: {
                            show: false
                        }
                    },
                    yaxis: {
                        lines: {
                            show: false
                        }
                    }
                },
                plotOptions: {
                    bar: {
                        borderRadius: 10,
                        dataLabels: {
                            position: 'top',
                        },
                    }
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                        return val;
                    },
                    offsetY: -20,
                    style: {
                        fontSize: '12px',
                        colors: ["#304758"]
                    }
                },

                xaxis: {
                    categories: ["Zone A", "Zone B", "Zone C", "Zone D", "Zone E"],
                    position: 'bottom',
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                yaxis: {
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false,
                    },
                    labels: {
                        show: false
                    }
                }
            }
        },

        withdrawnOptions: {
            series: [
                {
                    name: "Withdrawn clients",
                    data: [0, 4, 1, 8, 3, 15, 6, 0, 7, 18, 5, 0]
                }
            ],
            options: {
                chart: {
                    height: 250,

                    type: 'line',
                    toolbar: {
                        show: false
                    }
                },
                dataLabels: {
                    enabled: true,
                },
                stroke: {
                    curve: 'smooth'
                },
                grid: {
                    show: false
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yaxis: {
                    show: false
                }
            }
        }
    }

    updateState = (barop, withop) => {
        this.setState({
            withdrawnOptions: {
                ...this.state.withdrawnOptions, series: [
                    {
                        name: 'Withdrawn clients',
                        data: withop ? withop : [0, 0, 0, 0]
                    }
                ]
            },
            barOptions: {
                ...this.state.barOptions, series: [
                    {
                        name: '',
                        data: barop ? barop : [0, 0, 0, 0]
                    }
                ]
            }
        })
    }

    render() {

        return (
            <Board
                Authorization={this.props.bearer}
                role={this.props.id}
                barOptions={this.state.barOptions}
                withdrawnOptions={this.state.withdrawnOptions}
                optionHandler={this.updateState}
            />
        )
    }
}