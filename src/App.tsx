import './App.css'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import RootLayout from "./components/RootLayout.tsx";
import Crops from "./pages/Crops.tsx";
import Fields from "./pages/Fields.tsx";
import { Provider } from "react-redux";
import store from "./store/Store.ts";
import Staff from "./pages/Staff.tsx";
import Vehicles from "./pages/Vehicles.tsx";
import Profile from "./pages/Profile.tsx";
import Equipment from "./pages/Equipment.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import { useEffect, useState } from "react";

function App() {
    const [login, setLogin] = useState(false);
    console.log("setLogin : ", setLogin);

    useEffect(() => {
        console.log(localStorage.getItem);
        if (localStorage.getItem('token')) {
            setLogin(true);
        }
    }, []);

    const routes = createBrowserRouter([
        {
            path: '/', element: login ? <Navigate to="/dash/home" /> : <Login />,
        },
        {
            path: '/register', element: <Register />
        },
        {
            path: '/dash', element: login ? <RootLayout /> : <Navigate to="/" />,
            children: [
                { path: 'home', element: <Home /> },
                { path: 'crops', element: <Crops /> },
                { path: 'fields', element: <Fields /> },
                { path: 'staffs', element: <Staff /> },
                { path: 'vehicles', element: <Vehicles /> },
                { path: 'profiles', element: <Profile /> },
                { path: 'equips', element: <Equipment /> }
            ]
        }
    ]);

    return (
        <Provider store={store}>
            <RouterProvider router={routes} />
        </Provider>
    )
}

export default App;
