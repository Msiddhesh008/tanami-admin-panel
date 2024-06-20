
import { RiLogoutCircleLine } from "react-icons/ri";

const Button02 = ({ title, onClick, type, gradientColors, height, width, open }) => {
  const [startColor, endColor] = gradientColors;
  return (
    <button
      style={{
        background: `linear-gradient(to right, ${startColor}, ${endColor})`, // Apply linear gradient background
        outline: "none",
        border: "none",
        height: height,
        width: width,
        opacity:0.9,
        boxShadow:"rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
      }}
      type={type}
      onClick={onClick ? onClick : null}
      className=" rounded-4 text-white fs-6 fw-bold border-none text-center overflow-hidden d-flex align-items-center gap-2 justify-content-center"
      // Add hover style
      onMouseEnter={(e) =>
        (e.target.style.opacity = 1)
      }
      onMouseLeave={(e) =>
        (e.target.style.opacity = 0.9)
      }
    >
      <RiLogoutCircleLine style={{
        opacity: open ? 0 : 1,
        transform: "translateX(14px)",
        display: open ? 'none' : '', 
        transition: 'All 1s  ease-in-out'
      }} className="fs-4" /> 

      <span 
      style={{
        transform: open ? 'translateX(0px)' : 'translateX(-100px)', 
        fontSize: open ? '' : '6px',
        // display: open ? '' : 'none', 
        transition: 'All 0.5s  ease-in-out'
      }}
      >{title}</span>
    </button>
  );
};

export default Button02;
