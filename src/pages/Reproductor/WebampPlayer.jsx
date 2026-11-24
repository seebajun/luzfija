import { useEffect, useRef, useState } from "react";
import Webamp from "webamp";
import { TRACKS } from "../../data/tracks";
import { SKINS } from "../../data/skins";

const BASE_WIDTH = 275;
const BASE_HEIGHT = 406; // main (116) + eq (116) + playlist (116 + 2*29)
const DESKTOP_SCALE = 1.5;
const MOBILE_SCALE = 1.0;
const MOBILE_MEDIA_QUERY = "(max-width: 768px)";

const WEBAMP_AVAILABLE_SKINS = SKINS.filter((s) => Boolean(s.url)).map((s) => ({
  url: s.url,
  name: s.name,
}));

const BROWSER_SUPPORTED = Webamp.browserIsSupported();
const MENU_EDGE_MARGIN = 8;

function getViewportBounds() {
  const headerEl = document.querySelector(".y2k-header");
  const footerEl = document.querySelector(".y2k-footer");
  const topLimit =
    (headerEl ? Math.max(0, headerEl.getBoundingClientRect().bottom) : 0) +
    MENU_EDGE_MARGIN;
  const bottomLimit =
    window.innerHeight -
    (footerEl ? footerEl.getBoundingClientRect().height : 36) -
    MENU_EDGE_MARGIN;
  return {
    leftLimit: MENU_EDGE_MARGIN,
    rightLimit: window.innerWidth - MENU_EDGE_MARGIN,
    topLimit,
    bottomLimit,
  };
}

function clampTopLevelMenu(menuRoot) {
  const wrapper = menuRoot.firstElementChild;
  const menu = wrapper?.querySelector(".context-menu");
  if (!wrapper || !menu) return;

  const rect = menu.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) return;

  const { leftLimit, rightLimit, topLimit, bottomLimit } = getViewportBounds();

  const currentLeft = parseFloat(wrapper.style.left) || 0;
  let deltaX = 0;
  if (rect.right > rightLimit) {
    deltaX = rightLimit - rect.right;
  }
  if (rect.left + deltaX < leftLimit) {
    deltaX += leftLimit - (rect.left + deltaX);
  }
  if (deltaX !== 0) {
    wrapper.style.left = `${Math.round(currentLeft + deltaX)}px`;
  }

  const currentTop = parseFloat(wrapper.style.top) || 0;
  let deltaY = 0;
  if (rect.bottom > bottomLimit) {
    deltaY = bottomLimit - rect.bottom;
  }
  if (rect.top + deltaY < topLimit) {
    deltaY += topLimit - (rect.top + deltaY);
  }
  if (deltaY !== 0) {
    wrapper.style.top = `${Math.round(currentTop + deltaY)}px`;
  }
}

function positionSubmenu(parentLi) {
  const submenu = parentLi.querySelector(":scope > ul");
  if (!submenu) return;

  submenu.style.left = "";
  submenu.style.right = "";
  submenu.style.top = "";
  submenu.style.bottom = "";
  submenu.style.marginLeft = "";
  submenu.style.marginRight = "";
  submenu.style.maxHeight = "";
  submenu.style.maxWidth = "";

  const subRect = submenu.getBoundingClientRect();
  if (subRect.width === 0 && subRect.height === 0) return;

  const liRect = parentLi.getBoundingClientRect();
  const { leftLimit, rightLimit, topLimit, bottomLimit } = getViewportBounds();
  const maxAvailableHeight = Math.max(120, bottomLimit - topLimit);
  const maxAvailableWidth = Math.max(120, rightLimit - leftLimit);

  const spaceRight = rightLimit - liRect.right;
  const spaceLeft = liRect.left - leftLimit;
  const subWidth = subRect.width;

  if (spaceRight >= subWidth) {
    submenu.style.left = "100%";
    submenu.style.right = "auto";
    submenu.style.marginLeft = "-3px";
    submenu.style.marginRight = "0";
  } else if (spaceLeft >= subWidth) {
    submenu.style.left = "auto";
    submenu.style.right = "100%";
    submenu.style.marginLeft = "0";
    submenu.style.marginRight = "-3px";
  } else {
    const clampedWidth = Math.min(subWidth, maxAvailableWidth);
    submenu.style.maxWidth = `${Math.floor(maxAvailableWidth)}px`;
    const targetViewportLeft = Math.max(
      leftLimit,
      Math.min(liRect.left, rightLimit - clampedWidth),
    );
    submenu.style.left = `${Math.round(targetViewportLeft - liRect.left)}px`;
    submenu.style.right = "auto";
    submenu.style.marginLeft = "0";
    submenu.style.marginRight = "0";
  }

  const naturalHeight = submenu.scrollHeight + 2;
  const finalHeight = Math.min(naturalHeight, maxAvailableHeight);
  submenu.style.maxHeight = `${Math.floor(maxAvailableHeight)}px`;

  if (liRect.top + finalHeight > bottomLimit) {
    const targetViewportTop = Math.max(topLimit, bottomLimit - finalHeight);
    submenu.style.top = `${Math.round(targetViewportTop - liRect.top)}px`;
  } else {
    submenu.style.top = "0px";
  }
}

