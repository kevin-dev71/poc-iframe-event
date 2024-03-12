import ListEnrolledCards from "@/modules/enrollment/components/list-enrolled-cards"

export default function Home() {
  return (
    <main className="flex flex-col gap-y-14">
      <nav>
        <h1 className="text-3xl">Logo Comercio Cliente</h1>
      </nav>

      <ListEnrolledCards />
    </main>
  )
}
