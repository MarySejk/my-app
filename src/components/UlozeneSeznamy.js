import React, { useState, useEffect, useRef } from "react";
import { FiPrinter, FiTrash2, FiArrowUp } from "react-icons/fi";

function UlozeneSeznamy() {
  const [seznamy, setSeznamy] = useState({});
  const seznamRefs = useRef({});
  const [otevrene, setOtevrene] = useState({});

  useEffect(() => {
    const ulozene = localStorage.getItem("vyletySeznamy");
    if (ulozene) {
      setSeznamy(JSON.parse(ulozene));
    }
    window.scrollTo(0, 0);
  }, []);

  const smazatSeznam = (klic) => {
    const noveSeznamy = { ...seznamy };
    delete noveSeznamy[klic];
    setSeznamy(noveSeznamy)
    localStorage.setItem("vyletySeznamy", JSON.stringify(noveSeznamy));
  }

  const toggleSeznam = (klic) => {
    setOtevrene((prev) => ({
      ...prev,
      [klic]: !prev[klic]
    }))
  }
  return (
    <div >
      {Object.keys(seznamy).length === 0 &&
        <p>Žádné uložené seznamy.</p>}
      {Object.entries(seznamy).map(([klic, polozky]) => {
        if (!seznamRefs.current[klic]) {
          seznamRefs.current[klic] = React.createRef();
        }
        const jeOtevreny = otevrene[klic];

        return (
          <div key={klic}
            className={`ulozeny-seznam ${jeOtevreny ? 'otevreny' : ''}`}
            ref={seznamRefs.current[klic]}>
            <h3
              className="seznam-ulozeny-zabaleny"
              onClick={() => toggleSeznam(klic)}
              style={{ cursor: "pointer", userSelect: "none" }}
            >
              {klic.replace("_", " - ")}
              {jeOtevreny && (
                <span className="sipka"
                  onClick={() => toggleSeznam(klic)}>
                  <FiArrowUp />
                </span>
              )}
            </h3>

            {jeOtevreny && (
              <>
                <ul className='seznam-list' >
                  {polozky.map((item, index) => (
                    <li key={index} className='seznam-item'>
                      <label >
                        <input type='checkbox' className='seznam-check' />
                        {""}
                        {item}
                      </label>
                    </li>
                  ))}
                </ul>
                <button
                  className='tlacitko-tisk'
                  onClick={() => window.print()}>
                  <FiPrinter style={{ marginRight: '0.5em' }} />
                  Vytisknout
                </button>
                <button
                  className="tlacitko-smazat"
                  onClick={() => smazatSeznam(klic)}>
                  <FiTrash2 style={{ marginRight: '0.5em' }} />
                  Smazat seznam
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default UlozeneSeznamy;
