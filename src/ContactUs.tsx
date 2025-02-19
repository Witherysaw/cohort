import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import logo from "./assets/TailwingLogo.png";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import "./index.css";
import Navbar from "./Componants/Navbar";

export default function ContactUs() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    <div className="absolute w-full min-h-screen bg-gradient-to-r from-[#ffffff] to-emerald-400">
      <Navbar></Navbar>
      {/* <div className="w-20 min-h-screen absolute left-[20rem] top-0 bg-[#31b660] text-white hover:bg-[#b7ffd0] hover:text-black transition-all duration-300 ease-in-out">
        Text
      </div> */}
      <p className="p-3 text-md text-purple-950 z-1">
        Contact Us page nww thar gyiLorem ipsum dolor sit amet consectetur
        adipisicing elit. Nam alias soluta eos tenetur, odio vel quam facere
        cupiditate neque, ipsum aspernatur. Tenetur aperiam sunt officiis nisi,
        omnis expedita perferendis magnam. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Error inventore sit accusantium nemo rerum
        dolore voluptates quae quaerat! Modi eum eaque est delectus suscipit
        veniam et asperiores consectetur cupiditate fugiat. Lorem ipsum dolor
        sit amet consectetur, adipisicing elit. Veniam corrupti necessitatibus
        iste accusantium possimus maxime soluta ducimus tenetur! Doloremque
        reprehenderit fugiat error necessitatibus laborum dicta iste inventore
        officia at dolorem. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Deleniti ipsum rerum doloribus voluptas ipsam fuga, earum iusto
        quidem obcaecati. Repudiandae temporibus natus veritatis a praesentium
        hic, nulla possimus totam? Magni? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Commodi doloremque deserunt consectetur porro ea ipsa,
        quod distinctio, voluptate facilis perspiciatis aperiam. Ad dolor a
        saepe molestiae modi placeat optio excepturi? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Commodi doloremque deserunt consectetur
        porro ea ipsa, quod distinctio, voluptate facilis perspiciatis aperiam.
        Ad dolor a saepe molestiae modi placeat optio excepturi? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Commodi doloremque deserunt
        consectetur porro ea ipsa, quod distinctio, voluptate facilis
        perspiciatis aperiam. Ad dolor a saepe molestiae modi placeat optio
        excepturi? Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Commodi doloremque deserunt consectetur porro ea ipsa, quod distinctio,
        voluptate facilis perspiciatis aperiam. Ad dolor a saepe molestiae modi
        placeat optio excepturi? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Commodi doloremque deserunt consectetur porro ea ipsa,
        quod distinctio, voluptate facilis perspiciatis aperiam. Ad dolor a
        saepe molestiae modi placeat optio excepturi? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Commodi doloremque deserunt consectetur
        porro ea ipsa, quod distinctio, voluptate facilis perspiciatis aperiam.
        Ad dolor a saepe molestiae modi placeat optio excepturi? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Alias repudiandae ratione
        dolore tenetur illo eveniet exercitationem aspernatur? Ipsa modi commodi
        unde ex quidem error a id enim, repellendus deleniti ratione!
      </p>
    </div>
  );
}
