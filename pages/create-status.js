import React,{useState} from 'react'
import auth0 from '../lib/auth0'
import axios from 'axios'

const CreateStatus=()=>{
    const[dados,setDados]=useState({
        status:'bem',
        coords:{
            lat:null,
            long:null
        }
    })
    const getMyLocation= () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
        
            setDados(old =>{
                return{
                    ...old,
                    coords:{
                        lat:position.coords.latitude,
                        long:position.coords.longitude
                    }
                }
            })
        })
      
    }
    }
    const onStatusChange= evt =>{
        const value=evt.target.value
        setDados(old =>{
            return{
                ...old,
                status:value
            }
        })
    }
    const save= async()=>{
        await axios.post('/api/save-status',dados)
    }
    return (
       <div>
        <h1>CreateStatus</h1>
        
        <label className='block'><input type='radio' name='status' value='bem'/>Estou Bem</label>
        <label className='block'><input type='radio' name='status' value='gripe'/>Estou com sintomas de gripe/resfriado</label>
        <label className='block'><input type='radio' name='status' value='covid'/>Estou com sintomas de covid-19</label>
        Sua Posição Atual é : {JSON.stringify(dados)}
        
        <button onClick={getMyLocation}  className='py-4 px-2 rounded bg-pink-800
         font-bold shadow block w-1/4 text-center mx-auto'>
         Pegar minha localização</button>
        <button onClick={save}>Salvar </button>
        </div>
        )
}
export default CreateStatus
export async function getServerSideProps({ req, res }) {
    const session = await auth0.getSession(req)
if(session){
    return {
        props: {
            isAuth: true,
            user: session.user,
            
        }
    }
}
return {
    props: {
        user: {
            isAuth: false,
            name: 'Junior'
        }
    }
}
}
