// Function to load the URL with "/Details/Experience/"
function loadExperiencePage() {
    if (!window.location.href.endsWith("/details/experience/")) {
        const url = window.location.href + "details/experience/";
        window.location.href = url;
    }
}

// Function to scroll through the page
function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
}

// Function to wait a deadline
function wait(delay) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}



// Call the LADEXPERIENCEPEGE function
loadExperiencePage();
let tab = [];
// wait until the page is completely busy
window.addEventListener("load", async function () {
    // awaits the end of the initial load
    await wait(1000);

    // scroll through the page up to the bottom 10 times
    for (let i = 0; i < 10; i++) {
        scrollToBottom();
        await wait(1000);
    }


    // Recover all content in <span aria-hidden = "true">

    let poste;
    let date;
    let lieu;
    let entreprise;
    let experience;
    let image;
    let parent;
    const mois = ['jan', 'fév', 'mar', 'avr', 'mai', 'jui', 'jui', 'aoû', 'sep', 'oct', 'nov', 'déc'];
    const regexYear = /^\d{4}$/;
    //onRechercheTousLesSpansAvecDisplayFlexAlignItemsCenterMr1TBold
    document.querySelectorAll("div.display-flex.flex-column.full-width.align-self-center").forEach((div) => {
        const posteElement = div.querySelector("div.display-flex.align-items-center.mr1.t-bold span");
        const entrepriseElement = div.querySelector("span.t-14.t-normal span");
        const dateElement = div.querySelector("span.t-14.t-normal.t-black--light span");
        const lieuElements = div.querySelectorAll("span.t-14.t-normal.t-black--light span");
        const experiences = div.querySelector('div.display-flex.align-items-center.t-14.t-normal.t-black')
        const images = div.querySelectorAll('a.optional-action-target-wrapper')

        if (dateElement) date = dateElement.textContent;
        if (posteElement) poste = posteElement.textContent;
        if (entrepriseElement && dateElement && entrepriseElement.textContent != dateElement.textContent) entreprise = entrepriseElement.textContent;
        if (experiences) experience = experiences.querySelector('span').textContent;
        if (lieuElements[2]) lieu = lieuElements[2].textContent;
        image = [];
        if (images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                image.push(images[i].getAttribute('href'))
            }
        }

        tab.push({
            'poste': poste,
            'entreprise': entreprise,
            'date': date,
            'lieu': lieu,
            'experience': experience,
            'image': image
        });
    });


});


// Listen to messages from the Script Popup
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'getTabData') {
        // Send TAB data in the answer
        sendResponse({ tabData: tab });
    }
});