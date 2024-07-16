import { useEffect, useState } from "react"

export default function StatusIcon({ invoiceStatus, invoiceDue }) {

    const [todayDateParsed, setTodayDateParsed] = useState(0)
    const [dateDue, setDateDue] = useState(0)

    useEffect(() => {
        let dateString = `${invoiceDue}T00:00:00`
        setDateDue(Date.parse(dateString))
        const todaysDate = new Date()
        let day = todaysDate.getDate()
        const year = todaysDate.getFullYear()
        let month = todaysDate.getMonth()
        month = month + 1
        if (day < 10) {
            day = `0${day}`
        }
        if (month < 10) {
            month = `0${month}`
        }
        const todaysDateFormat = `${year}-${month}-${day}T00:00:00`
        setTodayDateParsed(Date.parse(todaysDateFormat))
    }, [invoiceDue])

    const paid = <div className="border border-green-400 rounded-lg">
        <p className="py-1 px-3 text-green-400">&#x2022; {invoiceStatus}</p></div>

    const cancelled = <div className="border border-slate-400 rounded-lg">
        <p className="py-1 px-3 text-slate-400">&#x2022; {invoiceStatus}</p></div>

    const overdue = <div className="border border-red-400 rounded-lg">
        <p className="py-1 px-3 text-red-400">&#x2022; Overdue</p></div>

    const pending = <div className="border border-yellow-400 rounded-lg">
        <p className="py-1 px-3 text-yellow-400">&#x2022; {invoiceStatus}</p></div>

    return (
        <div className="mb-2">
            {invoiceStatus === 'Paid' ? paid :
                invoiceStatus === 'Cancelled' ? cancelled :
                    invoiceStatus === 'Pending' && dateDue < todayDateParsed ? overdue : pending
            }
        </div>
    )
}