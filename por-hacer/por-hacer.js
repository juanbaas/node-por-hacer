const fs = require('fs');



let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });

}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json')
    } catch (error) {
        listadoPorHacer = [];
    }
}
const getListado = () => {
    cargarDB();
    return listadoPorHacer;

}


const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    //let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    //listadoPorHacer.splice(index, 1);
    //.filter: permite quitar o filtrar algún elemento en particular y esta función regresa un nuevo arreglo

    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    });

    if (listadoPorHacer === nuevoListado) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }


    guardarDB();
    return true;

}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();

    return porHacer;
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}