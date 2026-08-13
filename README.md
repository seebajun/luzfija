<p align="center">
  <img src="./src/assets/logo/Luzfija_Logo.webp" alt="Luz Fija" width="320">
</p>

![Website](https://img.shields.io/website?url=https://www.luzfija.com)
![AWS](https://img.shields.io/badge/Hosting-AWS_S3_%2B_CloudFront-orange?logo=amazon-aws)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)

> Sitio web oficial de la banda **Luz Fija**. Booking, portafolio, fechas y lanzamiento del EP "Vespucio".

🔗 **Visita la web en:** [www.luzfija.com](https://www.luzfija.com)

---

## 📸 Capturas de pantalla

| Vista principal | Vista móvil | Reproductor Winamp |
|-----------------|-------------|-------------------|
| ![Vista principal](./screenshots/home.webp) | ![Vista móvil](./screenshots/mobilehome.webp) | ![Reproductor Winamp](./screenshots/reproductor.webp) |

---

## ✨ Características principales

- 🎵 **Landing page** con la identidad visual de la banda.
- 📅 **Calendario de fechas** de próximos shows.
- 🖼️ **Galería de fotos** de la banda.
- 🎧 **Reproductor tipo Winamp** para el lanzamiento de *Vespucio EP*.
- 🎨 **Estilo personal y único**, no replicable directamente.
- 🌐 **Navegación fluida** con React Router.
- ⚡ **Rendimiento optimizado** con Vite.

---

## 🛠️ Tecnologías utilizadas

- **Frontend:** React 19
- **Bundler:** Vite
- **Enrutamiento:** React Router
- **Hosting:** AWS S3 + CloudFront
- **Despliegue:** Script personalizado con AWS CLI
- **Estilos:** CSS

---

## 🚀 Despliegue en AWS

El sitio está alojado en **AWS S3** como sitio web estático, con **CloudFront** como CDN para mejorar la velocidad y seguridad.

### Despliegue con SSO (recomendado)

Los valores de la cuenta (bucket, distribution ID, perfil SSO) no se guardan en el repositorio. Se cargan desde `set-env.ps1`, que es un archivo local ignorado por git.

1. Configurar AWS SSO (una sola vez, ya hecho en este repo):

   ```bash
   aws configure sso --profile luzfija
   ```

2. Iniciar sesión en el portal (se abre el navegador):

   ```bash
   aws sso login --profile luzfija
   ```

3. Cargar las variables de entorno locales:

   ```powershell
   .\set-env.ps1
   ```

4. Desplegar:

   ```bash
   npm run deploy:sso
   ```

> `set-env.ps1` define `AWS_PROFILE`, `AWS_S3_BUCKET` y `AWS_CF_DISTRIBUTION_ID` y está excluido de git para no exponer valores reales. También puedes definir esas variables manualmente o pasar `--bucket` y `--distribution` como argumentos.
