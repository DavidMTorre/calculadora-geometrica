// Inicialización cuando se carga la página 
document.addEventListener('DOMContentLoaded', function() { 
    crearEntradasMatriz(); 
}); 
 
function alternarModoOscuro() {
    document.body.classList.toggle('modo-oscuro');
}

// Función para cambiar entre pantallas 
function mostrarPantalla(idPantalla) { 
    // Ocultar todas las pantallas 
    const todasLasPantallas = document.querySelectorAll('.pantalla'); 
    todasLasPantallas.forEach(pantalla => 
pantalla.classList.remove('activa')); 
     
    // Mostrar la pantalla solicitada 
    document.getElementById(idPantalla).classList.add('activa'); 
} 
 
// Función de validación de entrada
function validarEntrada(valorEntrada, nombreCampo) {
    const valorStr = String(valorEntrada).trim();

    // Verificar si está vacío
    if (valorStr === "") {
        throw new Error(`${nombreCampo} no puede estar vacío`);
    }

    // Verificar letras
    if (/[a-zA-Z]/.test(valorStr)) {
        throw new Error(`No se permiten letras en ${nombreCampo}`);
    }

    // Verificar caracteres especiales (excepto punto y signo negativo)
    if (/[^0-9.\-]/.test(valorStr)) {
        throw new Error(`No se permiten caracteres especiales en ${nombreCampo}`);
    }

    // Convertir a número
    const numero = parseFloat(valorStr);

    // Verificar si es un número válido
    if (isNaN(numero)) {
        throw new Error(`${nombreCampo} debe ser un número válido`);
    }

    // Verificar si es negativo o cero
    if (numero <= 0) {
        throw new Error(`No se permiten números negativos en ${nombreCampo}`);
    }

    return numero;
}

// Función para mostrar resultados o errores 
function mostrarResultado(idElemento, textoResultado, mensajeError = 
null) { 
    const elementoResultado = document.getElementById(idElemento); 
    if (mensajeError) { 
        elementoResultado.innerHTML = `<div 
class="error">${mensajeError}</div>`; 
    } else { 
        elementoResultado.innerHTML = textoResultado; 
    } 
} 
 
// ============= CÁLCULOS FIGURAS 2D ============= 
 
function calcularCirculo2D(tipoOperacion) { 
    try { 
        const radioCirculo = 
validarEntrada(document.getElementById('entrada-radio-circulo').value, 
'Radio'); 
        let resultadoCalculo; 
         
        if (tipoOperacion === 'area') { 
            resultadoCalculo = Math.PI * radioCirculo * radioCirculo; 
            mostrarResultado('resultado-circulo-2d', `Área: 
${resultadoCalculo.toFixed(4)} unidades²`); 
        } else if (tipoOperacion === 'perimetro') { 
            resultadoCalculo = 2 * Math.PI * radioCirculo; 
            mostrarResultado('resultado-circulo-2d', `Perímetro: 
${resultadoCalculo.toFixed(4)} unidades`); 
        } 
    } catch (errorCapturado) { 
        mostrarResultado('resultado-circulo-2d', null, 
errorCapturado.message); 
    } 
} 
 
function calcularCuadrado2D(tipoOperacion) { 
    try { 
        const ladoCuadrado = 
validarEntrada(document.getElementById('entrada-lado-cuadrado').value, 
'Lado'); 
        let resultadoCalculo; 
         
        if (tipoOperacion === 'area') { 
            resultadoCalculo = ladoCuadrado * ladoCuadrado; 
            mostrarResultado('resultado-cuadrado-2d', `Área: 
${resultadoCalculo.toFixed(4)} unidades²`); 
        } else if (tipoOperacion === 'perimetro') { 
            resultadoCalculo = 4 * ladoCuadrado; 
            mostrarResultado('resultado-cuadrado-2d', `Perímetro: 
${resultadoCalculo.toFixed(4)} unidades`); 
        } 
    } catch (errorCapturado) { 
        mostrarResultado('resultado-cuadrado-2d', null, 
errorCapturado.message); 
    } 
} 
 
