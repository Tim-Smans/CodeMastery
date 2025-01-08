"use client"
import { FC, useEffect, useState } from "react"
import { motion } from 'framer-motion'

interface Props {
    message?: string
  }
  
const LoadingScreen: FC<Props> = ({message = "Loading exercises..."}) => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer)
            return 100
          }
          const diff = Math.random() * 10
          return Math.min(oldProgress + diff, 100)
        })
      }, 200)
  
      return () => {
        clearInterval(timer)
      }
    }, [])
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-red-500 to-red-600">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d="M60 10L10 35V85L60 110L110 85V35L60 10Z"
                stroke="white"
                strokeWidth="4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                fill="white"
                fontSize="24"
                fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                CM
              </motion.text>
            </svg>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">{message}</h2>
            <div className="w-64 h-2 bg-red-300 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    )
}

export default LoadingScreen