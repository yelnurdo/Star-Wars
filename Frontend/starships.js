document.addEventListener('DOMContentLoaded', function () {
    const starshipsContent = document.getElementById('starships-content');
    const prevStarshipPageButton = document.getElementById('prev-starship-page');
    const nextStarshipPageButton = document.getElementById('next-starship-page');
    const starshipPageInfo = document.getElementById('starship-page-info');

    let currentStarshipPage = 1;
    let totalStarshipPages;

    function loadStarships(page) {
        fetch(`https://swapi.dev/api/starships/?page=${page}`)
            .then(response => response.json())
            .then(data => {
                totalStarshipPages = Math.ceil(data.count / 10);
                starshipPageInfo.textContent = `Page ${currentStarshipPage} of ${totalStarshipPages}`;

                let starshipsHTML = data.results.map(starship => `
                    <div class="card">
                        <div class="card-header">${starship.name}</div>
                        <div class="card-content">
                            <p>Model: ${starship.model}</p>
                            <p>Manufacturer: ${starship.manufacturer}</p>
                            <p>Class: ${starship.starship_class}</p>
                        </div>
                    </div>
                `).join('');

                starshipsContent.innerHTML = starshipsHTML;

                prevStarshipPageButton.disabled = currentStarshipPage === 1;
                nextStarshipPageButton.disabled = currentStarshipPage === totalStarshipPages;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                starshipsContent.innerHTML = '<p>An error occurred while fetching data.</p>';
            });
    }

    prevStarshipPageButton.addEventListener('click', function() {
        if (currentStarshipPage > 1) {
            currentStarshipPage--;
            loadStarships(currentStarshipPage);
        }
    });

    nextStarshipPageButton.addEventListener('click', function() {
        if (currentStarshipPage < totalStarshipPages) {
            currentStarshipPage++;
            loadStarships(currentStarshipPage);
        }
    });

    loadStarships(currentStarshipPage); // Initial call on page load
});
