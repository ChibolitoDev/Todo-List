const { green } = require('colors');
const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            },
        ]
    }
];

const inquirerMenu = async () => {

    console.clear();

    console.log('==========');
    console.log('Opciones');
    console.log('==========\n');

    const { opcion } = await inquirer.prompt(questions);

    return opcion;
}

const pausa = async () => {

    const question = [{
        type: 'input',
        name: 'enter',
        message: `Presione ${'ENTER'.green} para continuar`
    }];

    await inquirer.prompt(question);
}

const leerInput = async (message) => {
    const questionIn = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Porfavor ingrese un valor ';
                }
                return true;
            }
        }
    ]
    const { desc } = await inquirer.prompt(questionIn);

    return desc

}

const listTareasDelete = async (tareas = []) => {
    const choices = Object.keys(tareas._list).map((tarea, index) => {
        return {
            value: tarea,
            name: `${index + 1} ${tareas._list[tarea].desc}`
        }
    })
    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    })
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas);

    return id;
}

const listTareasComplete = async (tareas = []) => {

    const choices = Object.keys(tareas._list).map((tarea, index) => {
        return {
            value: tarea,
            name: `${index + 1} ${tareas._list[tarea].desc}`,
            checked: (tareas._list[tarea].completadoEn) ? true : false
        }
    })

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(pregunta);

    return ids;
}

const confirm = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);

    return ok;

}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listTareasDelete,
    confirm,
    listTareasComplete
}