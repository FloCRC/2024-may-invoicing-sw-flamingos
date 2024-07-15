import { Link } from "react-router-dom";

export default function NewInvoiceTitle({ invoiceID }) {

    return (
        <div className="flex justify-between items-center border-b-2 pb-1">
            <p className="ml-4 font-bold md:ml-6">New Invoice</p>
            <Link to='/' ><i className="fa-solid fa-xmark text-slate-500 pt-3 pr-4 pb-2 hover:opacity-50 md:pr-5"></i></Link>
        </div>
    )
}