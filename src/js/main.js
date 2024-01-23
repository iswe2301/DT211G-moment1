"use strict";

// Variabler
let menuBtnEl = document.querySelector(".menubtn");
let containerEl = document.querySelector("div");

// Händelselyssnare vid klick somm anropar funktioner
menuBtnEl.addEventListener("click", transformMenu);
menuBtnEl.addEventListener("click", dropDownMenu);

// Funktion för att växla mellan klassen cross samt opacity vid klick.
// Hämtar element genom class.
function transformMenu() {
    let menuiconEl = document.querySelector(".menuicon")
    menuiconEl.classList.toggle("cross");
    containerEl.classList.toggle("opacity");
}

// Funktion för att växla mellan att visa och dölja länkar i navigering när hamburgermenyn klickas.
function dropDownMenu() {
    // Hämtar element genom ID till länkarna.
    let mobilenavEl = document.getElementById("mobilenav");
    let style = window.getComputedStyle(mobilenavEl);
    // Kontroll om menyn visas som block, döljer vid klick
    if (style.display === "block") {
        mobilenavEl.style.display = "none";
    } else {
        // Om meny inte visas som block (display: none), visar block vid klick
        mobilenavEl.style.display = "block";
    }
}

// Asynkron funktion som hämtar data med fetch-api. Try och catch för att underlätta felahntering.
async function getData() {
    try {
        const response = await fetch("https://dahlgren.miun.se/ramschema_ht23.php");
        const data = await response.json();
        return data;
        // Fångar upp felmeddelande
    } catch (error) {
        console.error("Error-meddelande:", error);
        throw error;
    }
}

// Asynkron funktion för att visa data
async function displayData() {
    const data = await getData(); // Inväntar att data har hämtats från getData-funktionen
    // Hämtar ID för tabell
    const tableEl = document.getElementById("course-table");
    // Loopar igenom varje data och skriver ut till DOM
    data.forEach(data => {
        tableEl.innerHTML += `<tr><td>${data.code}</td><td>${data.coursename}</td><td>${data.progression}</td></tr>`;
    })
}

displayData();

