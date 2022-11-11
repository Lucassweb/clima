document.querySelector('.busca').addEventListener('submit', async (event) => { //async -  codigo que é asincrono - nao orgenado
    event.preventDefault(); //essa função previne um comportamento padrao, que aquele formulario deveria ter 

    let input = document.querySelector('#searchInput').value;


    if (input !== '') {
        //clearInfo();
        showWarning('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=b7915a01dca665de7ee4887de84eea4f&units=metric&lang=pt_br`;

        let results = await fetch(url);
        let json = await results.json();

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });

        } else {
            //clearInfo();
            showWarning('Não encontrado');
        }
    }

});

function showInfo(json) {
    showWarning('');

    document.querySelector('.resultado').style.display = 'block';

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);//atributo para trocar: src

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`
}



/*function clearInfo(); {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

*/


function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

