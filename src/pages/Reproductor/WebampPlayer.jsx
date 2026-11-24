import { useEffect, useRef, useState } from "react";
import Webamp from "webamp";
import { TRACKS } from "../../data/tracks";
import { SKINS } from "../../data/skins";

const BASE_WIDTH = 275;
const BASE_HEIGHT = 406; // main (116) + eq (116) + playlist (116 + 2*29)
const DESKTOP_SCALE = 1.5;
const MOBILE_SCALE = 1.3;
const MOBILE_MEDIA_QUERY = "(max-width: 768px)";
const MOBILE_EQ_VISIBLE_COUNT = 5;

function computePlayerScale() {
  if (typeof window === "undefined") return DESKTOP_SCALE;
  if (!window.matchMedia(MOBILE_MEDIA_QUERY).matches) return DESKTOP_SCALE;
  const maxFittingScale = (window.innerWidth - 16) / BASE_WIDTH;
  return Math.min(
    MOBILE_SCALE,
    Math.max(1.0, Math.floor(maxFittingScale * 100) / 100),
  );
}

function getDirectText(element) {
  return Array.from(element.childNodes)
    .filter((node) => node.nodeType === Node.TEXT_NODE)
    .map((node) => node.textContent)
    .join("")
    .trim();
}

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

function convertMenuToFixed(menuRoot) {
  if (menuRoot.dataset.fixedPositioned === "1") return;
  const wrapper = menuRoot.firstElementChild;
  if (!wrapper) return;

  const rect = wrapper.getBoundingClientRect();
  menuRoot.dataset.fixedPositioned = "1";
  menuRoot.style.position = "fixed";
  menuRoot.style.top = "0";
  menuRoot.style.left = "0";
  wrapper.style.top = `${Math.round(rect.top)}px`;
  wrapper.style.left = `${Math.round(rect.left)}px`;
}

function setupEqPresetsMenu(menuRoot) {
  if (menuRoot.dataset.eqEnhanced === "1") return;
  const menu = menuRoot.querySelector(".context-menu");
  if (!menu) return;

  const topItems = Array.from(menu.children).filter((el) => el.tagName === "LI");
  const loadLi = topItems.find(
    (li) => li.classList.contains("parent") && getDirectText(li) === "Load",
  );
  const saveLi = topItems.find((li) => getDirectText(li) === "Save");

  if (!loadLi || !saveLi) return;
  menuRoot.dataset.eqEnhanced = "1";

  // Ocultar Save en general (escritorio y mobile) sin remover nodos de React
  saveLi.classList.add("eq-menu-hidden");

  if (!window.matchMedia(MOBILE_MEDIA_QUERY).matches) return;

  const submenu = loadLi.querySelector(":scope > ul");
  if (!submenu) return;
  submenu.classList.add("eq-mobile-paged");

  const allChildren = Array.from(submenu.children).filter(
    (el) => el.tagName === "LI",
  );
  const presetItems = [];
  for (const item of allChildren) {
    if (item.classList.contains("hr")) {
      item.classList.add("eq-menu-hidden");
    } else {
      presetItems.push(item);
    }
  }

  if (presetItems.length <= MOBILE_EQ_VISIBLE_COUNT) {
    loadLi.classList.add("submenu-open");
    positionSubmenu(loadLi);
    return;
  }

  const maxStart = Math.max(0, presetItems.length - MOBILE_EQ_VISIBLE_COUNT);
  let startIndex = 0;

  const upLi = document.createElement("li");
  upLi.className = "eq-nav-btn eq-nav-up";
  upLi.setAttribute("role", "button");
  upLi.setAttribute("aria-label", "Subir en ecualizaciones");
  upLi.textContent = "▲";

  const downLi = document.createElement("li");
  downLi.className = "eq-nav-btn eq-nav-down";
  downLi.setAttribute("role", "button");
  downLi.setAttribute("aria-label", "Bajar en ecualizaciones");
  downLi.textContent = "▼";

  const renderWindow = () => {
    const end = startIndex + MOBILE_EQ_VISIBLE_COUNT;

    presetItems.forEach((item, index) => {
      item.classList.toggle("eq-menu-hidden", index < startIndex || index >= end);
    });

    upLi.classList.toggle("disabled", startIndex <= 0);
    downLi.classList.toggle("disabled", startIndex >= maxStart);
    downLi.textContent = `▼ (${startIndex + 1}-${Math.min(end, presetItems.length)}/${presetItems.length})`;
  };

  let navTapScroll = null;
  const recordNavTapScroll = () => {
    navTapScroll = { x: window.scrollX, y: window.scrollY };
  };

  const preventFocusJump = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleStep = (delta) => (event) => {
    event.preventDefault();
    event.stopPropagation();
    const savedX = navTapScroll ? navTapScroll.x : window.scrollX;
    const savedY = navTapScroll ? navTapScroll.y : window.scrollY;
    navTapScroll = null;

    const nextStart = Math.max(0, Math.min(maxStart, startIndex + delta));
    if (nextStart !== startIndex) {
      startIndex = nextStart;
      renderWindow();
    }
    if (window.scrollX !== savedX || window.scrollY !== savedY) {
      window.scrollTo(savedX, savedY);
    }
    requestAnimationFrame(() => {
      if (window.scrollX !== savedX || window.scrollY !== savedY) {
        window.scrollTo(savedX, savedY);
      }
    });
  };

  upLi.addEventListener("pointerdown", recordNavTapScroll);
  downLi.addEventListener("pointerdown", recordNavTapScroll);
  upLi.addEventListener("mousedown", preventFocusJump);
  downLi.addEventListener("mousedown", preventFocusJump);
  upLi.addEventListener("click", handleStep(-1));
  downLi.addEventListener("click", handleStep(1));

  submenu.insertBefore(upLi, submenu.firstChild);
  submenu.appendChild(downLi);

  loadLi.classList.add("submenu-open");
  renderWindow();
  positionSubmenu(loadLi);
}

