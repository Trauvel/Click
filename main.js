let clicks = 0;

const TIMEOUT = 5000;

const display = document.querySelector('#display'),
      button = document.querySelector('#button'),
      counter = document.querySelector('#counter'),
      restart = document.querySelector(".restart_js"),
      raitingList = document.querySelector(".raiting__list_js"),
      cryPhraseBlock = document.querySelector(".cryPhrase_js");
 
let objPhrases = {
        0: "Так не работает!",
        10: "Ужасно!",
        20: "Плохо!",
        30: "Не плохо!",
        40: "Приемлимо!",
        50: "Нормально"
    };

recordTablePull(raitingList);

button.onclick = start;

function start() {
    const startTime = Date.now();
 
    counter.textContent = clicks;

    display.textContent = formatTime(TIMEOUT);
    button.onclick = () => counter.textContent = ++clicks;

    const interval = setInterval(() => {
        const delta  = Date.now() - startTime;
        display.textContent = formatTime(TIMEOUT - delta);
    }, 100);

    const timeout = setTimeout(() => {
        button.onclick = null;

        let cryPhrase = '';
        for (let key in objPhrases) {
            
            if(clicks >= key)
               cryPhrase = objPhrases[key];

        }

        cryPhraseBlock.textContent = cryPhrase;

        let Name = document.querySelector(".input-name-form__input_js");

        document.querySelector(".input-name-form_js").style.display = "block";
        document.querySelector(".input-name-form__submit_js").addEventListener("click", function(){
            if(Name.value){
                localStorage.setItem("recordTable", localStorage.getItem("recordTable")+`^${Name.value}&${clicks}`);
            }else{
                return;
            }

            document.querySelector(".input-name-form_js").style.display = "none";
            recordTablePull(raitingList);
        });
        



        clearInterval(interval)
        clearTimeout(timeout);
    }, TIMEOUT);
};
 

// Уже лишнее, но решили усложнить
function formatTime(ms) {
    return Number.parseFloat(ms / 1000).toFixed(2);
}

function recordTablePull(raitingList){
    let recordTable = localStorage.getItem("recordTable");
    if(recordTable){
        raitingList.innerHTML = "";

        recordTable = recordTable.split("^");
        recordTable.forEach((el, i, arr) => {
            arr[i] = el.split("&");
        });

        let j = 0;
        while (j<3){
            let max = 0, maxI = null;
            recordTable.forEach((el, i) => {
                if(el[1]>max){
                    max = el[1];
                    maxI = i;
                }
            });

            let LeaderName = `${recordTable[maxI][0]} ${recordTable[maxI][1]} очк.`
            recordTable[maxI] = 0;

            console.log(recordTable);
            console.log(max);

            let li = document.createElement('li'),
                span = document.createElement('span');

            span.classList.add("raiting__name");
            span.classList.add("raiting__name_js");
            span.innerText = LeaderName;
            li.append(span);
            raitingList.append(li);

            j++;
        }

    }
}
