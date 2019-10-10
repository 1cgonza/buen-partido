var counters = {};
var usuario = [];
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var og = {};
var ganador = [
  {
    nombre: 'HOLLMAN',
    completo: 'HOLLMAN MORRIS',
    src: '../imgs/hollman_morris_pixel.png'
  },
  {
    nombre: 'CARLOS',
    completo: 'CARLOS GALÁN',
    src: '../imgs/carlos_galan_pixel.png'
  },
  {
    nombre: 'CLAUDIA',
    completo: 'CLAUDIA LÓPEZ',
    src: '../imgs/claudia_lopez_pixel.png'
  }
];
var ganadorI;

var contCandidatos = [];
// Las respuestas de los candidatos
var candidatos = [
  // ....:::: CATEGORIA SEXO ::::....
  // PREGUNTA 1
  {
    categoria: 'sexo',
    pregunta: 'Contrato personas trans',
    respuestas: ['si', 'si', 'si']
  },
  // PREGUNTA 2
  {
    categoria: 'sexo',
    pregunta: 'Acoso callejero',
    respuestas: ['si', 'si', 'si']
  },
  // PREGUNTA 3
  {
    categoria: 'sexo',
    pregunta: 'Educación sexual',
    respuestas: ['si', 'si', 'si']
  },
  // PREGUNTA 4
  {
    categoria: 'sexo',
    pregunta: 'Renuncia acoso sexual',
    respuestas: ['no', 'siif', 'si']
  },
  // PREGUNTA 5
  {
    categoria: 'sexo',
    pregunta: 'Ideología de género',
    respuestas: ['c', 'a', 'a']
  },
  // PREGUNTA 6
  {
    categoria: 'sexo',
    pregunta: 'Servicios amigables IVE',
    respuestas: ['si', 'siif', 'no']
  },
  // ....:::: CATEGORIA CIUDAD ::::....
  // PREGUNTA 7
  {
    categoria: 'ciudad',
    pregunta: 'Baños publicos',
    respuestas: ['b', 'b', 'b,c']
  },
  // PREGUNTA 8
  {
    categoria: 'ciudad',
    pregunta: 'violencia habitantes calle',
    respuestas: ['c', 'a,b', 'c,d']
  },
  // PREGUNTA 9
  {
    categoria: 'ciudad',
    pregunta: 'intervención bronx',
    respuestas: ['b', 'c', 'f']
  },
  // PREGUNTA 10
  {
    categoria: 'ciudad',
    pregunta: 'Reubicar vendedores',
    respuestas: ['si', 'no', 'no']
  },
  // ....:::: CATEGORIA DROGAS ::::....
  // PREGUNTA 11
  {
    categoria: 'drogas',
    pregunta: 'seguridad bogotá',
    respuestas: [
      ['c', 'b', 'a', 'd', 'e'],
      ['a', 'd', 'b', 'c', 'e'],
      ['d', 'b', 'a', 'e', 'c']
    ]
  },
  // PREGUNTA 12
  {
    categoria: 'drogas',
    pregunta: 'dosis mínima',
    respuestas: ['a', 'nn', 'a,c']
  },
  // PREGUNTA 13
  {
    categoria: 'drogas',
    pregunta: 'CAMAD',
    respuestas: ['si', 'siif', 'no']
  },
  // ....:::: CATEGORIA VIOLENCIA ::::....
  // PREGUNTA 14
  {
    categoria: 'violencia',
    pregunta: 'éxito policía',
    respuestas: ['b,c,d', 'b,c,d', 'b,c,d']
  },
  // PREGUNTA 15
  {
    categoria: 'violencia',
    pregunta: 'policia lgbt',
    respuestas: ['b', 'e', 'd']
  },
  // PREGUNTA 16
  {
    categoria: 'violencia',
    pregunta: 'ESMAD',
    respuestas: ['a,c', 'a,c', 'a']
  },
  // PREGUNTA 17
  {
    categoria: 'violencia',
    pregunta: 'cc andino',
    respuestas: ['b,d', 'nn', 'd,e']
  },
  // PREGUNTA 18
  {
    categoria: 'violencia',
    pregunta: 'drogas espacio público',
    respuestas: ['c,d', 'nn', 'f']
  },
  // ....:::: CATEGORIA ACTUALIDAD ::::....
  // PREGUNTA 19
  {
    categoria: 'actualidad',
    pregunta: 'derecho mov',
    respuestas: ['a', 'c', 'c']
  },
  // PREGUNTA 20
  {
    categoria: 'actualidad',
    pregunta: 'líderes sociales',
    respuestas: ['b,c,e,f,g,h', 'b,c,d,e,f,g,h', 'b,c,g']
  },
  // ....:::: CATEGORIA PERSONAL ::::....
  // PREGUNTA 21
  {
    categoria: 'personal',
    pregunta: 'consumo de droga',
    respuestas: ['si', 'si', 'no']
  },
  // PREGUNTA 22
  {
    categoria: 'personal',
    pregunta: 'uber',
    respuestas: ['si', 'si', 'no']
  },
  // PREGUNTA 23
  {
    categoria: 'personal',
    pregunta: 'tres colombianos',
    respuestas: ['a', 'b', 'c']
  },
  // PREGUNTA 24
  {
    categoria: 'personal',
    pregunta: 'telenovela',
    respuestas: ['a', 'b', 'c']
  }
];

