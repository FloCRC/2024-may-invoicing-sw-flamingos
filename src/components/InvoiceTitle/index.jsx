import { Link } from "react-router-dom";

export default function InvoiceTitle({ invoiceID }) {

    return (
        <div className="flex justify-between items-center border-b-2 pb-1">
            <p className="ml-4 font-bold md:ml-6">Invoice <span className=" text-slate-500">#</span>{invoiceID}</p>
            <Link to='/' ><i className="fa-solid fa-xmark text-slate-500 pt-3 pr-4 pb-2 hover:opacity-50 md:pr-5"></i></Link>
        </div>
    )
}