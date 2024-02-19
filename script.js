"use strict";
(function () {
    const EVENTS_LIST = [{
            place: "Stadium",
            date: "September 30th",
            time: "13:00",
            rivals: ["Opponent #1", "Opponent №6"]
        },
        {
            place: "Venue",
            date: "July 16th",
            time: "18:00",
            rivals: ["Opponent №1", "Opponent №3"]
        },
        {
            place: "Stadium",
            date: "June 26th",
            time: "19:00",
            rivals: ["Opponent №3", "Opponent №2"]
        },
        {
            place: "Arena",
            date: "June 17th",
            time: "16:00",
            rivals: ["Opponent №5", "Opponent №2"]
        },
        {
            place: "Small second hall",
            date: "May 30th",
            time: "19:30",
            rivals: ["Opponent №4", "Opponent №5"]
        },
    ]
    const HEXAGON__CLASS = {
        hideLeft: "hexagone hexagone--left",
        hideRight: "hexagone hexagone--right",
        main: "hexagone hexagone--third",
        first: "hexagone hexagone--first",
        second: "hexagone hexagone--second",
        fourth: "hexagone hexagone--fourth",
        fifth: "hexagone hexagone--fifth",
    }
    const lastIndex = EVENTS_LIST.length - 1;
    let currentIndex = 2;

    document.addEventListener('DOMContentLoaded', function () {
        const hexagoneList = Array.from(document.querySelectorAll('.hexagone'));
        hexagoneList.forEach((hexagone, index) =>{
            hexagone.querySelector('.hexagone__place').textContent = EVENTS_LIST[index].place;
            hexagone.querySelector('.hexagone__date').innerHTML = EVENTS_LIST[index].date.replace(" ", " <br>" );
            hexagone.querySelector('.hexagone__time').textContent = EVENTS_LIST[index].time;
            hexagone.querySelector('.hexagone__left span').textContent = EVENTS_LIST[index].rivals[0];
            hexagone.querySelector('.hexagone__right span').textContent = EVENTS_LIST[index].rivals[1];
        })
        
        // Scrolling pagination
        window.addEventListener("wheel", function (e) {
            const delta = e.deltaY || e.detail || e.wheelDelta;
            if (delta > 0) {
                if (currentIndex !== lastIndex) currentIndex = ++currentIndex;
                else return;
            } else {
                if (currentIndex !== 0) currentIndex = --currentIndex;
                else return;
            }
            moveHexagons();
        });

        // Keyboard navigation pagination
        window.addEventListener("keydown", function (e) {
            if (e.key === "ArrowDown") {
                if (currentIndex !== lastIndex) currentIndex = ++currentIndex;
                else return;
            } else if (e.key === "ArrowUp") {
                if (currentIndex !== 0) currentIndex = --currentIndex;
                else return;
            }
            moveHexagons();
        });

        // Scrolling upon card focus/navigation
        hexagoneList.forEach(hexagone => {
            hexagone.addEventListener('click', function (e) {
                currentIndex = parseInt(e.target.closest(".hexagone").id);
                moveHexagons();
            })
            hexagone.addEventListener('focus', function (e) {
                currentIndex = parseInt(e.target.closest(".hexagone").id);
                moveHexagons();
            }, true);
        })


        function moveHexagons() {
            // Reset state
            hexagoneList.forEach((hexagone, index) => {
                if (index > 2) {
                    hexagone.classList = HEXAGON__CLASS.hideLeft;
                } else {
                    hexagone.classList = HEXAGON__CLASS.hideRight;
                }
            })
            // Setting the primary card
            hexagoneList[currentIndex].classList = HEXAGON__CLASS.main;
            // Setting adjacent cards
            if (currentIndex !== 0) hexagoneList[currentIndex - 1].classList = HEXAGON__CLASS.second;
            if (currentIndex !== lastIndex) hexagoneList[currentIndex + 1].classList = HEXAGON__CLASS.fourth;
            // Setting side cards
            if (currentIndex - 1 > 0) hexagoneList[currentIndex - 2].classList = HEXAGON__CLASS.first;
            if (currentIndex + 1 < lastIndex) hexagoneList[currentIndex + 2].classList = HEXAGON__CLASS.fifth;
        }
        const menu = document.querySelector('.menu');
        const menuToggler = menu.querySelector('.menu__toggler');
        const nav = menu.querySelector('.menu__nav');
        const toggleMenu = () => {
            nav.classList.toggle('menu__nav--active');
        }
        if(menu.offsetWidth < 960){
            menuToggler.addEventListener('click', toggleMenu)
        }
        window.onresize = function() {
            if(menu.offsetWidth < 960){
                menuToggler.addEventListener('click', toggleMenu);
            }
            else{
                menuToggler.removeEventListener('click', toggleMenu);
                nav.classList.remove('menu__nav--active');
            }
    
        };
    })
})()
