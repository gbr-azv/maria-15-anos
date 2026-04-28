import { useEffect, useMemo, useState } from "react"
import type { User } from "@supabase/supabase-js"
import {
  CheckCircle2,
  Clock3,
  Loader2,
  LogOut,
  RefreshCcw,
  Users,
  XCircle,
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"

type GuestStatus = "confirmed" | "declined" | "pending"

type DashboardGuest = {
  id: string
  name: string
  isChild: boolean
  status: GuestStatus
  groupId: string
  groupName: string
  notes: string | null
  respondedAt: string | null
  respondedByName: string | null
}

type DashboardGroupGuest = {
  id: string
  name: string
  isChild: boolean
  status: GuestStatus
}

type DashboardGroup = {
  id: string
  name: string
  notes: string | null
  respondedAt: string | null
  respondedByName: string | null
  totalCount: number
  confirmedCount: number
  declinedCount: number
  pendingCount: number
  guests: DashboardGroupGuest[]
}

type DashboardData = {
  summary: {
    totalGuests: number
    confirmedGuests: number
    declinedGuests: number
    pendingGuests: number
    totalGroups: number
    respondedGroups: number
    pendingGroups: number
    childrenConfirmed: number
    adultsConfirmed: number
  }
  groups: DashboardGroup[]
  guests: DashboardGuest[]
}

type AdminDashboardProps = {
  user: User
}

type ViewMode = "groups" | "confirmed" | "declined" | "pending"

function getDisplayGroupName(groupName: string) {
  if (groupName.startsWith("Individual -")) {
    return "Convite individual"
  }

  return groupName
}

function getStatusLabel(status: GuestStatus) {
  if (status === "confirmed") return "Confirmado"
  if (status === "declined") return "Não vai"
  return "Pendente"
}

function getStatusClass(status: GuestStatus) {
  if (status === "confirmed") {
    return "bg-[#536343]/10 text-[#536343]"
  }

  if (status === "declined") {
    return "bg-[#6c4aa0]/10 text-[#6c4aa0]"
  }

  return "bg-[#c2aa77]/20 text-[#7a6538]"
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>("groups")

  async function fetchDashboard(showRefresh = false) {
    if (showRefresh) {
      setIsRefreshing(true)
    } else {
      setIsLoading(true)
    }

    const { data: response, error } = await supabase.rpc("get_rsvp_dashboard")

    setIsLoading(false)
    setIsRefreshing(false)

    if (error) {
      toast.error("Não foi possível carregar o dashboard.")
      console.error(error)
      return
    }

    setData(response as DashboardData)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    toast.success("Você saiu da área administrativa.")
  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  const filteredGuests = useMemo(() => {
    if (!data) return []

    if (viewMode === "confirmed") {
      return data.guests.filter((guest) => guest.status === "confirmed")
    }

    if (viewMode === "declined") {
      return data.guests.filter((guest) => guest.status === "declined")
    }

    if (viewMode === "pending") {
      return data.guests.filter((guest) => guest.status === "pending")
    }

    return []
  }, [data, viewMode])

  const groupedInvitationSections = useMemo(() => {
    if (!data) {
      return {
        familyGroups: [],
        individualGroups: [],
      }
    }

    const individualGroups = data.groups.filter(
      (group) => group.name.startsWith("Individual -") || group.totalCount === 1
    )

    const familyGroups = data.groups.filter(
      (group) => !group.name.startsWith("Individual -") && group.totalCount > 1
    )

    return {
      familyGroups,
      individualGroups,
    }
  }, [data])

  if (isLoading) {
    return (
      <section className="watercolor-bg flex min-h-screen items-center justify-center px-4">
        <div className="rounded-[2rem] border border-[#536343]/15 bg-white/75 p-8 text-center shadow-xl backdrop-blur-md">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#536343]" />
          <p className="mt-4 text-sm text-[#66705d]">
            Carregando confirmações...
          </p>
        </div>
      </section>
    )
  }

  if (!data) {
    return (
      <section className="watercolor-bg flex min-h-screen items-center justify-center px-4">
        <div className="rounded-[2rem] border border-[#536343]/15 bg-white/75 p-8 text-center shadow-xl backdrop-blur-md">
          <p className="text-[#66705d]">Não foi possível carregar os dados.</p>

          <Button
            type="button"
            onClick={() => fetchDashboard()}
            className="mt-5 rounded-full bg-[#536343] text-white hover:bg-[#435338]"
          >
            Tentar novamente
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="watercolor-bg min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="relative overflow-hidden rounded-[2.5rem] border border-[#536343]/20 bg-[#fffdf7]/85 p-6 shadow-2xl backdrop-blur-md sm:p-8">
          <img
            src="/images/flower-upper-right-corner.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 -top-28 w-[360px] opacity-50 sm:w-[520px]"
          />

          <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6c4aa0]">
                Dashboard
              </p>

              <h1 className="font-display mt-2 text-4xl font-semibold text-[#35452d] sm:text-5xl">
                Confirmações da festa
              </h1>

              <p className="mt-2 text-sm text-[#66705d]">
                Logado como {user.email}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => fetchDashboard(true)}
                disabled={isRefreshing}
                className="rounded-full border-[#536343]/20 bg-white/70 text-[#536343] hover:bg-[#536343]/10"
              >
                {isRefreshing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCcw className="mr-2 h-4 w-4" />
                )}
                Atualizar
              </Button>

              <Button
                type="button"
                onClick={handleSignOut}
                className="rounded-full bg-[#536343] text-white hover:bg-[#435338]"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>
        </header>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Users}
            label="Total"
            value={data.summary.totalGuests}
            description={`${data.summary.totalGroups} grupos`}
          />

          <StatCard
            icon={CheckCircle2}
            label="Confirmados"
            value={data.summary.confirmedGuests}
            description={`${data.summary.adultsConfirmed} adultos • ${data.summary.childrenConfirmed} crianças`}
          />

          <StatCard
            icon={XCircle}
            label="Não vão"
            value={data.summary.declinedGuests}
            description="Desmarcados na confirmação"
          />

          <StatCard
            icon={Clock3}
            label="Pendentes"
            value={data.summary.pendingGuests}
            description={`${data.summary.pendingGroups} grupos pendentes`}
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <FilterButton
            active={viewMode === "groups"}
            onClick={() => setViewMode("groups")}
          >
            Grupos
          </FilterButton>

          <FilterButton
            active={viewMode === "confirmed"}
            onClick={() => setViewMode("confirmed")}
          >
            Confirmados
          </FilterButton>

          <FilterButton
            active={viewMode === "declined"}
            onClick={() => setViewMode("declined")}
          >
            Não vão
          </FilterButton>

          <FilterButton
            active={viewMode === "pending"}
            onClick={() => setViewMode("pending")}
          >
            Pendentes
          </FilterButton>
        </div>

        {viewMode === "groups" ? (
          <div className="mt-6 space-y-10">
            <GroupSection
              title="Grupos familiares"
              description="Convites com duas ou mais pessoas vinculadas ao mesmo grupo."
              groups={groupedInvitationSections.familyGroups}
            />

            <GroupSection
              title="Convites individuais"
              description="Convidados que possuem confirmação individual."
              groups={groupedInvitationSections.individualGroups}
            />
          </div>
        ) : (
          <GuestList guests={filteredGuests} />
        )}
      </div>
    </section>
  )
}

