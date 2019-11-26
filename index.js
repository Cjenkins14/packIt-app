const baseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily'
const apiKey = '1f02fa7f33fd4eb9b8c87429b31880a1'

// function to handle start click
function handleStart() {
    $('.start').on('click', function (event) {
        $('.user-input').removeClass('hidden');
        $('.home').addClass('hidden');
    })

}

// function to handle submit
function watchForm() {
    $('.js-submit').on('click', (event => {
        event.preventDefault();
        const postCode = $("input[name='zip-code']").val();
        const startDate = $("input[name='start-date']").val();
        const endDate = $("input[name='end-date']").val();
        getData(postCode);
        dateFormat(startDate, endDate);
    }))
};

// function to format dates
function dateFormat(startDate, endDate) {
    let start = new Date(startDate);
    let end = new Date(endDate);
};

// function to format query
function formatQuery(params) {
    const queryItem = Object.keys(params).map(
        key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItem.join('&')
}

// function to fetch from API
function getData(postCode) {
    const params = {
        key: apiKey,
        postal_code: postCode
    }
    const queryString = formatQuery(params)
    const url = baseUrl + '?' + queryString;
    console.log(url);

    fetch(url)
        .then(response => {
            if(response.ok) {
            return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
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

function runProg() {
    handleStart();
    watchForm();
}

runProg();