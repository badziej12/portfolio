import Head from "next/head";
import {Hero} from "@/components/Hero";
import {CSSProperties, useEffect, useRef, useState} from "react";

export default function Home() {
    const [isScrolling, setIsScrolling] = useState(false);
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [currentSection, setCurrentSection] = useState<Element | null | undefined>(null);

    // Adding fade away animation, then switch current section
    const switchSection = (visibleSection: Element | null | undefined, nextSection: Element | null | undefined) => {
        visibleSection?.classList.add("fade-away");
            setTimeout(() => {
            visibleSection?.classList.remove("fade-away", "active");
            nextSection?.classList.add("active");
        }, 1000);

        setIsScrolling(true);
        setCurrentSection(nextSection);

        visibleSection?.classList.add("active");
    }

    const handleScroll = (event: WheelEvent)  => {
        const sliderElement = document.getElementById("slider") as HTMLElement;
        const scrollDistanceProperty = sliderElement.style.getPropertyValue("--scrollDistance");
        const scrollThreshold = 50;

        // Reset isScrolling state when scrolling has ended
        if (event.deltaY == 1 || event.deltaY == -1) {
            setIsScrolling(false);
        }

        // Check if user scrolled up or down then do the action
        if (event.deltaY > scrollThreshold && !isScrolling && parseFloat(scrollDistanceProperty) > -100) {
            sliderElement.style.setProperty("--scrollDistance", `${parseFloat(scrollDistanceProperty) - 100}vh`);

            switchSection(currentSection, currentSection?.nextElementSibling);
        } else if (event.deltaY < -scrollThreshold && !isScrolling && parseFloat(scrollDistanceProperty) < 0) {
            sliderElement.style.setProperty("--scrollDistance", `${parseFloat(scrollDistanceProperty) + 100}vh`);

            switchSection(currentSection, currentSection?.previousElementSibling);
        }
    };

    useEffect(() => {
        window.addEventListener("wheel", handleScroll, {passive: true});

        return () => {
            window.removeEventListener("wheel", handleScroll);
        }
    }, [isScrolling, currentSection]);

    useEffect(() => {
        setCurrentSection(sectionRef.current?.firstElementChild);
    }, []);

    return (
        <>
            <Head>
                <title>Błażej Tondel | Front-End Developer</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div ref={sectionRef} id={"slider"} className="slider" style={{"--scrollDistance": "0vh"} as CSSProperties}>
                <Hero />
                <section className={"test-section"}></section>
            </div>
        </>
    );
}
