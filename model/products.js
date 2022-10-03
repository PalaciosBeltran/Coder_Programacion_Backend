const products = [
    {
        title: "Minisplit ON/OFF (1 TR)",
        price: 200,
        thumbnail: "https://cdn2.iconfinder.com/data/icons/ventilation-1/500/yul950_36_wall_air_conditioner_bottom_icon_outline_vector-512.png",
        id: 1
    },
    {
        title: "Minisplit Inverter (1 TR)",
        price: 300,
        thumbnail: "https://cdn2.iconfinder.com/data/icons/ventilation-1/500/yul950_36_wall_air_conditioner_bottom_icon_outline_vector-512.png",
        id: 2
    },
    {
        title: "Split Cassette (3 TR)",
        price: 1000,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/196-car-supplies-and-parts-for-repair-outline/64/car_fan_radiator_cooling_service_system_air_conditioner_cold-512.png",
        id: 3
    },
    {
        title: "Split Cassette (4 TR)",
        price: 1200,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/196-car-supplies-and-parts-for-repair-outline/64/car_fan_radiator_cooling_service_system_air_conditioner_cold-512.png",
        id: 4
    },
    {
        title: "Split Cassette (5 TR)",
        price: 1400,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/196-car-supplies-and-parts-for-repair-outline/64/car_fan_radiator_cooling_service_system_air_conditioner_cold-512.png",
        id: 5
    },
    {
        title: "Air Handler Unit (3 TR)",
        price: 2000,
        thumbnail: "https://cdn0.iconfinder.com/data/icons/energy-11/512/air_conditioner-512.png",
        id: 6
    },
    {
        title: "Air Handler Unit (4 TR)",
        price: 2200,
        thumbnail: "https://cdn0.iconfinder.com/data/icons/energy-11/512/air_conditioner-512.png",
        id: 7
    },
    {
        title: "Air Handler Unit (5 TR)",
        price: 2400,
        thumbnail: "https://cdn0.iconfinder.com/data/icons/energy-11/512/air_conditioner-512.png",
        id: 8
    }
  ]
  
  class Products{
      constructor(){
          this.products = products;
      }
  
      getAll(){
        return this.products;
      }
  
      async save(prod){
          const { title, price, thumbnail } = prod;
          if ( !title || !price || !thumbnail ) return { error: 'Formato de cuerpo incorrecto' }
          const newProduct = {      
            title,
            price,
            thumbnail,
            id: this.products.length + 1,
          };
          this.products.push(newProduct);
          return newProduct;
      }
  }
  
  module.exports = Products;