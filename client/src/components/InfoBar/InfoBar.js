"use client";

import React from "react";
import "./InfoBar.css";
import iconclose from "@/app/iconclose.png";
import iconopen from "@/app/iconopen.png";
import Image from "next/image";
import Link from "next/link";

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <Image className="onlineIcon" src={iconopen} width={20} height={20}  alt="open icon" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <Link href="/">
        <Image src={iconclose} width={20} height={20} alt="close icon" />
      </Link>
    </div>
  </div>
);

export default InfoBar;