function calcularTriangulo2D(tipoOperacion) { 
    try { 
        if (tipoOperacion === 'area') { 
            const baseTriangulo = 
validarEntrada(document.getElementById('entrada-base-triangulo').value, 
'Base'); 
            const alturaTriangulo = 
validarEntrada(document.getElementById('entrada-altura-triangulo').value, 
'Altura'); 
            const resultadoCalculo = (baseTriangulo * alturaTriangulo) / 
2; 
            mostrarResultado('resultado-triangulo-2d', `Área: 
${resultadoCalculo.toFixed(4)} unidades²`); 
        } else if (tipoOperacion === 'perimetro') { 
            const lado1Triangulo = 
validarEntrada(document.getElementById('entrada-lado1-triangulo').value, 
'Lado 1'); 
            const lado2Triangulo = 
validarEntrada(document.getElementById('entrada-lado2-triangulo').value, 
'Lado 2'); 
            const lado3Triangulo = 
validarEntrada(document.getElementById('entrada-lado3-triangulo').value, 
'Lado 3'); 
            const resultadoCalculo = lado1Triangulo + lado2Triangulo + 
lado3Triangulo; 
            mostrarResultado('resultado-triangulo-2d', `Perímetro: 
${resultadoCalculo.toFixed(4)} unidades`); 
        } 
    } catch (errorCapturado) { 
        mostrarResultado('resultado-triangulo-2d', null, 
errorCapturado.message); 
    } 
} 
 
// ============= CÁLCULOS FIGURAS 3D ============= 
 
function calcularEsfera(tipoOperacion) { 
    try { 
        const radioEsfera = 
validarEntrada(document.getElementById('entrada-radio-esfera').value, 
'Radio'); 
        let resultadoCalculo; 
         
        if (tipoOperacion === 'area') { 
            // Área superficial: 4πr² 
            resultadoCalculo = 4 * Math.PI * radioEsfera * radioEsfera; 
            mostrarResultado('resultado-esfera', `Área Superficial: 
${resultadoCalculo.toFixed(4)} unidades²`); 
        } else if (tipoOperacion === 'volumen') { 
            // Volumen: (4/3)πr³ 
            resultadoCalculo = (4/3) * Math.PI * radioEsfera * 
radioEsfera * radioEsfera; 
            mostrarResultado('resultado-esfera', `Volumen: 
${resultadoCalculo.toFixed(4)} unidades³`); 
        } 
    } catch (errorCapturado) { 
        mostrarResultado('resultado-esfera', null, 
errorCapturado.message); 
    } 
} 
 
function calcularCubo(tipoOperacion) { 
    try { 
        const aristaCubo = 
validarEntrada(document.getElementById('entrada-arista-cubo').value, 
'Arista'); 
        let resultadoCalculo; 
         
        if (tipoOperacion === 'area') { 
            // Área superficial: 6a² 
            resultadoCalculo = 6 * aristaCubo * aristaCubo; 
            mostrarResultado('resultado-cubo', `Área Superficial: 
${resultadoCalculo.toFixed(4)} unidades²`); 
        } else if (tipoOperacion === 'volumen') { 
            // Volumen: a³ 
            resultadoCalculo = aristaCubo * aristaCubo * aristaCubo; 
            mostrarResultado('resultado-cubo', `Volumen: 
${resultadoCalculo.toFixed(4)} unidades³`); 
        } 
    } catch (errorCapturado) { 
        mostrarResultado('resultado-cubo', null, errorCapturado.message); 
    } 
} 
 
function calcularCilindro(tipoOperacion) { 
    try { 
        const radioCilindro = 
validarEntrada(document.getElementById('entrada-radio-cilindro').value, 
'Radio'); 
        const alturaCilindro = 
validarEntrada(document.getElementById('entrada-altura-cilindro').value, 
'Altura'); 
        let resultadoCalculo; 
         
        if (tipoOperacion === 'area') { 
            // Área superficial: 2πr(r + h) 
            resultadoCalculo = 2 * Math.PI * radioCilindro * 
(radioCilindro + alturaCilindro); 
            mostrarResultado('resultado-cilindro', `Área Superficial: 
${resultadoCalculo.toFixed(4)} unidades²`); 
        } else if (tipoOperacion === 'volumen') { 
            // Volumen: πr²h 
            resultadoCalculo = Math.PI * radioCilindro * radioCilindro * 
alturaCilindro; 
            mostrarResultado('resultado-cilindro', `Volumen: 
${resultadoCalculo.toFixed(4)} unidades³`); 
        } 
    } catch (errorCapturado) { 
        mostrarResultado('resultado-cilindro', null, 
errorCapturado.message); 
    } 
} 
 
// ============= MATRICES ============= 
 
