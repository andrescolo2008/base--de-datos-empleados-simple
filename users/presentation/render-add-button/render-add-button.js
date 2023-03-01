import { showModal } from '../render-modal/render-modal';
import './render-add-button.css'

/**
 * 
 * @param {HTMLDivElement} element 
 */

export   const renderAddButton = (element)=>{
   const fabButton= document.createElement('button');
   fabButton.innerText=" +";
   fabButton.classList.add('fab-button')// esto se hace para "hacerle una  marca" al botón fabbuton  y cuando yo me vaya a referir a él , lo buscaré en la lista de clases  como :'fab-button'
   element.append(fabButton);// lo añado a la interface, pero hace falta que se visualice
//todo 
   fabButton.addEventListener('click',()=>{

    showModal();
   })
}