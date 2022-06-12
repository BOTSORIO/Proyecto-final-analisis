/*
* Modal para mostrar mensajes de exito o error al completar cada prueba
*/
const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');

/*
* Funcion que añade la imagen de una flecha hacia arriba correspondiente
* al movimiento de la secuencia descrita por el usuario
*/
function añadirImagenArriba() {
  var elem = document.createElement("img");
  elem.src = '/img/arriba.png';
  elem.setAttribute("alt", "arriba");
  elem.style = 'width: 50px; height 50px';
  document.getElementById("ruta").appendChild(elem);
}

/*
* Funcion que añade la imagen de una flecha hacia abajo correspondiente
* al movimiento de la secuencia descrita por el usuario
*/
function añadirImagenAbajo() {
  
  var elem = document.createElement("img");
  elem.src = '/img/abajo.png';
  elem.setAttribute("alt", "abajo");
  elem.style = 'width: 50px; height 50px';
  document.getElementById("ruta").appendChild(elem);
}

/*
* Funcion que añade la imagen de una flecha hacia la izquierda correspondiente
* al movimiento de la secuencia descrita por el usuario
*/
function añadirImagenIzquierda() {
  
  var elem = document.createElement("img");
  elem.src = '/img/izquierda.png';
  elem.setAttribute("alt", "izquierda");
  elem.style = 'width: 50px; height 50px';
  document.getElementById("ruta").appendChild(elem);
}

/*
* Funcion que añade la imagen de una flecha hacia la derecha correspondiente
* al movimiento de la secuencia descrita por el usuario
*/
function añadirImagenDerecha() {
  
  var elem = document.createElement("img");
  elem.src = '/img/derecha.png';
  elem.setAttribute("alt", "derecha");
  elem.style = 'width: 50px; height 50px';
  document.getElementById("ruta").appendChild(elem);
}

/*
* Funcion que comprueba si la ruta del primer reto que ingreso el usuario
* es correcta o incorrecta, tambien agrega el camino ingresado anteriormente
*/
function comprobarRuta1(){
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

              document.getElementById('respuesta').value = "no aprobado";
              break;

            }else{

              if(inicio!=0){ 
                document.getElementById(posicion).appendChild(elem);
              }
            }
        }

        if(arr[0].childNodes[i].alt == "abajo"){

          elem.src = '/img/huellas-abajo.png';
          elem.style = 'width: 60px; height 60px';
          elem.setAttribute("alt", "arriba");
          inicio = inicio+6;
          let posicion = inicio+"";

          if(inicio<0 || inicio>35){
              
            document.getElementById('respuesta').value = "no aprobado";
            break;

          }else{
            
            if(inicio!=0){
              document.getElementById(posicion).appendChild(elem);
            }
          }
        }

        if(arr[0].childNodes[i].alt == "izquierda"){

          elem.src = '/img/huellas-izquierda.png';
          elem.style = 'width: 60px; height 60px';
          elem.setAttribute("alt", "arriba");
          inicio = inicio-1;
          let posicion = inicio+"";

          if(inicio<0 || inicio>35 || inicio==29 || inicio==23 || inicio==17 || inicio==11 || inicio==5){
              
            document.getElementById('respuesta').value = "no aprobado";
            break;

          }else{
            
            if(inicio!=0){
              document.getElementById(posicion).appendChild(elem);
            }
          }
        }

        if(arr[0].childNodes[i].alt == "derecha"){

          elem.src = '/img/huellas-derecha.png';
          elem.style = 'width: 60px; height 60px';
          elem.setAttribute("alt", "arriba");
          inicio = inicio+1;
          let posicion = inicio+"";

          if(inicio<0 || inicio>35 || inicio==30 || inicio==24 || inicio==18 || inicio==12 || inicio==6){
              
            document.getElementById('respuesta').value = "no aprobado";
            break;

          }else{
            
            if(inicio!=0){
              document.getElementById(posicion).appendChild(elem);
            }
          }
        }
    }

    if(inicio==0){

      document.getElementById('respuesta').value = "aprobado";
      modal_container.classList.add('show');
      
    }else{
      
      document.getElementById('respuesta').value = "no aprobado";
      modal_container.classList.add('show');
      document.getElementById('titleerror').innerHTML = '<b>¡Fallaste!</b>';
      document.getElementById('titleerror').style = 'margin-top: -5%';
      document.getElementById('texterror').innerHTML = '<b>La ruta ingresada no te lleva al objetivo</b>';
      document.getElementById('texterror').style = 'font-size: 28px';
      document.getElementById('imgError').src = '/img/sad.gif';
      document.getElementById('imgError').style = 'width: 120px; height: 150px;margin-top:-5%;margin-left:30%';
    }
}


