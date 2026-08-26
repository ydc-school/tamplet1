import React from 'react'
import '@/utils/yo.css'
import page from './info';

export default ({ }) => {





    const json = page || [];

    const result = json.find(item => item?.file_name === "page_1787734589938.html");
    console.log()

    return (

        <div className="w-full flex flex-row justify-center items-center flex-wrap  gap-8  p-8">
            {
                result.data.students.map((r) => (
                    <div className='w-44 h-auto rounded-sm overflow-hidden topper-student-shodow'>
                        <div className='w-full  overflow-hidden  w-80'>
                            <img
                                className='w-full h-full object-contain'
                                src={r.image}
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
