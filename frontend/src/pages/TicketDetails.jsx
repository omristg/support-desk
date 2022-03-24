import { useEffect } from "react"
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getById, reset } from '../features/tickets/ticket.slice'
import { toast } from 'react-toastify'
import { Spinner } from '../cmps/Spinner'
import { BackButton } from '../cmps/BackButton'

export const TicketDetails = () => {

    const { ticket, isLoading, isSuccess, isError, message } = useSelector(({ ticket }) => ticket)

    const dispatch = useDispatch()
    const { ticketId } = useParams()

    useEffect(() => {
        return () => {
            if (isSuccess) dispatch(reset())
        }
    }, [isSuccess, dispatch])

    useEffect(() => {
        if (isError) toast.error(message)
        dispatch(getById(ticketId))
    }, [dispatch, ticketId, isError, message])

    if (isLoading) return <Spinner />
    if (isError) return <h3>Something went wrong</h3>

    const { _id, description, status, createdAt } = ticket

    return (
        <div className="ticket-details">
            <header className="ticket-header">
                <BackButton url="/ticket" />
                <h2>
                    Ticket ID: {_id}
                    <span className={`status status-${status}`}>
                        {status}
                    </span>
                </h2>
                <h3>{new Date(createdAt).toLocaleString('en-US')}</h3>
                <hr />
                <div className="ticket-desc">
                    <h3>Description of the issue</h3>
                    <p>{description}</p>
                </div>
            </header>

        </div>
    )
}