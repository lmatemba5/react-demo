import React from "react"
import TableUtilities from "../../apis/TableUtilities"
import { CurrencyFormatter } from "../../apis/TitleProvider"

const PaymentHistory = ({ payments }) => {

    return (
        <TableUtilities cols={8} filename="Payments History.csv">
            <table id="paymentshistory" className="table  rounded-2 table-hover m-0">
                <thead className="bg-light border-bottom border-3">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Tax</th>
                        <th scope="col" className="text-center">Date</th>
                        <th scope="col" className="text-center">Time</th>
                        <th scope="col" className="text-end">Paid</th>
                        <th scope="col" className="text-center">Receipt#</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        payments.map((p, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{p.name}</td>
                                    <td>{p.category === 1 ? "Individual": "Corporate"}</td>
                                    <td>{CurrencyFormatter(p.tax)}%</td>
                                    <td className="text-center">{p.date}</td>
                                    <td className="text-center">{p.time}</td>
                                    <td className="text-end">{CurrencyFormatter(p.paid)}</td>
                                    <td className="text-center">{p.receipt}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </TableUtilities>
    )
}

export default PaymentHistory
