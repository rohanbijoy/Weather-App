
function search() {
    const apiKey = "76c87a4b09996bf65fc477d81915f254";
    const cityName = document.getElementById("input_name").value.trim().replace(/\s+/g, ' ');
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${apiKey}`;
    const weatherTips = {
      Clouds: "Don't forget to bring an umbrella!",
      Rain: "Stay dry and wear waterproof clothing!",
      Winds: "Hold on to your hat, it's windy out there!",
      Clear: "Enjoy the sunshine and blue skies!",
      Snow: "Bundle up and stay warm in the snow!",
      Drizzle: "Light rain is falling, take your umbrella!",
      Mist: "Be cautious, visibility might be low due to mist!"
      
  };
  


    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.cod === 200) {
             
                const iconCode = data.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
                document.getElementById("result").innerHTML = `
                <div class="container">
                <div class="card">
                  <video class="background-video" autoplay muted loop>
                    <source src="" type="video/mp4" />
                    
                  </video>
                 
                    <div class="content">
                    <a class="back" href="index.html"><i class="fa-solid fa-angle-left fa-2x" style="color: #ffffff;"></i></a>
                    <div class="date-time">
                      
                      <img src="images/Resized.png" alt="Logo" class="logo img-fluid" />
                      <ul class="date-list">
                        <li><span id="current-date"></span></li>
                        <li><span id="current-time"></span></li>
                    </ul>
          
                    </div>
                   
                    <div class="row">
                      <div class="col-md-6">
                        <div class="app">
                          <h3 id="city" class="city-name">${data.name}, ${data.sys.country}</h3>
                          <div class="temp">
                            <img class="climate-logo m-3" src="" alt="" />
                            <p class="temperature">${data.main.temp}°c ${data.weather[0].main}</p>
                          </div>
                          <table class="table-borderless mt-5">
                            <thead>
                              <tr>
                                <th scope="col">Temperature</th>
                                <th scope="col">Humidity</th>
                                <th scope="col">Wind</th>
                                <th scope="col">Pressure</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>${data.main.temp}°C</td>
                                <td>${data.main.humidity}  %</td>
                                <td>${data.wind.speed} m/s</td>
                                <td>${data.main.pressure} hPa</td>
                              </tr>
                             
                            </tbody>
                          </table>
                          <div id="result1">
                            <div class="tip-box container-fluid">
                            <ul class="tip-list"><li><img class="tip" src="images/tip-removebg-preview.png" alt="">"Don't forget to wear sunscreen and sunglasses!"</li></ul>
                           
                            </div>
                          </div>
                      </div>
                      <div class="col-md-6"></div>
                    </div>
                    </div>
                </div>
              </div>
                `;
                

                const weatherCondition = data.weather[0].main;
                const tip = weatherTips[weatherCondition];
                if (tip) {
                  document.getElementById("result1").innerHTML = `
                      <div class="tip-box">
                          <ul class="tip-list">
                              <li><img class="tip" src="images/tip-removebg-preview.png" alt="">"${tip}"</li>
                          </ul>
                      </div>
                  `;
                }else {
                  document.getElementById("result1").innerHTML = ''; 
                }

                let videoFileName;
                let logo;

                switch (weatherCondition) {
                    case 'Clouds':
                        videoFileName = 'cloud1.mp4';
                        logo = 'clouds.png';
                        break;
                    case 'Rain':
                        videoFileName = 'rain1.mp4';
                        logo = 'rain.png'
                        break;
                    case 'Mist':
                        videoFileName = 'mist1.mp4';
                        logo = 'mist.png';
                        break;
                    case 'Thunderstorm':
                        videoFileName = 'thunderstorm1.mp4';
                        logo = 'mist.png';
                        break;
                    case 'Snow':
                        videoFileName = 'snow1.mp4';
                        logo = 'snow.png';
                        break;
                    case 'Wind':
                        videoFileName = 'wind1.mp4';
                        logo = 'wind.png';
                        break;
                    case 'Drizzle':
                        videoFileName = 'drizzle1.mp4';
                        logo = 'drizzle.png';
                        break;
                    case 'Clear':
                        videoFileName = 'clear5.mp4';
                        logo = 'clear.png';
                        break;
                   
                }

               
                const backgroundVideo = document.querySelector('.background-video');
                backgroundVideo.src = `videos/${videoFileName}`;
                backgroundVideo.load();
                const climateLogo = document.querySelector('.climate-logo');
                climateLogo.src = `images/${logo}`;
                
                
    
                function updateDateTime() {
                    const currentDateElement = document.getElementById("current-date");
                    const currentTimeElement = document.getElementById("current-time");
                
                    const currentDate = new Date();
                    const day = String(currentDate.getDate()).padStart(2, '0');
                    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                    const year = currentDate.getFullYear();
                    let hours = currentDate.getHours();
                    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
                    let amOrPm = hours >= 12 ? 'PM' : 'AM';
                
                    hours = hours % 12 || 12;
                
                    const formattedDate = `${day}-${month}-${year}`;
                    const formattedTime = `${hours}:${minutes} ${amOrPm}`;
                
                    currentDateElement.textContent = formattedDate;
                    currentTimeElement.textContent = formattedTime;
                }
                
            
                updateDateTime();
                
       
                setInterval(updateDateTime, 1000);
                
               
                
            } else {
                alert(`${data.message}`);
            }
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
            document.getElementById("result").innerHTML = "<p>Failed to fetch weather data</p>";
        });
}


var recognition = new webkitSpeechRecognition();
var textbox = document.getElementById("input_name");
var instructions = document.getElementById("instructions");
var recognitionActive = false;

recognition.continuous = true;
recognition.lang = "en-US";


document.getElementById("voice").addEventListener("click", function() {
    if (recognitionActive) {
        instructions.textContent = "Voice Recognition is off";
        instructions.style.color = "red";
        recognition.stop();
        recognitionActive = false;
   
        setTimeout(function() {
            instructions.textContent = "";
        }, 2000);
    } else {
        instructions.textContent = "Voice Recognition is on";
        instructions.style.color = "green"; 
        recognition.start();
        recognitionActive = true;
    }
});


recognition.onresult = function(event) {
    var current = event.resultIndex;
    var transcript = event.results[current][0].transcript;
    textbox.value = transcript;
    search();
};

recognition.onerror = function(event) {
    instructions.textContent = "Try Again";
};

