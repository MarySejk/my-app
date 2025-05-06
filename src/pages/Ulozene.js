import React from "react";
import Footer from "../components/Footer";

function Ulozene() {
    return (
        <div className="stranka">
            <div className="container-uvod">
                <div className="textovy-blok">
                    <h2 className="nadpis">
                        Tady jsou tvé uložené seznamy:
                    </h2>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Ulozene