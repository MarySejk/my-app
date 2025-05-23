import React from "react";
import { Link } from 'react-router-dom'
import Footer from "../components/Footer";

function Home() {
    return (
        <div className="stranka">
            <div className="container-uvod">
                <div className="textovy-blok">
                    <h2 className="nadpis">
                        Zabal se na cestu
                    </h2>
                    <p className="uvod">
                        Vítej v aplikaci, která ti pomůže, abys při balení na výlet na nic nezapomněl(a).
                        <span style={{ display: 'block' }}> { /* začátek na novém řádku */}
                            Můžeš si vybrat, zda chceš vytvořit seznam k zabalení na
                            <Link to="/jednodenni"> jeden den </Link> nebo na
                            <Link to="/vicedenni"> více dnů. </Link> </span>
                        <span style={{ display: 'block' }}> { /* začátek na novém řádku */}
                            Aplikace bere v potaz i roční období a typ pobytu.
                        </span>
                        <span style={{ display: 'block' }}> { /* začátek na novém řádku */}
                            Svůj seznam si můžeš uložit a později se k němu vrátit <Link to="/ulozene">zde.</Link>
                        </span>
                    </p>
                </div>
            </div>
            <Footer />
        </div>

    )
}


export default Home