const barChartcnt = document.getElementById("barChart1");
const pieChartnxc = document.getElementById("pieChart1");

function fetchPeopleData() {
  const url = "https://www.trcloud.co/test/api.php";
  const xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      try {
        const jsonData = JSON.parse(xhr.responseText);
        const labelData = jsonData.map((element) => element.City);
        const labelDataSetData = jsonData.map((element) => element.Population);
        barChart(labelData, labelDataSetData);
        pieChart(labelData, labelDataSetData);
      } catch (error) {
        console.log(error);
      }
    }
  };
  xhr.send();
}

// async function fetchPeopleData() {
//   const url = "https://www.trcloud.co/test/api.php";

//   try {
//     const response = await fetch(url);

//     if (!response) {
//       throw new Error("Response status : " + response.status);
//     }

//     const jsonData = await response.json();
//     const labelData = jsonData.map((element) => element.City);
//     const labelDataSetData = jsonData.map((element) => element.Population);
//     barChart(labelData, labelDataSetData);
//     pieChart(labelData, labelDataSetData);
//   } catch (error) {
//     console.log(error);
//   }
// }

function barChart(label, datasetsNumber) {
  let barChart = new Chart(barChartcnt, {
    type: "bar",
    data: {
      labels: label,
      datasets: [
        {
          label: "Range By Coutry",
          data: datasetsNumber,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {
          ticks: {
            maxRotation: 1,
            minRotation: 0,
          },
        },
      },
    },
  });
  barChart.canvas.parentNode.style.height = "450px";
  barChart.canvas.parentNode.style.width = "950px";
}

function pieChart(label, datasetsNumber) {
  let pieChart = new Chart(pieChartnxc, {
    type: "pie",
    data: {
      labels: label,
      datasets: [
        {
          label: "Range By Coutry",
          data: datasetsNumber,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      maintainAspectRatio: false,
    },
  });
  pieChart.canvas.parentNode.style.height = "450px";
  pieChart.canvas.parentNode.style.width = "950px";
}

fetchPeopleData();
