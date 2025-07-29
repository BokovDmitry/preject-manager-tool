import { useNavigate } from "react-router-dom"
import "../Styles/Home.scss"

export default function Home() {
    const navigate = useNavigate()
    return (
        <>
            <div className="background"></div>
            <div className='home-container'>
                <section className='hero-container'>
                    <h1 className='hero-title'>User Friendly Project Manager Tool for You & Team</h1>
                    <p className="hero-subtitle">Simple task manager tool with simple but stylish design with the essentials only.</p>
                    <button className='hero-button' onClick={() => navigate("/desks")}>Try this out!</button>
                </section>
            </div>
        </>
    )
}