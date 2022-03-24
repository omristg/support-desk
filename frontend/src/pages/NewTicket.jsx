import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { createTicket, reset } from '../features/tickets/ticket.slice'
import { toast } from 'react-toastify'
import { Spinner } from '../cmps/Spinner'


export const NewTicket = () => {

    const { user } = useSelector(({ auth }) => auth)
    const { isLoading, isSuccess, isError, message } = useSelector(({ ticket }) => ticket)

    const [product, setProduct] = useState('iPhone')
    const [description, setDescription] = useState('')
    const { username, email } = user

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSubmit = (ev) => {
        ev.preventDefault()
        const ticketData = {
            product,
            description
        }
        dispatch(createTicket(ticketData))
    }

    useEffect(() => {
        console.log(message);
        if (isError) toast.error(message)
        if (isSuccess) navigate('/ticket')
        dispatch(reset())

    }, [isError, isSuccess, message, navigate, dispatch])

    if (isLoading) return <Spinner />

    return (
        <>
            <section className="heading">
                <h1>Create new ticket</h1>
                <p>Please fill out the form below</p>
            </section>

            <section className="form">
                <div className="form-group">
                    <label htmlFor="name">Customer Username</label>
                    <input type="text" className="form-control" value={username} disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Customer Email</label>
                    <input type="email" className="form-control" value={email} disabled />
                </div>

                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="product">Product</label>
                        <select
                            type="text"
                            id='product'
                            value={product}
                            onChange={({ target }) => setProduct(target.value)}
                        >
                            <option value="iPhone">iPhone</option>
                            <option value="iPad">iPad</option>
                            <option value="iMac">iMac</option>
                            <option value="MacBook">MacBook</option>
                            <option value="MacBook Pro">MacBook Pro</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description of the issue</label>
                        <textarea
                            id="description"
                            className="form-control"
                            value={description}
                            onChange={({ target }) => setDescription(target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Ssubmit</button>
                    </div>
                </form>
            </section>

        </>
    )
}