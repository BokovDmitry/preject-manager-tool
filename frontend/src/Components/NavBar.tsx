import { useRef } from "react";
import { NavLink } from "react-router-dom";
import "../Styles/NavBar.scss";

export default function NavBar() {
    const navRef = useRef<HTMLUListElement | null>(null);

    const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const option = e.currentTarget;
        const container = navRef.current;

        if (!container) return;

        const containerWidth = container.offsetWidth;
        const itemCenter = option.offsetLeft + option.offsetWidth / 2;
        const sliderLeft = itemCenter - containerWidth * 0.32 / 2; // 0.32 = 32%

        container.style.setProperty('--slider-left', `${sliderLeft}px`);
    };


    return (
        <div className="navbar-container">
            <ul className="navbar-content" ref={navRef}>
                {["Home", "Desks", "Login"].map((label, i) => (
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
