import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer" >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <FaCopyright style={{ marginRight: "5px" }} />
        <span> {new Date().getFullYear()}</span>
        <FaEnvelope style={{ margin: "0 5px" }} />
        <span>greenfarm@gmail.com</span>
      </div>
      
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        gap: "20px",
        flexWrap: "wrap"
      }}>
        <span>Follow us:</span>
        <a href="https://facebook.com/green_farm" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center" }}>
          <FaFacebook style={{ marginRight: "5px" }} />@green_farm
        </a>
        <a href="https://twitter.com/green_farm" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center" }}>
          <FaTwitter style={{ marginRight: "5px" }} />@green_farm
        </a>
        <a href="https://instagram.com/green_farm" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center" }}>
          <FaInstagram style={{ marginRight: "5px" }} />@green_farm
        </a>
      </div>
    </div>
  );
};

export default Footer;