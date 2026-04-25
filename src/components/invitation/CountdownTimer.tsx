import { useEffect, useState } from "react"
import { Clock3 } from "lucide-react"
import { motion } from "motion/react"

const targetDate = new Date("2026-06-06T12:00:00-03:00").getTime()

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(): TimeLeft {
  const difference = Math.max(targetDate - Date.now(), 0)

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((difference / (1000 * 60)) % 60)
  const seconds = Math.floor((difference / 1000) % 60)

  return {
    days,
    hours,
    minutes,
    seconds,
  }
}

function formatNumber(value: number) {
  return String(value).padStart(2, "0")
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft())

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  const items = [
    { label: "Dias", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Seg", value: timeLeft.seconds },
  ]

  return (
    <motion.section
      className="rounded-[2rem] border border-[#536343]/15 bg-[#fffdf7]/75 p-5 text-center shadow-sm backdrop-blur-md sm:p-7"
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#6c4aa0]/10 text-[#6c4aa0]">
        <Clock3 className="h-6 w-6" />
      </div>

      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6c4aa0]">
        Contagem regressiva
      </p>

      <h2 className="font-display mt-2 text-3xl font-semibold text-[#35452d] sm:text-4xl">
        Falta pouco para celebrar
      </h2>

      <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-[#536343]/10 bg-white/70 px-2 py-4 shadow-sm"
          >
            <p className="font-display text-3xl font-semibold leading-none text-[#35452d] sm:text-4xl">
              {item.label === "Dias" ? item.value : formatNumber(item.value)}
            </p>

            <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#66705d] sm:text-xs">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  )
}
