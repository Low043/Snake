const game = document.querySelector('main');
const cabeca = document.querySelector('#cabeca');
const fruta = document.querySelector('#fruta');
let cobra = Array.from(document.querySelectorAll('.cobra')).reverse();

function getRandomInt(max=20){
    return Math.floor(Math.random() * max);
}

fruta.style.gridColumn = getRandomInt();
fruta.style.gridRow = getRandomInt();
cobra.forEach((bloco, index) => {
    bloco.style.gridColumn = 10;
    bloco.style.gridRow = 12 - index;
});

let lastKey = '';
let newKey = '';

document.onkeydown = (e) => {
    if(e.key.includes('Arrow')){
        if(e.key.includes('Up') && lastKey.includes('Down')){
            return
        }else if(e.key.includes('Down') && lastKey.includes('Up')){
            return
        }else if(e.key.includes('Right') && lastKey.includes('Left')){
            return
        }else if(e.key.includes('Left') && lastKey.includes('Right')){
            return
        }else{
            newKey = e.key;
        }
    }
}

function run(){

    lastKey = newKey;
    let lastColumn = 1;
    let lastRow = 1;

    if(lastKey != ''){
        cobra.forEach((bloco, index) => {
            if(index == 0){
                lastColumn = bloco.style.gridColumn;
                lastRow = bloco.style.gridRow;
            }
            if(index < cobra.length - 1){
                bloco.style.gridColumn = cobra[index+1].style.gridColumn;
                bloco.style.gridRow = cobra[index+1].style.gridRow;
            }
        });
    }

    if(lastKey == 'ArrowUp'){
        cabeca.style.gridRow = Number(cabeca.style.gridRow) - 1;
    }else if(lastKey == 'ArrowDown'){
        cabeca.style.gridRow = Number(cabeca.style.gridRow) + 1;
    }else if(lastKey == 'ArrowLeft'){
        cabeca.style.gridColumn = Number(cabeca.style.gridColumn) - 1;
    }else if(lastKey == 'ArrowRight'){
        cabeca.style.gridColumn = Number(cabeca.style.gridColumn) + 1;
    }

    if(cabeca.style.gridRow == fruta.style.gridRow && cabeca.style.gridColumn == fruta.style.gridColumn){
        fruta.style.gridColumn = getRandomInt();
        fruta.style.gridRow = getRandomInt();
        const novoBloco = document.createElement('div');
        novoBloco.setAttribute('class','cobra');
        novoBloco.style.gridColumn = lastColumn;
        novoBloco.style.gridRow = lastRow;
        game.appendChild(novoBloco);
        cobra = [novoBloco].concat(cobra);
    }

    setTimeout(() => {
        run()
    },200);
}

run();