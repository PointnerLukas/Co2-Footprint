
// Script für Suche Table Funktion
$(document).ready(function(){
    $("#myInput").on("keyup", function() {
        var userInput = $(this).val();
        var pattern = /^[a-zA-Z0-9 ]*$/;

        if (pattern.test(userInput)) {
            var value = userInput.toLowerCase();
            $("#myTable tr").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        } else {
            alert("Invalid input! Only letters, numbers, and spaces are allowed.");
            $(this).val('');
        }
    });
});


// Script für Sortieren der Tabellen Spalten
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("ComTable");
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}



// Funktion  zum ermitteln von IP-Adresse des Besuchers
function getVisitorIP(callback) {
    // ipify.org - Dienst zur IP-Adressen erkennung
    fetch('https://api64.ipify.org?format=json').then(response => response.json()).then(data => callback(data.ip)).catch(error => console.error('Error fetching IP:', error));
}
// Länderinformation aufgrund der IP-Adresse erhalten
function getVisitorCountry(ip, callback) {
    fetch(`http://ip-api.com/json/${ip}`).then(response => response.json()).then(data => callback(data.countryCode)).catch(error => console.error('Error fstetching country information:', error));
}
function setDocumentLanguage() {
    var menu = document.getElementById('Main-Menu');
    var content = document.getElementById('Main-Content');
    getVisitorIP(function (ip) {
        getVisitorCountry(ip,
            function (countryCode) {
                switch (countryCode) {
                    case 'AT':
                        document.documentElement.lang = 'de';
                        break;
                    case 'EG': // Ägypten
                    case 'DZ': // Algerien
                    case 'BH': // Bahrain
                    case 'DJ': // Dschibuti
                    case 'IQ': // Irak
                    case 'YE': // Jemen
                    case 'JO': // Jordanien
                    case 'QA': // Katar
                    case 'KM': // Komoren
                    case 'KW': // Kuwait
                    case 'LB': // Libanon
                    case 'LY': // Libyen
                    case 'ML': // Mali
                    case 'MA': // Marokko
                    case 'MR': // Mauretanien
                    case 'NE': // Niger
                    case 'OM': // Oman
                    case 'PS': // Palästinensische Autonomiegebiete
                    case 'SA': // Saudi-Arabien
                    case 'SO': // Somalia
                    case 'SD': // Sudan
                    case 'SY': // Syrien
                    case 'TD': // Tschad
                    case 'TN': // Tunesien
                    case 'AE': // Vereinigte Arabische Emirate
                    case 'EH': // Westsahara
                        document.documentElement.lang = 'ar';
                        menu.classList.add('justify-content-end');
                        content.classList.add('pr-5');
                        content.classList.add('mr-5');
                        content.classList.remove('ml-5');
                        content.classList.remove('pl-5');
                        break;
                    default:
                        document.documentElement.lang = 'de';
                        content.classList.add('pl-5');
                        content.classList.add('ml-5');
                }
            });
    });
}
document.addEventListener("DOMContentLoaded", function() {
    setDocumentLanguage();
});
