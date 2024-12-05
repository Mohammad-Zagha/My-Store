import { AnimatedTestimonials } from '@/components/animated/animated-testimonials'
import React from 'react'

const CustomerStatement = () => {
   const testimonials = [
      {
         quote: 'الاهتمام بالتفاصيل والميزات المبتكرة قد غيّر تمامًا من سير عملنا. هذا هو بالضبط ما كنا نبحث عنه.',
         name: 'سارة تشين',
         designation: 'مديرة المنتجات في TechFlow',
         src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
         quote: 'عملية التنفيذ كانت سلسة والنتائج فاقت توقعاتنا. مرونة المنصة مذهلة.',
         name: 'مايكل رودريغيز',
         designation: 'رئيس قسم التكنولوجيا في InnovateSphere',
         src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
         quote: 'هذا الحل حسّن بشكل كبير من إنتاجية فريقنا. الواجهة البديهية تجعل المهام المعقدة بسيطة.',
         name: 'إيميلي واتسون',
         designation: 'مديرة العمليات في CloudScale',
         src: 'https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
         quote: 'دعم متميز وميزات قوية. من النادر العثور على منتج يفي بجميع وعوده.',
         name: 'جيمس كيم',
         designation: 'رئيس فريق الهندسة في DataPro',
         src: 'https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
         quote: 'القدرة على التوسع والأداء كانت نقطة تحول كبيرة لمنظمتنا. أوصي بشدة لأي شركة تنمو.',
         name: 'ليزا تومسون',
         designation: 'نائب رئيس التكنولوجيا في FutureNet',
         src: 'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
   ]

   return <AnimatedTestimonials testimonials={testimonials} />
}

export default CustomerStatement
