import { useData } from "./components/DataProvider"

const App = () => {
    const { uiOpen } = useData()

    return (
        uiOpen &&
        <div>
            <h1>Hello FiveM!</h1>
        </div>
    )
}

export default App
