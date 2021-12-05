import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const InvoiceCustomer = () => {
    const { invoice_id } = useParams();
    console.log(invoice_id)
    const [invoice, setInvoice] = useState([]);
    useEffect(() => {
        (async() => {
            const getInvoice = await fetch('https://backend.mariosk.xyz:3001/get/customer/invoice/' + invoice_id);
            const response = await getInvoice.json();
            setInvoice(response.map((e) => ({
                id: e.invoice_id,
                name: e.name,
                number: e.number,
                date: e.date,
                total: e.total,
                items: JSON.parse(e.items),
                status: e.status,
            })))
        })();
    }, []);
    return (
        <>
            {invoice.map((e) => (
                <div>
                    <h1>{e.name}</h1>
                    <h2>{e.number}</h2>
                    <h3>{e.date}</h3>
                    <h4>{e.total}</h4>
                    <h5>{e.status}</h5>
                </div>
            ))}
        </>
    )
}

export default InvoiceCustomer;