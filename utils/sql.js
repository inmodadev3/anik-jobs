const sql = require('mssql');

module.exports = {
    connect: async()=>  {
        try {
            //Hacer conexión HGI
            return await sql.connect('Server={192.168.1.127\\SQLEXPRESS};Database=INMODANET;User Id=Hgi;Password=Hgi;Encrypt=false;');
        } catch (err) {
            console.log(err);
        }
    }
}
