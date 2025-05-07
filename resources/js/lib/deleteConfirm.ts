//Clicked button
export const handleConfirm = (confirmDelete: boolean, setConfirmDelete: (value: boolean) => void, handleDelete: () => void) => {
    if (confirmDelete) {
        handleDelete();
        setConfirmDelete(false);
        return;
    }
    setConfirmDelete(true);
};
