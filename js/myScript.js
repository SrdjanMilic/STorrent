var testElement = document.createElement("p");
var node = document.createTextNode("This is newly added <p></p> Element. JavaScript is Working!!");
testElement.appendChild(node);

var element = document.getElementById("results");
element.appendChild(testElement);