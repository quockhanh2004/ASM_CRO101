import React, { createContext, useState } from 'react'

export const AppContext = createContext()

export const AppProvider = (props) => {
    const { children } = props;
    const [cart, setCart] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [history, setHistory] = useState([]);
    const [user, setUser] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    return (
        <AppContext.Provider
            value={{ cart, setCart, isLogin, setIsLogin, favorite, setFavorite, history, setHistory, user, setUser }}>
            {children}
        </AppContext.Provider>
    )
}