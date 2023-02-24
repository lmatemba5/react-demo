import { createContext, useContext, useState, useCallback } from "react";
import USERS from './users'
import CLIENTS from './clients'
import PAYMENTS from './payments'

//Defining contexts
const SharedResources = createContext()
const ResourceConsumers = createContext()

//context fetching hook
export const useResource = () => {
    const resource = useContext(SharedResources)

    if (resource === undefined) {
        throw Error("Resources are undefined")
    }

    return resource
}

export const useConsumer = () => {
    const consumer = useContext(ResourceConsumers)

    if (consumer === undefined) {
        throw Error("Resource Consumer are undefined")
    }

    return consumer
}

export const ContextAPIProvider = ({ children }) => {

    const [users, setUsers] = useState(USERS)
    const [payments, setPayments] = useState(PAYMENTS)
    const [clients, setClients] = useState(CLIENTS)
    const [user, setUser] = useState(null)

    const isLoggedin = () => {
        return user ? true : false
    }

    const getRole = () => {
        return user.role
    }

    const token = () => {
        return user ? user.extras.token : null
    }

    const logout = async () => {
        localStorage.clear()
        updateState('user', null)
    }

    const updateState = useCallback(async (key, value) => {
        switch (key) {
            case 'user':
                localStorage.setItem('user', (value !== null) ? JSON.stringify(value) : null)
                setUser(value)
                break;
            case 'users':
                setUsers(value)
                break;
            case 'clients':
                setClients(value)
                break;
            case 'payments':
                setPayments(value)
                break;
            default:
                break
        }
    }, [])


    const getResource = (key) => {
        switch (key) {
            case 'user':
                return user
            case 'users':
                return users
            case 'clients':
                return clients
            case 'payments':
                return payments
            default:
                break
        }
    }

    return (
        <SharedResources.Provider value={getResource}>
            <ResourceConsumers.Provider value={{ setClients, updateState, isLoggedin, logout, token, getRole }}>
                {children}
            </ResourceConsumers.Provider>
        </SharedResources.Provider>
    );

}

export default ContextAPIProvider