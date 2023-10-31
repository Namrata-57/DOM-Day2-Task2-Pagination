const dataTable = document.getElementById('data-table');
const tableBody = dataTable.querySelector('tbody');
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
const currentPageElement = document.getElementById('currentPage');

async function fetchData() {
    const response = await fetch('https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json');
    const data = await response.json();
    return data;
}

async function displayData(currentPage = 1, itemsPerPage = 10) {
    const data = await fetchData();

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = data.slice(startIndex, endIndex);

    tableBody.innerHTML = '';

    // table format
    currentPageData.forEach(item => {
        const row = tableBody.insertRow();
        const idCell = row.insertCell(0);
        const nameCell = row.insertCell(1);
        const emailCell = row.insertCell(2);
        idCell.textContent = item.id;
        nameCell.textContent = item.name;
        emailCell.textContent = item.email;
    });


    currentPageElement.textContent = `Page ${currentPage}`;
    prevPageButton.setAttribute('page_number', currentPage - 1)
    if (currentPage == 1) {

        prevPageButton.style.display = 'none';
    } else {

        prevPageButton.style.display = 'inline';
    }
    nextPageButton.setAttribute('page_number', currentPage + 1)
    if (currentPage == 10) {

        nextPageButton.style.display = 'none';
    } else {

        nextPageButton.style.display = 'inline';
    }

}

// Event listener for the "Previous" button
prevPageButton.addEventListener('click', () => {
    const page_number = prevPageButton.getAttribute('page_number');
    if (page_number) {
        displayData(parseInt(page_number));
    }
});

// Event listener for the "Next" button
nextPageButton.addEventListener('click', () => {

    const page_number = nextPageButton.getAttribute('page_number');
    if (page_number) {
        displayData(parseInt(page_number));
    }
});

displayData();
