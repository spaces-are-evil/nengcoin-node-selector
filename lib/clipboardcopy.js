import React, { useRef, useState } from 'react';

const copybuttonstyle = {
    'background-color': '#FFFFFF',
    border: '1px solid #222222',
    'border-radius': '8px',
    'box-sizing': 'border-box',
    color: '#222222',
    cursor: 'pointer',
    display: 'inline-block',
    'font-family': '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    'font-size': '1.5em',
    'font-weight': 'bold',
    'line-height': '20px',
    margin: '2em',
    outline: 'none',
    padding: '80px 100px',
    position: 'relative',
    'text-align': 'center',
    'text-decoration': 'none',
    'touch-action': 'manipulation',
    transition: 'box-shadow .2s,-ms-transform .1s,-webkit-transform .1s,transform .1s',
    'user-select': 'none',
    '-webkit-user-select': 'none',
    width: 'auto',
}

export function ClipboardCopy({  copyText, buttonText, isNodeOutput }) {
    const [isCopied, setIsCopied] = useState(false);
    const textRef = useRef(null);

    if (isNodeOutput == "true") {
        var output = "";
        copyText.map(node => {
            output = output + "addnode=" + node.ipport + "\n";
        });
        copyText = output;
    }


    async function copyTextToClipboard(text) {

        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            textRef.current.select();
            return document.execCommand('copy');
            text.target.focus();
        }
    }

    const handleCopyClick = () => {

        copyTextToClipboard(copyText)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div>
            <button style={copybuttonstyle} className="copyButton" onClick={handleCopyClick}>
                <span>{isCopied ? 'Copied!' : buttonText}</span>
            </button>
            <input type="text" ref={textRef} defaultValue={copyText} hidden/>
        </div>
    );
}