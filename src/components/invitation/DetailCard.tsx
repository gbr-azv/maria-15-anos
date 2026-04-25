import type { LucideIcon } from "lucide-react"
import { ExternalLink } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type DetailCardProps = {
  icon: LucideIcon
  label: string
  title: string
  description?: string
  href?: string
  cta?: string
  highlighted?: boolean
}

export function DetailCard({
  icon: Icon,
  label,
  title,
  description,
  href,
  cta,
  highlighted = false,
}: DetailCardProps) {
  const content = (
    <Card
      className={cn(
        "group h-full rounded-[1.75rem] border-[#536343]/15 bg-white/70 shadow-sm backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-xl",
        highlighted &&
          "relative overflow-hidden border-[#6c4aa0]/35 bg-[#fffdf7]/90 shadow-md ring-1 ring-[#6c4aa0]/15"
      )}
    >
      {highlighted && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(108,74,160,0.16),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(83,99,67,0.14),transparent_34%)] opacity-80"
        />
      )}

      <CardContent className="relative flex h-full flex-col items-center p-6 text-center">
        <div
          className={cn(
            "mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#536343]/10 text-[#536343]",
            highlighted && "bg-[#6c4aa0]/10 text-[#6c4aa0]"
          )}
        >
          <Icon className="h-7 w-7" />
        </div>

        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#6c4aa0]">
          {label}
        </p>

        <h3 className="text-xl font-semibold text-[#35452d]">{title}</h3>

        {description && (
          <p className="mt-2 text-sm leading-6 text-[#66705d]">
            {description}
          </p>
        )}

        {cta && (
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#6c4aa0]/20 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6c4aa0] transition group-hover:border-[#6c4aa0]/35 group-hover:bg-[#6c4aa0]/10">
            {cta}
            <ExternalLink className="h-3.5 w-3.5" />
          </div>
        )}
      </CardContent>
    </Card>
  )

  if (!href) {
    return content
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className="block h-full">
      {content}
    </a>
  )
}
