"use client"

import { useState } from "react"

export default function LoginPage() {

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [result,setResult] = useState("")

  const login = async ()=>{

    const res = await fetch("http://localhost:3340/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        username:username,
        password:password
      })
    })

    const data = await res.json()

    if(res.ok){
      localStorage.setItem("token",data.access_token)
      setResult("Login success")
      console.log(data.access_token)
    }else{
      setResult("Login failed")
    }

  }

  return(

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white w-[360px] p-8 rounded-lg shadow-md">

        <h1 className="text-2xl font-semibold text-center mb-6">
          Login
        </h1>

        <div className="mb-4">
          <p className="text-sm mb-1">Username</p>
          <input
            type="text"
            placeholder="username"
            onChange={(e)=>setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-5">
          <p className="text-sm mb-1">Password</p>
          <input
            type="password"
            placeholder="password"
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <button
          onClick={login}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
        >
          Login
        </button>

        <p className="text-center text-sm mt-4">
          {result}
        </p>

      </div>

    </div>

  )

}