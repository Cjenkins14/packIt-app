const baseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily'
const apiKey = '1f02fa7f33fd4eb9b8c87429b31880a1'

// function to handle start click
function handleStart() {
    $('.start').on('click', function (event) {
        $('.user-input').removeClass('hidden');
        $('.home').addClass('hidden');
        watchForm();
    })

}

// function to handle submit
function watchForm() {
    $('form').submit(function (event) {
        event.preventDefault();
    })
    let postCode = $('input[#js-zip]').val();
    let startDate = $('input[#js-start-date]').val();
    let endDate = $('input[#js-end-date]').val();
    formatQuery(postCode);
    dateFormat(startDate, endDate);
};

// function to format dates
function dateFormat(startDate, endDate) {
    
};

// function to format query
function formatQuery(params) {
    
}

// function to fetch from API
function getData(postCode) {
    
}

// function to render results
function displayResults() {

}

// function to handle item click
function getItem() {

}

// function to fetch from API
function getProduct() {

}

// function to render products
function displayProducts() {

}

// reset button
function nowReset() {

}

$(handleStart)