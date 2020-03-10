var time = {};

var clock = document.getElementById('timecode');

  function androidJavascript() {
    tick();
    temperatura();
    atualizarTemperatura();

    var texto = Android.getValoresAndroid();
    var obj = JSON.parse(texto);
    var resultado = JSON.parse(obj.JSON)
    document.getElementById("imgBackground").src = obj.Arquivo;
    document.getElementById("txtDescription").innerHTML = resultado.descricao;
    document.getElementById("txtTitle").innerHTML = resultado.titulo;


  }


  function tick() {
    var minutes, d = new Date();
    time.weekday = d.getDay();
    time.day = d.getDate();
    time.month = d.getMonth() + 1; //JS says jan = 0
    time.year = d.getFullYear();
    time.minutes = d.getMinutes();
    time.hours = d.getHours(); //eastern time zone
    time.seconds = d.getSeconds();
    time.ms = d.getMilliseconds();

    minutes = (time.minutes < 10 ? '0' + time.minutes : time.minutes);

    clock.innerHTML = time.hours + ':' + minutes; //+ ' ' + time.month + '/' + time.day + '/' + time.year;

    window.setTimeout(tick, 1000);
  }

  function temperatura() {
    var x = new XMLHttpRequest();
    x.open("GET", "http://servicos.cptec.inpe.br/XML/cidade/7dias/244/previsao.xml", true);
    x.onreadystatechange = function () {
      if(x.readyState === XMLHttpRequest.DONE && x.status === 200) {
        localStorage['temperatura'] = x.responseXML.childNodes[0].outerHTML;
        atualizarTemperatura();
      }
    };
    x.send();
  }

  function atualizarTemperatura() {
    if (localStorage['temperatura'] != "") {
      var temperatura = localStorage['temperatura'];
      var parser = new DOMParser();
      var doc = parser.parseFromString(temperatura, "text/xml");
      document.getElementById("nuvem-chuva").src = "../icones/" + doc.childNodes[0].children[3].children[1].innerHTML + ".png";
      document.getElementById("dia1").src = "../icones/" + doc.childNodes[0].children[4].children[1].innerHTML + ".png";
      document.getElementById("dia2").src = "../icones/" + doc.childNodes[0].children[5].children[1].innerHTML + ".png";
      document.getElementById("dia3").src = "../icones/" + doc.childNodes[0].children[6].children[1].innerHTML + ".png";
      document.getElementById("dia4").src = "../icones/" + doc.childNodes[0].children[7].children[1].innerHTML + ".png";
      document.getElementById("dia5").src = "../icones/" + doc.childNodes[0].children[8].children[1].innerHTML + ".png";
      document.getElementById("dia6").src = "../icones/" + doc.childNodes[0].children[9].children[1].innerHTML + ".png";
      var d = new Date();
      var weekday = new Array(7);
      weekday[0] = "Dom";
      weekday[1] = "Seg";
      weekday[2] = "Ter";
      weekday[3] = "Qua";
      weekday[4] = "Qui";
      weekday[5] = "Sex";
      weekday[6] = "Sab";


    //  var n = weekday[d.getDay() + 1];
    //  document.getElementById("temp2_dia").innerHTML = n;
    //  n = weekday[d.getDay() + 2];
    //  document.getElementById("temp3_dia").innerHTML = n;

      document.getElementById("maxima").innerHTML = doc.childNodes[0].children[3].children[2].innerHTML;
      document.getElementById("minima").innerHTML = doc.childNodes[0].children[3].children[3].innerHTML;
    //  document.getElementById("temp2_max").innerHTML = doc.childNodes[0].children[4].children[2].innerHTML;
    //  document.getElementById("temp2_min").innerHTML = doc.childNodes[0].children[4].children[3].innerHTML;
    //  document.getElementById("temp3_max").innerHTML = doc.childNodes[0].children[5].children[2].innerHTML;
    //  document.getElementById("temp3_min").innerHTML = doc.childNodes[0].children[5].children[3].innerHTML;
    }

  }

  window.onload = androidJavascript;
