import { Link } from "react-router-dom";

function App() {
    return (
        <ul>
            <li>
                <Link to={"quote"}>Random Quote</Link>
            </li>
            <li>
                <Link to={"generator"}>Generator Password</Link>
            </li>
        </ul>
    );
}

export default App;
