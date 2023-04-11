const axios = require('axios');

class PetStore {
    constructor() {
        this.baseUrl = 'https://petstore.swagger.io/v2';
        this.userData = {};
        this.petStoreSold = {};
    }

    async createUser() {
        try {
            const response = await axios.post(`${this.baseUrl}/user`, {
                username: 'Jesus',
                firstName: 'Ferrer',
                lastName: 'Galan',
                phone: '655555555',
                email: 'jesusferrergalan@gmail.com',
                password: '123456abschgd',
            });
            this.userData = response.data;

        } catch (error) {
            console.error(error);
        }
    }

    async getPetStore() {
        try {
            const response = await axios.get(`${this.baseUrl}/pet/findByStatus?status=sold`);
            const petStoreSold = response.data.filter(pet => pet.status === 'sold');
            petStoreSold.forEach(pet => {
                const { id, name } = pet;
                if (!this.petStoreSold.hasOwnProperty(name)) {
                    this.petStoreSold[name] = 1;
                } else {
                    this.petStoreSold[name]++;
                }
            });

        } catch (error) {
            console.error(error);
        }
    }

    countDuplicatePets() {
        const duplicateNames = {};
        for (let name in this.petStoreSold) {
            if (this.petStoreSold[name] > 1) {
                duplicateNames[name] = this.petStoreSold[name];
            }
        }
        return duplicateNames;
    }
}

const petStore = new PetStore();
petStore.createUser()
    .then(() => petStore.getPetStore())
    .then(() => console.table(petStore.countDuplicatePets()));
