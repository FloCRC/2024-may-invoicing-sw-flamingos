import { useState } from "react";
import InvoiceItem from "../../components/InvoiceItem";
import NewInvoiceTitleBlock from "../../components/NewInvoiceTitleBlock";
import { Link } from "react-router-dom";
import NewInvoiceTitle from "../../components/NewInvoiceTitle";

export default function NewInvoice() {

    const [list, setList] = useState([{ quantity: 0, rate: 0, total: 0, description: '' }]);
    const [clientId, setClientId] = useState('')
    const [message, setMessage] = useState('')
    const [buttonDisplay, setButtonDisplay] = useState('')
    const [invoiceCreated, setInvoiceCreated] = useState(false);

    function addItem() {
        setList([...list, { quantity: 0, rate: 0, total: 0, description: '' }]);
    };

    function removeItem() {
        if (list.length > 1) {
            setList(list.splice(0, list.length - 1))
        }
    }

    let megaTotal = list.reduce((carry, item) => carry + item.total, 0)

    function updateQuantity(index, quantitySum) {
        const listCopy = [...list]
        listCopy[index].quantity = quantitySum
        setList(listCopy)
    }

    function updateRate(index, rateSum) {
        const listCopy = [...list]
        listCopy[index].rate = rateSum
        setList(listCopy)
    }

    function updateDesc(index, description) {
        const listCopy = [...list]
        listCopy[index].description = description
        setList(listCopy)
    }

    function updateTotal(index, total) {
        const listCopy = [...list]
        listCopy[index].total = total
        setList(listCopy)
    }

    function updateClient(clientIdNew) {
        setClientId(clientIdNew)
    }

    function createInvoice() {
        let newInvoice = {
            client: clientId,
            total: megaTotal,
            details: list
        }
        fetch('https://invoicing-api.dev.io-academy.uk/invoices', {
            method: "POST",
            body: JSON.stringify(newInvoice),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then(res => {
            res.json()
            if (res.status === 200) {
                setMessage(`You have successfully added your invoice!`)
                setButtonDisplay(<Link to='/'><button className="bg-gray-400 p-2 text-white rounded ml-3">Home</button></Link>)
                setInvoiceCreated(true);
            }
            else (
                setMessage('Please complete all fields.')
            )
        }).then(data => {
        })
    }

    function successMessage(e) {
        e.preventDefault()
    }

    const createButton = <button type='Submit' onClick={createInvoice} className="bg-green-400 text-white p-2 rounded shadow-md hover:opacity-50">Create Invoice</button>
    const disabledCreatebutton = <div className="bg-green-400 text-white p-2 rounded shadow-md opacity-50">Create Invoice</div>

    return (
        <div className="w-full mb-5 flex flex-col items-center ml-6 pr-12 md:ml-20 md:pr-40">
            <div className="w-full py-1 max-w-[850px] border-2 bg-white md:p-3">
                <NewInvoiceTitle />
                <form onSubmit={successMessage} className="bg-white md:px-2">
                    <NewInvoiceTitleBlock clientState={updateClient} />
                    <div className="px-1 py-3 mx-5 max-w-[850px] text-sm md:text-base md:px-3">
                        <div className="grid grid-cols-[3fr_2fr_1fr_3fr_1fr] pb-2 font-bold gap-3 border-b-2 md:mb-1 md:grid-cols-5">
                            <p className="md:hidden">Desc.</p><p className="hidden md:block">Description</p>
                            <p className="text-right md:hidden">Quan.</p><p className="hidden md:block">Quantity</p>
                            <p className="text-right md:text-left">Rate</p>
                            <p className="text-right md:text-left">Total</p>
                            <p></p>
                        </div>
                        {list.map((item, index) => <div key={index}><InvoiceItem quantState={updateQuantity} rateState={updateRate} descState={updateDesc} index={index} addItem={addItem} removeItem={removeItem} totalState={updateTotal} listLength={list.length} created={invoiceCreated} />
                        </div>)}
                    </div>
                    <div className="grid grid-cols-[0fr_1fr_1fr] text-sm mx-5 py-1 px-1 bg-yellow-400 shadow-md md:grid-cols-[4fr_1fr_1fr] md:px-0 md:pr-1 md:mx-4 md:text-base">
                        <p></p>
                        <p className="font-bold">Total</p>
                        <p className="font-bold text-right">£{list.reduce((carry, item) => carry + item.total, 0)}</p>
                    </div>
                    <div className="flex max-w-[850px] justify-end mt-3 mb-2 pl-5 pr-5 md:pl-0 md:mb-0">
                        <p className="pt-2">{message}</p>
                        <p className="pt-3 hover:opacity-50 md:pt-0">{buttonDisplay}</p>
                    </div>
                    <div className="flex justify-end max-w-[850px] text-sm mx-5 mb-3 md:text-base md:m-0 md:py-3 md:pr-5">
                        {!invoiceCreated ? createButton : disabledCreatebutton}
                    </div>
                </form>
            </div>
        </div>
    )
}