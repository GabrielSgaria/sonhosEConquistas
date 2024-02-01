import { NavBar } from "@/components/nav-bar"

export default function PagesLayout({
    children,
  }: Readonly<{
    children: React.ReactNode
  }>) {
    return (
      <div className="bg-zinc-900 space-y-10 min-h-screen h-full w-full text-white">
        <NavBar/>
        <section className="h-full container mx-auto">{children}</section>
      </div>
    )
  }