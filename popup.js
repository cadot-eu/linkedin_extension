// Function to export JSON
function exportJSON(tabData) {
    // Convert the data to JSON string
    const jsonData = JSON.stringify(tabData);

    // Create a Blob object from the JSON data
    const blobData = new Blob([jsonData], { type: 'application/json' });

    // Create a URL object from the Blob
    const blobUrl = URL.createObjectURL(blobData);

    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.download = 'data.json';

    // Simulate a click on the download link to start the download
    downloadLink.click();

    // Revoke the URL to release resources
    URL.revokeObjectURL(blobUrl);

    // Remove the download link
    downloadLink.remove();
}

// Add an event listener for the click on the export button
document.getElementById('exportButton').addEventListener('click', () => {
    // Code to retrieve tab data
    // For example, you can use chrome.tabs to get information about the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        const tabId = activeTab.id;

        // Send a message to the content script to request tab data
        chrome.tabs.sendMessage(tabId, { action: 'getTabData' }, function (response) {
            if (chrome.runtime.lastError) {
                // Handle errors
                console.error(chrome.runtime.lastError);
            } else {
                // Tab data is available in response.tabData
                const tabData = response.tabData;
                // Use the data as needed
                exportJSON(tabData);
            }
        });
    });
});