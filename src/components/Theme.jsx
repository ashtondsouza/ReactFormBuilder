import React, { useState } from "react";
import ContextFunctionalCom from "./ContextFunctionalCom";

export const MyContext = React.createContext()
export function Theme () {
const [darkTheme,setDarkTheme] = useState(true)

const toggleTheme = () => {
    setDarkTheme(!darkTheme)
    // setDarkTheme(prevDarkTheme => !prevDarkTheme)
}

    return(
        <>
        <MyContext.Provider value={darkTheme}>
        <button onClick={toggleTheme}>toggle Theme</button>
        <ContextFunctionalCom/>
        </MyContext.Provider>
        </>
    )
}