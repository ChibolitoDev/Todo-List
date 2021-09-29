const { inquirerMenu, pausa, leerInput, listTareasDelete, confirm, listTareasComplete } = require("./helpers/inquirer");
const { saveData, readData } = require("./helpers/saveFile");
const Tareas = require("./models/tareas");

require("colors");
console.clear();
const main = async () => {
    let opt = "";
    const tareas = new Tareas();
    const tareasDB = readData();
    if (tareasDB) {
        tareas.loadTareas(tareasDB);
    }
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case "1":
                const desc = await leerInput("Descripcion: ");
                tareas.createTarea(desc);
                saveData(tareas._list);
                break;
            case "2":
                tareas.ListTareas();
                break;
            case "3":
                tareas.ListTareasCompleted();
                break;
            case "4":
                tareas.ListTareasPendientes();
                break;
            case "5":
                const ids = await listTareasComplete(tareas);
                tareas.toggleCompleted(ids);
                saveData(tareas._list);
                break;
            case "6":
                const id = await listTareasDelete(tareas);
                if (id !== '0') {
                    const ok = await confirm('Estas seguro que desesa borrar?');
                    if (ok) {
                        tareas.borrarTarea(id);
                    }
                    saveData(tareas._list);
                }
                break;
            case "0":
                saveData(tareas._list);
                break;
        }

        await pausa();
    } while (opt !== "0");
};

main();
