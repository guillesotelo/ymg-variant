'use client'

import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import Image from 'next/image'

type Props = {}

export default function Contact({ }: Props) {
    const { darkMode } = useContext(AppContext)
    const darkModeFilter = !darkMode ? 'invert(36%) sepia(6%) saturate(4053%) hue-rotate(167deg) brightness(80%) contrast(78%)' : ''

    return (
        <div className="contact__container">
            <h1 className='page__title'>Contact Us</h1>
            <p className='page__text'>We'd love to hear from you! Whether you have a question, feedback, or want to connect with us, feel free to reach out. Your input helps us improve and deliver the best service to you.</p>

            <p className='page__text'>General inquiries: <a href='mailto:hello@ymgconsultancy.com'>hello@ymgconsultancy.com</a></p>

            <h2 className='page__subtitle'>Find us on Social</h2>
            <div className="contact__social">
                {/* <a target='_blank' href='https://www.linkedin.com/in/guillermosotelo'>
                    <img src='assets/icons/linkedin.svg' alt="Linkedin" className="contact__social-svg" style={{ filter: darkModeFilter }} />
                </a> */}
                <a target='_blank' href='https://www.instagram.com/ymgconsultancy'>
                    <img src='assets/icons/instagram.svg' alt="Instagram" className="contact__social-svg" style={{ filter: darkModeFilter }} />
                </a>
            </div>
            <p className='page__text' style={{ textAlign: 'center' }}>Thanks for getting in touch. We're looking forward to our digital connection!</p>
        </div>
    )
} 