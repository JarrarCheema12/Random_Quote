const quotedisplay = document.getElementById('quotedisplay');
const author = document.getElementById('author');
const newQuote = document.getElementById('quote');
const copyButton = document.getElementById('copy');
const shareButton = document.getElementById('share');
const exportButton = document.getElementById('export');
const quoteContainer = document.getElementById('quoteContainer');

const url = 'https://api.freeapi.app/api/v1/public/quotes/quote/random';
let bg_img = ''; // Use let instead of const

async function fetchData() {
    try {
        const response = await fetch(url);
        const rdata = await response.json();
        console.log(rdata.data);

        quotedisplay.innerText = `"${rdata.data.content}"`;
        author.innerText = `- ${rdata.data.author}`;
        randomimg(); // Set a new random image

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

newQuote.addEventListener('click', () => {
    fetchData();
});

copyButton.addEventListener('click', () => {
    const text = `Quote: ${quotedisplay.innerText} \nAuthor: ${author.innerText}`;
    navigator.clipboard.writeText(text).then(() => {
        alert(`Copied:\n${text}`);
    }).catch((err) => {
        alert("Error copying text", err);
    });
});

shareButton.addEventListener('click', () => {
    const textToShare = `${quotedisplay.innerText} \n${author.innerText}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(textToShare)}`;

    window.open(twitterUrl, '_blank'); // Opens Twitter in a new tab
});

function randomimg() {
    const imgs = [
        'https://plus.unsplash.com/premium_photo-1666900440561-94dcb6865554?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww',
        'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww'
    ];
    
    const randomIndex = Math.floor(Math.random() * imgs.length);
    const randomImage = imgs[randomIndex];

    // Set background image
    quoteContainer.style.backgroundImage = `url('${randomImage}')`;
    quoteContainer.style.backgroundSize = "cover";
    quoteContainer.style.backgroundPosition = "center";

    // Store the actual image URL
    bg_img = randomImage; 

    console.log("Random Image Selected:", randomImage);
}

exportButton.addEventListener('click', async () => {
    if (bg_img) {
        const response = await fetch(bg_img);
        const blob = await response.blob();
        const objectURL = URL.createObjectURL(blob);

        const anchor = document.createElement('a');
        anchor.href = objectURL;
        anchor.download = 'quote-background.jpg';  // Set file name
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    } else {
        alert("No background image found");
    }
});

fetchData();
