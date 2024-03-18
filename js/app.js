/**
 * ===================== PRINCIPAIS OBJETOS  =================================
 */

let addNote = document.querySelector('#add-note');//Botão de para adicionar nota
let btncloseModalView =  document.querySelector('#btn-close-modal'); //fechar janela modal com os detalhes da nota.
let modal = document.querySelector('#modal'); //Modal para edição das notas
let modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
let notes = document.querySelector('#notes');//Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
//let btnCloseNote = document.querySelector("#btn-close-modal");//icone para fechar modal de edição de nota.

/*===================== Função e Eventos  ===========================*/

addNote.addEventListener("click", (evt) =>{
    evt.preventDefault();
    modal.style.display = "block";
    addNote.style.display = "none";
    notes.style.display = "none";
});
btncloseModalView.addEventListener("click", (evt) =>{
    evt.preventDefault();
    modal.style.display = "none";
    addNote.style.display = "block";
    notes.style.display = "flex";
});
btnSaveNote.addEventListener("click", (evt) =>{
    evt.preventDefault();
    data = {
        id: document.querySelector("#input-id").value,
        title: document.querySelector("#input-title").value ,
        content: document.querySelector("#input-content").value
    }

    saveNote(data);
});

/*===================== Funções  ===========================*/

const saveNote = (note) => {
    console.log(note);
    let notes=loadNotes();

    if(note.id.trim().length < 1){ //Trim, usa-se quando é preciso remover espaços, "sujeiras"
        note.id = new Date().getTime;
    }
    
    else{
        //??
    }

    note.lastTime = new Date().getTime();


    notes.push(note);

    notes = JSON.stringify(notes);

    localStorage.setItem('notes', notes);

};

const loadNotes = () =>{
    let notes = localStorage.getItem("notes");
    if(!notes){
        notes = [];//Representação do array
    }
    else{
        notes = JSON.parse(notes);
    }
    return notes;

}

const listNotes = () => {
    let listnotes = loadNotes();
    console.log(listnotes);
    listnotes.forEach((note) => {
        let divCard = document.createElement('div');
        divCard.className = 'card';
        divCard.style.width = '25rem';
        let divCardBody = document.createElement('div');
        divCardBody.classname = 'card-body';
        divCard.appendChild(divCardBody);
        let h5 = document.createElement('h5');
        h5.innerText = note.title;
        divCardBody.appendChild(h5);
        let pContent = document.createElement('p');
        pContent.innerText = note.content;
        divCardBody.appendChild(pContent);
        let pLastTime = document.createElement('p');
        let time = new Date(note.lastTime);//Converte a data 
        time = time.toLocaleDateString("pt-BR")
        console.log(time);
        pLastTime.innerText = "Atualizado em: "+time;
        divCardBody.appendChild(pLastTime)


        notes.appendChild(divCard);
    });
}

listNotes();