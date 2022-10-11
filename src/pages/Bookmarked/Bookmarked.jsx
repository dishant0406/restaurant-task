import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import SideBar from '../../components/SideBar/SideBar';
import 'react-autocomplete-input/dist/bundle.css';
import { StateContext } from '../../Context/Context';
import IframeCard from '../../components/IframeCard/IframeCard';

const Bookmarked = () => {
  const {bookmarked} = useContext(StateContext)





  return (
    <div className='flex justify-start'>
      <SideBar active={2}/>
      <div className='w-[100vw] flex mb-[3rem] flex-col gap-[2rem] items-center'>

        <div className='w-[80vw] gap-[2rem] flex flex-wrap ml-[18rem]'>
          {bookmarked.map((e)=> <IframeCard key={e.id} e={e}/>)}
        </div>
      </div>
    </div>
  )
}

export default Bookmarked