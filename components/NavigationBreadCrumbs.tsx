"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
const NavigationBreadCrumbs = () => {
    const pathname = usePathname()
    const paths= pathname.split('/');
    console.log(paths);
  return (
  <Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href={`/${paths[1]}`}>{paths[1]}</BreadcrumbLink>
    </BreadcrumbItem>
    {paths[2]&&(<>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <p >{paths[2]}</p>
    </BreadcrumbItem>
    </>)}
  </BreadcrumbList>
</Breadcrumb>
  )
}

export default NavigationBreadCrumbs
