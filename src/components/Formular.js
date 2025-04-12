import React, { useState } from 'react';
import Select from "react-select";

const mujStyl = {
    control: (base, state) => ({ 
        ...base,
        borderRadius: "var(--radius)",
        padding: "var(--odsazeni)",
        fontSize: "1em",
        border: "var(--border)",
        boxShadow: state.isFocused ? "var(--shadow)" : "none",
       
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

const options = [
    { value: "jaro", label: "Jaro" },
    { value: "leto", label: "Léto" },
    { value: "podzim", label: "Podzim" },
    { value: "zima", label: "Zima" },
]


function Formular({ renderOutput }) {
    const [seznam, setSeznam] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleClick = () => {
        setSeznam(true);
    }
    const handleSelect = (selected) => {
        setSelectedOption(selected)
        setSeznam(false)
    }
    return (
        <div>
            <form className="form-obdobi uvod">
                <label className="label">Vyber si roční období</label>
                <Select
                    options={options}
                    value={selectedOption}
                    onChange={handleSelect}
                    placeholder="Vyber..."
                    styles={mujStyl}
                />
                <div className="tlacitko" onClick={handleClick}>
                    Vytvoř seznam
                </div>
            </form>
            {seznam && renderOutput && renderOutput()}
        </div>
    )
}

export default Formular;