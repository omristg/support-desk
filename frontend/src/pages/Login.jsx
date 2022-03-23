import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa'
import { login } from '../features/auth/auth.slice'

export const Login = () => {

    const dispatch = useDispatch()
    const { user, isLoading, isSuccess, message } = useSelector(state => state.auth)

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    })

    const { email, password } = formData

    const handleChange = ({ target }) => {
        setFormData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const onSubmit = (ev) => {
        ev.preventDefault()
        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

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