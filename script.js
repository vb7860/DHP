document.addEventListener("DOMContentLoaded", function() {
    fetch("https://vishalbhardwaj.pythonanywhere.com/api/trends")
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById("tagChart").getContext("2d");

            const years = Object.keys(Object.values(data)[0]); 
            const datasets = Object.entries(data).map(([tag, values], index) => ({
                label: tag,
                data: years.map(year => values[year] || 0),
                borderColor: getRandomColor(index),
                fill: false
            }));

            new Chart(ctx, {
                type: "line",
                data: {
                    labels: years,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "right"
                        }
                    },
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: "Percentage of Questions (%)"
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: "Year"
                            }
                        }
                    }
                }
            });
        });

    function getRandomColor(index) {
        const colors = [
            "#ff0000", "#0000ff", "#008000", "#8B4513", "#800080",
            "#00FFFF", "#FF00FF", "#FFA500", "#A52A2A", "#556B2F"
        ];
        return colors[index % colors.length];
    }
});
