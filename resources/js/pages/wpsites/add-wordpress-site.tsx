import WPSitesLayout from "@/layouts/WPsitesLayout"
import { useForm } from "@inertiajs/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AddWordPressSite() {
    const { errors, data, setData, post, processing } = useForm({ url: "" });
    //Breadcrumbs
    const breadCrumbs = [
        { title: "Add WordPress Site", href: route("wordpress.new") }
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("wordpress.new"));
    }


    return (
        <WPSitesLayout title="Add WordPress Site" breadcrumbs={breadCrumbs}>
            <h1 className="text-2xl">Add a new WordPress Site</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <label htmlFor="url">Website URL:</label>
                {errors.url && <p className="text-red-500">{errors.url}</p>}
                <Input type="text" id="url" name="url" className="mt-2 mb-4" value={data.url} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData("url", e.target.value)} />
                <Button type="submit" className="mt-4 cursor-pointer">{processing ? "Adding site" : "Add site"}</Button>
            </form>
        </WPSitesLayout>
    )
}
