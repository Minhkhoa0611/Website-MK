let inputSequence = ""; // Variable to store the typed sequence

document.addEventListener('keydown', function(e) {
    inputSequence += e.key.toUpperCase(); // Add the pressed key to the sequence (convert to uppercase)
    
    // Check if the last 4 characters match "KHOA" to show items
    if (inputSequence.endsWith("MK")) {
        const items = ['item1', 'item2', 'item3', 'item4']; // List of possible items
        items.forEach(itemId => {
            const item = document.getElementById(itemId);
            if (item) item.classList.remove('hidden'); // Show item if it exists
        });
        inputSequence = ""; // Reset the sequence after showing items
    }
    
    // Check if the last 5 characters match "TKHOA" to hide items
    if (inputSequence.endsWith("TK")) {
        const items = ['item1', 'item2', 'item3', 'item4']; // List of possible items
        items.forEach(itemId => {
            const item = document.getElementById(itemId);
            if (item) item.classList.add('hidden'); // Hide item if it exists
        });
        inputSequence = ""; // Reset the sequence after hiding items
    }

    // Limit the input sequence to prevent it from growing indefinitely
    if (inputSequence.length > 5) {
        inputSequence = inputSequence.slice(-5);
    }
});