/*
* Funcion que comprueba si la ruta del segundo reto que ingreso el usuario
* es correcta o incorrecta, tambien agrega el camino ingresado anteriormente
*/
function comprobarRuta2(){
  var elementos = document.getElementsByClassName('contenedor-ruta');
  var arr = Array.from(elementos);

  let tam = arr[0].childNodes.length;
  let inicio = 7;
  
  
  for(let i=0;i<tam;i++){

      var elem = document.createElement("img");

      if(arr[0].childNodes[i].alt == "arriba"){

          elem.src = '/img/huellas-arriba.png';
          elem.style = 'width: 60px; height 60px';
          elem.setAttribute("alt", "arriba");
          inicio = inicio-6;
          let posicion = inicio+"";

          if(inicio<0 || inicio>35){

            document.getElementById('respuesta').value = "no aprobado";
            break;

          }else{

            if(inicio!=34){
              
              document.getElementById(posicion).appendChild(elem);
            }
          }
      }

      if(arr[0].childNodes[i].alt == "abajo"){

        elem.src = '/img/huellas-abajo.png';
        elem.style = 'width: 60px; height 60px';
        elem.setAttribute("alt", "arriba");
        inicio = inicio+6;
        let posicion = inicio+"";

        if(inicio<0 || inicio>35){
            
          document.getElementById('respuesta').value = "no aprobado";
          break;

        }else{
          
          if(inicio!=34){
            document.getElementById(posicion).appendChild(elem);
          }
        }
      }

      if(arr[0].childNodes[i].alt == "izquierda"){

        elem.src = '/img/huellas-izquierda.png';
        elem.style = 'width: 60px; height 60px';
        elem.setAttribute("alt", "arriba");
        inicio = inicio-1;
        let posicion = inicio+"";

        if(inicio<0 || inicio>35 || inicio==29 || inicio==23 || inicio==17 || inicio==11 || inicio==5){
            
          document.getElementById('respuesta').value = "no aprobado";
          break;

        }else{
          
          if(inicio!=34){
            document.getElementById(posicion).appendChild(elem);
          }
        }
      }

      if(arr[0].childNodes[i].alt == "derecha"){

        elem.src = '/img/huellas-derecha.png';
        elem.style = 'width: 60px; height 60px';
        elem.setAttribute("alt", "arriba");
        inicio = inicio+1;
        let posicion = inicio+"";

        if(inicio<0 || inicio>35 || inicio==30 || inicio==24 || inicio==18 || inicio==12 || inicio==6){
            
          document.getElementById('respuesta').value = "no aprobado";
          break;

        }else{
          
          if(inicio!=34){
            document.getElementById(posicion).appendChild(elem);
          }
        }
      }
  }

  if(inicio==34){

    document.getElementById('respuesta').value = "aprobado";
    modal_container.classList.add('show');
    
  }else{
    
    document.getElementById('respuesta').value = "no aprobado";
    modal_container.classList.add('show');
    document.getElementById('titleerror').innerHTML = '<b>¡Fallaste!</b>';
    document.getElementById('titleerror').style = 'margin-top: -5%';
    document.getElementById('texterror').innerHTML = '<b>La ruta ingresada no te lleva al objetivo</b>';
    document.getElementById('texterror').style = 'font-size: 28px';
    document.getElementById('imgError').src = '/img/sad.gif';
    document.getElementById('imgError').style = 'width: 120px; height: 150px;margin-top:-5%;margin-left:30%';
  }
}

