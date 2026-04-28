import {
  CalendarDays,
  Clock,
  Martini,
  MapPin,
  Utensils,
  Waves,
} from "lucide-react"

import { motion } from "motion/react"

import { DetailCard } from "@/components/invitation/DetailCard"
import { RsvpForm } from "@/components/invitation/RsvpForm"
import { CountdownTimer } from "@/components/invitation/CountdownTimer"
import { Card, CardContent } from "@/components/ui/card"

type InvitationContentProps = {
  isOpen: boolean
}

const mapsUrl = "https://maps.app.goo.gl/ZLddiyvwguQw35RB7"

export function InvitationContent({ isOpen }: InvitationContentProps) {
  return (
    <section className="watercolor-bg relative isolate min-h-screen overflow-hidden px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.img
          src="/images/flower-upper-right-corner-removebg.png"
          alt=""
          aria-hidden="true"
          className="absolute -right-28 -top-20 w-90 max-w-none select-none opacity-90 sm:w-130 lg:-right-36 lg:-top-28 lg:w-180"
          initial={{ opacity: 0, x: 120, y: -120, rotate: 8, scale: 0.94 }}
          animate={
            isOpen
              ? { opacity: 0.95, x: 0, y: 0, rotate: 0, scale: 1 }
              : { opacity: 0.25, x: 80, y: -80, rotate: 6, scale: 0.96 }
          }
          transition={{ duration: 1.3, ease: "easeOut", delay: 0.15 }}
        />

        <motion.img
          src="/images/flower-lower-left-corner-removebg.png"
          alt=""
          aria-hidden="true"
          className="absolute -bottom-28 -left-28 w-95 max-w-none select-none opacity-90 sm:w-140 lg:-bottom-44 lg:-left-40 lg:w-190"
          initial={{ opacity: 0, x: -120, y: 120, rotate: -8, scale: 0.94 }}
          animate={
            isOpen
              ? { opacity: 0.95, x: 0, y: 0, rotate: 0, scale: 1 }
              : { opacity: 0.25, x: -80, y: 80, rotate: -6, scale: 0.96 }
          }
          transition={{ duration: 1.3, ease: "easeOut", delay: 0.3 }}
        />
      </div>

      <motion.div
        className="relative mx-auto max-w-5xl"
        initial={{ opacity: 0, y: 36, scale: 0.98 }}
        animate={
          isOpen
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0.45, y: 24, scale: 0.985 }
        }
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <div className="relative overflow-hidden rounded-[2.5rem] border border-[#536343]/18 bg-[#fffdf7]/80 px-5 py-10 shadow-2xl backdrop-blur-md sm:px-8 sm:py-14 lg:px-14">

          <div className="relative z-10 mx-auto max-w-4xl">
            <motion.header
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#536343] sm:text-base">
                Você é meu convidado
                <br className="sm:hidden" /> para celebrar!
              </p>

              <div className="mx-auto my-5 flex max-w-xs items-center justify-center gap-4 text-[#536343]">
                <span className="h-px flex-1 bg-[#536343]/45" />
                <span className="text-xl">♡</span>
                <span className="h-px flex-1 bg-[#536343]/45" />
              </div>

              <h1 className="font-serif text-6xl font-semibold leading-none tracking-tight text-[#35452d] sm:text-7xl lg:text-8xl">
                Maria Clara
              </h1>

              <div className="mt-4 flex items-center justify-center gap-4">
                <span className="hidden h-px w-20 bg-[#536343]/45 sm:block" />
                <p className="font-script text-5xl text-[#6c4aa0] sm:text-6xl">
                  15 anos
                </p>
                <span className="hidden h-px w-20 bg-[#536343]/45 sm:block" />
              </div>
            </motion.header>

            <motion.div
              className="mt-12 grid gap-4 sm:grid-cols-3"
              initial={{ opacity: 0, y: 24 }}
              animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.55 }}
            >
              <DetailCard
                icon={CalendarDays}
                label="Data"
                title="06/06/2026"
                description="Sábado"
              />

              <DetailCard
                icon={Clock}
                label="Horário"
                title="12h às 19h"
                description="Uma tarde especial"
              />

              <DetailCard
                icon={MapPin}
                label="Local"
                title="R&B Festas e Eventos"
                description="Ponte Alta Norte — Gama/DF"
                href={mapsUrl}
                cta="Abrir localização"
                highlighted
              />
            </motion.div>

            <motion.div
              className="mx-auto mt-12 max-w-2xl text-center"
              initial={{ opacity: 0, y: 24 }}
              animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.75 }}
            >
              <p className="font-serif text-3xl leading-relaxed text-[#4f5d43] sm:text-4xl">
                Um dia para relaxar, se divertir e criar boas memórias!
              </p>
            </motion.div>

            <motion.section
              className="mt-12"
              initial={{ opacity: 0, y: 24 }}
              animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.9 }}
            >
              <Card className="mx-auto max-w-2xl rounded-[2rem] border-[#536343]/15 bg-[#e9e5d6]/75 shadow-sm backdrop-blur-md">
                <CardContent className="p-6 sm:p-8">
                  <div className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6c4aa0]">
                      Observações
                    </p>
                  </div>

                  <div className="mt-6 grid gap-4">
                    <div className="flex items-center gap-4 rounded-2xl bg-white/45 p-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#536343] text-white">
                        <Waves className="h-6 w-6" />
                      </div>

                      <p className="font-medium uppercase tracking-[0.08em] text-[#536343]">
                        Leve sua roupa de banho
                      </p>
                    </div>

                    <div className="flex items-center gap-4 rounded-2xl bg-white/45 p-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#536343] text-white">
                        <Utensils className="h-6 w-6" />
                      </div>

                      <p className="font-medium uppercase tracking-[0.08em] text-[#536343]">
                        Buffet especial para aproveitar a festa com sabor
                      </p>
                    </div>

                    <div className="flex items-center gap-4 rounded-2xl bg-white/45 p-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#536343] text-white">
                        <Martini className="h-6 w-6" />
                      </div>

                      <p className="font-medium uppercase tracking-[0.08em] text-[#536343]">
                        Drinks e refrescos para brindar esse dia especial
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            <motion.section
              className="mx-auto mt-12 max-w-2xl"
              initial={{ opacity: 0, y: 24 }}
              animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 1 }}
            >
              <CountdownTimer />
            </motion.section>

            <motion.section
              className="mx-auto mt-12 max-w-2xl"
              initial={{ opacity: 0, y: 24 }}
              animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 1.15 }}
            >
              <RsvpForm />
            </motion.section>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
