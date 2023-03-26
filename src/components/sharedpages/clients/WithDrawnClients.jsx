import React from "react"
import { ArrowClockwise, Trash } from "react-bootstrap-icons"
import TableUtilities from '../../apis/TableUtilities'

const WithdrawnClients = ({ clients, handleRestore, handleTrash }) => {

    return (
        <TableUtilities cols={5} filename="withdrawn_clients.csv">
            <table className="table  rounded-2 table-hover " id="withdrawnClients">
                <thead className="bg-light border-bottom border-3">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Zone</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody >
                    {
                        clients.filter(f => f.status === 0).map((c, index) => {
                            return (
                                <tr key={index} id={index}>
                                    <td>{index + 1}</td>
                                    <td>{c.name}</td>
                                    <td>{c.category === 1 ? "Individual" : "Corporate"}</td>
                                    <td>{c.zone}</td>
                                    <td>{c.phone}</td>
                                    <td><label className="badge bg-info">Disabled</label></td>
                                    <td>
                                        <div className="d-flex justify-content-end">
                                            <span className="me-2 rounded-1 p-2 action-btns" onClick={() => handleRestore(c)} style={{ cursor: 'pointer' }}>
                                                <ArrowClockwise size={15} />
                                            </span>
                                            <span className="rounded-1 p-2 text-danger action-btns" style={{ cursor: 'pointer' }} onClick={() => handleTrash(c)} >
                                                <Trash size={15}/>
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
    )
}

export default WithdrawnClients
