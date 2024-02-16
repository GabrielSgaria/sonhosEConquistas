

export default function PagesLayout({
    children,
  }: Readonly<{
    children: React.ReactNode
  }>) {
    return (
      <div className="bg-zinc-800 space-y-10 min-h-screen h-full w-full text-white grid place-content-center">
        {children}
      </div>
    )
  }