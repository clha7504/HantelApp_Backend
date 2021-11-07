var rootUrl = window.location.origin; // get the root URL, e.g. https://example.herokuapp.com or http://localhost:3001

// initialise server-sent events
function initSSE() {
    if (typeof (EventSource) !== "undefined") {
        var url = rootUrl + "/api/events";
        var source = new EventSource(url);
        source.onmessage = (event) => {
            updateVariables(JSON.parse(event.data));
        };
    } else {
        alert("Your browser does not support server-sent events.");
    }
}
initSSE();

function updateVariables(data) {
    // update the html elements
    document.getElementById("lastevent").innerHTML = JSON.stringify(data);
    if (data.eventName === "Hantel-Info-01") {
        document.getElementById("TrainingStarted").innerHTML = data.eventData;
    }
    if (data.eventName === "Hantel-Info-02") {
        document.getElementById("TrainingEnded").innerHTML = data.eventData;
    }
    if (data.eventName === "Anzahl-Hantelbewegungen") {
        document.getElementById("Hantelzüge").innerHTML = data.eventData;
    }
    if (data.eventName === "Kadenz-dieser-Übung") {
        document.getElementById("Kadenz").innerHTML = data.eventData;
    }
    if (data.eventName === "Trainingsdauer") {
        document.getElementById("Dauer").innerHTML = data.eventData;
    }
}

async function setCounter() {
    // read the value from the input field
    var counter = document.getElementById("counterinput").value;

    // call the function
    var response = await axios.post(rootUrl + "/api/device/0/function/setCounter", { arg: counter });

    // Handle the response from the server
    alert("Response: " + response.data.result); // we could to something meaningful with the return value here ... 
}

async function getKadenz() {
    // request the variable "counter"
    var response = await axios.get(rootUrl + "/api/device/0/variable/Kadenz1");
    var Kadenz1 = response.data.result;

    // update the html element
    document.getElementById("Kadenz1").innerHTML = Kadenz1;
}

async function getAnzahl() {
    // request the variable "counter"
    var response = await axios.get(rootUrl + "/api/device/0/variable/Anzahl");
    var Anzahl = response.data.result;

    // update the html element
    document.getElementById("Anzahl").innerHTML = Anzahl;
}
