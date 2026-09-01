const sourceMap = {
    "after-left": ".shot-left img",
    "after-main": ".shot-main img",
    "after-side-a": ".shot-left img",
    "after-side-b": ".shot-right img",
    "before-a": ".manual-row .manual:nth-child(1) img",
    "before-b": ".manual-row .manual:nth-child(2) img"
  };
  const assetMap = {
    ".shot-left img": "assets/images/after_new_b.jpg",
    ".shot-main img": "assets/images/after_new_a.jpg",
    ".shot-right img": "assets/images/IMG_8844.JPG",
    ".manual-row .manual:nth-child(1) img": "assets/images/IMG_8846.JPG",
    ".manual-row .manual:nth-child(2) img": "assets/images/IMG_8847.JPG"
  };
  const fullAssetMap = {
    ".shot-left img": "assets/images/after_new_b.jpg",
    ".shot-main img": "assets/images/after_new_a.jpg",
    ".shot-right img": "assets/images/IMG_8844.JPG",
    ".manual-row .manual:nth-child(1) img": "assets/images/IMG_8846.JPG",
    ".manual-row .manual:nth-child(2) img": "assets/images/IMG_8847.JPG"
  };
  Object.entries(assetMap).forEach(([selector, path]) => {
    const image = document.querySelector(selector);
    if (image) {
      image.src = path;
      image.dataset.full = fullAssetMap[selector] || path;
      if (selector.indexOf(".shot-") === 0) image.dataset.cleanDraft = "true";
    }
  });
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeLightbox = () => { lightbox.classList.remove("open"); lightbox.setAttribute("aria-hidden", "true"); };
  document.querySelectorAll("img[data-reuse]").forEach((image) => {
    const source = document.querySelector(sourceMap[image.dataset.reuse]);
    if (source) {
      image.src = source.src;
      image.dataset.full = source.dataset.full || source.src;
      if (source.dataset.cleanDraft) image.dataset.cleanDraft = source.dataset.cleanDraft;
    }
  });
  document.querySelectorAll("img").forEach((image) => {
    image.classList.add("zoomable");
    image.addEventListener("click", () => {
      lightboxImage.src = image.dataset.full || image.currentSrc || image.src;
      lightboxImage.alt = image.alt || "项目截图大图";
      lightboxCaption.textContent = image.dataset.full ? "完整长图 · 可滚动查看" : (image.alt || "项目截图大图");
      lightbox.querySelector("figure").classList.toggle("clean-draft", image.dataset.cleanDraft === "true");
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });
  document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeLightbox(); });
