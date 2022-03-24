import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useAuthStatus = () => {
    const { user } = useSelector(state => state.auth)

    const [checkingStatus, setCheckingStatus] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        if (user) setLoggedIn(true)
        else setLoggedIn(false)

        setCheckingStatus(false)
    }, [user])

    return { loggedIn, checkingStatus }
}