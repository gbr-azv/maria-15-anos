import { useState } from "react"
import { AnimatePresence } from "motion/react"

import { AdminPage } from "@/components/admin/AdminPage"
import { InvitationContent } from "@/components/invitation/InvitationContent"
import { InvitationCover } from "@/components/invitation/InvitationCover"
import { Toaster } from "@/components/ui/sonner"

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const isAdminRoute = window.location.pathname.startsWith("/admin")

  if (isAdminRoute) {
    return (
      <main className="relative min-h-screen overflow-x-hidden bg-[#f4f0e6] text-[#35452d]">
        <AdminPage />
        <Toaster position="top-center" richColors />
      </main>
    )
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#f4f0e6] text-[#35452d]">
      <InvitationContent isOpen={isOpen} />

      <AnimatePresence>
        {!isOpen && <InvitationCover onOpen={() => setIsOpen(true)} />}
      </AnimatePresence>

      <Toaster position="top-center" richColors />
    </main>
  )
}

export default App
