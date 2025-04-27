// src/components/route/AllRoutes.tsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import AuthorityGuard from './AuthorityGuard'
import AppRoute from './AppRoute'
import PageContainer from '@/components/template/PageContainer'
import { protectedRoutes, publicRoutes } from '@/configs/routes.config'
import { useAuth } from '@/auth'
import type { LayoutType } from '@/@types/theme'

interface ViewsProps {
  pageContainerType?: 'default' | 'gutterless' | 'contained'
  layout?: LayoutType
}
type AllRoutesProps = ViewsProps

export default function AllRoutes(props: AllRoutesProps) {
  const { user } = useAuth()

  return (
    <Routes>
      {/* PUBLIC + SHARED */}
      <Route element={<PublicRoute />}>
        {publicRoutes.map(route => (
          <Route
            key={route.key}
            path={route.path}
            element={
              <AppRoute
                routeKey={route.key}
                component={route.component}
                {...route.meta}
              />
            }
          />
        ))}
      </Route>

      {/* PROTECTED + SHARED */}
      <Route element={<ProtectedRoute />}>
        {protectedRoutes.map(route => (
          <Route
            key={route.key}
            path={route.path}
            element={
              <AuthorityGuard userAuthority={user.authority} authority={route.authority}>
                <PageContainer {...props} {...route.meta}>
                  <AppRoute
                    routeKey={route.key}
                    component={route.component}
                    {...route.meta}
                  />
                </PageContainer>
              </AuthorityGuard>
            }
          />
        ))}
        {/* logged-in fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
