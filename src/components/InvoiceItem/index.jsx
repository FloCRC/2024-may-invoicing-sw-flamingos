import { useEffect, useState } from "react"

export default function InvoiceItem({addItem, removeItem, index, quantState, rateState, descState, totalState}) {

    const [total, setTotal] = useState(0)
    const [quantityNew, setQuantityNew] = useState(0)
    const [rateNew, setRateNew] = useState(0)

    function quantity(e) {
        const quantitySum = Number(e.target.value)
        quantState(index, quantitySum)
        setQuantityNew(quantitySum)
        setTotal((rateNew * e.target.value).toFixed(2))
    }

    function rate(e) {
        const rateSum = Number(e.target.value)
        rateState(index, rateSum)
        setRateNew(rateSum)
        setTotal((quantityNew * e.target.value).toFixed(2))
    }

    function desc(e) {
        const description = (e.target.value)
        descState(index, description)
    }

    function bigTotal() {
        totalState(index, total)
    }

    useEffect(bigTotal, [total])

    return (
        <div className="grid grid-cols-5 max-w-[850px] border-b-2 mb-1 pt-1">
            <textarea onChange={desc} placeholder="description" className="h-[100px] rounded border px-3" />
            <input onChange={quantity} type="number" step="1" placeholder="quantity" className="h-10 rounded border ml-2 px-3"/>
            <div className="flex flex-wrap mb-4 relative h-10 ml-2">
                <div className="flex">
                    <span className="flex items-center bg-gray-200 rounded rounded-r-none border border-r-0 px-3">£</span>
                </div>
                <input onChange={rate} type="number" step=".01" className="flex-grow w-px border rounded rounded-l-none px-3 relative" placeholder="rate" />
            </div>
            <p className="ml-2">£{total}</p>
            <div className="flex flex-col">
                <button onClick={addItem} className="m-3 text-2xl bg-green-600 rounded w-12 text-white">+</button>
                <button onClick={removeItem} className="m-3 text-2xl bg-red-600 rounded w-12 text-white">-</button>
            </div>
        </div>
    )
}