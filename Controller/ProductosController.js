const ProductosModel = require("../Models/ProductosModel")
const axios = require("../utils/axios")
const env = require("../utils/env")

module.exports = {
    migrarProductos: async ()=>{
        /* let Unidades = await ProductosModel.getUnidades()
        let Categorias = await ProductosModel.getCategorias()
        let Colores = await ProductosModel.getColores()
        let Productos = await ProductosModel.getProductos()
        let Lotes = await ProductosModel.getLotes() */
        console.log('User')
        //return
        let User = await axios.post(`/usuarios/login/`,{
            strIdUsuario:env.userBukapp,
            strClave:env.passwordBukapp
        })

        /* console.log(User.data) */
        console.log(Unidades)
        /* try {
            //console.log(User)
            let unidades = await axios.post(`/unidades/list`,{
                arrUnidades:Unidades.recordset
            },{
                headers:{
                    Authorization:`Bearer ${User.data.data.token}`,
                    auth:JSON.stringify({
                        usuario_id:User.data.data.id,
                        empresa_id:User.data.data.empresa_id
                    })
                }
            })
            let estilos = await axios.post(`/estilos/list`,{
                arrEstilos:Colores.recordset
            },{
                headers:{
                    Authorization:`Bearer ${User.data.data.token}`,
                    auth:JSON.stringify({
                        usuario_id:User.data.data.id,
                        empresa_id:User.data.data.empresa_id
                    })
                }
            })
            let categorias = await axios.post(`/parametro-producto-1/list`,{
                arrParametroProducto1:Categorias.recordset
            },{
                headers:{
                    Authorization:`Bearer ${User.data.data.token}`,
                    auth:JSON.stringify({
                        usuario_id:User.data.data.id,
                        empresa_id:User.data.data.empresa_id
                    })
                }
            })
            /* let disable = await axios.put(`/productos/disable`, {} ,{
                headers:{
                    Authorization:`Bearer ${User.data.data.token}`,
                    auth:JSON.stringify({
                        usuario_id:User.data.data.id,
                        empresa_id:User.data.data.empresa_id
                    })
                }
            }) */
            /* console.log(disable.data) 
            // return
            let ProductosBukapp = []
            for(const element of Productos.recordset){
                 let {
                    strIdProducto,
                    strDescripcion,
                    strClase,
                    strCodigoAlterno,
                    intPrecio1,
                    intPrecio2,
                    intPrecio3,
                    intPrecio4,
                    strDescripcionLarga,
                    strParam2,
                    strParametroTxt2,
                    categoria_producto_id,
                    //IntHabilitar,
                    IntHabilitarProd,
                    strUnidad,
                    IntPeso,
                    Strauxiliar,
                    strParam3,
                    StrMaterial
                } = element

                let unidad = await unidades.data.data.find(data => data.strIdUnidad == strUnidad)
                let clase = await categorias.data.data.find(data => data.strIdParametroProducto1==strClase)
                let ProductoBukapp = {
                    strIdProducto,
                    strDescripcion,
                    strCodigoAlterno,
                    intPrecio1,
                    intPrecio2,
                    intPrecio3,
                    intPrecio4,
                    //intPrecio5:Math.round(intPrecio1/4000),
                    intPrecio5:parseFloat( (intPrecio1*0.8) + intPrecio1).toFixed(2),
                    strDescripcionLarga,
                    strParametroTxt1:(strParam2?strParam2:''),
                    strParametroTxt2,
                    categoria_producto_id,
                    boolHabilitado:(IntHabilitarProd === 1 ?true:false),
                    unidad_id:unidad.id,
                    parametro_producto1_id:0,
                    parametro_producto2_id:0,
                    intPeso: IntPeso,
                    intCubicaje:0,
                    intCantidadCaja:0,
                    intCantidadMinima:1,
                    intCantidadPresentacion:0,
                    strMaterial:StrMaterial,
                    strMedida:strParam3,
                    strCantidadPresentacion:Strauxiliar
                }

                ProductosBukapp.push(ProductoBukapp)

            }

            let productos = await axios.post(`/productos/list`,{
                arrProductos:ProductosBukapp
            },{
                headers:{
                    Authorization:`Bearer ${User.data.data.token}`,
                    auth:JSON.stringify({
                        usuario_id:User.data.data.id,
                        empresa_id:User.data.data.empresa_id
                    })
                }
            })
            console.log(productos)
            return
            let EstilosProductosBukapp = []
            for(const element of Lotes.recordset){
                let {
                    strProducto,
                    strColor
                } = element
                let estilopr = await estilos.data.data.find(data => data.strIdEstilo==strColor)
                let productopr = await productos.data.data.find(data => data.strIdProducto==strProducto)
                if(productopr && estilopr){
                    let LoteBukapp = {
                        producto_id:productopr.id,
                        estilo_id:estilopr.id
                    }
                    EstilosProductosBukapp.push(LoteBukapp)
                }
                
            }
            let estilosProductos = await axios.post(`/estilo-producto/list`,{
                arrEstilosProductos:EstilosProductosBukapp
            },{
                headers:{
                    Authorization:`Bearer ${User.data.data.token}`,
                    auth:JSON.stringify({
                        usuario_id:User.data.data.id,
                        empresa_id:User.data.data.empresa_id
                    })
                }
            })
            /* console.log({
                unidades:unidades.data.data,
                estilos:estilos.data.data,
                categorias:categorias.data.data,
                productos:productos.data.data,
                estilosProductos:estilosProductos.data.data
            }) */
        /*} catch (error) {
            console.log(error)
            console.log('error')
        } */
    }
}