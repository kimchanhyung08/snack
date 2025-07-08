import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import toAdminRouter from "./toAdminRouter";

const Loading = <div className="loading">Loading...</div>;
const DefaultLayout = lazy(() => import("../layout/common/DefaultLayout"));
const MainIndexPage = lazy(() => import("../pages/main/MainIndexPage"));
const WebtoonIndexPage = lazy(() =>
  import("../pages/webtoon/WebtoonIndexPage")
);
const Cart = lazy(() => import("../components/cart/CartList"));
const AnimePage = lazy(() => import("../pages/anime/AnimePage"));
const SignInLayout = lazy(() => import("../layout/auth/SignInLayout"));
const SignUpLayout = lazy(() => import("../layout/auth/SignUpLayout"));
const MovieIndex = lazy(() => import("../pages/movie/MovieIndexPage"));
const AdminLayout = lazy(() => import("../layout/admin/AdminLayout"));
const MemberLayout = lazy(() => import("../layout/auth/MemberLayout"));
const MemberUpdateLayout = lazy(() =>
  import("../layout/auth/MemberUpdateLayout")
);
const DramaPage = lazy(() => import("../pages/drama/DramaPage"));
const PaymentIndexPage = lazy(() => import("../pages/payment/PaymentIndexPage"));
const PaymentPage = lazy(() => import("../pages/auth/payment/PaymentPage"));
const PaymentDetailPage = lazy(() => import("../pages/auth/payment/PaymentDetailPage"));
const KakaoPage=lazy(()=> import('../api/KakaoAPI'))
const Main3=lazy(()=> import('../pages/main/Main3Page'))

const root = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={Loading}>
        <DefaultLayout />
      </Suspense>
    ),
    children: [
      {
        path: "kakaopage",
        element: (
          <Suspense fallback={Loading}>
            <KakaoPage />
          </Suspense>
        )
      },
      // {
      //   path: "",
      //   element: (
      //     <Suspense fallback={Loading}>
      //       <MainIndexPage />
      //     </Suspense>
      //   ),
      // },
      {
        path: "",
        element: (
          <Suspense fallback={Loading}>
            <Main3 />
          </Suspense>
        ),
      },
      {
        path: "webtoon",
        element: (
          <Suspense fallback={Loading}>
            <WebtoonIndexPage />
          </Suspense>
        ),
      },
      {
        path: "drama",
        element: (
          <Suspense fallback={Loading}>
            <DramaPage />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <Suspense fallback={Loading}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "anime",
        element: (
          <Suspense fallback={Loading}>
            <AnimePage />
          </Suspense>
        ),
      },
      {
        path: "movie",
        element: (
          <Suspense fallback={Loading}>
            <MovieIndex />
          </Suspense>
        ),
      },
      {
        path: "paymentIndex",
        element: (
          <Suspense fallback={Loading}>
            <PaymentIndexPage />
          </Suspense>
        ),
      },
      {
        path: "/payment",
        element: (
          <Suspense fallback={Loading}>
            <PaymentPage />
          </Suspense>
        ),
      },
      {
        path: "/paymentDetail/:id",
        element: (
          <Suspense fallback={Loading}>
            <PaymentDetailPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/signIn",
    element: (
      <Suspense fallback={Loading}>
        <SignInLayout />
      </Suspense>
    ),
  },
  {
    path: "/signUp",
    element: (
      <Suspense fallback={Loading}>
        <SignUpLayout />
      </Suspense>
    ),
  },
  {
    path: "/member",
    element: (
      <Suspense fallback={Loading}>
        <MemberLayout />
      </Suspense>
    ),
  },
  {
    path: "/member/update",
    element: (
      <Suspense fallback={Loading}>
        <MemberUpdateLayout />
      </Suspense>
    ),
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={Loading}>
        <AdminLayout />
      </Suspense>
    ),
    children: toAdminRouter(),
  },
]);

export default root;
