// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = import.meta.env.VITE_API_BASE_URL + "/api"

// Define a service using a base URL and expected endpoints
export const rubixApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: [
    "getCommunity",
    "getCommunityById",
    "getCommunityBanner",
    "getCommunityBannerById",
    "getCommunityBanner",
    "getCommunityBannerById",
    "getLearnBanner",
    "getLearnBannerById",
    "getBuildBanner",
    "getNewsBanner",
    "getNews",
    "getNewsById",
    "getBlog",
    "getBlogById",
    "getEvents",
    "getEventsById",
    "getEventsBanner",
    "getEventsBannerById",
    "getEventsBanner",
    "getEventsBannerById",

    "getVideos",

    "getWhitePaper",
    "getEcoBanner",
    "getUseCaseById",
    "getUseCase",
    "getTerms",
    "getPolicy",
    "getFaq",
    "getPartners",

    "getNewsLetter",
  ],
  endpoints: (builder) => ({
    // ===============[ Community cards endpoints ]=======================
    getCommunity: builder.query({
      query: ({ page, size }) => `/admin/community?page=${page}&size=${size}`,
      providesTags: ["getCommunity"],
    }),
    getCommunityById: builder.query({
      query: (id) => `/admin/community/${id}`,
      providesTags: ["getCommunityById"],
    }),
    createCommunity: builder.mutation({
      query: (newCommunity) => ({
        url: "/admin/community",
        method: "POST",
        body: newCommunity,
      }),
      invalidatesTags: ["getCommunity"],
    }),
    deleteCommunity: builder.mutation({
      query: (communityId) => ({
        url: `/admin/community/${communityId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getCommunity"],
    }),
    updateCommunityStatus: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/community/change-visibility/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["getCommunity"],
    }),
    updateCommunity: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/community/${id}`,
        method: "PUT",
        body: data, // Include the data you want to send in the request body
      }),
      invalidatesTags: ["getCommunity"],
    }),

    // ===============[ Community Banners endpoints ]=======================
    getCommunityBanner: builder.query({
      query: () => "/admin/main-community",
      providesTags: ["getCommunityBanner"],
    }),
    getCommunityBannerById: builder.query({
      query: (id) => `/admin/main-community/${id}`,
      providesTags: ["getCommunityBannerById"],
    }),
    createCommunityBanner: builder.mutation({
      query: (newBanner) => ({
        url: "/admin/main-community",
        method: "POST",
        body: newBanner,
      }),
      invalidatesTags: ["getCommunityBanner"],
    }),
    deleteCommunityBanner: builder.mutation({
      query: (communityBannerId) => ({
        url: `/admin/main-community/${communityBannerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getCommunityBanner"],
    }),
    updateCommunityBanner: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/main-community/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["getCommunityBanner"],
    }),
    updateCommunityBannerStatus: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/main/change-visibility/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["getCommunityBanner"],
    }),

    // ===============[ Learn Banners endpoints ]=======================
    getLearnBanner: builder.query({
      query: () => "/admin/learn",
      providesTags: ["getLearnBanner"],
    }),
    getLearnBannerById: builder.query({
      query: (id) => `/admin/learn/${id}`,
      providesTags: ["getLearnBannerById"],
    }),
    createLearnBanner: builder.mutation({
      query: (newBanner) => ({
        url: "/admin/learn",
        method: "POST",
        body: newBanner,
      }),
      invalidatesTags: ["getLearnBanner"],
    }),
    deleteLearnBanner: builder.mutation({
      query: (id) => ({
        url: `/admin/learn/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getLearnBanner"],
    }),
    updateLearnBanner: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/learn/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["getLearnBanner"],
    }),
    updateLearnBannerStatus: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/learn/change-visibility/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["getLearnBanner"],
    }),

    // ===============[ Build Banners endpoints ]=======================
    getBuildBanner: builder.query({
      query: () => "/admin/build",
      providesTags: ["getBuildBanner"],
    }),
    getBuildBannerById: builder.query({
      query: (id) => `/admin/build/${id}`,
      providesTags: ["getBuildBannerById"],
    }),
    deleteBuildBanner: builder.mutation({
      query: (id) => ({
        url: `/admin/build/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getBuildBanner"],
    }),
    updateBuildBannerStatus: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/build/change-visibility/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["getBuildBanner"],
    }),
    updateBuildBanner: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/build/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["getBuildBanner"],
    }),

    createBuildBanner: builder.mutation({
      query: (newBanner) => ({
        url: "/admin/build",
        method: "POST",
        body: newBanner,
      }),
      invalidatesTags: ["getBuildBanner"],
    }),

    // ===============[ News Banners endpoints ]=======================
    getNewsBanner: builder.query({
      query: () => "/admin/main-news",
      providesTags: ["getNewsBanner"],
    }),
    getNewsBannerById: builder.query({
      query: (id) => `/admin/main-news/${id}`,
      providesTags: ["getNewsBannerById"],
    }),
    deleteNewsBanner: builder.mutation({
      query: (id) => ({
        url: `/admin/main-news/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getNewsBanner"],
    }),
    updateNewsBannerStatus: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/main-news/change-visibility/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["getNewsBanner"],
    }),
    updateNewsBanner: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/main-news/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["getNewsBanner"],
    }),
    createNewsBanner: builder.mutation({
      query: (newBanner) => ({
        url: "/admin/main-news",
        method: "POST",
        body: newBanner,
      }),
      invalidatesTags: ["getNewsBanner"],
    }),

    // ================[ Blog endpoints ]====================
    getBlog: builder.query({
      query: ({ page, size }) => `/admin/blog?page=${page}&size=${size}`,
      providesTags: ["getBlog"],
    }),
    getBlogById: builder.query({
      query: (id) => `/admin/blog/${id}`,
      transformResponse: (response) => {
        if (response.error) {
          throw new Error(response.error.message);
        }
        return response;
      },
      providesTags: ["getBlogById"],
    }),
    createBlog: builder.mutation({
      query: (newBlog) => ({
        url: "/admin/blog",
        method: "POST",
        body: newBlog,
      }),
      invalidatesTags: ["getBlog"],
    }),
    deleteBlog: builder.mutation({
      query: (blogId) => ({
        url: `/admin/blog/${blogId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getBlog"],
    }),
    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/blog/${id}`,
        method: "PUT",
        body: data, // Include the data you want to send in the request body
      }),
      invalidatesTags: ["getBlog"],
    }),
    updateBlogStatus: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/blog/change-visibility/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["getBlog"],
    }),

    // ================[ News ]====================
    getNews: builder.query({
      query: ({ page, size }) => `/admin/news?page=${page}&size=${size}`,
      providesTags: ["getNews"],
    }),
    getNewsById: builder.query({
      query: (id) => `/admin/news/${id}`,
      providesTags: ["getNewsById"],
    }),
    createNews: builder.mutation({
      query: (news) => ({
        url: "/admin/news",
        method: "POST",
        body: news,
      }),
      invalidatesTags: ["getNews"],
    }),
    updateNewsStatus: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/news/change-visibility/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["getNews"],
    }),
    updateNews: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/news/${id}`,
        method: "PUT",
        body: data, // Include the data you want to send in the request body
      }),
      invalidatesTags: ["getNews"],
    }),
    deleteNews: builder.mutation({
      query: (blogId) => ({
        url: `/admin/news/${blogId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getNews"],
    }),

    // ================[ events ]====================
    getEvents: builder.query({
      query: ({ page, size }) => `/admin/events?page=${page}&size=${size}`,
      providesTags: ["getEvents"],
    }),
    createEvents: builder.mutation({
      query: (news) => ({
        url: "/admin/events",
        method: "POST",
        body: news,
      }),
      invalidatesTags: ["getEvents"],
    }),
    updateEventsStatus: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/events/change-visibility/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["getEvents"],
    }),
    deleteEvents: builder.mutation({
      query: (blogId) => ({
        url: `/admin/events/${blogId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getEvents"],
    }),
    getEventsById: builder.query({
      query: (id) => `/admin/events/${id}`,
      providesTags: ["getEvents"],
    }),
    updateEvents: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/events/${id}`,
        method: "PUT",
        body: data, // Include the data you want to send in the request body
      }),
      invalidatesTags: ["getEvents"],
    }),

    // ===============[ Home Banners endpoints ]=======================
    getHomeBanner: builder.query({
      query: () => "/admin/home",
      providesTags: ["getHomeBanner"],
    }),
    createHomeBanner: builder.mutation({
      query: (newBanner) => ({
        url: "/admin/home",
        method: "POST",
        body: newBanner,
      }),
      invalidatesTags: ["getHomeBanner"],
    }),

    getHomeBannerById: builder.query({
      query: (id) => `/admin/home/${id}`,
      providesTags: ["getHomeBannerById"],
    }),
    deleteHomeBanner: builder.mutation({
      query: (id) => ({
        url: `/admin/home/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getHomeBanner"],
    }),
    updateHomeBannerStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/home/change-visibility/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getHomeBanner"],
    }),
    updateHomeBanner: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/home/${id}`,
        method: "PUT",
        body: data, // Include the data you want to send in the request body
      }),
      invalidatesTags: ["getHomeBanner"],
    }),

    // ===============[ Ecosystem Banners endpoints ]=======================
    getEcoBanner: builder.query({
      query: () => "/admin/eco",
      providesTags: ["getEcoBanner"],
    }),
    createEcoBanner: builder.mutation({
      query: (newBanner) => ({
        url: "/admin/eco",
        method: "POST",
        body: newBanner,
      }),
      invalidatesTags: ["getEcoBanner"],
    }),
    getEcoBannerById: builder.query({
      query: (id) => `/admin/eco/${id}`,
      providesTags: ["getEcoBannerById"],
    }),
    deleteEcoBanner: builder.mutation({
      query: (id) => ({
        url: `/admin/eco/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getEcoBanner"],
    }),
    updateEcoBannerStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/eco/change-visibility/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getEcoBanner"],
    }),
    updateEcoBanner: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/eco/${id}`,
        method: "PUT",
        body: data, // Include the data you want to send in the request body
      }),
      invalidatesTags: ["getEcoBanner"],
    }),

    // ===============[ Videos endpoints ]=======================
    getVideos: builder.query({
      query: ({ page, size }) => `/admin/video?page=${page}&size=${size}`,
      providesTags: ["getVideos"],
    }),

    createVideos: builder.mutation({
      query: (video) => ({
        url: "/admin/video",
        method: "POST",
        body: video,
      }),
      invalidatesTags: ["getVideos"],
    }),

    getVideosById: builder.query({
      query: (id) => `/admin/video/${id}`,
      providesTags: ["getVideos"],
    }),

    updateVideos: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/video/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["getVideos"],
    }),

    updateVideosStatus: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/video/change-visibility/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["getVideos"],
    }),
    deleteVideos: builder.mutation({
      query: (id) => ({
        url: `/admin/video/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getVideos"],
    }),

    // ===============[ White paper endpoints ]=======================
    getWhitePaper: builder.query({
      query: ({ page, size }) => `/admin/whitepaper?page=${page}&size=${size}`,
      providesTags: ["getWhitePaper"],
    }),
    updateWhitepaperStatus: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/whitepaper/change-visibility/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["getWhitePaper"],
    }),
    deleteWhitepaper: builder.mutation({
      query: (id) => ({
        url: `/admin/whitepaper/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getWhitePaper"],
    }),

    createWhitepaper: builder.mutation({
      query: (newBanner) => ({
        url: "/admin/whitepaper",
        method: "POST",
        body: newBanner,
      }),
      invalidatesTags: ["getWhitePaper"],
    }),
    getWhitepaperById: builder.query({
      query: (id) => `/admin/whitepaper/${id}`,
      providesTags: ["getWhitePaper"],
    }),
    updateWhitepaper: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/whitepaper/${id}`,
        method: "PUT",
        body: data, // Include the data you want to send in the request body
      }),
      invalidatesTags: ["getWhitePaper"],
    }),

    // ===============[ Usecase endpoints ]=======================
    getUsecase: builder.query({
      query: ({ page, size }) => `/admin/tech?page=${page}&size=${size}`,
      providesTags: ["getUseCase"],
    }),
    createUsecase: builder.mutation({
      query: (newBanner) => ({
        url: "/admin/tech",
        method: "POST",
        body: newBanner,
      }),
      invalidatesTags: ["getUseCase"],
    }),
    getUsecaseById: builder.query({
      query: (id) => `/admin/tech/${id}`,
      providesTags: ["getUseCaseById"],
    }),
    deleteUsecase: builder.mutation({
      query: (id) => ({
        url: `/admin/tech/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getUseCase"],
    }),
    updateUsecaseStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/tech/change-visibility/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getUseCase"],
    }),
    updateUsecase: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/tech/${id}`,
        method: "PUT",
        body: data, // Include the data you want to send in the request body
      }),
      invalidatesTags: ["getUseCase"],
    }),

    // ===============[ Terms endpoints ]=======================
    getTerms: builder.query({
      query: ({ page, size }) =>
        `/admin/term-condition?page=${page}&size=${size}`,
      providesTags: ["getTerms"],
    }),
    deleteTerms: builder.mutation({
      query: (id) => ({
        url: `/admin/term-condition/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getTerms"],
    }),
    createTerms: builder.mutation({
      query: (data) => ({
        url: `/admin/term-condition`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getTerms"],
    }),
    updateTermsStatus: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/term-condition/change-visibility/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["getTerms"],
    }),
    updateTerms: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/term-condition/${id}`,
        method: "PUT",
        body: data, // Include the data you want to send in the request body
      }),
      invalidatesTags: ["getTerms"],
    }),
    getTermsById: builder.query({
      query: (id) => `/admin/term-condition/${id}`,
      providesTags: ["getTerms"],
    }),

    // ===============[ Terms endpoints ]=======================
    getPolicy: builder.query({
      query: ({ page, size }) => `/admin/policy?page=${page}&size=${size}`,
      providesTags: ["getPolicy"],
    }),
    deletePolicy: builder.mutation({
      query: (id) => ({
        url: `/admin/policy/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getPolicy"],
    }),
    createPolicy: builder.mutation({
      query: (data) => ({
        url: `/admin/policy`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getPolicy"],
    }),
    updatePolicyStatus: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/policy/change-visibility/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["getPolicy"],
    }),
    updatePolicy: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/policy/${id}`,
        method: "PUT",
        body: data, // Include the data you want to send in the request body
      }),
      invalidatesTags: ["getPolicy"],
    }),
    getPolicyById: builder.query({
      query: (id) => `/admin/policy/${id}`,
      providesTags: ["getPolicy"],
    }),

    // ===============[ Faq endpoints ]=======================
    getFaq: builder.query({
      query: ({ page, size }) => `/admin/faq?page=${page}&size=${size}`,
      providesTags: ["getFaq"],
    }),
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/admin/faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getFaq"],
    }),
    createFaq: builder.mutation({
      query: (data) => ({
        url: `/admin/faq`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getFaq"],
    }),
    updateFaqStatus: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/faq/change-visibility/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["getFaq"],
    }),
    updateFaq: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/faq/${id}`,
        method: "PUT",
        body: data, // Include the data you want to send in the request body
      }),
      invalidatesTags: ["getFaq"],
    }),
    getFaqById: builder.query({
      query: (id) => `/admin/faq/${id}`,
      providesTags: ["getFaq"],
    }),

    // ===============[ Cards endpoints ]=======================
    getPartners: builder.query({
      query: ({ page, size }) => `/admin/card?page=${page}&size=${size}`,
      providesTags: ["getPartners"],
    }),
    deletePartners: builder.mutation({
      query: (id) => ({
        url: `/admin/card/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getPartners"],
    }),
    createPartners: builder.mutation({
      query: (data) => ({
        url: `/admin/card`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getPartners"],
    }),
    updatePartnersStatus: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/card/change-visibility/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["getPartners"],
    }),
    updatePartners: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/card/${id}`,
        method: "PUT",
        body: data, // Include the data you want to send in the request body
      }),
      invalidatesTags: ["getPartners"],
    }),
    getPartnersById: builder.query({
      query: (id) => `/admin/card/${id}`,
      providesTags: ["getPartners"],
    }),

    // ===============[ Cards endpoints ]=======================
    getNewsLetter: builder.query({
      query: ({ page, size }) => `newsLetter/request?page=${page}&size=${size}`,
      providesTags: ["getNewsLetter"],
    }),
    deleteEmail: builder.mutation({
      query: (id) => ({
        url: `/newsLetter/request/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getNewsLetter"],
    }),
    getNewsLetterEmail: builder.query({
      query: () => "newsLetter/request",
      providesTags: ["getNewsLetter"],
    }),
  }),
});

export const {
  useGetCommunityQuery,
  useGetCommunityByIdQuery,
  useCreateCommunityMutation,
  useDeleteCommunityMutation,
  useUpdateCommunityStatusMutation,
  useUpdateCommunityMutation,

  useGetCommunityBannerQuery,
  useCreateCommunityBannerMutation,
  useDeleteCommunityBannerMutation,
  useUpdateCommunityBannerMutation,
  useGetCommunityBannerByIdQuery,
  useUpdateCommunityBannerStatusMutation,

  useCreateLearnBannerMutation,
  useDeleteLearnBannerMutation,
  useGetLearnBannerByIdQuery,
  useGetLearnBannerQuery,
  useUpdateLearnBannerMutation,
  useUpdateLearnBannerStatusMutation,

  useGetBuildBannerQuery,
  useGetBuildBannerByIdQuery,
  useDeleteBuildBannerMutation,
  useUpdateBuildBannerStatusMutation,
  useCreateBuildBannerMutation,
  useUpdateBuildBannerMutation,

  useGetNewsBannerQuery,
  useGetNewsBannerByIdQuery,
  useDeleteNewsBannerMutation,
  useUpdateNewsBannerStatusMutation,
  useCreateNewsBannerMutation,
  useUpdateNewsBannerMutation,

  useGetBlogQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
  useUpdateBlogStatusMutation,

  useGetNewsQuery,
  useUpdateNewsStatusMutation,
  useDeleteNewsMutation,
  useCreateNewsMutation,
  useGetNewsByIdQuery,
  useUpdateNewsMutation,

  useGetHomeBannerQuery,
  useCreateHomeBannerMutation,
  useDeleteHomeBannerMutation,
  useUpdateHomeBannerStatusMutation,
  useGetHomeBannerByIdQuery,
  useUpdateHomeBannerMutation,

  useGetEventsQuery,
  useCreateEventsMutation,
  useUpdateEventsStatusMutation,
  useDeleteEventsMutation,
  useUpdateEventsMutation,
  useGetEventsByIdQuery,

  useGetVideosQuery,
  useCreateVideosMutation,
  useDeleteVideosMutation,
  useUpdateVideosStatusMutation,
  useGetVideosByIdQuery,
  useUpdateVideosMutation,

  useGetWhitePaperQuery,
  useUpdateWhitepaperStatusMutation,
  useDeleteWhitepaperMutation,
  useCreateWhitepaperMutation,
  useGetWhitepaperByIdQuery,
  useUpdateWhitepaperMutation,

  useGetEcoBannerByIdQuery,
  useGetEcoBannerQuery,
  useUpdateEcoBannerMutation,
  useUpdateEcoBannerStatusMutation,
  useDeleteEcoBannerMutation,
  useCreateEcoBannerMutation,

  useCreateUsecaseMutation,
  useGetUsecaseByIdQuery,
  useUpdateUsecaseMutation,
  useDeleteUsecaseMutation,
  useGetUsecaseQuery,
  useUpdateUsecaseStatusMutation,

  useGetTermsQuery,
  useDeleteTermsMutation,
  useCreateTermsMutation,
  useUpdateTermsStatusMutation,
  useUpdateTermsMutation,
  useGetTermsByIdQuery,

  useGetPolicyQuery,
  useDeletePolicyMutation,
  useCreatePolicyMutation,
  useUpdatePolicyStatusMutation,
  useUpdatePolicyMutation,
  useGetPolicyByIdQuery,

  useGetFaqQuery,
  useDeleteFaqMutation,
  useCreateFaqMutation,
  useUpdateFaqStatusMutation,
  useUpdateFaqMutation,
  useGetFaqByIdQuery,

  useGetPartnersQuery,
  useDeletePartnersMutation,
  useCreatePartnersMutation,
  useUpdatePartnersStatusMutation,
  useUpdatePartnersMutation,
  useGetPartnersByIdQuery,

  useGetNewsLetterQuery,
  useDeleteEmailMutation,
  useGetNewsLetterEmailQuery,
} = rubixApi;
