"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Space_Grotesk, Playfair_Display } from "next/font/google";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, ExternalLink, Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, Play, Pause } from "lucide-react";
import emailjs from '@emailjs/browser';

// Fonts
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "500", "700"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });

// Animation Variants
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
};

// --- ULTRA STABLE VIDEO PLAYER WITH LOADING ANIMATION ---
function VideoPlayer({ src, className }: { src: string, className?: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLoading, setIsLoading] = useState(true); // Loading State
    const [isPlaying, setIsPlaying] = useState(false); // Play State

    useEffect(() => {
        setIsLoading(true); // Source එක මාරු වෙනකොට ආයෙත් Loading පටන් ගන්න
        const video = videoRef.current;
        if (!video) return;

        video.muted = true;
        video.defaultMuted = true;

        // වීඩියෝ එක Play කරන්න පුළුවන් වුන ගමන් Loading නවත්තන්න
        const onCanPlay = () => {
            setIsLoading(false);
            // playVideo call removed to disable autoplay
        };

        video.load();
        video.addEventListener("canplay", onCanPlay);

        return () => {
            video.removeEventListener("canplay", onCanPlay);
        };
    }, [src]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
            } else {
                videoRef.current.play();
                setIsPlaying(true);
            }
        }
    };


    return (
        <div className={`relative w-full h-full bg-gray-900 overflow-hidden group/player ${className}`}>

            {/* --- LOADING SPINNER (Only visible when loading) --- */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <div className="w-10 h-10 border-4 border-white/10 border-t-brand-green rounded-full animate-spin"></div>
                </div>
            )}

            {/* --- PLAY/PAUSE BUTTON OVERLAY --- */}
            {!isLoading && (
                <div
                    onClick={togglePlay}
                    className="absolute inset-0 z-30 flex items-center justify-center cursor-pointer"
                >
                    <div className={`
                        bg-black/40 backdrop-blur-md p-4 rounded-full border border-white/10 
                        transition-all duration-300 transform hover:scale-110 hover:bg-brand-green/20 hover:border-brand-green/50
                        ${isPlaying ? 'opacity-0 group-hover/player:opacity-100' : 'opacity-100 scale-100'}
                    `}>
                        {isPlaying ? (
                            <Pause className="w-8 h-8 text-white fill-white" />
                        ) : (
                            <Play className="w-8 h-8 text-white fill-white ml-1" />
                        )}
                    </div>
                </div>
            )}

            {/* --- VIDEO ELEMENT --- */}
            <video
                ref={videoRef}
                className={`w-full h-full object-cover transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                src={src}
                loop
                muted
                playsInline
                preload="metadata"
            />
        </div>
    );
}

// ---------------- PROJECT DATA ----------------
const projects = [
    {
        id: 1,
        title: "School Website",
        tech: "React.js • Framer Motion • Tailwind",
        pcVideo: "/p1-pc.mp4",
        mobileVideo: "/p1-mob.mp4",
        link: "https://subarthi-college.vercel.app/",
    },
    {
        id: 2,
        title: "Arix AI System",
        tech: "Python • Groq •Pyqt6",
        pcVideo: "/p3-pc.mp4",
        mobileVideo: "/p3-mob.mp4",
        link: "https://github.com/dasunravihansa/Arix-AI-System/tree/main",
    },
    {
        id: 3,
        title: "Super Market Login System",
        tech: "Python • Pyqt6 • Sqlite3",
        pcVideo: "/p2-pc.mp4",
        mobileVideo: "/p2-mob.mp4",
        link: "https://github.com/dasunravihansa/Arix-Login-System.git",
    },
];

// --- TYPING ANIMATION COMPONENT ---
function TypingText({ words }: { words: string[] }) {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);
    const [blink, setBlink] = useState(true);

    // Blinking cursor effect
    useEffect(() => {
        const timeout2 = setTimeout(() => {
            setBlink((prev) => !prev);
        }, 500);
        return () => clearTimeout(timeout2);
    }, [blink]);

    useEffect(() => {
        if (subIndex === words[index].length + 1 && !reverse) {
            setReverse(true);
            return;
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1500 : 150, parseInt((Math.random() * 350).toString())));

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, words]);

    return (
        <span className="text-brand-green tracking-widest text-sm font-medium uppercase">
            {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
        </span>
    );
}

export default function Home() {
    const [activeTab, setActiveTab] = useState("pc");
    const [particles, setParticles] = useState<any[]>([]);

    // Form States
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // --- PARTICLES GENERATION ---
    useEffect(() => {
        const generatedParticles = [...Array(20)].map(() => ({
            x: Math.random() * 1000,
            y: Math.random() * 1000,
            scale: Math.random(),
            duration: Math.random() * 5 + 5,
            delay: Math.random() * 5,
            size: Math.random() * 4 + 1
        }));
        setParticles(generatedParticles);
    }, []);

    // --- HANDLE FORM SUBMIT WITH EMAILJS ---
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const templateParams = {
            name: formState.name,
            user_name: formState.name,
            user_email: formState.email,
            message: formState.message
        };

        emailjs.send(
            'service_n6z1qw9',   // Your Service ID
            'template_qrksw7v',  // Your Template ID
            templateParams,
            'RvyEJRbfzjhAIe9hv'  // Your Public Key
        )
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setIsSubmitting(false);
                setIsSubmitted(true);
                setFormState({ name: "", email: "", message: "" });

                setTimeout(() => setIsSubmitted(false), 3000);
            })
            .catch((err) => {
                console.error('FAILED...', err);
                setIsSubmitting(false);
                alert("Error Details: " + JSON.stringify(err));
            });
    };

    return (
        <main className={`min-h-screen bg-brand-dark text-white ${spaceGrotesk.className} overflow-x-hidden relative selection:bg-brand-green selection:text-brand-dark`}>

            {/* ------------------- NAVIGATION BAR ------------------- */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 md:px-12 backdrop-blur-md bg-brand-dark/50 border-b border-white/5"
            >
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-brand-green" />
                    <span className="font-bold tracking-widest text-sm md:text-base">MR.DASUN RAVIHANSA</span>
                </div>
                <Link href="#contact" className="px-6 py-2 rounded-full border border-brand-green/30 hover:bg-brand-green hover:text-black transition-all duration-300 text-sm font-semibold text-brand-green">
                    REQUEST WEBSITE
                </Link>
            </motion.nav>


            {/* ------------------- HERO SECTION ------------------- */}
            <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 max-w-7xl mx-auto min-h-screen pt-20 relative">
                <div className="flex-1 z-10 mt-8 md:mt-0">
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="h-px w-10 bg-brand-green"></span>
                            <TypingText words={["Web Developer", "Software Engineer", "AI Engineer"]} />
                        </div>
                        <h1 className="text-5xl md:text-8xl font-bold leading-[1.1] mb-6">
                            Make <br /> Automation <br /> <span className="text-brand-green">Work For You.</span>
                        </h1>
                        <p className="text-gray-400 max-w-md text-lg mb-8 leading-relaxed">
                            Creating high-performance digital experiences with cutting-edge technologies.
                        </p>
                        <Link href="#projects">
                            <button className="bg-brand-green text-brand-dark font-bold px-8 py-4 rounded-full flex items-center gap-3 hover:scale-105 transition-transform">
                                VIEW MY WORK <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>
                    </motion.div>
                </div>

                <div className="flex-1 flex justify-center items-center relative w-full h-full">
                    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity }} className="absolute w-75 h-75 bg-brand-green/20 rounded-full blur-[100px] z-0" />
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1, y: [0, -20, 0] }} transition={{ duration: 0.8, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }} className="relative w-75 h-75 md:w-112.5 md:h-112.5 rounded-full overflow-hidden border border-brand-green/20 shadow-2xl">
                        <Image src="/profile.webp" alt="Profile" fill className="object-cover" priority sizes="(max-width: 768px) 300px, 450px" />
                    </motion.div>
                </div>
            </section>


            {/* ------------------- CINEMATIC ABOUT ME SECTION ------------------- */}
            <section className="relative w-full min-h-[110vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <motion.div
                        className="relative w-full h-full"
                        initial={{ scale: 1 }}
                        whileInView={{ scale: 1.1 }}
                        transition={{ duration: 10, ease: "linear" }}
                    >
                        <Image src="/profile.webp" alt="Background" fill className="object-cover" loading="eager" sizes="100vw" />
                    </motion.div>
                    <div className="absolute inset-0 bg-black/20 z-10"></div>
                    <div className="absolute inset-0 bg-linear-to-t from-brand-dark via-transparent to-transparent z-10"></div>
                </div>

                <div className="absolute inset-0 z-10 pointer-events-none">
                    {particles.map((p, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-brand-green rounded-full opacity-30"
                            initial={{ x: p.x, y: p.y, scale: p.scale }}
                            animate={{ y: [0, -100], opacity: [0.2, 0.8, 0] }}
                            transition={{ duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay }}
                            style={{ width: p.size + "px", height: p.size + "px" }}
                        />
                    ))}
                </div>

                <div className="relative z-20 container mx-auto px-6 md:px-12 flex flex-col justify-center h-full w-full py-20">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="w-full"
                    >
                        <motion.h2 variants={fadeInUp} className={`${playfair.className} text-3xl md:text-5xl lg:text-6xl xl:text-7xl lg:whitespace-nowrap text-white leading-tight mb-56 drop-shadow-2xl`}>
                            MR.Dasun <span className="text-brand-green">Ravihansa</span>
                        </motion.h2>

                        <motion.div variants={fadeInUp} className="max-w-xl bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-brand-green/30 transition-colors duration-500">
                            <p className="text-gray-200 text-lg leading-relaxed mb-6 font-light">
                                I am a <span className="text-brand-green font-semibold">Full-Stack Developer, Software Engineer, and AI Engineer.</span>. My journey isn't defined by a classroom, but by an endless curiosity and the vast expanse of the internet.
                            </p>
                            <p className="text-gray-300 text-base leading-relaxed">
                                From mastering <span className="text-white font-medium">Next.js,Python,Java</span> to crafting seamless user experiences, I believe that persistence is the best teacher.
                            </p>
                            <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                                <span className="text-xs tracking-[0.2em] text-brand-green uppercase">Web Devloper,Software Engineer,AI Engineer</span>
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></div>
                                    <div className="w-2 h-2 rounded-full bg-brand-green/50"></div>
                                    <div className="w-2 h-2 rounded-full bg-brand-green/20"></div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            {/* ------------------- TECH STACK SECTION ------------------- */}
            <section className="relative w-full min-h-screen flex flex-col justify-start pt-48 pb-20 px-6 md:px-12 bg-brand-dark overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                    <div className="absolute top-[10%] left-[10%] w-125 h-125 bg-brand-green/5 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[20%] right-[10%] w-125 h-125 bg-white/5 rounded-full blur-[120px]"></div>
                </div>
                <div className="relative z-10 max-w-350 mx-auto w-full">
                    <div className="text-center mb-24">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className={`${spaceGrotesk.className} text-5xl md:text-7xl font-bold text-white mb-6`}
                        >
                            My Tech Stack
                        </motion.h2>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="h-1 w-24 bg-brand-green mx-auto mb-6 rounded-full"
                        ></motion.div>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                            The tools and technologies I use to bring ideas to life.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
                        {[
                            { name: "HTML", icon: "html" },
                            { name: "CSS", icon: "css" },
                            { name: "JavaScript", icon: "js" },
                            { name: "React.js", icon: "react" },
                            { name: "Next.js", icon: "next" },
                            { name: "Python", icon: "python" },
                            { name: "Java", icon: "java" },
                            { name: "Node.js", icon: "node" },
                        ].map((tech, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative flex flex-col items-center justify-center h-64 md:h-80 p-8 rounded-4xl bg-white/3 border border-white/5 hover:border-brand-green/30 hover:bg-white/6 transition-all duration-500 cursor-pointer backdrop-blur-sm"
                            >
                                <div className="absolute inset-0 bg-radial from-brand-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-4xl"></div>
                                <div className="relative z-10 mb-8 transform group-hover:scale-110 transition-transform duration-500">
                                    {tech.icon === "html" && <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML" className="w-20 h-20 md:w-24 md:h-24 drop-shadow-2xl" />}
                                    {tech.icon === "css" && <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS" className="w-20 h-20 md:w-24 md:h-24 drop-shadow-2xl" />}
                                    {tech.icon === "js" && <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JS" className="w-20 h-20 md:w-24 md:h-24 rounded-2xl drop-shadow-2xl" />}
                                    {tech.icon === "react" && <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="w-20 h-20 md:w-24 md:h-24 animate-spin-slow drop-shadow-2xl" />}
                                    {tech.icon === "next" && <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next" className="w-20 h-20 md:w-24 md:h-24 invert drop-shadow-2xl" />}
                                    {tech.icon === "python" && <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="w-20 h-20 md:w-24 md:h-24 drop-shadow-2xl" />}
                                    {tech.icon === "java" && <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" className="w-20 h-20 md:w-24 md:h-24 drop-shadow-2xl" />}
                                    {tech.icon === "node" && <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node" className="w-20 h-20 md:w-24 md:h-24 drop-shadow-2xl" />}
                                </div>
                                <h3 className="relative z-10 text-xl md:text-2xl font-bold text-gray-300 group-hover:text-white transition-colors duration-300 tracking-wide">
                                    {tech.name}
                                </h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ------------------- PROJECTS SECTION (RESPONSIVE & FIXED) ------------------- */}
            <section id="projects" className="relative w-full min-h-screen py-20 px-6 md:px-12 bg-[#050505] overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

                <div className="relative z-10 max-w-7xl mx-auto">

                    <div className="flex flex-col md:flex-row items-center justify-between mb-32 gap-8">
                        <h2 className={`${spaceGrotesk.className} text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter`}>
                            My <span className="text-brand-green">Projects</span>
                        </h2>
                        <div className="bg-white/10 p-1 rounded-full flex relative">
                            <motion.div
                                className="absolute top-1 bottom-1 bg-brand-green rounded-full shadow-[0_0_15px_rgba(21,245,88,0.5)] z-0"
                                initial={false}
                                animate={{ x: activeTab === 'pc' ? 0 : '100%', width: '50%' }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                            <button onClick={() => setActiveTab('pc')} className={`relative z-10 px-8 py-2 rounded-full font-bold text-sm md:text-base transition-colors duration-300 ${activeTab === 'pc' ? 'text-black' : 'text-white'}`}>PC VIEW</button>
                            <button onClick={() => setActiveTab('mobile')} className={`relative z-10 px-8 py-2 rounded-full font-bold text-sm md:text-base transition-colors duration-300 ${activeTab === 'mobile' ? 'text-black' : 'text-white'}`}>MOBILE</button>
                        </div>
                    </div>

                    <div className="mb-16 max-w-3xl mx-auto text-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10"
                            >
                                <h4 className="text-brand-green font-bold text-lg mb-4 uppercase tracking-widest">
                                    {activeTab === 'pc' ? "Desktop Projects (Arix Mart & AI Assistant)" : "Mobile Experience (Next.js Web App)"}
                                </h4>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    {activeTab === 'pc'
                                        ? "Optimized for Desktop (Windows) to handle high-performance tasks and complex system logic. These applications are built using Python and PyQt6 to provide a robust user experience for business environments."
                                        : "The Mobile view showcases the fully responsive version of my Next.js web application. I've focused on creating a seamless 'App-like' experience for mobile users, ensuring high performance and intuitive navigation on smaller screens."}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 lg:gap-20">
                        {projects
                            .filter(project => activeTab === 'pc' || project.id === 1)
                            .map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                    // Added gap-10 here to separate Monitor from Text
                                    className="flex flex-col items-center w-full gap-16"
                                >
                                    {/* PC MONITOR VIEW */}
                                    {activeTab === 'pc' && (
                                        <div className="relative w-full max-w-112.5 aspect-video group">
                                            {/* Video Wrapper */}
                                            <div className="relative bg-gray-900 rounded-t-xl border-4 md:border-6 border-gray-800 shadow-2xl overflow-hidden w-full h-full">
                                                <VideoPlayer src={project.pcVideo} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                                                <div className="absolute inset-0 bg-linear-to-tr from-white/5 to-transparent pointer-events-none"></div>
                                            </div>
                                            {/* Stand Base */}
                                            <div className="h-4 md:h-6 bg-gray-800 rounded-b-xl flex items-center justify-center border-t border-gray-700">
                                                <div className="w-1 h-1 bg-green-500 rounded-full shadow-[0_0_5px_#22c55e]"></div>
                                            </div>
                                            <div className="w-16 md:w-24 h-6 md:h-8 bg-gray-700 mx-auto -mt-0.5 relative z-0"></div>
                                            <div className="w-24 md:w-32 h-1.5 md:h-2 bg-gray-700 mx-auto rounded-full shadow-lg relative z-0"></div>
                                        </div>
                                    )}

                                    {/* MOBILE PHONE VIEW */}
                                    {activeTab === 'mobile' && (
                                        <div className="relative w-60 h-120 md:w-65 md:h-130 bg-gray-900 rounded-4xl border-8 border-gray-800 shadow-2xl overflow-hidden group">
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-b-2xl z-20"></div>
                                            <VideoPlayer src={project.mobileVideo} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                                            <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent pointer-events-none z-10"></div>
                                        </div>
                                    )}

                                    <div className="text-center flex flex-col items-center w-full px-4">
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{project.title}</h3>
                                        <p className="text-gray-400 text-xs md:text-sm mb-6">{project.tech}</p>
                                        <Link href={project.link} target="_blank" rel="noopener noreferrer" className="group/btn inline-flex items-center gap-2 px-6 py-2 rounded-full border border-brand-green/50 text-brand-green text-xs md:text-sm font-bold tracking-wider hover:bg-brand-green hover:text-brand-dark transition-all duration-300 hover:shadow-[0_0_15px_rgba(21,245,88,0.4)]">
                                            LIVE PREVIEW
                                            <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                    </div>
                </div>
            </section>


            {/* ------------------- CONTACT ME SECTION ------------------- */}
            <section id="contact" className="relative w-full py-24 px-6 md:px-12 bg-black overflow-hidden border-t border-white/5">

                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                        {/* Left: Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className={`${spaceGrotesk.className} text-5xl md:text-7xl font-bold text-white mb-6`}>
                                Let's Work <br />
                                <span className="text-brand-green">Together.</span>
                            </h2>
                            <p className="text-gray-400 text-lg mb-10 max-w-md">
                                Have a project in mind? Let's build something amazing. I'm available for freelance work and collaborations.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-green/20 transition-colors">
                                        <Mail className="text-brand-green" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Email Me</p>
                                        <p className="text-white text-lg font-medium">rasindu076@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-green/20 transition-colors">
                                        <Phone className="text-brand-green" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Call Me</p>
                                        <p className="text-white text-lg font-medium">+94 77 663 9228</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-green/20 transition-colors">
                                        <MapPin className="text-brand-green" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Location</p>
                                        <p className="text-white text-lg font-medium">Online</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 flex gap-4">
                                {[Github,].map((Icon, i) => (
                                    <Link key={i} href="https://github.com/dasunravihansa" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-green hover:text-black hover:border-transparent transition-all duration-300">
                                        <Icon className="w-5 h-5" />
                                    </Link>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right: Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-brand-green/5 blur-3xl rounded-full"></div>

                            <form onSubmit={handleFormSubmit} className="relative bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
                                <div className="mb-6">
                                    <label className="block text-gray-400 text-sm mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-green focus:outline-none transition-colors"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-400 text-sm mb-2">Your Email</label>
                                    <input
                                        type="email"
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-green focus:outline-none transition-colors"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>

                                <div className="mb-8">
                                    <label className="block text-gray-400 text-sm mb-2">Message</label>
                                    <textarea
                                        rows={4}
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-green focus:outline-none transition-colors"
                                        placeholder="Tell me about your project..."
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || isSubmitted}
                                    className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${isSubmitted ? 'bg-green-600 text-white' : 'bg-brand-green text-black hover:opacity-90'}`}
                                >
                                    {isSubmitting ? "Sending..." : isSubmitted ? "Message Sent!" : (
                                        <>Send Message <Send className="w-5 h-5" /></>
                                    )}
                                </button>
                            </form>
                        </motion.div>

                    </div>

                    {/* Footer Copyright */}
                    <div className="mt-20 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
                        © {new Date().getFullYear()} Dasun Ravihansa. All Rights Reserved.
                    </div>
                </div>
            </section>

        </main>
    );
}