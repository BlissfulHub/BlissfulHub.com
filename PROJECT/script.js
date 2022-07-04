function myFunction() {
    document.getElementById("dropdown").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


var counter=1;
setInterval(function(){
    document.getElementById('slide' + counter).checked=true;
    counter++;
    if(counter > 3){
        counter = 1;
    }
},10000);



const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const giveaways = document.querySelector('.giveaways');
const deadline = document.querySelector('.deadline');
const deadlines = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');
const itemss = document.querySelectorAll('.deadlines-format h4');


let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

//let futureDate = new Date(2022, 5, 26, 11, 30, 0);

const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = months[month];

const weekday = weekdays[futureDate.getDay()];

const date = futureDate.getDate();
giveaway .textContent = `Flash Sales ends on ${weekday}, ${date} ${month} ${year} ${hours}: ${minutes}am`;
giveaways .textContent = `Flash Sales ends on ${weekday}, ${date} ${month} ${year} ${hours}: ${minutes}am`;

// future time in ms

const futureTime = futureDate.getTime();

function getRemainingTime(){
    const today = new Date().getTime();
    const t = futureTime - today

    // 1s = 1000ms
    // 1min = 60s
    // 1hour = 60mins
    // 1day = 24hours

    // value in ms

    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    // Calculate all values;

    let days = t / oneDay;
    days = Math.floor((days));

    let hours = Math.floor((t % oneDay) / oneHour);
    let minutes = Math.floor((t % oneHour / oneMinute));
    let seconds = Math.floor((t % oneMinute / 1000));

    // set values array;
    const values = [days, hours, minutes, seconds];

    function format(item){
        if(item < 10){
            return item = `0${item}`
        }
        return item
    }

    items.forEach(function(item, index){
        item.innerHTML = format(values[index]);
    })
    itemss.forEach(function(item, index){
        item.innerHTML = format(values[index]);
    })

    if(t < 0) {
        clearInterval(countdown);
        deadline.innerHTML = `<h4 class="expired"> Sorry this Flash Sale has expired.</h4>`;
    }
    if(t < 0) {
        clearInterval(countdown);
        deadlines.innerHTML = `<h4 class="expired"> Sorry this Flash Sale has expired.</h4>`;
    }
}

//countdown
let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();




//VARIABLES
let carouselcontents = document.getElementsByClassName("carouselcontent");
let carouselslider = document.getElementById("carouselslider");
let buttonLeft = document.getElementById("arrowleft");
let buttonRight = document.getElementById("arrowright");

buttonLeft.addEventListener("click", () => {
    carouselslider.scrollLeft -= 125;
});

buttonRight.addEventListener("click", () => {
    carouselslider.scrollLeft += 125;
});

const maxScrollLeft = carouselslider.scrollWidth - carouselslider.clientWidth;

//Autoplay  Slider

function autoPlay() {
    if (carouselslider.scrollLeft > (maxScrollLeft - 1)) {
        carouselslider.scrollLeft -= maxScrollLeft;
    } else {
        carouselslider.scrollLeft += 1;
    }
}

let play = setInterval(autoPlay, 70);

//PAUSE THE SLIDER  

for (let i = 0; i < carouselcontents.length; i++) {
    carouselcontents[i].addEventListener("mouseover", () => {
        clearInterval(play)
    })

    carouselcontents[i].addEventListener("mouseout", () => {
        return play = setInterval(autoPlay, 70);
    })
}


const search = () => {
    const searchbox = document.getElementById("searchitem").value.toUpperCase();
    const storeitems = document.getElementById("product-list");
    const productt = document.querySelectorAll("product-image");
    const productname = storeitems.getElementsByTagName("h6");

    for(var i = 0; i < productname.length; i++){
        let match = productt[i].getElementsByTagName("h6")[0];

        if (match) {
            let textValue = match.textContent || match.innerHTML;

            if (textValue.toUpperCase().indexOf(searchbox) > -1) {
                productt[i].style.display = "";
            }else {
                productt[i].style.display = "none";
            };
        };
    };
}