function enhanceWebampContextMenu(menuRoot) {
  if (menuRoot.dataset.boundsEnhanced === "1") return;
  menuRoot.dataset.boundsEnhanced = "1";

  const clampNow = () => clampTopLevelMenu(menuRoot);
  clampNow();
  requestAnimationFrame(clampNow);

  let activeParent = null;

  menuRoot.addEventListener("pointerover", (event) => {
    const li = event.target?.closest?.("li");
    if (!li || !menuRoot.contains(li)) return;

    const parentLi = li.closest("li.parent");
    if (parentLi && menuRoot.contains(parentLi)) {
      if (parentLi !== activeParent) {
        activeParent = parentLi;
        positionSubmenu(parentLi);
      }
    } else {
      activeParent = null;
      menuRoot
        .querySelectorAll("li.parent.submenu-open")
        .forEach((openLi) => openLi.classList.remove("submenu-open"));
    }
  });

  menuRoot.addEventListener("pointerleave", () => {
    activeParent = null;
  });

  menuRoot.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (!target.matches("li.parent")) return;

    event.preventDefault();
    event.stopPropagation();

    const wasOpen = target.classList.contains("submenu-open");
    menuRoot
      .querySelectorAll("li.parent.submenu-open")
      .forEach((openLi) => openLi.classList.remove("submenu-open"));
    if (!wasOpen) {
      target.classList.add("submenu-open");
      activeParent = target;
      positionSubmenu(target);
    } else {
      activeParent = null;
    }
  });
}

