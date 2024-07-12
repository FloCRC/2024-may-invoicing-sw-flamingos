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
                setInvoiceTotal(invoice.data.invoice_total)
                setInvoiceNumber(invoice.data.invoice_id)
            })
    }, [status])

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
        let paidStat = 'Paid'
        fetch(`https://invoicing-api.dev.io-academy.uk/invoices/${invoiceid}`, {
            method: "PUT",
            body: JSON.stringify(paidStat),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then(res => {
            res.json()
        }).then(data => {
            setStatus('Paid')
        })
    }

    function cancelInv() {
        let cancStat = 'Cancelled'
        fetch(`https://invoicing-api.dev.io-academy.uk/invoices/${invoiceid}`, {
            method: "DELETE",
            body: JSON.stringify(cancStat),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then(res => {
            res.json()
        }).then(data => {
            setStatus('Cancelled')
        })
    }

    const cancelButton = <button onClick={cancelInv} className="bg-red-400 text-white p-2 rounded shadow-md hover:opacity-50 md:ml-2">Cancel Invoice</button>;
    const disabledCancelButton = <div className="bg-red-400 text-white p-2 rounded opacity-50 md:ml-2">Cancel Invoice</div>;
    const paidButton = <button onClick={markPaid} className="bg-green-400 text-white p-2 rounded shadow-md hover:opacity-50">Mark as Paid</button>
    const disabledPaidButton = <div className="bg-green-400 text-white p-2 rounded opacity-50">Mark as Paid</div>

    return (
        <div className="w-full mb-5 flex flex-col items-center ml-6 pr-12 md:ml-20 md:pr-40">
            <div className="w-full py-1 max-w-[850px] border-2 bg-white md:p-3">
                <InvoiceTitle invoiceID={invoiceNumber} />
                <div className="flex justify-between px-1 py-3 border-b-2 md:px-3">
                    <div className="flex flex-col ml-5">
                        <p className="font-bold">From</p>
                        <p className="text-sm md:text-base">SW Flamingos Ltd</p>
                        <p className="text-sm md:text-base">The Saltflats</p>
                        <p className="text-sm md:text-base">Bolivia</p>
                        <br />
                        <p className="font-bold">To</p>
                        <p className="text-sm md:text-base">{client}</p>
                        <p className="text-sm md:text-base">{address}</p>
                        <p className="text-sm md:text-base">{city}</p>
                    </div>
                    <div className="flex flex-col mr-5">
                        <p className="font-bold">Status</p>
                        <div className="md:pt-2"><StatusBox invoiceDue={dateDue} invoiceStatus={status} /></div>
                        <br />
                        <p className="font-bold">Created</p>
                        <p className="text-sm md:text-base">{newCreatedDate}</p>
                        <br />
                        <p className="font-bold">Due</p>
                        <p className="text-sm md:text-base">{newDueDate}</p>
                    </div>
                </div>
                <div className="px-1 py-3 mx-5 max-w-[850px] text-sm md:text-base md:px-3">
                    <div className="grid grid-cols-[3fr_2fr_1fr_3fr] pb-2 font-bold gap-3 border-b-2 md:grid-cols-[3fr_1fr_1fr_1fr]">
                        <p className="md:hidden">Desc.</p><p className="hidden md:block">Description</p>
                        <p className="text-right md:hidden">Quan.</p><p className="hidden md:block">Quantity</p>
                        <p className="text-right md:text-left">Rate</p>
                        <p className="text-right">Total</p>
                    </div>
                    {details.map((detail, index) => {
                        return (
                            <InvoiceDetails key={index} desc={detail.description} quant={detail.quantity} cost={detail.rate} subTotal={detail.total} paidToDate={paidToDate} />
                        )
                    })}
                    <div className="grid grid-cols-[0fr_1fr_1fr] py-1 border-b-2 md:grid-cols-[4fr_1fr_1fr]">
                        <p></p>
                        <p>Total</p>
                        <p className="font-bold text-right">£{invoiceTotal}</p>
                    </div>
                    <div className="grid grid-cols-[0fr_1fr_1fr] py-1 md:grid-cols-[4fr_1fr_1fr]">
                        <p></p>
                        <p>Paid to date</p>
                        <p className="font-bold text-right">£{paidToDate}</p>
                    </div>
                    <StatusBar invoiceDue={dateDue} invoiceStatus={status} invoiceTotal={invoiceTotal} paidToDate={paidToDate} />
                    <p>Payments due within 30 days.</p>
                    <div className="flex justify-between mt-2 md:mt-0 md:justify-end">
                        {status !== 'Paid' && status !== 'Cancelled' ? paidButton : disabledPaidButton}
                        {status !== 'Paid' && status !== "Cancelled" ? cancelButton : disabledCancelButton}
                    </div>
                </div>
            </div>
        </div>
    )
}