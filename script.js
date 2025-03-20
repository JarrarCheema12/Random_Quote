const quotedisplay = document.getElementById('quotedisplay');
const author = document.getElementById('author');
const newQuote = document.getElementById('quote');
const copyButton = document.getElementById('copy');
const shareButton = document.getElementById('share');
const exportButton = document.getElementById('export');
const quoteContainer = document.getElementById('quoteContainer');

const url = 'https://api.freeapi.app/api/v1/public/quotes/quote/random';

// Function to fetch a random background image
function setRandomBackground() {
    const images = [
        'https://source.unsplash.com/random/800x600?nature',
        'https://source.unsplash.com/random/800x600?scenery',
        'https://source.unsplash.com/random/800x600?mountains',
        'https://source.unsplash.com/random/800x600?sky',
        'https://source.unsplash.com/random/800x600?forest'
    ];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    quoteContainer.style.backgroundImage = `url(${randomImage})`;
    quoteContainer.style.backgroundSize = 'cover';
    quoteContainer.style.backgroundPosition = 'center';
}

// Function to fetch a new quote
async function fetchData() {
    try {
        const response = await fetch(url);
        const rdata = await response.json();
        console.log(rdata.data);

        quotedisplay.innerText = `"${rdata.data.content}"`;
        author.innerText = `- ${rdata.data.author}`;
        
        setRandomBackground();

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

newQuote.addEventListener('click', async () => {
    await fetchData();
});


copyButton.addEventListener('click', () => {
    const textToCopy = `${quotedisplay.innerText} \n${author.innerText}`;

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert("Quote copied to clipboard!");
        })
        .catch(err => {
            console.error("Error copying text: ", err);
        });
});


shareButton.addEventListener('click', () => {
    const textToShare = `${quotedisplay.innerText} \n${author.innerText}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(textToShare)}`;

    window.open(twitterUrl, '_blank');
});

exportButton.addEventListener('click', () => {
    html2canvas(quoteContainer).then(canvas => {
        const link = document.createElement('a');
        link.download = 'quote.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});


fetchData();
