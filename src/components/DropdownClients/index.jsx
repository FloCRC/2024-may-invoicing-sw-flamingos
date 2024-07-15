export default function DropdownClients({ clients, clientState }) {

    function clientId(e) {
        const clientSelect = (e.target.value)
        clientState(clientSelect)
    }

    return (
        <select onChange={clientId} className="text-sm rounded border h-8 pl-3 bg-white w-32 md:w-auto md:text-base">
            <option className="bg-white pl-3" value="">Client List</option>
            {clients.map(client => <option key={client.id} value={client.id}>{client.name}</option>)}
        </select>
    )
}