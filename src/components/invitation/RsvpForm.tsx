import { useState } from "react"
import type { ComponentProps } from "react"
import { motion } from "motion/react"
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  RefreshCcw,
  Search,
  UserCheck,
  Users,
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"

type FormSubmitEvent = Parameters<
  NonNullable<ComponentProps<"form">["onSubmit"]>
>[0]

type Guest = {
  id: string
  name: string
  isChild: boolean
  sortOrder: number
  confirmed: boolean
}

type SearchInvitationRow = {
  match_score: number
  matched_guest_id: string
  matched_guest_name: string
  group_id: string
  group_name: string
  has_response: boolean
  responded_at: string | null
  responded_by_name: string | null
  guests: Guest[]
}

type InvitationOption = {
  matchScore: number
  matchedGuestId: string
  matchedGuestName: string
  groupId: string
  groupName: string
  hasResponse: boolean
  respondedAt: string | null
  respondedByName: string | null
  guests: Guest[]
}

type SubmitRsvpRow = {
  success: boolean
  group_id: string
  group_name: string
  responded_at: string
  responded_by_name: string
  guests: Guest[]
}

function mapInvitationOption(row: SearchInvitationRow): InvitationOption {
  return {
    matchScore: row.match_score,
    matchedGuestId: row.matched_guest_id,
    matchedGuestName: row.matched_guest_name,
    groupId: row.group_id,
    groupName: row.group_name,
    hasResponse: row.has_response,
    respondedAt: row.responded_at,
    respondedByName: row.responded_by_name,
    guests: row.guests ?? [],
  }
}

function getDisplayGroupName(groupName: string) {
  if (groupName.startsWith("Individual -")) {
    return "Convite individual"
  }

  return groupName
}

function formatRespondedAt(value: string | null) {
  if (!value) {
    return null
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value))
}

