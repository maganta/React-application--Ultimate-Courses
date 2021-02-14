import React, {useState} from 'react';
import Input from './input';

const initialEntryState = {
    recordName: '',
    artistName: '',
    description: ''
}




const Form = ({onSubmit})=>{

const [entry, setEntry] = useState(initialEntryState);

const onChangehandler = e => {
    setEntry({
        ...entry,
        [e.target.name]: e.target.value
    })
}


const onSubmithandler = e =>{
    e.preventDefault();
    console.log(entry);

if(!entry.recordName ||!entry.artistName){
    return;
}

onSubmit({...entry});
  setEntry(initialEntryState);

}


return (   
<form onSubmit= {onSubmithandler}> 
<Input labelText = "Record Name" name = "recordName" onChange= {onChangehandler} value= {entry.recordName}/>
<Input labelText = "Artist Name" name = "artistName"  onChange= {onChangehandler} value= {entry.artistName}/>
<label htmlFor = "description">Description</label>
<textarea id = "description" name = "description" onChange= {onChangehandler} value= {entry.description}></textarea>

<Input type = "textarea" labelText="description" name = "description" onChange= {onChangehandler} value= {entry.description}/>

<button type= "submit">Add</button>
</form>
)
}


export default Form;
