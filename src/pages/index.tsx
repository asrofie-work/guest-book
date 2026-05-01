"use client"
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState, useRef } from "react";
import { Autocomplete } from "@mui/material"
import { TextField } from "@mui/material"
import { useRouter } from "next/router";
import {
  MailOutlined,
  PersonOutlined,
  BookOutlined,
  ThumbUpOutlined,
  HomeOutlined
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const inputJilidRef = useRef<HTMLInputElement>(null);
  const [santri, setSantri] = useState([])
  const [name, setName] = useState('')
  const [jilidName, setJilidName] = useState('')
  const [jilid, setJilid] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleReset = () => setIsSubmitted(false);
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
    setName('')
    setJilidName('')
    setIsSubmitted(true)
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans">
      <div className="w-full max-w-[360px] h-[640px] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative">

        {/* Background Layer: Handles the pink expansion */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          initial={false}
          animate={{
            height: isSubmitted ? '100%' : '33.33%',
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ backgroundColor: '#fca5a5' }}
        >
          {/* Subtle Decorative Background Elements (Stars/Circles) */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-10 border border-white rounded-full w-2 h-2" />
            <div className="absolute top-20 right-12 border border-white rotate-45 w-2 h-2" />
            <div className="absolute top-12 right-24 border border-white rounded-full w-1 h-1" />
            <div className="absolute bottom-10 left-20 border border-white rounded-full w-1 h-1" />
          </div>

          {/* SVG Curve - Anchored to the bottom of the pink area */}
          <AnimatePresence>
            {!isSubmitted && (
              <motion.div
                exit={{ opacity: 0 }}
                className="absolute bottom-0 w-full overflow-hidden leading-[0] translate-y-[99%]"
              >
                <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-[60px]">
                  <path d="M0,0 C150,120 350,120 500,0 L500,0 L0,0 Z" fill="#fca5a5" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Content Layer: Text and Icon */}
        <div className="absolute inset-0 z-30 pointer-events-none flex flex-col items-center">
          {/* WELCOME / THANK YOU Text */}
          <motion.h1
            className="text-white text-3xl font-bold tracking-widest mt-16"
            animate={{
              y: isSubmitted ? 250 : 0,
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {isSubmitted ? 'Terima Kasih' : (<span className="text-center">IMTIHAN III<br /><small style={{ fontSize: '18px' }}>TPQ DARUZZAHRAH</small></span>)}
          </motion.h1>
          {/* Profile/Thumb Icon */}
          <motion.div
            className="mt-12"
            animate={{
              y: isSubmitted ? 70 : 0,
              rotateY: isSubmitted ? 180 : 0
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#ff758c] to-[#ff7eb3] flex items-center justify-center shadow-lg border-4 border-white">
              <motion.div
                animate={{ rotateY: isSubmitted ? 180 : 0 }}
                transition={{ duration: 0.6 }}
              >
                {isSubmitted ? (
                  <ThumbUpOutlined className="text-white !text-4xl" />
                ) : (
                  <PersonOutlined className="text-white !text-4xl" />
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Form Layer: Positioned in the middle/bottom half */}
        <div className="flex-1 z-20 px-10 flex flex-col justify-center pt-64 pb-12">
          <motion.div
            className="space-y-8 mb-12"
            animate={{ opacity: isSubmitted ? 0 : 1 }}
          >
            <div className="flex items-center border-b border-gray-300 py-2 group focus-within:border-[#ff758c] transition-colors">
              <PersonOutlined className="text-gray-400 mr-3 !text-xl" />
              <Autocomplete
                className="w-full bg-transparent focus:outline-none text-gray-600 placeholder-gray-400"
                freeSolo
                options={santri}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Santri" />}
                value={name}
                onChange={(event, value) => {
                  setName(value as string)
                  setTimeout(() => {
                    if (inputJilidRef && inputJilidRef.current) {
                      inputJilidRef.current.focus();
                    }
                  }, 100);
                }}
              />
            </div>
            <div className="flex items-center border-b border-gray-300 py-2 focus-within:border-[#ff758c] transition-colors">
              <BookOutlined className="text-gray-400 mr-3 !text-xl" />
              <Autocomplete
                className="w-full bg-transparent focus:outline-none text-gray-600 placeholder-gray-400"
                freeSolo
                options={jilid}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField ref={inputJilidRef} {...params} label="Jilid" />}
                value={jilidName}
                onChange={(event, value) => {
                  setJilidName(value as string)
                }}
              />
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="space-y-4"
            animate={{ opacity: isSubmitted ? 0 : 1 }}
          >
            <button
              onClick={handleAbsen}
              className="w-full py-3 bg-gradient-to-r from-[#ff758c] to-[#ff7eb3] text-white rounded-full font-bold shadow-md active:scale-95 transition-transform"
            >
              ABSEN
            </button>
          </motion.div>
        </div>

        {/* Home Button Overlay */}
        {/* <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-12 left-0 w-full flex justify-center z-40 px-10"
            >
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 w-full py-3 bg-white text-[#ff758c] rounded-full font-bold shadow-xl hover:bg-gray-100 transition-all active:scale-95"
              >
                <HomeOutlined />
                HOME
              </button>
            </motion.div>
          )}
        </AnimatePresence> */}
      </div>
    </div>
  )
}
