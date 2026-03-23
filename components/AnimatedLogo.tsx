'use client';

import React, { useEffect, useRef } from 'react';
import './AnimatedLogo.css';

const AnimatedLogo = () => {
  const clipGroupRef = useRef<SVGGElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const NS = 'http://www.w3.org/2000/svg';
    const clipGroup = clipGroupRef.current;
    const wrap = logoWrapperRef.current;

    if (!clipGroup || !wrap) return;

    // --- Cleanup previous elements to prevent duplication on HMR ---
    const existingRays = clipGroup.querySelectorAll('.rm');
    existingRays.forEach(ray => ray.remove());
    const existingParticles = wrap.querySelectorAll('.particle');
    existingParticles.forEach(p => p.remove());
    // --- End cleanup ---

    // Original sun position for calculation
    const SOX = 390, SOY = 95;
    // New sun position
    const SNX = 366, SNY = 154;
    const SC  = 0.6935;

    const rays = [
      [[-137.3,-191.3],[-98.5,-253.4]],
      [[-190.9,-55.2], [-168.3,-124.9]],
      [[-210.0,89.8],  [-204.9,16.7]],
      [[-193.4,235.1], [-206.1,162.9]],
      [[-142.2,372.0], [-172.0,305.1]],
      [[-59.4,492.6],  [-104.5,434.8]],
      [[50.2,589.5],   [-7.6,544.4]],
      [[179.9,657.0],  [113.0,627.2]],
      [[322.1,691.1],  [249.9,678.4]],
      [[468.3,689.9],  [395.2,695.0]],
      [[609.9,653.3],  [540.2,675.9]],
      [[738.4,583.5],  [676.3,622.3]],
      [[846.2,484.7],  [795.4,537.4]],
      [[927.0,362.7],  [890.3,426.2]],
    ];

    function tp(p: number[]) {
      return [SNX + (p[0]-SOX)*SC, SNY + (p[1]-SOY)*SC];
    }

    rays.forEach(([p1,p2]) => {
      const np1 = tp(p1), np2 = tp(p2);
      const el = document.createElementNS(NS,'polygon');
      el.setAttribute('class','rm');
      el.setAttribute('points',
        `${SNX},${SNY} ${np1[0].toFixed(1)},${np1[1].toFixed(1)} ${np2[0].toFixed(1)},${np2[1].toFixed(1)}`
      );
      clipGroup.appendChild(el);
    });

    const colors = ['#FF00FF','#00FFFF','#FFFF00','#FF69B4','#7FFFD4'];
    for (let i = 0; i < 35; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const s = Math.random()*5+2;
      const c = colors[Math.floor(Math.random()*colors.length)];
      p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*600}px;bottom:${Math.random()*60}px;background:${c};box-shadow:0 0 ${s*2}px ${c};animation-duration:${Math.random()*4+3}s;animation-delay:${Math.random()*6}s;`;
      wrap.appendChild(p);
    }
  }, []);

  return (
    <div className="logo-wrapper" ref={logoWrapperRef}>
      <svg width="600" height="500" viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="semi">
            <path d="M 130 293 A 159.5 159.5 0 0 1 449 293 Z"/>
          </clipPath>
          <mask id="waveCut" maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width="600" height="500" fill="black"/>
            <path d="M 130 293 A 159.5 159.5 0 0 1 449 293 Z" fill="white"/>
            <g transform="translate(71.7329, 174.1941) scale(0.169771, 0.120395)">
              <path fill="black" d="M 343.20957,986.79749 V 855.93923 l 12.25,-0.6557 c 61.7116,-3.3032 97.68034,-7.1102 129.39267,-13.6952 32.4101,-6.73 43.49674,-12.1933 129.35733,-63.7452 63.58833,-38.1793 93.13744,-56.7856 153,-96.3397 39.58453,-26.1554 41.52741,-27.3799 56.5,-35.6102 64.56131,-35.4885 136.43825,-44.8165 190.29103,-24.6956 19.3524,7.2306 32.963,15.4335 44.7309,26.9583 30.99,30.3498 35.8563,68.8449 13.3303,105.4486 l -5.1886,8.4311 -2.5316,-3.4399 c -7.9608,-10.8167 -24.4272,-23.6426 -35.9248,-27.9823 -10.9353,-4.1274 -19.7641,-5.391 -29.3292,-4.1976 -13.69523,1.7085 -22.66298,5.9687 -31.94332,15.1747 -9.15606,9.0828 -13.38438,16.9844 -15.46434,28.8987 -3.89847,22.331 6.92998,43.9095 27.92174,55.6413 14.63352,8.1784 40.81412,15.5987 67.10782,19.0202 25.9171,3.3725 60.121,1.653 90.1902,-4.534 63.055,-12.974 148.8456,-47.9217 231.1122,-94.1459 15.2259,-8.5552 28.7228,-16.8447 50.6977,-31.1376 24.5078,-15.9402 37.5083,-25.2485 68.1951,-48.8273 43.4829,-33.4107 56.5196,-42.0829 83.3049,-55.4154 20.4781,-10.1931 24.9951,-12.0846 42.5,-17.7969 34.1389,-11.1405 62.5486,-15.8921 95.5,-15.9728 51.3128,-0.1257 89.1487,12.7971 116.6315,39.8351 19.2515,18.9398 28.5455,40.137 27.0202,61.6256 -1.7055,24.0275 -16.4843,46.3246 -41.924,63.2516 -9.6094,6.3939 -20.4913,10.8545 -19.1579,7.8531 0.4228,-0.9517 2.0605,-5.3303 3.6393,-9.7303 2.6456,-7.3729 2.8394,-8.8624 2.4719,-19 -0.5104,-14.0776 -2.7612,-20.3124 -10.2553,-28.407 -6.6186,-7.1488 -13.0852,-10.2091 -22.9527,-10.8623 -9.2734,-0.6138 -16.8394,1.0675 -26.4502,5.8779 -18.1415,9.0801 -28.007,28.9116 -26.7608,53.7942 0.964,19.249 9.4398,37.0167 25.134,52.688 9.8229,9.8086 18.2179,15.3558 30.8592,20.3911 19.1628,7.6329 31.398,9.1796 102.7448,12.9882 c 22.4684,1.1994 175.7797,3.9724 222.25,4.0199 L 2222.20957,855.93923 L 2222.20957,986.79749 Z"/>
            </g>
            <rect x="0" y="288" width="600" height="10" fill="black"/>
          </mask>
        </defs>

        <g mask="url(#waveCut)">
          <g clipPath="url(#semi)" ref={clipGroupRef}>
            <path d="M 130 293 A 159.5 159.5 0 0 1 449 293 Z" className="rc"/>
          </g>
          <circle className="sun" cx="366" cy="154" r="76" fill="#FFFF00" clipPath="url(#semi)"/>
        </g>
        
        <text className="title" x="300" y="370" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontSize="84" fontWeight="900" fill="#FF00FF">
          MARBELLA
        </text>
        <text className="sub" x="300" y="408" textAnchor="middle" fontFamily="'Montserrat', Verdana, sans-serif" fontSize="25" fontWeight="300" letterSpacing="7" fill="#FFFFFF">
          LET'S PARTY
        </text>
      </svg>
    </div>
  );
};

export default AnimatedLogo;