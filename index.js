const BASE_URL = 'https://api.weatherbit.io/v2.0/forecast/daily'
const APIKEY = '1f02fa7f33fd4eb9b8c87429b31880a1'
let itemList = [];


// function to handle start click
function handleStart() {
    $('.start').on('click', function (event) {
        $('.user-input').removeClass('hidden');
        $('.home').addClass('hidden');
    })
 console.log('handleStart ran')
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
    console.log('watchForm ran')
};

// function to format query
function formatQuery(params) {
    let queryItem = Object.keys(params).map(
        key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        console.log('formatQuery ran')
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
        console.log('getData ran')
};
       

// function to check start and end date
function checkDates(responseJson,startDate, endDate) {

    for(let i = 0; i < responseJson["data"].length; i++) {
        let thisDate = new Date(`${responseJson["data"][i]["datetime"]}`)
        let thisDay = new Date(thisDate.setHours(00));

        console.log('date and time after date format', thisDay);
        console.log('start date', startDate);
        console.log('end date', endDate);

        if(thisDay >= startDate && thisDay <= endDate) {
            renderTemps(i, responseJson)
            let itemList = findGear(i, responseJson)
        }
        else { 
            console.log('Days not within range')
        }
    }
    sortRenderGear(itemList);
    console.log('checkDates ran')
    $('.result').removeClass('hidden');
}
// create string or array with temp values then displayResults once
// function to render results 
function renderTemps(i, responseJson) {
    let tempHi = `${responseJson["data"][i]["max_temp"]}`
    let tempLo = `${responseJson["data"][i]["min_temp"]}`
        
    $('.js-hi-lo').append(`<li>${tempHi}&#176;<br>
    ${tempLo}&#176;
    </li>`);
    console.log('renderTemps ran')
}


// function to render type of gear needed based on temp
function findGear(i, responseJson) {
    let tempHi = `${responseJson["data"][i]["max_temp"]}`
    let tempLo = `${responseJson["data"][i]["min_temp"]}`
    let snowFall = `${responseJson["data"][i]["snow_depth"]}`
    let rainFall = `${responseJson["data"][i]["precip"]}`
    

    if(snowFall >= 6) {
        $(itemList).push(
            `<li>Snow Pants</li>
            <li>Winter Jacket</li>`
        )
    }
    if(rainFall === true) {
        $(itemList).push(
            `<li>Rain Jacket</li>
            <li>Rain Boots</li>`
        )
    }
    if(tempLo <= 20) {
        (itemList).push(
            "Base layers", "Wool Shirt", "Pants", "Fleece Jacket", "Beanie", "Gloves", "Boots"
        )
    } 
    else if(tempLo <= 40) {
        (itemList).push(
            "Base layers", "Wool Shirt", "Pants", "Beanie", "Gloves", "Boots"
        )
    }
    else if(tempLo <= 50) {
        (itemList).push(
            "Vest", "Long sleeve shirt", "Pants", "Shoes"
        )
    }
    else if(tempLo <= 60) {
        (itemList).push(
            "Tshirt", "Flannel", "Pants", "Shoes"
        )
    }
    else if(tempLo <= 80) {
        (itemList).push(
            "T-shirt", "Shorts", "Shoes", "Hats", "Sunglasses"
        )
    }
    else if(tempLo <= 110) {
        (itemList).push(
            "T-shirt", "Shorts", "Shoes", "Hats", "Sunglasses"
        )
    }
    else {
        console.log('gear not found')
    }
    console.log('findGear ran')
    return itemList;
}

function sortRenderGear(itemList) {
      let gearList = removeDuplicate(itemList);
      console.log(gearList);

    for(i = 0; i < gearList.length; i++) {
        $('.js-gear-items').append(
            `<li>${gearList[i]}</li>`
        )
    };
    console.log('sortRenderGear ran')
}

function removeDuplicate(itemList){
    let gearList = Array.from(new Set(itemList))
    console.log('removeDuplicate ran')
    return gearList
}



// reset button
function nowReset() {
    $('.js-reset').on('click', (event => {
        $('#js-zip, #js-start-date, #js-end-date').empty()
        $('.js-hi-lo').empty()
        $('.js-gear-items').empty()
    }))
    console.log('reset ran')
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
    
    
}

$(runProg);

