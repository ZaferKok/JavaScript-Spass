"use strict";

const bilder = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
let users; // to read JSON file and load in

let register = document.querySelector("#register-menu");
let login = document.querySelector("#login-menu");
let about = document.querySelector("#about-menu");
let contact = document.querySelector("#contact-menu");
let main = document.querySelector("#logo");

let container = document.querySelector("#container"); // container for pages
let container2 = $("#container2"); // container for comics
let container3 = $("#container3"); // container for game
let container4 = $("#container4"); // container for test

function showMain() { /////////////// MAIN-INDEX HTML //////////////
    container.style.display = "";
    container2.removeAttr('style');
    container2.empty();
    container3.removeAttr('style');
    container3.empty();

    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status != 200) {
            container.textContent = "OOOps";
            return;
        }
        let data = xhr.responseXML.querySelector("#rubiq");
        container.innerHTML = data.innerHTML;
        document.querySelector("#rubiq").style.display = "";
        document.querySelector(".navbar").style.display = "";
        document.querySelector("h1").innerHTML = "WELCOME TO ENTERTAINMENT";
        container.onsubmit = function () {

            return false;
        };
    };
    xhr.open("GET", "index.html");
    xhr.responseType = "document";
    xhr.send();
}////////////////////////////////////////////////////////////////

function showLogin() { /////////////// LOGIN HTML ///////////////
    container.style.display = "";
    container2.removeAttr('style');
    container2.empty();
    container3.removeAttr('style');
    container3.empty();

    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status != 200) {
            container.textContent = "OOOps";
            return;
        }
        let data = xhr.responseXML.querySelector(".login-enter");
        container.innerHTML = data.innerHTML;
        document.querySelector("#rubiq").style.display = "none";
        document.querySelector("h1").innerHTML = "USER LOGIN";
        beforeLogin(); // To hide the fun elements
        autoLogin();
        let testYourself = document.querySelector("#test");
        container.onsubmit = function () {

            queryLogin();

            return false;
        };
    };
    xhr.open("GET", "login.html");
    xhr.responseType = "document";
    xhr.send();
}////////////////////////////////////////////////////////////////

function showRegister() { ///////////// REGISTER HTML ///////////
    container.style.display = "";
    container2.removeAttr('style');
    container2.empty();
    container3.removeAttr('style');
    container3.empty();

    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status != 200) {
            container.textContent = "OOOps";
            return;
        }
        let data = xhr.responseXML.querySelector(".register");
        container.innerHTML = data.innerHTML;
        document.querySelector("#rubiq").style.display = "none";
        document.querySelector("h1").innerHTML = "NEW USER REGISTRATION";

        container.onsubmit = function () {
            return false;
        };
    };
    xhr.open("GET", "register.html");
    xhr.responseType = "document";
    xhr.send();
}////////////////////////////////////////////////////////////////

function showAbout() { /////////////// ABOUT HTML ///////////////
    container.style.display = "";
    container2.removeAttr('style');
    container2.empty();
    container3.removeAttr('style');
    container3.empty();

    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status != 200) {
            container.textContent = "OOOps";
            return;
        }
        let data = xhr.responseXML.querySelector(".about");
        container.innerHTML = data.innerHTML;
        document.querySelector("#rubiq").style.display = "none";
        document.querySelector("h1").innerHTML = "ABOUT US";
        container.onsubmit = function () {

            return false;
        };
    };
    xhr.open("GET", "about.html");
    xhr.responseType = "document";
    xhr.send();
}////////////////////////////////////////////////////////////////

function showContact() { //////////// CONTACT HTML //////////////
    container.style.display = "";
    container2.removeAttr('style');
    container2.empty();
    container3.removeAttr('style');
    container3.empty();

    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status != 200) {
            container.textContent = "OOOps";
            return;
        }
        let data = xhr.responseXML.querySelector(".contact");
        container.innerHTML = data.innerHTML;
        document.querySelector("#rubiq").style.display = "none";
        document.querySelector("h1").innerHTML = "CONTACT";
        container.onsubmit = function () {

            return false;
        };
    };
    xhr.open("GET", "contact.html");
    xhr.responseType = "document";
    xhr.send();
} //////////////////////////////////////////////////////////////

main.addEventListener("click", function () {
    showMain();
});
login.addEventListener("click", function () {
    showLogin();
    $("#login").click();
});
register.addEventListener("click", function () {
    showRegister();
});
about.addEventListener("click", function () {
    showAbout();
});
contact.addEventListener("click", function () {
    showContact();
});

function beforeLogin() {
    document.querySelector("#second-head").style.display = "none";
    document.querySelector("#test").style.display = "none";
    document.querySelector("#comics").style.display = "none";
    document.querySelector("#game").style.display = "none";
}

function queryLogin() {
    let request = new XMLHttpRequest();
    request.onload = function () {
        if (request.status === 200) {
            if (request.responseType === "json") {
                users = request.response;
            } else {
                users = JSON.parse(request.responseText);
            }
        }
        loginSuccess();
    }
    request.open('GET', 'userlist.json');
    request.responseType = 'json';
    request.send();
}

