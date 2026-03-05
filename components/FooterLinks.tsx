
import React from 'react';
import { SOCIAL_LINKS } from '../constants';

const FooterLinks: React.FC = () => {
  return (
    <>
      <style>{`
        .nexus-footer {
          position: relative;
          width: 100%;
          padding: 40px 0;
          background: linear-gradient(to top, rgba(10, 10, 10, 0.9), transparent);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          z-index: 10;
          margin-top: 50px;
          font-family: 'Inter', sans-serif;
        }

        .nexus-social-links {
          display: flex;
          gap: 30px;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }

        .nexus-social-item {
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          position: relative;
        }

        .nexus-social-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .nexus-social-icon::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, currentColor, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .nexus-social-item:hover .nexus-social-icon {
          transform: translateY(-5px) scale(1.1);
          border-color: currentColor;
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.5), 
                      0 0 15px currentColor;
        }

        .nexus-social-item:hover .nexus-social-icon::before {
          opacity: 0.2;
        }

        .nexus-social-name {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
          transition: all 0.3s ease;
        }

        .nexus-social-item:hover .nexus-social-name {
          color: white;
          letter-spacing: 3px;
        }
      `}</style>

      <footer className="nexus-footer">
        <div className="nexus-divider"></div>
        
        <div className="nexus-social-links">
          {SOCIAL_LINKS.map((link) => (
            <a 
              key={link.name}
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`nexus-social-item ${link.color}`}
            >
              <div className="nexus-social-icon" dangerouslySetInnerHTML={{ __html: link.icon }} />
              <span className="nexus-social-name">{link.name}</span>
            </a>
          ))}
        </div>

        <div className="nexus-copyright">
          © 2026 Nexus Consciousness • Architected by Mahdi Devil
        </div>
      </footer>
    </>
  );
};

export default FooterLinks;
