export default function InvoiceDetails({ desc, quant, cost, subTotal }) {

    return (
        <div>
            <div className="grid grid-cols-[3fr_2fr_1fr_3fr] gap-3 py-1 border-b-2 md:grid-cols-[3fr_1fr_1fr_1fr]">
                <p>{desc}</p>
                <p className="text-right md:text-left">{quant}</p>
                <p className="text-right md:text-left">£{cost}</p>
                <p className="font-bold text-right">£{subTotal}</p>
            </div>
        </div>
    )
}