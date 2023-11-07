"use client"
import { FaLinkedinIn } from "react-icons/fa6";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion"
import { TadeoImage, FlaviaImage, JonathanImage, AlexisImage, SofiaImage, DarioImage, TomasImage, FabrizioImage, JoelImage } from "../../assets/images/members";
import LinkedinLogo from "../../assets/images/linkedinLogo.png";
import Link from "next/link";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { SiNextdotjs, SiTailwindcss, SiPrisma } from "react-icons/si";
import { FaCss3Alt, FaHtml5, FaReact } from "react-icons/fa";
import { AiOutlineGitlab } from "react-icons/ai";
import { GrMysql } from "react-icons/gr";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



export default function About() {

    const members = [
        { id:1, name: "Tadeo Gavensky", photo: TadeoImage, description: (<>He play a multifaceted role as a <b>Front-End developer</b>, <b>Back-End developer</b>, and <b>Database Administrator</b>, while also assisting with the project's <b>UI/UX</b> improvement.</>), linkedin: 'https://www.linkedin.com/in/tadeo-gavensky-0595b9205/' },

        { id:2, name: "Flavia Romero", photo: FlaviaImage, description: (<>She contributed as a <b>Front-End and Back-End</b> developer, <b>Database Administrator</b>, and served as the <b>Scrum Master</b>. She utilized my expertise in these areas to ensure team success and facilitate efficient project delivery through collaboration and multi-faceted support.</>), linkedin: '' },

        { id:3, name: "Jonathan Castro ", photo: JonathanImage, description: (<>He contributed as a <b>Back-End</b> developer, <b>Tester</b>, and <b>Infrastructure manager</b>, ensuring efficient development and a robust technological foundation.</>), linkedin: 'https://www.linkedin.com/in/jonathan-castro-/' },

        { id:4, name: "Alexis Atencio ", photo: AlexisImage, description: (<>He played a key role as a <b>frontend and backend developer</b>, contributing significantly to both aspects of the software development process.</>), linkedin: 'https://www.linkedin.com/in/alexis-atencio-719ab8256/' },

        { id:5, name: "Sofia Moneta", photo: SofiaImage, description: (<>She played a crucial role as a <b>frontend developer</b>, <b>backend developer</b>, and <b>database manager</b>, contributing comprehensively across all stages of development.</>), linkedin: 'https://www.linkedin.com/in/sofiamoneta/' },

        { id:6, name: "Dario Luna", photo: DarioImage, description: (<>He played a dual role as a <b>frontend and backend developer</b> while also managing the <b>infrastructure</b>, ensuring an efficient and cohesive implementation of the application.</>), linkedin: 'https://www.linkedin.com/in/dario-luna-a28b35192/' },

        { id:7,name: "Tomas Romano", photo: TomasImage, description: (<>He contributed as a <b>tester</b>, <b>BDD administrator</b>, and <b>back-end and front-end developer</b>, ensuring the smooth functioning of features, <b>managing databases</b> efficiently, and developing the underlying logic of the application</>), linkedin: 'https://www.linkedin.com/in/tomas-romano/' },

        { id:8, name: "Fabrizio Grela", photo: FabrizioImage, description: (<>He played various roles, including <b>front-end developer</b>, <b>tester</b>, and <b>BDD administrator</b>. However, his primary role was that of a <b>Scrum Master</b>, leading and facilitating the team towards the project's success.</>), linkedin: 'https://www.linkedin.com/in/fabrizio-grela-51295a229/' },

        { id:9, name: "Joel Buslemen", photo: JoelImage, description: (<>He played a key role as a <b>Back-End developer</b>, focusing on the <b>infrastructure</b>. He contributed significantly to the technical development of the project, ensuring a robust and efficient backend operation and underlying infrastructure.</>), linkedin: 'https://www.linkedin.com/in/joel-buslemen/' },
    ]

    function shuffleArray(array) {
        // Utiliza el algoritmo de Fisher-Yates para reorganizar el array
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    shuffleArray(members);

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };

    return (<div className="flex flex-col items-center justify-center">

        <motion.h1 className="font-bold text-7xl lg:text-9xl mt-16 mb-24 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
            About our proyect
        </motion.h1>
        <section className="mt-10">
            <motion.div className="flex md:flex-row flex-col justify-center items-center px-8 my-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}>
                <h3 className=" md:text-3xl text-2xl text-center"> Some of the technologies we used were:</h3>
                <div className="tecnologies text-3xl md:ml-4 md:mt-0 mt-8 font-bold text-primary">
                    <ul className="tecnologies-ul flex flex-col md:items-start items-center md:justify-start justify-center list-none md:text-3xl text-6xl md:w-32 w-64 md:h-8 h-16">
                        <li className="tecnologies-li" style={{ top: '0%' }}>HTML</li>
                        <li className="tecnologies-li" style={{ top: '100%' }}>CSS</li>
                        <li className="tecnologies-li" style={{ top: '200%' }}>React</li>
                        <li className="tecnologies-li" style={{ top: '300%' }}>Tailwind</li>
                        <li className="tecnologies-li" style={{ top: '400%' }}>Next.js</li>
                        <li className="tecnologies-li" style={{ top: '500%' }}>SQL</li>
                        <li className="tecnologies-li" style={{ top: '600%' }}>Prisma</li>
                        <li className="tecnologies-li" style={{ top: '700%' }}>Gitlab</li>
                        <li className="tecnologies-li" style={{ top: '800%' }}>HTML</li>
                    </ul>
                </div>
            </motion.div>
            <motion.div className="slider-about"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}>

                <Slider className="flex" {...settings}>
                    <div className=" flex my-5 justify-center items-center ">
                        <FaHtml5 className="text-5xl" />
                    </div>
                    <div className=" flex my-5 justify-center items-center ">
                        <FaCss3Alt className="text-5xl" />
                    </div>
                    <div className=" flex my-5 justify-center items-center ">
                        <FaReact className="text-5xl" />
                    </div>
                    <div className=" flex my-5 justify-center items-center ">
                        <SiTailwindcss className="text-5xl" />
                    </div>
                    <div className=" flex my-5 justify-center items-center ">
                        <SiNextdotjs className="text-5xl" />
                    </div>
                    <div className=" flex my-5 justify-center items-center ">
                        <GrMysql className="text-5xl" />
                    </div>
                    <div className=" flex my-5 justify-center items-center ">
                        <SiPrisma className="text-5xl" />
                    </div>
                    <div className=" flex my-5 justify-center items-center ">
                        <AiOutlineGitlab className="text-5xl" />
                    </div>
                </Slider>
            </motion.div>

        </section>
        <section className="mt-16">
            <motion.h3 className="md:text-3xl text-2xl my-16 text-center px-5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}>This project became a reality thanks to these incredible developers!</motion.h3>
            {members.map(function (member, i) {
                let isPar = !((i % 2) === 0)
                return (
                    <FadeInWhenVisible isPar={isPar} key={member.id}>

                        {/* ------------------------------ desktop view ------------------------------ */}
                        <motion.div 
                            className={`lg:flex hidden  ${!isPar ? 'flex-row-reverse' : 'flex-row'} my-10 hover:scale-105 transition ease-in-out  delay-75 drop-shadow-lg hover:drop-shadow-xl`}>
                            <Link href={member.linkedin} target="_blank" className={`flex items-center justify-center z-10 -skew-x-12 bg-primary text-white w-32 h-64 hover:bg-secondary transition ease-in-out`} >
                                <FaLinkedinIn className="text-6xl w-full" />
                            </Link>
                            <div className="relative w-72 h-64 bg-center bg-cover">
                                <Image src={member.photo} alt="member photo" layout='fill' style={{ position: "absolute", clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",objectFit: 'cover' }} />
                            </div>
                            <div className={`-skew-x-12 bg-primary text-white w-full p-10 ${isPar ? 'pr-12' : 'pl-12'} h-64 flex flex-col ${isPar ? 'text-left' : 'text-right'} justify-center`}>
                                <h2 className="text-4xl font-bold">{member.name}</h2>
                                <p className="py-5 text-xl"  >{member.description}</p>
                            </div>
                        </motion.div>

                        {/* ------------------------------- Mobile view ------------------------------ */}

                        <motion.div
                            className={`lg:hidden my-10 transition ease-in-out  delay-75 drop-shadow-l lg:w-2/3 md:3/4 drop-shadow-xl`}>
                            <div className="flex lg:flex-row flex-col justify-center items-center  bg-primary rounded-t-xl drop-shadow-xl ">
                                <h2 className="text-4xl md:text-6xl font-bold text-white my-5">{member.name}</h2>
                                <div className="relative">
                                    <div className="
                                    after:bg-gradient-to-t after:from-primary after:to-transparent after:content-{''} after:w-full after:h-10 after:absolute after:bottom-0

                                    "></div>
                                    <Image src={member.photo} width={900} alt="member photo"/>
                                </div>

                                <div className={`text-white w-full h-auto px-10 pt-5 pb-10 flex flex-col text-center`}>
                                    <p className="text-xl md:text-2xl" >{member.description}</p>
                                </div>
                            </div>

                            <Link href={member.linkedin} target="_blank" className={`flex items-center justify-center z-10 bg-primary w-full text-white py-10 rounded-b-xl mt-3 transition ease-in-out drop-shadow-xl`} >
                                <Image src={LinkedinLogo} className="lg:w-1/3 md:w-1/3 w-2/3"  alt="linkedin logo"/>
                            </Link>

                        </motion.div>

                    </FadeInWhenVisible>
                )
            })}
        </section>
    </div>)
}

function FadeInWhenVisible({ children, isPar }) {
    let animateRight = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 }
    }

    let animateLeft = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 }
    }
    let kindAnimation = isPar ? animateRight : animateLeft

    const controls = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            transition={{ duration: 0.3, delay: 0.5 }}
            variants={kindAnimation}
        >
            {children}
        </motion.div>
    );
}