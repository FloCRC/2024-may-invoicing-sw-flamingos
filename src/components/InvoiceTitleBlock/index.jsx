import StatusIcon from '../StatusIcon';

export default function NewInvoiceTitleBlock({ client, address, city, dateDue, status, createdDate, dueDate }) {

    return (
        <div className="flex justify-between px-1 py-3 border-b-2 md:px-3">
            <div className="flex flex-col ml-5">
                <p className="font-bold">From</p>
                <p className="text-sm md:text-base">SW Flamingos Ltd</p>
                <p className="text-sm md:text-base">The Saltflats</p>
                <p className="text-sm md:text-base">Bolivia</p>
                <br />
                <p className="font-bold">To</p>
                <p className="text-sm md:text-base">{client}</p>
                <p className="text-sm md:text-base">{address}</p>
                <p className="text-sm md:text-base">{city}</p>
            </div>
            <div className="flex flex-col pr-5 md:pr-20">
                <p className="font-bold">Status</p>
                <div className="md:pt-2"><StatusIcon invoiceDue={dateDue} invoiceStatus={status} /></div>
                <br />
                <p className="font-bold">Created</p>
                <p className="text-sm md:text-base">{createdDate}</p>
                <br />
                <p className="font-bold">Due</p>
                <p className="text-sm md:text-base">{dueDate}</p>
            </div>
        </div>
    )
}