(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

function prepareSendMail(e) {
  e.preventDefault();
  var data = {
    name: formMail.name.value,
    email: formMail.email.value,
    text: formMail.text.value
  };

  var resultContainer = formMail.querySelector('.status');
  resultContainer.innerHTML = 'Отправка...';

  sendJson('/', data, 'POST', function (data) {
    formMail.reset();
    resultContainer.classList.remove('badge-danger');
    if (data.status == 'Error') {
      resultContainer.classList.add('badge-danger');
    }
    resultContainer.innerHTML = data.msg;
  });
}

function sendJson(url, data, method, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function (e) {
    var result = void 0;
    try {
      result = JSON.parse(xhr.responseText);
    } catch (e) {
      cb({ msg: 'Извините в данных ошибка', status: 'Error' });
    }
    cb(result);
  };
  xhr.send(JSON.stringify(data));
}

var formMail = document.querySelector('#mail');
formMail.addEventListener('submit', prepareSendMail);

},{}]},{},[1])

//# sourceMappingURL=maps/app.js.map
