import { renderAddButton } from "./presentation/render-add-button/render-add-button";
import { renderButtons } from "./presentation/render-buttons.js/render-buttons";
import { renderModal } from "./presentation/render-modal/render-modal";
import { renderTable } from "./presentation/render-table";
import usersStore from "./store/users-store";
import { saveUser } from "./use-cases/save-user";

/**
 * 
 * @param {HTMLDivElement} element 
 */



export const UsersApp= async (element )=>{
element.innerHTML='loading...';
await usersStore.loadNextPage();
//console.log(usersStore.getUsers());aquí muestro en consola a los ususarios de la base de datos 

element.innerHTML='';
renderTable(element)
renderButtons(element);
renderAddButton(element);
renderModal(element,async(userLike)=>{

    const user=await saveUser(userLike);
    console.log(user);
   usersStore.onUserChanged(user);
    renderTable();
});
// await usersStore.loadPreviusPage();

}