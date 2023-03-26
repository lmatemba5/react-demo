import React, { useEffect, useState, createContext, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useConsumer, useResource } from "../apis/ContextAPIProvider";
import { PersistenceAPI } from "../apis/TitleProvider";
import PaymentModal from "../modals/PaymentModal";
import ClientModal from "../modals/ClientModal"
import Swal from "sweetalert2";
import Popup from '../apis/Popup'
import UserModal from "../modals/UserModal";
import PasswordModal from "../modals/PasswordModal";

const ModalResources = createContext()

export const useModalResource = () => {
    const modals = useContext(ModalResources)

    if (modals === undefined || modals === null) {
        throw Error("ModalResource is undefined")
    }

    return modals
}

export default function MainLayout() {
    const { isLoggedin, updateState } = useConsumer()
    const users = useResource()('users')
    const payments = useResource()('payments')
    const clients = useResource()('clients')

    const [showPayForm, setShowpayform] = useState(false)
    const [showClientForm, setShowclientform] = useState(false)
    const [client, setClient] = useState(null)
    const [user, setUser] = useState(null)
    const [showUserModal, setShowusermodal] = useState(false)
    const [showPasswordform, setShowPasswordFrom] = useState(false)

    const updateObject = (key, value) => {
        switch (key) {
            case 'client':
                setClient(value)
                toggleModal('client')
                break;
            case 'user':
                setUser(value)
                toggleModal('user')
                break;
            default:
                break;
        }
    }

    const toggleModal = (key) => {
        let val = null

        switch (key) {
            case 'client':
                val = !showClientForm
                if (val === false) {
                    setClient(null)
                }

                setShowclientform(val)
                break;
            case 'user':
                val = !showUserModal
                if (val === false) {
                    setUser(null)
                }

                setShowusermodal(val)
                break;
            case 'payment':
                setShowpayform(!showPayForm)
                break;
            case 'password':
                setShowPasswordFrom(!showPasswordform)
                break;
            default:
                break;
        }
    }

    const handleFormSubmit = async (event, key) => {
        Popup("Processing....", true)

        event.preventDefault()
        let data = Object.fromEntries(new FormData(event.target))

        toggleModal(key)
        let value = null

        
        try {

            if (key.startsWith('payment')) {
                const clt = clients.filter(f=> f.id === Number(data.client))[0]
                const createDate = ()=>{
                    let date = new Date().toDateString();
                    date = date.split(" ");
                    date = date[2]+" "+date[1].toUpperCase()+" "+date[3]
                    return date
                }

                const createTime = ()=>{
                    let time = new Date().toLocaleTimeString().toLowerCase();
                    time = time.split(" ");
                    time[0] = time[0].split(":")

                    if(Number(time[0][0]) < 10){
                        time[0][0] = "0"+time[0][0]
                    }

                    time[0] = time[0][0]+":"+time[0][1]

                    return time[0]+" "+time[1]
                }

                data = {
                    name: clt.name,
                    client: Number(data.client),
                    paid: Number(data.amount),
                    carry: clt.carry,
                    category: clt.category,
                    subscription: clt.subscription,
                    tax: Number(data.tax ? data.tax : clt.tax),
                    date: createDate(),
                    time: createTime(),
                    receipt: Number((Math.random() * 10000).toFixed(0))
                }

                value = payments
                value.push(data)
            } else if (key.startsWith('client')) {
                if (client) {
                    value = clients.filter(f => f.id !== client.id)
                    data = {
                        ...data,
                        status: client.status,
                        subscription: Number(data.subscription),
                        id: client.id,
                        category: Number(data.category),
                        carry: client.carry,
                        tax: client.tax,
                        checked: client.checked,
                        visits: client.visits
                    }
                } else {
                    value = clients
                    data = {
                        ...data,
                        status: 1,
                        category: Number(data.category),
                        id: clients.length + 1,
                        subscription: Number(data.subscription),
                        carry: Number((Math.random() * 1000).toFixed(0)),
                        tax: Number((Math.random() * 10).toFixed(0)),
                        checked: false,
                        visits: Number((Math.random() * 5).toFixed(0))
                    }
                }

                value.push(data)
            } else if (key.startsWith('user')) {
                if (user) {
                    value = users.filter(f => f.id !== user.id);
                    data = { ...data, status: user.status, role: Number(data.role) }
                } else {
                    data = { ...data, id: users.length + 1, status: 0 }
                    value = users
                }

                value.push(data)
            } else if (key.startsWith('password')) {
                if (!data.npwd.startsWith(data.cnpwd)) {
                    Swal.fire({
                        title: "Passwords mismatch",
                        icon: 'info'
                    })
                    return
                }

                data = { npwd: data.npwd, id: PersistenceAPI().id }
            }

            const interval = setTimeout(() => {
                Popup("Operation was successful")
                switch (key) {
                    case 'user':
                        updateState('users', value)
                        break;
                    case 'payment':
                        updateState('payments', value)
                        break
                    case 'client':
                        updateState('clients', value)
                        break;
                    default:
                        break;
                }

                clearTimeout(interval)
            }, 2000)

        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: "Oops!, Something went wrong, check your internet and try again",
                icon: 'error'
            })
        }
    }

    useEffect(() => {
        if (isLoggedin() === false) {
            const user = PersistenceAPI()

            if (user) {
                updateState('user', user)
            }
        }

    }, [isLoggedin, updateState])

    if (isLoggedin()) {
        return (
            <div id="container">
                <Sidebar />

                <ModalResources.Provider value={{ toggleModal, updateObject }}>
                    <main className="main">
                        <Topbar />
                        <Outlet />
                    </main>
                </ModalResources.Provider>

                <PasswordModal show={showPasswordform} toggleModal={toggleModal} handleSubmit={handleFormSubmit} />
                <PaymentModal toggleModal={toggleModal} show={showPayForm} handleSubmit={handleFormSubmit} />
                <ClientModal client={client} toggleModal={toggleModal} show={showClientForm} handleSubmit={handleFormSubmit} />
                <UserModal user={user} toggleModal={toggleModal} handleSubmit={handleFormSubmit} show={showUserModal} />
            </div>
        )
    } else {
        return (
            <Navigate to="/login" replace />
        )
    }
} 