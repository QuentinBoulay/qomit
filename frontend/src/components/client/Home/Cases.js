import { useEffect, useRef } from "react";
import img from "../../../img/use-case.png";

function Cases() {
  const stickyContainerRef = useRef(null);

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top <= 0 && rect.bottom > document.documentElement.clientHeight;
  }

  useEffect(() => {
    const stickyContainer = stickyContainerRef.current;

    function setStickyContainerSize() {
      const main = stickyContainer.querySelector("main");
      const stikyContainerHeight = main.scrollWidth;
      stickyContainer.setAttribute(
        "style",
        "height: " + stikyContainerHeight + "px"
      );
    }

    function wheelHandler(evt) {
      const containerInViewPort = Array.from(
        document.querySelectorAll(".sticky-container")
      ).filter(function (container) {
        return isElementInViewport(container);
      })[0];

      if (!containerInViewPort) {
        return;
      }

      const main = containerInViewPort.querySelector("main");
      const isPlaceHolderBelowTop =
        containerInViewPort.offsetTop < document.documentElement.scrollTop;
      const isPlaceHolderBelowBottom =
        containerInViewPort.offsetTop + containerInViewPort.offsetHeight >
        document.documentElement.scrollTop;
      const canScrollHorizontally =
        isPlaceHolderBelowTop && isPlaceHolderBelowBottom;

      if (canScrollHorizontally) {
        main.scrollLeft += evt.deltaY;
      } else {
        window.scrollBy(0, evt.deltaY);
      }
    }

    setStickyContainerSize();
    window.addEventListener("wheel", wheelHandler);

    return () => {
      window.removeEventListener("wheel", wheelHandler);
    };
  }, []);

  return (
    <>
      <div className="sticky-container" ref={stickyContainerRef}>
        <main>
          <section className="d-flex align-items-center">
            <h2 className="font-size-55">
              Nos<br></br> réalisations
            </h2>
          </section>
          <section>
            <img src={img} alt="Use case"></img>
            <h3 className="font-size-38 my-5">
              Lorem ipsum dolor sit amet rae
            </h3>
            <p>
              Vestibulum vitae nisl non nibh pretium faucibus. Vestibulum
              facilisis, justo eu sodales tincidunt.
            </p>
          </section>
          <section>
            <img src={img} alt="Use case"></img>
            <h3 className="font-size-38 my-5">
              Lorem ipsum dolor sit amet rae
            </h3>
            <p>
              Vestibulum vitae nisl non nibh pretium faucibus. Vestibulum
              facilisis, justo eu sodales tincidunt.
            </p>
          </section>
          <section>
            <img src={img} alt="Use case"></img>
            <h3 className="font-size-38 my-5">
              Lorem ipsum dolor sit amet rae
            </h3>
            <p>
              Vestibulum vitae nisl non nibh pretium faucibus. Vestibulum
              facilisis, justo eu sodales tincidunt.
            </p>
          </section>
        </main>
      </div>
    </>
  );
}

export default Cases;
