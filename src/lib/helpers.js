const bcrypt = require('bcryptjs');
const helpers = {};

helpers.encryptPassword = async (document) => {
   const salt = await bcrypt.genSalt(10); //Genera un patron
   const hash = await bcrypt.hash(document,salt); // Dato cifrado a retornar
   return hash;
};

helpers.matchPassword = async (document,savedDocument) => {
    try {
        return await bcrypt.compare(document,savedDocument);        
    } catch (error) {
        console.log(e);
    }
}; // Comparar password

module.exports = helpers;