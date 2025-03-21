"use client";

import { Suspense, useState } from "react";
import Drawer from "./drawer";
import Navbar from "./navbar";
import Overlay from "./overlay";

export default function Header() {
  // State to manage drawer visibility
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // Toggle drawer and overlay
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };


  return (
    <div>
        <Navbar isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
        <Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} closeDrawer={closeDrawer} />
        <Overlay isDrawerOpen={isDrawerOpen} closeDrawer={closeDrawer} />

    </div>
  )
}