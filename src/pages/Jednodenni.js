import React, { useState } from "react";
import JednodenniSeznam from "../components/jednodenniSeznam";
import Formular from "../components/Formular";

function Jednodenni() {

    return (
        <div className="container-uvod">
            <div className="textovy-blok">
                <h2 className="nadpis">
                    Zabal se na jeden den
                </h2>
                <Formular renderOutput={() => <JednodenniSeznam />}/>
            </div>
        </div>
    )
}

export default Jednodenni