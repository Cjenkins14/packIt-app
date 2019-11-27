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
        const startDate = new Date($("input[name='start-date']").val());
        const endDate = new Date($("input[name='end-date']").val());
        getData(postCode, startDate, endDate);
    }))
};

// function to format query
function formatQuery(params) {
    const queryItem = Object.keys(params).map(
        key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItem.join('&')
}

// function to fetch from API
function getData(postCode, startDate, endDate) {
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
        .then(responseJson => checkDates(responseJson, startDate, endDate))
       .catch(err => {
            $('.js-error-msg').text(`Something went wrong: ${err.message}`)
        })
};
       

// function to check start and end date
function checkDates(responseJson,startDate, endDate) {
    let start = startDate.getDate();
    let end = endDate.getDate();

    for(let i = 0; i < `${responseJson["data"].length}`; i++) {
        let thisDate = new Date(`${responseJson["data"][i]["datetime"]}`)

        let thisDay = thisDate.getDate();

        if(thisDay >= start && thisDay <= end) {
            displayResults(i, responseJson)
        }
        else {
            
        }
    }
}

// function to render results 
function displayResults(i, responseJson) {
    let tempHi = `${responseJson["data"][i]["max_temp"]}`

    let tempLo = `${responseJson["data"][i]["min_temp"]}`
        
        $('.js-hi-lo').append(`<li>${tempHi}/${tempLo}</li>`);
    renderGear(tempHi, tempLo);
    }
    // if(min_temp < 20, append winter items)
    // // append tempuratures to .js-hi-lo `li>[max_temp]/[min_temp]</li`
    // else if(min_temp > 50, append spring items etc )
    // // append tempuratures to .js-hi-lo `li>[max_temp]/[min_temp]</li`


// function to render type of gear needed based on temp
function renderGear(tempHi, tempLo) {
    if(tempLo <= 20) {
        
    }
    else if(tempLo <= 40) {

    } 
    else if(tempLo <= 60) {

    }
    else if(tempLo <= 80) {

    }
    else if(tempLo <= 100) {

    }
    else {

    }


    $('.result').removeClass('hidden');
}

// reset button
function nowReset() {

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

function runProg() {
    handleStart();
    watchForm();
    checkDates();
    
}

$(runProg);