import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../../styles/user/CreateUser.css';
import { TodoContext } from '../../context/index.js';
import axios from 'axios';
function Modal({ children, mode }) {
  console.log("#######################MODEMODEMDEO")
  console.log(mode);
  const [datos, setDatos] = useState([]);
  const [groups, setGroups] = useState([])
  const [users, setUsers] = useState([])

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");





  const { openModalCreateGroup, setopenModalCreateGroup, openModalEditGroup, openModalDeleteGroup, setopenModalEditGroup, setopenModalDeleteGroup } = useContext(TodoContext);
  const closeModal = () => {
    if (openModalCreateGroup) {
      setopenModalCreateGroup(false);
    }
    if (openModalEditGroup) {
      setopenModalEditGroup(false);
    }
    if (openModalDeleteGroup) {
      setopenModalDeleteGroup(false);
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
    console.log("E#################################R")
    console.log(document.getElementById("mySelect"))
    console.log(user)

    const antiguo_user = document.getElementById("mySelect")
    var user_ant = antiguo_user.value

    const editarDato = {
      user: e.target.user.value,
      password: e.target.password.value,
      email: e.target.email.value,
      first_name: e.target.nombre.value,
      last_name: e.target.apellido.value,
     
      antiguoUser:  user_ant
    };

    const deleteDato = {
      user : user_ant
    }


    

    // Realiza una petición GET a una URL específica

    
      const crear = mode === "CREAR" ? (
        axios
          .post('http://127.0.0.1:8000/Rennueva/create-django-user/', nuevoDato)
          .then(response => {
            const data = response.data;
            console.log(data)




          })
          .catch(error => {
            console.error(error);
          })
      ) : null
    
      const editar = mode === "EDITAR" ? (
        axios
          .put('http://127.0.0.1:8000/Rennueva/update-django-user/', editarDato)
          .then(response => {
            const data = response.data;
            console.log(data)
            e.target.reset();
            closeModal()
            // Limpiar los campos del formulario
   




          })
          .catch(error => {
            console.error(error);
          })
      ) : null
   
      const borrar = mode === "BORRAR" ? (

        axios
          .put('http://127.0.0.1:8000/Rennueva/delete-django-user/', deleteDato)
          .then(response => {
            const data = response.data;
            console.log(data)
            e.target.reset();
            closeModal()




          })
          .catch(error => {
            console.error(error);
          })
      ) : null
    







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
        <form onSubmit={handleSubmit}>
          <div style={{ margin: "10px" }}>
            {mode === "EDITAR" || mode === "BORRAR" ? (
              <select
                style={{ width: "100%", height: "40px", backgroundColor: "white", borderRadius: "5px" }}
                name="rol"
                required
                onChange={handleSelectChange}
                id = "mySelect"
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
            <input type="text" name="nombre" required value={first_name} onChange={(e) => setFirstName(e.target.value)}/>
          </label>
         
          <button style={{ marginTop: "20px" }} type="submit">{mode}</button>

        </form>
      </div>
    </div>,
    document.getElementById('modal')
  );
}

export { Modal };