export function RsvpForm() {
  const [searchName, setSearchName] = useState("")
  const [options, setOptions] = useState<InvitationOption[]>([])
  const [selectedOption, setSelectedOption] = useState<InvitationOption | null>(
    null
  )
  const [selectedGuestIds, setSelectedGuestIds] = useState<string[]>([])
  const [submittedOption, setSubmittedOption] =
    useState<InvitationOption | null>(null)

  const [isSearching, setIsSearching] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSearch(event: FormSubmitEvent) {
    event.preventDefault()

    const trimmedName = searchName.trim()

    setSubmittedOption(null)
    setSelectedOption(null)
    setSelectedGuestIds([])
    setOptions([])

    if (trimmedName.length < 3) {
      toast.error("Digite pelo menos 3 letras do seu nome.")
      return
    }

    setIsSearching(true)

    const { data, error } = await supabase.rpc(
      "search_invitation_group_options",
      {
        p_search_name: trimmedName,
        p_limit: 8,
      }
    )

    setIsSearching(false)

    if (error) {
      toast.error("Não foi possível buscar seu convite agora.")
      console.error(error)
      return
    }

    const mappedOptions = ((data ?? []) as SearchInvitationRow[]).map(
      mapInvitationOption
    )

    if (mappedOptions.length === 0) {
      toast.error("Não encontramos um convite com esse nome.")
      return
    }

    setOptions(mappedOptions)
  }

  function handleSelectOption(option: InvitationOption) {
    setSelectedOption(option)
    setSubmittedOption(null)
    setSelectedGuestIds(
      option.guests.filter((guest) => guest.confirmed).map((guest) => guest.id)
    )
  }

  function handleToggleGuest(guestId: string) {
    setSelectedGuestIds((currentIds) => {
      if (currentIds.includes(guestId)) {
        return currentIds.filter((id) => id !== guestId)
      }

      return [...currentIds, guestId]
    })
  }

  function handleSelectAllGuests() {
    if (!selectedOption) {
      return
    }

    setSelectedGuestIds(selectedOption.guests.map((guest) => guest.id))
  }

  function handleClearGuests() {
    setSelectedGuestIds([])
  }

  function handleReset() {
    setSearchName("")
    setOptions([])
    setSelectedOption(null)
    setSelectedGuestIds([])
    setSubmittedOption(null)
  }

  async function handleSubmitRsvp() {
    if (!selectedOption) {
      toast.error("Selecione seu convite antes de confirmar.")
      return
    }

    setIsSubmitting(true)

    const { data, error } = await supabase.rpc("submit_group_rsvp", {
      p_group_id: selectedOption.groupId,
      p_confirmed_guest_ids: selectedGuestIds,
      p_confirmed_by_guest_id: selectedOption.matchedGuestId,
      p_confirmed_by_name: selectedOption.matchedGuestName,
      p_typed_name: searchName.trim(),
    })

    setIsSubmitting(false)

    if (error) {
      toast.error("Não foi possível salvar sua confirmação.")
      console.error(error)
      return
    }

    const response = ((data ?? []) as SubmitRsvpRow[])[0]

    if (!response?.success) {
      toast.error("Não foi possível salvar sua confirmação.")
      return
    }

    const updatedOption: InvitationOption = {
      ...selectedOption,
      hasResponse: true,
      respondedAt: response.responded_at,
      respondedByName: response.responded_by_name,
      guests: response.guests ?? [],
    }

    setSubmittedOption(updatedOption)
    setSelectedOption(null)
    setOptions([])
    setSelectedGuestIds([])

    toast.success("Confirmação salva com sucesso!")
  }

  if (submittedOption) {
    const confirmedGuests = submittedOption.guests.filter(
      (guest) => guest.confirmed
    )

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
          Confirmação salva!
        </h3>

        <p className="mt-3 text-[#66705d]">
          Obrigada. Sua confirmação foi registrada para{" "}
          <strong>{getDisplayGroupName(submittedOption.groupName)}</strong>.
        </p>

        <div className="mt-5 rounded-2xl bg-white/55 p-4 text-left">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#6c4aa0]">
            Presenças confirmadas
          </p>

          {confirmedGuests.length > 0 ? (
            <ul className="space-y-2">
              {confirmedGuests.map((guest) => (
                <li
                  key={guest.id}
                  className="flex items-center justify-between gap-3 text-sm text-[#536343]"
                >
                  <span>{guest.name}</span>

                  {guest.isChild && (
                    <span className="rounded-full bg-[#6c4aa0]/10 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#6c4aa0]">
                      criança
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[#66705d]">
              Nenhuma presença foi marcada para este convite.
            </p>
          )}
        </div>

        <Button
          type="button"
          onClick={handleReset}
          variant="outline"
          className="mt-6 rounded-full border-[#536343]/20 bg-white/70 px-6 text-[#536343] hover:bg-[#536343]/10"
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Fazer nova busca
        </Button>
      </motion.div>
    )
  }

  return (
    <div className="rounded-[2rem] border border-[#536343]/15 bg-white/75 p-5 shadow-sm backdrop-blur-md sm:p-7">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6c4aa0]">
          Confirme sua presença
        </p>

        <h2 className="font-script mt-2 text-4xl text-[#6c4aa0]">
          até 11 de maio
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#66705d]">
          Digite seu nome para localizar o seu convite. Depois, confirme quais
          pessoas do seu grupo estarão presentes.
        </p>
      </div>

      <form onSubmit={handleSearch} className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
        <Input
          value={searchName}
          onChange={(event) => setSearchName(event.target.value)}
          placeholder="Digite seu nome"
          className="h-12 rounded-full border-[#536343]/20 bg-white px-5 text-base"
        />

        <Button
          type="submit"
          disabled={isSearching}
          className="h-12 rounded-full bg-[#536343] px-7 font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#435338]"
        >
          {isSearching ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Search className="mr-2 h-4 w-4" />
          )}
          Buscar
        </Button>
      </form>

      {options.length > 0 && !selectedOption && (
        <motion.div
          className="mt-6 rounded-[1.5rem] border border-[#536343]/10 bg-[#f7f2e8]/70 p-4"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div className="mb-4 flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#6c4aa0]/10 text-[#6c4aa0]">
              <Users className="h-5 w-5" />
            </div>

            <div>
              <p className="font-semibold text-[#35452d]">
                Selecione o seu convite
              </p>
              <p className="mt-1 text-sm leading-6 text-[#66705d]">
                Escolha a opção correta abaixo para revisar o grupo antes de
                confirmar.
              </p>
            </div>
          </div>

          <div className="grid gap-3">
            {options.map((option) => (
              <button
                key={option.groupId}
                type="button"
                onClick={() => handleSelectOption(option)}
                className="rounded-2xl border border-[#536343]/10 bg-white/70 p-4 text-left transition hover:-translate-y-0.5 hover:border-[#6c4aa0]/30 hover:bg-white hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-[#35452d]">
                      {option.matchedGuestName}
                    </p>

                    <p className="mt-1 text-sm text-[#66705d]">
                      {getDisplayGroupName(option.groupName)}
                    </p>
                  </div>

                  <span className="rounded-full bg-[#6c4aa0]/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#6c4aa0]">
                    selecionar
                  </span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {selectedOption && (
        <motion.div
          className="mt-6 rounded-[1.5rem] border border-[#536343]/10 bg-[#f7f2e8]/80 p-4"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div className="mb-5 flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#536343]/10 text-[#536343]">
              <UserCheck className="h-5 w-5" />
            </div>

            <div>
              <p className="font-semibold text-[#35452d]">
                {getDisplayGroupName(selectedOption.groupName)}
              </p>

              <p className="mt-1 text-sm leading-6 text-[#66705d]">
                Encontramos seu convite por{" "}
                <strong>{selectedOption.matchedGuestName}</strong>. Marque
                abaixo quem estará presente.
              </p>
            </div>
          </div>

          {selectedOption.hasResponse && (
            <div className="mb-5 rounded-2xl border border-[#6c4aa0]/15 bg-white/65 p-4">
              <div className="flex gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#6c4aa0]" />

                <p className="text-sm leading-6 text-[#66705d]">
                  Este convite já foi confirmado
                  {selectedOption.respondedByName
                    ? ` por ${selectedOption.respondedByName}`
                    : ""}
                  {formatRespondedAt(selectedOption.respondedAt)
                    ? ` em ${formatRespondedAt(selectedOption.respondedAt)}`
                    : ""}
                  . Você pode revisar a seleção e salvar novamente.
                </p>
              </div>
            </div>
          )}

          <div className="mb-4 flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleSelectAllGuests}
              className="rounded-full border-[#536343]/20 bg-white/70 text-[#536343] hover:bg-[#536343]/10"
            >
              Marcar todos
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleClearGuests}
              className="rounded-full border-[#536343]/20 bg-white/70 text-[#536343] hover:bg-[#536343]/10"
            >
              Desmarcar todos
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setSelectedOption(null)
                setSelectedGuestIds([])
              }}
              className="rounded-full text-[#66705d] hover:bg-[#536343]/10 hover:text-[#536343]"
            >
              Escolher outro
            </Button>
          </div>

          <div className="grid gap-3">
            {selectedOption.guests.map((guest) => {
              const isSelected = selectedGuestIds.includes(guest.id)

              return (
                <button
                  key={guest.id}
                  type="button"
                  onClick={() => handleToggleGuest(guest.id)}
                  className={cn(
                    "flex items-center justify-between gap-4 rounded-2xl border p-4 text-left transition",
                    isSelected
                      ? "border-[#536343]/25 bg-white shadow-sm"
                      : "border-[#536343]/10 bg-white/35 opacity-70"
                  )}
                >
                  <div>
                    <p className="font-medium text-[#35452d]">{guest.name}</p>

                    {guest.isChild && (
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#6c4aa0]">
                        criança
                      </p>
                    )}
                  </div>

                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition",
                      isSelected
                        ? "border-[#536343] bg-[#536343] text-white"
                        : "border-[#536343]/25 bg-white/70 text-transparent"
                    )}
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                </button>
              )
            })}
          </div>

          {selectedGuestIds.length === 0 && (
            <p className="mt-4 rounded-2xl bg-white/50 p-3 text-sm leading-6 text-[#66705d]">
              Nenhum convidado está marcado. Ao salvar, este convite ficará sem
              presenças confirmadas.
            </p>
          )}

          <Button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmitRsvp}
            className="mt-6 h-12 w-full rounded-full bg-[#536343] px-7 font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#435338]"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {selectedOption.hasResponse
              ? "Atualizar confirmação"
              : "Confirmar presença"}
          </Button>
        </motion.div>
      )}
    </div>
  )
}
