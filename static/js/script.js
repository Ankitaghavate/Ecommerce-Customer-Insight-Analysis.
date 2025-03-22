document.getElementById("prediction-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form refresh

    // Collect input values
    let inputData = {
        Avg_Session_Length: parseFloat(document.getElementById("Avg_Session_Length").value),
        Time_on_App: parseFloat(document.getElementById("Time_on_App").value),
        Time_on_Website: parseFloat(document.getElementById("Time_on_Website").value),
        Length_of_Membership: parseFloat(document.getElementById("Length_of_Membership").value),
      
    };

    // Send data to Flask backend
    fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById("prediction-result").innerHTML = "Error: " + data.error;
            document.getElementById("prediction-result").style.display = "block";
        } else {
            let predictionValue = data.prediction[0].toFixed(2);
            document.getElementById("prediction-result").innerHTML = "Predicted Yearly Spending: $" + predictionValue;
            document.getElementById("prediction-result").style.display = "block";

            // Update chart
            updateChart(predictionValue);
        }
    })
    .catch(error => console.error("Error:", error));
});
