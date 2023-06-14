const connection = require('../utils/sql')

module.exports = {
    getTerceros:(async ()=>{
        try{
            const conn = await connection.connect()
            let Terceros = await conn.query(`
                select strIdTercero, strApellido1,strApellido2,strNombre1,strNombre2, 
                strNombre,strDireccion,strTelefono,strCelular,StrMail as strEmail,
                strDato0 as strObservacion,IntTEstado as intEstado,strCiudad,intTipoTercero,strTipoId
                from tblTerceros
            `)
            conn.close() 
            
            return (Terceros)
        }catch(e){
            return (e)
        }
    }),
    getTiposTerceros: async ()=>{
       
            const conn = await connection.connect()
            let TiposTerceros = await conn.query(`
                select IntIdTipoTercero as strIdTipoTercero,strDescripcion,IntPrecio as intListaPrecio,(select 1) as empresa_id 
                from tbltipostercero
            `)
            conn.close() 
            return (TiposTerceros)
        
    },
    setOrigen: async (query)=>{
        
        const conn = await connection.connect()
        let TiposTerceros = await conn.query(query)
        conn.close() 
        return (TiposTerceros)
    }

}