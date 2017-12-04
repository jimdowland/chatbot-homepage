import { ApiAiClient } from "api-ai-javascript";
import './style.css';

const client = new ApiAiClient({ accessToken: '' });
const button = document.querySelector("button");
const textarea = document.querySelector("textarea");
const ul = document.querySelector("ul");
const speechButton = document.querySelector("#microphone_icon");
const SpeechRecognition = window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();


button.addEventListener("click", function () {
  getTalk();
});

speechButton.addEventListener("click", function () {
  recognition.start();
});

recognition.addEventListener('speechstart', () => {
  console.log('Speech has been detected.');
});

recognition.addEventListener('result', (e) => {
  console.log('Result has been detected.');

  let last = e.results.length - 1;
  let text = e.results[last][0].transcript;

  textarea.value = text;
  button.click();
  console.log('Confidence: ' + e.results[0][0].confidence);
});

recognition.addEventListener('speechend', () => {
  recognition.stop();
});

recognition.addEventListener('error', (e) => {
  outputBot.textContent = 'Error: ' + e.error;
});

textarea.addEventListener("focus", (event) => { console.log(event); textarea.value = ""; })

function getTalk() {

  const promise = client.textRequest(textarea.value);
  outputChat(textarea.value, "bot");
  textarea.value = "";

  promise
    .then((mymessage) => { outputChat(mymessage.result.fulfillment.speech, "user") })
    .catch((mymessage) => (console.log(mymessage.id)));
}

function outputChat(theChat, theClass) {
  let theDate = new Date;
  let icon = theClass == 'bot' ? '<i class="fa fa-user-o" aria-hidden="true"></i>' : '<i class="fa fa-heart-o" aria-hidden="true"></i>'
  let li = document.createElement("li");
  li.innerHTML = icon + ' ' + theDate.getHours() + ':' + theDate.getMinutes() + ':' + theDate.getSeconds() + '</span> ' + theChat;
  //li.appendChild(document.createTextNode(theChat));
  li.className += theClass;
  ul.insertBefore(li, ul.childNodes[0]);
  setTimeout(() => { li.className += " finalstate" }, 100);
}