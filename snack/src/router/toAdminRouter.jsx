import React, { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
const Loading = <div className='loading'>Loading...</div>
const AdminIndexPage = lazy(() => import('../pages/admin/AdminIndexPage'))
const AdminProductPage = lazy(() => import('../pages/admin/AdminProductPage'))
const AdminAddProductPage = lazy(() => import('../pages/admin/AdminAddProductPage'))
const AdminProductDetail = lazy(() => import('../pages/admin/AdminProductDetailPage'))
const AdminMember = lazy(()=> import('../pages/admin/AdminMemberPage'));
const AdminPayment = lazy(()=> import('../pages/admin/AdminPaymentPage'));
const AdminMemberDetail = lazy(() => import('../pages/admin/AdminMemberDetailPage'))
const AdminPlace = lazy(()=> import('../pages/admin/AdminOrderPlacePage'));
const AdminPaymentDetail = lazy(() => import('../pages/admin/AdminPaymentDetailPage'))
const AdminCartList = lazy(()=> import('../pages/admin/AdminCartListPage'));
const AdminOrderPlace = lazy(()=> import('../pages/admin/AdminOrderPlaceDetailPage'));





const toAdminRouter = () => {
  return (
    [   
        {
            path: '',  // '/admin'-> '/admin/index
            element: <Navigate replace to='index' />
        },
        {
            path: 'index',
            element: <Suspense fallback={Loading}><AdminIndexPage /></Suspense>
        },
        {
            path: 'product',
            element: <Suspense fallback={Loading}><AdminProductPage/></Suspense>
        },
        {
          path: 'addproduct',
          element: <Suspense fallback={Loading}><AdminAddProductPage/></Suspense>
        },
        {
          path: 'adminpayment',
          element: <Suspense fallback={Loading}><AdminPayment/></Suspense>
        },
        
        {
          path: 'adminmember',
          element: <Suspense fallback={Loading}><AdminMember/></Suspense>
        },
        {
          path: 'adminplace',
          element: <Suspense fallback={Loading}><AdminPlace/></Suspense>
        }
        
        ,
        {
          path: 'admincart',
          element: <Suspense fallback={Loading}><AdminCartList/></Suspense>
        }
        ,
        {
          path: 'product/detail/:id', // set/1 -> id가 1인 상세정보를 보여라~
          element: <Suspense fallback={Loading}><AdminProductDetail /></Suspense>
        },
        {
          path: 'adminmember/detail/:id',
          element: <Suspense fallback={Loading}><AdminMemberDetail/></Suspense>
        },
        {
          path: 'adminpayment/detail/:id',
          element: <Suspense fallback={Loading}><AdminPaymentDetail/></Suspense>
        },
        {
          path: 'adminplace/detail/:id',
          element: <Suspense fallback={Loading}><AdminOrderPlace/></Suspense>
        }
       
       
        
        ]
      )
}

export default toAdminRouter