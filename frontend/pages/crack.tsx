import React, { useState } from "react";

type CrackResult = {
  character: string;
  cipher: number;
  possibleKeys: number[];
};

export default function CrackPage() {
  const [plaintext, setPlaintext] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [result, setResult] = useState<CrackResult[]>([]);

  const handleCrack = async () => {
    try {
      const ciphertextNumbers = ciphertext
        .split(",")
        .map((x) => parseInt(x.trim()))
        .filter((n) => !isNaN(n));

      const payload = {
        plaintext,
        ciphertext: ciphertextNumbers,
      };

      const res = await fetch("http://localhost:5000/crack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Hiba a feltörés során:", err);
      alert("Hiba történt a feltörés során. Nézd meg a konzolt (F12).\n" + err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">S-DES Feltörés</h1>
      <input
        className="border p-2 w-full"
        placeholder="Eredeti szöveg"
        value={plaintext}
        onChange={(e) => setPlaintext(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Titkosított számok (pl. 123,87,255)"
        value={ciphertext}
        onChange={(e) => setCiphertext(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2" onClick={handleCrack}>
        Feltörés
      </button>
      <div>
        {result.map((r, i) => (
          <div key={i} className="mt-4 border p-2 rounded">
            <strong>{r.character}</strong> → {r.cipher} <br />
            Lehetséges kulcsok: {r.possibleKeys.join(", ") || "nincs találat"}
          </div>
        ))}
      </div>
    </div>
  );
}