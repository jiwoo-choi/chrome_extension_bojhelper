// check it's url first.
// if it's url is "boj/submit/"
// then load something!

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});


/** when loaded */
function load(parser){

    chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
        if (tabs[0].url.includes("https://www.acmicpc.net/submit")){
            let urls = tabs[0].url.split('/');
            await parser("https://www.boj.kr/"+urls[4]);
            // await parser("https://www.acmicpc.net/problem/1172");
        }
    })

    return false;
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
            tvalue += "입력예시" + (index+1).toString() + "\n";
            tvalue += value.innerText;
        } else {
            tvalue += "\n 출력예시" + (index).toString() + "\n"
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
