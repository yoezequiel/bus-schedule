var destinationDropdown = document.getElementById("destination");
var originDropdown = document.getElementById("origin");
var busData;

async function fetchJSON() {
    const response = await fetch("data.json");
    const data = await response.json();
    return data;
}

async function initializePage() {
    busData = await fetchJSON();

    var defaultOption = document.createElement("option");
    defaultOption.text = "Selecciona una opción";
    originDropdown.add(defaultOption);

    // Populate the origin dropdown
    busData.rutas.forEach((route) => {
        var option = document.createElement("option");
        option.text = route.origen;
        originDropdown.add(option);
    });
}

function updateDestination() {
    var selectedOrigin = originDropdown.value;
    destinationDropdown.innerHTML = "";

    var selectedRoute = busData.rutas.find(
        (route) => route.origen === selectedOrigin
    );

    selectedRoute.destinos.forEach((dest) => {
        var option = document.createElement("option");
        option.text = dest.nombre;
        destinationDropdown.add(option);
    });
}

originDropdown.addEventListener("change", updateDestination);

function getBusSchedule() {
    var selectedOrigin = originDropdown.value;
    var selectedDestination = destinationDropdown.value;
    var selectedDay = day.value;

    var selectedRoute = busData.rutas.find(
        (route) => route.origen === selectedOrigin
    );

    var selectedDest = selectedRoute.destinos.find(
        (dest) => dest.nombre === selectedDestination
    );

    var selectedSchedules = selectedDest.horarios.filter((schedule) =>
        schedule.dias.includes(selectedDay)
    );

    var resultDiv = document.getElementById("scheduleResult");

    if (selectedSchedules.length > 0) {
        resultDiv.innerHTML = "<p>Available Schedules:</p>";

        selectedSchedules.forEach((schedule) => {
            resultDiv.innerHTML += `<p>Price: $${selectedDest.precio}</p>
                                   <p>Departure: ${schedule.salida}</p>
                                   <p>Arrival: ${schedule.llegada}</p><br>`;
        });
    } else {
        resultDiv.innerHTML =
            "<p>No schedules available for the selected day.</p>";
    }
}

window.addEventListener("load", initializePage);