function indexOfMax(arr) {
  var max = arr[0];
  var maxIndex = 0;
  var empate = [];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] === max) {
      if (empate.indexOf(maxIndex) < 0) {
        empate.push(maxIndex);
      }
      empate.push(i);
    }

    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return {
    ganador: maxIndex,
    empate: empate
  };
}

function pintarResultado(userName, userImgSrc) {
  var img = new Image();
  img.onload = function (event) {
    var w = 1200;
    var h = 630;
    var centerX = w / 2;
    var centerY = h / 2;
    var im = event.target;
    var iW = im.naturalWidth;
    var iH = im.naturalHeight;
    canvas.width = 1200;
    canvas.height = 630;

    var grd = ctx.createLinearGradient(0.0, 0.0, 0, canvas.height / 1.2);
    grd.addColorStop(0.0, 'rgba(8, 126, 139, 1)');
    grd.addColorStop(1.0, 'rgba(239, 233, 131, 1)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = 'bold 50px Quantico';
    ctx.fillStyle = 'white';
    ctx.globalAlpha = 0.5;

    if (userName) {
      ctx.textAlign = 'right';
      for (var y = 2; y < 10; y++) {
        ctx.fillText(userName.toUpperCase(), 300, y * 60);
        ctx.fillText(ganador[ganadorI].nombre, canvas.width - 200, y * 60);
      }

      ctx.textAlign = 'center';
      for (var y = 2; y < 10; y++) {
        ctx.fillText('+', centerX, y * 60);
      }
    } else {
      ctx.textAlign = 'center';
      for (var y = 2; y < 10; y++) {
        ctx.fillText(ganador[ganadorI].nombre, centerX, y * 60);
      }
    }

    ctx.globalAlpha = 1;
    ctx.font = 'bold 40px Quantico';
    ctx.textAlign = 'center';
    ctx.fillText('MI BUEN PARTIDO ES', centerX, 50);

    ctx.font = 'bold 50px Quantico';
    ctx.fillStyle = 'black';
    ctx.fillText(ganador[ganadorI].completo, centerX, canvas.height - 20);

    if (userImgSrc) {
      var userImg = new Image();
      userImg.crossOrigin = 'anonymous';
      userImg.onload = function () {
        ctx.save();

        ctx.beginPath();
        ctx.arc(centerX - 300, centerY, 150, 0, Math.PI * 2, true);
        ctx.clip();
        ctx.drawImage(userImg, 150, centerY - iH / 2, 300, 300);
        ctx.restore();

        ctx.drawImage(im, centerX + iW / 2, centerY - iH / 2);
      };
      userImg.src = userImgSrc;
    } else {
      ctx.drawImage(im, centerX - iW / 2, centerY - iH / 2);
    }
  };
  img.src = ganador[ganadorI].src;
}

function limitCheckboxes(form, input, limit) {
  var options = form.querySelectorAll('input');

  if (input.checked) {
    counters[form.id]++;
  } else {
    counters[form.id]--;
  }

  var bool = counters[form.id] >= limit;

  for (var j = 0; j < options.length; j++) {
    if (!options[j].checked) {
      options[j].disabled = bool;
    }
  }
}

function obtenerResultados() {
  var suma = {
    total: [0, 0, 0]
  };
  var categoria = '';

  for (var i = 0; i < candidatos.length; i++) {
    if (categoria !== candidatos[i].categoria) {
      suma[candidatos[i].categoria] = [0, 0, 0];
      categoria = candidatos[i].categoria;
    }

    for (var j = 0; j < contCandidatos[i].length; j++) {
      suma.total[j] += contCandidatos[i][j];
      suma[categoria][j] += contCandidatos[i][j];
    }
  }

  var contenedorPreguntas = document.getElementById('preguntas');
  var contenedorRes = document.getElementById('res');

  contenedorPreguntas.classList.remove('active');
  contenedorRes.classList.add('active');

  var resultado = indexOfMax(suma.total);

  if (resultado.empate.length) {
    console.log('empate');
  }

  ganadorI = resultado.ganador;
  og = ganador[ganadorI];

  pintarResultado();

  var download = document.getElementById('download-img');

  download.addEventListener('click', function () {
    canvas.toBlob(function (blob) {
      saveAs(blob, 'miBuenPartidoes-' + ganador[ganadorI].completo + '.jpg');
    });
  });
}

// obtenemos todas las preguntas
var preguntas = document.querySelectorAll('.pregunta');

// Pasamos por cada una en un loop
for (var i = 0; i < preguntas.length; i++) {
  // Sacamos cada pregunta por separado
  var form = preguntas[i];
  // En el HTML definimos cuantas opciones puede seleccionar el usario con el atributo data-tipo="1", data-tipo="2"
  // Sólo en el caso en que el usuario puede ordernar, el tipo sería data-tipo="orden"
  var tipo = form.dataset.tipo;

  // Iniciamos el contador de cada pregunta en 0 para que la función limitChechboxes() pueda defnir si ha selecionado todas las posibles.
  counters[form.id] = 0;
  // Iniciamos el formulario sin ninguna respuesta selecionada.
  form.reset();

  // iniciamos las respuestas del usuario en blanco
  usuario[i] = '';
  contCandidatos[i] = [0, 0, 0];

  // Según el tipo, iniciamos el funcionamiento del formulario
  if (tipo === 'orden') {
    // En el caso de ordenar, usamos la libreria Sortable
    var sortable = Sortable.create(form.querySelector('.sortable'), {
      animation: 300,
      easing: 'cubic-bezier(1, 0, 0, 1)',
      onEnd: function (event) {
        var parentId = event.from.parentElement.id;
        var pos = parentId.split('pregunta')[1] - 1;
        var children = event.srcElement.children;
        var order = [];
        var respuestas = candidatos[pos].respuestas;
        var parentForm = document.getElementById('pregunta' + (pos + 1));

        parentForm.classList.add('respondida');

        for (var i = 0; i < children.length; i++) {
          order.push(children[i].dataset.value);
        }

        var pesos = [0.4, 0.3, 0.15, 0.1, 0.05];

        for (var n = 0; n < respuestas.length; n++) {
          var count = 0;
          for (var j = 0; j < respuestas[n].length; j++) {
            var val = respuestas[n][j];
            var posU = order.indexOf(val);
            var diferencia = j - posU;

            if (diferencia === 0) {
              count += pesos[j];
            } else if (diferencia > 0) {
              count += pesos[j] / 2 - 0.03 * (diferencia / 2);
            } else {
              count += pesos[j] / 2 - 0.03 * Math.abs(diferencia);
            }
          }
          contCandidatos[pos][n] = count;
        }

        usuario[pos] = order;
      }
    });
  }

  form.addEventListener('change', function (event) {
    var parentForm = event.target.parentElement;
    var t = parentForm.dataset.tipo;
    var parentId = parentForm.id;
    var pos = parentId.split('pregunta')[1] - 1;
    var respuestas = candidatos[pos].respuestas;
    var resU = event.target.value;
    var checked = event.target.checked;
    var inputs = parentForm.querySelectorAll('input');

    var respuestasU = [];
    if (!Array.isArray(usuario[pos])) {
      respuestasU = usuario[pos].split(',');
      respuestasU = respuestasU.filter(function (ele) {
        return !!ele;
      });
    }

    if (checked) {
      respuestasU.push(resU);
    } else {
      respuestasU = respuestasU.filter(function (ele) {
        return ele !== resU;
      });
    }

    if (t !== 'orden') {
      respuestasU.sort();
      usuario[pos] = respuestasU.join(',');

      if (t === '2NN') {
        t = t.charAt(0);
      }

      if (checked && resU === 'nn') {
        t = 1;
        limitCheckboxes(parentForm, event.target, 1);

        for (var ii = 0; ii < inputs.length; ii++) {
          if (!event.target.isSameNode(inputs[ii])) {
            inputs[ii].checked = false;
            inputs[ii].disabled = true;
          }
        }
      } else if (!checked && resU === 'nn') {
        counters[parentId] = 0;
        for (var ii = 0; ii < inputs.length; ii++) {
          inputs[ii].checked = false;
          inputs[ii].disabled = false;
        }
      } else {
        limitCheckboxes(parentForm, event.target, +t);
      }

      for (var i = 0; i < respuestas.length; i++) {
        var cont = 0;
        var resC = respuestas[i].split(',');

        for (var j = 0; j < inputs.length; j++) {
          var input = inputs[j];
          var c = input.checked;

          if (c) {
            if (resC.indexOf(input.value) >= 0) {
              if (respuestasU.length > resC.length) {
                cont += 1 / +t;
              } else {
                cont += 1 / resC.length;
              }
            }
          }
        }

        contCandidatos[pos][i] = cont;
      }

      for (var x = 0; x < inputs.length; x++) {
        if (inputs[x].checked) {
          parentForm.classList.add('respondida');
          break;
        }
        parentForm.classList.remove('respondida');
      }
    }

    var respondidas = 0;

    for (var r = 0; r < preguntas.length; r++) {
      if (preguntas[r].classList.contains('respondida')) {
        respondidas++;
      }
    }

    if (respondidas === preguntas.length) {
      obtenerResultados();
    }
    obtenerResultados();
  });
}

// ------------- //
function scrollTo(to, duration) {
  var element = document.scrollingElement || document.documentElement;
  var start = element.scrollTop;
  var change = to - start;
  var startDate = +new Date();

  var easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  var animateScroll = function () {
    var currentDate = +new Date();
    var currentTime = currentDate - startDate;
    element.scrollTop = parseInt(
      easeInOutQuad(currentTime, start, change, duration)
    );
    if (currentTime < duration) {
      requestAnimationFrame(animateScroll);
    } else {
      element.scrollTop = to;
    }
  };

  animateScroll();
}

var menuItems = document.querySelectorAll('.menu .categoria');

for (var i = 0; i < menuItems.length; i++) {
  var mItem = menuItems[i];

  mItem.addEventListener('click', function (event) {
    var id;
    if (event.target.classList.contains('categoria')) {
      id = event.target.dataset.to;
    } else {
      id = event.target.parentElement.dataset.to;
    }

    var toEle = document.getElementById(id);
    var to = toEle.offsetTop;

    scrollTo(to, 1000);
  });
}

function debounce(hold) {
  let debounceTimer;
  hold = hold || 250;
  return new Promise((resolve, reject) => {
    // trick for runing code only when resize ends
    // https://css-tricks.com/snippets/jquery/done-resizing-event/
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      resolve();
    }, hold);
  });
}

