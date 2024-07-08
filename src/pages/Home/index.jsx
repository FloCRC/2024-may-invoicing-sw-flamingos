import { Link } from "react-router-dom";
import InvoiceList from "../../components/InvoiceList";
import { useEffect } from "react";

export default function Home() {
       
    return (
        <div>
            <InvoiceList />
            <a href="#top">
                <div onClick={window.scrollTo(0, 0)} className="fixed bottom-5 right-1 text-slate-600 flex md:right-5 hover:opacity-50">
                    <p><i class="fa-solid fa-angle-up"></i></p>
                    <p className="hidden pl-1 md:block">Top</p>
                </div>
            </a>
        </div>
    )
}