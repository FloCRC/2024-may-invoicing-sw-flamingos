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
                setMessage(`You have successfully added your invoice`)
                setButtonDisplay(<Link to='/'><button className="bg-gray-600 p-2 text-white rounded ml-3">Home</button></Link>)
            }
            else (
                setMessage('Please complete all fields')
            )
        }).then(data => {

        })
    }

    function successMessage(e) {
        e.preventDefault()
    }

    return (
        <div className="w-full mb-5 flex flex-col items-center ml-6 pr-12 md:ml-20 md:pr-40">
            <div className="w-full py-1 max-w-[850px] border-2 bg-white md:p-3">
                <NewInvoiceTitle />
                <form onSubmit={successMessage} className="bg-white px-2">
                    <NewInvoiceTitleBlock clientState={updateClient} />
                    <div className="px-1 py-3 mx-5 max-w-[850px] text-sm md:text-base md:px-3">
                        <div className="grid grid-cols-[3fr_2fr_1fr_3fr_1fr] pb-2 font-bold gap-3 border-b-2 md:mb-1 md:grid-cols-5">
                            <p className="md:hidden">Desc.</p><p className="hidden md:block">Description</p>
                            <p className="text-right md:hidden">Quan.</p><p className="hidden md:block">Quantity</p>
                            <p className="text-right md:text-left">Rate</p>
                            <p className="text-right md:text-left">Total</p>
                            <p></p>
                        </div>
                        {list.map((item, index) => <div key={index}><InvoiceItem quantState={updateQuantity} rateState={updateRate} descState={updateDesc} index={index} addItem={addItem} removeItem={removeItem} totalState={updateTotal} />
                        </div>)}
                    </div>
                    <div className="grid grid-cols-[0fr_1fr_1fr] py-1 px-1 bg-yellow-400 shadow-md md:grid-cols-[4fr_1fr_1fr] md:px-0 md:pr-1 md:mx-4">
                        <p></p>
                        <p className="font-bold">Total</p>
                        <p className="font-bold text-right">£{list.reduce((carry, item) => carry + item.total, 0)}</p>
                    </div>
                    <div className="flex justify-end max-w-[850px] p-3">
                        <button type='Submit' onClick={createInvoice} className="bg-green-600 p-2 text-white rounded">Create Invoice</button>
                        <Link to="/"><button className="bg-red-600 p-2 text-white rounded ml-3">Cancel Invoice</button></Link>
                    </div>
                </form>
                <div className="flex pb-2 max-w-[850px]">
                    <p className="pt-2">{message}</p>
                    <p>{buttonDisplay}</p>
                </div>
            </div>
        </div>
    )
}