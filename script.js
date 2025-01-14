// JavaScript to handle the beatbox functionality
document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', function() {
        const beatId = this.parentElement.id;
        playBeat(beatId);
    });
});

document.getElementById('play-all').addEventListener('click', playAllBeats);
document.getElementById('stop-all').addEventListener('click', stopAllBeats);

function playBeat(beatId) {
   
