import { Link } from "react-router-dom";
import StatusBox from "../StatusBox";

export default function InvoiceSummary({id, invoiceID, invoiceTotal, invoiceName, invoiceStat, invoiceDue }) {
    return (

        <Link to={`/viewinvoice/${id}`}>
            <div className="text-sm relative my-2 p-4 bg-white border-2 max-w-[850px]">
                <div className="flex flex-col justify-between md:flex-row md:justify-start">
                    <div className="flex items-center justify-between">
                        <p className="font-bold md:pr-5">#{invoiceID}</p>
                        <p className="text-slate-500 md:pr-5">{invoiceDue}</p>
                        <p className="text-slate-500 md:pr-5">{invoiceName}</p>
                    </div>
                    <span className="flex pt-4 md:pt-0">
                        <p className="text-lg font-bold ">£{invoiceTotal}</p>
                    </span>
                </div>
                <span className="flex justify-end absolute right-4 bottom-1 pb-1">
                    <StatusBox invoiceDue={invoiceDue} invoiceStatus={invoiceStat} />
                    <p className="hidden text-slate-600 text-2xl pl-3 md:block"><i className="fa-solid fa-angle-right"></i></p>
                </span>
            </div>
        </Link>
    )
}