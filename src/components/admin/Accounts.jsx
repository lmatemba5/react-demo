import { Row, Col, Button, Container } from "react-bootstrap"
import { Pencil, Trash } from "react-bootstrap-icons"
import { TitleProvider} from "../apis/TitleProvider"
import TableUtilities from "../apis/TableUtilities"
import {useConsumer, useResource} from "../apis/ContextAPIProvider"
import { useModalResource } from "../templates/MainLayout"
import Popup from "../apis/Popup"

const Accounts = () => {
    const users = useResource()('users')
    const {updateState} = useConsumer()
    const {toggleModal, updateObject} = useModalResource()

    const trash = (id) => {
        Popup("Deleting.....", true)
        
        const timeout = setTimeout(()=>{
            let value = users.filter(c=> c.id !== id)
            Popup("Success")
            updateState('users', value);
            clearTimeout(timeout)
        },1500)
    }

    return (
        <Container fluid className="px-3" id="content">
            <TitleProvider titleText="Accounts" />
            <Row>
                <Col xs={12} md={12} lg={12} className="px-2 py-4">
                    <span className="fs-3 fw-bold text-secondary">Users</span>
                </Col>
            </Row>

            <Row>
                <Col className="d-flex justify-content-end align-items-center">
                    <Button variant="primary" className="fw-bold btn-sm rounded-2" onClick={() => toggleModal('user')}>
                        ADD USER
                    </Button>
                </Col>
            </Row>

            <TableUtilities cols={3} filename="User accounts.csv">
                <table className="table  table-sm table-hover rounded-2 datatable notset" id="accountsTable">
                    <thead className="bg-light border-bottom border-3">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Role</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.filter(f => f.id !== 1).map((u, index) => {
                                return (
                                    <tr key={index} id={u.id}>
                                        <td>{index + 1}</td>
                                        <td>{u.name}</td>
                                        <td>
                                            {u.role === 1 ? "Admin" : u.role === 2 ? "Field Officer" :"Accounting"}
                                        </td>
                                        <td><label className={u.status === 1 ? "badge bg-success" : "badge bg-info"}>{u.status === 1 ? "Online" : 'Offline'}</label></td>
                                        <td style={{ maxWidth: '30px' }} >
                                            <div className="d-flex justify-content-end">
                                                <span onClick={(e) => updateObject('user', u)} className="me-2 action-btns rounded-1 p-2" style={{ cursor: 'pointer' }}>
                                                    <Pencil size={15} disabled />
                                                </span>
                                                <span className="text-danger action-btns rounded-1 p-2" onClick={(e) => trash(u.id)} style={{ cursor: 'pointer' }}>
                                                    <Trash size={15} />
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </TableUtilities>
        </Container >
    )
}


export default Accounts