/*
* Funcion que comprueba si la ruta del tercer reto que ingreso el usuario
* es correcta o incorrecta, tambien agrega el camino ingresado anteriormente
*/
function comprobarRuta3(){
  var elementos = document.getElementsByClassName('contenedor-ruta');
  var arr = Array.from(elementos);

  let tam = arr[0].childNodes.length;
  let inicio = 5;
  
  for(let i=0;i<tam;i++){

      var elem = document.createElement("img");

      if(arr[0].childNodes[i].alt == "arriba"){

          elem.src = '/img/huellas-arriba.png';
          elem.style = 'width: 60px; height 60px';
          elem.setAttribute("alt", "arriba");
          inicio = inicio-6;
          let posicion = inicio+"";

          if(inicio<0 || inicio>35){

            document.getElementById('respuesta').value = "no aprobado";
            break;

          }else{

            if(inicio!=30){
              document.getElementById(posicion).appendChild(elem);
            }
          }
      }

      if(arr[0].childNodes[i].alt == "abajo"){

        elem.src = '/img/huellas-abajo.png';
        elem.style = 'width: 60px; height 60px';
        elem.setAttribute("alt", "arriba");
        inicio = inicio+6;
        let posicion = inicio+"";

        if(inicio<0 || inicio>35){
            
          document.getElementById('respuesta').value = "no aprobado";
          break;

        }else{
          
          if(inicio!=30){
            document.getElementById(posicion).appendChild(elem);
          }
        }
      }

      if(arr[0].childNodes[i].alt == "izquierda"){

        elem.src = '/img/huellas-izquierda.png';
        elem.style = 'width: 60px; height 60px';
        elem.setAttribute("alt", "arriba");
        inicio = inicio-1;
        let posicion = inicio+"";

        if(inicio<0 || inicio>35 || inicio==29 || inicio==23 || inicio==17 || inicio==11 || inicio==5){
            
          document.getElementById('respuesta').value = "no aprobado";
          break;

        }else{
          
          if(inicio!=30){
            document.getElementById(posicion).appendChild(elem);
          }
        }
      }

      if(arr[0].childNodes[i].alt == "derecha"){

        elem.src = '/img/huellas-derecha.png';
        elem.style = 'width: 60px; height 60px';
        elem.setAttribute("alt", "arriba");
        inicio = inicio+1;
        let posicion = inicio+"";

        if(inicio<0 || inicio>35 || inicio==30 || inicio==24 || inicio==18 || inicio==12 || inicio==6){
            
          document.getElementById('respuesta').value = "no aprobado";
          break;

        }else{
          
          if(inicio!=30){
            document.getElementById(posicion).appendChild(elem);
          }
        }
      }
  }

  if(inicio==30){

    document.getElementById('respuesta').value = "aprobado";
    modal_container.classList.add('show');
    
  }else{
    
    document.getElementById('respuesta').value = "no aprobado";
    modal_container.classList.add('show');
    document.getElementById('titleerror').innerHTML = '<b>¡Fallaste!</b>';
    document.getElementById('titleerror').style = 'margin-top: -5%';
    document.getElementById('texterror').innerHTML = '<b>La ruta ingresada no te lleva al objetivo</b>';
    document.getElementById('texterror').style = 'font-size: 28px';
    document.getElementById('imgError').src = '/img/sad.gif';
    document.getElementById('imgError').style = 'width: 120px; height: 150px;margin-top:-5%;margin-left:30%';
  }
}

/*
* Funcion que comprueba si la ruta del cuarto reto que ingreso el usuario
* es correcta o incorrecta, tambien agrega el camino ingresado anteriormente
*/
function comprobarRuta4(){
  var elementos = document.getElementsByClassName('contenedor-ruta');
  var arr = Array.from(elementos);

  let tam = arr[0].childNodes.length;
  let inicio = 11;
  
  for(let i=0;i<tam;i++){

      var elem = document.createElement("img");

      if(arr[0].childNodes[i].alt == "arriba"){

          elem.src = '/img/huellas-arriba.png';
          elem.style = 'width: 60px; height 60px';
          elem.setAttribute("alt", "arriba");
          inicio = inicio-6;
          let posicion = inicio+"";

          if(inicio<0 || inicio>35 || inicio==9){

            document.getElementById('respuesta').value = "no aprobado";
            break;

          }else{

            if(inicio!=25){
              document.getElementById(posicion).appendChild(elem);
            }
          }
      }

      if(arr[0].childNodes[i].alt == "abajo"){

        elem.src = '/img/huellas-abajo.png';
        elem.style = 'width: 60px; height 60px';
        elem.setAttribute("alt", "arriba");
        inicio = inicio+6;
        let posicion = inicio+"";

        if(inicio<0 || inicio>35 || inicio==9){
            
          document.getElementById('respuesta').value = "no aprobado";
          break;

        }else{
          
          if(inicio!=25){
            document.getElementById(posicion).appendChild(elem);
          }
        }
      }

      if(arr[0].childNodes[i].alt == "izquierda"){

        elem.src = '/img/huellas-izquierda.png';
        elem.style = 'width: 60px; height 60px';
        elem.setAttribute("alt", "arriba");
        inicio = inicio-1;
        let posicion = inicio+"";

        if(inicio<0 || inicio>35 || inicio==29 || inicio==23 || inicio==17 || inicio==11 || inicio==5 || inicio==9){
            
          document.getElementById('respuesta').value = "no aprobado";
          break;

        }else{
          
          if(inicio!=25){
            document.getElementById(posicion).appendChild(elem);
          }
        }
      }

      if(arr[0].childNodes[i].alt == "derecha"){

        elem.src = '/img/huellas-derecha.png';
        elem.style = 'width: 60px; height 60px';
        elem.setAttribute("alt", "arriba");
        inicio = inicio+1;
        let posicion = inicio+"";

        if(inicio<0 || inicio>35 || inicio==30 || inicio==24 || inicio==18 || inicio==12 || inicio==6 || inicio==9){
            
          document.getElementById('respuesta').value = "no aprobado";
          break;

        }else{
          
          if(inicio!=25){
            document.getElementById(posicion).appendChild(elem);
          }
        }
      }
  }

  if(inicio==25){

    document.getElementById('respuesta').value = "aprobado";
    modal_container.classList.add('show');
    
  }else{
    
    document.getElementById('respuesta').value = "no aprobado";
    modal_container.classList.add('show');
    document.getElementById('titleerror').innerHTML = '<b>¡Fallaste!</b>';
    document.getElementById('titleerror').style = 'margin-top: -5%';
    document.getElementById('texterror').innerHTML = '<b>La ruta ingresada no te lleva al objetivo</b>';
    document.getElementById('texterror').style = 'font-size: 28px';
    document.getElementById('imgError').src = '/img/sad.gif';
    document.getElementById('imgError').style = 'width: 120px; height: 150px;margin-top:-5%;margin-left:30%';
  }
}

