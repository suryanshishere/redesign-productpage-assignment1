// src/components/shared/HeroSection.tsx

import React, { useEffect, useRef, useState } from 'react'
import CountUp from 'react-countup' // ← count-up animation
import { useInView } from 'react-intersection-observer' // ← scroll-into-view detection
import smallBG from '@/assets/images/main-bg-small.png'
import { Button } from '@/components/ui'
import HomeNavbar from '@/components/shared/HomeNav'
import HcfSignupPopup from '@/components/shared/Popups/HcfSignupPopup'
import { IoVolumeMuteOutline, IoVolumeHighOutline } from 'react-icons/io5'

interface HeroSectionProps {
    scrollToSection: (ref: React.RefObject<HTMLElement>) => void
    featuresRef: React.RefObject<HTMLElement>
    contactRef: React.RefObject<HTMLElement>
    aboutRef: React.RefObject<HTMLElement>
}

const HeroSection: React.FC<HeroSectionProps> = ({
    scrollToSection,
    featuresRef,
    contactRef,
    aboutRef,
}) => {
    // State for video mute/unmute
    const [isMuted, setIsMuted] = useState(true)
    const toggleMute = () => setIsMuted((m) => !m)

    // New: allow re-triggering every time the stats enter viewport
    const [statsRef, inView] = useInView({
        triggerOnce: false, // ← fire on every enter/exit
        threshold: 0.3,
    })
    // New: count how many times we've entered view, to use as a key
    const [enterCount, setEnterCount] = useState(0)
    useEffect(() => {
        if (inView) {
            setEnterCount((c) => c + 1)
        }
    }, [inView])

    // Refs & scroll handler (unchanged)
    const contactEl = useRef<HTMLElement | null>(null)
    const aboutEl = useRef<HTMLElement | null>(null)
    const FqEl = useRef<HTMLElement | null>(null)

    interface SectionRef {
        current: HTMLElement | null
    }
    const scrollTo = (ref: SectionRef): void => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }

    // Sticky profile on scroll (unchanged)
    useEffect(() => {
        let lastScrollTop = 0
        const handleScroll = () => {
            const hcf = document.querySelector('.hcf-profile')
            const scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop

            if (scrollTop > lastScrollTop) {
                hcf?.classList.add('hcf-profile-fixed')
            } else {
                hcf?.classList.remove('hcf-profile-fixed')
            }
            lastScrollTop = scrollTop
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="!bg-[#01052f] w-full relative flex flex-col py-2 md:py-5 overflow-hidden px-8">
            {/* Navbar with scroll callbacks */}
            <HomeNavbar
                scrollToSection={scrollTo}
                featuresRef={FqEl}
                contactRef={contactEl}
                aboutRef={aboutEl}
            />
           
            <div className="min-h-[90vh] flex items-center">
                {/* Background video for larger screens */}
                {/* <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="hidden md:block absolute top-0 left-0 min-w-full min-h-full object-cover z-[-10]"
                >
                    <source src={bgVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video> */}

                {/* Background image for mobile */}
                <img
                    src={smallBG}
                    alt="background_image"
                    className="md:hidden h-full w-full object-cover absolute top-0 left-0 z-[-10]"
                />

                {/* Overlay to ensure text readability */}
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-[-5]" />

                <div className="relative z-10 text-white w-full flex flex-col-reverse lg:flex-row md:mt-6 lg:mt-0 lg:items-center lg:justify-center lg:gap-10 max-w-[1538px] mx-auto">
                    {/* Video Section */}
                    <div className="lg:w-5/12 mt-8 lg:mt-0 lg:mb-0 mb-6">
                        <div className="relative overflow-hidden pt-[56.25%] rounded-lg shadow-lg">
                            <iframe
                                src={`https://www.youtube.com/embed/xQl8i2sO_Ls?autoplay=1&mute=${
                                    isMuted ? 1 : 0
                                }&loop=1&playlist=xQl8i2sO_Ls&controls=0&showinfo=0&rel=0`}
                                title="Product Demo Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute top-0 left-0 w-full h-full"
                            ></iframe>
                            <button
                                onClick={toggleMute}
                                className="absolute bottom-4 right-4 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
                            >
                                {isMuted ? (
                                    <IoVolumeMuteOutline size={24} />
                                ) : (
                                    <IoVolumeHighOutline size={24} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="lg:w-2/5">
                        <h1 className="text-2xl md:text-4xl font-semibold mb-4 capitalize text-white">
                            <span >
                                AI front office{' '}
                            </span>{' '}
                            <br />
                            for healthcare agents
                        </h1>
                        <p
                            style={{ lineHeight: '0.7' }}
                            className="text-lg my-8 font-light"
                        >
                            Create{' '}
                            <span className="text-primary font-bold">
                                AI Store
                            </span>{' '}
                            in 2 min
                            <br />
                            <br />
                            Scale with{' '}
                            <span className="font-bold text-primary">
                                Digital Marketing
                            </span>
                        </p>
                        <HcfSignupPopup
                            popupButtonStatus
                            buttonChildren={
                                <Button
                                    block
                                    variant="solid"
                                    className="rounded-full max-w-[300px]"
                                >
                                    Get Started
                                </Button>
                            }
                        />

                        {/* Stats with count-up animation that replays on each scroll-into-view */}
                        <div
                            ref={statsRef}
                            className="text-white flex gap-8 mt-8 flex-wrap"
                        >
                            <div>
                                <h1 className="text-3xl font-bold text-white">
                                    {inView ? (
                                        <CountUp
                                            key={`doctors-${enterCount}`}
                                            start={0}
                                            end={2100}
                                            duration={2}
                                            useEasing
                                            redraw
                                        />
                                    ) : (
                                        0
                                    )}
                                    <span className="text-primary ml-1">+</span>
                                </h1>
                                <p className="text-lg capitalize">
                                    qualified doctors
                                </p>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">
                                    {inView ? (
                                        <CountUp
                                            key={`hospitals-${enterCount}`}
                                            start={0}
                                            end={1000}
                                            duration={2}
                                            useEasing
                                            redraw
                                        />
                                    ) : (
                                        0
                                    )}
                                    <span className="text-primary ml-1">+</span>
                                </h1>
                                <p className="text-lg capitalize">hospitals</p>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">
                                    {inView ? (
                                        <CountUp
                                            key={`plans-${enterCount}`}
                                            start={0}
                                            end={800}
                                            duration={2}
                                            useEasing
                                            redraw
                                        />
                                    ) : (
                                        0
                                    )}
                                    <span className="text-primary ml-1">+</span>
                                </h1>
                                <p className="text-lg capitalize">
                                    treatment plans
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
