import { Link } from "react-router-dom";

export default function NewInvoiceButton() {

    return (
        <Link to='/NewInvoice'>
            <div className="bg-blue-950 h-8 w-24 rounded flex justify-center items-center text-white text-xs shadow-md hover:shadow-none md:text-base md:h-10 md:w-36">
                <div><i className="fa-solid fa-square-plus md:pr-2"></i> New Invoice</div>
            </div>
        </Link>
    )
}