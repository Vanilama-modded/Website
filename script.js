document.getElementById('questionForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const questionInput = document.getElementById('questionInput');
    const questionText = questionInput.value;

    // Create a new question element
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `
        <p>${questionText}</p>
        <form class="answer-form">
            <input type="text" class="answer-input" placeholder="Your answer..." required>
            <button type="submit" class="answer-button">Submit Answer</button>
        </form>
        <div class="answers"></div>
    `;

    // Add event listener for the answer form
    questionElement.querySelector('.answer-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        const answerInput = questionElement.querySelector('.answer-input');
        const answerText = answerInput.value;

        // Create a new answer element
        const answerElement = document.createElement('p');
        answerElement.textContent = answerText;

        // Append the answer to the answers div
        questionElement.querySelector('.answers').appendChild(answerElement);
        answerInput.value = ''; // Clear the input
    });

    // Append the new question to the questions list
    document.getElementById('questionsList').appendChild(questionElement);
    questionInput.value = ''; // Clear the input
});
