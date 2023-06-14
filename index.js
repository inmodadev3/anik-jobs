var cron = require('node-cron');
var Excel = require('exceljs');
let TercerosController = require('./Controller/TercerosController')
let ProductosController = require('./Controller/ProductosController');
const axios = require('./utils/axios');

/* cron.schedule('0 0/1 * * *',  async () => {
    
}); */
const main = async  ()=>{
    console.log('init')
    //await TercerosController.migrarTerceros()
    await ProductosController.migrarProductos()
    //await activarProductosFromExcel()
}

/* const consultahgi = ()=>{
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile('./clientes.xlsx').then(async function(workbook){
        var worksheet = workbook.getWorksheet(1);
        let rows = worksheet.getRows(1,worksheet.rowCount)
        for(const row of rows){
            try {
                const conn = await connection.connect()
                let consulta = await conn.query(`update tblterceros set StrParametro1 = '${row.values[6]}' where stridTercero = '${row.values[1]}'`)
                console.log(`update tblterceros set StrParametro1 = '${row.values[6]}' where stridTercero = '${row.values[1]}'`)
                console.log(consulta)
                await conn.close()
            } catch (error) {
                console.log(error)
                await sleep(60000);
            }
        }
    });
} */
/* const activarProductosFromExcel = ()=>{
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile('./productos.xlsx').then(async function(workbook){
        var worksheet = workbook.getWorksheet(2);
        //console.log(workbook)
        let rows = worksheet.getRows(1,worksheet.rowCount)
        let arrProductos = [ ]
        //console.log(rows)
        for(const row of rows){
            try {
               arrProductos.push({
                   id:row.values[2]
               })
            } catch (error) {
                console.log(error)
                await sleep(60000);
            }
        }
        console.log(arrProductos)
        axios.post(`/productos/activar`,{
            arrProductos
        }).then((response)=>{
            console.log(response.data)
        }).catch((err)=>{
            console.log(err)
        })
    });
} */
main()
//activarProductosFromExcel()