/*
* Funcion que comprueba si la ruta del quinto reto que ingreso el usuario
* es correcta o incorrecta, tambien agrega el camino ingresado anteriormente
*/
function comprobarRuta5(){
  var elementos = document.getElementsByClassName('contenedor-ruta');
  var arr = Array.from(elementos);

  let tam = arr[0].childNodes.length;
  let inicio = 31;
  
  
  for(let i=0;i<tam;i++){

      var elem = document.createElement("img");

      if(arr[0].childNodes[i].alt == "arriba"){

          elem.src = '/img/huellas-arriba.png';
          elem.style = 'width: 60px; height 60px';
          elem.setAttribute("alt", "arriba");
          inicio = inicio-6;
          let posicion = inicio+"";

          if(inicio<0 || inicio>35 || inicio==9 || inicio==17 || inicio==25){

            document.getElementById('respuesta').value = "no aprobado";
            break;

          }else{

            if(inicio!=11){
              document.getElementById(posicion).appendChild(elem);
            }
          }
      }

      if(arr[0].childNodes[i].alt == "abajo"){

        elem.src = '/img/huellas-abajo.png';
        elem.style = 'width: 60px; height 60px';
        elem.setAttribute("alt", "arriba");
        inicio = inicio+6;
        let posicion = inicio+"";

        if(inicio<0 || inicio>35 || inicio==9 || inicio==17 || inicio==25){
            
          document.getElementById('respuesta').value = "no aprobado";
          break;

        }else{
          
          if(inicio!=11){
            document.getElementById(posicion).appendChild(elem);
          }
        }
      }

      if(arr[0].childNodes[i].alt == "izquierda"){

        elem.src = '/img/huellas-izquierda.png';
        elem.style = 'width: 60px; height 60px';
        elem.setAttribute("alt", "arriba");
        inicio = inicio-1;
        let posicion = inicio+"";

        if(inicio<0 || inicio>35 || inicio==29 || inicio==23 || inicio==17 || inicio==11 || inicio==5 || inicio==9 || inicio==25){
            
          document.getElementById('respuesta').value = "no aprobado";
          break;

        }else{
          
          if(inicio!=11){
            document.getElementById(posicion).appendChild(elem);
          }
        }
      }

      if(arr[0].childNodes[i].alt == "derecha"){

        elem.src = '/img/huellas-derecha.png';
        elem.style = 'width: 60px; height 60px';
        elem.setAttribute("alt", "arriba");
        inicio = inicio+1;
        let posicion = inicio+"";

        if(inicio<0 || inicio>35 || inicio==30 || inicio==24 || inicio==18 || inicio==12 || inicio==6 || inicio==9 || inicio==17 || inicio==25){
            
          document.getElementById('respuesta').value = "no aprobado";
          break;

        }else{
          
          if(inicio!=11){
            document.getElementById(posicion).appendChild(elem);
          }
        }
      }
  }

  if(inicio==11){

    document.getElementById('respuesta').value = "aprobado";
    modal_container.classList.add('show');
    
  }else{
    document.getElementById('respuesta').value = "no aprobado";
    modal_container.classList.add('show');
    document.getElementById('titleerror').innerHTML = '<b>¡Fallaste!</b>';
    document.getElementById('titleerror').style = 'margin-top: -5%';
    document.getElementById('texterror').innerHTML = '<b>La ruta ingresada no te lleva al objetivo</b>';
    document.getElementById('texterror').style = 'font-size: 28px';
    document.getElementById('imgError').src = '/img/sad.gif';
    document.getElementById('imgError').style = 'width: 120px; height: 150px;margin-top:-5%;margin-left:30%';
  }
}