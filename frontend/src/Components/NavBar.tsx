import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../Styles/NavBar.scss";

export default function NavBar() {
    const navRef = useRef<HTMLUListElement | null>(null);
    const offsetRef = useRef<number>(0);
    const location = useLocation();

    const labels = ["Home", "Desks", "Login"];

    const updateSlider = (target: HTMLElement) => {
        const container = navRef.current;
        if (!container || !target) return;

        offsetRef.current = target.offsetLeft;

        const containerWidth = container.offsetWidth;
        const itemCenter = offsetRef.current + target.offsetWidth / 2;
        const sliderLeft = itemCenter - containerWidth * 0.32 / 2;

        container.style.setProperty('--slider-left', `${sliderLeft}px`);
    };

    const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        updateSlider(e.currentTarget);
    };

    useEffect(() => {
        const currentPath = location.pathname.slice(1);
        const label = currentPath.includes("desks") ? "desks" : (currentPath || "home");
        const container = navRef.current;

        if (!container) return;

        const targetLink = container.querySelector(
            `a[href="/${label}"]`
        ) as HTMLElement;

        if (targetLink) {
            updateSlider(targetLink);
        }
    }, [location]);

    return (
        <div className="navbar-container">
            <ul className="navbar-content" ref={navRef}>
                {labels.map((label, i) => (
                    <NavLink
                        to={`/${label.toLowerCase()}`}
                        key={i}
                        onClick={handleNavigate}
                        className={({ isActive }) =>
                            `navbar-option ${isActive ? "active-option" : "inactive-option"}`
                        }
                    >
                        {label}
                    </NavLink>
                ))}
            </ul>
        </div>
    );
}
