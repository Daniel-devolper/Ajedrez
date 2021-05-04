
let i, j, a, b;
let x=0, y=0; //derecha
let turno=1;
let z=0, w=0; //izquieda
let fichaRoja=0, fichaAmarrilla=0;
const altoTablero=60, anchoTablero=60;
const altoFicha=30, anchoFicha=30;
const posicionTablero=62.5, compensacionBordes=13;

const dibujarTablero=()=>{
    for (i = 0; i < 8; i++) {
        for ( j = 0; j < 8; j++) {
            if((j+i)%2== 0){
                document.getElementById('ajedrez').innerHTML+='<div '+`id=ta${i},${j}`+' style="border:solid 1px; width:'+altoTablero+'px;height:' + anchoTablero+'px;background-color:white;float:left;"><div>';
            }else{
                document.getElementById('ajedrez').innerHTML+='<div '+`id=ta${i},${j}`+' style="border:solid 1px; width:'+altoTablero +'px;height:' + anchoTablero+'px;background-color:black;float:left;"><div>';
            }
        }
    }
}

const posibleMovimento=(i,j,color)=>{
    
    if (color=='red' &&  turno==1) { 
        if(j!=7){
            document.getElementById(`ta${i+1},${j+1}`).style.backgroundColor='#90EE90'; //derecha
            x=(i+1);
            y=(j+1);  
        }
        if (j!=0) {
            document.getElementById(`ta${i+1},${j-1}`).style.backgroundColor='#90EE90'; //izquierda
            z=(i+1);
            w=(j-1);    
        }
    }else if (color=='yellow' && turno==0){
        if (j!=7) {
            document.getElementById(`ta${i-1},${j+1}`).style.backgroundColor='#90EE90'; //derecha
                x=(i-1);
                y=(j+1);
        }
        if (j!=0) {
            document.getElementById(`ta${i-1},${j-1}`).style.backgroundColor='#90EE90'; //izquierda
            z=(i-1);
            w=(j-1);
        }
    }
 }

const GameOver=()=>{
    if (fichaRoja==12) {
        swal("Ganan Las Fichas Amarrillas!");
    }else{
        if(fichaAmarrilla==12){
            swal("Ganan Las Fichas Rojas!");
        }       
    }
}

