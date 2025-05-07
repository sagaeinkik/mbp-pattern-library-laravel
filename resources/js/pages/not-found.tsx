import GuestLayout from '@/layouts/guest-layout';

export default function NotFound() {
    return (
        <GuestLayout>
            <div className="p-6">
                <h1 className="mb-4 text-3xl">Uh-oh!</h1>
                <p>We couldn't find what you were looking for. Sorry about that.</p>
                <p className="text-primary-foreground/40 mt-8 text-2xl">404</p>
            </div>
        </GuestLayout>
    );
}
