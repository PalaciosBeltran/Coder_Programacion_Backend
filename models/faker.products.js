const { faker } = require('@faker-js/faker');
faker.locale = 'en';

const createFakeProducts = () => {
    return {
        title: faker.commerce.product(),
        price: faker.commerce.price(100, 3000),
        thumbnail: faker.image.abstract()
    }
}

module.exports = { createFakeProducts };