type StatCardProps = {
  icon: typeof Users
  label: string
  value: number
  description: string
}

function StatCard({ icon: Icon, label, value, description }: StatCardProps) {
  return (
    <Card className="rounded-[2rem] border-[#536343]/15 bg-white/75 shadow-sm backdrop-blur-md">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6c4aa0]">
              {label}
            </p>

            <p className="font-display mt-2 text-4xl font-semibold text-[#35452d]">
              {value}
            </p>

            <p className="mt-2 text-sm text-[#66705d]">{description}</p>
          </div>

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#536343]/10 text-[#536343]">
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

type FilterButtonProps = {
  active: boolean
  onClick: () => void
  children: string
}

function FilterButton({ active, onClick, children }: FilterButtonProps) {
  return (
    <Button
      type="button"
      variant={active ? "default" : "outline"}
      onClick={onClick}
      className={cn(
        "rounded-full px-5",
        active
          ? "bg-[#536343] text-white hover:bg-[#435338]"
          : "border-[#536343]/20 bg-white/70 text-[#536343] hover:bg-[#536343]/10"
      )}
    >
      {children}
    </Button>
  )
}

type GroupSectionProps = {
  title: string
  description: string
  groups: DashboardGroup[]
}

function GroupSection({ title, description, groups }: GroupSectionProps) {
  if (groups.length === 0) {
    return null
  }

  return (
    <section>
      <div className="mb-4 rounded-[1.75rem] border border-[#536343]/15 bg-[#fffdf7]/75 px-5 py-4 shadow-sm backdrop-blur-md">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6c4aa0]">
          {title}
        </p>

        <p className="mt-2 text-sm leading-6 text-[#66705d]">
          {description}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </section>
  )
}

