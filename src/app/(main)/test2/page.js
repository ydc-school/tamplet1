import React from 'react'
import '@/utils/yo.css'
import json from './data'

export default ({ }) => {



    return (

        <div className="w-full flex flex-row justify-center items-center flex-wrap  gap-4 p-2 ">
            {
                json.map((r) => (
                    <div className='w-44 h-auto rounded-sm overflow-hidden topper-student-shodow'>
                        <div className='w-full  overflow-hidden  w-80'>
                            <img
                                className='w-full h-full object-contain'
                                src={`https://admin.yaduvanshigroup.edu.in/uploads/college-top/top-10-pg/${r.scan_index}.jpg`}
                                alt="College Top"
                            />                        </div>
                        <div className='text-center py-2'>
                            <h1>{r.name}</h1>
                            <h1>RANK : {r.rank}</h1>
                            <h2>{r.class}</h2>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
