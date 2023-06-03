const table = document.getElementById('data-table');
const searchBar = document.getElementById('searchBar');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const firstBtn = document.getElementById('firstBtn');
const lastBtn = document.getElementById('lastBtn');
const currentPageSpan = document.getElementById('currentPage');
const totalItemsSpan = document.getElementById('totalItems');
const sortIcons = document.querySelectorAll('.sort-icon');

const data = [{
        Organisation: 'Bank of America',
        Code: 'SFAW',
        Handler: 'Savannah Nguyen'
    },
    {
        Organisation: 'IBM',
        Code: 'SFAW',
        Handler: 'Jane Cooper'
    },
    {
        Organisation: 'MasterCard',
        Code: 'SFAW',
        Handler: 'Devon Lane'
    },
    {
        Organisation: 'Pizza Hut',
        Code: 'SFAW',
        Handler: 'Jacob Jones'
    },
    {
        Organisation: 'Mitsubishi',
        Code: 'SFAW',
        Handler: 'Courtney Henry'
    },
    {
        Organisation: 'Bank of UAE',
        Code: 'SFAW',
        Handler: 'Nguyen'
    },
    {
        Organisation: 'MAE',
        Code: 'SFAW',
        Handler: 'John Cooper'
    },
    {
        Organisation: 'VisaCard',
        Code: 'SFAW',
        Handler: 'Devon Doe'
    },
    {
        Organisation: 'Taco Hut',
        Code: 'SFAW',
        Handler: 'Jacob Cooper'
    },
    {
        Organisation: 'Toyota',
        Code: 'SFAW',
        Handler: 'Olten Henry'
    },
];


let filteredData = data.slice(); // Make a copy of the original data

const itemsPerPage = 5;
let currentPage = 1;

let sortBy = ''; // Current column to sort by
let sortDirection = ''; // Current sort direction ('asc' or 'desc')

let currentContent = 1; // Current content page

function showNextContent() {
    const currentContentId = 'popupContent' + currentContent;
    const nextContentId = 'popupContent' + (currentContent + 1);
    const currentContentElement = document.getElementById(currentContentId);
    const nextContentElement = document.getElementById(nextContentId);

    if (currentContentElement && nextContentElement) {
        currentContentElement.style.display = 'none';
        nextContentElement.style.display = 'block';
        currentContent++;

        // Activate the corresponding circle
        const filingCircles = nextContentElement.querySelector('.filing-circles');
        const circles = filingCircles.querySelectorAll('.circle');
        circles[currentContent - 2].classList.remove('active');
        circles[currentContent - 1].classList.add('active');
    }

    if (nextContentId == 'popupContent5') {
        currentContent = 1;
        document.getElementById('popup').style.display = 'none';
    }
}


function templateDropdown() {
    var dropdown = document.getElementById('templateDropdown');
    var selectedOption = dropdown.options[dropdown.selectedIndex].value;

    showNextContent(selectedOption);

    dropdown.selectedIndex = 0;
}


function displayData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    table.tBodies[0].innerHTML = '';

    for (let i = 0; i < paginatedData.length; i++) {
        const rowData = paginatedData[i];
        const row = document.createElement('tr');
        const checkboxCell = document.createElement('td');
        const checkbox = document.createElement('input');
        const organisationCell = document.createElement('td');
        const codeCell = document.createElement('td');
        const handlerCell = document.createElement('td');

        checkbox.type = 'checkbox';
        checkboxCell.appendChild(checkbox);

        organisationCell.textContent = rowData.Organisation;
        codeCell.textContent = rowData.Code;
        handlerCell.textContent = rowData.Handler;

        row.appendChild(checkboxCell);
        row.appendChild(organisationCell);
        row.appendChild(codeCell);
        row.appendChild(handlerCell);
        table.tBodies[0].appendChild(row);
    }

    const startItem = startIndex + 1;
    const endItem = Math.min(endIndex, filteredData.length);
    currentPageSpan.textContent = startItem + ' - ' + endItem;
    totalItemsSpan.textContent = filteredData.length;
}

function updateButtons() {
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === Math.ceil(filteredData.length / itemsPerPage);
    firstBtn.disabled = currentPage === 1;
    lastBtn.disabled = currentPage === Math.ceil(filteredData.length / itemsPerPage);
}

function filterTable() {
    const searchTerm = searchBar.value.toLowerCase();
    filteredData = data.filter(item =>
        item.Organisation.toLowerCase().includes(searchTerm)
    );
    currentPage = 1;
    displayData();
    updateButtons();
}

function sortTable(column) {
    if (sortBy === column) {
        // Reverse the sort direction if the same column is clicked again
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        // Sort in ascending order by default if a new column is clicked
        sortBy = column;
        sortDirection = 'asc';
    }

    sortIcons.forEach(icon => {
        icon.classList.remove('fa-sort-up', 'fa-sort-down');
        icon.dataset.sortdir = '';
    });

    const sortIcon = table.querySelector(`.sort-icon[data-sortby="${column}"]`);
    sortIcon.dataset.sortdir = sortDirection === 'asc' ? 'asc' : 'desc';

    // Perform the actual sorting
    filteredData.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];

        if (valueA < valueB) {
            return sortDirection === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
            return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
    });

    displayData();
    updateButtons();
}

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayData();
        updateButtons();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
        currentPage++;
        displayData();
        updateButtons();
    }
});

firstBtn.addEventListener('click', () => {
    currentPage = 1;
    displayData();
    updateButtons();
});

lastBtn.addEventListener('click', () => {
    currentPage = Math.ceil(filteredData.length / itemsPerPage);
    displayData();
    updateButtons();
});

sortIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const sortByColumn = icon.dataset.sortby;
        sortTable(sortByColumn);
    });
});

displayData();
updateButtons();

document.getElementById('popup-btn').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'block';
    document.getElementById('popupContent1').style.display = 'block';
    document.getElementById('popupContent2').style.display = 'none';
    document.getElementById('popupContent3').style.display = 'none';
    document.getElementById('popupContent4').style.display = 'none';
});

// document.getElementById('close-btn').addEventListener('click', function () {
//   document.getElementById('popup').style.display = 'none';
// });

document.querySelectorAll('.popup-content:not(#popupContent1)').forEach(content => {
    content.style.display = 'none';
});