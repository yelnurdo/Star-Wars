document.addEventListener('DOMContentLoaded', function () {
    const charactersContent = document.getElementById('characters-content');
    const prevCharacterPageButton = document.getElementById('prev-character-page');
    const nextCharacterPageButton = document.getElementById('next-character-page');
    const characterPageInfo = document.getElementById('character-page-info');

    let currentCharacterPage = 1;
    let totalCharacterPages;

    function loadCharacters(page) {
        fetch(`https://swapi.dev/api/people/?page=${page}`)
            .then(response => response.json())
            .then(data => {
                totalCharacterPages = Math.ceil(data.count / 10);
                characterPageInfo.textContent = `Page ${currentCharacterPage} of ${totalCharacterPages}`;

                let charactersHTML = data.results.map(character => `
                    <div class="card">
                        <div class="card-header">${character.name}</div>
                        <div class="card-content">
                            <p>Height: ${character.height}</p>
                            <p>Mass: ${character.mass}</p>
                            <p>Gender: ${character.gender}</p>
                        </div>
                    </div>
                `).join('');

                charactersContent.innerHTML = charactersHTML;

                prevCharacterPageButton.disabled = currentCharacterPage === 1;
                nextCharacterPageButton.disabled = currentCharacterPage === totalCharacterPages;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                charactersContent.innerHTML = '<p>An error occurred while fetching data.</p>';
            });
    }

    prevCharacterPageButton.addEventListener('click', function() {
        if (currentCharacterPage > 1) {
            currentCharacterPage--;
            loadCharacters(currentCharacterPage);
        }
    });

    nextCharacterPageButton.addEventListener('click', function() {
        if (currentCharacterPage < totalCharacterPages) {
            currentCharacterPage++;
            loadCharacters(currentCharacterPage);
        }
    });

    loadCharacters(currentCharacterPage); // Initial call on page load
});
