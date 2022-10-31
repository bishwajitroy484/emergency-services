import React, { useState, useEffect } from 'react'

export default function ServiceData({ showData, loginOperator }) {
    console.log('ServiceData showData', showData)
    console.log('ServiceData loginOperator', loginOperator)

    const tableHeaders = ['Phone Number', 'Aadhar No.', 'House No.', 'State', 'City', 'Pin Code', 'Call Start', 'Call End', 'Call Status', 'Notes', 'Services'];

    const [getRescueServiceData, setRescueServiceData] = useState([]);

    const getRescueData = async () => {
        const operatorId = JSON.parse(loginOperator)

        console.log('In Func ServiceData showData', showData)
        console.log('In Func ServiceData loginOperator', loginOperator)

        const res = await fetch(`http://localhost:3001/rescuedata/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rescue_id: 7 }),
        });
        const data = await res.json();
        if (res.status === 422 || !data) console.log("error ");
        else setRescueServiceData(data)
    }

    useEffect(() => {
        getRescueData();
    }, [])

    return (
        <>
            <div className='container-fluid'>
                <table class="table table-hover table-sm table-bordered">
                    <thead >
                        <tr className='bg-info'>
                            {tableHeaders.map(item => <th scope='col'>{item}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {getRescueServiceData.map((val, index) => {
                            return (<React.Fragment>
                                <tr key={index}>
                                    <td>{val.phone_number}</td>
                                    <td>{val.Adhar}</td>
                                    <td>{val.house_no}</td>
                                    <td>{val.state}</td>
                                    <td>{val.city}</td>
                                    <td>{val.pincode}</td>
                                    <td>{val.call_start_time}</td>
                                    <td>{val.call_end_time}</td>
                                    <td>{val.call_status}</td>
                                    <td>{val.notes}</td>
                                    <td>{val.rescue_name}</td>
                                </tr>
                            </React.Fragment>)
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
