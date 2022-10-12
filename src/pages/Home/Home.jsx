import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import SideBar from '../../components/SideBar/SideBar';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
import IframeCard from '../../components/IframeCard/IframeCard';
import { StateContext } from '../../Context/Context';
import toast from 'react-hot-toast';

const Home = () => {
  const [restau, setRestau] = useState([])
  const [autoCompleteList, setAutoCompleteList] = useState([])
  const [inputValue, setInputValue] = useState('')
  const {addedRes, setAddedRes, bookmarked, setBookmarked} = useContext(StateContext)

  useEffect(()=>{
    (async function() {

      const {data} = await axios.get('https://api.airtable.com/v0/appjWdL7YgpxIxCKA/restaurants', {
        params: {
            'view': 'Grid view'
        },
        headers: {
            'Authorization': 'Bearer keyfXgn8PL6pB3x32'
        }
      });

      setRestau(data.records)
      const autoList = data.records.map((item)=>item.fields.Name)
      setAutoCompleteList(autoList)

    })();
    
  },[])

  const handleSubmit = (e)=>{
    e.preventDefault()

    //check if already present
    const alreadyPresent = addedRes.find((e)=>e.fields.Name===inputValue)
    if(alreadyPresent){
      toast.error('Restaurant is already added!')
      setInputValue('')
      return
    }
    const filteredRestau = restau.filter((item)=>item.fields.Name.toLowerCase() === inputValue.toLowerCase())
    setAddedRes([...filteredRestau, ...addedRes])
    toast.success('Restaurant added!')
    setInputValue('')
  }

  const handleAddBookmark =(item)=>{
    //check if already bookmarked
    const alreadyBookmarked = bookmarked.find((e)=>e.fields.Name===item.fields.Name)
    if(alreadyBookmarked){
      toast.error('Already Bookmarked this restaurant!')
      return
    }
    setBookmarked([...bookmarked, item])

    //remove the bookmarked item from the addedRes
    const filteredAddedRes = addedRes.filter((e)=>e.fields.Name!==item.fields.Name)
    setAddedRes(filteredAddedRes)
    
    toast.success('Restaurant bookmarked!')
  }

  const handleRemoveAdded = (item)=>{
    //remove the record from the addedRes array 

    const filteredArray = addedRes.filter((e)=>e.fields.Name!==item.fields.Name)
    const filteredArrayBook = bookmarked.filter((e)=>e.fields.Name!==item.fields.Name)
    setAddedRes(filteredArray)
    setBookmarked(filteredArrayBook)
    toast.success('Removed from added list!')
  }




  return (
    <div className='flex justify-start'>
      <SideBar active={1}/>
      <div className='w-[100vw] flex flex-col gap-[2rem] items-center'>
        <form onSubmit={handleSubmit} class="flex h-[2.5rem] mt-[2rem] flex-col md:flex-row md:w-full  md:space-x-3 space-y-3 md:space-y-0 justify-center">
          <div class=" relative ">
            <TextInput value={inputValue} onChange={(e)=>setInputValue(e.trim())}  trigger='' Component='input' options={autoCompleteList} type="text" id="&quot;form-subscribe-Subscribe" class=" rounded-lg border flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Search"/>
          </div>
          <button class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit">
            Add
          </button>
        </form>
        <div className='w-[80vw] flex mb-[3rem] flex-wrap gap-[2rem] ml-[18rem]'>
          {addedRes.map((e)=> <IframeCard key={e.id} canDelete={true} handleRemoveAdded={handleRemoveAdded} handleAddBookmark={handleAddBookmark} e={e}/> )}
        </div>
      </div>
    </div>
  )
}

export default Home