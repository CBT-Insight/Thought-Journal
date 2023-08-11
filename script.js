document.addEventListener('DOMContentLoaded', () => {
  const thoughtForm = document.getElementById('thought-form');
  const thoughtList = document.getElementById('thoughts-list');

  let thoughts = [];

  // Predefined list of keywords for each cognitive distortion
  const cognitiveDistortions = {
    allOrNothing: ['always', 'never', 'everyone', 'nobody', 'every', 'none'],
    catastrophizing: ['disaster', 'horrible', 'awful', 'terrible', 'nightmare'],
    mindReading: ['know', 'think', 'assume', 'guess', 'predict'],
    overgeneralization: ['always', 'never', 'every', 'none', 'everybody', 'nobody'],
    labeling: ['loser', 'failure', 'stupid', 'incompetent', 'idiot'],
    personalization: ['blame', 'responsible', 'fault', 'credit'],
    discountingPositive: ['but', 'only', 'just', 'not as', 'not enough'],
    emotionalReasoning: ['feel', 'feeling', 'seems', 'feels like'],
    shouldStatements: ['should', 'must', 'ought', 'have to'],
    fortuneTelling: ['will', 'never', 'always', 'predict', 'inevitable'],
    magnificationMinimization: ['always', 'never', 'worst', 'best', 'trivial', 'insignificant'],
    controlFallacies: ['always', 'never', 'control', 'powerless', 'responsible']
  };
  function addThought(thought) {
    thoughts.push(thought);
    displayThoughts();
  }

  function displayThoughts() {
    thoughtList.innerHTML = '';
    thoughts.forEach((thought, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <span>Thought ${index + 1}: ${thought}</span>
        <button class="reframe-btn" data-index="${index}">Reframe</button>
        <div class="distortions-feedback" data-index="${index}"></div>
      `;
      thoughtList.appendChild(listItem);
    });

    // Attach click event to each "Reframe" button
    const reframeBtns = document.querySelectorAll('.reframe-btn');
    reframeBtns.forEach((btn) => {
      btn.addEventListener('click', handleReframe);
    });

    // Analyze thoughts for cognitive distortions
    analyzeThoughts();
  }

  thoughtForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const thoughtInput = document.getElementById('thought-input');
    const thought = thoughtInput.value.trim();
    if (thought !== '') {
      addThought(thought);
      thoughtInput.value = '';
    }
  });

  function handleReframe(event) {
    const index = event.target.dataset.index;
    const thoughtToReframe = thoughts[index];
    const reframedThought = prompt(`Reframe thought ${index + 1}:`, thoughtToReframe);

    // Update the thought in the array and re-display the thoughts
    if (reframedThought !== null && reframedThought.trim() !== '') {
      thoughts[index] = reframedThought.trim();
      displayThoughts();
    }
  }

 function analyzeThoughts() {
    thoughts.forEach((thought, index) => {
      const distortions = [];

      // Check for all-or-nothing thinking
      if (cognitiveDistortions.allOrNothing.some(keyword => thought.toLowerCase().includes(keyword))) {
        distortions.push('All-or-Nothing Thinking');
      }

      // Check for catastrophizing
      if (cognitiveDistortions.catastrophizing.some(keyword => thought.toLowerCase().includes(keyword))) {
        distortions.push('Catastrophizing');
      }

      // Check for mind-reading
      if (cognitiveDistortions.overgeneralization.some(keyword => thought.toLowerCase().includes(keyword))) {
        distortions.push('Overgeneralization');
      }
      if (cognitiveDistortions.mindReading.some(keyword => thought.toLowerCase().includes(keyword))) {
        distortions.push('Mind-Reading');
      }
      if (cognitiveDistortions.labeling.some(keyword => thought.toLowerCase().includes(keyword))) {
        distortions.push('Labeling');
      }
      if (cognitiveDistortions.personalization.some(keyword => thought.toLowerCase().includes(keyword))) {
        distortions.push('Personalization');
      }
      if (cognitiveDistortions.discountingPositive.some(keyword => thought.toLowerCase().includes(keyword))) {
        distortions.push('Discounting the Positive');
      }
      if (cognitiveDistortions.emotionalReasoning.some(keyword => thought.toLowerCase().includes(keyword))) {
        distortions.push('Emotional Reasoning');
      }
      if (cognitiveDistortions.shouldStatements.some(keyword => thought.toLowerCase().includes(keyword))) {
        distortions.push('Should Statements');
      }
      if (cognitiveDistortions.fortuneTelling.some(keyword => thought.toLowerCase().includes(keyword))) {
        distortions.push('Fortune Telling');
      }
      if (cognitiveDistortions.magnificationMinimization.some(keyword => thought.toLowerCase().includes(keyword))) {
        distortions.push('Magnification and Minimization');
      }
      if (cognitiveDistortions.controlFallacies.some(keyword => thought.toLowerCase().includes(keyword))) {
        distortions.push('Control Fallacies');
      }

      // Display cognitive distortions feedback
      const feedbackDiv = document.querySelector(`[data-index="${index}"]`);
      feedbackDiv.textContent = distortions.length > 0 ? `Cognitive Distortions: ${distortions.join(', ')}` : 'No cognitive distortions detected.';
    });
  }
});
