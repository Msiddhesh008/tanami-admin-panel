import Loader01 from "../Loaders/Loader01";

const Button01 = ({ title, onClick, type, backgroundColor, hover, isLoading }) => {
  return (
    <button
      style={{
        backgroundColor: backgroundColor,
        outline: "none",
        border: "none",
        height: 50,
        transition: "opacity 0.3s", // Add transition for smooth hover effect
      }}
      type={type}
      onClick={onClick ? onClick : null}
      className=" rounded-3 p-2 w-100 text-white p-3 fs-6 fw-bold border-none"
      onMouseEnter={(e) => (e.target.style.backgroundColor = hover)}
      onMouseLeave={(e) => (e.target.style.backgroundColor = backgroundColor)}
    >
      {isLoading ? <Loader01/> : title}
       
    </button>
  );
};

export default Button01;
