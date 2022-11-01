import React, { useState, useEffect } from 'react'

export default function ServiceData({ showData }) {
    const [noRecord, setNoRecord] = useState(false)

    const tableHeaders = ['Phone Number', 'Aadhar No.', 'House No.', 'City', 'State', 'Pin Code', 'Call Start', 'Call End', 'Call Status', 'Notes', 'Services'];

    const [getRescueServiceData, setRescueServiceData] = useState([]);

    const getRescueData = async () => {
        const res = await fetch(`http://localhost:3001/rescuedata/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rescue_id: showData }),
        });
        const data = await res.json();
        if (res.status === 422 || !data) console.log("error ");
        else setRescueServiceData(data)
    }

    useEffect(() => {
        getRescueData();
        if (showData != "") setNoRecord(true)
    }, [showData])

    console.log('ServiceData noRecord', noRecord)
    console.log('getRescueServiceData.length ', getRescueServiceData.length)

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
                        {getRescueServiceData.length > 0 && getRescueServiceData.map((val, index) => {
                            return (<React.Fragment>
                                <tr key={index}>
                                    <td>{val.phone_number}</td>
                                    <td>{val.Adhar}</td>
                                    <td>{val.house_no}</td>
                                    <td>{val.city}</td>
                                    <td>{val.state}</td>
                                    <td>{val.pincode}</td>
                                    <td>{val.call_start_time}</td>
                                    <td>{val.call_end_time}</td>
                                    <td>{val.call_status}</td>
                                    <td>{val.notes}</td>
                                    <td>{val.rescue_name}</td>
                                </tr>
                            </React.Fragment>)
                        })}
                        {getRescueServiceData.length === 0 && noRecord && <tr colspan="11" style={{ color: 'red' }}>No RECORD FOUND</tr>}
                    </tbody>
                </table>
            </div>
        </>
    )
}
