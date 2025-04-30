import React from "react";
/* import JednodenniSeznam from "../components/jednodenniSeznam"; */
import Formular from "../components/Formular";
import Footer from "../components/Footer";

function Jednodenni() {

    return (
        <div className="stranka" >
            <div className="container-uvod">
                <div className="textovy-blok">
                    <h2 className="nadpis">
                        Zabal se na jeden den
                    </h2>
                    <Formular />
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Jednodenni