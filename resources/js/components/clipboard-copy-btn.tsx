import { Button } from './ui/button'
import { ClipboardCopy } from 'lucide-react'
import { useState } from 'react'

interface ClipboardCopyButtonProps {
    copyText: string;
    btnText?: string;
    className?: string;
}

export default function ClipboardCopyButton( { copyText, className, btnText } : ClipboardCopyButtonProps) {
    const [copySuccess, setCopySuccess] = useState<boolean>(false);
    const [copyError, setCopyError] = useState<boolean>(false);

    const copyToClipboard = async () => {
        try {
            //Returns promise
            await navigator.clipboard.writeText(copyText);
            setCopySuccess(true);
        } catch (error) {
            setCopyError(false);
        }
    }

    //Button value
    const buttonValue = () => {
        if (!copySuccess && !copyError) {
            return "Copy" + (btnText ? ` ${btnText}` : "");
        } else if (!copySuccess && copyError) {
            return "Error";
        } else {
            return "Copied!";
        }
    }

    return (
        <Button onClick={copyToClipboard} className={className}><ClipboardCopy /> {buttonValue()}</Button>
    )
}
