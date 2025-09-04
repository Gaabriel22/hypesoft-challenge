import { Header } from "./Header"
import { Sidebar } from "./Sidebar"

type Props = {
  children: React.ReactNode
}

export function MainLayout({ children }: Props) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header navTabs={[]} />
        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
