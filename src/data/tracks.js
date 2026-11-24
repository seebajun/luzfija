const mp3Modules = import.meta.glob("../assets/mp3/*.mp3", {
  eager: true,
  import: "default",
});

// Metadatos opcionales por archivo (sin extension) o id slug.
// Cualquier .mp3 nuevo que agregues en src/assets/mp3/ aparecera automaticamente.
const TRACK_METADATA = {
  vespucio: {
    name: "Vespucio",
    artist: "Luz Fija",
    album: "Single",
    year: "2026",
    kbps: 320,
    khz: 44,
  },
  pacto: {
    name: "Pacto",
    artist: "Luz Fija",
    album: "Single",
    year: "2026",
    kbps: 320,
    khz: 44,
  },
};

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseFilename(filePath) {
  const filename = filePath.split("/").pop().replace(/\.mp3$/i, "");
  const numbered = filename.match(/^(\d+)\s*[-_.]?\s*(.+)$/);
  if (numbered) {
    return {
      order: parseInt(numbered[1], 10),
      rawName: numbered[2].trim(),
    };
  }
  return {
    order: Number.MAX_SAFE_INTEGER,
    rawName: filename.trim(),
  };
}

export const TRACKS = Object.entries(mp3Modules)
  .map(([path, src]) => {
    const { order, rawName } = parseFilename(path);
    const id = slugify(rawName);
    const meta = TRACK_METADATA[id] || {};
    const name = meta.name || rawName;
    const artist = meta.artist || "Luz Fija";

    return {
      id,
      order,
      name,
      artist,
      label: name.toUpperCase(),
      title: `${artist.toUpperCase()} — ${name.toUpperCase()}`,
      album: meta.album || "Archivo",
      year: meta.year || "2026",
      kbps: meta.kbps || 320,
      khz: meta.khz || 44,
      src,
    };
  })
  .sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.name.localeCompare(b.name, "es", { numeric: true });
  });

const pactoIndex = TRACKS.findIndex((t) => t.id === "pacto");
export const DEFAULT_TRACK_INDEX = pactoIndex === -1 ? 0 : pactoIndex;
