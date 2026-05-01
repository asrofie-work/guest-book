"use client"
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import { Autocomplete } from "@mui/material"
import { TextField } from "@mui/material"
import { useRouter } from "next/router";
import {
  MailOutlined,
  PersonOutlined,
  BookOutlined
} from '@mui/icons-material';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const router = useRouter()
  const [santri, setSantri] = useState([])
  const [name, setName] = useState('')
  const [jilidName, setJilidName] = useState('')
  const [jilid, setJilid] = useState([])
  useEffect(() => {
    fetch('/api/santri')
      .then((res) => res.json())
      .then((data) => {
        setSantri(data.santri.map((item: any) => item.name))
        setJilid(data.jilid.map((item: any) => item.name))
      })
  }, [])

  const handleAbsen = () => {
    if (!name || !jilidName) return;
    fetch('/api/absen?name=' + encodeURIComponent(name) + '&jilid=' + encodeURIComponent(jilidName))
    router.replace('/terima-kasih')
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* Mobile-styled Card Container */}
      <div className="w-full max-w-[360px] h-[640px] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative">

        {/* Curved Header Section */}
        <div className="relative h-1/3 bg-[#fca5a5] flex flex-col items-center justify-center">
          <h1 className="text-white text-center text-3xl font-bold tracking-widest mt-4">
            IMTIHAN<br />2026
          </h1>

          {/* Subtle Decorative Background Elements */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-10 left-10 border border-white rounded-full w-2 h-2" />
            <div className="absolute top-20 right-12 border border-white rotate-45 w-2 h-2" />
            <div className="absolute bottom-10 left-20 border border-white rounded-full w-1 h-1" />
          </div>

          {/* Curved Bottom Edge using SVG */}
          <div className="absolute bottom-0 w-full overflow-hidden leading-[0] translate-y-[99%]">
            <svg
              viewBox="0 0 500 150"
              preserveAspectRatio="none"
              className="relative block w-full h-[60px]"
            >
              <path
                d="M0,0 C150,120 350,120 500,0 L500,0 L0,0 Z"
                fill="#fca5a5"
              ></path>
            </svg>
          </div>
        </div>

        {/* Profile Icon Overlay */}
        <div className="absolute top-[33%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#ff758c] to-[#ff7eb3] flex items-center justify-center shadow-lg border-4 border-white">
            <PersonOutlined className="text-white !text-4xl" />
          </div>
        </div>

        {/* Form Section */}
        <div className="flex-1 px-10 pt-20 pb-10 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Email Input */}
            <div className="flex items-center border-b border-gray-300 py-2 group focus-within:border-[#ff758c] transition-colors">
              <PersonOutlined className="text-gray-400 mr-3 !text-xl" />
              <Autocomplete
                className="w-full bg-transparent focus:outline-none text-gray-600 placeholder-gray-400"
                freeSolo
                options={santri}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Santri" />}
                value={name}
                onChange={(event, value) => setName(value as string)}
              />
            </div>

            {/* Username Input */}
            <div className="flex items-center border-b border-gray-300 py-2 focus-within:border-[#ff758c] transition-colors">
              <BookOutlined className="text-gray-400 mr-3 !text-xl" />
              <Autocomplete
                className="w-full bg-transparent focus:outline-none text-gray-600 placeholder-gray-400"
                freeSolo
                options={jilid}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Jilid" />}
                value={jilidName}
                onChange={(event, value) => setJilidName(value as string)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button onClick={handleAbsen} className="w-full py-3 bg-transparent border border-[#ff758c] text-[#ff758c] rounded-full font-bold active:scale-95 transition-transform">
              Absen
            </button>
          </div>
        </div>
      </div>
    </div >
  )
}
