import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { Loader2 } from "lucide-react"

import { AdminDashboard } from "./AdminDashboard"
import { AdminLogin } from "./AdminLogin"
import { supabase } from "@/lib/supabase"

export function AdminPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    supabase.auth.getUser().then(({ data }) => {
      if (!isMounted) return

      setUser(data.user)
      setIsLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  if (isLoading) {
    return (
      <section className="watercolor-bg flex min-h-screen items-center justify-center px-4">
        <div className="rounded-[2rem] border border-[#536343]/15 bg-white/75 p-8 text-center shadow-xl backdrop-blur-md">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#536343]" />
          <p className="mt-4 text-sm text-[#66705d]">Carregando acesso...</p>
        </div>
      </section>
    )
  }

  return user ? <AdminDashboard user={user} /> : <AdminLogin />
}
