import { ClipboardCopy } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';

interface ClipboardCopyButtonProps {
    copyText: string;
    btnText?: string;
    className?: string;
    variant?: ButtonVariant;
}

export default function ClipboardCopyButton({ copyText, className, btnText, variant }: ClipboardCopyButtonProps) {
    const [copySuccess, setCopySuccess] = useState<boolean>(false);
    const [copyError, setCopyError] = useState<boolean>(false);

    const copyToClipboard = async () => {
        try {
            //Returns promise
            await navigator.clipboard.writeText(copyText);
            setCopySuccess(true);
        } catch {
            setCopyError(false);
        }
    };

    //Button value
    const buttonValue = () => {
        if (!copySuccess && !copyError) {
            return 'Copy' + (btnText ? ` ${btnText}` : '');
        } else if (!copySuccess && copyError) {
            return 'Error';
        } else {
            return 'Copied!';
        }
    };

    return (
        <Button variant={variant ? variant : 'default'} onClick={copyToClipboard} className={className}>
            <ClipboardCopy /> {buttonValue()}
        </Button>
    );
}
