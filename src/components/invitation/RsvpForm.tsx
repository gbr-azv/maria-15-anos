import { useState } from "react"
import type { ComponentProps } from "react"
import { motion } from "motion/react"
import { CheckCircle2, Send } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type FormSubmitEvent = Parameters<
  NonNullable<ComponentProps<"form">["onSubmit"]>
>[0]

export function RsvpForm() {
  const [name, setName] = useState("")
  const [submittedName, setSubmittedName] = useState("")

  function handleSubmit(event: FormSubmitEvent) {
    event.preventDefault()

    const trimmedName = name.trim()

    if (!trimmedName) {
      toast.error("Digite seu nome para confirmar presença.")
      return
    }

    setSubmittedName(trimmedName)
    toast.success("Presença confirmada com sucesso!")
  }

  if (submittedName) {
    return (
      <motion.div
        className="rounded-[2rem] border border-[#536343]/15 bg-[#f7f2e8]/90 p-6 text-center shadow-sm"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#536343]/10 text-[#536343]">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <h3 className="text-2xl font-semibold text-[#35452d]">
          Presença confirmada!
        </h3>

        <p className="mt-3 text-[#66705d]">
          Obrigada, <strong>{submittedName}</strong>. Sua confirmação foi
          registrada.
        </p>

        <p className="mt-4 text-xs uppercase tracking-[0.22em] text-[#6c4aa0]">
          Nos vemos na festa
        </p>
      </motion.div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-[#536343]/15 bg-white/75 p-5 shadow-sm backdrop-blur-md sm:p-7"
    >
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6c4aa0]">
          Confirme sua presença
        </p>

        <h2 className="font-script mt-2 text-4xl text-[#6c4aa0]">
          até 11 de maio
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#66705d]">
          Digite seu nome abaixo para confirmar que você estará presente nesse
          dia especial.
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Seu nome completo"
          className="h-12 rounded-full border-[#536343]/20 bg-white px-5 text-base"
        />

        <Button
          type="submit"
          className="h-12 rounded-full bg-[#536343] px-7 font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#435338]"
        >
          <Send className="mr-2 h-4 w-4" />
          Confirmar
        </Button>
      </div>
    </form>
  )
}
