import usersStore from '../store/users-store';
import { showModal } from './render-modal/render-modal';
import {deleteUserById} from'../use-cases/delete-user-by-id';
import './render-table';



 let table;

 const createTable=()=>{
    const table=document.createElement('table');
    const tableHeaders=document.createElement('thead');// aquí estoy creando el elemento del encabezado de la tabla
    tableHeaders.innerHTML=
    // aquí coloco los títulos  de cada columna de la tabla en el HTML
    `
    <tr>
    <th> #ID </th>
    <th> Balance </th>
    <th> FirstName  </th>
    <th> LastName  </th>
    <th> Active </th>
    <th> Actions </th>
       </tr>
    `;
    const tableBody=document.createElement('tbody');// aquí estoy creando el elemento del cuerpo de la tabla
    table.append(tableHeaders,tableBody);
    return table;
 }
/**
 * 
 * @param {MouseEvent} event 
 */
const tableSelectListener=(event)=>{
      const element=event.target.closest('.select-user');
      if(!element) return;
const id= element.getAttribute('data-id');
showModal(id);
}

/**
 * 
 * @param {MouseEvent} event 
 */
const tableDeleteListener=async (event)=>{
   const element=event.target.closest('.delete-user');
   if(!element) return;

   const id= element.getAttribute('data-id');

 try{ 
   await deleteUserById(id);
   await usersStore.reloadPage();
   document.querySelector('#current-page').innerText=usersStore.getCurrentPage();
   renderTable();
}catch (error){
   console.log(error);
   alert('No se pudo eliminar')
      }

}
/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderTable=(element)=>{
const users= usersStore.getUsers();   
if(!table){
    table=createTable();
    element.append(table);// ahora se va a indicar que se va a insertar la tabla creada con sus características y se va a mostrar en la pagina web. por lo cual se insereta en  el argumento ( element) de la función renderTable
// como no quiero destruir lo que cree anteriomente, utilizo append, la cual añade a la interface la tabla, sin eleiminar otros elelmtos html

table.addEventListener('click',tableSelectListener)
table.addEventListener('click',tableDeleteListener)

}


// aquí voy a hacer que la tabla que cree se vea en el navegador
let tableHTML='';
// para cada elementeo que se encuentre dentr del arrglo de users,isers.forEach(), seobtendrá id, blance, nombre, apellido, está activo? y acciones  
users.forEach(user=>{
    tableHTML+=`
    <tr>
    <td> ${user.id}  </td>
    <td> ${user.balance}  </td>
    <td> ${user.firstName}   </td>
    <td> ${user.lastName}   </td>
    <td> ${user.isActive} </td>
    <td> 
    
    <a href=#/" class="select-user" data-id="${user.id}">Selected</a>
|
    <a href=#/" class="delete-user" data-id="${user.id}">Deleted</a>
    |
    </td>
       </tr>    
    `
    // td= table descirption,tr= tableraw, <a> anchor tags
});

table.querySelector('tbody').innerHTML=tableHTML;
// voy a refereirme al cuerpo de la tabla: table.querySelector('tbody').
// en seguida  en el espacio de l textó,,innerHTML, voy a colocar los datos de la tabla, lo que se encuentra en la variable tableHTML. así:table.querySelector('tbody').innerHTML=tableHTML;
}
