const alertBar = document.querySelector('.alert-container');
const sendButton = document.querySelector('.send-box');
const messageArea = document.querySelector('.message-field-container'); 
const user = document.querySelector('.search-box-container'); 
var userArray = ["Victoria Chambers", "Dale Byrd", "Dawn Wood", "Dan Oliver"];
var popup = document.getElementById("myPopup");
const fullSizeChart = document.getElementById('lineChart');
const dailyTrafficChart = document.getElementById('barChart');
const mobileUsersChart = document.getElementById('doughnutChart');
const trafficNavBar = document.querySelector('.nav-items-bar');
var trafficOptions = trafficNavBar.firstElementChild.children;

//Traffic Data Variables
const hLabel = ["1hr", "2hr", "3hr", "4hr", "5hr", "6hr", "7hr", "8ht" ];
const hData = ["1", "2", "1.75", "3.5", "2.8", "4.3", "6.4", "6.8"];

const dLabel = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const dData = ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"];

const wLabel = ["W1", "W2", "W3", "W4", "W5"];
const wData = ["100", "200", "150", "275", "500", "600", "700", "800", "900", "1000"];

const mLabel = ["Sept", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];            
const  mData = ["1800", "2470", "4500", "6750", "5000", "6350", "7880", "8000", "9000", "10000", "15000", "20000"];

//Local Stotage Variables
var keyOnOffSwitchInput1 = document.getElementById('myonoffswitch');
var keyOnOffSwitchInput2 = document.getElementById('myonoffswitch2');
const keyTimezoneInput = document.getElementById('timezone');
const keySaveSettingsButton = document.getElementById('saveB');
const keyCancelSettingsButton = document.getElementById('cancelB');


keySaveSettingsButton.onclick = function () {
  const value1 = keyOnOffSwitchInput1.checked;
  var value2 = keyOnOffSwitchInput2.checked;
  var value3 = keyTimezoneInput.value;

  if(value3 == 'ST') {
    alert("Please Select a Timezone");
  } else {

    console.log(value1);
    console.log(value2);
    console.log(value3);

    localStorage.setItem("Email Notifications", value1);
    localStorage.setItem("Public Profile", value2);
    localStorage.setItem("Timezone", value3);
  }
};

window.onload = function() {

  keyTimezoneInput.value = localStorage.getItem('Timezone');
  var temp1 = localStorage.getItem("Email Notifications");
  var temp2 = localStorage.getItem("Public Profile");

  if(temp1 == 'true') {
  keyOnOffSwitchInput1.checked = true;
} else 
  keyOnOffSwitchInput1.checked = false;

  if(temp2 == 'true') {
    keyOnOffSwitchInput2.checked = true;
  } else 
    keyOnOffSwitchInput2.checked = false;
};

//OnOff Switch Action
keyOnOffSwitchInput1.onclick = function () {
    console.log(keyOnOffSwitchInput1.checked);  
}; 

keyOnOffSwitchInput2.onclick = function () {
  console.log(keyOnOffSwitchInput2.checked);  
}; 

keyCancelSettingsButton.onclick = function () {
  localStorage.clear();
};


function myFunction() {
  popup.classList.toggle("show");
}

// Close Button Function
alertBar.addEventListener('click', e => {
  if(e.target.tagName === 'A') {
    alertBar.style.display = 'none';
  }
});

//Autocomplete Function
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), userArray);

// Send Button Function


function findUser(typedUser) {
  var counter = 0;
  for(let i = 0; i <= userArray.length; i++) {
    if(typedUser.value == userArray[i]){
      return true;
    } else {
      counter = i;

  }
  if(counter > 3) {
    return false;
    }
  }
}

const typeUser = user.firstElementChild.firstElementChild;

sendButton.onclick = function () {
  
  if(findUser(typeUser)) {
      if(messageArea.firstElementChild.value != "") {
        alert('Message Sent');
        typeUser.value = "";
        messageArea.firstElementChild.value = "";
     } else {
        alert('Message Field can not be empty');
      }
    } else if(typeUser.value == ""){
      alert('User field can not be empty');
    } else alert('User not found'); 
  }


