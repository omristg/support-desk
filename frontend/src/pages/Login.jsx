import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa'
import { login, reset } from '../features/auth/auth.slice'
import { Spinner } from '../cmps/Spinner'
import { useNavigate } from 'react-router-dom'

export const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth)

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    })

    const { email, password } = formData

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
        dispatch(login(formData))
    }

    if (isLoading) return <Spinner />

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Please login to get support</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
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
                    </div>
                    <button className="btn btn-block">Submit</button>
                </form>
            </section>
        </>
    )
}