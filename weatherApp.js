window.addEventListener('load', function () 
{
    const form = document.getElementById('submission');
    let todayReading= document.getElementById('today_reading');

    let today_template= document.getElementById("today_reading_template")
    let weather_icon_template=document.getElementById("weather_icon")
    

    form.addEventListener('submit', function(event) 
    {
        event.preventDefault();

        let city = document.getElementById('location').value.trim();

        todayReading.innerHTML = '';


        if (city === '') 
        {
            alert('Please fill in all fields');
            return;
        }

        console.log('City:', city);

        const API_key = "d43c5225428a10140a37053d2a07a821";

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`)

            .then(response => 
            {
                if (!response.ok) 
                {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => 
            {
                console.log(data);

                currentTemp=(data.main.temp - 273.15);
                currentTemp=currentTemp.toFixed(0)
                humidity= data.main.humidity;
                windSpeed=data.wind.speed.toFixed(2);

                let todayDetailsClone = document.importNode(today_template.content, true);

                todayDetailsClone.querySelector('h3').textContent=city
                todayDetailsClone.getElementById('temp').textContent=`Current Temperature: ${currentTemp}°C`
                todayDetailsClone.getElementById('humidity').textContent=`Current Humidity: ${humidity}%`
                todayDetailsClone.getElementById('wind').textContent=`Current Wind Speed: ${windSpeed}m/s`
                
                document.getElementById('today_reading').appendChild(todayDetailsClone);


                let todayWeatherIconClone = document.importNode(weather_icon_template.content, true);

                let imgElement = todayWeatherIconClone.querySelector('img');
                imgElement.src= `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                imgElement.alt="Today Weather Img";

                document.getElementById('today_reading').appendChild(todayWeatherIconClone);
 
            })
            .catch(error => 
            {
                console.error('There has been a problem with your fetch operation:', error);
                alert("Error in fetching data");
                return;
            });

            

        
    });

});
