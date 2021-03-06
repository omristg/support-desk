import { Link } from "react-router-dom"

export const TicketPreview = ({ ticket }) => {

    const { _id, product, status, createdAt } = ticket

    return (
        <div className="ticket-preview">
            <div>{new Date(createdAt).toLocaleString('en-US')}</div>
            <div>{product}</div>
            <div className={`status status-${status}`}>{status}</div>
            <Link to={`/ticket/${_id}`} className="btn btn-reverse btn-sm">
                View
            </Link>
        </div>
    )
}