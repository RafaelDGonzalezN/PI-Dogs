import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getTemperament, postDog } from "../../redux/actions"
import validation from "./validation"
import "./create.styles.css"


function Create(){

    const dispatch = useDispatch();

    const [input, setInput] = useState({
        name:"",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span:"",
        image:"",
        temperament:[]    
    })

    const [errors, setErrors] = useState({})

    const allTemperaments = useSelector((state) => state.temperament)
   
    const handleChange = (event) => {
                const { name, value } = event.target;
                
                setInput({
                  ...input,
                  [name]: value,
                });
                
                const input2 = {...input,[name]:value}
                const validations = validation(input2)
                setErrors(validations)
    };

    const handleSelect = (e)=>{
        const selecTemperament = e.target.value;

    setErrors({
        ...errors,
        temperaments: '',
    });
    setInput({
        ...input,
        temperament: [...input.temperament, selecTemperament]
    });
    }

    useEffect(() => {
        dispatch(getTemperament())
    }, [dispatch])

    const handleErase = (tempRemove) => {
                setInput({
                    ...input,
                    temperament: input.temperament.filter(
                    (temp) => temp !== tempRemove
                  ),
                });
    };

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        const validationErrors = validation(input);

        setErrors(validationErrors);
    
        if (Object.keys(validationErrors).length === 0) {
            try {
               const doggy = {
                    name: input.name,
                    height: `${input.height_min} - ${input.height_max}`,
                    weight: `${input.weight_min} - ${input.weight_max}`,
                    life_span: input.life_span,
                    image:input.image,
                    temperament: input.temperament,
                };

                
                const response = await dispatch(postDog(doggy));
    
                console.log('Respuesta del servidor:', response);
    
                setInput({
                    name: "",
                    height_min: "",
                    height_max: "",
                    weight_min: "",
                    weight_max: "",
                    life_span: "",
                    image:"",
                    temperament: [],
                });
    
                alert("The dog was created successfully");
            } catch (error) {
                console.error('Error al crear el perro:', error);
    
                alert("Error creating the dog");
            }
        }
    }

    return(
        <div className="fondoF">
            <div>
                <Link to="/home">
                    <button className="onHome" >Home</button>
                </Link>
            </div>
        <div className= "containerC">
            
            <div>
                <h1 className="newDog">New Dog</h1>
            </div>
            <div className="container">


                
            <form className= "form" onSubmit={handleSubmit}>
                <div className="labelTemp">
                    <div className="inputs">
                        <div>
                            <label className="requeri" htmlFor="name">Name: </label>
                        <input
                        className="in"
                        name="name"
                        placeholder="Name"
                        type="text"
                        value={input.name}
                        onChange={handleChange}></input>
                        <h2 className="errors">{errors.name && (<p>{errors.name}</p>)}</h2>
                    </div>

                    <div  className="inputs">
                        <label className="requeri" htmlFor="height_min">Height min: </label>
                    <input
                        className="in"
                        name="height_min"
                        placeholder=" Minimum height"
                        type="number"
                        value={input.height_min}
                        onChange={handleChange}></input>
                    <h2 className="errors">{errors.height_min && (<p>{errors.height_min}</p>)}</h2>
                    </div>

                    <div  className="inputs">
                        <label className="requeri" htmlFor="height_max">Height max: </label>
                    <input
                        className="in"
                        name="height_max"
                        placeholder="Maximum height"
                        type="number"
                        value={input.height_max}
                        onChange={handleChange}></input>
                    <h2 className="errors">{errors.height_max && (<p>{errors.height_max}</p>)}</h2>
                    </div>

                    <div  className="inputs">
                        <label className="requeri" htmlFor="weight_min">Weight min: </label>
                    <input
                        className="in"
                        name="weight_min"
                        placeholder="Minimum weight"
                        type="number"
                        value={input.weight_min}
                        onChange={handleChange}></input>
                    <h2 className="errors">{errors.weight_min && (<p>{errors.weight_min}</p>)}</h2>
                    </div>

                    <div  className="inputs">
                        <label className="requeri" htmlFor="weight_max">Weight max: </label>
                    <input
                        className="in"
                        name="weight_max"
                        placeholder="Maximum weight"
                        type="number"
                        value={input.weight_max}
                        onChange={handleChange}></input>
                    <h2 className="errors">{errors.weight_max && (<p>{errors.weight_min}</p>)}</h2>
                    </div>

                    <div  className="inputs">
                    <label className="requeri" htmlFor="life_span">Life Span: </label>
                    <input
                        className="in"
                        name="life_span"
                        placeholder="lifespan"
                        type="number"
                        value={input.life_span}
                        onChange={handleChange}></input>
                    <h2 className="errors">{errors.life_span && (<p>{errors.life_span}</p>)}</h2>
                    </div>

                    <div  className="inputs">
                    <label className="requeri" htmlFor="image">Image: </label>
                    <input  
                        className="in"
                        name="image" 
                        type="url"
                        placeholder="image"
                        value={input.image} 
                        onChange={handleChange}/>

                    </div>
            
                
                    <label className="requeri"  htmlFor="temperaments">Temperaments: </label>
                    <select  className="tempCre" onChange={handleSelect}>
                        
                        <option   value="all" disabled selected hidden placeholder="temperaments">
                        Temperaments
                        </option>
                        {
                        allTemperaments.map((t) => {
                            return(
                                <option value={t.name} key={t.id}>{t.name}</option>
                            )
                        })
                        }
                        
                    </select>
                   
            </div>
                </div>
                <div className="t">
                {input.temperament.map((d, i) => {
                    return (
                            <div  key={i++} >
                                <div>
                                    {d}
                                </div>
                                <button 
                                    className="erase"
                                    onClick={() => handleErase(d)}>X</button>
                            </div>)
                    })
                }
            </div>
            <h2 className="errors">{errors.temperament && (<p>{errors.temperament}</p>)}</h2>
                        {
                      !Object.keys(errors).length === 0 ? 
                        (<div>The dog cant be Created Yed</div>)
                        : 
                        (<button 

                            type="submit"
                            className="createButton" 
                            disabled={
                                errors.name ||
                                errors.height_min ||
                                errors.height_max ||
                                errors.weight_min ||
                                errors.weight_max ||
                                errors.life_span ||
                                errors.temperament
                            }> Create</button>)  
                        }
                
            </form>
            </div>
           
        </div>
    </div>
    )
}

export default Create;
