// Declare destinationDropdown and originDropdown globally
var destinationDropdown = document.getElementById("destination");
var originDropdown = document.getElementById("origin");
var busData; // Declare busData globally

// Function to fetch JSON data
async function fetchJSON() {
    const response = await fetch("data.json");
    const data = await response.json();
    return data;
}

// Your function to initialize the page
async function initializePage() {
    busData = await fetchJSON();

    // Add a default option to the origin dropdown
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

// Function to populate the destination dropdown based on the selected origin
function updateDestination() {
    var selectedOrigin = originDropdown.value;
    destinationDropdown.innerHTML = ""; // Clear previous options

    // Find the selected route
    var selectedRoute = busData.rutas.find(
        (route) => route.origen === selectedOrigin
    );

    // Populate the destination dropdown
    selectedRoute.destinos.forEach((dest) => {
        var option = document.createElement("option");
        option.text = dest.nombre;
        destinationDropdown.add(option);
    });
}

// Event listener for origin change
originDropdown.addEventListener("change", updateDestination);

// Function to get bus schedule based on user selection
function getBusSchedule() {
    var selectedOrigin = originDropdown.value;
    var selectedDestination = destinationDropdown.value;
    var selectedDay = day.value;

    // Find the selected route
    var selectedRoute = busData.rutas.find(
        (route) => route.origen === selectedOrigin
    );

    // Find the selected destination
    var selectedDest = selectedRoute.destinos.find(
        (dest) => dest.nombre === selectedDestination
    );

    // Find all schedules for the selected day
    var selectedSchedules = selectedDest.horarios.filter((schedule) =>
        schedule.dias.includes(selectedDay)
    );

    // Display the schedule information
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

// Event listener for page load
window.addEventListener("load", initializePage);
