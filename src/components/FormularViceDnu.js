import React, { useState, useEffect } from 'react';
import Select from "react-select";
import { FiPrinter, FiDownload, FiTrash2 } from "react-icons/fi";
import "../utils/pocetNoci";
import { useNavigate } from 'react-router-dom';

import { VICEDENNI_HOTEL } from '../data/vicedenni_hotel';
import { VICEDENNI_STAN } from '../data/vicedenni_stan';
import { VICEDENNI_SPACAK } from '../data/vicedenni_spacak';

/*stylování vlastního selectu*/
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
// Pomocná funkce pro výpočet seznamu
function generujSeznam(seznam, pocetNoci) {
    const pocet = isNaN(pocetNoci) ? 1 : Number(pocetNoci);
    return seznam.flatMap(item => {
        if (item.zavisleNaNoci) {
            const mnozstviCelkem = item.mnozstvi * pocet;
            return mnozstviCelkem > 1
                ? `${item.nazev} (${mnozstviCelkem})`
                : item.nazev;
        } else {
            return item.mnozstvi > 1
                ? `${item.nazev} (${item.mnozstvi})`
                : item.nazev;
        }
    });
}
/*možnosti výběru hodnot ve formuláří*/
const options_typ = [
    { value: "hotel", label: "Hotel nebo penzion" },
    { value: "bez spacáku", label: "Penzion/chata s vlastním spacákem" },
    { value: "stan", label: "Pod stanem" },
]

const options_noci = [
    ...Array.from({ length: 10 }, (_, i) => ({
        value: i + 1,
        label: `${i + 1} ${i + 1 === 1 ? 'noc' : 'nocí'}`
    })),
    { value: "vice", label: "víc nocí" },
]

/*hlavní funkce*/

function FormularViceDnu() {
    const [seznam, setSeznam] = useState([]);
    const [seznamy, setSeznamy] = useState({});
    const [typUbytovani, setTypUbytovani] = useState("");
    const [novaPolozka, setNovaPolozka] = useState("");
    const [noci, setNoci] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const ulozeny = localStorage.getItem("vyletySeznamy");
        if (ulozeny) {
            const parsed = JSON.parse(ulozeny);
            setSeznamy(parsed);
            if (typUbytovani && noci) {
                const klic = `${typUbytovani}_${noci}`;
                setSeznam(parsed[klic] || []);
            }
        }
    }, [typUbytovani, noci]);

    const vytvorSeznam = () => {
        if (!typUbytovani || !noci) {
            alert("Vyber si typ ubytování a počet nocí.");
            return;
        }

        let zaklad = [];
        switch (typUbytovani) {
            case "hotel":
                zaklad = VICEDENNI_HOTEL;
                break;
            case "bez spacáku":
                zaklad = VICEDENNI_SPACAK;
                break;
            case "stan":
                zaklad = VICEDENNI_STAN;
                break;
            default:
                zaklad = [];
        }

        /*přidání nové položky */
        const finalniSeznam = generujSeznam(zaklad, noci);
        const klic = `Ubytování - ${typUbytovani}, počet nocí: ${noci}`;

        const noveSeznamy = {
            ...seznamy,
            [klic]: finalniSeznam,
        }
        const radky = novaPolozka
            .split("\n")
            .map((r) => r.trim())
            .filter((r) => r !== '');

        setSeznamy(noveSeznamy);
        setSeznam([...finalniSeznam, ...radky]);
        setNovaPolozka("");
    }

    /* různé drobné funkce*/
    const ulozAPresmeruj = () => {
        localStorage.setItem("vyletySeznamy", JSON.stringify(seznamy));
        navigate("/ulozene");
    }
    const handleSelectNoci = (selected) => {
        if (selected) {
            setNoci(selected.value);
            setSeznam([]);
        }
    }

    const handleSelectTyp = (selected) => {
        if (selected) {
            setTypUbytovani(selected.value)
            setSeznam([]);
        }
    }

    const smazatSeznam = () => {
        localStorage.removeItem("seznamNaVylet");
        setSeznam([]);
    }

    return (
        <div>
            <form className="form-obdobi uvod">
                <label className="label">Na kolik nocí se balíš?</label>
                <Select
                    options={options_noci}
                    value={options_noci.find((opt) => opt.value === noci)}
                    onChange={handleSelectNoci}
                    placeholder="Vyber..."
                    styles={mujStyl}
                />

                <label className="label">Vyber si typ ubytování</label>
                <Select
                    options={options_typ}
                    value={options_typ.find((opt) => opt.value === typUbytovani)}
                    onChange={handleSelectTyp}
                    placeholder="Vyber..."
                    styles={mujStyl}
                />

                <label className='label'>Chceš přidat něco navíc?</label>
                <textarea
                    placeholder='Název položky...'
                    className='textarea'
                    value={novaPolozka}
                    onChange={(e) => setNovaPolozka(e.target.value)} />

                <div className="tlacitko" onClick={vytvorSeznam}>
                    Vytvoř seznam
                </div>

            </form>
            {/*seznam -generování*/}
            {Array.isArray(seznam) && seznam.length > 0 && (
                <div className='seznam-container'>
                    <div className='seznam'>
                        <h3 className='seznam-nadpis'>
                            Seznam pro ubytování typu {typUbytovani} na počet nocí: {noci}
                        </h3>
                        <ul className='seznam-list' >
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
                        <button className='tlacitko-tisk'
                            onClick={() => window.print()}>
                            <FiPrinter style={{ marginRight: '0.5em' }} />
                            Vytisknout
                        </button>
                        <button
                            className='tlacitko-tisk'
                            onClick={ulozAPresmeruj}>
                            <FiDownload style={{ marginRight: '0.5em' }} />
                            Ulož
                        </button>
                        <button className='tlacitko-smazat'
                            onClick={smazatSeznam}>
                            <FiTrash2 style={{ marginRight: '0.5em' }} />
                            Smazat seznam
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FormularViceDnu;