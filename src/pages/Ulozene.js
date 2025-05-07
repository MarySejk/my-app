import React from "react";
import Footer from "../components/Footer";
import UlozeneSeznamy from "../components/UlozeneSeznamy";

function Ulozene() {
    return (
        <div className="stranka">
            <div className="container-uvod">
                <div className="textovy-blok">
                    <h3 className="nadpis">
                        Tady jsou tvé uložené seznamy:
                    </h3>
                    <UlozeneSeznamy />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Ulozene