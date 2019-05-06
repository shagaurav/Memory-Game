document.addEventListener("DOM-ContentLoaded", playMemory(), false);

function playMemory () {

function createBoard () {
    var matchBoard = document.getElementById("board");
    var header = document.createElement("h1");
    var footer = document.createElement("footer");
    var matchTable = document.createElement("table");
    var message = document.createElement("div");
    var olay = document.createElement("div");
    var timer = document.createElement("div");
    var choice = [];


    var row, cell, defaultImg;
    for(var i = 0; i < 6; i++) {
        row = document.createElement("tr");
        matchTable.appendChild(row);
        for(var j = 0; j < 6; j++) {
            cell = document.createElement("td");
            row.appendChild(cell);
            defaultImg = document.createElement("img");
            defaultImg.setAttribute("src", "main.jpg");
            cell.appendChild(defaultImg);
        }
    }
    timer.appendChild(document.createTextNode("00:00"));
    header.appendChild(document.createTextNode("Pick-A-Hero"));
    footer.appendChild(document.createTextNode(""));
    matchBoard.appendChild(header);
    matchBoard.appendChild(matchTable);
    matchBoard.appendChild(timer);
    matchBoard.appendChild(message);
    matchBoard.appendChild(footer);

}
var usedHeroes  =  [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,
                    0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];

function cellClick(cell) {
    if(cell.style.backgroundImage === "url(main.jpg)"){
        for(var i =0; i< document.getElementsByTagName('td').length;i++){
            var random = Math.floor(Math.Random() * 36);
            cell[i].style.backgroundImage = "url(hero" + usedHeroes[random] + ".jpg";
        }
    }
}

document.addEventListener("click", function() {
   for(var i = 0; i < document.getElementsByTagName('td').length; i++) {
       cellClick(this);
   }
});


createBoard();


}
