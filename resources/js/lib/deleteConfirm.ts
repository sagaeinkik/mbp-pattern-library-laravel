import { router } from "@inertiajs/react";

//Clicked button
export const handleConfirm = (confirmDelete: boolean, setConfirmDelete: Function, handleDelete: Function) => {
    if (confirmDelete) {
        handleDelete();
        setConfirmDelete(false);
        return;
    }
    setConfirmDelete(true);
}
