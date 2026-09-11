function validarNombre(nombre) {
    const expresion = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/;
    return expresion.test(nombre);
}

function validarCorreo(correo) {
    const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresion.test(correo);
}

function generarId(listaAprendices) {
    let mayorId = 0;

    listaAprendices.forEach(aprendiz => {
        const id = Number(aprendiz.id || aprendiz.dni);

        if (!isNaN(id) && id > mayorId) {
            mayorId = id;
        }
    });

    return mayorId + 1;
}

module.exports = {
    validarNombre,
    validarCorreo,
    generarId
};