import React from "react";

function JednodenniSeznam (){
    return (
        <div>
            <h3>
                Tady je tvůj seznam
            </h3>
            <ul className="seznam">
                <li className="seznam-item">
                    <input type="checkbox" />
                    <label> Pití </label>
                </li>
            </ul>
        </div>
    )
}
export default JednodenniSeznam