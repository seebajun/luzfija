function BioCard({ title, dropcapLetter, children }) {
  return (
    <div className="bio-card">
      <h3 className="section-title yellow">{title}</h3>
      <p className="bio-text">
        <span className="dropcap">{dropcapLetter}</span>
        {children}
      </p>
    </div>
  );
}

export default BioCard;
