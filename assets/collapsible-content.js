(function () {
  const slideUp = (element, duration = 300) => {
    if (!element) return;
    element.style.height = `${element.scrollHeight}px`;
    element.style.overflow = "hidden";
    element.style.transition = `height ${duration}ms ease`;

    requestAnimationFrame(() => {
      element.style.height = "0";
    });

    setTimeout(() => {
      element.style.display = "none";
      element.style.removeProperty("height");
      element.style.removeProperty("overflow");
      element.style.removeProperty("transition");
    }, duration);
  };

  const slideDown = (element, duration = 300) => {
    if (!element) return;

    element.style.removeProperty("display");
    let display = window.getComputedStyle(element).display;

    if (display === "none") display = "block";
    element.style.display = display;

    const height = element.scrollHeight;

    element.style.height = "0";
    element.style.overflow = "hidden";
    element.style.transition = `height ${duration}ms ease`;

    requestAnimationFrame(() => {
      element.style.height = `${height}px`;
    });

    setTimeout(() => {
      element.style.removeProperty("height");
      element.style.removeProperty("overflow");
      element.style.removeProperty("transition");
    }, duration);
  };

  const toggleCollapsible = (event) => {
    const item = event.currentTarget;
    const answer = item.querySelector(".collapsible-content__answer");

    if (!answer) return;

    if (item.classList.contains("active")) {
      item.classList.remove("active");
      slideUp(answer);
    } else {
      item.classList.add("active");
      slideDown(answer);
    }
  };

  const initCollapsibleContent = (section) => {
    if (!section || !section.classList.contains("collapsible-content-section")) return;

    const toggles = section.querySelectorAll(".collapsible-content__item");

    toggles.forEach((toggle) => {
      const answer = toggle.querySelector(".collapsible-content__answer");

      // open all by default
      toggle.classList.add("active");
      if (answer) {
        answer.style.display = "block";
      }

      toggle.addEventListener("click", toggleCollapsible);
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    document
      .querySelectorAll(".collapsible-content-section")
      .forEach(initCollapsibleContent);
  });

  document.addEventListener("shopify:section:load", function (event) {
    initCollapsibleContent(event.target);
  });

})();
