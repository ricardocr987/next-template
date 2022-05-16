import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { ReactNode } from "react";

const NavItems = [
  { label: "Home", url: "/", key: 1 },
  { label: "Experiments", url: "/experiments", key: 2 },
  { label: "Articles", url: "/articles", key: 3, comingSoon: true, },
  { label: "Projects", url: "/projects", key: 4, comingSoon: true, },
];

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar NavItems={NavItems} />
      <main>{children}</main>
      <Footer />
    </>
  );
};
