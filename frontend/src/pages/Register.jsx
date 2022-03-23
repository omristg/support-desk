import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/auth.slice'
import { Spinner } from '../cmps/Spinner'

export const Register = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    // eslint-disable-next-line
    const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth)

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    })

    const { username, email, password, password2 } = formData

    useEffect(() => {
        if (isError) toast.error(message)
        if (isSuccess || user) navigate('/')
        dispatch(reset())

    }, [isError, isSuccess, message, navigate, dispatch, user])

    const handleChange = ({ target }) => {
        setFormData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const onSubmit = (ev) => {
        ev.preventDefault()
        if (password !== password2) return toast.error('Passwords don\'t match')
        const userData = {
            username,
            email,
            password
        }
        dispatch(register(userData))
    }

    if (isLoading) return <Spinner />

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            placeholder="Enter your name"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={email}
                            placeholder="Enter your Email"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            placeholder="Enter password"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            className="form-control"
                            name="password2"
                            value={password2}
                            placeholder="Confirm password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className="btn btn-block">Submit</button>
                </form>
                <button onClick={() => { navigate('/') }}>Click</button>
            </section>
        </>
    )
}