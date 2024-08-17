import { createContext, useContext, useEffect, useState } from "react"

interface Data {
    uiOpen: boolean,
}

const RESOURCE_NAME = "resource"

export const postToServer = (endpoint: string, payload?: {}): Promise<void | Response> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`https://${RESOURCE_NAME}/${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload || {})
            })
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}


const DataContext = createContext<Data | null>(null)

export const useData = (): Data => useContext(DataContext) as Data

const DataProvider = ({ children }: { children: React.ReactNode }) => {

    const [uiOpen, setUiOpen] = useState(false)

    useEffect(() => {
        window.addEventListener("message", (e: MessageEvent) => {
            const data = e.data
            switch (data.type) {
                case "uiOpen":
                    setUiOpen(data.value)
                    break
                default:
                    break
            }
        })
    }, [])

    return (
        <DataContext.Provider value={{
            uiOpen,
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;