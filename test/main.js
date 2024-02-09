const toggleButtons = document.querySelectorAll('.toggle-button');
const contentSections = document.querySelectorAll('.content-section');

toggleButtons.forEach(button => {
  button.addEventListener('click', () => {
    //  Deactivate current button, activate clicked one
    toggleButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    //  Hide current content, show targeted content
    const targetId = button.dataset.target; 
    contentSections.forEach(section => {
      section.classList.remove('active');
      if (section.id === targetId) {
        section.classList.add('active');
      }
    });
  });
  contentSections.forEach(section => {
    section.classList.remove('active');
  
    // Optional: Very slight delay before adding 'active'
    setTimeout(() => {
      if (section.id === targetId) {
        section.classList.add('active');
      }
    }, 1000); // Adjust the delay (in milliseconds) if needed
  });
});
