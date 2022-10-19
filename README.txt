# Desafío Entregable 7
# Clase 16
# Bases de Dato SQL / MariaDB / SQLite 

***

Descripción

> Repositorio correspondiente al desafío entregable número 7 de la clase 16
del curso Backend de CoderHouse.
> Ejercicios con persistencia de la información en bases de datos mediante el
uso de SQLite3 y MariaDB.

***

Requisitos

> VisualStudio Code
> Nodejs
> XAMPP
> MySQL Workbench

***

Instalación

> Iniciar proyecto e instalar carpeta "node_modules" mediante secuencia "npm innit --y" en la terminal.

> Crear database en MariaDB con el nombre "desafioentregable16" para persistencia de productos haciendo 
uso de  MySQL Workbench.
>> Ejecutar XAMPP e iniciar módulo MySQL.
>> Ejecutar MySQL Workbench.
>> En MySQL Workbench ejecutar la sentencia: "CREATE DATABASE desafioentregable16".
>> En MySQL Workbench ejecutar la sentencia: "USE DATABASE desafioentregable16".
>> Crear tabla de productos mediante la migración con la secuencia "npm run migrate" en la terminal.

> Ejecutar secuencia "npm run start" para la vista del ecommerce en la dirección "http://localhost:8080/"

> Para verificar persistencia de los datos, utilizar MySQL Workbench (para la tabla de productos) y  la extensión
SQLite para VSCode (para la tabla de mensajería).
