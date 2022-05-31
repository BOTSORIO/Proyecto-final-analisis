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
    let inicio = 20;
    
    
    for(let i=0;i<tam;i++){

        var elem = document.createElement("img");

        if(arr[0].childNodes[i].alt == "arriba"){

            elem.src = '/img/huellas-arriba.png';
            elem.setAttribute("alt", "arriba");
            inicio = inicio-5;
            let posicion = inicio+"";

            if(inicio<0 || inicio>24){

              alert("Ruta invalida");
              break;

            }else{

              if(inicio==0){
                alert("¡Llegaste al objetivo!");
                break;
              }

              document.getElementById(posicion).appendChild(elem);
            }
        }

        if(arr[0].childNodes[i].alt == "abajo"){

          elem.src = '/img/huellas-abajo.png';
          elem.setAttribute("alt", "arriba");
          inicio = inicio+5;
          let posicion = inicio+"";

          if(inicio<0 || inicio>24){
              
            alert("Ruta invalida");
            break;

          }else{

            if(inicio==0){
              alert("¡Llegaste al objetivo!");
              break;
            }

            document.getElementById(posicion).appendChild(elem);
          }
        }

        if(arr[0].childNodes[i].alt == "izquierda"){

          elem.src = '/img/huellas-izquierda.png';
          elem.setAttribute("alt", "arriba");
          inicio = inicio-1;
          let posicion = inicio+"";

          if(inicio<0 || inicio>24 || inicio==19 || inicio==14 || inicio==9 || inicio==4){
              
            alert("Ruta invalida");
            break;

          }else{

            if(inicio==0){
              alert("¡Llegaste al objetivo!");
              break;
            }

            document.getElementById(posicion).appendChild(elem);
          }
        }

        if(arr[0].childNodes[i].alt == "derecha"){

          elem.src = '/img/huellas-derecha.png';
          elem.setAttribute("alt", "arriba");
          inicio = inicio+1;
          let posicion = inicio+"";

          if(inicio<0 || inicio>24 || inicio==20 || inicio==15 || inicio==10 || inicio==5){
              
            alert("Ruta invalida");
            break;

          }else{

            if(inicio==0){
              alert("¡Llegaste al objetivo!");
              break;
            }

            document.getElementById(posicion).appendChild(elem);
          }
        }
    }

}