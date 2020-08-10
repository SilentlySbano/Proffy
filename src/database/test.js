const Database = require('./db')
const createProffy = require("./createProffy")
Database.then(async (db) => {
    // inserir dados
    proffyValue = {
        name: "Ivan Sbano",
        avatar: "https://avatars2.githubusercontent.com/u/53979311?s=460&u=21ad211835740211874720c0fa13287674f1b374&v=4", 
        whatsapp: "019995831804",
        bio: "Entusiasta das melhores tecnologias de química avançada.Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões."
        
    }

    classValue = {
        subject: 1,
        cost: "20,00"
        //o proffy id vira pelo banco de dados

    }

    classScheduleValues = [
        //class_id vira pelo banco de dados, apos cadastrar a class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 2220
        }
    ]

    //await createProffy(db, {proffyValue, classValue, classScheduleValues})

    //consultar dados inseridos

    //todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectedProffys)

    //consultar as classes de um determinado professor e trazer junto os dados do professor
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    // console.log(selectClassesAndProffys)

    //o horario que a pessoa trabalha, por exemplo, e das 8h ate as 18h, o horario do time_from (8h) precisa ser antes ou igual ao horario solicitado
    //o time_to precisa ser acima
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "1300"
        AND class_schedule.time_to > "1300"
    `)
    // console.log(selectClassesSchedules)

})