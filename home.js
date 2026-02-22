(() => {
  const gallery = document.getElementById("homeGallery");
  if (!gallery) return;

  const btnPrev = document.querySelector("[data-gallery-prev]");
  const btnNext = document.querySelector("[data-gallery-next]");

  let timer = null;
  let paused = false;

  function cardStep() {
    const firstItem = gallery.querySelector(".g-item");
    if (!firstItem) return 260;
    const style = getComputedStyle(gallery);
    const gap = parseFloat(style.gap || "12");
    return firstItem.getBoundingClientRect().width + gap;
  }

  function scrollByStep(dir) {
    gallery.scrollBy({ left: dir * cardStep(), behavior: "smooth" });
  }

  function start() {
    stop();
    timer = setInterval(() => {
      if (paused) return;

      const maxScrollLeft = gallery.scrollWidth - gallery.clientWidth;
      const nearEnd = gallery.scrollLeft >= (maxScrollLeft - 4);

      if (nearEnd) {
        gallery.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollByStep(1);
      }
    }, 3200);
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  gallery.addEventListener("mouseenter", () => paused = true);
  gallery.addEventListener("mouseleave", () => paused = false);

  gallery.addEventListener("touchstart", () => paused = true, { passive: true });
  gallery.addEventListener("touchend", () => paused = false, { passive: true });

  btnPrev?.addEventListener("click", () => scrollByStep(-1));
  btnNext?.addEventListener("click", () => scrollByStep(1));

  start();
})();
