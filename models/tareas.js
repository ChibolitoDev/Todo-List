const ListPrompt = require("inquirer/lib/prompts/list");
const Tarea = require("./tarea");

class Tareas {
    _list = {};

    get listArr() {
        const list = [];

        Object.keys(this._list).forEach((key) => {
            const tarea = this._list[key];
            list.push(tarea);
        });

        return list;
    }

    constructor() {
        this._list = {};
    }

    borrarTarea(id = '') {
        if (this._list[id]) {
            delete this._list[id];
        }
    }

    loadTareas(tareas = []) {
        this._list = tareas;
    }

    createTarea(desc = "") {
        const tarea = new Tarea(desc);
        this._list[tarea.id] = tarea;
    }

    ListTareas() {
        this.listArr.forEach((element, i) => {
            const { desc, completadoEn } = element
            if (completadoEn == null) {
                console.log(`${(i + 1).toString().red}. ${desc} :: ${'Incompleto'.red}`)
            }
            else {
                console.log(`${(i + 1).toString().green}. ${desc} :: ${'Completado'.green} `)
            }
        });
    }
    ListTareasCompleted() {
        this.listArr.forEach((element, i) => {
            const { desc, completadoEn } = element
            if (completadoEn != null) {
                console.log(`${(i + 1).toString().green}. ${desc} :: ${completadoEn.green} `)
            }
        });
    }

    ListTareasPendientes() {
        this.listArr.forEach((element, i) => {
            const { desc, completadoEn } = element
            if (completadoEn == null) {
                console.log(`${(i + 1).toString().red}. ${desc} :: ${'Incompleto'.red}`)
            }
        });
    }

    toggleCompleted(ids = []) {
        ids.forEach(id => {
            const tarea = this._list[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });
        this.listArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._list[tarea.id].completadoEn = null
            }
        });
    }
}

module.exports = Tareas;
