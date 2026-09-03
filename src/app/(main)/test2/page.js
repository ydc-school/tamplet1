import React from 'react'
import '@/utils/yo.css'
import json from './faclty'

export default ({ }) => {

    console.log(json)

    return (

        <div className="w-full flex flex-row justify-center items-center flex-wrap  gap-4 p-2 ">
            {
                json[0].faculty.map((r) => (
                    <div className='w-44 h-auto rounded-sm overflow-hidden topper-student-shodow'>
                        <div className='w-full  overflow-hidden  w-80'>
                            <img
                                className='w-full h-full object-contain'
                                src={'https://admin.yaduvanshigroup.edu.in/uploads/branch-file/college/ydcmgh/staff-photo/'+r.employeeNumber+".j"}
                                alt="College Top"
                            />                        </div>
                        <div className='text-center py-2'>
                            <h1>{r.name}</h1>
                            <h1> {r.department}</h1>
                            <h2>ID: {r.employeeNumber}</h2>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
