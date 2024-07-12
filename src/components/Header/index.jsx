import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Header() {
    const [unpaid, setUnpaid] = useState(0)

    useEffect(() => {
        fetch('https://invoicing-api.dev.io-academy.uk/invoices?status=2')
            .then(res => res.json())
            .then(invoices => {
                let counter = invoices.data.length
                setUnpaid(counter)
            })
    }, [])

    return (
        <header id="top" className="bg-slate-50 pt-4 pb-2 mb-2 ml-6 pr-6 flex justify-center md:ml-20 md:pr-20">
            <div className="w-full flex justify-between max-w-[850px]">
                <div className="hover:opacity-50">
                    <Link to="/">
                        <h1 className="pb-3 text-3xl font-semibold">Invoices</h1>
                        <p className="pb-3 text-slate-600" >There are {unpaid} unpaid invoices</p>
                    </Link>
                </div>
                <div></div>
            </div>
        </header>
    )
}