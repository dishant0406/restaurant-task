import React from 'react'

const IframeCard = ({e,handleAddBookmark,handleRemoveAdded,canDelete}) => {
  return (
    <div id={e.id} className={`overflow-hidden shadow-lg mt-[2rem] rounded-lg ${canDelete?'h-[480px]':'h-[430px]'}  cursor-pointer m-auto`}>
    <a href="#" className="w-[520px] block h-full">
      <iframe src={`https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params={"ds2.name2":"${e.fields.Name}"}`}
       width="550" height="320" className="max-h-[400px] w-[520px] object-cover"
      />
      <div className="bg-white dark:bg-gray-800 w-full p-4">
        <p className="text-indigo-500 text-md font-medium">{e.id}</p>
        <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
          {e.fields.Name}
        </p>
        <p className="text-gray-400 dark:text-gray-300 font-light text-md">
          {new Date(e.createdTime).toDateString()}
        </p>
        {canDelete && <div className="flex flex-wrap justify-starts items-center mt-4">
          <button onClick={()=>handleAddBookmark(e)} className="text-xs mr-2 py-1.5 px-4 text-gray-600 bg-blue-100 rounded-2xl">
            Bookmark
          </button>
          <button onClick={()=>handleRemoveAdded(e)} className="text-xs mr-2 py-1.5 px-4 text-white bg-red-500 rounded-2xl">
            Delete
          </button>
        </div>}
      </div>
    </a>
  </div>
  )
}

export default IframeCard