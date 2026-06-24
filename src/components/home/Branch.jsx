import Link from "next/link";
import React from 'react'

export default function Branch() {
    return (
        <>
            <section className="py-section-padding bg-surface-container-low" id="schools">
                <div className="max-w-container-max mx-auto px-gutter mb-8 flex flex-col items-center text-center mb-stack-lg">
                    <h2 className="font-headline-lg text-headline-lg text-heritage-navy ">HIGHER EDUCATION CAMPUSES</h2>
                    <div className="w-48 h-1 bg-academic-gold"></div>
                </div>
                <div className="max-w-container-max mx-auto px-gutter">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-gutter">

                        {/* 1. Yaduvanshi College of Engg. & Tech., Narnaul */}
                        <Link href="https://ycetnnl.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Yaduvanshi College of Engg. & Tech., Narnaul (B.Tech., M.Tech.)"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://admin.yaduvanshigroup.edu.in/uploads/branchs/1782195923309-9850066d31c04da9.jpeg" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Yaduvanshi College of Engg. & Tech., Narnaul (B.Tech., M.Tech.)</p>
                                </div>
                            </div>
                        </Link>

                        {/* 2. Yaduvanshi Degree College, Mahendergarh */}
                        <Link href="https://ydcmgh.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Yaduvandhi Degree College, Mahendergarh (UG, PG)"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://admin.yaduvanshigroup.edu.in/uploads/branchs/1782195923309-9850066d31c04da9.jpeg" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Yaduvandhi Degree College, Mahendergarh (UG, PG)</p>
                                </div>
                            </div>
                        </Link>

                        {/* 3. Yaduvanshi Degree College, Narnaul */}
                        <Link href="https://ydcnnl.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Yaduvandhi Degree College, Narnaul (UG, PG)"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://lh3.googleusercontent.com/aida/AP1WRLtku6SoK7BEK_XG9Y84QxQbk0lGL6XdMwbaMbMplVK-iUwZN5rjQv4ni-6YRlAOICQfWpVf1FD7lVI-Gm9KN2cT4GhiMhwf0Gtx9rGhOcu4WBiEBEAAHJpA6UE_SvG5Lctt51c2btkjOnSAb2lPg_KxOQU0RjSMWZgnTTKSB3YdREnQHNk8GjJYnhmS0Gbfyp1VIsqrdZILNFIp5Sgx0gOZzXzGYed3rJoC4ajmMfog5m4Rn3hnJNcz6A" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Yaduvandhi Degree College, Narnaul (UG, PG)</p>
                                </div>
                            </div>
                        </Link>

                        {/* 4. RBS Degree College, Nangal Chaudhary */}
                        <Link href="https://rbsdcths.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="RBS Degree College, Nangal Chaudhary"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://lh3.googleusercontent.com/aida/AP1WRLuV8GkQDIEmQw_rSOHMAbd5Du7b4wXj1J8oMXwcrobFuLZJCeuu3LVzQe1UZyKMXQ6tfl6-AxlC0u_K_TvKC2wedNt8J8c16cPK7cpSa5cqoJ-HjG9tfApYjsrK4TPdwHyj42gQQbVqk61HAuzUgU1_J0NALec3gVrkYEmC5HbZiDD-QGNQB6x6-3F64nR318dzh2XmuHkt6s4quS9F9QE-Fo-fV4fyAIQjfLDXm9DpjQgY2YrlK8qXb_4" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">RBS Degree College, Nangal Chaudhary</p>
                                </div>
                            </div>
                        </Link>

                        {/* 5. Yaduvanshi College of Engg. & Tech., Sohali */}
                        <Link href="https://ycetsohali.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Yaduvanshi College of Engg. & Tech., Sohali (Raj.)"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://lh3.googleusercontent.com/aida/AP1WRLtrdK4T4kjAfzAKE3gYdmh0unXnwXPL2jdO5-1UDBp-zgRg9Ue9M_62nv4LU-iFIOZ_p7z-Bgn9zCMgvNno3Ac7ZUo_A3UlyRDzfy9JSYLMNwLe70xIdzpl7GaDw_xjiAEFLZk4OhEjkfxaS7FOblB5Pr4zk7pLmMkKrWFJZqNTyiJlUOgDyo-W0g0SNiMLAnEmZ-UYSrMe-_TIvFbV5wsVS9FvmZkYQaGF2sGkOwuEi4UI4Hz8kIt6tCs" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Yaduvanshi College of Engg. & Tech., Sohali (Raj.)</p>
                                </div>
                            </div>
                        </Link>

                        {/* 6. Yaduvanshi College of Education, Mahendergarh */}
                        <Link href="https://ycemgh.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Yaduvanshi College of Education, Mahendergargh (B.Ed., M.Ed.)"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://lh3.googleusercontent.com/aida/AP1WRLu-CCSbkK2rOiTQk_dYaYYeo_opJYK6A8zmLTnsbO_mZg155Atu5z8d01tGa5U6G7iwf--okhdbbbGimzgughFVED85qwa3gnyc8cODsu8u3uBEBLnGEUnOz4sAy_1CZe9Vf8Xsy8yAyaLi_CbrdRfXER3pjATQ1jtPnxXdCKIAGRj532XnBqzQruscbyQ_q-XojegUVlliTdeF6eMJ0mgC-fwm1sq4HzU71s5b5tvEhMGeoj07vQyhadU" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Yaduvanshi College of Education, Mahendergargh (B.Ed., M.Ed.)</p>
                                </div>
                            </div>
                        </Link>

                        {/* 7. Yaduvanshi College of Education, Narnaul */}
                        <Link href="https://ycennl.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Yaduvanshi College of Education, Narnaul (B.Ed.)"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://lh3.googleusercontent.com/aida/AP1WRLuX2iUaoWUVDx4MCECZ1zZ8eCbWqLIcouk_JK8jWgVZ7rz2srC4g7NZu5ufVJ_NOGjgsDzqCaZz8MiOgf9uPFz8jr-qsyA5MDvdLIPuzwKhGicwqFwCvM3SVhdeH2W34SJPiSO42ZgDAZNnBNFagDU8A2faTvDJuIfwN6pjRo-lu5349hfaNwVhKjdyHwhxrpaXllFNoVnSeBSzoUBbNk7ysgpzP2UV4ge5oL09GIIW7iMbbMdYpzupk-Y" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Yaduvanshi College of Education, Narnaul (B.Ed.)</p>
                                </div>
                            </div>
                        </Link>

                        {/* 8. Yaduvanshi Institute of Education, Mahendergarh (D.El.Ed.) */}
                        <Link href="https://yiemgh.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Yaduvanshi Institute of Education, Nahendergarh (D.El.Ed.)"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://lh3.googleusercontent.com/aida/AP1WRLuX2iUaoWUVDx4MCECZ1zZ8eCbWqLIcouk_JK8jWgVZ7rz2srC4g7NZu5ufVJ_NOGjgsDzqCaZz8MiOgf9uPFz8jr-qsyA5MDvdLIPuzwKhGicwqFwCvM3SVhdeH2W34SJPiSO42ZgDAZNnBNFagDU8A2faTvDJuIfwN6pjRo-lu5349hfaNwVhKjdyHwhxrpaXllFNoVnSeBSzoUBbNk7ysgpzP2UV4ge5oL09GIIW7iMbbMdYpzupk-Y" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Yaduvanshi Institute of Education, Nahendergarh (D.El.Ed.)</p>
                                </div>
                            </div>
                        </Link>

                        {/* 9. Yaduvanshi Institute of Education, Mahendergarh (B.P.Ed.) */}
                        <Link href="https://yioemgh.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Yaduvanshi Institute of Education, Mahendergarh (B.P.Ed.)"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://lh3.googleusercontent.com/aida/AP1WRLuX2iUaoWUVDx4MCECZ1zZ8eCbWqLIcouk_JK8jWgVZ7rz2srC4g7NZu5ufVJ_NOGjgsDzqCaZz8MiOgf9uPFz8jr-qsyA5MDvdLIPuzwKhGicwqFwCvM3SVhdeH2W34SJPiSO42ZgDAZNnBNFagDU8A2faTvDJuIfwN6pjRo-lu5349hfaNwVhKjdyHwhxrpaXllFNoVnSeBSzoUBbNk7ysgpzP2UV4ge5oL09GIIW7iMbbMdYpzupk-Y" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Yaduvanshi Institute of Education, Mahendergarh (B.P.Ed.)</p>
                                </div>
                            </div>
                        </Link>

                        {/* 10. Yaduvanshi Institute of Education, Narnaul (D.El.Ed.) */}
                        <Link href="https://yiennl.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Yaduvanshi Institute of Education, Narnaul (D.El.Ed.)"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://lh3.googleusercontent.com/aida/AP1WRLuX2iUaoWUVDx4MCECZ1zZ8eCbWqLIcouk_JK8jWgVZ7rz2srC4g7NZu5ufVJ_NOGjgsDzqCaZz8MiOgf9uPFz8jr-qsyA5MDvdLIPuzwKhGicwqFwCvM3SVhdeH2W34SJPiSO42ZgDAZNnBNFagDU8A2faTvDJuIfwN6pjRo-lu5349hfaNwVhKjdyHwhxrpaXllFNoVnSeBSzoUBbNk7ysgpzP2UV4ge5oL09GIIW7iMbbMdYpzupk-Y" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Yaduvanshi Institute of Education, Narnaul (D.El.Ed.)</p>
                                </div>
                            </div>
                        </Link>

                        {/* 11. Yaduvanshi Institute of Education, Narnaul (D.P.Ed.) */}
                        <Link href="https://yioennl.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Yaduvanshi Institute of Education, Narnaul (D.P.Ed.)"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://lh3.googleusercontent.com/aida/AP1WRLuX2iUaoWUVDx4MCECZ1zZ8eCbWqLIcouk_JK8jWgVZ7rz2srC4g7NZu5ufVJ_NOGjgsDzqCaZz8MiOgf9uPFz8jr-qsyA5MDvdLIPuzwKhGicwqFwCvM3SVhdeH2W34SJPiSO42ZgDAZNnBNFagDU8A2faTvDJuIfwN6pjRo-lu5349hfaNwVhKjdyHwhxrpaXllFNoVnSeBSzoUBbNk7ysgpzP2UV4ge5oL09GIIW7iMbbMdYpzupk-Y" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Yaduvanshi Institute of Education, Narnaul (D.P.Ed.)</p>
                                </div>
                            </div>
                        </Link>

                        {/* 12. Yaduvanshi College of Education, Sohali (B.Ed.) */}
                        <Link href="https://ycesohali.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Yaduvanshi College of Education, Sohali (B.Ed.)"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://lh3.googleusercontent.com/aida/AP1WRLuX2iUaoWUVDx4MCECZ1zZ8eCbWqLIcouk_JK8jWgVZ7rz2srC4g7NZu5ufVJ_NOGjgsDzqCaZz8MiOgf9uPFz8jr-qsyA5MDvdLIPuzwKhGicwqFwCvM3SVhdeH2W34SJPiSO42ZgDAZNnBNFagDU8A2faTvDJuIfwN6pjRo-lu5349hfaNwVhKjdyHwhxrpaXllFNoVnSeBSzoUBbNk7ysgpzP2UV4ge5oL09GIIW7iMbbMdYpzupk-Y" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Yaduvanshi College of Education, Sohali (B.Ed.)</p>
                                </div>
                            </div>
                        </Link>

                        {/* 13. Yaduvanshi College of Education, Sohali (4-Years Integrated) */}
                        <Link href="https://ycoesohali.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Yaduvanshi College of Education, Sohali (4-Years Integrated)"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://lh3.googleusercontent.com/aida/AP1WRLuX2iUaoWUVDx4MCECZ1zZ8eCbWqLIcouk_JK8jWgVZ7rz2srC4g7NZu5ufVJ_NOGjgsDzqCaZz8MiOgf9uPFz8jr-qsyA5MDvdLIPuzwKhGicwqFwCvM3SVhdeH2W34SJPiSO42ZgDAZNnBNFagDU8A2faTvDJuIfwN6pjRo-lu5349hfaNwVhKjdyHwhxrpaXllFNoVnSeBSzoUBbNk7ysgpzP2UV4ge5oL09GIIW7iMbbMdYpzupk-Y" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Yaduvanshi College of Education, Sohali (4-Years Integrated)</p>
                                </div>
                            </div>
                        </Link>

                        {/* 14. Yaduvanshi Institute of Education, Sohali (D.El.Ed.) */}
                        <Link href="https://yiesohali.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Yaduvanshi College of Education, Sohali (D.El.Ed.)"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://lh3.googleusercontent.com/aida/AP1WRLuX2iUaoWUVDx4MCECZ1zZ8eCbWqLIcouk_JK8jWgVZ7rz2srC4g7NZu5ufVJ_NOGjgsDzqCaZz8MiOgf9uPFz8jr-qsyA5MDvdLIPuzwKhGicwqFwCvM3SVhdeH2W34SJPiSO42ZgDAZNnBNFagDU8A2faTvDJuIfwN6pjRo-lu5349hfaNwVhKjdyHwhxrpaXllFNoVnSeBSzoUBbNk7ysgpzP2UV4ge5oL09GIIW7iMbbMdYpzupk-Y" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Yaduvanshi College of Education, Sohali (D.El.Ed.)</p>
                                </div>
                            </div>
                        </Link>

                        {/* 15. Yaduvanshi College of Engineering & Technology, Sohali */}
                        <Link href="https://ycetsohali.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Yaduvanshi College of Engineering & Technology, Sohali"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://lh3.googleusercontent.com/aida/AP1WRLuX2iUaoWUVDx4MCECZ1zZ8eCbWqLIcouk_JK8jWgVZ7rz2srC4g7NZu5ufVJ_NOGjgsDzqCaZz8MiOgf9uPFz8jr-qsyA5MDvdLIPuzwKhGicwqFwCvM3SVhdeH2W34SJPiSO42ZgDAZNnBNFagDU8A2faTvDJuIfwN6pjRo-lu5349hfaNwVhKjdyHwhxrpaXllFNoVnSeBSzoUBbNk7ysgpzP2UV4ge5oL09GIIW7iMbbMdYpzupk-Y" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Yaduvanshi College of Engineering & Technology, Sohali</p>
                                </div>
                            </div>
                        </Link>

                        {/* 16. Yaduvanshi Polytechnic, Sohali */}
                        <Link href="https://ypsohali.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Yaduvanshi Polytechnic, Sohali"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://lh3.googleusercontent.com/aida/AP1WRLuX2iUaoWUVDx4MCECZ1zZ8eCbWqLIcouk_JK8jWgVZ7rz2srC4g7NZu5ufVJ_NOGjgsDzqCaZz8MiOgf9uPFz8jr-qsyA5MDvdLIPuzwKhGicwqFwCvM3SVhdeH2W34SJPiSO42ZgDAZNnBNFagDU8A2faTvDJuIfwN6pjRo-lu5349hfaNwVhKjdyHwhxrpaXllFNoVnSeBSzoUBbNk7ysgpzP2UV4ge5oL09GIIW7iMbbMdYpzupk-Y" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Yaduvanshi Polytechnic, Sohali</p>
                                </div>
                            </div>
                        </Link>

                        {/* 17. Yaduvanshi Pvt. ITI, Sohali */}
                        <Link href="https://yitisohali.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Yaduvanshi Pvt. ITI, Sohali"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://lh3.googleusercontent.com/aida/AP1WRLuX2iUaoWUVDx4MCECZ1zZ8eCbWqLIcouk_JK8jWgVZ7rz2srC4g7NZu5ufVJ_NOGjgsDzqCaZz8MiOgf9uPFz8jr-qsyA5MDvdLIPuzwKhGicwqFwCvM3SVhdeH2W34SJPiSO42ZgDAZNnBNFagDU8A2faTvDJuIfwN6pjRo-lu5349hfaNwVhKjdyHwhxrpaXllFNoVnSeBSzoUBbNk7ysgpzP2UV4ge5oL09GIIW7iMbbMdYpzupk-Y" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Yaduvanshi Pvt. ITI, Sohali</p>
                                </div>
                            </div>
                        </Link>

                        {/* 18. Hitkari College of Education, Ch. Dadri */}
                        <Link href="https://hce.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Hitkari College of Education, Mandola, Ch. Dadri (B.Ed.)"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://lh3.googleusercontent.com/aida/AP1WRLu1HcY5kndBhVN9aKo4LR_xAZYGg1R2yaVk1kQR_8V05d-6Gj0BLZHOtgN7z4wnIBpWvCkG7kYENsR7tZhnosKrfaQpfbHNnnTzqjx5VB1rfqFuzjRewfnHsqdO1iXkNo5XpGTanJLOecpyKLiEWZidxEk1UBeNA529E6kUpUIyWf2JsfGEtFAcmCdZAvW99bk-UJEmCuJ40uUk3FUPSaCdwZzvfQ9xKqbN73RAMXR2NjaeHFdhc8sqtg" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Hitkari College of Education, Mandola, Ch. Dadri (B.Ed.)</p>
                                </div>
                            </div>
                        </Link>

                        {/* 19. Sant Roshan Lal College of Education (B.Ed.) */}
                        <Link href="https://srlcoe.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Sant Roshan Lal College of education (B.Ed.)"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://lh3.googleusercontent.com/aida/AP1WRLuX2iUaoWUVDx4MCECZ1zZ8eCbWqLIcouk_JK8jWgVZ7rz2srC4g7NZu5ufVJ_NOGjgsDzqCaZz8MiOgf9uPFz8jr-qsyA5MDvdLIPuzwKhGicwqFwCvM3SVhdeH2W34SJPiSO42ZgDAZNnBNFagDU8A2faTvDJuIfwN6pjRo-lu5349hfaNwVhKjdyHwhxrpaXllFNoVnSeBSzoUBbNk7ysgpzP2UV4ge5oL09GIIW7iMbbMdYpzupk-Y" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Sant Roshan Lal College of education (B.Ed.)</p>
                                </div>
                            </div>
                        </Link>

                        {/* 20. Sant Roshan Lal College of Education (D.El.Ed.) */}
                        <Link href="https://srlce.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Sant Roshan Lal College of education (D.El.Ed.)"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://lh3.googleusercontent.com/aida/AP1WRLuX2iUaoWUVDx4MCECZ1zZ8eCbWqLIcouk_JK8jWgVZ7rz2srC4g7NZu5ufVJ_NOGjgsDzqCaZz8MiOgf9uPFz8jr-qsyA5MDvdLIPuzwKhGicwqFwCvM3SVhdeH2W34SJPiSO42ZgDAZNnBNFagDU8A2faTvDJuIfwN6pjRo-lu5349hfaNwVhKjdyHwhxrpaXllFNoVnSeBSzoUBbNk7ysgpzP2UV4ge5oL09GIIW7iMbbMdYpzupk-Y" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Sant Roshan Lal College of education (D.El.Ed.)</p>
                                </div>
                            </div>
                        </Link>

                    </div>
                </div>
            </section>

            <section className="py-section-padding bg-surface-container-low" id="schools">
                <div className="max-w-container-max mx-auto px-gutter mb-8 flex flex-col items-center text-center mb-stack-lg">
                    <h2 className="font-headline-lg text-headline-lg text-heritage-navy ">SCHOOL CAMPUSES</h2>
                    <div className="w-48 h-1 bg-academic-gold"></div>
                </div>
                <div className="max-w-container-max mx-auto px-gutter">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-gutter">

                        {/* 1. Yaduvanshi Shiksha Niketan, MahenderGarh */}
                        <Link href="https://ysnmgh.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Yaduvanshi Shiksha Niketan, MahenderGarh"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://admin.yaduvanshigroup.edu.in/uploads/branchs/1782196595531-ed03fce9ad8d817e.jpeg" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Yaduvanshi Shiksha Niketan, MahenderGarh</p>
                                </div>
                            </div>
                        </Link>

                        {/* 2. Yaduvanshi Shiksha Niketan, Narnaul */}
                        <Link href="https://ysnnnl.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Yaduvanshi Shiksha Niketan, Narnaul"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://admin.yaduvanshigroup.edu.in/uploads/branchs/1782196658975-60154148faf9770c.jpeg" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Yaduvanshi Shiksha Niketan, Narnaul</p>
                                </div>
                            </div>
                        </Link>

                        {/* 3. Yaduvanshi Shiksha Niketan, Nangal Chaudhary */}
                        <Link href="https://ysnnch.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Yaduvanshi Shiksha Niketan, Nangal Chaudhary"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://admin.yaduvanshigroup.edu.in/uploads/branchs/1782197935464-abe1046539ebe47c.jpeg" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Yaduvanshi Shiksha Niketan, Nangal Chaudhary</p>
                                </div>
                            </div>
                        </Link>

                        {/* 4. Yaduvanshi Shiksha Niketan, Satnali */}
                        <Link href="https://ysnsatnali.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Yaduvanshi Shiksha Niketan, Satnali"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://admin.yaduvanshigroup.edu.in/uploads/branchs/1782196860315-7e01b30c0b6157e0.jpeg" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Yaduvanshi Shiksha Niketan, Satnali</p>
                                </div>
                            </div>
                        </Link>

                        {/* 5. Yaduvanshi Shiksha Niketan, Kanina */}
                        <Link href="https://ysnkanina.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Yaduvanshi Shiksha Niketan, Kanina"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://admin.yaduvanshigroup.edu.in/uploads/branchs/1782196903986-6f37a91ea40646af.jpeg" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Yaduvanshi Shiksha Niketan, Kanina</p>
                                </div>
                            </div>
                        </Link>

                        {/* 6. Yaduvanshi Shiksha Niketan, Rewari */}
                        <Link href="https://ysnrewari.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Yaduvanshi Shiksha Niketan, Rewari"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://admin.yaduvanshigroup.edu.in/uploads/branchs/1782196982829-2596b7d1b38ea274.jpeg" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Yaduvanshi Shiksha Niketan, Rewari</p>
                                </div>
                            </div>
                        </Link>

                        {/* 7. Yaduvanshi Shiksha Niketan, Kosli */}
                        <Link href="https://ysnkosli.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Yaduvanshi Shiksha Niketan, Kosli"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://admin.yaduvanshigroup.edu.in/uploads/branchs/1782197050002-2b8495d52b87ee98.jpeg" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Yaduvanshi Shiksha Niketan, Kosli</p>
                                </div>
                            </div>
                        </Link>

                        {/* 8. Yaduvanshi Shiksha Niketan, Gurugram Sec-33 */}
                        <Link href="https://ysngurugramsec33.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Yaduvanshi Shiksha Niketan, Gurugram Sec-33"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://admin.yaduvanshigroup.edu.in/uploads/branchs/1782197114404-418695cc18b74268.jpeg" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Yaduvanshi Shiksha Niketan, Gurugram Sec-33</p>
                                </div>
                            </div>
                        </Link>

                        {/* 9. Yaduvanshi Shiksha Niketan, Gurugram Sec-92 */}
                        <Link href="https://ysngurugramsec92.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Yaduvanshi Shiksha Niketan, Gurugram Sec-92"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://admin.yaduvanshigroup.edu.in/uploads/branchs/1782197147934-0581a80a28047452.jpeg" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Yaduvanshi Shiksha Niketan, Gurugram Sec-92</p>
                                </div>
                            </div>
                        </Link>

                        {/* 10. Yaduvanshi Shiksha Niketan, Charkhi Dadri */}
                        <Link href="https://hvmmandola.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Yaduvanshi Shiksha Niketan, Charkhi Dadri"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://admin.yaduvanshigroup.edu.in/uploads/branchs/1782195923309-9850066d31c04da9.jpeg" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Yaduvanshi Shiksha Niketan, Charkhi Dadri</p>
                                </div>
                            </div>
                        </Link>

                        {/* 11. Yaduvanshi Shiksha Niketan, Hansi */}
                        <Link href="https://ysnhansi.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Yaduvanshi Shiksha Niketan, Hansi"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://admin.yaduvanshigroup.edu.in/uploads/branchs/1782197223758-8f82ad88c8da3697.jpeg" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Yaduvanshi Shiksha Niketan, Hansi</p>
                                </div>
                            </div>
                        </Link>

                        {/* 12. Yaduvanshi Shiksha Niketan, Jind */}
                        <Link href="https://ysnjind.yaduvanshigroup.edu.in">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Yaduvanshi Shiksha Niketan, Jind"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://admin.yaduvanshigroup.edu.in/uploads/branchs/1782197281143-cd38ea07ac981a01.jpeg" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Yaduvanshi Shiksha Niketan, Jind</p>
                                </div>
                            </div>
                        </Link>

                        {/* 13. Yaduvanshi Shiksha Niketan, Dhani Mahu (Bhiwani) */}
                        <Link href="https://srlvmdhanimahu.yaduvanshigroup.edu.in/">
                            <div className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                <div className="aspect-video overflow-hidden">
                                    <img alt="Yaduvanshi Shiksha Niketan, Dhani Mahu (Bhiwani)"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src="https://admin.yaduvanshigroup.edu.in/uploads/branchs/1782198233612-5ad706d345c3335d.jpeg" />
                                </div>
                                <div className="p-4 border-t-4 border-heritage-navy">
                                    <p className="font-label-caps text-label-caps text-heritage-navy">Yaduvanshi Shiksha Niketan, Dhani Mahu (Bhiwani)</p>
                                </div>
                            </div>
                        </Link>

                    </div>
                </div>
            </section>

        </>
    )
}
