import React, { useRef, useState } from 'react';

const buttonDiv = {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    flex: '0 0 30%'
}

const copyButtonStyle = {
    display: 'flex',
    flex: '1 1 50%',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    border: '1px solid #222222',
    minHeight: '25vh',
    borderRadius: '8px',
    color: '#222222',
    cursor: 'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    fontSize: '1.5em',
    fontWeight: 'bold',
    margin: '2em',
    outline: 'none',
    padding: '50px',
    position: 'relative',
    textAlign: 'center',
    textDecoration: 'none',
    touchAction: 'manipulation',
    transition: 'box-shadow .2s,-ms-transform .1s,-webkit-transform .1s,transform .1s',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    boxShadow: '2px 2px 2px grey'
}

const copyButtonActiveStyle = {
    display: 'flex',
    flex: '1 1 50%',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D3D3D3',
    border: '1px solid #222222',
    minHeight: '25vh',
    borderRadius: '8px',
    color: '#222222',
    cursor: 'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    fontSize: '1.5em',
    fontWeight: 'bold',
    lineHeight: '20px',
    margin: '2em',
    outline: 'none',
    padding: '50px',
    position: 'relative',
    textAlign: 'center',
    textDecoration: 'none',
    touchAction: 'manipulation',
    transition: 'box-shadow .2s,-ms-transform .1s,-webkit-transform .1s,transform .1s',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    boxShadow: '2px 2px 2px black'
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

    const handleCopyClick = (e) => {
        pop(e, copyText);
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
        <div style={buttonDiv}>
            <button
                style={isCopied ? copyButtonActiveStyle : copyButtonStyle}
                className="copyButton"
                onClick={(event) => (handleCopyClick(event))}
                data-type='copyText'>
                {isCopied ? 'Copied!' : buttonText}
            </button>
            <input type="text" ref={textRef} defaultValue={copyText} hidden/>
        </div>
    );
}
function pop(e, copyText) {
    var amount = 30;
    if (e.target.dataset.type == 'copyText') {
        amount = copyText.split(/\r?\n/).length - 1;
    }
    // Quick check if user clicked the button using a keyboard
    const bbox = e.target.getBoundingClientRect();
    const x = bbox.left + bbox.width / 2;
    const y = bbox.top + bbox.height / 2;

    console.log(`x ${x} y ${y} type ${e.target}`)
    for (let i = 0; i < amount; i++) {
        // We call the function createParticle 30 times
        // We pass the coordinates of the button for x & y values
        createParticle(x, y, e.target.dataset.type, copyText);
    }
}

function createParticle(x, y, type, copyText) {
    const particle = document.createElement('particle');
    document.body.appendChild(particle);
    let width = Math.floor(Math.random() * 15 + 8);
    let height = width;
    let destinationX = (Math.random() - 0.5) * 800;
    let destinationY = (Math.random() - 0.5) * 800;
    let rotation = Math.random() * 520;
    let delay = Math.random() * 1000;

    switch (type) {
        case 'none':
            break;
        case 'square':
            particle.style.background = `hsl(${Math.random() * 90 + 270}, 70%, 60%)`;
            particle.style.border = '1px solid white';
            break;
        case 'copyText':
            var innerHTML = copyText.split(/\r?\n/);
            particle.innerHTML = innerHTML[Math.floor(Math.random() * (innerHTML.length - 1))];
            particle.style.fontSize = `${Math.random() * 14 + 10}px`;
            width = height = 'auto';
            rotation = 0;
            break;
        case 'letters':
            particle.innerHTML = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'][Math.floor(Math.random() * 26)];
            particle.style.fontSize = `${Math.random() * 24 + 10}px`;
            width = height = 'auto';
            break;
        case 'shadow':
            var color = `hsl(${Math.random() * 90 + 90}, 70%, 50%)`;
            particle.style.boxShadow = `0 0 ${Math.floor(Math.random() * 10 + 10)}px ${color}`;
            particle.style.background = color;
            particle.style.borderRadius = '50%';
            width = height = Math.random() * 5 + 4;
            break;
        case 'line':
            var color = `hsl(${Math.random() * 90 + 90}, 70%, 50%)`;
            particle.style.background = 'black';
            height = 1;
            rotation += 1000;
            delay = Math.random() * 1000;
            break;
    }

    particle.style.width = `${width}px`;
    particle.style.height = `${height}px`;
    const animation = particle.animate([
        {
            transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(0deg)`,
            opacity: 1
        },
        {
            transform: `translate(-50%, -50%) translate(${x + destinationX}px, ${y + destinationY}px)  rotate(${rotation}deg)`,
            opacity: 0
        }
    ], {
        duration: Math.random() * 1000 + 7500,
        easing: 'cubic-bezier(0, .9, .57, 1)',
        delay: delay
    });
    animation.onfinish = removeParticle;
}
function removeParticle(e) {
    e.srcElement.effect.target.remove();
}