function crearEntradasMatriz() {
    const contenedorCuadricula = document.getElementById('contenedor-cuadricula-matriz');
    contenedorCuadricula.innerHTML = '';

    // Limpiar mensajes previos
    mostrarResultado('resultado-matriz', '');

    // Crear 16 inputs para matriz 4x4
    for (let indiceEntrada = 0; indiceEntrada < 16; indiceEntrada++) {
        const entradaMatriz = document.createElement('input');
        entradaMatriz.className = 'entrada-matriz';
        entradaMatriz.step = '0.1';
        entradaMatriz.placeholder = '0';
        entradaMatriz.id = `entrada-matriz-${indiceEntrada}`;

        // Validación en tiempo real
        entradaMatriz.addEventListener('input', function () {
            const valor = this.value;

            // Detectar letras
            if (/[a-zA-Z]/.test(valor)) {
                mostrarResultado('resultado-matriz', null, `No se permiten letras en la posición ${indiceEntrada + 1}`);
                this.value = valor.replace(/[a-zA-Z]/g, '');
                return;
            }

            // Detectar caracteres especiales (excepto punto y signo negativo)
            if (/[^0-9.\-]/.test(valor)) {
                mostrarResultado('resultado-matriz', null, `No se permiten caracteres especiales en la posición ${indiceEntrada + 1}`);
                this.value = valor.replace(/[^0-9.\-]/g, '');
                return;
            }

            // Si todo está bien, limpiar mensaje de error
            mostrarResultado('resultado-matriz', '');
        });

        contenedorCuadricula.appendChild(entradaMatriz);
    }
}

function limpiarEntradasMatriz() {
    for (let i = 0; i < 16; i++) {
        const campo = document.getElementById(`entrada-matriz-${i}`);
        if (campo) {
            campo.value = '';
        }
    }

    // Limpia también el área de resultados
    mostrarResultado('resultado-matriz', '');
     // Ocultar los pasos de resolución
    const contenedorPasos = document.getElementById('pasos-resolucion');
    if (contenedorPasos) {
        contenedorPasos.style.display = 'none';
        contenedorPasos.innerHTML = ''; // Opcional: limpiar contenido
    }
}

function obtenerValoresMatriz() { 
    const matrizCompleta = []; 
     
    // Convertir los 16 inputs en matriz 4x4 
    for (let indiceFila = 0; indiceFila < 4; indiceFila++) { 
        matrizCompleta[indiceFila] = []; 
        for (let indiceColumna = 0; indiceColumna < 4; indiceColumna++) { 
            const valorEntrada = document.getElementById(`entrada-matriz-${indiceFila * 4 + indiceColumna}`).value; 
            matrizCompleta[indiceFila][indiceColumna] = valorEntrada === 
'' ? 0 : parseFloat(valorEntrada); 
        } 
    } 
    return matrizCompleta; 
} 
 
function calcularDeterminante() { 
    try { 
        const matrizCompleta = obtenerValoresMatriz(); 
        const determinanteResultado = 
calcularDeterminante4x4(matrizCompleta); 
        mostrarResultado('resultado-matriz', `Determinante: 
${determinanteResultado.toFixed(6)}`); 
    } catch (errorCapturado) { 
        mostrarResultado('resultado-matriz', null, 'Error en el cálculo del determinante'); 
    } 
} 
 
// Cálculo de determinante 4x4 usando expansión de cofactores 
function calcularDeterminante4x4(matrizEntrada) { 
    const elementosMatriz = matrizEntrada; 
    return ( 
        elementosMatriz[0][0] * calcularDeterminante3x3([ 
            [elementosMatriz[1][1], elementosMatriz[1][2], 
elementosMatriz[1][3]], 
            [elementosMatriz[2][1], elementosMatriz[2][2], 
elementosMatriz[2][3]], 
            [elementosMatriz[3][1], elementosMatriz[3][2], 
elementosMatriz[3][3]] 
        ]) - 
        elementosMatriz[0][1] * calcularDeterminante3x3([ 
            [elementosMatriz[1][0], elementosMatriz[1][2], 
elementosMatriz[1][3]], 
            [elementosMatriz[2][0], elementosMatriz[2][2], 
elementosMatriz[2][3]], 
            [elementosMatriz[3][0], elementosMatriz[3][2], 
elementosMatriz[3][3]] 
        ]) + 
        elementosMatriz[0][2] * calcularDeterminante3x3([ 
            [elementosMatriz[1][0], elementosMatriz[1][1], 
elementosMatriz[1][3]], 
            [elementosMatriz[2][0], elementosMatriz[2][1], 
elementosMatriz[2][3]], 
            [elementosMatriz[3][0], elementosMatriz[3][1], 
elementosMatriz[3][3]] 
        ]) - 
        elementosMatriz[0][3] * calcularDeterminante3x3([ 
            [elementosMatriz[1][0], elementosMatriz[1][1], 
elementosMatriz[1][2]], 
            [elementosMatriz[2][0], elementosMatriz[2][1], 
elementosMatriz[2][2]], 
            [elementosMatriz[3][0], elementosMatriz[3][1], 
elementosMatriz[3][2]] 
        ]) 
    ); 
} 
 
