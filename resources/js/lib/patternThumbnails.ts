//Remove new preview image URLS 
export function deleteImageUrls({ index, thumbnails, files }: { index: number, thumbnails: string[], files: File[] }) {
    URL.revokeObjectURL(thumbnails[index]);

    //Create new array without deleted image
    const newThumbnails = [...thumbnails];
    newThumbnails.splice(index, 1);

    const newFiles = [...files];
    newFiles.splice(index, 1);

    return { newThumbnails, newFiles }
}

export function handleDeletePreview(index: number, setImageThumbnails: Function, setData: Function, imageThumbnails: string[], data: { pattern_previews: File[] }) {
    //Remove from preview array
    const { newThumbnails, newFiles } = deleteImageUrls({ index, thumbnails: imageThumbnails, files: data.pattern_previews });
    setImageThumbnails(newThumbnails);
    setData("pattern_previews", newFiles);
}

// New files added in input field
export function handleNewFiles(e: React.ChangeEvent<HTMLInputElement>, setData: Function, setImageThumbnails: Function) {
    if (e.target.files) {
        const files = Array.from(e.target.files);
        setData("pattern_previews", files);

        // create tumbnails
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImageThumbnails(newPreviews);
    }
}

// Remove thumbnails when component unmounts
export function cleanUpThumbnails(thumbnails: string[]) {
    return thumbnails.forEach(thumbnail => URL.revokeObjectURL(thumbnail));
}

