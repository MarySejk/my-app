import React, { useState } from 'react';
import Select from "react-select";
import { JEDNODENNI_VODA } from '../data/jednodenni_voda';
import { JEDNODENNI_MESTO } from '../data/jednodenni_mesto';
import { JEDNODENNI_PRIRODA } from '../data/jednodenni_priroda';
import { JEDNODENNI_PRACOVNI } from '../data/jednodenni_pracovni'

const mujStyl = {
    control: (base, state) => ({
        ...base,
        borderRadius: "var(--radius)",
        padding: "var(--odsazeni)",
        fontSize: "1em",
        border: "var(--border)",
        boxShadow: state.isFocused ? "var(--shadow)" : "none",
        marginBottom: "1.5em",
        cursor: "pointer",
    }),
    menu: (base) => ({
        ...base,
        borderRadius: "var(--radius)",
        padding: "var(--odsazeni)",
        fontSize: "1em",
        border: "var(--border)",
        backgroundColor: "var(--barva-pozadi)",

    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected
            ? "var(--hlavni-barva)"
            : state.isFocused
                ? "var(--hlavni-barva)"
                : "var(--barva-pozadi)",
    }),

};

const options_obdobi = [
    { value: "jaro", label: "Jaro" },
    { value: "léto", label: "Léto" },
    { value: "podzim", label: "Podzim" },
    { value: "zima", label: "Zima" },
]

const options_typ = [
    { value: "do města", label: "Do města" },
    { value: "do přírody", label: "Do přírody" },
    { value: "k vodě", label: "K vodě" },
    { value: "pracovní", label: "Pracovní cesta" },
]

function Formular() {
    const [seznam, setSeznam] = useState([]);
    const [typVyletu, setTypVyletu] = useState("");
    const [obdobi, setObdobi] = useState("");
    const [novaPolozka, setNovaPolozka] = useState("");

    const handleClick = () => {
        let vybranySeznam = [];
        switch (typVyletu) {
            case "k vodě":
                vybranySeznam = JEDNODENNI_VODA[obdobi];
                break;
            case "do města":
                vybranySeznam = JEDNODENNI_MESTO[obdobi];
                break;
            case "do přírody":
                vybranySeznam = JEDNODENNI_PRIRODA[obdobi];
                break;
            case "pracovní":
                vybranySeznam = JEDNODENNI_PRACOVNI[obdobi];
                break;
            default:
                vybranySeznam = [];
        }
        if (novaPolozka.trim() !== ""){
            vybranySeznam.push(novaPolozka.trim())
        } 
        setSeznam(vybranySeznam);
        setNovaPolozka("");
    }
    const handleSelectObdobi = (selected) => {
        if (selected) {
            setObdobi(selected.value);
            setSeznam([]);
        }
    }

    const handleSelectTyp = (selected) => {
        if (selected) {
            setTypVyletu(selected.value)
            setSeznam([]);
        }
    }

    return (
        <div>
            <form className="form-obdobi uvod">
                <label className="label">Vyber si roční období</label>
                <Select
                    options={options_obdobi}
                    value={options_obdobi.find((opt) => opt.value === obdobi)}
                    onChange={handleSelectObdobi}
                    placeholder="Vyber..."
                    styles={mujStyl}
                />

                <label className="label">Vyber si typ cesty</label>
                <Select
                    options={options_typ}
                    value={options_typ.find((opt) => opt.value === typVyletu)}
                    onChange={handleSelectTyp}
                    placeholder="Vyber..."
                    styles={mujStyl}
                />

                <label className='label'>Chceš přidat něco nabíc?</label>
                <textarea
                 placeholder='Název položky...'
                 className='textarea'
                 value={novaPolozka}
                 onChange={(e) => setNovaPolozka(e.target.value)} />

                <div className="tlacitko" onClick={handleClick}>
                    Vytvoř seznam
                </div>

            </form>
            {/*seznam -generování*/}
            {Array.isArray(seznam) && seznam.length > 0 && (
                <div className='seznam-container'>
                    <div className='seznam'>
                        <h3 className='seznam-nadpis'>
                            Seznam pro výlet {typVyletu} v období {obdobi}
                        </h3>
                        <ul >
                            {seznam.map((item, index) => (
                                <li key={index} className='seznam-item'>
                                    <label >
                                        <input type='checkbox' className='seznam-check' />
                                        {""}
                                        {item}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Formular;