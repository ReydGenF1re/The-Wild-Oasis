import GlobalStyles from "./styles/GlobalStyles.jsx";
import React from "react"

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Cabins from "./pages/Cabins.jsx";
import Bookings from "./pages/Bookings.jsx";
import Settings from "./pages/Settings.jsx";
import Users from "./pages/Users.jsx";
import Account from "./pages/Account.jsx";
import Login from "./pages/Login.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./ui/AppLayout.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Toaster} from "react-hot-toast";
import Booking from "./pages/Booking.jsx";
import CheckIn from "./pages/CheckIn.jsx";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";
import {DarkModeProvider} from "./context/DarkModeContext.jsx";
import Guests from "./pages/Guests.jsx";

const client = new QueryClient(
    // {
    //     defaultOptions: {
    //         queries: {
    //             staleTime: 60 * 1000,
    //         }
    //     }
    // }
)
function App() {
    return <DarkModeProvider>
        <QueryClientProvider client={client}>
            <ReactQueryDevtools initialIsOpen={false} />
            <GlobalStyles/>
            <BrowserRouter>
                <Routes>
                    <Route element={<ProtectedRoute><AppLayout/></ProtectedRoute>}>
                        <Route index element={<Navigate to={"dashboard"} replace/>}/>
                        <Route path={'dashboard'} element={<Dashboard/>}/>
                        <Route path={'bookings'} element={<Bookings/>}/>
                        <Route path={'bookings/:bookingId'} element={<Booking/>}/>
                        <Route path={'check-in/:bookingId'} element={<CheckIn/>}/>
                        <Route path={'cabins'} element={<Cabins/>}/>
                        <Route path={'users'} element={<Users/>}/>
                        <Route path={'guests'} element={<Guests/>}/>
                        <Route path={'settings'} element={<Settings/>}/>
                        <Route path={'account'} element={<Account/>}/>
                    </Route>
                    <Route path={'login'} element={<Login/>}/>
                    <Route path={'*'} element={<PageNotFound/>}/>
                </Routes>
            </BrowserRouter>
            <Toaster position={'top-center'} gutter={12} containerStyle={{
                margin:'8px'
            }} toastOptions={{
                success: {
                    duration: 3000,
                },
                error: {
                    duration: 5000,
                },
                style: {
                    fontSize: '16px',
                    maxWidth:'500px',
                    padding: '16px 24px',
                    backgroundColor: 'var(--color-grey-0)',
                    color: 'var(--color-grey-700)',
                }
            }} />
        </QueryClientProvider>
    </DarkModeProvider>
}

export default App
