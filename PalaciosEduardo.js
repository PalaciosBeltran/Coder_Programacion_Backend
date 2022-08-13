class Usuario{  
    constructor(name, lastName, books, pets){
      this.nombre = name;
      this.apellido = lastName;
      this.libros = books;
      this.mascotas = pets;    
    }
    
    getFullName(){
      return `${this.nombre} ${this.apellido}`;   
    }

    addMascota(newPet){
      this.mascotas.push(newPet);
    }

    countMascotas(){
      return this.mascotas.length;        
    }

    addBook(name, writer){
      this.libros.push({nombre: name, autor: writer});
    }

    getBookNames(){
      let bookNames = [];
      this.libros.forEach(function(element){
        bookNames.push(element.nombre);
      });        
      return bookNames; 
    }
  }

  const usuario = new Usuario("Eduardo", "Palacios", [{nombre: "La Iliada", autor: "Homero"},{nombre: "Cien años de soledad", autor: "Gabriel García Márquez"}, {nombre: "Hunger Games", autor: "Suzanne Collins"}], ["Mota","Negra","Pelusa"]);
  
  const nombreCompleto = usuario.getFullName();
  console.log(nombreCompleto);
  
  const nuevaMascota = "Sharon";
  usuario.addMascota(nuevaMascota);
  console.log(usuario.mascotas);

  console.log(usuario.countMascotas());

  usuario.addBook("Álgebra", "Aurelio Baldor");
  console.log(usuario.libros);

  const libros = usuario.getBookNames();
  console.log(libros);
  