function enhanceWebampContextMenu(menuRoot) {
  if (menuRoot.dataset.boundsEnhanced === "1") return;
  menuRoot.dataset.boundsEnhanced = "1";

  const initMenu = () => {
    const savedX = window.scrollX;
    const savedY = window.scrollY;
    convertMenuToFixed(menuRoot);
    setupEqPresetsMenu(menuRoot);
    clampTopLevelMenu(menuRoot);
    menuRoot
      .querySelectorAll("li.parent.submenu-open")
      .forEach((parentLi) => positionSubmenu(parentLi));
    if (window.scrollX !== savedX || window.scrollY !== savedY) {
      window.scrollTo(savedX, savedY);
    }
  };
  initMenu();
  requestAnimationFrame(initMenu);

  let activeParent = null;

  menuRoot.addEventListener("mousedown", (event) => {
    if (event.target?.closest?.(".eq-nav-btn, li.parent")) {
      event.preventDefault();
    }
  });

  menuRoot.addEventListener("pointerover", (event) => {
    const li = event.target?.closest?.("li");
    if (!li || !menuRoot.contains(li)) return;
    if (li.classList.contains("eq-nav-btn")) return;

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
    if (target.closest(".eq-nav-btn")) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
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
  const [scale, setScale] = useState(computePlayerScale);
  const [errorMsg, setErrorMsg] = useState(() =>
    BROWSER_SUPPORTED ? "" : "Tu navegador no soporta Webamp.",
  );

  useEffect(() => {
    const updateScale = () => setScale(computePlayerScale());
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    mediaQuery.addEventListener("change", updateScale);
    window.addEventListener("resize", updateScale);
    return () => {
      mediaQuery.removeEventListener("change", updateScale);
      window.removeEventListener("resize", updateScale);
    };
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

    let pendingTapScroll = null;
    const handleContainerPointerDown = (e) => {
      if (e.target?.closest?.("#presets-context, #webamp")) {
        pendingTapScroll = {
          x: window.scrollX,
          y: window.scrollY,
          clientY: e.clientY,
          time: Date.now(),
          moved: false,
        };
      }
    };
    const handleContainerPointerMove = (e) => {
      if (
        pendingTapScroll &&
        Math.abs(e.clientY - pendingTapScroll.clientY) > 8
      ) {
        pendingTapScroll.moved = true;
      }
    };
    const handleContainerMouseDown = (e) => {
      if (e.target?.closest?.("#presets-context")) {
        e.preventDefault();
      }
    };
    const restoreScrollIfTap = () => {
      const snap = pendingTapScroll;
      if (!snap || snap.moved || Date.now() - snap.time > 600) return;
      requestAnimationFrame(() => {
        if (!snap.moved && (window.scrollX !== snap.x || window.scrollY !== snap.y)) {
          window.scrollTo(snap.x, snap.y);
        }
      });
    };
    container.addEventListener("pointerdown", handleContainerPointerDown, {
      capture: true,
    });
    container.addEventListener("pointermove", handleContainerPointerMove, {
      capture: true,
    });
    container.addEventListener("mousedown", handleContainerMouseDown, {
      capture: true,
    });
    container.addEventListener("focusin", restoreScrollIfTap, { capture: true });
    container.addEventListener("click", restoreScrollIfTap, { capture: true });

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
        host.querySelectorAll("[tabindex]").forEach((el) => {
          const origFocus = el.focus.bind(el);
          el.focus = (opts) => origFocus({ ...opts, preventScroll: true });
        });
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
      container.removeEventListener("pointerdown", handleContainerPointerDown, {
        capture: true,
      });
      container.removeEventListener("pointermove", handleContainerPointerMove, {
        capture: true,
      });
      container.removeEventListener("mousedown", handleContainerMouseDown, {
        capture: true,
      });
      container.removeEventListener("focusin", restoreScrollIfTap, {
        capture: true,
      });
      container.removeEventListener("click", restoreScrollIfTap, {
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
