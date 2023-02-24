import React, { useEffect } from 'react'
import { Dropdown } from "react-bootstrap"
import { MenuButtonWide, Person } from "react-bootstrap-icons"
import { Link } from 'react-router-dom'
import { useResource, useConsumer } from '../apis/ContextAPIProvider'
import { domSelector } from '../apis/TitleProvider'

export const toggleSidebar = (event) => {
    if (event.target.nodeName.startsWith('path') || event.target.nodeName.startsWith('svg')) {
        domSelector('body').classList.toggle('open')
        return
    }

    if (window.innerWidth > 1092) {
        return
    }

    domSelector('body').classList.toggle('open')
}

const Topbar = () => {
    const user = useResource()('user')
    const { logout } = useConsumer()

    useEffect(() => {
    }, [logout, user])

    return (
        <div className="d-flex justify-content-between align-items-center" style={{ minHeight: '60px', background: 'rgba(170,0,0, .8)' }} >
            <div className='ps-3'>
                <MenuButtonWide onClick={toggleSidebar} role="button" id="sidebar-toggler" color={"white"} size={25} className='cursor-pointer' />
            </div>
            <Dropdown>
                <Dropdown.Toggle className="d-flex align-items-center" variant="transparent" style={{ color: 'white' }} id="dropdown-basic">
                    <span className="me-2">
                        <Person size={30} />
                    </span>
                    <span>{user.name}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <ul className='list-unstyled mb-1'>
                        <li className='nav-item ps-2 mb-2 lp'>
                            <Link to="#" className="nav-link" style={{ textDecoration: 'none' }} onClick={() => logout()}>Logout</Link>
                        </li>
                        {
                            /*
                                <li className='nav-item ps-2 lp'>
                            <Link to="#" className="nav-link" style={{ textDecoration: 'none' }} onClick={() => toggleModal('password')}>Change Password</Link>
                        </li>
                            */
                        }

                    </ul>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default Topbar
