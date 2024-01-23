"use strict";

// Variabler
const menuBtnEl = document.querySelector(".menubtn");
const containerEl = document.querySelector("div");
const tableEl = document.getElementById("course-table");
const tableBodyEl = document.getElementById("table-body");
const tableHeadEl = document.querySelectorAll("th")
// Sätter sorteringsordningen till stigande som standard
let isAscending = true;

// Händelselyssnare vid klick somm anropar funktioner
menuBtnEl.addEventListener("click", transformMenu);
menuBtnEl.addEventListener("click", dropDownMenu);

// Funktion för att växla mellan klassen cross samt opacity vid klick.
// Hämtar element genom class.
function transformMenu() {
    const menuiconEl = document.querySelector(".menuicon");
    menuiconEl.classList.toggle("cross");
    containerEl.classList.toggle("opacity");
}

// Funktion för att växla mellan att visa och dölja länkar i navigering när hamburgermenyn klickas.
function dropDownMenu() {
    // Hämtar element genom ID till länkarna.
    const mobilenavEl = document.getElementById("mobilenav");
    const style = window.getComputedStyle(mobilenavEl);
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
        // Utför HTTP-förfrågan för att hämta data
        const response = await fetch("https://dahlgren.miun.se/ramschema_ht23.php");
        // Returnerar datan i json
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
    try {
        // Inväntar att data har hämtats från getData-funktionen
        const data = await getData();
        // Loopar igenom varje dataobjekt och skriver ut till DOM
        data.forEach(data => {
            tableBodyEl.innerHTML += `<tr><td>${data.code}</td><td>${data.coursename}</td><td>${data.progression}</td></tr>`;
        });
        // Lägger till klickhändelse till varje tabellhuvud, anropar funktion vid klick med argument "id".
        tableHeadEl.forEach(th => {
            th.addEventListener("click", () => sortTable(th.id));
        });
        // Fångar upp felmeddelande
    } catch (error) {
        console.error("Error-meddelande:", error);
        throw error;
    }

}

// Anropar funktion för att visa data
displayData();

// Funktion för att sortera tabellen baserat på den valda kolumnen, argument genom id från th
function sortTable(id) {
    // Hämtar alla rader från tabellen och skapar ny array
    const rows = Array.from(tableBodyEl.querySelectorAll("tr"));

    // Hämtar index för den kolumn som matchar id
    const columnIndex = ["code", "name", "progression"].indexOf(id);

    // Sorterar raderna baserat på textinnehållet i den valda kolumnen
    rows.sort((rowA, rowB) => {
        // Hämtar textinnehållet från den aktuella cellen i den valda kolumnen för första raden
        const valueA = rowA.cells[columnIndex].textContent;
        // Hämtar textinnehållet från den aktuella cellen i den valda kolumnen för andra raden
        const valueB = rowB.cells[columnIndex].textContent;

        // Jämför textinnehållet med localCompare och returnerar resultatet beroende på aktuell sortering
        if (isAscending) {
            // Om isAscending är true, returneras resultatet av jämförelsen mellan valueA och valueB
            return valueA.localeCompare(valueB);
            // Om isAscending är false, returneras resultatet av jämförelsen mellan valueB och valueA
        } else {
            return valueB.localeCompare(valueA);
        }
    });

    // Tar bort befintliga rader från tabellen
    tableBodyEl.innerHTML = "";

    // Lägger till de sorterade raderna i tabellen
    rows.forEach(row => {
        tableBodyEl.appendChild(row);
    });

    // Byter sorteringordning för nästa klick (fallande)
    isAscending = !isAscending;
}

