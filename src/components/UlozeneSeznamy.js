import React, { useState, useEffect, useRef } from "react";
import { FiPrinter } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";

function UlozeneSeznamy() {
  const [seznamy, setSeznamy] = useState({});
  const seznamRefs = useRef({});

  useEffect(() => {
    const ulozene = localStorage.getItem("vyletySeznamy");
    if (ulozene) {
      setSeznamy(JSON.parse(ulozene));
    }
  }, []);

  const smazatSeznam = (klic) => {
    const noveSeznamy = { ...seznamy };
    delete noveSeznamy[klic];
    setSeznamy(noveSeznamy)
    localStorage.setItem("vyletySeznamy", JSON.stringify(noveSeznamy));
  }

  const vytiskniSeznam = (klic) => {
    const seznamEl = seznamRefs.current[klic]?.current;
    if (!seznamEl) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const html = ` 
    <html>
    <head>
      <title>Seznam k tisku</title>
      <style>
        body { font-family: sans-serif; padding: 1em; }
        ul { padding-left: 1.5em; }
        li { margin-bottom: 0.5em; }
        h3 { margin-bottom: 1em; }
        button { 
          display: none}
      </style>
    </head>
    <body>
      ${seznamEl.innerHTML}
    </body>
  </html>
`;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }

  return (
    <div >
      {Object.keys(seznamy).length === 0 && <p>Žádné uložené seznamy.</p>}
      {Object.entries(seznamy).map(([klic, polozky]) => {
        if (!seznamRefs.current[klic]) {
          seznamRefs.current[klic] = React.createRef();
        }
        return (
          <div key={klic} className="ulozeny-seznam" ref={seznamRefs.current[klic]}>
            <h3>{klic.replace("_", " - ")}</h3>
            <ul>
              {polozky.map((polozka, index) => (
                <li key={index}>{polozka}</li>
              ))}
            </ul>
            <button
              className='tlacitko-tisk'
              onClick={() => vytiskniSeznam(klic)}>
              <FiPrinter style={{ marginRight: '0.5em' }} />
              Vytisknout
            </button>
            <button
              className="tlacitko-smazat"
              onClick={() => smazatSeznam(klic)}>
              <FiTrash2 style={{ marginRight: '0.5em' }} />
              Smazat seznam
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default UlozeneSeznamy;