function loginSuccess() {
    let usernameInput = document.querySelector('input[name="username"]').value;
    let passwordInput = document.querySelector('input[name="password"]').value;

    for (let i = 0; i < users.records.length; i++) {
        let user = users.records[i];
        if (user.username == usernameInput && user.password == passwordInput) {

            document.querySelector(".main-container").style.display = "none";
            document.querySelector("h1").innerHTML = "Wellcome " + users.records[i].username + " to great fun!";

            document.querySelector("#second-head").style.display = "";
            document.querySelector("#test").style.display = "";
            document.querySelector("#comics").style.display = "";
            document.querySelector("#game").style.display = "";

            //////////////// STORAGE //////////////////////
            localStorage.setItem("username", usernameInput);
            localStorage.setItem("password", passwordInput);

            $("#comics").on("click", comicShow);
            $("#game").on("click", gamePlay);
           // $("#test").on("click", askQuestion);
        }
    }
}

function autoLogin() {/////// STAY LOGGED IN WITH STORAGE ///////

    let username = localStorage.getItem("username");
    let password = localStorage.getItem("password");

    if (Storage && username && password) {
        $('#username').replaceWith("<input required class='login-group' type='text' name='username' id='username' placeholder='USERNAME' value='" + username + "' />");

        $('#password').replaceWith("<input required class='login-group' type='password' placeholder='PASSWORD' id='password' name='password' value='" + password + "' />");
    }
};
////////////////////////////////////////////////////////////////////

function comicShow() { //////// UNDER LOGIN PAGE - COMICS //////////

    container.style.display = "none";
    $("h1").html("<< COMICS >>");
    $(".fun-list").display = "none";
    $("h1").display = "none";
    $(".main-container").display = "none";

    for (let i = 0; i < bilder.length; i++) {
        $("#container2").append('<div id="pic"><img src="./img/' + bilder[i] + '"></div>');
    }

    $("#container2 > div:gt(0)").hide();
    $("#container2").prepend('<a class="prev"><</a>');
    $("#container2").prepend('<a class="next">></a>');

    $("#container2 .prev").on("click", function () {
        $("#container2 > div")
            .first()
            .fadeOut(3000)
            .end()
            .last()
            .fadeIn(3000)
            .prependTo('#container2');
    });

    $("#container2 .next").on("click", function () {
        $("#container2 > div")
            .first()
            .fadeOut(3000)
            .next()
            .fadeIn(3000)
            .prev()
            .appendTo("#container2");
    });

    $("#container2").css({
        margin: "30px auto 0",
        position: "relative",
        textAlign: "center",
        marginTop: "0%",
        width: "800px",
        height: "500px",
        padding: "10px 10px 0",
    });

    $("#container2 > div").css({
        position: "absolute",
        top: "10px",
        left: "10px",
        bottom: 0,
        right: "10px"
    });

    $(".next, .prev").css({
        background: "rgba(180,180,180,.35)",
        position: "absolute",
        "z-index": 999,
        padding: "50px 20px",
        borderRadius: "50%",
        top: "28%",
        fontSize: "2.25rem",
        cursor: "pointer"
    });

    $(".next").css("right", "-60px");
    $(".prev").css("left", "-60px");
}
///////////////////////////////////////////////////////////////////

function gamePlay() { /////// UNDER LOGIN PAGE - PLAY GAME ////////

    container.style.display = "none";
    $("h1").html("<< GAME TIME >>");
    $(".fun-list").display = "none";
    $("h1").display = "none";
    $(".main-container").display = "none";

    for (let i = 0; i < 4; i++) {
        $("#container3").append('<div class="card"></div>');
        console.log(document.querySelector(".card"));
    }

    let colors = ['red', 'yellow', 'green', 'blue', 'black']
    let cards = [[0, 3], [1, 0], [2, 3], [3, 0]]
    let openCards = []
    let openCard
    let shouldWait = false

    let deck = document.querySelectorAll('.card')

    for (let i = 0; i < deck.length; i++) {
        deck[i].addEventListener("click", function () {
            if (!shouldWait) {
                deck[i].style.backgroundColor = colors[cards[i][1]]
                if (openCard) {
                    if (cards[i][1] == openCard[1]) {
                        openCard = null
                        if (openCards.push(cards[i], openCard) == deck.length)
                            alert("Sie haben gewonnen!")
                    }
                    else {
                        openCard = null
                        shouldWait = true
                        setTimeout(updateCards, 2000)
                    }
                }
                else {
                    openCard = cards[i]
                }
            }
        });
    }

    function updateCards() {
        for (let i = 0; i < deck.length; i++) {
            if (openCards.filter(function (x) { x[0] == i }).length == 0) {
                deck[i].style.backgroundColor = 'black'
            }
        }
        openCard = null
        shouldWait = false
    }

    $("#container3").css({
        margin: "0 auto 0",
        position: "relative",
        textAlign: "center",
        marginTop: "5%",
        width: "680px",
        height: "180px",
        padding: "10px 10px 0",
        border: "2px solid black"
    });
}