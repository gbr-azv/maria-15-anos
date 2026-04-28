import { useState } from "react"
import type { ComponentProps } from "react"
import { Loader2, LockKeyhole } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase"

type FormSubmitEvent = Parameters<
  NonNullable<ComponentProps<"form">["onSubmit"]>
>[0]

export function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormSubmitEvent) {
    event.preventDefault()

    if (!email.trim() || !password.trim()) {
      toast.error("Informe email e senha.")
      return
    }

    setIsSubmitting(true)

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    setIsSubmitting(false)

    if (error) {
      toast.error("Não foi possível entrar. Verifique email e senha.")
      console.error(error)
      return
    }

    toast.success("Login realizado com sucesso.")
  }

  return (
    <section className="watercolor-bg relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <img
        src="/images/flower-upper-right-corner.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-24 w-[380px] opacity-80 sm:w-[560px]"
      />

      <img
        src="/images/flower-lower-left-corner.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-32 w-[420px] opacity-80 sm:w-[600px]"
      />

      <div className="relative w-full max-w-md rounded-[2.5rem] border border-[#536343]/20 bg-[#fffdf7]/85 p-6 shadow-2xl backdrop-blur-md sm:p-8">
        <div className="pointer-events-none absolute inset-3 rounded-[2.1rem] border border-[#536343]/25" />

        <div className="relative z-10 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#536343]/10 text-[#536343]">
            <LockKeyhole className="h-7 w-7" />
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6c4aa0]">
            Área da aniversariante
          </p>

          <h1 className="font-display mt-3 text-4xl font-semibold text-[#35452d]">
            Acompanhar confirmações
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#66705d]">
            Entre para visualizar quem confirmou presença, quem não irá e quem
            ainda está pendente.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative z-10 mt-7 grid gap-4">
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="h-12 rounded-full border-[#536343]/20 bg-white px-5 text-base"
          />

          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Senha"
            className="h-12 rounded-full border-[#536343]/20 bg-white px-5 text-base"
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 rounded-full bg-[#536343] px-7 font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#435338]"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Entrar
          </Button>
        </form>
      </div>
    </section>
  )
}