function WebampPlayer({ skinUrl, onSkinError }) {
  const mountRef = useRef(null);
  const webampRef = useRef(null);
  const initialSkinUrlRef = useRef(skinUrl);
  const [isReady, setIsReady] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(MOBILE_MEDIA_QUERY).matches
      : false,
  );
  const [errorMsg, setErrorMsg] = useState(() =>
    BROWSER_SUPPORTED ? "" : "Tu navegador no soporta Webamp.",
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const handleChange = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Mantiene los menús contextuales de Webamp (ej. EQ Presets) dentro del viewport
  useEffect(() => {
    const existing = document.getElementById("webamp-context-menu");
    if (existing) enhanceWebampContextMenu(existing);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node instanceof HTMLElement && node.id === "webamp-context-menu") {
            enhanceWebampContextMenu(node);
          }
        }
      }
    });
    observer.observe(document.body, { childList: true });

    const handleResize = () => {
      const menuRoot = document.getElementById("webamp-context-menu");
      if (!menuRoot) return;
      clampTopLevelMenu(menuRoot);
      menuRoot
        .querySelectorAll("li.parent.submenu-open, li.parent:hover")
        .forEach((parentLi) => positionSubmenu(parentLi));
    };
    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || !BROWSER_SUPPORTED) return;

    let cancelled = false;

    const host = document.createElement("div");
    host.className = "webamp-inner-host";
    container.innerHTML = "";
    container.appendChild(host);

    const options = {
      initialTracks: TRACKS.map((t) => ({
        metaData: {
          artist: t.artist,
          title: t.name,
          album: t.album,
        },
        url: t.src,
        defaultName: `${t.artist} - ${t.name}`,
      })),
      availableSkins: WEBAMP_AVAILABLE_SKINS,
      enableHotkeys: true,
      enableMediaSession: true,
      zIndex: 20,
      windowLayout: {
        main: { position: { top: 0, left: 0 } },
        equalizer: { position: { top: 116, left: 0 } },
        playlist: {
          position: { top: 232, left: 0 },
          size: { extraHeight: 2, extraWidth: 0 },
        },
      },
    };

    if (initialSkinUrlRef.current) {
      options.initialSkin = { url: initialSkinUrlRef.current };
    }

    const blockVolumeWheel = (e) => {
      const inPlaylistTracks = Boolean(e.target?.closest?.(".playlist-tracks"));
      if (!(inPlaylistTracks && TRACKS.length > 7)) {
        e.stopPropagation();
      }
    };
    container.addEventListener("wheel", blockVolumeWheel, { capture: true });

    const webamp = new Webamp(options);
    webampRef.current = webamp;

    const unsubscribeClose = webamp.onClose(() => {
      if (!cancelled) setIsClosed(true);
    });

    webamp
      .renderInto(host)
      .then(() => {
        if (cancelled) {
          webamp.dispose();
          return;
        }
        setErrorMsg("");
        setIsReady(true);
      })
      .catch((err) => {
        if (cancelled) return;
        const msg = err?.message || "No se pudo cargar la skin .wsz";
        setErrorMsg(msg);
        onSkinError?.(msg);
      });

    return () => {
      cancelled = true;
      container.removeEventListener("wheel", blockVolumeWheel, {
        capture: true,
      });
      unsubscribeClose();
      if (webampRef.current === webamp) {
        webampRef.current = null;
      }
      try {
        webamp.dispose();
      } catch {
        // Ignorar errores de cleanup si aun estaba cargando
      }
      container.innerHTML = "";
    };
  }, [onSkinError]);

  // Cambia skin en vivo sin interrumpir la reproduccion (incluyendo volver a Classic)
  useEffect(() => {
    const webamp = webampRef.current;
    if (!webamp || !isReady) return;
    if (skinUrl === initialSkinUrlRef.current) return;

    let cancelled = false;
    initialSkinUrlRef.current = skinUrl;

    Promise.resolve()
      .then(() => {
        if (!skinUrl) {
          webamp.store.dispatch({ type: "LOAD_DEFAULT_SKIN" });
          return undefined;
        }
        webamp.setSkinFromUrl(skinUrl);
        return webamp.skinIsLoaded();
      })
      .then(() => {
        if (!cancelled) setErrorMsg("");
      })
      .catch((err) => {
        if (cancelled) return;
        const msg = err?.message || "Error al aplicar la skin .wsz";
        setErrorMsg(msg);
        onSkinError?.(msg);
      });

    return () => {
      cancelled = true;
    };
  }, [skinUrl, isReady, onSkinError]);

  const handleReopen = () => {
    webampRef.current?.reopen();
    setIsClosed(false);
  };

  const scale = isMobile ? MOBILE_SCALE : DESKTOP_SCALE;

  return (
    <div className="webamp-shell">
      {!isReady && !errorMsg && (
        <div className="webamp-loading">CARGANDO WINAMP...</div>
      )}

      {errorMsg && (
        <div className="webamp-error">
          No se pudo cargar la skin: {errorMsg}
        </div>
      )}

      {isClosed && (
        <button
          type="button"
          className="webamp-reopen-btn"
          onClick={handleReopen}
        >
          REABRIR WINAMP
        </button>
      )}

      <div
        className="webamp-viewport"
        style={{
          width: `${Math.ceil(BASE_WIDTH * scale)}px`,
          height: `${Math.ceil(BASE_HEIGHT * scale)}px`,
        }}
      >
        <div
          ref={mountRef}
          className="webamp-mount"
          style={{
            width: `${BASE_WIDTH}px`,
            height: `${BASE_HEIGHT}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        />
      </div>
    </div>
  );
}

export default WebampPlayer;
