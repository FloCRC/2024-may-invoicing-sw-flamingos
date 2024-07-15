import { useEffect, useState } from "react"

export default function InvoiceItem({ addItem, removeItem, index, quantState, rateState, descState, totalState, listLength, created }) {

    const [total, setTotal] = useState(0)
    const [quantityNew, setQuantityNew] = useState(0)
    const [rateNew, setRateNew] = useState(0)

    function quantity(e) {
        const quantitySum = Number(e.target.value)
        quantState(index, quantitySum)
        setQuantityNew(quantitySum)
        setTotal(Math.round((rateNew * e.target.value + Number.EPSILON) * 100) / 100)
    }

    function rate(e) {
        const rateSum = Number(e.target.value)
        rateState(index, rateSum)
        setRateNew(rateSum)
        setTotal(Math.round((quantityNew * e.target.value + Number.EPSILON) * 100) / 100)
    }

    function desc(e) {
        const description = (e.target.value)
        descState(index, description)
    }

    function bigTotal() {
        totalState(index, total)
    }

    useEffect(bigTotal, [total])

    const minusButton = <button onClick={removeItem} className="w-8 mx-1 text-2xl bg-red-400 rounded text-white hover:opacity-50 md:w-12 md:mx-3">-</button>
    const disabledMinusButton = <div className="w-8 mx-1 text-2xl bg-red-400 rounded text-white opacity-50 text-center md:w-12 md:mx-3">-</div>
    const plusButton = <button onClick={addItem} className="w-8 mx-1 text-2xl bg-green-400 rounded text-white hover:opacity-50 md:w-12 md:mx-3">+</button>
    const disabledPlusButton = <div className="w-8 mx-1 text-2xl bg-green-400 rounded text-white opacity-50 text-center md:w-12 md:mx-3">-</div>

    return (
        <div className="grid grid-cols-[3fr_3fr_3fr_3fr_1fr] max-w-[850px] border-b-2 mb-1 py-1 text-xs md:grid-cols-[3fr_3fr_3fr_2fr_1fr] md:text-base md:pb-2">
            <textarea onChange={desc} placeholder="description" className="h-[100px] rounded border px-3" />
            <div className="flex"><input onChange={quantity} type="number" step="1" placeholder="quantity" className="flex flex-wrap flex-grow w-px h-10 rounded border ml-2 px-3" /></div>
            <div className="flex flex-wrap mb-4 relative h-10 ml-2">
                <div className="flex">
                    <span className="flex items-center bg-gray-200 rounded rounded-r-none border border-r-0 px-1">£</span>
                </div>
                <input onChange={rate} type="number" step=".01" className="flex-grow w-px border rounded rounded-l-none px-3 relative" placeholder="rate" />
            </div>
            <p className="ml-2">£{total}</p>
            <div className="flex flex-col justify-around items-end">
                {created ? disabledPlusButton : plusButton}
                {created ? disabledMinusButton : listLength <= 1 ? disabledMinusButton : minusButton}
            </div>
        </div>
    )
}