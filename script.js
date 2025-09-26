function calculate() {
    // Get input and clear previous results
    const input = document.getElementById('numbers').value;
    const errorDiv = document.getElementById('error');
    const resultsDiv = document.getElementById('results');
    
    // Hide previous results/errors
    errorDiv.style.display = 'none';
    resultsDiv.style.display = 'none';
    errorDiv.textContent = '';
    resultsDiv.innerHTML = '';

    // Split and validate input
    const numbers = input.split(',').map(num => num.trim()).filter(num => num !== '');
    
    // Check for exactly 10 numbers
    if (numbers.length !== 10) {
        showError(`Error: Exactly 10 numbers required (found ${numbers.length})`);
        return;
    }

    // Convert to numbers and validate range
    const parsedNumbers = [];
    for (let i = 0; i < numbers.length; i++) {
        const num = parseFloat(numbers[i]);
        
        if (isNaN(num)) {
            showError(`Error: "${numbers[i]}" is not a valid number`);
            return;
        }
        
        if (num < 10 || num > 1000) {
            showError(`Error: Number ${num} is out of range (must be between 10 and 1000)`);
            return;
        }
        
        parsedNumbers.push(num);
    }

    // Calculate results
    const min = Math.min(...parsedNumbers);
    const max = Math.max(...parsedNumbers);
    const avg = parsedNumbers.reduce((a, b) => a + b, 0) / parsedNumbers.length;

    // Display results
    showResults(min, max, avg);
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function showResults(min, max, avg) {
    const resultsDiv = document.getElementById('results');
    
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <div class="result-item">
            <span class="result-label">Minimum:</span>
            <span class="result-value min-value">${min}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Maximum:</span>
            <span class="result-value max-value">${max}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Average:</span>
            <span class="result-value">${avg.toFixed(2)}</span>
        </div>
    `;
    
    resultsDiv.style.display = 'block';
}

// Add event listener for Enter key
document.getElementById('numbers').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calculate();
    }
});
