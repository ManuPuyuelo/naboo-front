import styles from "../styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

function Header() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const router = useRouter();

  const getTitle = () => {
    switch (router.pathname) {
      case "/":
        return "Mes Activités";
      case "/explorer":
        return "Explorer";
      case "/decouvrir":
        return "Découvrir des activités";
      default:
        return "";
    }
  };

  const currentScreen = getTitle();

  return (
    <header className={styles.headercontainer}>
      <div className={styles.HeaderLogo}>
        <nav>
          <a href="/" className={styles.brandName}>
            <Image
              src="https://res.cloudinary.com/djfrwyodt/image/upload/v1694075661/Face_q9pknn.svg"
              alt="Candidator Logo"
              width={40}
              height={40}
              objectFit="cover"
            />
            Candidator
          </a>
        </nav>
      </div>
      <div className={styles.HeaderRightMenu}>
        <nav>
          <div
            className={`${styles.navigationMenu} ${
              isNavExpanded ? styles.navigationMenuExpanded : ""
            }`}
          >
            <ul>
              <li
                className={`${
                  currentScreen === "Découvrir des activités"
                    ? styles.navigationMenuActive
                    : ""
                }`}
              >
                <a>Découvrir des activités</a>
              </li>
              <li
                className={`${
                  currentScreen === "Explorer"
                    ? styles.navigationMenuActive
                    : ""
                }`}
              >
                <a>Explorer</a>
              </li>
              <li
                className={`${
                  currentScreen === "Mes Activités"
                    ? styles.navigationMenuActive
                    : ""
                }`}
              >
                <a href="/">Mes Activités</a>
              </li>
              <li className={styles.userImage}>
                <a href="#">
                  <Image
                    src="https://res.cloudinary.com/djfrwyodt/image/upload/v1694077092/Ellipse_10_piql4t.svg"
                    alt="User Photo"
                    width={40}
                    height={40}
                    objectFit="cover"
                  />
                </a>
              </li>
            </ul>
            <button
              className={`${styles.hamburger} ${
                isNavExpanded ? styles.hamburgerExpanded : ""
              }`}
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
            >
              <FontAwesomeIcon className={styles.hamburgerIcon} icon={faBars} />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
