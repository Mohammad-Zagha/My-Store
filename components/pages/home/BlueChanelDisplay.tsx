'use client'
import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { useLoader } from '@react-three/fiber'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import Image from 'next/image'
import { Button } from '../../chadcn/button'
import { CiHeart, CiShoppingCart } from 'react-icons/ci'

const Model = () => {
   const gltf = useLoader(GLTFLoader, '/3d/bleu_de_chanel_perfume.glb') // Replace with the actual path to your GLTF file

   const modelRef = useRef<THREE.Object3D>()

   // Auto-rotate the model
   useFrame(() => {
      if (modelRef.current) {
         modelRef.current.rotation.y += 0.003
      }
   })

   return <primitive object={gltf.scene} ref={modelRef} />
}

const CameraAnimation = ({ isInView }: { isInView: boolean }) => {
   const { camera } = useThree()
   const cameraRef = useRef(camera)

   useEffect(() => {
      if (isInView) {
         gsap.to(cameraRef.current.position, {
            x: 5,
            y: 2,
            z: 12,
            duration: 2,
            ease: 'power3.out',
         })

         gsap.to(cameraRef.current.rotation, {
            x: 2,
            y: 0,
            z: 20,
            duration: 2,
            ease: 'power3.out',
         })
      }
   }, [isInView])

   return null
}

const Component = () => {
   const textRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      gsap.fromTo(
         textRef.current,
         { y: 50, opacity: 0 },
         { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.2 },
      )

      if (textRef.current) {
         gsap.to(textRef.current.querySelector('h1'), {
            textShadow: '0px 0px 20px rgba(255, 255, 255, 0.8)',
            repeat: -1,
            yoyo: true,
            duration: 1,
            ease: 'power1.inOut',
         })
      }
   }, [])

   return (
      <div
         className="col-span-1 flex flex-col items-start   justify-start text-start gap-10 max-md:hidden  md:flex "
         ref={textRef}
      >
         <h1 className="text-6xl md:text-7xl font-bold tracking-wide    text-transparent py-4 bg-background-dark w-full bg-clip-text overflow-visible drop-shadow-lg">
            بلو دي شانيل
         </h1>
         <p className=" break-words leading-1 text-lg   text-white font-bold  ">
            عطر فاخر يتكون من مزيج من الحمضيات والأخشاب النفيسة والعنبر. العطر الذي يمثل الرجل العصري الذي يعيش بأسلوب
            حياة مليء بالتحديات والمغامرات.
         </p>
         <div className="p-4 w-full md:w-fit max-md:justify-center font-Ubuntu text-white text-2xl md:text-4xl flex gap-4 md:gap-6 items-center md:bg-white/10 md:backdrop-blur-md rounded-lg animate-text">
            <Button className="bg-white/30 " size="icon">
               <CiHeart className="text-white" />
            </Button>

            <div className=" size-2 rounded-full bg-white"></div>

            <Button className="bg-white/30 " size="icon">
               <CiShoppingCart size={30} className="text-white" />
            </Button>
            <span>$299.99</span>
         </div>
      </div>
   )
}

const BlueChanelDisplay = () => {
   const [windowSize, setWindowSize] = useState([0, 0]) // Default to 0 to avoid server-side rendering issues
   const containerRef = useRef(null)
   const isInView = useInView(containerRef, { once: true }) // Trigger animation when in view

   useEffect(() => {
      const handleResize = () => {
         setWindowSize([window.innerWidth, window.innerHeight])
      }
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
   }, [])

   const isMobile = windowSize[0] < 768

   return (
      <motion.div
         ref={containerRef}
         className="relative h-screen w-full overflow-hidden"
         initial={{ clipPath: 'circle(0% at 50% 50%)' }}
         animate={isInView ? { clipPath: 'circle(100% at 50% 50%)' } : {}}
         transition={{ duration: 1.5, ease: 'easeInOut' }}
      >
         {/* Arabic Text Overlay */}
         <motion.div
            className="absolute inset-0 grid grid-cols-1 md:grid-cols-3 p-5 py-[130px] max-md:py-10 text-white z-10"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
         >
            {/* Left Column */}
            <Component />

            {/* Center Column */}
            <div className="col-span-1 flex flex-col justify-end  items-center md:gap-8 gap-5 ">
               <div className="flex flex-wrap justify-center gap-4">
                  <Button className="bg-white hover:bg-white/85 text-primary-dark px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition">
                     اشتري الآن
                  </Button>
                  <Button className="bg-primary-dark text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition">
                     اضافة الى السلة
                  </Button>
               </div>
               <div className="p-4 w-full md:w-fit md:hidden max-md:justify-center font-Ubuntu text-white text-2xl md:text-4xl flex gap-4 md:gap-6 items-center bg-white/10 backdrop-blur-md rounded-lg animate-text">
                  <Button className="bg-white/30 " size="icon">
                     <CiHeart className="text-white" />
                  </Button>

                  <div className=" size-2 rounded-full bg-white"></div>

                  <Button className="bg-white/30 " size="icon">
                     <CiShoppingCart size={30} className="text-white" />
                  </Button>
                  <span>$299.99</span>
               </div>
            </div>

            {/* Right Column */}
            <div className="col-span-1 flex flex-col items-end gap-5 max-md:hidden md:flex">
               <Image
                  alt="bleu1"
                  src={'/perfums/bleu/image-1.png'}
                  height={160}
                  width={160}
                  className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
               />
               <Image
                  alt="bleu2"
                  src={'/perfums/bleu/image-2.png'}
                  height={160}
                  width={160}
                  className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
               />
               <Image
                  alt="bleu3"
                  src={'/perfums/bleu/image-3.png'}
                  height={160}
                  width={160}
                  className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
               />
            </div>
         </motion.div>

         {/* 3D Model Canvas */}

         <Canvas camera={{ position: isMobile ? [15, 4, 30] : [30, 51, 50] }}>
            {/* Key Light */}
            <spotLight
               intensity={20} // Increase intensity for a stronger highlight
               position={[5, 10, 15]} // Position to simulate a studio light
               angle={0.3}
               penumbra={1}
               castShadow
            />

            {/* Fill Light */}
            <pointLight
               intensity={1.5} // Softer ambient light to fill shadows
               position={[0, 5, 0]}
            />

            {/* Back Light */}
            <spotLight intensity={1.2} position={[0, 5, 0]} angle={0.8} penumbra={0.9} />

            <ambientLight intensity={0.9} />
            <ContactShadows position={[0, -1.4, 0]} opacity={0.5} scale={10} blur={1.5} far={4.5} />

            {/* Suspense */}
            <Suspense fallback={null}>
               <Environment files={'/3d/environment/pool.hdr'} background backgroundIntensity={1} />
               {/* Adjust to reduce ambient spill */}
               <Model />
            </Suspense>

            <CameraAnimation isInView={isInView} />
            <OrbitControls enableZoom={false} />
         </Canvas>
      </motion.div>
   )
}

export default BlueChanelDisplay
