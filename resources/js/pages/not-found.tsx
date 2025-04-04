import GuestLayout from "@/layouts/guest-layout"

export default function NotFound() {
  return (
    <GuestLayout>
      <div className="p-6">
        <h1 className="text-3xl mb-4">Uh-oh!</h1>
        <p>We couldn't find what you were looking for. Sorry about that.</p>
        <p className="mt-8 text-2xl text-primary-foreground/40">404</p>
      </div>
    </GuestLayout>
  )
}
