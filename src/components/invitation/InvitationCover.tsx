import { motion } from "motion/react"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"

type InvitationCoverProps = {
  onOpen: () => void
}

export function InvitationCover({ onOpen }: InvitationCoverProps) {
  return (
    <motion.section
      className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f0e6] px-5"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.04,
        filter: "blur(10px)",
        transition: { duration: 0.8, ease: "easeInOut" },
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.img
          src="/images/flower-upper-right-corner-removebg.png"
          alt=""
          aria-hidden="true"
          className="absolute -right-24 -top-20 w-87.5 opacity-70 sm:w-120 lg:w-155"
          initial={{ opacity: 0, x: 80, y: -80, rotate: 8 }}
          animate={{ opacity: 0.75, x: 0, y: 0, rotate: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />

        <motion.img
          src="/images/flower-lower-left-corner-removebg.png"
          alt=""
          aria-hidden="true"
          className="absolute -bottom-24 -left-24 w-90 opacity-70 sm:w-125 lg:w-162.5"
          initial={{ opacity: 0, x: -80, y: 80, rotate: -8 }}
          animate={{ opacity: 0.75, x: 0, y: 0, rotate: 0 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.15 }}
        />

        <div className="absolute left-10 top-10 h-44 w-44 rounded-full bg-[#d8d5c3]/50 blur-3xl" />
        <div className="absolute bottom-16 right-10 h-52 w-52 rounded-full bg-[#c8b4db]/30 blur-3xl" />
      </div>

      <motion.div
        className="relative w-full max-w-107.5"
        initial={{ opacity: 0, y: 26, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.div
          className="relative overflow-hidden rounded-[2rem] border border-[#536343]/30 bg-[#fffdf7]/90 p-6 shadow-2xl backdrop-blur-md"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.25 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(196,183,150,0.25),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(130,96,166,0.18),transparent_35%)]" />

          <div className="relative mx-auto mb-7 flex aspect-4/3 w-full max-w-82.5 items-center justify-center rounded-3xl border border-[#536343]/25 bg-[#f8f2e8] shadow-inner">
            <motion.div
              className="absolute inset-x-6 bottom-8 h-[44%] rounded-b-2xl border border-[#536343]/25 bg-[#eee5d5]"
              initial={{ y: 10 }}
              animate={{ y: [8, 0, 8] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="absolute left-6 right-6 top-8 h-[48%] origin-top rounded-t-2xl border border-[#536343]/25 bg-[#f7efe1] [clip-path:polygon(0_0,100%_0,50%_100%)]"
              initial={{ rotateX: 0 }}
              animate={{ rotateX: [0, -16, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-[#536343]/25 bg-white/80 shadow-lg">
              <Heart className="h-9 w-9 fill-[#6c4aa0] text-[#6c4aa0]" />
            </div>
          </div>

          <div className="relative text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-[#536343]">
              Convite especial
            </p>

            <h1 className="font-serif text-4xl font-semibold text-[#35452d] sm:text-5xl">
              Maria Clara
            </h1>

            <p className="font-script mt-2 text-4xl text-[#6c4aa0]">
              15 anos
            </p>

            <p className="mx-auto mt-5 max-w-xs text-sm leading-6 text-[#5d674f]">
              Você é meu convidado para celebrar esse momento especial.
            </p>

            <Button
              type="button"
              onClick={onOpen}
              className="mt-7 rounded-full bg-[#536343] px-8 py-6 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-lg hover:bg-[#435338]"
            >
              Toque para abrir
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
