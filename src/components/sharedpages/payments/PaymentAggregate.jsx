import React from "react"
import TableUtilities from "../../apis/TableUtilities"
import { CurrencyFormatter } from "../../apis/TitleProvider"

export const paymentReduce = (payments) => {
    const aggregatedPayments = []

    for (const key in payments) {
        let paid = 0

        if (aggregatedPayments.filter(f => f.client === payments[key].client).length === 0) {
            payments.filter(f => f.client === payments[key].client).map((item) => {
                paid += item.paid
            })

            aggregatedPayments.push({ ...payments[key], paid })
        }
    }

    return aggregatedPayments
}

const PaymentAggregate = ({ payments }) => {

    return (
        <TableUtilities cols={8} filename="Aggregated Payments.csv">
            <table className="table  table-hover rounded-2 " id="paymentsaggregate">
                <thead className="bg-light border-bottom border-3">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Subscription</th>
                        <th scope="col">Carry</th>
                        <th scope="col">Paid</th>
                        <th scope="col">Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        paymentReduce(payments).map((p, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{p.name}</td>
                                    <td>{p.category === 1 ? "Individual" : 'Corporate'}</td>
                                    <td>{CurrencyFormatter(p.subscription)}</td>
                                    <td>{CurrencyFormatter(p.carry)}</td>
                                    <td>{CurrencyFormatter(p.paid)}</td>
                                    <td>{CurrencyFormatter(((p.subscription + p.carry) - p.paid))}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </TableUtilities>
    )
}

export default PaymentAggregate
