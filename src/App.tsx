import { useState } from "react"
import { AnimatePresence } from "motion/react"

import { InvitationContent } from "@/components/invitation/InvitationContent"
import { InvitationCover } from "@/components/invitation/InvitationCover"
import { Toaster } from "@/components/ui/sonner"

function App() {
  const [isOpen, setIsOpen] = useState(false)

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