// Cálculo de determinante 3x3 usando regla de Sarrus 
function calcularDeterminante3x3(matrizEntrada) { 
    const elementosMatriz = matrizEntrada; 
    return ( 
        elementosMatriz[0][0] * (elementosMatriz[1][1] * 
elementosMatriz[2][2] - elementosMatriz[1][2] * elementosMatriz[2][1]) - 
        elementosMatriz[0][1] * (elementosMatriz[1][0] * 
elementosMatriz[2][2] - elementosMatriz[1][2] * elementosMatriz[2][0]) + 
        elementosMatriz[0][2] * (elementosMatriz[1][0] * 
elementosMatriz[2][1] - elementosMatriz[1][1] * elementosMatriz[2][0]) 
    ); 
}

// pasos de resolucion
function obtenerSubmatriz(matriz, filaExcluir, columnaExcluir) {
    const submatriz = [];

    for (let i = 0; i < matriz.length; i++) {
        if (i === filaExcluir) continue;

        const fila = [];
        for (let j = 0; j < matriz[i].length; j++) {
            if (j === columnaExcluir) continue;
            fila.push(matriz[i][j]);
        }

        submatriz.push(fila);
    }

    return submatriz;
}

function mostrarPasosResolucion() {
    try {
        const matriz = obtenerValoresMatriz(); // Tu función ya existente
        const pasos = resolverDeterminantePasoAPaso(matriz); // Nueva función
        const contenedorPasos = document.getElementById('pasos-resolucion');

        contenedorPasos.innerHTML = pasos.join('<br>');
        contenedorPasos.style.display = 'block';
    } catch (error) {
        mostrarResultado('resultado-matriz', null, error.message);
    }
}

function resolverDeterminantePasoAPaso(matriz) {
    const pasos = [];

    pasos.push('🔍 Resolviendo determinante de matriz 4x4 por expansión de la primera fila:');

    for (let j = 0; j < 4; j++) {
        const signo = (j % 2 === 0) ? '+' : '−';
        const elemento = matriz[0][j];
        const submatriz = obtenerSubmatriz(matriz, 0, j); // Ya la usas
        const detSub = calcularDeterminante3x3(submatriz); // Ya la tienes
        const producto = elemento * detSub * (signo === '+' ? 1 : -1);

       pasos.push(`${signo} (${elemento}) × det:<br>${formatearSubmatriz(submatriz)} = <strong>${producto.toFixed(3)}</strong><br><br>`);
    }

    const total = calcularDeterminante4x4(matriz); // Tu función principal
    pasos.push(`<strong>✅ Determinante total: ${total.toFixed(6)}</strong>`);

    return pasos;
}

function formatearSubmatriz(submatriz) {
    let html = '<table class="submatriz">';
    for (const fila of submatriz) {
        html += '<tr>';
        for (const valor of fila) {
            html += `<td>${valor}</td>`;
        }
        html += '</tr>';
    }
    html += '</table>';
    return html;
}

function imprimirResolucion() {
    const matrizHTML = document.getElementById('contenedor-cuadricula-matriz').cloneNode(true);
    const resultadoHTML = document.getElementById('resultado-matriz').innerHTML;
    const pasosHTML = document.getElementById('pasos-resolucion').innerHTML;

    const ventana = window.open('', '_blank');
    ventana.document.write(`
        <html>
        <head>
            <title>Resolución de matriz 4x4</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; background-color: #fff; color: #000; }
                h2 { margin-top: 0; }
                .matriz { display: grid; grid-template-columns: repeat(4, 50px); gap: 5px; margin-top: 10px; }
                .matriz input { width: 50px; height: 30px; text-align: center; border: 1px solid #000; }
                .resultado, .pasos { margin-top: 20px; }
                table { border-collapse: collapse; margin-top: 10px; }
                td { border: 1px solid #000; padding: 5px; text-align: center; }
            </style>
        </head>
        <body>
            <h2>🔢 Determinante de Matriz 4x4</h2>
            <div class="matriz">${matrizHTML.innerHTML}</div>
            <div class="resultado"><strong>Resultado:</strong><br>${resultadoHTML}</div>
            <div class="pasos"><strong>Pasos de resolución:</strong><br>${pasosHTML}</div>
        </body>
        </html>
    `);
    ventana.document.close();
    ventana.focus();
    ventana.print();
}