window.addEventListener('scroll', function () {
  debounce(250).then(function () {
    var sections = document.querySelectorAll('section');
    var wTop = window.pageYOffset + 400;

    for (var i = 0; i < sections.length; i++) {
      if (menuItems[i + 1]) {
        if (wTop >= sections[i].offsetTop && wTop < sections[i + 1].offsetTop) {
          menuItems[i].classList.add('active');
        } else {
          menuItems[i].classList.remove('active');
        }
      } else {
        if (wTop >= sections[i].offsetTop) {
          menuItems[i].classList.add('active');
        } else {
          menuItems[i].classList.remove('active');
        }
      }
    }
  });
});

var titles = document.querySelectorAll('.section-title h2');

for (var i = 0; i < titles.length; i++) {
  titles[i].addEventListener('click', function (event) {
    var parent = event.target.parentElement;
    var desc = parent.querySelector('.descripcion-categoria');
    parent.classList.toggle('active');

    if (parent.classList.contains('active')) {
      desc.style.height = desc.scrollHeight + 'px';
    } else {
      desc.style.height = 0;
    }
  });
}

var infoLinks = document.querySelectorAll('.info-link');

for (var i = 0; i < infoLinks.length; i++) {
  infoLinks[i].addEventListener('click', function (event) {
    var parent = event.target.parentElement;
    var desc = parent.querySelector('.descripcion');

    if (!parent.classList.contains('active')) {
      desc.style.height = desc.scrollHeight + 'px';
      parent.classList.add('active');
    } else {
      desc.style.height = 0;
      parent.classList.remove('active');
    }
  });
}

