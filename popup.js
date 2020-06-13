// check it's url first.
// if it's url is "boj/submit/"
// then load something!

// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.modal');
//     var instances = M.Modal.init(elems);
// });



function hideLayer(){
    const layer = document.querySelector(".layer");
    layer.style.display = 'none'
}

function goto(){

    // chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
    //     chrome.tabs.executeScript(tabs[0].id, {}, ()=>{
    //         window.location.href = "https://www.acmicpc.net/"
    //     })
    // })
    window.open("https://www.acmicpc.net/");
}


function gotoNextPage(){
    window.scrollTo({
        left: 600,
        behavior: 'smooth'
      });
}

function back(){

    window.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
}

function load(){

    document.querySelector("#hide-layer").onclick = function() {
        hideLayer();
    }

    document.querySelector("#goto").onclick = function() {
        goto();
    }

    document.querySelector("#go-next").onclick = function() {
        gotoNextPage();
    }
    document.querySelector("#go-back").onclick = function() {
        back();
    }

    document.querySelector(".sub-menu-container .chip-container").addEventListener('click',
        (event) => {
            const {target: { tagName, innerText }} = event;
            if (tagName === "SPAN") {
                window.open('http://boj.kr/' + innerText)
            }
        }
    )


    let cppheaders = [];

    chrome.storage.local.get(['cppheaders'], function(result) {
        cppheaders = result.cppheaders ? result.cppheaders : cppheaders;
        const nodelist = document.querySelectorAll(".main-menu-container .card .chip-container span")
        
        for (let node of nodelist) {
            if (cppheaders.includes(node.innerText)) {
                node.classList.add('active');
            }
        }
    });  

    document.querySelector("#cpp-header-save-button").onclick = function(){


        cppheaders = [];
        const nodelist = document.querySelectorAll(".main-menu-container .card .chip-container span");
        for (let node of nodelist) {
            if (node.classList.contains("active")) {
                cppheaders.push(node.innerText)
            }
        }

        
        cppheaders = cppheaders.filter((item, index) => cppheaders.indexOf(item) === index)
        chrome.storage.local.set({"cppheaders": cppheaders}, function() {
            document.querySelector("#cpp-header-save-button").classList.add("success")
            document.querySelector("#cpp-header-save-button").innerText = "저장완료!"
            setTimeout( function () { 
                document.querySelector("#cpp-header-save-button").classList.remove("success")
                document.querySelector("#cpp-header-save-button").innerText = "저장하기"
            }, 1000);
        });
                 
    }

    document.querySelector(".main-menu-container .card .chip-container").addEventListener('click',
        (event) => {
            const {target: { tagName, innerText }} = event;
            if (tagName === "SPAN") {
                if (event.target.classList.contains("active")) {
                    event.target.classList.remove("active");
                } else {
                    event.target.classList.add("active");
                }
            }
        }
    )
    
    chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {

        const url = new URL(tabs[0].url);
        if (url.hostname === "www.acmicpc.net"){
            const layer = document.querySelector(".layer");
            layer.style.display = 'none'
        } else {
            
        }

        

        // if (tabs[0].url.includes("https://www.acmicpc.net/")){
        //     let urls = tabs[0].url.split('/');
        //     await parser("https://www.boj.kr/"+urls[4]);
        //     // await parser("https://www.acmicpc.net/problem/1172");
        // }
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
