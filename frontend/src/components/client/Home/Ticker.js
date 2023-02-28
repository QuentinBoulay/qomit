import { useEffect, useRef } from "react";
import gsap, { Linear } from "gsap";

function Ticker() {
  const tickerRef = useRef(null);

  useEffect(() => {
    const tickerElement = tickerRef.current;
    const tickerInner = tickerElement.querySelector(".js-ticker-inner");
    const tickerWidth = tickerInner.offsetWidth;

    // Cloner les noeuds enfants de tickerInner pour les répéter indéfiniment
    tickerInner.childNodes.forEach((node) => {
      tickerInner.appendChild(node.cloneNode(true));
    });

    // Animer le ticker
    gsap.fromTo(
      tickerInner,
      {
        x: 0,
      },
      {
        duration: 50,
        x: -tickerWidth,
        ease: Linear.easeNone,
        repeat: -1,
      }
    );

    return () => {
      // Nettoyer l'animation lors de la suppression du composant
      gsap.killTweensOf(tickerInner);
    };
  }, []);

  return (
    <div className="ticker-container">
      <div className="ticker-1">
        <div className="ticker js-ticker" ref={tickerRef}>
          <div className="ticker__inner js-ticker-inner">
            <span className="ticker__text font-size-82">
              Création de site web
            </span>
            <div className="point"></div>
            <span className="ticker__text font-size-82">
              Suivi en temps réel
            </span>
            <div className="point"></div>
            <span className="ticker__text font-size-82">
              Assistance technique
            </span>
            <div className="point"></div>
            <span className="ticker__text font-size-82">
              Stratégie digitale
            </span>
            <div className="point"></div>
            <span className="ticker__text font-size-82">Design graphique</span>
            <div className="point"></div>
            <span className="ticker__text font-size-82">SEO</span>
            <div className="point"></div>
            <span className="ticker__text font-size-82">SEA</span>
            <div className="point"></div>
            <span className="ticker__text font-size-82">Audit technique</span>
            <div className="point"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticker;