var creditos = document.getElementById('creditos-link');

creditos.addEventListener('click', function (event) {
  var info = document.getElementById('info');
  info.classList.toggle('active');
});

var close = document.getElementById('close');

close.addEventListener('click', function (event) {
  var info = document.getElementById('info');
  info.classList.remove('active');
});

/*  
  ....:::: FACEBOOK ::::....
*/
var fbShare = document.getElementById('share-fb');

function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], {
    type: 'image/jpeg'
  });
}

// function upload(response) {

// }
// var upload = async response => {
//   let canvas = document.getElementById('canvas');
//   let dataURL = canvas.toDataURL('image/jpeg', 1.0);
//   let blob = dataURItoBlob(dataURL);
//   let formData = new FormData();
//   formData.append('access_token', response.authResponse.accessToken);
//   formData.append('source', blob);

//   let responseFB = await fetch(`https://graph.facebook.com/me/photos`, {
//     body: formData,
//     method: 'post'
//   });
//   responseFB = await responseFB.json();
//   console.log(responseFB);
// };

// fbShare.addEventListener('click', () => {
//   FB.login(
//     response => {
//       //TODO check if user is logged in and authorized publish_actions
//       upload(response);
//     },
//     { scope: 'publish_actions' }
//   );
// });

window.fbAsyncInit = function () {
  FB.init({
    appId: '481310545785663',
    cookie: true,
    xfbml: true,
    version: 'v2.0'
  });

  FB.AppEvents.logPageView();
};

(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');

fbShare.addEventListener('click', function () {
  FB.login(
    function (response) {
      if (response.status === 'connected') {
        FB.api(
          '/me',
          'GET',
          { fields: 'first_name,picture.type(large)' },
          function (res) {
            if (res && !res.error) {
              pintarResultado(res.first_name, res.picture.data.url);
              let dataURL = canvas.toDataURL('image/jpeg', 1.0);
              let blob = dataURItoBlob(dataURL);
              var img = URL.createObjectURL(blob);
              let formData = new FormData();
              formData.append('access_token', response.authResponse.accessToken);
              formData.append('source', blob);
              console.log(img)

              FB.api('/me/photos', 'POST', {
                url: formData
              }, function (r) {
                console.log(r);
              })

              // FB.ui({
              //   method: 'feed',
              //   name: 'Buen Partido',
              //   caption: 'caption text',
              //   description: 'description',
              //   link: 'https://cerosetenta.uniandes.edu.co/',
              //   picture: "https://localhost:3000/imgs/claudia_lopez_pixel.png"

              // })
            }
          }
        );
      } else {
        // The person is not logged into your webpage or we are unable to tell.
      }
    },
    {
      scope: 'public_profile'
    }
  );
});
