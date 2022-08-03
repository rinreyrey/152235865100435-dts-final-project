import { configureStore } from "@reduxjs/toolkit";
// import service yang dibutuhkan
import { rawgAPI } from "../services/rawgAPI.js";

export const storeRAWG = configureStore({
    reducer: {
        // Di sini kita akan menambahkan reducerPathnya ke dalam sini
        // perhatikan di sini menggunakan "array", karena di dalam object tidak bisa menggunakan "dot"

        // Perasaan kita ga buat reducer yah?
        // Yes, dibuatkan SECARA OTOMATIS pada saat kita menggunakan createApi
        [rawgAPI.reducerPath]: rawgAPI.reducer,
    },
    // Misalnya ini untuk tingkat lanjut, ingin menggunakan caching, invalidation (untuk refresh data),
    // ataupun untuk polling datanya
    // bisa menggunakan middleware

    // menerima sebuah fungsi yang menerima parameter getDefaultMiddleware (sebuah fungsi juga)
    middleware: (getDefaultMiddleware) => {
        // Di sini kita akan menggabungkan middleware dari reqresinColorAPI ke default middlewarenya
        // Kapan kita bikinnya yah? Lagi lagi, dibuatkan secara otomatis pada saat kita mendefinisikan
        // dalam createApi di service (wuoah......)
        return getDefaultMiddleware().concat(rawgAPI.middleware);
    },
});