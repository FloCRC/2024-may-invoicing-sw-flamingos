import { useEffect, useState } from "react"
import DropdownClients from "../DropdownClients";

export default function NewInvoiceTitleBlock({ clientState }) {

    const now = new Date();
    const next30Days = now.getTime() + 30 * 24 * 60 * 60 * 1000;
    const next30DaysDate = new Date(next30Days);
    const formattedDueDate = next30DaysDate.toLocaleDateString('en-uk');
    const formattedDate = now.toLocaleDateString('en-uk')

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const splitDate = formattedDate.split('/')
    const splitDueDate = formattedDueDate.split('/')
    const month = splitDate[1] - 1
    const monthDue = splitDueDate[1] - 1
    const wordMonth = monthNames[month]
    const wordMonthDue = monthNames[monthDue]
    const newDate = `${splitDate[0]} ${wordMonth} ${splitDate[2]}`
    const newDueDate = `${splitDueDate[0]} ${wordMonthDue} ${splitDueDate[2]}`

    const [clients, setClients] = useState([])

    useEffect(() => {
        fetch('https://invoicing-api.dev.io-academy.uk/clients')
            .then(res => res.json())
            .then(clientList => {
                setClients(clientList.data)
            }
            )
    }, [])

    return (
        <div className="flex justify-between px-1 py-3 border-b-2 md:px3">
            <div className="flex flex-col ml-5">
                <div>
                    <p className="font-bold">From</p>
                    <p className="text-sm md:text-base">SW Flamingos Ltd</p>
                    <p className="text-sm md:text-base">The Saltflats</p>
                    <p className="text-sm md:text-base">Bolivia</p>
                    <br />
                    <p className="font-bold">To</p>
                    <DropdownClients clients={clients} clientState={clientState} />
                </div>
            </div>
            <div className="pr-5 md:pr-20">
                <div>
                    <p className="font-bold">Status</p>
                    <div className="md:pt-2"><div className="border border-yellow-400 rounded-lg"><p className="py-1 px-3 text-yellow-400">&#x2022; Pending</p></div></div>
                    <br />
                    <p className="font-bold">Created</p>
                    <p className="text-sm md:text-base">{newDate}</p>
                    <br />
                    <p className="font-bold">Due</p>
                    <p className="text-sm md:text-base">{newDueDate}</p>
                </div>
            </div>
        </div>
    )
}