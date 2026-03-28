// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vite.dev/config/

// //old
//   // export default defineConfig({
//   //   plugins: [react()],
//   // })

//   //for prod ---------
  // export default defineConfig({
  //   plugins: [react()],
  //   server: {
  //     port: 5173,
  //     changeOrigin: true,
  //     secure: false,
  //   },
  // });
//   export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5173,
//     proxy: {
//       "/api": {
//         target: "https://ems-main-5p6r.onrender.com",
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// });

// //for local ----------
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5173,
//     proxy: {
//       "/api": {
//         target: "http://localhost:8080",
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// });


// without cookie
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});