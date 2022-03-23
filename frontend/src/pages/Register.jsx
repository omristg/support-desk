import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'

export const Register = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    })

    const { username, email, password, password2 } = formData

    const handleChange = ({ target }) => {
        setFormData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const onSubmit = (ev) => {
        ev.preventDefault()
        toast.success('Submit')

    }

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
                        />
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            value={email}
                            placeholder="Enter your Email"
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            placeholder="Enter password"
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            className="form-control"
                            name="password2"
                            value={password2}
                            placeholder="Confirm password"
                            onChange={handleChange}
                        />
                    </div>
                    <button>Submut</button>
                </form>
            </section>
        </>
    )
}