var counters = {};
var usuario = [];
var og = {};
var ganador = [
  {
    nombre: 'HOLLMAN',
    completo: 'HOLLMAN MORRIS',
    src:
      'https://1cgonza.github.io/buen-partido/imgs/miBuenPartidoesHOLLMAN-MORRIS.jpg',
    url: 'https://1cgonza.github.io/buen-partido/0.html'
  },
  {
    nombre: 'CARLOS',
    completo: 'CARLOS GALÁN',
    src:
      'https://1cgonza.github.io/buen-partido/imgs/miBuenPartidoes-CARLOS-GALAN.jpg',
    url: 'https://1cgonza.github.io/buen-partido/1.html'
  },
  {
    nombre: 'CLAUDIA',
    completo: 'CLAUDIA LÓPEZ',
    src:
      'https://1cgonza.github.io/buen-partido/imgs/miBuenPartidoes-CLAUDIA-LOPEZ.jpg',
    url: 'https://1cgonza.github.io/buen-partido/2.html'
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
  // PREGUNTA 4
  {
    categoria: 'sexo',
    pregunta: 'Renuncia acoso sexual',
    respuestas: ['no', 'siif', 'si']
  },
  // PREGUNTA 6
  {
    categoria: 'sexo',
    pregunta: 'Servicios amigables IVE',
    respuestas: ['si', 'siif', 'no']
  },
  // ....:::: CATEGORIA CIUDAD ::::....
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
  // PREGUNTA 23
  {
    categoria: 'personal',
    pregunta: 'tres colombianos',
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

  scrollTo(0, 500);

  var resultado = indexOfMax(suma.total);

  if (resultado.empate.length) {
    console.log('empate');
  }

  ganadorI = resultado.ganador;
  og = ganador[ganadorI];

  var img = new Image();
  img.onload = function(event) {
    var canvas = document.getElementById('canvas');
    canvas.appendChild(event.target);
  };
  img.src = og.src;

  /*  
  ....:::: FACEBOOK ::::....
*/
  window.fbAsyncInit = function() {
    FB.init({
      appId: '481310545785663',
      cookie: true,
      xfbml: true,
      version: 'v4.0'
    });

    FB.AppEvents.logPageView();
  };

  (function(d, s, id) {
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

  var fbShare = document.getElementById('share-fb');

  fbShare.addEventListener('click', function() {
    FB.login(
      function(response) {
        if (response.status === 'connected') {
          FB.ui(
            {
              method: 'share',
              href: og.url
            },
            function(res) {
              console.log(res);
            }
          );
        }
      },
      {
        scope: 'public_profile'
      }
    );
  });

  /*
    ....:::: TWITTER ::::....
  */

  window.twttr = (function(d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://platform.twitter.com/widgets.js';
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
      t._e.push(f);
    };

    return t;
  })(document, 'script', 'twitter-wjs');

  twttr.ready(function(twttr) {
    twttr.widgets.createShareButton(
      og.url,
      document.getElementById('share-twitter'),
      {
        text: 'Mi BuenPartido es ' + og.completo,
        hashtags: 'BusetaElectoral,BuenPartido'
      }
    );
  });
}

// obtenemos todas las preguntas
var preguntas = document.querySelectorAll('.pregunta');

// Pasamos por cada una en un loop
for (var i = 0; i < preguntas.length; i++) {
  preguntas[i].id = 'pregunta' + (i + 1);

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
      onEnd: function(event) {
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

  form.addEventListener('change', function(event) {
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
      respuestasU = respuestasU.filter(function(ele) {
        return !!ele;
      });
    }

    if (checked) {
      respuestasU.push(resU);
    } else {
      respuestasU = respuestasU.filter(function(ele) {
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
    // obtenerResultados();
  });
}

// ------------- //
function scrollTo(to, duration) {
  var element = document.scrollingElement || document.documentElement;
  var start = element.scrollTop;
  var change = to - start;
  var startDate = +new Date();

  var easeInOutQuad = function(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  var animateScroll = function() {
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

  mItem.addEventListener('click', function(event) {
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

window.addEventListener('scroll', function() {
  debounce(250).then(function() {
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
  titles[i].addEventListener('click', function(event) {
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
  infoLinks[i].addEventListener('click', function(event) {
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

creditos.addEventListener('click', function(event) {
  var info = document.getElementById('info');
  info.classList.toggle('active');
});

var close = document.getElementById('close');

close.addEventListener('click', function(event) {
  var info = document.getElementById('info');
  info.classList.remove('active');
});
