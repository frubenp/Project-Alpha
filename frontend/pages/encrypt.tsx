import React, { useState } from "react";

type EncryptResult = {
  original: string;
  encrypted: number;
};

export default function EncryptPage() {
  const [plaintext, setPlaintext] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState<EncryptResult[]>([]);

  const handleEncrypt = async () => {
    const numericKey = parseInt(key);
    if (isNaN(numericKey)) {
      alert("A kulcs csak szám lehet.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/encrypt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plaintext, key: numericKey })
      });

      const text = await res.text();
      try {
        const data = JSON.parse(text);
        setResult(data);
      } catch (err) {
        console.error("❌ Nem sikerült JSON-ként értelmezni a választ:", text);
        alert("Hibás válasz a szervertől. Nézd meg a konzolt (F12).");
      }

    } catch (err) {
      console.error("Hiba a titkosítás során:", err);
      alert("Hiba történt a titkosítás során. Nézd meg a konzolt (F12).\n" + err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">S-DES Titkosítás</h1>
      <input
        className="border p-2 w-full"
        placeholder="Titkosítandó szöveg"
        value={plaintext}
        onChange={(e) => setPlaintext(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Kulcs (0-255)"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <button className="bg-green-600 text-white px-4 py-2" onClick={handleEncrypt}>
        Titkosítás
      </button>
      <div>
        {result.map((r, i) => (
          <div key={i} className="mt-4 border p-2 rounded">
            <strong>{r.original}</strong> → {r.encrypted}
          </div>
        ))}
      </div>
    </div>
  );
}