const mover=(a,b,color)=>{

    if (color=='red') {
        if (turno==1){
            posibleMovimento(a,b,color);      
        }
    }else
        if (color=='yellow') {
            if (turno==0) {
                posibleMovimento(a,b,color);                
            }
        }    
    
           // MOVER DERECHA
           const derecha=document.getElementById(`${x},${y}`);
            document.getElementById(`ta${x},${y}`).addEventListener('click',()=>{
                if ((color=='red')) {
                   if (turno==1) {
                        if (derecha==null) {
                            document.getElementById(`${a},${b}`).remove();
                            document.getElementById('ajedrez').innerHTML+='<div '+`id=${x},${y}`+' style="width:'+altoFicha +'px;height:' + anchoFicha+'px;    background-color:red;position:absolute;z-index:10;border-radius:100%;'+'left:'+((y)*posicionTablero+compensacionBordes)+'px;'+'top:'+((x)*posicionTablero+compensacionBordes)+'px;"'+`onclick="mover(${x},${y},'red')"`+'><div>';
                        }else
                        if(derecha.style.backgroundColor !='red'  && y!=7 && x!=7){  
                                if (document.getElementById(`${x+1},${y+1}`)==null) { 
                                document.getElementById(`${a},${b}`).remove();
                                document.getElementById(`${x},${y}`).remove();
                                document.getElementById('ajedrez').innerHTML+='<div '+`id=${x+1},${y+1}`+' style="width:'+altoFicha +'px;height:' + anchoFicha+'px;    background-color:red;position:absolute;z-index:10;border-radius:100%;'+'left:'+((y+1)*posicionTablero+compensacionBordes)+'px;'+'top:'+((x+1)*posicionTablero+compensacionBordes)+'px;"'+`onclick="mover(${x+1},${y+1},'red')"`+'><div>'; //cero    
                                fichaAmarrilla++;
                                
                                }else
                                    if (document.getElementById(`${x+1},${y+1}`).style.backgroundColor!='red') {
                                        swal('Movimiento Invalido!!','','error');
                                    }
                            }else swal('Movimiento Invalido!!','','error');
                            turno=0;     
                            const mensaje=document.getElementById('mensaje');
                            mensaje.textContent='Turno de las Fichas Amarrilas'
                            GameOver();
                   } 
                  
                }else{
                    if(color=='yellow'){
                        if (turno==0) {
                            if (derecha==null) {
                                document.getElementById(`${a},${b}`).remove();
                                document.getElementById('ajedrez').innerHTML+='<div '+`id=${x},${y}`+' style="width:'+altoFicha +'px;height:' + anchoFicha+'px;background-color:yellow;position:absolute;z-index:10;border-radius:100%;'+'left:'+((y)*posicionTablero+compensacionBordes)+'px;'+'top:'+((x)*posicionTablero+compensacionBordes)+'px;"'+`onclick="mover(${x},${y},'yellow')"`+'><div>';
                            }else
                                if (derecha.style.backgroundColor!='yellow' && y!=7 && x!=0)  {
                                    if (document.getElementById(`${x-1},${y+1}`)==null) {
                                        document.getElementById(`${a},${b}`).remove();
                                        document.getElementById(`${x},${y}`).remove();
                                        document.getElementById('ajedrez').innerHTML+='<div '+`id=${x-1},${y+1}`+' style="width:'+altoFicha +'px;height:' + anchoFicha+'px;background-color:yellow;position:absolute;z-index:10;border-radius:100%;'+'left:'+((y+1)*posicionTablero+compensacionBordes)+'px;'+'top:'+((x-1)*posicionTablero+compensacionBordes)+'px;"'+`onclick="mover(${x-1},${y+1},'yellow')"`+'><div>';    
                                        fichaRoja++;
                                    }else
                                        if (document.getElementById(`${x-1},${y+1}`).style.backgroundColor!='yellow') {
                                            swal('Movimiento Invalido!!','','error');
                                        }
                                }else swal('Movimiento Invalido!!','','error');;
                                turno=1;
                                const mensaje=document.getElementById('mensaje');
                                mensaje.textContent='Turno de las Fichas Rojas'    
                                GameOver();
                        }
                    }  
                 }
                 //BORRAR LOS POSIBLES MOVIMIENTOS YA HECHOS
                 if (b!=7) { 
                    document.getElementById(`ta${x},${y}`).style.backgroundColor='black';    
                 }                 
                 if (a!=0 ) { 
                    document.getElementById(`ta${z},${w}`).style.backgroundColor='black';  
                 }
            })
            
           // MOVER IZQUIERDA
           const izquierda=document.getElementById(`${z},${w}`);
            document.getElementById(`ta${z},${w}`).addEventListener('click',()=>{
                if ((color=='red')) {
                    if (turno==1) {
                        if (izquierda==null) {
                            document.getElementById(`${a},${b}`).remove();
                            document.getElementById('ajedrez').innerHTML+='<div '+`id=${z},${w}`+' style="width:'+altoFicha +'px;height:' + anchoFicha+'px;    background-color:red;position:absolute;z-index:10;border-radius:100%;'+'left:'+((w)*posicionTablero+compensacionBordes)+'px;'+'top:'+((z)*posicionTablero+compensacionBordes)+'px;"'+`onclick="mover(${z},${w},'red')"`+'><div>';    
                        }else
                            if (izquierda.style.backgroundColor !='red' && w!=0 && z!=7 ) {
                                if (document.getElementById(`${z+1},${w-1}`)==null) {
                                    document.getElementById(`${a},${b}`).remove();
                                    document.getElementById(`${z},${w}`).remove();
                                    document.getElementById('ajedrez').innerHTML+='<div '+`id=${z+1},${w-1}`+' style="width:'+altoFicha +'px;height:' + anchoFicha+'px;    background-color:red;position:absolute;z-index:10;border-radius:100%;'+'left:'+((w-1)*posicionTablero+compensacionBordes)+'px;'+'top:'+((z+1)*posicionTablero+compensacionBordes)+'px;"'+`onclick="mover(${z+1},${w-1},'red')"`+'><div>';        
                                    fichaAmarrilla++;
                                }else
                                    if (document.getElementById(`${z+1},${w-1}`).style.backgroundColor!='red') {
                                        swal('Movimiento Invalido!!','','error');
                                    }
                                
                            }else swal('Movimiento Invalido!!','','error');
                            turno=0;
                            const mensaje=document.getElementById('mensaje');
                            mensaje.textContent='Turno de las Fichas Amarrilas'        
                            GameOver();
                    }
                }else{
                    if (color=='yellow') {
                        if (turno==0) {
                            if (izquierda==null) {
                                document.getElementById(`${a},${b}`).remove();
                                document.getElementById('ajedrez').innerHTML+='<div '+`id=${z},${w}`+' style="width:'+altoFicha +'px;height:' + anchoFicha+'px;background-color:yellow;position:absolute;z-index:10;border-radius:100%;'+'left:'+((w)*posicionTablero+compensacionBordes)+'px;'+'top:'+((z)*posicionTablero+compensacionBordes)+'px;"'+`onclick="mover(${z},${w},'yellow')"`+'><div>';       
                            }else
                                if (izquierda.style.backgroundColor!='yellow' && w!=0 && z!=0) {
                                    if (document.getElementById(`${z-1},${w-1}`)==null) {
                                        document.getElementById(`${a},${b}`).remove();
                                        document.getElementById(`${z},${w}`).remove();
                                        document.getElementById('ajedrez').innerHTML+='<div '+`id=${z-1},${w-1}`+' style="width:'+altoFicha +'px;height:' + anchoFicha+'px;background-color:yellow;position:absolute;z-index:10;border-radius:100%;'+'left:'+((w-1)*posicionTablero+compensacionBordes)+'px;'+'top:'+((z-1)*posicionTablero+compensacionBordes)+'px;"'+`onclick="mover(${z-1},${w-1},'yellow')"`+'><div>';           
                                        fichaRoja++;
                                    }else
                                        if (document.getElementById(`${z-1},${w-1}`).style.backgroundColor!='yellow') {
                                            swal('Movimiento Invalido!!','','error');
                                        }
                                }else swal('Movimiento Invalido!!','','error');
                                turno=1;     
                                const mensaje=document.getElementById('mensaje');
                                mensaje.textContent='Turno de las Fichas Rojas';
                                GameOver();
                        }
                    }
                }
                   //BORRAR LOS POSIBLES MOVIMIENTOS YA HECHOS
                   if (a!=0 ) {
                   document.getElementById(`ta${z},${w}`).style.backgroundColor='black';
                   }
                   if (b!=7) { 
                    document.getElementById(`ta${x},${y}`).style.backgroundColor='black';    
                   }
            }) 
            
}

const dibujarFicha=()=>{
    dibujarTablero();
    for (a = 0; a < 8; a++) {
        for (b = 0; b < 8; b++) {
            if(a<3 && (b+a)%2!=0){
                document.getElementById('ajedrez').innerHTML+='<div '+`id=${a},${b}`+' style="width:'+altoFicha +'px;height:' + anchoFicha+'px;background-color:red;position:absolute;z-index:10;border-radius:100%;'+'left:'+(b*posicionTablero+compensacionBordes)+'px;'+'top:'+(a*posicionTablero+compensacionBordes)+'px;"'+`onclick="mover(${a},${b},'red')"`+'><div>'; 
            }else{
                if(a>4 && (b+a)%2!=0){
                    document.getElementById('ajedrez').innerHTML+='<div '+`id=${a},${b}`+' style="width:'+altoFicha +'px;height:' + anchoFicha+'px;background-color:yellow;position:absolute;z-index:10;border-radius:100%;'+'left:'+(b*posicionTablero+compensacionBordes)+'px;'+'top:'+(a*posicionTablero+compensacionBordes)+'px;"'+`onclick="mover(${a},${b},'yellow')"`+'><div>'; 
                }
            }
        }
    }     
}
dibujarFicha()

