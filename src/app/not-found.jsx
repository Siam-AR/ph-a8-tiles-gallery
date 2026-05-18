import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-xl text-center p-8 bg-white rounded-xl shadow">
        <h1 className="text-6xl font-extrabold text-slate-800 mb-2">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page not found</h2>
        <p className="text-gray-600 mb-6">The page you are looking for does not exist or has been moved.</p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/" className="inline-block px-5 py-2 bg-blue-600 text-white rounded-md">Go to Home</Link>
          <Link href="/all-tiles" className="inline-block px-5 py-2 border rounded-md">Browse Tiles</Link>
        </div>
      </div>
    </main>
  );
}