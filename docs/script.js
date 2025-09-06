
// ======================================================
// 🔹 INICIALIZACIÓN
// ======================================================

// Al cargar la página, se crean las entradas de la matriz 4x4
document.addEventListener('DOMContentLoaded', function () {
    crearEntradasMatriz();
});


// ======================================================
// 🔹 UTILIDADES GENERALES
// ======================================================

// Alterna el modo oscuro de la aplicación
function alternarModoOscuro() {
    document.body.classList.toggle('modo-oscuro');
}

// Cambia entre pantallas visibles
function mostrarPantalla(idPantalla) {
    // Ocultar todas las pantallas
    const todasLasPantallas = document.querySelectorAll('.pantalla');
    todasLasPantallas.forEach(pantalla => pantalla.classList.remove('activa'));

    // Mostrar la pantalla solicitada
    document.getElementById(idPantalla).classList.add('activa');
}

// Valida entradas numéricas (sin letras, ni caracteres extraños, ni negativos)
function validarEntrada(valorEntrada, nombreCampo) {
    const valorStr = String(valorEntrada).trim();

    if (valorStr === "") {
        throw new Error(`${nombreCampo} no puede estar vacío`);
    }
    if (/[a-zA-Z]/.test(valorStr)) {
        throw new Error(`No se permiten letras en ${nombreCampo}`);
    }
    if (/[^0-9.\-]/.test(valorStr)) {
        throw new Error(`No se permiten caracteres especiales en ${nombreCampo}`);
    }

    const numero = parseFloat(valorStr);
    if (isNaN(numero)) {
        throw new Error(`${nombreCampo} debe ser un número válido`);
    }
    if (numero <= 0) {
        throw new Error(`No se permiten números negativos en ${nombreCampo}`);
    }

    return numero;
}

// Muestra el resultado o un mensaje de error en el elemento correspondiente
function mostrarResultado(idElemento, textoResultado, mensajeError = null) {
    const elementoResultado = document.getElementById(idElemento);

    if (mensajeError) {
        elementoResultado.innerHTML = `<div class="error">${mensajeError}</div>`;
    } else {
        elementoResultado.innerHTML = textoResultado;
    }
}


// ======================================================
// 🔹 CÁLCULOS FIGURAS 2D
// ======================================================

// Círculo (área o perímetro)
function calcularCirculo2D(tipoOperacion) {
    try {
        const radio = validarEntrada(
            document.getElementById('entrada-radio-circulo').value,
            'Radio'
        );

        let resultado = 0;
        if (tipoOperacion === 'area') {
            resultado = Math.PI * radio * radio;
            mostrarResultado('resultado-circulo-2d', `Área: ${resultado.toFixed(4)} unidades²`);
        } else if (tipoOperacion === 'perimetro') {
            resultado = 2 * Math.PI * radio;
            mostrarResultado('resultado-circulo-2d', `Perímetro: ${resultado.toFixed(4)} unidades`);
        }
    } catch (error) {
        mostrarResultado('resultado-circulo-2d', null, error.message);
    }
}

// Cuadrado (área o perímetro)
function calcularCuadrado2D(tipoOperacion) {
    try {
        const lado = validarEntrada(
            document.getElementById('entrada-lado-cuadrado').value,
            'Lado'
        );

        let resultado = 0;
        if (tipoOperacion === 'area') {
            resultado = lado * lado;
            mostrarResultado('resultado-cuadrado-2d', `Área: ${resultado.toFixed(4)} unidades²`);
        } else if (tipoOperacion === 'perimetro') {
            resultado = 4 * lado;
            mostrarResultado('resultado-cuadrado-2d', `Perímetro: ${resultado.toFixed(4)} unidades`);
        }
    } catch (error) {
        mostrarResultado('resultado-cuadrado-2d', null, error.message);
    }
}

