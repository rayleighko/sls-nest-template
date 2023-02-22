export const ImageFileType = {
  tuple: [
    "apng",
    "bmp",
    "gif",
    "jpeg",
    "pjpeg",
    "png",
    "svg+xml",
    "tiff",
    "webp",
    "x-icon"
  ] as const,
  enum: {
    apng: "apng",
    bmp: "bmp",
    gif: "gif",
    jpeg: "jpeg",
    pjpeg: "pjpeg",
    png: "png",
    "svg+xml": "svg+xml",
    tiff: "tiff",
    webp: "webp",
    "x-icon": "x-icon"
  } as const
};
