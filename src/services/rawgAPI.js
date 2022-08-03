// di sini kita akan import dari redux toolkit
// yaitu createApi dan fetchBaseQuery

// Perhatikan FROM nya cukup berbeda yah dari yang sebelumnya
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Selanjutnya kita akan membuat APInya di sini
export const rawgAPI = createApi({
    // Anggap saja ini seperti "name" pada slice
    reducerPath: "rawgAPI",
    // ini adalah base Query yang akan dibuat
    // Anggap saja ini adalah cara kita untuk mendefiniskan Base URL dari API yang ingin kita gunakan

    // kita akan menggunakan fetchBaseQuery di sini
    baseQuery: fetchBaseQuery({
        // di sini kita akan memberikan opsi baseUrl
        // Karena kita akan menggunakan API nya dari https://reqresin/api <--- ini adalah baseUrl nya
        baseUrl: "https://api.rawg.io/api",
    }),

    // Nah selanjutnya kita akan mendefinisikan API ini memiliki endpoint apa saja?
    // ini merupakan sebuah fungsi yang menerima sebuah parameter bernama builder

    // builder ini nantinya akan membantu kita dalam membuat auto generated Hooks-nya

    // Perhatikan fungsi ini akan return Object sehingga kita bungkus dengan ({})
    // jangan lupa "()" nya yah !
    endpoints: (builder) => ({
        // GET /colors <--- HTTP Methodnya adalah GET, kita menggunakan builder.query
        getGames: builder.query({
            // di sini kita definisikan querynya mau seperti apa
            // Berupa fungsi yah yang mengembalikan string apa yang ditempelkan ke baseUrl

            // ini artinya baseUrl + /colors => https://reqres.in/api/colors
            query: (page) => `/games?key=380888a8233e4763960774aa96433679&page_size=10&page=${page}`,
        }),

        getGamesDetail: builder.query({
            // di sini kita definisikan querynya mau seperti apa
            // Berupa fungsi yah yang mengembalikan string apa yang ditempelkan ke baseUrl

            // ini artinya baseUrl + /colors => https://reqres.in/api/colors
            query: (id) => `/games/${id}?key=380888a8233e4763960774aa96433679`,
        }),

        getGamesbySearch: builder.query({
            // di sini kita definisikan querynya mau seperti apa
            // Berupa fungsi yah yang mengembalikan string apa yang ditempelkan ke baseUrl

            // ini artinya baseUrl + /colors => https://reqres.in/api/colors
            query: (query) => `/games?key=380888a8233e4763960774aa96433679&search=${query}`,
        }),

        getGamesbySearch5: builder.query({
            // di sini kita definisikan querynya mau seperti apa
            // Berupa fungsi yah yang mengembalikan string apa yang ditempelkan ke baseUrl

            // ini artinya baseUrl + /colors => https://reqres.in/api/colors
            query: (query) => `/games?key=380888a8233e4763960774aa96433679&search=${query}&page_size=5`,
        }),

        getGamesOrderByName: builder.query({
            // di sini kita definisikan querynya mau seperti apa
            // Berupa fungsi yah yang mengembalikan string apa yang ditempelkan ke baseUrl

            // ini artinya baseUrl + /colors => https://reqres.in/api/colors
            query: (page) => `/games?key=380888a8233e4763960774aa96433679&ordering=name&page_size=10&page=${page}`,
        }),

        // GET /colors/:id <--- di sini kita akan meminta parameter di dalam endpointnya dengan nama "id"
        // Karena GET, kita masih menggunakan builder.query
        getGamesOrderByReleased: builder.query({
            // Sekarang karena kita meminta ada parameter id, kita berikan di dalam fungsi query nya
            // suatu parameter id juga
            query: (page) => `/games?key=380888a8233e4763960774aa96433679&ordering=-released&page_size=10&page=${page}`,
        }),

        getGamesOrderByRating: builder.query({
            // di sini kita definisikan querynya mau seperti apa
            // Berupa fungsi yah yang mengembalikan string apa yang ditempelkan ke baseUrl

            // ini artinya baseUrl + /colors => https://reqres.in/api/colors
            query: (page) => `/games?key=380888a8233e4763960774aa96433679&ordering=-rating&page_size=10&page=${page}`,
        }),
        getGameTrailer: builder.query({
            // di sini kita definisikan querynya mau seperti apa
            // Berupa fungsi yah yang mengembalikan string apa yang ditempelkan ke baseUrl

            // ini artinya baseUrl + /colors => https://reqres.in/api/colors
            query: (id) => `/games/${id}/movies?key=380888a8233e4763960774aa96433679`,
        })
    }),
});

// Nah setelah mendeskripsikannya, kita akan menggunakannya
// Bagaimana cara menggunakannya?
// Kita akan EXPORT hooks yang dibuat secara otomatis pada createApi di atas

// How to Export?
export const {
    // Nah di sini perhatikan
    // yang diexport adalah hooks yang dibentuk dengan cara penamaan:
    // "use" + nama endpoints + nama fungsi builder yang digunakan

    // contoh:
    // endpoint "colors", menggunakan builder.query
    // maka jadinya adalah useColorsQuery

    // (Hooks ini dibuat secara otomatis, jadi kita tinggal GUNAKAN nanti !)

    useGetGamesQuery,
    useGetGamesDetailQuery,
    useGetGameTrailerQuery,
    useGetGamesOrderByNameQuery,
    useGetGamesOrderByRatingQuery,
    useGetGamesOrderByReleasedQuery,
    useGetGamesbySearchQuery,
    useGetGamesbySearch5Query
} = rawgAPI;