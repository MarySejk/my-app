import React from "react"
import { Link } from 'react-router-dom'

function Navigace() {
    return (
        <nav className="navigace">
            <ul className="nav-seznam">
                <li className="nav-seznam-item">
                    <Link to="/">Domů</Link>
                </li>
                <li className="nav-seznam-item">
                    <Link to="/jednodenni">Jednodenní výlet</Link>
                </li>
                <li className="nav-seznam-item">
                    <Link to="/vicedenni">Výlet na více dnů</Link>
                </li>
                <li className="nav-seznam-item">
                    <Link to="/ulozene">Uložené seznamy</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navigace