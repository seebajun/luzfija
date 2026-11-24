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
