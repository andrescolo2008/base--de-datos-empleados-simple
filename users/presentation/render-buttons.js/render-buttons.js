import usersStore from "../../store/users-store";
import { renderTable } from "../render-table";
import './render-buttons.css'

/**
 * 
 * @param {HTMLDivElement} element 
 */

export const renderButtons = (element)=>{

    // aquí se crean los  botones  y luego se les agrega la etiqueta del nombre de cada botón

    const nextButton=document.createElement('button');
    nextButton.innerText='NEXT >'

    const previoustButton=document.createElement('button');
    previoustButton.innerText='< PREVIOUS '

    const currentPageLabel=document.createElement('span');
    currentPageLabel.id='current-page';
    currentPageLabel.innerText=usersStore.getCurrentPage();
    //----------------------------------------------------

    // Aquí se van a añadir al elemento para que se rendericen , es decir renderButtons=(element) =>{..., etc}
    element.append(previoustButton,currentPageLabel,nextButton);
//-------------------------------------------------------------
// funciones de los botones
nextButton.addEventListener('click', async()=>{
    await usersStore.loadNextPage();
    currentPageLabel.innerText=usersStore.getCurrentPage();
    renderTable(element);// aquí es necesario que se vuelva a renderizar la tabla, de lo contrario no se van a visualizar los datos de la pagina siguiente
   
   
});

previoustButton.addEventListener('click', async()=>{
    await usersStore.loadPreviusPage();
    currentPageLabel.innerText=usersStore.getCurrentPage();
    renderTable(element);// aquí es necesario que se vuelva a renderizar la tabla, de lo contrario no se van a visualizar los datos de la pagina siguiente

    
});


    
}