import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "../Sidebar";
import { ConnectWallet } from "../";
import styles from "../../styles/components/Navbar.module.css";
import { Button } from 'degen';
import Link from 'next/link';
import { Tooltip } from '@mui/material'

interface NavProps {
  NavItems: { label: string; url: string, key: number, comingSoon?: boolean }[];
}

export const Navbar = ({ NavItems }: NavProps) => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const [navbar, setNavbar] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  });
  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  return (
    <>
      <div className={styles.nav}>
        <div
          className={
            sidebar
              ? styles.hide
              : navbar
              ? styles.navbar_container_active
              : styles.navbar_container
          }
        >
          <div className={styles.navbar_logo}>RICARDO</div>

          <div className={styles.mobile_icon}>
            <FaBars onClick={showSidebar} />
          </div>

          <div className={styles.nav_menu}>
            {NavItems.map(route => {
              return route.comingSoon ? (
                <Tooltip title="Coming Soon" placement="bottom" arrow>
                  <div className={styles.nav_item} key={route.label}>
                    <div className={styles.nav_links}>
                      <Button
                        as="a"
                        variant="transparent"
                        disabled={route.comingSoon}
                        size="small"
                        width="full"
                        justifyContent="flex-start"
                        key={route.key}
                      >
                        {route.label}
                      </Button>
                    </div>
                  </div>
                </Tooltip>
              ) : (
                <div className={styles.nav_item} key={route.label}>
                  <div className={styles.nav_links}>
                    <Link href={route.url} passHref>
                      <Button
                        as="a"
                        variant="transparent"
                        size="small"
                        width="full"
                        justifyContent="flex-start"
                      >
                          {route.label}
                      </Button>
                    </Link>
                  </div>
                </div>
              );
              })}
          </div>
          <div className={styles.connect_wallet}>
            <ConnectWallet />
          </div>
        </div>
      </div>
      <Sidebar
        NavItems={NavItems}
        sidebar={sidebar}
        showSidebar={showSidebar}
      />
    </>
  );
};

export default Navbar;
