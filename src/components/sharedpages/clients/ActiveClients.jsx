import React, { useEffect, useState } from "react"
import { Archive, CheckCircle, Pencil } from "react-bootstrap-icons"
import TableUtilities from "../../apis/TableUtilities"

const ActiveClients = ({ clients, handleEdit, handleDelete, role, toggleChecked }) => {

    const [zone, setZone] = useState(null)

    useEffect(() => {
        const timeout = setTimeout(()=>{
            const zn = localStorage.getItem('zone')
            if(zn !== zone){
                setZone(zn)
            }
        },200)
        
        return ()=>{
            clearTimeout(timeout)
        }
    }, [zone])

    return (
        <TableUtilities cols={5} filename="active_clients.csv">
            <table className="table table-hover m-0 ">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th className={role === 1 ? "" : "text-center"}>Zone</th>
                        <th className={role === 1 ? "" : "text-center"}>Phone</th>
                        <th className={role === 2 ? "d-none" : ""}>Collections</th>
                        <th className={role === 1 ? "" : "d-none"}>Status</th>
                        <th className={role === 1 ? "" : "text-center"}>{role === 1 ? "" : "Checked"}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (zone ? clients.filter(f => f.zone.startsWith(zone)) : 
                        clients.filter(f => f.status === 1)).map((c, index) => {

                            return (
                                <tr key={index} id={index}>
                                    <td>{index + 1}</td>
                                    <td>{c.name}</td>
                                    <td>{c.category === 1 ? "Individual" : "Corporate"}</td>
                                    <td className={role === 1 ? "" : "text-center"}>{c.zone}</td>
                                    <td className={role === 1 ? "" : "text-center"}>{c.phone}</td>
                                    <td className={role === 2 ? "d-none" : ""}>{c.visits}</td>
                                    <td className={role === 1 ? "" : "d-none"}><label className="badge bg-success">Active</label></td>
                                    <td className={role === 1 ? "" : "d-none"} style={{borderRadius:'0 0 5px 0'}}>
                                        <div className="d-flex justify-content-end">
                                            <span onClick={() => handleEdit("client", c)} className="me-2 rounded-1 p-2 action-btns" style={{ cursor: 'pointer' }}>
                                                <Pencil size={15} />
                                            </span>
                                            <span onClick={() => handleDelete(c)} className="rounded-1 p-2 action-btns" style={{ cursor: 'pointer' }}>
                                                <Archive size={15} />
                                            </span>
                                        </div>
                                    </td>
                                    <td className={role === 1 ? "d-none" : ""}>
                                        <div className="d-flex justify-content-center align-items-end">
                                            {

                                                c.checked ? <CheckCircle size={20} className="text-success" /> :

                                                    <label className="bg-success badge shadow-sm fst-italic" onClick={() => toggleChecked(c)}>
                                                        check
                                                    </label>
                                            }
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

export default ActiveClients
