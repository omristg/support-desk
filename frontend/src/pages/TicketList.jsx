import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { query, reset } from '../features/tickets/ticket.slice'
import { toast } from 'react-toastify'
import { Spinner } from '../cmps/Spinner'
import { BackButton } from '../cmps/BackButton'
import { TicketPreview } from "../cmps/TicketPreview"


export const TicketList = () => {

    const { tickets, isLoading, isSuccess, isError, message } = useSelector(({ ticket }) => ticket)

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            if (isSuccess) dispatch(reset())
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        dispatch(query())
    }, [dispatch])

    useEffect(() => {
        if (isError) toast.error(message)
    }, [isError, message])


    if (isLoading) return <Spinner />

    return (
        <>
            <BackButton url="/" />
            <h1>Tickets</h1>
            <div className="tickets">
                <div className="ticket-headings">
                    <div>Product</div>
                    <div>Description</div>
                    <div>Status</div>
                    <div></div>
                </div>
                {tickets.map(ticket => (
                    <TicketPreview key={ticket._id} ticket={ticket} />
                ))}
            </div>
        </>
    )
}