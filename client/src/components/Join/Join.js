"use client";

import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
import './Join.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const router = useRouter();

  const joinRoom = (e) => {
    if (!name || !room) {
      e.preventDefault();
    } else {
      router.push(`/chat?name=${name}&room=${room}`);
    }
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <Link href={`/chat?name=${name}&room=${room}`}>
          <button className="button mt-20" type="submit" onClick={joinRoom}>
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
