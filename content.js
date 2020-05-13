
document.querySelector('legend').innerHTML = document.querySelector('legend').innerText + `
<a id="myBtn">문제보기</a>
<!-- The Modal -->
<div id="myModal" class="modal">
  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <div id="title"></div>
    <hr>
    <div id="result"></div>
    <div id="subtitle">입력</div>
    <hr>
    <div id="input"></div>
    <br>
    <div id="subtitle">출력</div>
    <hr>
    <div id="output"></div>
    <div id="subtitle">입력예시</div>
    <hr>
    <div id="tt"></div>
  </div>
</div>
`



var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


async function load(parser){
    let urls = location.href.split('/');
    await parser("https://www.boj.kr/"+urls[4]);
}


/** parse & view update */
async function parser(url){
    const response = await fetch("https://www.acmicpc.net/problem/11727");
    const result = await response.text();

    var parser = new DOMParser();
    var doc = parser.parseFromString(result, "text/html");

    doc.querySelectorAll('img').forEach((value) => {
        value.src = "https://www.acmicpc.net/upload/"+ value.src.split('/upload/')[1];
    })

    var text = doc.querySelector('#problem_description').innerHTML
    var title = doc.querySelector('#problem_title').innerText
    var input = doc.querySelector('#problem_input').innerText
    var output = doc.querySelector('#problem_output').innerText
    var ts = doc.querySelectorAll('.sampledata');
    

    let index = 0;
    let tvalue = "";
    ts.forEach((value)=>{
        if (index % 2 == 0) {
            tvalue += "입력예시" + (index+1).toString() + "\n";
            tvalue += value.innerText;
        } else {
            tvalue += "출력예시" + (index).toString() + "\n"
            tvalue += value.innerText;
        }
        index = index + 1;
    });

    document.querySelector('#title').innerText = title
    document.querySelector('#result').innerHTML = text
    document.querySelector('#input').innerText = input
    document.querySelector('#output').innerText = output
    document.querySelector('#tt').innerText = tvalue

}

load(parser);