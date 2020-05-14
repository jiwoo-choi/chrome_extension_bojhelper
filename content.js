
document.querySelector('legend').innerHTML = document.querySelector('legend').innerText + `
<a id="myBtn">문제보기</a>
<!-- The Modal -->
<div id="myModal" class="modal">
  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <div id="title"></div>
    <div id="border"></div>
    <div id="border1">
    <div id="result"></div>
    </div>
    <br>
    <div id="subtitle">입력</div>
    <div id="border"></div>
    <div id="border1">
    <div id="input"></div>
    </div>
    <br>
    <div id="subtitle">출력</div>
    <div id="border"></div>
    <div id="border1">
    <div id="output"></div>
    </div>
    <br>
    <div id="subtitle">입력예시</div>
    <div id="border"></div>
    <div id="border1">
    <div id="tt"></div>
    </div>
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
    await parser("https://www.acmicpc.net/problem/"+urls[4]);
}


/** parse & view update */
async function parser(url){
    const response = await fetch(url);
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
            tvalue += "입력예시" + (index+1).toString() + " \n";
            tvalue += value.innerText;
        } else {
            tvalue += "\n 출력예시" + (index).toString() + " \n"
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