// Triángulo (área o perímetro)
function calcularTriangulo2D(tipoOperacion) {
    try {
        if (tipoOperacion === 'area') {
            const base = validarEntrada(
                document.getElementById('entrada-base-triangulo').value,
                'Base'
            );
            const altura = validarEntrada(
                document.getElementById('entrada-altura-triangulo').value,
                'Altura'
            );
            const resultado = (base * altura) / 2;
            mostrarResultado('resultado-triangulo-2d', `Área: ${resultado.toFixed(4)} unidades²`);
        } else if (tipoOperacion === 'perimetro') {
            const lado1 = validarEntrada(document.getElementById('entrada-lado1-triangulo').value, 'Lado 1');
            const lado2 = validarEntrada(document.getElementById('entrada-lado2-triangulo').value, 'Lado 2');
            const lado3 = validarEntrada(document.getElementById('entrada-lado3-triangulo').value, 'Lado 3');
            const resultado = lado1 + lado2 + lado3;
            mostrarResultado('resultado-triangulo-2d', `Perímetro: ${resultado.toFixed(4)} unidades`);
        }
    } catch (error) {
        mostrarResultado('resultado-triangulo-2d', null, error.message);
    }
}


// ======================================================
// 🔹 CÁLCULOS FIGURAS 3D
// ======================================================

// Esfera (área superficial o volumen)
function calcularEsfera(tipoOperacion) {
    try {
        const radio = validarEntrada(
            document.getElementById('entrada-radio-esfera').value,
            'Radio'
        );

        let resultado = 0;
        if (tipoOperacion === 'area') {
            resultado = 4 * Math.PI * radio * radio;
            mostrarResultado('resultado-esfera', `Área Superficial: ${resultado.toFixed(4)} unidades²`);
        } else if (tipoOperacion === 'volumen') {
            resultado = (4 / 3) * Math.PI * radio ** 3;
            mostrarResultado('resultado-esfera', `Volumen: ${resultado.toFixed(4)} unidades³`);
        }
    } catch (error) {
        mostrarResultado('resultado-esfera', null, error.message);
    }
}

// Cubo (área superficial o volumen)
function calcularCubo(tipoOperacion) {
    try {
        const arista = validarEntrada(
            document.getElementById('entrada-arista-cubo').value,
            'Arista'
        );

        let resultado = 0;
        if (tipoOperacion === 'area') {
            resultado = 6 * arista * arista;
            mostrarResultado('resultado-cubo', `Área Superficial: ${resultado.toFixed(4)} unidades²`);
        } else if (tipoOperacion === 'volumen') {
            resultado = arista ** 3;
            mostrarResultado('resultado-cubo', `Volumen: ${resultado.toFixed(4)} unidades³`);
        }
    } catch (error) {
        mostrarResultado('resultado-cubo', null, error.message);
    }
}

// Cilindro (área superficial o volumen)
function calcularCilindro(tipoOperacion) {
    try {
        const radio = validarEntrada(
            document.getElementById('entrada-radio-cilindro').value,
            'Radio'
        );
        const altura = validarEntrada(
            document.getElementById('entrada-altura-cilindro').value,
            'Altura'
        );

        let resultado = 0;
        if (tipoOperacion === 'area') {
            resultado = 2 * Math.PI * radio * (radio + altura);
            mostrarResultado('resultado-cilindro', `Área Superficial: ${resultado.toFixed(4)} unidades²`);
        } else if (tipoOperacion === 'volumen') {
            resultado = Math.PI * radio * radio * altura;
            mostrarResultado('resultado-cilindro', `Volumen: ${resultado.toFixed(4)} unidades³`);
        }
    } catch (error) {
        mostrarResultado('resultado-cilindro', null, error.message);
    }
}


// ======================================================
// 🔹 MATRICES 4x4
// ======================================================

