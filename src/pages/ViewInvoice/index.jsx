import { useParams } from "react-router-dom";
import InvoiceTitle from "../../components/InvoiceTitle";
import { useEffect, useState } from "react";
import StatusBox from "../../components/StatusBox";
import InvoiceDetails from "../../components/InvoiceDetails";
import StatusBar from "../../components/StatusBar";

export default function ViewInvoice() {

    const { invoiceid } = useParams()
    const [invoiceNumber, setInvoiceNumber] = useState('')
    const [client, setClient] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [dateCreated, setDateCreated] = useState('')
    const [dateDue, setDateDue] = useState('')
    const [paidToDate, setPaidToDate] = useState('')
    const [details, setDetails] = useState([])
    const [status, setStatus] = useState('')
    const [invoiceTotal, setInvoiceTotal] = useState(0)

    useEffect(() => {
        fetch(`https://invoicing-api.dev.io-academy.uk/invoices/${invoiceid}`)
            .then(res => res.json())
            .then(invoice => {
                setClient(invoice.data.name)
                setAddress(invoice.data.street_address)
                setCity(invoice.data.city)
                setDateCreated(invoice.data.created)
                setDateDue(invoice.data.due)
                setPaidToDate(invoice.data.paid_to_date)
                setDetails(invoice.data.details)
                setStatus(invoice.data.status_name)
                setInvoiceTotal(parseInt(invoice.data.invoice_total))
                setInvoiceNumber(invoice.data.invoice_id)
            })
    }, [])

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const splitCreatedDate = dateCreated.split('-')
    const month = splitCreatedDate[1] - 1
    const wordMonth = monthNames[month]
    const newCreatedDate = `${splitCreatedDate[2]} ${wordMonth} ${splitCreatedDate[0]}`
    const splitDate = dateDue.split('-')
    const monthDue = splitDate[1] - 1
    const wordMonthDue = monthNames[monthDue]
    const newDueDate = `${splitDate[2]} ${wordMonthDue} ${splitDate[0]}`

    function markPaid() {
        setStatus('Paid')
        fetch(`https://invoicing-api.dev.io-academy.uk/invoices/${invoiceid}`, {
            method: "PUT",
            body: JSON.stringify(status),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then(res => {
            res.json()
        }).then(data => {

        })
    }

    function cancelInv() {
        setStatus('Cancelled')
        fetch(`https://invoicing-api.dev.io-academy.uk/invoices/${invoiceid}`, {
            method: "DELETE",
            body: JSON.stringify(status),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then(res => {
            res.json()
        }).then(data => {

        })
    }

    const cancelButton = <button onClick={cancelInv} className="bg-red-400 text-white p-2 ml-2 rounded hover:opacity-50">Cancel Invoice</button>;
    const disabledCancelButton = <div className="bg-red-400 text-white p-2 ml-2 rounded opacity-50">Cancel Invoice</div>;
    const paidButton = <button onClick={markPaid} className="bg-green-400 text-white p-2 rounded hover:opacity-50">Mark as Paid</button>
    const disabledPaidButton = <div className="bg-green-400 text-white p-2 rounded opacity-50">Mark as Paid</div>

    return (
        <div className="flex flex-col items-center bg-slate-50 pr-5">
            <div className="p-3 ml-5 min-[760px]:max-w-[850px] border-b bg-white">
                <InvoiceTitle invoiceID={invoiceNumber} />
                <div className="flex justify-between p-3 border-b">
                    <div className="flex flex-col ml-5">
                        <p className="font-bold">From</p>
                        <p>SW Flamingos Ltd</p>
                        <p>The saltflats</p>
                        <p>Bolivia</p>
                        <br />
                        <p className="font-bold">To</p>
                        <p>{client}</p>
                        <p>{address}</p>
                        <p>{city}</p>
                    </div>
                    <div className="flex flex-col mr-5">
                        <p className="font-bold">Status</p>
                        <StatusBox invoiceDue={dateDue} invoiceStatus={status} />
                        <br />
                        <p className="font-bold">Created</p>
                        <p>{newCreatedDate}</p>
                        <br />
                        <p className="font-bold">Due</p>
                        <p>{newDueDate}</p>
                    </div>
                </div>
                <section className="p-3 ml-5 min-[760px]:max-w-[850px] border-b">
                    <div className="grid grid-cols-[3fr_1fr_1fr_1fr] p-2 font-bold gap-3 border-b border-slate-500">
                        <p>Description</p>
                        <p>Quantity</p>
                        <p>Rate</p>
                        <p>Total</p>
                    </div>
                    {details.map(detail => {
                        return (
                            <InvoiceDetails key={invoiceid} desc={detail.description} quant={detail.quantity} cost={detail.rate} subTotal={detail.total} paidToDate={paidToDate} />
                        )
                    })}
                    <div className="grid grid-cols-[4fr_1fr_1fr] border-b border-slate-500">
                        <p></p>
                        <p>Total</p>
                        <p className="mr-6 font-bold">£{invoiceTotal}</p>
                    </div>
                    <div className="grid grid-cols-[4fr_1fr_1fr]">
                        <p></p>
                        <p className="pr-2">Paid to date</p>
                        <p className="mr-6 font-bold">£{paidToDate}</p>
                    </div>
                    <StatusBar invoiceDue={dateDue} invoiceStatus={status} invoiceTotal={invoiceTotal} paidToDate={paidToDate} />
                    <p>Payments due within 30 days.</p>
                    <div className="flex justify-end">
                        {status !== 'Paid' && status !== 'Cancelled' ? paidButton : disabledPaidButton}
                        {status !== 'Paid' && status !== "Cancelled" ? cancelButton : disabledCancelButton}
                    </div>
                </section>
            </div>
        </div>
    )
}