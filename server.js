const express = require('express')
const path = require('path')
const app = express()
const http = require('http')
const mysql = require('mysql')

// Rutas de la aplicación

app.post('/',(req,res)=>{
    res.sendFile('./public/index.html',{
        root: __dirname,
    })
})

app.use(express.static('public'))

app.get('/verificar/:cedula',function(req,res){
    let cedula = req.params.cedula
    comprobar(cedula)
    res.redirect('/')
})
app.get('/quitarReporte/:cedula',function(req,res){
    let name = req.params.nombre
    let cedula = req.params.cedula
    actualizarEstadoToFalse(cedula)
    res.redirect('/')
})

app.get('/agregar/:nombre/:cedula/:libro',function(req,res){
    let nombre = req.params.nombre
    let cedula = req.params.cedula
    let libro = req.params.libro
    console.log(nombre,cedula);
    existencia(cedula,nombre,libro)
    agregarReporte(nombre,cedula)
    res.redirect('/')
})

app.set('port', process.env.PORT || 3000)
 app.set('public',path.join(__dirname,'./public'))
 app.listen(app.get('port'),()=>{
     console.log("corriendo");
 })

// Conexión a la base de datos

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'Hugo',
    password: 'Hugo',
    database: 'users'
})

const conectar = () => {
    pool.getConnection((err, connection) => {
        if (err) {
            throw new Error('Error al conectar:', err)
            return
        }
        console.log('Conexión exitosa')
        connection.release()
    })
}

// Funciones, y consultas a mysql

const agregarReporte  = (nombreGuardado,cedulaGuardada  ) =>{
    const sql = `INSERT INTO usuarios (Id,Nombre,Cedula,Reportado) VALUES (${null},"${nombreGuardado}",${cedulaGuardada},${false}) `
    pool.query(sql,function(err,result,fields){
        if (err) throw err
        console.log(result);
    })
    actualizarEstadoToTrue(cedulaGuardada)
}

const actualizarEstadoToTrue = (cedula)=>{
    const sql = `UPDATE usuarios SET Reportado = ${true} WHERE Cedula = ${cedula}`
    setTimeout(() => {
        pool.query(sql,function(err,result,fields){
            if (err) throw err
            console.log(result);
        })
        console.log("La persona con identificación ", cedula, " se le ha agregado el reporte");
    }, "60000");
}

const actualizarEstadoToFalse = (cedula,nombre)=>{
    const sql = `UPDATE usuarios SET Reportado = ${false} WHERE Cedula = ${cedula}`
    pool.query(sql,function(err,result,fields){
        if (err) throw err
        console.log(result)
    })
    console.log("La persona con identificación ", cedula, " se le ha quitado el reporte");
}

const existencia = (cedula , nombre,libro)=>{
    pool.query('SELECT * FROM usuarios WHERE cedula = ?', [cedula], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
                console.log('El usuario con la cédula ' + cedula + ' y nombre ' + nombre +  ' se le ha entregado el libro ' + libro);
                console.log("Después del tiempo límite establecido y dicho por nuestro asesor será reportado por no devolver el libro, esto ocurre automáticamente");
                actualizarEstadoToTrue(cedula)
        } else {
            console.log('El usuario con la cédula ' + cedula + ' no existe en la base de datos, y ha sido agregado');
        }
    }) 
}

const comprobar = (cedula)=>{
    const sql = ('SELECT Reportado FROM usuarios WHERE cedula = ?')
    pool.query(sql, [cedula], (error, results) => {
        if(error) throw error
        console.log(results);
        if (results.length > 0) {
            const reporte = results[0].Reportado
            if (reporte) {
                console.log("El usuario está reportado, y no se le puede prestar el libro, por favor devuelve el libro prestado para poder continuar");
            }else{
                console.log("El usuario no está reportado, por lo tanto puedes prestarle un libro");
            }
        }else{
            console.log("Usuario no encontrado, puedes prestarle un libro, se hará registro automáticamente cuándo se preste el libro");
        }
    })
}