// Crear inputs de la matriz 4x4
function crearEntradasMatriz() {
    const contenedor = document.getElementById('contenedor-cuadricula-matriz');
    contenedor.innerHTML = '';

    // Limpiar mensajes previos
    mostrarResultado('resultado-matriz', '');

    for (let i = 0; i < 16; i++) {
        const input = document.createElement('input');
        input.className = 'entrada-matriz';
        input.step = '0.1';
        input.placeholder = '0';
        input.id = `entrada-matriz-${i}`;

        // Validación en tiempo real
        input.addEventListener('input', function () {
            const valor = this.value;

            if (/[a-zA-Z]/.test(valor)) {
                mostrarResultado('resultado-matriz', null, `No se permiten letras en la posición ${i + 1}`);
                this.value = valor.replace(/[a-zA-Z]/g, '');
                return;
            }
            if (/[^0-9.\-]/.test(valor)) {
                mostrarResultado('resultado-matriz', null, `No se permiten caracteres especiales en la posición ${i + 1}`);
                this.value = valor.replace(/[^0-9.\-]/g, '');
                return;
            }

            mostrarResultado('resultado-matriz', '');
        });

        contenedor.appendChild(input);
    }
}

// Limpia las entradas y resultados de la matriz
function limpiarEntradasMatriz() {
    for (let i = 0; i < 16; i++) {
        const campo = document.getElementById(`entrada-matriz-${i}`);
        if (campo) campo.value = '';
    }

    mostrarResultado('resultado-matriz', '');

    const contenedorPasos = document.getElementById('pasos-resolucion');
    if (contenedorPasos) {
        contenedorPasos.style.display = 'none';
        contenedorPasos.innerHTML = '';
    }
}

// Obtiene los valores de la matriz como un array 4x4
function obtenerValoresMatriz() {
    const matriz = [];

    for (let fila = 0; fila < 4; fila++) {
        matriz[fila] = [];
        for (let col = 0; col < 4; col++) {
            const valor = document.getElementById(`entrada-matriz-${fila * 4 + col}`).value;
            matriz[fila][col] = valor === '' ? 0 : parseFloat(valor);
        }
    }

    return matriz;
}

// Calcula el determinante de la matriz 4x4
function calcularDeterminante() {
    try {
        const matriz = obtenerValoresMatriz();
        const resultado = calcularDeterminante4x4(matriz);
        mostrarResultado('resultado-matriz', `Determinante: ${resultado.toFixed(6)}`);
    } catch (error) {
        mostrarResultado('resultado-matriz', null, 'Error en el cálculo del determinante');
    }
}

// Determinante 4x4 por expansión de cofactores
function calcularDeterminante4x4(matriz) {
    return (
        matriz[0][0] * calcularDeterminante3x3([
            [matriz[1][1], matriz[1][2], matriz[1][3]],
            [matriz[2][1], matriz[2][2], matriz[2][3]],
            [matriz[3][1], matriz[3][2], matriz[3][3]]
        ]) -
        matriz[0][1] * calcularDeterminante3x3([
            [matriz[1][0], matriz[1][2], matriz[1][3]],
            [matriz[2][0], matriz[2][2], matriz[2][3]],
            [matriz[3][0], matriz[3][2], matriz[3][3]]
        ]) +
        matriz[0][2] * calcularDeterminante3x3([
            [matriz[1][0], matriz[1][1], matriz[1][3]],
            [matriz[2][0], matriz[2][1], matriz[2][3]],
            [matriz[3][0], matriz[3][1], matriz[3][3]]
        ]) -
        matriz[0][3] * calcularDeterminante3x3([
            [matriz[1][0], matriz[1][1], matriz[1][2]],
            [matriz[2][0], matriz[2][1], matriz[2][2]],
            [matriz[3][0], matriz[3][1], matriz[3][2]]
        ])
    );
}

