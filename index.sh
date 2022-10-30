# Utilizando Mongo Shell, crear una base de datos llamada ecommerce que contenga dos colecciones: mensajes y productos

use ecommerce

db.createCollection('mensajes')
db.createCollection('productos')

# Punto 1
# Agregar 10 documentos con valores distintos a las colecciones mensajes y productos
# El formato de los documentos debe estar en correspondencia con el que venimos utilizando
# en el entregable con base de datos en MariaDB.

db.mensajes.insertMany([
    {
        id: 1,
        username: "Paul_Rudd",
        time: "03/02/2022 - 10:30:15",
        text: "Good morning, I'm interested in one HVAC system, which one do you recommend me?"
    },
    {
        id: 2,
        username: "Jonathan_Majors",
        time: "11/02/2022 - 14:26:50",
        text: "Hi! I want five minisplit units, do you have these in stock?"
    },
    {
        id: 3,
        username: "Evangeline_Lilly",
        time: "13/03/2022 - 17:13:27",
        text: "Good afternoon, do you have any telephone number? I need to contact you."
    },
    {
        id: 4,
        username: "Michael_Pena",
        time: "14/05/2022 - 08:08:16",
        text: "Excelent service!"
    },
    {
        id: 5,
        username: "Michael_Douglas",
        time: "05/07/2022 - 14:44:48",
        text: "I'm upset about the last equiment I purchased."
    },
    {
        id: 6,
        username: "Michel_Pfeiffer",
        time: "10/07/2022 - 10:10:10",
        text: "Thank you for your services!"
    },
    {
        id: 7,
        username: "Kathryn_Newton",
        time: "27/08/2022 - 07:27:08",
        text: "Which brand do you recommend me?"
    },
    {
        id: 8,
        username: "Bill_Murray",
        time: "17/09/2022 - 19:11:32",
        text: "Really expensive."
    },
        {
        id: 9,
        username: "Randall_Park",
        time: "21/11/2022 - 02:55:42",
        text: "I need one HVAC system for my bedroom, which type should I purchase?"
    },
    {
        id: 10,
        username: "David_Dastmalchian",
        time: "03/12/2022 - 12:12:35",
        text: "LOL"
    }
])

# Punto 2
# Definir las claves de los documentos en relación a los campos de las tablas de esa base
# En el caso de los productos, poner valores al campo entre los 100 y 5000 pesos (eligiendo
# valores intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990).

db.productos.insertMany([
    {
        id: 1,
        title: "Minisplit ON/OFF (1 TR)",
        price: 120,
        thumbnail: "https://cdn2.iconfinder.com/data/icons/ventilation-1/500/yul950_36_wall_air_conditioner_bottom_icon_outline_vector-512.png"
    },
    {
        id: 2,
        title: "Minisplit Inverter (1 TR)",
        price: 580,
        thumbnail: "https://cdn2.iconfinder.com/data/icons/ventilation-1/500/yul950_36_wall_air_conditioner_bottom_icon_outline_vector-512.png"
    },
    {
        id: 3,
        title: "Split Cassette (3 TR)",
        price: 900,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/196-car-supplies-and-parts-for-repair-outline/64/car_fan_radiator_cooling_service_system_air_conditioner_cold-512.png"
    },
    {
        id: 4,
        title: "Split Cassette (4 TR)",
        price: 1280,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/196-car-supplies-and-parts-for-repair-outline/64/car_fan_radiator_cooling_service_system_air_conditioner_cold-512.png"
    },
    {
        id: 5,
        title: "Split Cassette (5 TR)",
        price: 1700,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/196-car-supplies-and-parts-for-repair-outline/64/car_fan_radiator_cooling_service_system_air_conditioner_cold-512.png"
    },
    {
        id: 6,
        title: "Air Handler Unit (3 TR)",
        price: 2300,
        thumbnail: "https://cdn0.iconfinder.com/data/icons/energy-11/512/air_conditioner-512.png"
    },
    {
        id: 7,
        title: "Air Handler Unit (4 TR)",
        price: 2860,
        thumbnail: "https://cdn0.iconfinder.com/data/icons/energy-11/512/air_conditioner-512.png"
    },
    {
        id: 8,
        title: "Air Handler Unit (5 TR)",
        price: 3350,
        thumbnail: "https://cdn0.iconfinder.com/data/icons/energy-11/512/air_conditioner-512.png"
    },
    {
        id: 9,
        title: "Packaged HVAC System (3 TR)",
        price: 4320,
        thumbnail: "https://cdn0.iconfinder.com/data/icons/energy-11/512/air_conditioner-512.png"
    },
    {
        id: 10,
        title: "Packaged HVAC System (5 TR)",
        price: 4990,
        thumbnail: "https://cdn0.iconfinder.com/data/icons/energy-11/512/air_conditioner-512.png"
    }    
])

# Punto 3
# Listar todos los documentos en cada colección.

db.mensajes.find().toArray()
db.productos.find().toArray()

# Punto 4
# Mostrar la cantidad de documentos almacenados en cada una de ellas.

db.mensajes.estimatedDocumentCount()
db.productos.estimatedDocumentCount()

# Punto 5
# Realizar un CRUD sobre la colección de productos:
#   a) Agregar un producto más en la colección de productos.

db.productos.insertOne({
        id: 11,
        title: "VRV ODU (20 TR)",
        price: 2999,
        thumbnail: "https://cdn2.iconfinder.com/data/icons/ventilation-1/500/yul950_36_wall_air_conditioner_bottom_icon_outline_vector-512.png"
})

#   b) Realizar una consulta por nombre de producto específico:
#       i) Listar los productos con precio menor a 1000 pesos.

db.productos.find({price: {$lt: 1000}})

#       ii) Listar los productos con precio entre los 1000 a 3000 pesos.

db.productos.find({$and: [{price: {$gt: 1000}}, {price: {$lt: 3000}}]})

#       iii) Listar los productos con precio mayor a 3000 pesos.

db.productos.find({price: {$gt: 3000}})

#       iv) Realizar una consulta que traiga sólo el nombre del tercer producto más barato.

db.productos.find({}, {title: 1, _id: 0}).sort({price: 1}).skip(2).limit(1)

#   c) Hacer una actualización sobre todos los productos, agregando el campo stock a todos
#      ellos con un valor de 100.

db.productos.updateMany({}, {$set: {stock: 100}}, {upsert: true})

#   d) Cambiar el stock a cero de los productos con precios mayores a 4000 pesos.

db.productos.updateMany({price: {$gt: 4000}}, {$set: {stock: 0}}, {upsert: false} )

#   e) Borrar los productos con precio menor a 1000 pesos.

db.productos.deleteMany({price: {$lt: 1000}})

# Punto 6
# Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce.
# Verificar que pepe no pueda cambiar la información.

use admin
db.createUser({user: "pepe", pwd: "asd456", "roles": [{role: "read", db: "ecommerce"}]})
db.adminCommand({shutdown: 1})
exit
mongosh -u "pepe" -p asd456