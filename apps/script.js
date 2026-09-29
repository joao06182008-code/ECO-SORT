function redirectToQuestoes() {
    window.location.href = 'questoes.html';
}
    
addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('button');
    button.addEventListener('click', function() {
        window.location.href = 'questoes.html';
    });
});