import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";

import { onAuthStateChanged, signOut } from "firebase/auth";

const TopNav = ({ isScrolled }) => {
  const navlinks = [
    { name: "Home", link: "/" },
    { name: "Tv Show", link: "/tv" },
    { name: "My List", link: "/mylist" },
    { name: "Movies", link: "/movies" },
  ];


  const navigate = useNavigate()

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

  return (
    <NavContainer>
      <nav className={`${isScrolled ? "scrolled" : "notScroll"}`}>
        <div className="leftSide">
          <div className="logo">
            <img
              src="https://www.shutterstock.com/image-illustration/amd-logo-font-on-dark-260nw-2368094755.jpg"
              alt="logo"
            />
             <span className="company-name">Streamy</span>
         </div>
          <ul className="links">
            {navlinks.map(({ name, link }) => {
              return (
                <li key={name}>
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rightSide">
          <button onClick={()=>signOut(firebaseAuth)}>
            <AiOutlineLogout />
          </button>
        </div>
      </nav>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  .notScroll{
    display: flex;
  }
  .scrolled{
    display: flex;
    background-color: black;
  }
  nav{
    position: sticky;
    top: 0;
    height: 6rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    z-index: 2;
    padding: 0.4rem;
    align-items: center;
   transition: 0.3s ease-in;
   .leftSide{
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-left: 5rem;

   .logo{
    display: flex;
    justify-content: center;
    align-items: center;
   }
   img{
    margin-left: -40px;
    width: 5rem;
    height: 3rem;
   }
   div{

    color: white;
   }
   
  }
 
  .links{
    display: flex;
    list-style-type: none;
    gap: 3rem;
    li{
        a{
            color: white;
            text-decoration: none;
        }
    }
  }
}

.rightSide{
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-right: 1rem;
    button{
        background-color: red;
        border: none;
        cursor: pointer;
        border-radius: 50%;
    }&:focus{
        outline: none;
    }svg{
        color: white;
        font-size: 2rem;
    }
}
.company-name {
  font-size: 28px; /* Adjust the font size as needed */
  font-weight: bold; /* Make the text bold if desired */
  color: #e94c42; 
  margin-left:7px;/* Adjust the color as needed */
}
`;

export default TopNav;
