import React, {useState, useContext, useEffect}from 'react';
import ReactDOM from 'react-dom';
import '../../styles/user/CreateUser.css';
import { TodoContext } from '../../context/index.js';
import axios from 'axios';
function Modal({ children , mode}) {
  console.log("#######################MODEMODEMDEO")
  console.log(mode);
  const [datos, setDatos] = useState([]);
  const [groups, setGroups] = useState([])
  const [users,setUsers] = useState([])

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  




  const { openModalCreate, setOpenModalCreate, openModalEdit, openModalDelete, setOpenModalEdit, setOpenModalDelete} = useContext(TodoContext);
  const closeModal = () => {
    if (openModalCreate) {
      setOpenModalCreate(false);
    }
    if (openModalEdit) {
      setOpenModalEdit(false);
    }
    if (openModalDelete) {
      setOpenModalDelete(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Agregar los datos ingresados al arreglo de datos
    const nuevoDato = {
      user: e.target.user.value,
      password: e.target.password.value,  
      email: e.target.email.value,
      first_name: e.target.nombre.value,
      last_name: e.target.apellido.value, 
      group: e.target.rol.value
    };
    console.log(nuevoDato)
    // Realiza una petición GET a una URL específica
    axios
    .post('http://127.0.0.1:8000/Rennueva/create-django-user/', nuevoDato)
    .then(response => {
        const data = response.data;
        console.log(data)
        
   
      

    })
    .catch(error => {
        console.error(error);
    });

    





    // Limpiar los campos del formulario
    e.target.reset();
  };

  useEffect(() => {
    axios
    .get('http://127.0.0.1:8000/Rennueva/get-all-groups/')
    .then(response => {
        const data = response.data;
        setGroups(data)
        console.log("######################GRUPOS##################################")
       
      
        
        

    })
    .catch(error => {
        console.error(error);
    });

  }, []);


  useEffect(() => {
    axios
    .get('http://127.0.0.1:8000/Rennueva/get-all-users/')
    .then(response => {
        const data = response.data;
        setUsers(data)
        console.log("######################GRUPOS##################################")
       
      
        
        

    })
    .catch(error => {
        console.error(error);
    });

  }, []);

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value; // Obtener la opción seleccionada
    console.log(selectedOption)
    // Buscar el dato seleccionado en el arreglo de datos
    const datoEncontrado = users.find((users) => users.user === selectedOption);
    console.log(datoEncontrado)
    setUser(datoEncontrado.user);
    setPassword(datoEncontrado.password);
    setEmail(datoEncontrado.email);
    setFirstName(datoEncontrado.first_name);
    setLastName(datoEncontrado.last_name);


  }


  return ReactDOM.createPortal(
    

    <div className="ModalBackground">
    
      <div className='DivModal'>
      <button className="ModalClose" onClick={closeModal}>
          <span>&times;</span>
        </button>
      <form   onSubmit={handleSubmit}>
      <div style={{ margin: "10px"}}>
      {mode === "EDITAR" || mode === "BORRAR" ? (
        <select
          style={{ width: "100%", height: "40px", backgroundColor: "white", borderRadius: "5px" }}
          name="rol"
          required
          onChange={handleSelectChange}
        >
          {
            users.map((name, index) => (
              <option key={index}>{name.user}</option>
            ))
          }
        </select>
      ) : null}
         </div>
        
        <label >
          Nombre:
          <input  type="text" name="nombre" required value={first_name} />
        </label>
        <label>
          Apellido:
          <input  type="text" name="apellido" required value={last_name}/>
        </label>
        <label>
          Nombre de Usuario:
          <input  type="text" name="user" required value={user}/>
        </label>
        <label>
          Email:
          <input  type="email" name="email" required value={email} />
        </label>
        <label>
          Password:
          <input  type="password" name="password" required value={password}/>
        </label>
        <label  >
          Rol:
          
        </label>
        <div style={{ margin: "10px"}}>
        <select style = {{width : "100%", height : "40px", backgroundColor : "white", borderRadius: "5px"}} name="rol" required>
     
            {
              groups.map((name) => (
                <option>{name.name} </option>
              ))
            }
          </select>
        </div>

        <button style={{marginTop : "20px"}} type="submit">{mode}</button>
        
      </form>
      </div>
    </div>,
    document.getElementById('modal')
  );
}

export { Modal };
