const searchInput = document.getElementById('search-input');
const searchType = document.getElementById('search-type');
const searchButton = document.getElementById('search-button');
const resultsContent = document.getElementById('results-content');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');

let currentPage = 1;
let totalPages = 1;

const search = () => {
    const searchTerm = searchInput.value.trim();
    const searchTypeValue = searchType.value;
    if (searchTerm) {
        fetch(`https://swapi.dev/api/${searchTypeValue}/?search=${searchTerm}&page=${currentPage}`)
            .then(response => response.json())
            .then(data => {
                totalPages = Math.ceil(data.count / 10);
                pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

                if (data.results.length > 0) {
                    let resultsHTML = '';
                    data.results.forEach(result => {
                        const name = result.name || result.title;
                        resultsHTML += `<p>${name}</p>`;
                    });
                    resultsContent.innerHTML = resultsHTML;
                } else {
                    resultsContent.innerHTML = '<p>No results found</p>';
                }

                prevPageButton.disabled = currentPage === 1;
                nextPageButton.disabled = currentPage === totalPages;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                resultsContent.innerHTML = '<p>An error occurred while fetching data</p>';
            });
    }
};

searchButton.addEventListener('click', () => {
    currentPage = 1;
    search();
});

prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        search();
    }
});

nextPageButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        search();
    }
});
