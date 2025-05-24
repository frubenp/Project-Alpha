import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">S-DES Webalkalmazás</h1>
      <p>Válassz egy műveletet:</p>
      <ul className="list-disc list-inside">
        <li>
          <Link href="/crack" className="text-blue-600 underline">
            Szöveg feltörése (kulcs visszafejtése)
          </Link>
        </li>
        <li>
          <Link href="/encrypt" className="text-blue-600 underline">
            Szöveg titkosítása megadott kulccsal
          </Link>
        </li>
      </ul>
    </main>
  );
}