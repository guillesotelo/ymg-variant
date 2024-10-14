"use client";

import { useRouter } from "next/navigation";
import Button from "src/components/Button/Button";

const Home = () => {

    const router = useRouter()
    return (
        <div className="home__container">
            <div className="home__bg-image" style={{
                backgroundImage: '/bg_image.jpg'
            }}>
                <p className="home__bg-title">Where Expertise Meets Flavor</p>
                <p className="home__bg-subtitle">Driving culinary innovation through strategic consultancy and powerful networks.</p>
                <Button
                    label='Start Your Journey'
                    handleClick={() => router.push('/contact')}
                    bgColor="#053C5E"
                    textColor="white"
                    style={{
                        width: 'fit-content',
                        marginTop: '4rem',
                        transform: 'scale(1.3)',
                        animation: 'fade-in 1s ease-in forwards',
                        animationDelay: '3s',
                        opacity: 0
                    }}
                />
            </div>
        </div>
    )
}

export default Home;
