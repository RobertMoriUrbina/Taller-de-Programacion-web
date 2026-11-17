# Recursos de Campo dei Fiori

Preparados el 17 de noviembre de 2026. Los archivos se sirven localmente; la web no requiere descargar imágenes ni fuentes de una CDN para funcionar.

## Fotografías e imágenes

Las fotografías son recursos ilustrativos de terceros y no documentan un negocio real llamado Campo dei Fiori. Los nombres comerciales de los ramos son parte del caso académico. Los colores y especies de las imágenes son referenciales.

| Archivo local | Fuente exacta | Licencia y autoría comprobables |
| --- | --- | --- |
| `assets/images/hero.jpg` | https://github.com/misselliev/gatsby-flower-project/blob/master/src/images/background.jpg | El repositorio contiene licencia MIT para el proyecto; no identifica al fotógrafo ni aclara una licencia independiente de la fotografía. Imagen referencial académica: verificar autorización fotográfica antes de uso comercial. No se atribuye la foto a la autora del código. |
| `assets/images/atelier.jpg` | https://github.com/misselliev/gatsby-flower-project/blob/master/src/images/about-background.jpg | Misma situación de licencia y autoría que hero.jpg. No representa a las fundadoras del caso. |
| `assets/images/aurora.jpg` | https://github.com/Flakster/Flowers-shop-site/blob/master/images/bridalbq2.png | Repositorio publicado bajo CC0 1.0 Universal. Fotógrafo original no identificado en el repositorio. |
| `assets/images/susurro.jpg` | https://github.com/Flakster/Flowers-shop-site/blob/master/images/rfjar.png | Repositorio CC0 1.0 Universal. Fotógrafo original no identificado. |
| `assets/images/jardin.jpg` | https://github.com/Flakster/Flowers-shop-site/blob/master/images/bridalbq1.png | Repositorio CC0 1.0 Universal. Fotógrafo original no identificado. |
| `assets/images/sol.jpg` | https://github.com/Flakster/Flowers-shop-site/blob/master/images/04jar.png | Repositorio CC0 1.0 Universal. Fotógrafo original no identificado. |
| `assets/images/amore.jpg` | https://github.com/Flakster/Flowers-shop-site/blob/master/images/turkishrose.png | Repositorio CC0 1.0 Universal. Fotógrafo original no identificado. |
| `assets/images/brisa.jpg` | https://github.com/kmadilshani/Flower-shop/blob/main/images/jasmine_bouquets.png | Repositorio CC0 1.0 Universal. El repositorio no identifica fotógrafo o generador de esta imagen. |

Se conserva copia de las licencias de los repositorios en `assets/licenses/`. La declaración de licencia de un repositorio no demuestra por sí misma la titularidad de cualquier recurso de terceros. Las imágenes de productos conservan su resolución nativa (184–1024 px); no se inflaron píxeles para simular mayor detalle. Se convirtió a JPEG y se aplicó fondo crema a las transparencias para uso web.

## Fuentes locales

Obtenidas del repositorio oficial Google Fonts, con sus archivos OFL incluidos junto a cada fuente. SIL Open Font License 1.1.

| Archivo | Familia | Fuente |
| --- | --- | --- |
| `assets/fonts/cormorantgaramond.ttf` | Cormorant Garamond, variable de peso | https://github.com/google/fonts/tree/main/ofl/cormorantgaramond |
| `assets/fonts/dmsans.ttf` | DM Sans, variable de peso y tamaño óptico | https://github.com/google/fonts/tree/main/ofl/dmsans |
| `assets/fonts/allura.ttf` | Allura Regular | https://github.com/google/fonts/tree/main/ofl/allura |
| `assets/fonts/dmmono.ttf` | DM Mono Regular | https://github.com/google/fonts/tree/main/ofl/dmmono |

Los archivos `*-OFL.txt` son las licencias originales de cada familia, que incluyen sus titulares de copyright.

## Video editorial local

`assets/video/coleccion.mp4`: montaje académico original de 15 segundos elaborado con ffmpeg a partir de `hero.jpg`, `atelier.jpg` y `brisa.jpg`, con rótulos Campo dei Fiori. H.264, 1280 × 720, 24 fps, sin audio. No se presenta como grabación real del negocio ni como tutorial de producción floral. Conserva las limitaciones de licencia de las imágenes de origen indicadas arriba.

`assets/video/poster.jpg`: copia de hero.jpg usada como portada del video.

`assets/video/coleccion.vtt`: tres subtítulos descriptivos en español que permiten conocer el contenido visual. No hay voz ni música que transcribir.

## Verificación

- Fuentes descargadas por HTTPS del repositorio oficial Google Fonts; archivos TTF y OFL locales.
- Imágenes decodificadas con Pillow y convertidas a JPEG optimizado.
- Video inspeccionado con ffprobe: H.264, 1280 × 720, duración 15 s, 564 477 bytes, sin pista de audio.
- No se desactivó validación TLS durante las descargas.
