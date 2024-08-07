import { useEffect, useState } from "react"
import InvoiceSummary from "../InvoiceSummary"
import NewInvoiceButton from "../NewInvoiceButton"

export default function InvoiceList() {

    const [invoices, setInvoices] = useState([])
    const [filterInvoices, setFilterInvoices] = useState(0)
    const [sortInvoices, setSortInvoices] = useState('invoice_id')

    useEffect(() => {
        let url = 'https://invoicing-api.dev.io-academy.uk/invoices'
        if (filterInvoices !== 0 && sortInvoices !== 'invoice_id') {
            url += `?status=${filterInvoices}&sort=${sortInvoices}`
        }
        else if (filterInvoices !== 0) {
            url += `?status=${filterInvoices}`
        }
        else if (sortInvoices !== 'invoice_id') {
            url += `?sort=${sortInvoices}`
        }

        fetch(url)
            .then(res => res.json())
            .then(invoiceData => {
                setInvoices(invoiceData.data)
            }
            )
    }, [filterInvoices, sortInvoices])

    function filterStatus(e) {
        setFilterInvoices(Number(e.target.value))
    }

    function sort(e) {
        setSortInvoices(e.target.value)
    }

    return (
        <div className="mb-3 ml-6 pr-6 flex flex-col items-center md:ml-20 md:pr-20">
            <div className="w-full flex justify-between items-center mb-3 max-w-[850px]">
                <div className="flex">
                    <div className="">
                        <select onChange={filterStatus} className="bg-slate-50 text-blue-950 text-xs font-bold hover:opacity-50 hover:cursor-pointer md:text-base">
                            <option value="0">Filter by Status</option>
                            <option value="1">Paid</option>
                            <option value="2">Pending</option>
                            <option value="3">Cancelled</option>
                            <option value="0">All</option>
                        </select>
                    </div>
                    <div className="pl-2 md:pl-5">
                        <select onChange={sort} className="bg-slate-50 text-blue-950 text-xs font-bold hover:opacity-50 hover:cursor-pointer md:text-base">
                            <option value="invoice_id">Sort by</option>
                            <option value="invoice_id">Invoice ID</option>
                            <option value="invoice_total">Invoice Total</option>
                            <option value="due">Due Date</option>
                            <option value="created">Created Date</option>
                        </select>
                    </div>
                </div>
                <div className="flex hover:opacity-50 hover:cursor-pointer">
                    <NewInvoiceButton />
                </div>
            </div>
            <div className="flex flex-col w-full max-w-[850px]">
                {invoices.map(invoice => {
                    return (
                        <InvoiceSummary key={invoice.invoice_id} id={invoice.id} invoiceID={invoice.invoice_id} invoiceTotal={invoice.invoice_total} invoiceName={invoice.name} invoiceStat={invoice.status_name} invoiceDue={invoice.due} />
                    )
                })}
            </div>
        </div>
    )
}