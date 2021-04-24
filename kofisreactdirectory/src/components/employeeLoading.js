import React, { useState, useEffect } from 'react'
import Employees from "./employees"

// Will be pulling in name, email, age, phone, ID, date of birth, picture



export default function EmployeeLoading() {
    const [users, setUsers] = useState([])
    let URL = "https://randomuser.me/api/?results=10&?nat=us"
    useEffect(() => {
        fetch(URL)
            .then(res => {
                return res.json()
            })
            .then(results => setUsers(results.results))
            .catch(e => console.log(e))
    }, [])
    console.log(users, 'this is our state users')
    let sortByAge = () => {
        let ageSort = users.sort((a, b) => {
            return a.dob.age - b.dob.age
        })
        setUsers(ageSort)
    }

    return (
        <div>
            <button className="button" onClick={() => sortByAge()}> Sort by Age </button>
            <button className="button"> Filter by Gender </button>
            {users && users.map((index, key) => {
                return (
                    <div key={key}>
                        <Employees
                            last={index.name.last}
                            first={index.name.first}
                            email={index.email}
                            phone={index.phone}
                            dob={index.dob.date}
                            age={index.dob.age}
                            gender={index.gender}
                            id={index.id.value}
                            img={index.picture.large}
                        />
                    </div>
                )
            })}
        </div>
    )
}

