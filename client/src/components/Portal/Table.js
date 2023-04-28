import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Table() {
    const navigation = useNavigate()
    const [data, setData] = useState([])

    //Alert function;
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            let id = localStorage.getItem("id")
            let res = await axios.get(`http://localhost:7000/url/data/${id}`)
            if (res.data) {
                setData(res.data)
            } else {
                Toast.fire({ icon: 'error', title: `Please Login first` })
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const View=(data)=>{
        navigation('/home/view',{state:{data}})
    }

    return (
        <>
            <div className="py-5">
                <div className="container">
                    <div className="row hidden-md-up">
                        {
                            data ? data.map((item,index) => {
                                return (
                                    <div key={index} className="col-md-4 mb-4">
                                        <div className="card">
                                            <div className="card-block">
                                                <h4 className="card-title text-center mt-3 mb-2">{item.TITLE}</h4>
                                                <div className="d-flex justify-content-center mb-3">
                                                    <button className="btn btn-sm btn-primary" onClick={()=>{View(item)}}>View</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <h1 className='text-center mt-5'>Please Login first...</h1>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Table