// Line Chart Function
let lineChart;
function dynamicLineChart (dynamicLabel, dynamicData) {
  if (lineChart) {
    lineChart.destroy();
  }
  lineChart = new Chart(fullSizeChart, {
    type: 'line',
    data: {
      labels: dynamicLabel, 
      datasets: [{
          fill: true,
          lineTension: 0,
          backgroundColor: "rgba(167, 167, 211, 0.4)",
          borderColor: "rgba(167, 167, 211, 1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          borderWidth: 1,
          pointBorderColor: "rgba(167, 167, 211, 1)",
          pointBackgroundColor: "rgba(255, 255, 255, 1)",
          pointBorderWidth: 2,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(255, 255, 255)",
          pointHoverBorderWidth: 1,
          pointRadius: 5,
          pointHitRadius: 10,
          data: dynamicData, 
        }
      ]
    },
    options: {
      legend: display = false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

// LINE CHART STAGE 0

trafficOptions[0].style.borderRadius = '10px';
trafficOptions[0].style.border = '1px solid #81C98F';
trafficOptions[0].style.backgroundColor = '#81C98F';
trafficOptions[0].style.color = 'white';

dynamicLineChart(hLabel, hData);

//Style Function

function styleFunction (clickedLi) {
  for(let i=0; i<trafficOptions.length; i++){
    if(clickedLi == trafficOptions[i]) {
      clickedLi.style.borderRadius = '10px';
      clickedLi.style.border = '1px solid #81C98F';
      clickedLi.style.backgroundColor = '#81C98F';
      clickedLi.style.color = 'white'
    } else {
      trafficOptions[i].style = 'none';
    }
  }
}


//TRAFFIC NAVIGATION

trafficNavBar.addEventListener('click', e => {
  const clickedElement = e.target;
  if(clickedElement.tagName === 'LI'){
    console.log(trafficOptions[1]);
    if(clickedElement == trafficOptions[0]) {
      console.log(e.target);
      styleFunction(trafficOptions[0]);
      dynamicLineChart(hLabel, hData);
      }  else if(clickedElement == trafficOptions[1]) {
        console.log(e.target);
        styleFunction(trafficOptions[1]);
        dynamicLineChart(dLabel, dData);
      }  else if(clickedElement == trafficOptions[2]) {
        console.log(e.target);
        styleFunction(trafficOptions[2]);
        dynamicLineChart(wLabel, wData);
      }  else if(clickedElement == trafficOptions[3]) {
        styleFunction(trafficOptions[3]);
        dynamicLineChart(mLabel, mData);
      }  
    }   
});




// CHARTS


let barChart = new Chart(dailyTrafficChart, {
  type: 'bar',
  data: {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [{
        fill: true,
        lineTension: 0,
        backgroundColor: "rgba(167, 167, 211, 1)",
        borderColor: "rgba(167, 167, 211, 1)",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "rgba(167, 167, 211, 1)",
        pointBackgroundColor: "rgba(255, 255, 255, 1)",
        pointBorderWidth: 3,
        pointHoverRadius: 10,
        pointHoverBackgroundColor: "rgb(255, 255, 255)",
        pointHoverBorderWidth: 2,
        data: [75, 100, 175, 125, 225, 200, 100],
      }
    ]
  },
  options: {
    legend: {
          display: false,
              },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

let doughnutChart = new Chart(mobileUsersChart, {
  type: 'doughnut',
  data: {
    labels:
      ['Desktop',
      'Tablets',
      'Phones'],
    datasets: [
      {
        backgroundColor: ["#7477BF", "#81C98F", "#74B1BF"],
        borderColor: ["#7477BF", "#81C98F", "#74B1BF"],
        data: [70, 20, 10]
      }
    ]
  },
    options: {
      legend: {
            display: true,
            position: 'right',
            align: 'center',
                labels: {
                  boxWidth: 15,
                  }
                }
      }
    }
  );
