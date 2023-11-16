import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';

function App() {
  function Myfunction()
  {
    let values=JSON.parse(localStorage.getItem('listdata'));
    if(values)
    {
      return values;
    }
    else{
      return [];
    }
  }
  const [data,setData]=useState(Myfunction());
  const [username,setUsername]=useState('');
  const [value,setValues]=useState('');
  const [index,setIndex]=useState();
  console.log(data);

  function AddData()
  {
    if(username==='')
    {
      alert('Please Enter the Details');
    }
    else{
      let mydata={
        task:username,
        status:'pending'
      }
      setData([...data,mydata]);
      setUsername('');
    }
  }

  function AddValues(values,index)
  {
    setValues(values);
    setIndex(index);
  }

  function EditData()
  {
    let duplicateValues=data.slice();
    duplicateValues[index]=value;
    setData(duplicateValues);
  }

  function deleteData(index)
  {
    setData(data.filter((values,i)=>i!==index));
  }

  function ChangeData(e,index)
  {
    if(e.target.checked===true)
    {
       let myvaluedata=data.slice();
       myvaluedata[index].status='complete';
       setData(myvaluedata);
    }
    else if(e.target.checked===false)
    {
      let myvaluedata=data.slice();
      myvaluedata[index].status='pending';
      setData(myvaluedata);
    }
  }

  useEffect(()=>{
localStorage.setItem('listdata',JSON.stringify(data));
  },[data]);
  return (
    <div className='maindiv container-fluid'>
    <div className='text-center py-3 pt-3'>
      <h2 className='mytitle'>To Do List</h2>
    </div>
    <div className='userdetails d-flex justify-content-center'>
   <div className="myuserdata w-75 bg-white border rounded">
  <input type='text' className='inputdata w-75 px-2' placeholder='Enter the Data' value={username} onChange={(e)=>setUsername(e.target.value)}></input>
  <button className='w-25 buttondata rounded' onClick={AddData}>Click</button>
  </div>
   </div>

   <div className='userdetails mt-3 mx-2'>
{
  data.map((values,index)=>
  <div className='mydivdata h-75 mb-2 border border-white px-2 py-2 d-flex'>
  <div className='checkboxData d-flex justify-content-center mx-2 mt-1 me-2'>
<input type='checkbox' className='form-check-input' onChange={(e)=>ChangeData(e,index)} checked={values.status==='complete'?'checked':''}></input>
    </div>
<div className='todoData d-flex justify-content-center align-items-center flex-grow-1 mt-1'>
<h4>{values.task}</h4>
  </div>
  <div className='editData d-flex justify-content-center align-items-center mx-2'>
  <i className="myedit fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>AddValues(values,index)}></i>
    </div>
    <div className='deleteData d-flex justify-content-center align-items-center mx-2'>
  <i className="mydelete fa-solid fa-trash" onClick={()=>deleteData(index)}></i>
    </div>
    </div>
  
  )
}
   </div>

   <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" data-bs-backdrop="static" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Data</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <h5>Enter the name</h5>
      <input type='text' className='form-control w-100 mx-auto mt-2 mb-2' value={value} onChange={(e)=>setValues(e.target.value)}></input>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={EditData}>Save changes</button>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}

export default App;
