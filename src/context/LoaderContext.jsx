import React, { createContext, useState } from 'react'

export const LoaderContext = createContext();

export const LoaderProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    const loaderValue = {loading, setLoading};

    return <LoaderContext.Provider value={loaderValue}>{children}</LoaderContext.Provider>
}