import Link from "next/link";

export function NavBar() {
    return (
        <div className="bg-zinc-900 py-4 border-b border-zinc-700">
            <div className="container mx-auto px-4 flex justify-center space-x-4 font-semibold">
                <Link href="/">Home</Link>
                <Link href="/heritage">Patrimônios</Link>
                
            </div>
        </div>
    )
}