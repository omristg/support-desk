import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { NewTicket } from './pages/NewTicket'
import { PrivateRoute } from './pages/PrivateRoute'
import { Header } from './cmps/Header'

export const RootCmp = () => {

	return (
		<>
			<Router>
				<div className="container">
					<Header />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/new-ticket" element={<PrivateRoute />} >
							<Route path="/new-ticket" element={<NewTicket />} />
						</Route>
					</Routes>
				</div>
			</Router>
			<ToastContainer
				position="top-right"
				autoClose={1500}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				pauseOnHover={true}
			/>
		</>
	)
}