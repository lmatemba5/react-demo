import React,{useState,useEffect} from "react"
import {CurrencyDollar, House, People, ListCheck} from "react-bootstrap-icons"
import { Link } from "react-router-dom"
import { useResource } from "../apis/ContextAPIProvider"
import {toggleSidebar} from './Topbar'

const Sidebar = () => {

    const user = useResource()('user')
    const [active, setActive] = useState(0)

    useEffect(() => {
    }, [active])

    const updateActive = (event, value) =>{
        toggleSidebar(event)
        setActive(value)
    }

  return (
    <div className="navigation">
                <div className="d-flex align-items-center px-2 text-white" style={{ minHeight: '60px', background: 'rgba(170,0,0, .8)' }}>
                    <span className="fs-4 fw-bolder">
                        APPLE
                    </span>
                </div>
                <ul className="list-unstyled">
                    <li className="text-start py-4  text-secondary fw-bold fs-6 border-bottom border-3" style={{ borderRadius: '0px', pointerEvents:'none' }}>
                        USER PANEL
                    </li>
                    <li className={active === 0 ? "active-nav-btn":""}>
                        <Link to="/dashboard" onClick={(e)=> updateActive(e,0)}>
                            <span className="icon">
                                <House className="avatar" />
                            </span>
                            <span className="title">Dashboard</span>
                        </Link>
                    </li>
                    <li className={ user.role === 1 ? (active === 1 ? "active-nav-btn" :""): "d-none"}>
                        <Link to="users" onClick={(e)=> updateActive(e,1)}>
                            <span className="icon">
                                <People className="avatar" />
                            </span>
                            <span className="title">Users</span>
                        </Link>
                    </li>
                    <li className={(user.role === 2 || user.role === 1) ? (active === 2 ? "active-nav-btn":""): "d-none"}>
                        <Link to="clients" onClick={(e)=> updateActive(e,2)}>
                            <span className="icon">
                                <ListCheck className="avatar" />
                            </span>
                            <span className="title">Clients</span>
                        </Link>
                    </li>
                    <li className={(user.role === 3 || user.role === 1) ? (active === 3 ? "active-nav-btn":""): "d-none"}>
                        <Link to="payments" onClick={(e)=> updateActive(e,3)}>
                            <span className="icon">
                                <CurrencyDollar className="avatar" />
                            </span>
                            <span className="title">Payments</span>
                        </Link>
                    </li>
                </ul>
            </div>
  )
}

export default Sidebar
