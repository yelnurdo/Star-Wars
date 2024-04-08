const planetsContent = document.getElementById('planets-content');
const prevPlanetPageButton = document.getElementById('prev-planet-page');
const nextPlanetPageButton = document.getElementById('next-planet-page');
const planetPageInfo = document.getElementById('planet-page-info');
const planetModal = document.getElementById('planetModal');
const planetName = document.getElementById('planetName');
const planetDetails = document.getElementById('planetDetails');
const closePlanetModal = document.getElementsByClassName('close')[0]; // Assuming this is the first modal

let currentPlanetPage = 1;
let totalPlanetPages = 1;

const loadPlanets = (page) => {
    fetch(`https://swapi.dev/api/planets/?page=${page}`)
        .then(response => response.json())
        .then(data => {
            totalPlanetPages = Math.ceil(data.count / 10);
            planetPageInfo.textContent = `Page ${currentPlanetPage} of ${totalPlanetPages}`;

            let planetsHTML = '';
            data.results.forEach(planet => {
                planetsHTML += `
                    <div class="card" onclick="showPlanetDetails('${planet.name}', '${planet.climate}', '${planet.terrain}', '${planet.population}')">
                        <div class="card-header">${planet.name}</div>
                        <div class="card-content">
                            <p>Climate: ${planet.climate}</p>
                            <p>Terrain: ${planet.terrain}</p>
                            <p>Population: ${planet.population}</p>
                        </div>
                    </div>
                `;
            });
            planetsContent.innerHTML = planetsHTML;

            prevPlanetPageButton.disabled = currentPlanetPage === 1;
            nextPlanetPageButton.disabled = currentPlanetPage === totalPlanetPages;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            planetsContent.innerHTML = '<p>An error occurred while fetching data</p>';
        });
};

function showPlanetDetails(name, climate, terrain, population) {
    planetName.textContent = name;
    planetDetails.innerHTML = `
        <p>Climate: ${climate}</p>
        <p>Terrain: ${terrain}</p>
        <p>Population: ${population}</p>
    `;
    planetModal.style.display = 'block';
}

window.showPlanetDetails = showPlanetDetails;

closePlanetModal.onclick = function () {
    planetModal.style.display = 'none';
};

window.onclick = function (event) {
    if (event.target === planetModal) {
        planetModal.style.display = 'none';
    }
};

prevPlanetPageButton.addEventListener('click', () => {
    if (currentPlanetPage > 1) {
        currentPlanetPage--;
        loadPlanets(currentPlanetPage);
    }
});

nextPlanetPageButton.addEventListener('click', () => {
    if (currentPlanetPage < totalPlanetPages) {
        currentPlanetPage++;
        loadPlanets(currentPlanetPage);
    }
});

loadPlanets(currentPlanetPage);
