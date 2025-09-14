import { useState } from "react";

//component for inserting a new article into the inventory
//it is implemented in CreateArticle component
const InsertBox = ({ onAdd }) => {
    const [namn, setNamn] = useState("");
    const [antal, setAntal] = useState("");
    const [enhet, setEnhet] = useState("");
    const [error, setError] = useState(""); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!namn.trim() || !antal || !enhet.trim()) {
            setError("Alla fält måste fyllas i!");
            return;
        }

        const numAntal = Number(antal);
        if (numAntal < 0) {
            setError("Antal måste vara ett positivt värde!");
            return;
        }

        const newArticle = {
            namn,
            antal: numAntal,
            enhet
        };

        try {
            const response = await fetch("https://localhost:7075/api/articles", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newArticle)
            });

            if (!response.ok) throw new Error("Det gick inte att lägga till artikeln");

            const data = await response.json();
            if (onAdd) onAdd(data);

            // Reset form
            setNamn("");
            setAntal("");
            setEnhet("");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="insert-box container insertBox">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <h2 className="secondH">Lägg till ny artikel</h2>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control large-input"
                                placeholder="Artikelnamn..."
                                value={namn}
                                onChange={(e) => setNamn(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="number"
                                className="form-control large-input"
                                placeholder="Antal..."
                                value={antal}
                                onChange={(e) => setAntal(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control large-input"
                                placeholder="Enhet..."
                                value={enhet}
                                onChange={(e) => setEnhet(e.target.value)}
                            />
                        </div>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                <p>{error}</p>
                            </div>
                        )}
                        <button type="submit" className="btn btn-primary w-100">
                            Lägg till
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InsertBox;
