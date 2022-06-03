
const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');

function añadirImagenArriba() {
  var elem = document.createElement("img");
  elem.src = '/img/arriba.png';
  elem.setAttribute("alt", "arriba");
  elem.style = 'width: 50px; height 50px';
  document.getElementById("ruta").appendChild(elem);
}

function añadirImagenAbajo() {
  
  var elem = document.createElement("img");
  elem.src = '/img/abajo.png';
  elem.setAttribute("alt", "abajo");
  elem.style = 'width: 50px; height 50px';
  document.getElementById("ruta").appendChild(elem);
}

function añadirImagenIzquierda() {
  
  var elem = document.createElement("img");
  elem.src = '/img/izquierda.png';
  elem.setAttribute("alt", "izquierda");
  elem.style = 'width: 50px; height 50px';
  document.getElementById("ruta").appendChild(elem);
}

function añadirImagenDerecha() {
  
  var elem = document.createElement("img");
  elem.src = '/img/derecha.png';
  elem.setAttribute("alt", "derecha");
  elem.style = 'width: 50px; height 50px';
  document.getElementById("ruta").appendChild(elem);
}


function comprobarRuta(){
    var elementos = document.getElementsByClassName('contenedor-ruta');
    var arr = Array.from(elementos);

    let tam = arr[0].childNodes.length;
    let inicio = 30;
    
    
    for(let i=0;i<tam;i++){

        var elem = document.createElement("img");

        if(arr[0].childNodes[i].alt == "arriba"){

            elem.src = '/img/huellas-arriba.png';
            elem.style = 'width: 60px; height 60px';
            elem.setAttribute("alt", "arriba");
            inicio = inicio-6;
            let posicion = inicio+"";

            if(inicio<0 || inicio>35){

              alert("Ruta invalida");
              break;

            }else{
              document.getElementById(posicion).appendChild(elem);
            }
        }

        if(arr[0].childNodes[i].alt == "abajo"){

          elem.src = '/img/huellas-abajo.png';
          elem.style = 'width: 60px; height 60px';
          elem.setAttribute("alt", "arriba");
          inicio = inicio+6;
          let posicion = inicio+"";

          if(inicio<0 || inicio>35){
              
            alert("Ruta invalida");
            break;

          }else{
            document.getElementById(posicion).appendChild(elem);
          }
        }

        if(arr[0].childNodes[i].alt == "izquierda"){

          elem.src = '/img/huellas-izquierda.png';
          elem.style = 'width: 60px; height 60px';
          elem.setAttribute("alt", "arriba");
          inicio = inicio-1;
          let posicion = inicio+"";

          if(inicio<0 || inicio>35 || inicio==29 || inicio==23 || inicio==17 || inicio==11 || inicio==5){
              
            alert("Ruta invalida");
            break;

          }else{
            document.getElementById(posicion).appendChild(elem);
          }
        }

        if(arr[0].childNodes[i].alt == "derecha"){

          elem.src = '/img/huellas-derecha.png';
          elem.style = 'width: 60px; height 60px';
          elem.setAttribute("alt", "arriba");
          inicio = inicio+1;
          let posicion = inicio+"";

          if(inicio<0 || inicio>35 || inicio==30 || inicio==24 || inicio==18 || inicio==12 || inicio==6){
              
            alert("Ruta invalida");
            break;

          }else{
            document.getElementById(posicion).appendChild(elem);
          }
        }
    }

    if(inicio==0){
      modal_container.classList.add('show');

      close.addEventListener('click', () => {
        modal_container.classList.remove('show');
      });
      
    }else{
      
      modal_container.classList.add('show');
      document.getElementById('titleerror').innerHTML = '<b>¡Fallaste!</b>';
      document.getElementById('texterror').innerHTML = '<b>La ruta ingresada no te lleva al objetivo</b>';
      document.getElementById('imgError').src = '/img/sad.gif';
      document.getElementById('imgError').style = 'width: 150px; height: 180px;margin-top:30%'

      close.addEventListener('click', () => {
        modal_container.classList.remove('show');
      });
    }
}