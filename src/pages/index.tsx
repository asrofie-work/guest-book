"use client"
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import { Autocomplete } from "@mui/material"
import { TextField } from "@mui/material"
import { useRouter } from "next/router";

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
    <div
      className={`${geistSans.className} ${geistMono.className} flex min-h-screen items-center justify-center font-sans`}
    >
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight">
            Absensi Santri
          </h1>
          <p>Silahkan pilih nama Anda untuk melakukan absensi</p>
        </div>
        <div className="flex flex-col mt-6 gap-4 text-base font-medium sm:flex-row">
          <Autocomplete
            freeSolo
            options={santri}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Santri" />}
            value={name}
            onChange={(event, value) => setName(value as string)}
          />
        </div>
        <div className="flex flex-col mt-6 gap-4 text-base font-medium sm:flex-row">
          <Autocomplete
            freeSolo
            options={jilid}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Jilid" />}
            value={jilidName}
            onChange={(event, value) => setJilidName(value as string)}
          />
        </div>
        <div className="flex flex-col mt-6 gap-4 text-base font-medium sm:flex-row">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleAbsen}>Absen</button>
        </div>
      </main>
    </div>
  );
}
