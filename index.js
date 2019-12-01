const BASE_URL = 'https://api.weatherbit.io/v2.0/forecast/daily'
const APIKEY = '1f02fa7f33fd4eb9b8c87429b31880a1'


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
        let postCode = $("input[name='zip-code']").val();
        let startDate = new Date($("input[name='start-date']").val());
        let endDate = new Date($("input[name='end-date']").val());
        getData(postCode, startDate, endDate);
    }))
};

// function to format query
function formatQuery(params) {
    let queryItem = Object.keys(params).map(
        key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItem.join('&')
}

// function to fetch from API
function getData(postCode, startDate, endDate) {
    let params = {
        key: APIKEY,
        postal_code: postCode,
        units: 'I'
    }
    let queryString = formatQuery(params)
    let url = (`${BASE_URL}?${queryString}`);
    console.log(url);

    fetch(url)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            else {
                throw new Error(response.statusText);
            }
        })
        .then(responseJson => checkDates(responseJson, startDate, endDate))
        .catch(err => {
            $('.js-error-msg').text(`Something went wrong: ${err.message}`)
        })
};
       

// function to check start and end date
function checkDates(responseJson,startDate, endDate) {
    let start = startDate
    let end = endDate

    for(let i = 0; i < `${responseJson["data"].length}`; i++) {
        let thisDate = new Date(`${responseJson["data"][i]["datetime"]}`)

        let thisDay = new Date(thisDate.setHours(00));

        if(thisDay >= start && thisDay <= end) {
            renderTemps(i, responseJson)
            renderGear(i, responseJson)
        }
        else {
            $('.result').removeClass('hidden');
        }
    }
    
}
// create string or array with temp values then displayResults once
// function to render results 
function renderTemps(i, responseJson) {
    let tempHi = `${responseJson["data"][i]["max_temp"]}`
    let tempLo = `${responseJson["data"][i]["min_temp"]}`
        
    $('.js-hi-lo').append(`<li>${tempHi}/${tempLo}</li>`);
}


// function to render type of gear needed based on temp
function renderGear(i, responseJson) {
    let tempHi = `${responseJson["data"][i]["max_temp"]}`
    let tempLo = `${responseJson["data"][i]["min_temp"]}`
    let snowFall = `${responseJson["data"][i]["snow_depth"]}`
    let rainFall = `${responseJson["data"][i]["precip"]}`

    if(snowFall >= 6) {
        $('.js-gear-items').append(
            `<li>Snow Pants</li>
            <li>Winter Jacket</li>`
        )
    }
    if(rainFall === true) {
        $('.js-gear-items').append(
            `<li>Rain Jacket</li>
            <li>Rain Boots</li>`
        )
    }
    if(tempLo <= 20) {
        $('.js-gear-items').append(
            `<li>Base layers</li>
            <li>Wool Shirt</li>
            <li>Pants</li>
            <li>Fleece Jacket</li>
            <li>Beanie</li>
            <li>Gloves</li>
            <li>Boots</li>`
        )
    } 
    else if(tempLo <= 40) {
        $('.js-gear-items').append(
            `<li>Base layers</li>
            <li>Wool Shirt</li>
            <li>Pants</li>
            <li>Beanie</li>
            <li>Gloves</li>
            <li>Boots</li>`
        )
    }
    else if(tempLo <= 50) {
        $('.js-gear-items').append(
            `<li>Vest</li>
            <li>Long sleeve shirt</li>
            <li>Pants</li>
            <li>Shoes</li>`
        )
    }
    else if(tempLo <= 60) {
        $('.js-gear-items').append(
            `<li>T-shirt</li>
            <li>Flannel</li>
            <li>Pants</li>
            <li>Shoes</li>`
        )
    }
    else if(tempLo <= 80) {
        $('.js-gear-items').append(
            `<li>Shorts</li>
            <li>T-shirt</li>
            <li>Shoes</li>
            <li>Hats</li>
            <li>Sunglasses</li>`
        )
    }
    else if(tempLo <= 110) {
        $('.js-gear-items').append(
            `<li>Shorts</li>
            <li>T-shirt</li>
            <li>Shoes</li>
            <li>Hats</li>
            <li>Sunglasses</li>`
        )
    }
    else {

    }
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

