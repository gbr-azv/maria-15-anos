import { Button } from "@/components/ui/button"

function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-pink-50 p-6">
      <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-pink-400">
          Convite
        </p>

        <h1 className="mb-4 text-4xl font-bold text-pink-700">
          15 anos
        </h1>

        <p className="mb-6 text-gray-600">
          Ambiente inicial configurado com sucesso.
        </p>

        <Button>Começar convite</Button>
      </div>
    </main>
  )
}

export default App
