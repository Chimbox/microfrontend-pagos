const express = require('express');

const app=express();


app.use(express.static(__dirname + '/public'));

app.listen(3005, ()=>{
    console.log('Servidor corriendo en el puerto 3005');
});