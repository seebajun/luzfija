function Footer() {
  return (
    <footer className="y2k-footer">
      <div className="footer-content">
        <div className="footer-copyright">
          <span>© 2021-{new Date().getFullYear()} LUZ FIJA</span>
          <span>✧ TODOS LOS DERECHOS RESERVADOS ✧</span>
          <span className="blink-text">★ Hecho con ♥ en La Florida ★</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
