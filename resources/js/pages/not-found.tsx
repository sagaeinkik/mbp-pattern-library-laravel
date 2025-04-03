import AppLayout from "@/layouts/app-layout"

export default function NotFound() {
  return (
    <AppLayout>
      <div className="p-6">

        <h1 className="text-3xl mb-4">Uh-oh!</h1>
        <p>We couldn't find what you were looking for. Sorry about that.</p>
      </div>
    </AppLayout>
  )
}
