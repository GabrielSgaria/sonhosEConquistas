import { UserButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Link from "next/link";

export function NavBar() {
  return (
    <div className="border-b border-zinc-700 bg-zinc-900 py-4">
      <div className="container mx-auto flex items-center justify-between px-4 font-semibold">
        <div className=" space-x-4">
          <Link href="/">Home</Link>
          <Link href="/heritage">Patrimônios</Link>
        </div>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>

        <ClerkLoading>
          <div className="size-8 bg-zinc-600 rounded-full animate-pulse"/>
        </ClerkLoading>
      </div>
    </div>
  );
}
