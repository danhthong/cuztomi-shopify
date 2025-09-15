(function () {
  const initAnimation = (section) => {
    if (!section || !section.querySelector(".animate-on-scroll")) return;

    const footerBlocksContainer = section.querySelector(".footer-blocks");

    if (!footerBlocksContainer) return;

    const footerBlocks = footerBlocksContainer.querySelectorAll(
      ".footer-block, .accordion"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          footerBlocks.forEach((block) => {
            gsap.fromTo(
              block,
              {
                maskPosition: "100% 0%",
              },
              {
                maskPosition: "0% 0%",
                duration: 1.75,
                ease: "ease",
                onComplete: () => {
                  block.style.webkitMaskImage = "none";
                  block.style.maskImage = "none";
                },
              }
            );
          });
          observer.disconnect();
        }
      },
      {
        threshold: 0,
      }
    );

    observer.observe(footerBlocksContainer);
  };

  initAnimation(document.currentScript.parentElement);

  document.addEventListener("shopify:section:load", function (event) {
    initAnimation(event.target);
  });
})();

(function(d, t, g, k) {
	var ph = d.createElement(t),
	s = d.getElementsByTagName(t)[0],
	t = (new URLSearchParams(window.location.search)).get(k);
	t && localStorage.setItem(k, t);
	t = localStorage.getItem(k);
	ph.type = 'text/javascript';
	ph.async = true;
	ph.defer = true;
	ph.charset = 'UTF-8';
	ph.src = g + '&v=' + (new Date()).getTime();
	ph.src += t ? '&' + k + '=' + t : '';
	s.parentNode.insertBefore(ph, s);
})(document, 'script', '//dev.cuztomi.com/?p=2146&ph_apikey=65f47abd802b0cfb3c9a586506698add', 'ph_access_token');
