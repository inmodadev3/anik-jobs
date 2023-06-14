const connection = require("../utils/sql")

module.exports = {
    getProductos: async ()=>{
        try{
            const conn = await connection.connect()
            let Productos = await conn.query(`
                select TblProductos.strIdProducto,TblProductos.strDescripcion, strClase, strCodAlterno as strCodigoAlterno,CAST(TblProductos.IntPrecio1 AS int) AS intPrecio1,
                CAST(TblProductos.IntPrecio2 as int) AS intPrecio2,CAST(TblProductos.IntPrecio3 AS INT)AS intPrecio3,CAST(TblProductos.IntPrecio4 AS INT)AS intPrecio4,
                (select '' ) as strDescripcionLarga,(select '') as strParametroTxt1,(select '') as strParametroTxt2,IntHabilitar,IntHabilitarProd,UPPER(TblPresentacion.StrUnidad) as strUnidad, strParam2,IntPeso,Strauxiliar,strParam3,TblProdParametro2.StrDescripcion as StrMaterial from TblProductos 
                inner join TblPresentacion on TblProductos.StrIdProducto = TblPresentacion.StrProducto
                inner join TblProdParametro2 on TblProdParametro2.StrIdPParametro = TblProductos.StrPParametro2
                where TblPresentacion.StrUnidad = TblProductos.strUnidad 
            `)
            conn.close() 
            return (Productos)
        }catch(e){
            return (e)
        }
    },
    getCategorias: async ()=>{
        try{
            
            const conn = await connection.connect()
            let TiposTerceros = await conn.query(`
                select StrIdClase as strIdParametroProducto1,strDescripcion from TblClases where IntTipo in (0,2)
            `)
            conn.close() 
            return (TiposTerceros)
        }catch(e){
            return (e)
        }
    },
    getColores: async ()=>{
        try{
            const conn = await connection.connect()
            let Colores = await conn.query(`
                select StrIdColor as strIdEstilo, strDescripcion from TblColores
            `)
            conn.close() 
            return (Colores)
        }catch(e){
            return (e)
        }
    },
    getUnidades: async ()=>{
        try{
            const conn = await connection.connect()
            let Unidades = await conn.query(`
                select strIdUnidad ,strDescripcion from tblunidades
            `)
            conn.close() 
            return (Unidades)
        }catch(e){
            return (e)
        }
    },
    getLotes: async ()=>{
        try{
            const conn = await connection.connect()
            let Unidades = await conn.query(`
                select strProducto,strColor from tbllotes
            `)
            conn.close() 
            return (Unidades)
        }catch(e){
            return (e)
        }
    }
}