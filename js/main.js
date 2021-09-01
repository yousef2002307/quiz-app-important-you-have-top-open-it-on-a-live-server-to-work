///selecting

let quiz = document.querySelector(".quiz");
let quizarea = document.querySelector(".quiz-area");
let quizarena = document.querySelector(".quiz-arena");
let quizquestions = document.querySelector(".quiz-questions");
let quizanswers = document.querySelector(".quiz-answers");
let spans = document.querySelector(".spans");
let inputs = document.querySelector(".inputs");
/////////creating currentondex
let currentindex = 0;
let rightanswer = 0;
/////make api request
function apirequest(){
    let x = new XMLHttpRequest();
    x.onreadystatechange = function(){
        if(this.status == 200 && this.readyState == 4){
            let data = JSON.parse(this.responseText);
          
         qcount(data.length);
         createquestion(data,currentindex);
         createanswers(data.length,data[currentindex]);
         creatingspans(data.length,currentindex);
         document.querySelector("button").onclick = function(){
            rightanswers(currentindex,data,data.length);
            currentindex++;
            document.querySelector("h2").innerHTML = '';
            inputs.innerHTML = '';
            spans.innerHTML = '';
            showresult(data.length,currentindex);
        
          
            createquestion(data,currentindex);
            createanswers(data.length,data[currentindex]);
            creatingspans(data.length,currentindex);
        }
        }
        
    }
    x.open("GET","jo.json");
    x.send();
} 
apirequest();
////question count
function qcount(count){
document.querySelector(".quiz-area p .q").textContent = count;
}
////create answers
function createanswers(length,data){
if(length > currentindex){
    
    for(i =1; i <= 4;i++){
        let div = document.createElement("div");
        div.classList.add('input');
        let inputradio = document.createElement("input");
        inputradio.type = 'radio';
        inputradio.name = 'x';
        inputradio.id = `x${i}`;
        if(i == 1){
            inputradio.checked = true;
        }
        let label = document.createElement("label");
        label.htmlFor = `#x${i}`;
      let labeltext = document.createTextNode(data[`answer_${i}`]);
      label.appendChild(labeltext);
        div.appendChild(inputradio);
        div.appendChild(label);
       inputs.appendChild(div);

    }
}
}

////////creatingspans
function creatingspans(spanscount,currentindex){
    if(spanscount > currentindex){
       for(let i =0; i < 9;i++){
           let span = document.createElement("span");
           spans.appendChild(span);
          if(i == currentindex){
              span.classList.add("active");

          }else{
            span.classList.remove("active");
          }
       }
    }
}
//createquestion
function createquestion(data,currentindex){
    if(data.length > currentindex){
  
    document.querySelector(".quiz-questions h2").textContent = data[currentindex].title;
    }
}
///////right answers

function rightanswers(urrentindex,data,length){
    
    let radio = document.getElementsByName("x");
    let radioarray = Array.from(radio);
    let thecorrectradio = radioarray.filter(item => item.checked);
    let checkedanswerid = thecorrectradio[0].id;
    let checkedanswer = document.getElementById(checkedanswerid).nextElementSibling.textContent;
    
    if(data[currentindex]['right_answer'] == checkedanswer){
        rightanswer++;
        
    }
 
 
}
///show result 
function showresult(length,currentindex){
if(length == currentindex){
    quizquestions.remove();
    quizanswers.remove();
    spans.remove();
    if(rightanswer == 9){
        document.querySelector(".results").textContent = "excellent";
    }else if(rightanswer > 5 && rightanswer < 9){
        document.querySelector(".results").textContent = "good";
    }else{
        document.querySelector(".results").textContent = "bad"
    }
}
}