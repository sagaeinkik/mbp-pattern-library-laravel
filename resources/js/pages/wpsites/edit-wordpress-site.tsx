import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import WPSitesLayout from "@/layouts/WPsitesLayout"
import { WPSite } from "@/types/wpsite"
import { router, useForm } from "@inertiajs/react";
import { handleConfirm } from "@/lib/deleteConfirm";
import { useState } from "react";

export default function EditWordPressSite({ wpSite }: { wpSite: WPSite }) {
    const { errors, data, setData, put, processing } = useForm({ url: wpSite.url });
    const [confirmDelete, setConfirmDelete] = useState(false);

    const breadCrumbs = [
        { title: "Edit " + wpSite.url, href: route("wordpress.edit", { wordpress: wpSite }) }
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("wordpress.update", { wordpress: wpSite }))
    }

    const handleDelete = () => {
        if(confirmDelete) {
            router.delete(route("wordpress.delete", { wordpress: wpSite }));
        }
    }

    return (
        <WPSitesLayout title="Edit site" breadcrumbs={breadCrumbs}>
            <h1 className="text-2xl">Edit WordPress site</h1>
            <form onSubmit={handleSubmit} className="mt-4 mb-10 md:w-4/5 lg:w">
                <label htmlFor="url">Website URL:</label>
                {errors.url && <p className="text-red-500">{errors.url}</p>}
                <Input type="text" id="url" name="url" className="mt-2 mb-4" value={data.url} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData("url", e.target.value)} />
                <Button type="submit" className="mt-4 cursor-pointer">{processing ? "Saving changes" : "Save changes"}</Button>
            </form>

            <h2 className="text-xl">Delete site</h2>
            { confirmDelete && <p className="mt-3 text-red-600 dark:text-red-400">Are you absolutely certain you want to delete this site? This action cannot be undone. Once deleted, a site cannot be recovered.</p>}
            <Button variant="destructive" className="mt-4"onClick={() => { handleConfirm(confirmDelete, setConfirmDelete, handleDelete) }}>{ confirmDelete ? "Confirm delete" : "Delete"}</Button>
            
        </WPSitesLayout>
    )
}
