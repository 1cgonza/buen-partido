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

window.fbAsyncInit = function () {
  FB.init({
    appId: '481310545785663',
    cookie: true,
    xfbml: true,
    version: 'v4.0'
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
        FB.ui({
          method: 'share',
          href: 'https://1cgonza.github.io/buen-partido/0.html',
        }, function (res) {
          console.log(res)
        });
      } else {
        // The person is not logged into your webpage or we are unable to tell.
      }
    },
    {
      scope: 'public_profile'
    }
  );
});

var download = document.getElementById('download-img');

console.log(saveAs)
download.addEventListener('click', function () {
  console.log('save')
  saveAs("https://1cgonza.github.io/buen-partido/imgs/miBuenPartidoesHOLLMAN-MORRIS.jpg", "image.jpg");
})