function GroupCard({ group }: { group: DashboardGroup }) {
  return (
    <Card className="rounded-[2rem] border-[#536343]/15 bg-white/75 shadow-sm backdrop-blur-md">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-semibold text-[#35452d]">
              {getDisplayGroupName(group.name)}
            </p>

            {group.notes && (
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#6c4aa0]">
                {group.notes}
              </p>
            )}

            {group.respondedAt ? (
              <p className="mt-2 text-sm text-[#66705d]">
                Confirmado por {group.respondedByName ?? "convidado"}
              </p>
            ) : (
              <p className="mt-2 text-sm text-[#66705d]">
                Ainda não respondeu
              </p>
            )}
          </div>

          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]",
              group.respondedAt
                ? "bg-[#536343]/10 text-[#536343]"
                : "bg-[#c2aa77]/20 text-[#7a6538]"
            )}
          >
            {group.respondedAt ? "respondido" : "pendente"}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-[#536343]/10 px-3 py-1 text-[#536343]">
            {group.confirmedCount} confirmados
          </span>

          <span className="rounded-full bg-[#6c4aa0]/10 px-3 py-1 text-[#6c4aa0]">
            {group.declinedCount} não vão
          </span>

          <span className="rounded-full bg-[#c2aa77]/20 px-3 py-1 text-[#7a6538]">
            {group.pendingCount} pendentes
          </span>
        </div>

        <div className="mt-5 grid gap-2">
          {group.guests.map((guest) => (
            <div
              key={guest.id}
              className="flex items-center justify-between gap-3 rounded-2xl bg-[#f7f2e8]/70 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-[#35452d]">
                  {guest.name}
                </p>

                {guest.isChild && (
                  <p className="mt-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#6c4aa0]">
                    criança
                  </p>
                )}
              </div>

              <span
                className={cn(
                  "rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em]",
                  getStatusClass(guest.status)
                )}
              >
                {getStatusLabel(guest.status)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function GuestList({ guests }: { guests: DashboardGuest[] }) {
  return (
    <div className="mt-6 rounded-[2rem] border border-[#536343]/15 bg-white/75 p-5 shadow-sm backdrop-blur-md">
      {guests.length === 0 ? (
        <p className="text-center text-sm text-[#66705d]">
          Nenhum convidado nessa categoria.
        </p>
      ) : (
        <div className="grid gap-3">
          {guests.map((guest) => (
            <div
              key={guest.id}
              className="flex items-center justify-between gap-4 rounded-2xl bg-[#f7f2e8]/70 px-4 py-3"
            >
              <div>
                <p className="font-medium text-[#35452d]">{guest.name}</p>

                <p className="mt-1 text-sm text-[#66705d]">
                  {getDisplayGroupName(guest.groupName)}
                </p>

                {guest.isChild && (
                  <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#6c4aa0]">
                    criança
                  </p>
                )}
              </div>

              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em]",
                  getStatusClass(guest.status)
                )}
              >
                {getStatusLabel(guest.status)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
