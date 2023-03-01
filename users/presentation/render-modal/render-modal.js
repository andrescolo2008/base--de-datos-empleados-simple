import modalHTML from './render-modal.html?raw';//esta manera de importación, solo funciona conen vite, para otras plataformas puede ser diferente, por lo que hay que investigar.
import { User } from '../../models/user';
import { getUserById } from '../../use-cases/get-user-by-id';

import './render-modal.css';


let modal, form ;
let loadedUser={};
/**
 * 
 * @param {String|Number} id 
 */

export const showModal =async ( id) =>{
    modal?.classList.remove('hide-modal')
    loadedUser={};

    if(!id) return ;
    const user= await getUserById(id);
    setFormValues(user)
}

export const hideModal = ( ) =>{
   // Reset del formulario 
   modal?.classList.add('hide-modal')
   form?.reset();// aquí se resetea el modal y desaparecelala información que se había dejado por escrito antes 
}
/**
 * 
 * @param {User} user 
 */
const setFormValues= (user) =>{
    form.querySelector('[name="firstName"]').value=user.firstName;
    form.querySelector('[name="lastName"]').value=user.lastName;
    form.querySelector('[name="balance"]').value=user.balance;
    form.querySelector('[name="isActive"]').checked=user.isActive;
    loadedUser=user;
}


/**
 * 
 * @param {HTMLDivElement} element 
 * @param {(userLike)=>Promise<void>} callback
 * 
 */

export const renderModal =(element,callback)=>{

    if(modal)return;
    modal= document.createElement('div');
    modal.innerHTML=modalHTML;
modal.className='modal-container hide-modal';
form=modal.querySelector('form')

modal.addEventListener('click',(event)=>{
// if(event.target.className!=='modal-container') return;// si al hacer click en el nombre  de la clase, es diferente a modal -container,  entionces return, es decir, no se va a hacer nada

 //2nda forma 
if(event.target.className ==='modal-container'){
    hideModal();
}
   
});

form.addEventListener('submit', async (event)=>{
event.preventDefault();// evita que el navegador se actualicepor defecto

const formData=new FormData(form);// metodo para extraer infromación de manera automátia, en este caso haría referencia al form.addEventListener('submit'),(event)=>{... o tambien de un HTMLFormElement
const userLike={...loadedUser};// esto indica un objeto vacío

for( const[key,value] of formData){// aqui se van a barrer los elelemntos del formulario, form, y se vanaa retornar como string. se  desestructurará el [itirator] en [key(es el nombre del imput ),value(es el valor deese input )]
   
    if(key === 'balance'){// el argumento key de tipo string va a equivaler a 'isActive' o 'balance'  y  el  argumento value, FormDataEntryValue, colocará la infromación en el formulario  de acuerdo al argumento que haga referencia  key en los ciclos if de más abajo  
        userLike[key]= +value ;
        // otra manera -- > userLike[key]=Number(value) ;
        // aquí estoy indicando que a cada elemento del del arrglo  , se convierta de string a number.Porque  cuando esta información llegue al backend, podría ser almacenada de manera incorrecta y después generar incompatitibilidades 
        continue;// el conitnue, pasa a la siguiente interación del ciclo, mientras que return, me saca de la función.
    }

    if(key === 'isActive'){
        userLike[key] =(value==='on')?true:false;
        continue;
        }

userLike[key]=value;

}
// console.log(userLike);
await callback(userLike);
hideModal();// aquí despues de pusar el botoón guardar , se deja de visualizar el modal 
});

element.append(modal);

}