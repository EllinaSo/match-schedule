"use strict";
(function () {
    const EVENTS_LIST = [{
            place: "Стадион",
            date: "30 сентября",
            time: "13:00",
            rivals: ["Соперник Соперник №1", "Соперник №6"]
        },
        {
            place: "Площадка",
            date: "16 июля",
            time: "18:00",
            rivals: ["Соперник №1", "Соперник №3"]
        },
        {
            place: "Стадион",
            date: "26 июня",
            time: "19:00",
            rivals: ["Соперник №3", "Соперник №2"]
        },
        {
            place: "Арена",
            date: "17 июня",
            time: "16:00",
            rivals: ["Соперник №5", "Соперник №2"]
        },
        {
            place: "Малый второй зал",
            date: "30 мая",
            time: "19:30",
            rivals: ["Соперник №4", "Соперник №5"]
        },
    ]
    const HEXAGONE__CLASS = {
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
        
        // Перелистывание при скролле
        window.addEventListener("wheel", function (e) {
            const delta = e.deltaY || e.detail || e.wheelDelta;
            if (delta > 0) {
                if (currentIndex !== lastIndex) currentIndex = ++currentIndex;
                else return;
            } else {
                if (currentIndex !== 0) currentIndex = --currentIndex;
                else return;
            }
            moveHexagones();
        });

        // Перелистывание при нажатие  на клавиатуре
        window.addEventListener("keydown", function (e) {
            if (e.key === "ArrowDown") {
                if (currentIndex !== lastIndex) currentIndex = ++currentIndex;
                else return;
            } else if (e.key === "ArrowUp") {
                if (currentIndex !== 0) currentIndex = --currentIndex;
                else return;
            }
            moveHexagones();
        });

        // Перелистывание при нажатии/фркусировке на карточку
        hexagoneList.forEach(hexagone => {
            hexagone.addEventListener('click', function (e) {
                currentIndex = parseInt(e.target.closest(".hexagone").id);
                moveHexagones();
            })
            hexagone.addEventListener('focus', function (e) {
                currentIndex = parseInt(e.target.closest(".hexagone").id);
                moveHexagones();
            }, true);
        })


        function moveHexagones() {
            // сброс состояния
            hexagoneList.forEach((hexagone, index) => {
                if (index > 2) {
                    hexagone.classList = HEXAGONE__CLASS.hideLeft;
                } else {
                    hexagone.classList = HEXAGONE__CLASS.hideRight;
                }
            })
            // установка основной карточки
            hexagoneList[currentIndex].classList = HEXAGONE__CLASS.main;
            // установка соседних карточек
            if (currentIndex !== 0) hexagoneList[currentIndex - 1].classList = HEXAGONE__CLASS.second;
            if (currentIndex !== lastIndex) hexagoneList[currentIndex + 1].classList = HEXAGONE__CLASS.fourth;
            // установка боковых карточек
            if (currentIndex - 1 > 0) hexagoneList[currentIndex - 2].classList = HEXAGONE__CLASS.first;
            if (currentIndex + 1 < lastIndex) hexagoneList[currentIndex + 2].classList = HEXAGONE__CLASS.fifth;
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
