import { ApiAiClient } from "api-ai-javascript";
import './style.css';

const client = new ApiAiClient({ accessToken: '805cab0b4a9d4df9b02dc7d0b8b5340c' });
var button = document.querySelector("button");
var textarea = document.querySelector("textarea");
var ul = document.querySelector("ul");


button.addEventListener("click", function () {
  getTalk();
});

function getTalk() {
  const promise = client.textRequest(textarea.value);
  outputChat(textarea.value,"bot");
  
  promise
    .then((mymessage) => (outputChat(mymessage.result.fulfillment.speech,"user")))
    .catch((mymessage) => (console.log(mymessage.id)));
}

function outputChat(theChat, theClass){
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(theChat));
  li.className += theClass;
  ul.insertBefore(li,ul.childNodes[0]);
}


