const TercerosModel = require('../Models/TercerosModel')
const axios  = require('../utils/axios')
const env = require('../utils/env')

module.exports = {
    migrarTerceros:async ()=>{
        
        let TiposTercero = await TercerosModel.getTiposTerceros()
        let User = await axios.post(`/usuarios/login/`,{
            strIdUsuario:env.userBukapp,
            strClave:env.passwordBukapp
        })
        if(User.data.success){
            try {
                let tiposTercero = await axios.post(`/tipos-tercero/list`,{
                    arrTiposTercero:TiposTercero.recordset
                },{
                    headers:{
                        Authorization:`Bearer ${User.data.data.token}`,
                        auth:JSON.stringify({
                            usuario_id:User.data.data.id,
                            empresa_id:User.data.data.empresa_id
                        })
                    }
                })
               
                let ciudades = await axios.get(`/ciudades/`,{
                    headers:{
                        Authorization:`Bearer ${User.token}`,
                        auth:JSON.stringify({
                            usuario_id:User.id,
                            empresa_id:User.empresa_id
                        })
                    }
                })
                let Terceros = await TercerosModel.getTerceros()
                let TercerosBukapp = []
                for(const element  of Terceros.recordset){
                    let {
                        strIdTercero,
                        strApellido1,
                        strApellido2,
                        strNombre1,
                        strNombre2 ,
                        strNombre,
                        strDireccion,
                        strTelefono,
                        strCelular,
                        strEmail,
                        strObservacion,
                        intEstado,
                        strCiudad,
                        intTipoTercero,
                        strTipoId
                    } =element
                    let ciudad = await ciudades.data.data.find(data => data.strIdCiudad==strCiudad)
                    
                    let tipoTercero = await tiposTercero.data.data.find( data => data.strIdTipoTercero == intTipoTercero)
                    let tipo_documento_id = 1
                    switch (strTipoId) {
                        case 'CC':
                            tipo_documento_id=1    
                        break;
                        case 'NI':
                            tipo_documento_id=2   
                        break;
                        case 'TI':
                            tipo_documento_id=3   
                        break;
                        case 'TE':
                            tipo_documento_id=4   
                        break;
                        case 'CE':
                            tipo_documento_id=5   
                        break;
                        case 'RC':
                            tipo_documento_id=6   
                        break;
                        case 'PA':
                            tipo_documento_id=7   
                        break;
                        case 'CD':
                            tipo_documento_id=8  
                        break;
                        case 'PE':
                            tipo_documento_id=9   
                        break;
                        case 'NI':
                            tipo_documento_id=11   
                        break;
                        default:
                            tipo_documento_id=1   
                            break;
                    }
                    //console.log(ciudad)
                    if(ciudad){
                        let TerceroBukapp = {
                            strIdTercero,
                            strApellido1:(strApellido1?strApellido1:''),
                            strApellido2:(strApellido2?strApellido2:''),
                            strNombre1:(strNombre1?strNombre1:''),
                            strNombre2 :(strNombre2?strNombre2:''),
                            strNombre:(strNombre?strNombre:''),
                            strDireccion:(strDireccion?strDireccion:''),
                            strTelefono:(strTelefono?strTelefono:''),
                            strCelular:(strCelular?strCelular:''),
                            strEmail:(strEmail?strEmail:''),
                            strObservacion:(strObservacion?strObservacion:''),
                            intEstado:(intEstado==1?1:0),
                            ciudad_id:ciudad.id,
                            tipo_tercero_id:tipoTercero.id,
                            tipo_documento_id
                        }
                        TercerosBukapp.push(TerceroBukapp)
                    }
                    
                }
                //console.log(TercerosBukapp)
                User = await axios.post(`/usuarios/login/`,{
                    strIdUsuario:env.userBukapp,
                    strClave:env.passwordBukapp
                })
                let terceros = await axios.post(`/terceros/list`,{
                    arrTerceros:TercerosBukapp
                },{
                    headers:{
                        Authorization:`Bearer ${User.data.data.token}`,
                        auth:JSON.stringify({
                            usuario_id:User.data.data.id,
                            empresa_id:User.data.data.empresa_id
                        })
                    }
                })
                console.log('Terceros ok',terceros)
            } catch (error) {
                console.log('Terceros error')
                console.log(error)
            }
        }else{
          
        }
    }
}