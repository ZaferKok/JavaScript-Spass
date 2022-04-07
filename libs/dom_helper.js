"use strict";

// Array.from automatisch auf NodeList anwenden
NodeList.prototype.__proto__ = Array.prototype;
HTMLCollection.prototype.__proto__ = Array.prototype;

// ersetzen von setAttribute und getAttribute durch attr
Element.prototype.attr = function (attr, val) {
    if (typeof val !== "undefined") {
        this.setAttribute(attr, val);
        return this;
    } else {
        return this.getAttribute(attr);
    }
};

// POLYFILLS

// Polyfill für remove() - für IE bis incl. IE11
if (!("remove" in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
// Polyfill, um indexOf() für alte IEs zugänglich zu machen
if (!("indexOf" in Array.prototype)) {
    Array.prototype.indexOf = function (item) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === item) {
                return i;
            }
        }
        return -1;
    };
}


// Fähigkeitenweiche für XHR
var createFunctions = [
    function () { return new XMLHttpRequest(); },
    function () { return new ActiveXObject("Msxml2.XMLHTTP"); },
    function () { return new ActiveXObject("Msxml3.XMLHTTP"); },
    function () { return new ActiveXObject("Microsoft.XMLHTTP"); }
];

function createXHR() {
    var test, xmlHTTP = null;

    for (var i = 0; i < createFunctions.length; i++) {
        try {
            test = createFunctions[i];
            // test =  function() { return new XMLHttpRequest()};
            xmlHTTP = test();
        } catch (e) {
            continue;
        }
        break;
    }
    return xmlHTTP;
}


// HILFSFUNKTIONEN

// COOKIES
// Cookies setzen
function createCookie(name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
}
// Cookies auslesen
function readCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
// Cookies löschen
function deleteCookie(name) {
    createCookie(name, '', -1);
}


// Zufallszahlen erzeugen
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Elemente dynamisch erzeugen
function createTags(parent, elem, content = "") {
    let container = document.querySelector(parent);
    let newElem = document.createElement(elem);
    newElem.innerHTML = content;
    container.appendChild(newElem);
}

// Elemente dynamisch erzeugen - aus Object
function createTagsFromObject(elem) {
    if (typeof elem === "object" && Object.keys(elem).length != 0) {
        let container = document.querySelector(elem.parentTag);
        let newElem = document.createElement(elem.tagName);
        newElem.className = elem.classNames;

        if (elem.attributes && typeof elem.attributes === "object") {
            for (let key in elem.attributes) {
                newElem.setAttribute(key, elem.attributes[key]);
            }
        }
        if (elem.content) {
            newElem.innerHTML = elem.content;
        }
        if(elem.event) {
            newElem.addEventListener(elem.event, elem.eventFunction);
        }

        if(elem.referenceElement) {
            let reference = container.querySelector(elem.referenceElement);
            // reference.before(newElem);
            container.insertBefore(newElem, reference);
        } else {
            container.appendChild(newElem);
        }
        
    }
}

/*
let elemObject = {
    parentTag:  "article",
    tagName:    "progress",
    classNames: "class1 class2 class3",
    attributes: {max: 10, value: 4},
    referenceElement:    "element",
    content:    "",
    event:      "mouseover",
    eventFunction:      function() {
        console.log("Das kitzelt...");
    }
};
createTagsFromObject(elemObject);
*/


// Elemente bei Click löschen

function removeElement(e) {
    var elem = e.target;
    var body = document.querySelector("body");
    if (elem != body && elem.querySelectorAll("body").length === 0) {
        var parent = elem.parentNode;
        parent.removeChild(elem);
        // elem.remove();
        return false;
    }
}

// Helper von Chris Ferdinandi, MIT License, https://gomakethings.com

var isInViewport = function (elem) {
    var distance = elem.getBoundingClientRect();
    return (
        distance.top >= 0 &&
        distance.left >= 0 &&
        distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        distance.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
