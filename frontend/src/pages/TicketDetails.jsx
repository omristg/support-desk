import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getById, reset, closeTicket } from '../features/tickets/ticket.slice'
import { getNotes, addNote, reset as noteReset } from '../features/note/note.slice'
import { FaPlus } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { Spinner } from '../cmps/Spinner'
import { BackButton } from '../cmps/BackButton'
import { NotePreview } from "../cmps/NotePreview"

const customStyles = {
    content: {
        width: '80%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative',
    },
}

Modal.setAppElement('#root')

export const TicketDetails = () => {

    const { ticket, isLoading, isSuccess, isError, message } = useSelector(({ ticket }) => ticket)
    const { notes, isLoading: noteIsLoading } = useSelector(({ note }) => note)

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { ticketId } = useParams()

    useEffect(() => {
        return () => {
            if (isSuccess) dispatch(reset())
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (isError) toast.error(message)
        dispatch(getById(ticketId))
        dispatch(getNotes(ticketId))
    }, [dispatch, ticketId, isError, message])

    const onCloseTicket = async () => {
        await dispatch(closeTicket(ticketId))
        toast.success('Ticket closed')
        navigate('/ticket')
    }

    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

    const onNoteSubmit = async (ev) => {
        ev.preventDefault()
        dispatch(addNote({ noteText, ticketId }))
        closeModal()
    }

    if (isLoading || noteIsLoading) return <Spinner />
    if (isError) return <h3>Something went wrong</h3>

    const { _id, product, description, status, createdAt } = ticket

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
                <h3>Product: {product}</h3>
                <hr />
                <div className="ticket-desc">
                    <h3>Description of the issue</h3>
                    <p>{description}</p>
                </div>
                <h2>Notes</h2>
            </header>

            {status !== 'closed' && (
                <button className="btn" onClick={openModal}><FaPlus />Add Note</button>
            )}

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}
                contentLabel="Add note" >
                <h2>Add Note</h2>
                <button className="btn-close" onClick={closeModal}>X</button>
                <form onSubmit={onNoteSubmit}>
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            value={noteText}
                            onChange={({ target }) => setNoteText(target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn">Submit</button>
                    </div>
                </form>
            </Modal >

            {
                notes.map(note => (
                    <NotePreview key={note._id} note={note} />
                ))
            }

            {
                status !== 'closed' && (
                    <button className="btn btn-block btn-danger"
                        onClick={onCloseTicket}>Close Ticket</button>
                )
            }

        </div >
    )
}