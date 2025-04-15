import { WpPatternJson } from "@/types/wpjson";
import { PatternJson } from "@/types/patterns";


//Populate form by JSON upload
export const handleJsonUpload = (e: React.ChangeEvent<HTMLInputElement>, setFormError: Function, setData: Function) => {
    setFormError(null);
    const file = e.target.files?.[0];

    if(!file) return; 

    const reader = new FileReader();

    //Get file content
    reader.onload = (event: ProgressEvent<FileReader>) => {
        const text = event.target?.result; 
        //Parse JSON
        try {
            if(typeof text === "string") {
                const json = JSON.parse(text) as WpPatternJson;

                //Check if valid block pattern JSON
                if(!json.title || !json.content) {
                    setFormError("File is not a valid pattern JSON.");
                    return;
                }

                //Populate fields with file data
                setData("title", json.title);
                setData("pattern_data", json.content);
            }
        } catch (error) {
            setFormError("Invalid JSON file");
        }
    }

    reader.readAsText(file);
}

//Download pattern as JSON file
export const handleJsonDownload = (pattern: PatternJson) => {
    const jsonData = {
        "__file": "wp_block",
        "title": pattern.title, 
        "content": pattern.pattern_data,
        "syncStatus": "unsynced"
    }

    //Convert to JSON 
    const jsonString = JSON.stringify(jsonData, null, 2);
    
    //Make url
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    //Generate filename
    const fileName = pattern.title
    .toLowerCase()
    .replace(/å/g, 'a')
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '') + ".json";

     //Create a link and click it
    const link = document.createElement("a");
    link.href = url; 
    link.download = fileName; 
    document.body.appendChild(link);
    link.click(); 

    //Remove link
    document.body.removeChild(link);
    URL.revokeObjectURL(url); 
}