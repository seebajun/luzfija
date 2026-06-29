import "./Footer.css";

function Footer() {
  return (
    <footer className="y2k-footer">
      <div className="footer-content">
        <div className="footer-copyright">
          <span>© 2021-{new Date().getFullYear()} LUZ FIJA ✧ TODOS LOS DERECHOS RESERVADOS ✧ Hecho con ♥ en La Florida</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
