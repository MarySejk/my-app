import React from "react";
import FormularViceDnu from "../components/FormularViceDnu";
import Footer from "../components/Footer";

function Vicedenni() {
    return (
        <div>
            <div className="container-uvod">
                <div className="textovy-blok">
                    <h2 className="nadpis">
                        Zabal se na více dnů
                    </h2>
                    <FormularViceDnu />
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Vicedenni