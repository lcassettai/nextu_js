var numero = 0,
    resultado = 0 , 
    primer_numero = 0,
    segundo_numero = 0;
    operacion = '',
    nueva_operacion = true;

var Calculador = {
    init : function(){
        this.button_click();
    },
    button_click : function(){
        var botones = document.getElementsByClassName('tecla');
        for(var i = 0; i < botones.length ; i++){
            botones[i].onmouseup = this.agrandar_boton;
            botones[i].onmousedown = this.achicar_boton;
            this.set_funcion_boton(botones[i]);
        }
    },
    set_funcion_boton : function(boton){        
        switch (boton.id) {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                boton.onclick = this.set_numeros_pantalla;
                break;
            case "on":
                boton.onclick = this.limpiar_pantalla;
                break;
            case "punto":
                boton.onclick = this.set_punto;
                break;
            case "sign":
                boton.onclick = this.set_signo;
                break;
            case "mas":
            case "menos":
            case "por":
            case "dividido":
                boton.onclick = this.operar;
                break;
            case "igual":
                boton.onclick = this.resultado;
                break;
        }
    },
    achicar_boton : function(e){
        e.target.style.transform = "scale(0.9,0.9)";   
    },
    agrandar_boton : function(e){
        e.target.style.transform = "scale(1,1)";
    },
    set_numeros_pantalla : function(e){
        var numero_pantalla = document.getElementById('display').innerHTML;
        if (numero_pantalla.length <= 7){
            var numero_seleccionado = e.target.id;
            //Si el numero en pantalla es 0 y no hay punto, colocamos en la pantalla el numero selecionado
            //Caso contrario, conctatenamos el numero al valor q hay en pantalla
            if (numero_pantalla == 0 && numero_pantalla.indexOf('.') == -1){
                numero = numero_seleccionado;
            }else{
                numero = numero + numero_seleccionado;
            }          
            document.getElementById('display').innerHTML = numero;
        }else{
            alert("No puede ingresar un numero mayor a 8 digitos");
        }  
    },
    set_punto : function(){
        //Si el numero no contiene (.) se lo asignamos
        if (numero.toString().indexOf('.') == -1){
            numero += '.';
            document.getElementById('display').innerHTML = numero;
        }       
    },
    set_signo : function(){
        if (numero != 0){
            //Si el numero de la pantalla no contiene signo le asignamos el (-)
            if (numero.toString().indexOf('-') == -1 ) {
                numero = '-' + numero;
            }else{
                numero = numero.slice(1, numero.length);
            }

            document.getElementById('display').innerHTML = numero;
        }
    },
    operar : function(e){
        //El id del elemento sera la referencia de que operacion se quiere realizar
        operacion = e.target.id;
        primer_numero = numero;
        //Si es una nueva operacion el primer numero sera el ingresado
        //Si no es una nueva operacion el primera numero sera el resultado de la operacion anterior
        nueva_operacion = true;

        document.getElementById('display').innerHTML = '' ;
    },
    resultado : function(){
        //Verificamos si es una nueva operacion
        if (nueva_operacion){
            segundo_numero = document.getElementById('display').innerHTML;
            nueva_operacion = false;
        }else{
            primer_numero = resultado;
        }
        
        switch(operacion){
            case "mas":
                resultado = parseFloat(primer_numero) + parseFloat(segundo_numero);
                break;
            case "menos":
                resultado = parseFloat(primer_numero) - parseFloat(segundo_numero);
                break;
            case "por":
                resultado = parseFloat(primer_numero) * parseFloat(segundo_numero);
                break;
            case "dividido":
                resultado = parseFloat(primer_numero) / parseFloat(segundo_numero);
                break;
        }
        //Evitamos que el resultado muestre mas de 8 numeros
        if (resultado.toString().length > 7){
            resultado = resultado.toString().slice(0, 8);
        }
        numero = resultado;
        document.getElementById('display').innerHTML = resultado;
    },limpiar_pantalla: function () {
        //Funcion para limpiar los valores (boton On)
        numero = 0;
        primer_numero = 0;
        segundo_numero = 0;
        nueva_operacion = true;
        resultado = 0;
        operacion = '';
        document.getElementById('display').innerHTML = 0;
    }
}

Calculador.init();

//Asignamos la operacion resultado al presionar la tecla enter
document.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
        Calculador.resultado();
    };
});


