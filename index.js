const BASE_URL = 'https://api.weatherbit.io/v2.0/forecast/daily'
const APIKEY = '1f02fa7f33fd4eb9b8c87429b31880a1'
let itemList = [];
let date = new Date();
let today = new Date(date.setHours(0, 0, 0, 0));
const dateLimit = new Date(date.setDate(date.getDate() + 16));
const tripData = {
    start: null,
    end: null,
    postCode: null,
    today: new Date()
}


// function to handle start click
function handleStart() {
    $('.start').on('click', function (event) {
        $('form').removeClass('hidden');
        $('#home').addClass('hidden');
    })
}

// function to handle date formats and update variables
function dataHandler() {
    tripData.postCode = $("input[name='zip-code']").val();
    const startDate = $("input[name='start-date']").val();
    const endDate = $("input[name='end-date']").val();
    const startSplit = startDate.split("-");
    const endSplit = endDate.split("-");
    tripData.start = new Date(startSplit);
    tripData.end = new Date(endSplit);
}

// function to handle submit
function watchForm() {
    $('.js-submit').on('click', event => {
        event.preventDefault();
        resultReset();
        dataHandler();
        if (tripData.start < today || dateLimit < tripData.end) {
            $('.js-error-msg').text('Please use dates from today, up to 16 days in the future');
            $('.js-error-msg').removeClass('hidden');
        } else if (tripData.end.getDate() - tripData.start.getDate() > 16) {
            $('.js-error-msg').text('Please restrict the input to 2 weeks');
            $('.js-error-msg').removeClass('hidden');
        } else {
            getData();
        }
    })
};

// function to reset results
function resultReset() {
    $('.js-error-msg').text('');
    $('.js-hi-lo, .js-gear-items').empty();
}

// function to format query
function formatQuery(params) {
    let queryItem = Object.keys(params).map(
        key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItem.join('&');
}

// function to fetch from API
function getData() {
    let params = {
        key: APIKEY,
        postal_code: tripData.postCode,
        units: 'I'
    }
    let queryString = formatQuery(params)
    let url = (`${BASE_URL}?${queryString}`);

    fetch(url)
        .then(response => {
            if (response.status == 204) {
                throw new Error(response.statusText);
            } else if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(responseJson => checkDates(responseJson))
        .catch(error => {
            $('.js-error-msg').text(`Something went wrong: ${error.message} for postal code. Please try again later.`)
            $('.js-error-msg').removeClass('hidden')
        })
};

// function to check start and end date
function checkDates(responseJson) {

    for (let i = 0; i < responseJson["data"].length; i++) {
        let thisDate = new Date(`${responseJson["data"][i]["datetime"]}`)
        let thisDay = new Date(thisDate.setHours(00));
        if (thisDay >= tripData.start && thisDay <= tripData.end) {
            renderTemps(i, responseJson)
            let itemList = findGear(i, responseJson)
        }
    }
    sortRenderGear(itemList);
    $('#results').removeClass('hidden');
}

// function to render temps
function renderTemps(i, responseJson) {
    let tempHi = Math.round(`${responseJson["data"][i]["max_temp"]}`);
    let tempLo = Math.round(`${responseJson["data"][i]["min_temp"]}`);

    $('.js-hi-lo').append(`<li>${tempHi}&#176;<br>
    ${tempLo}&#176;
    </li>`);
}


// function to render type of gear needed based on temp
function findGear(i, responseJson) {
    let tempHi = `${responseJson["data"][i]["max_temp"]}`
    let tempLo = `${responseJson["data"][i]["min_temp"]}`
    let snowFall = `${responseJson["data"][i]["snow_depth"]}`
    let rainFall = `${responseJson["data"][i]["precip"]}`

    if (snowFall > 1) {
        (itemList).push(
            `<li>Snow Pants</li>
            <li>Winter Jacket</li>`
        )
    }
    if (rainFall == true) {
        (itemList).push(
            `<li>Rain Jacket</li>
            <li>Rain Boots</li>`
        )
    }
    if (tempLo <= 20) {
        (itemList).push(
            "Base layers", "Wool Shirt", "Pants", "Fleece Jacket", "Beanie", "Gloves", "Boots"
        )
    } else if (tempLo <= 40) {
        (itemList).push(
            "Base layers", "Wool Shirt", "Pants", "Beanie", "Gloves", "Boots"
        )
    } else if (tempLo <= 50) {
        (itemList).push(
            "Vest", "Long sleeve shirt", "Pants", "Shoes"
        )
    } else if (tempLo <= 60) {
        (itemList).push(
            "Tshirt", "Flannel", "Pants", "Shoes"
        )
    } else if (tempLo <= 80) {
        (itemList).push(
            "T-shirt", "Shorts", "Shoes", "Hats", "Sunglasses"
        )
    } else if (tempLo <= 110) {
        (itemList).push(
            "T-shirt", "Shorts", "Shoes", "Hats", "Sunglasses"
        )
    }
    return itemList;
}

function sortRenderGear(itemList) {
    let gearList = removeDuplicate(itemList);

    for (i = 0; i < gearList.length; i++) {
        $('.js-gear-items').append(
            `<li>${gearList[i]}</li>`
        )
    };
}

// remove duplicate items from array
function removeDuplicate(itemList) {
    let gearList = Array.from(new Set(itemList))
    return gearList
}

// reset button
function nowClear() {
    $('.js-clear').on('click', function (event) {
        if (confirm('Are you sure?')) {
            event.preventDefault();
            $('form input[type=text]').val('');
            $('form input[type=date]').val('');
            $('.js-hi-lo, .js-gear-items').empty();
            $('.js-error-msg').text('');
            $('.js-error-msg').addClass('hidden');
            $('#results').addClass('hidden');
        }
    })
}

function runProgram() {
    handleStart();
    watchForm();
    nowClear();
}

$(runProgram);