// Determinante 3x3 (regla de Sarrus)
function calcularDeterminante3x3(matriz) {
    return (
        matriz[0][0] * (matriz[1][1] * matriz[2][2] - matriz[1][2] * matriz[2][1]) -
        matriz[0][1] * (matriz[1][0] * matriz[2][2] - matriz[1][2] * matriz[2][0]) +
        matriz[0][2] * (matriz[1][0] * matriz[2][1] - matriz[1][1] * matriz[2][0])
    );
}


// ======================================================
// 🔹 PASOS DE RESOLUCIÓN MATRIZ
// ======================================================

// Obtiene submatriz excluyendo fila y columna
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

// Muestra los pasos de la resolución del determinante
function mostrarPasosResolucion() {
    try {
        const matriz = obtenerValoresMatriz();
        const pasos = resolverDeterminantePasoAPaso(matriz);
        const contenedor = document.getElementById('pasos-resolucion');

        contenedor.innerHTML = pasos.join('<br>');
        contenedor.style.display = 'block';
    } catch (error) {
        mostrarResultado('resultado-matriz', null, error.message);
    }
}

// Resuelve el determinante paso a paso (expansión de la primera fila)
function resolverDeterminantePasoAPaso(matriz) {
    const pasos = [];

    pasos.push('🔍 Resolviendo determinante de matriz 4x4 por expansión de la primera fila:');

    for (let j = 0; j < 4; j++) {
        const signo = (j % 2 === 0) ? '+' : '−';
        const elemento = matriz[0][j];
        const submatriz = obtenerSubmatriz(matriz, 0, j);
        const detSub = calcularDeterminante3x3(submatriz);
        const producto = elemento * detSub * (signo === '+' ? 1 : -1);

        pasos.push(`${signo} (${elemento}) × det:<br>${formatearSubmatriz(submatriz)} = <strong>${producto.toFixed(3)}</strong><br><br>`);
    }

    const total = calcularDeterminante4x4(matriz);
    pasos.push(`<strong>✅ Determinante total: ${total.toFixed(6)}</strong>`);

    return pasos;
}

// Devuelve la submatriz en formato HTML (tabla)
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

// Imprime los pasos de resolución en la misma pestaña
function imprimirResolucion() {
    const matriz = document.querySelectorAll('#contenedor-cuadricula-matriz input');
    const resultadoHTML = document.getElementById('resultado-matriz').innerHTML;
    const pasosHTML = document.getElementById('pasos-resolucion').innerHTML;

    // Construir tabla de matriz con valores ingresados
    let matrizHTML = '<table>';
    for (let i = 0; i < matriz.length; i++) {
        if (i % 4 === 0) matrizHTML += '<tr>';
        matrizHTML += `<td>${matriz[i].value || '-'}</td>`;
        if (i % 4 === 3) matrizHTML += '</tr>';
    }
    matrizHTML += '</table>';

    // Crear contenedor oculto para impresión
    const imprimirDiv = document.createElement('div');
    imprimirDiv.id = 'area-impresion';
    imprimirDiv.innerHTML = `
        <h2>🔢 Determinante de Matriz 4x4</h2>
        <div class="matriz">${matrizHTML}</div>
        <div class="resultado"><strong>Resultado:</strong><br>${resultadoHTML}</div>
        <div class="pasos"><strong>Pasos de resolución:</strong><br>${pasosHTML}</div>
    `;

    // Agregar al body temporalmente
    document.body.appendChild(imprimirDiv);

    // Estilos solo para impresión
    const estilos = document.createElement('style');
    estilos.innerHTML = `
        @media print {
            body * { visibility: hidden; }
            #area-impresion, #area-impresion * { visibility: visible; }
            #area-impresion { position: absolute; left: 0; top: 0; width: 100%; }
            table { border-collapse: collapse; margin-top: 10px; }
            td { border: 1px solid #000; padding: 5px; text-align: center; }
        }
    `;
    imprimirDiv.appendChild(estilos);

    // Ejecutar impresión
    window.print();

    // Eliminar el div de impresión después
    document.body.removeChild(imprimirDiv);
}
