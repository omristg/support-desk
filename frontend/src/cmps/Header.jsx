import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export const Header = () => {

    return (
        <div className="header">
            <div className="logo">
                <Link to="/">Support Desk</Link>
            </div>
            <ul>
                <li>
                    <Link to="/login">
                        <FaSignInAlt /> Login
                    </Link>
                </li>
                <li>
                    <Link to="/register">
                        <FaSignOutAlt /> Register
                    </Link>
                </li>
            </ul>
        </div>
    )
}