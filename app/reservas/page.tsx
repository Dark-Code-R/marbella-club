'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, MouseEvent } from 'react';
import { gsap } from 'gsap';

type Seat = {
  left: number;
  top: number;
  width: number;
  height: number;
  id: string;
  typeIndex: 0 | 1 | 2 | 3;
  price: number;
  symbol: number;
  darkLabel: 0 | 1;
  labelStyle: number;
  label: string;
};

type ModalDetails = {
  nombre: string;
  telefono: string;
  fecha: string;
  personas: string;
  espacios: string;
  total: number;
};

const TYPE_LABELS = ['Mesa', 'Mesa M', 'Lounge', 'VIP Lounge'] as const;
const MOVE_X_120_IDS = new Set([
  'T1','T2','T3','T4','T5','T6','T7','T8','T9','T10',
  'T11','T12','T13','T14','T15','T16','T17','T18','T19','T20',
  'GM1','GM2','GM3','GM4','GM5','GM6','GM7','GM8','GM9','GM10','GM11','GM12',
]);

const LABEL_STYLES: Record<number, CSSProperties | undefined> = {
  0: undefined,
  1: { fontSize: '8px' },
  2: { fontSize: '9px' },
  3: { paddingLeft: '14px' },
  4: { paddingRight: '14px' },
  5: { fontSize: '9px', paddingLeft: '18px' },
  6: { fontSize: '9px', paddingRight: '18px' },
};

const SEATS: Seat[] = [
  { left: 188, top: 190, width: 56, height: 54, id: 'T1',  typeIndex: 0, price: 40,  symbol: 1,  darkLabel: 0, labelStyle: 0, label: '1'   },
  { left: 250, top: 190, width: 56, height: 54, id: 'T2',  typeIndex: 0, price: 40,  symbol: 1,  darkLabel: 0, labelStyle: 0, label: '2'   },
  { left: 315, top: 190, width: 56, height: 54, id: 'T3',  typeIndex: 0, price: 40,  symbol: 2,  darkLabel: 0, labelStyle: 0, label: '3'   },
  { left: 382, top: 190, width: 56, height: 54, id: 'T4',  typeIndex: 0, price: 40,  symbol: 2,  darkLabel: 0, labelStyle: 0, label: '4'   },
  { left: 450, top: 190, width: 56, height: 54, id: 'T5',  typeIndex: 0, price: 40,  symbol: 2,  darkLabel: 0, labelStyle: 0, label: '5'   },
  { left: 188, top: 252, width: 56, height: 54, id: 'T6',  typeIndex: 0, price: 40,  symbol: 2,  darkLabel: 0, labelStyle: 0, label: '6'   },
  { left: 250, top: 252, width: 56, height: 54, id: 'T7',  typeIndex: 0, price: 40,  symbol: 2,  darkLabel: 0, labelStyle: 0, label: '7'   },
  { left: 315, top: 252, width: 56, height: 54, id: 'T8',  typeIndex: 0, price: 40,  symbol: 2,  darkLabel: 0, labelStyle: 0, label: '8'   },
  { left: 382, top: 252, width: 56, height: 54, id: 'T9',  typeIndex: 0, price: 40,  symbol: 2,  darkLabel: 0, labelStyle: 0, label: '9'   },
  { left: 450, top: 252, width: 56, height: 54, id: 'T10', typeIndex: 0, price: 40,  symbol: 2,  darkLabel: 0, labelStyle: 0, label: '10'  },
  { left: 188, top: 314, width: 56, height: 54, id: 'T11', typeIndex: 0, price: 40,  symbol: 2,  darkLabel: 0, labelStyle: 0, label: '11'  },
  { left: 250, top: 314, width: 56, height: 54, id: 'T12', typeIndex: 0, price: 40,  symbol: 2,  darkLabel: 0, labelStyle: 0, label: '12'  },
  { left: 315, top: 314, width: 56, height: 54, id: 'T13', typeIndex: 0, price: 40,  symbol: 2,  darkLabel: 0, labelStyle: 0, label: '13'  },
  { left: 382, top: 314, width: 56, height: 54, id: 'T14', typeIndex: 0, price: 40,  symbol: 2,  darkLabel: 0, labelStyle: 0, label: '14'  },
  { left: 450, top: 314, width: 56, height: 54, id: 'T15', typeIndex: 0, price: 40,  symbol: 2,  darkLabel: 0, labelStyle: 0, label: '15'  },
  { left: 188, top: 377, width: 56, height: 54, id: 'T16', typeIndex: 0, price: 40,  symbol: 3,  darkLabel: 0, labelStyle: 0, label: '16'  },
  { left: 250, top: 377, width: 56, height: 54, id: 'T17', typeIndex: 0, price: 40,  symbol: 3,  darkLabel: 0, labelStyle: 0, label: '17'  },
  { left: 315, top: 377, width: 56, height: 54, id: 'T18', typeIndex: 0, price: 40,  symbol: 3,  darkLabel: 0, labelStyle: 0, label: '18'  },
  { left: 382, top: 377, width: 56, height: 54, id: 'T19', typeIndex: 0, price: 40,  symbol: 3,  darkLabel: 0, labelStyle: 0, label: '19'  },
  { left: 450, top: 377, width: 56, height: 54, id: 'T20', typeIndex: 0, price: 40,  symbol: 3,  darkLabel: 0, labelStyle: 0, label: '20'  },
  { left: 8,   top: 456, width: 54, height: 56, id: 'T21', typeIndex: 0, price: 35,  symbol: 4,  darkLabel: 0, labelStyle: 0, label: '21'  },
  { left: 8,   top: 518, width: 54, height: 56, id: 'T22', typeIndex: 0, price: 35,  symbol: 4,  darkLabel: 0, labelStyle: 0, label: '22'  },
  { left: 80,  top: 580, width: 56, height: 54, id: 'T23', typeIndex: 0, price: 35,  symbol: 3,  darkLabel: 0, labelStyle: 0, label: '23'  },
  { left: 177, top: 430, width: 54, height: 56, id: 'T24', typeIndex: 0, price: 35,  symbol: 4,  darkLabel: 0, labelStyle: 0, label: '24'  },
  { left: 680, top: 430, width: 56, height: 54, id: 'T25', typeIndex: 0, price: 35,  symbol: 5,  darkLabel: 0, labelStyle: 0, label: '25'  },
  { left: 680, top: 498, width: 56, height: 54, id: 'T26', typeIndex: 0, price: 35,  symbol: 5,  darkLabel: 0, labelStyle: 0, label: '26'  },
  { left: 800, top: 589, width: 56, height: 54, id: 'T27', typeIndex: 0, price: 35,  symbol: 5,  darkLabel: 0, labelStyle: 0, label: '27'  },
  { left: 800, top: 649, width: 56, height: 54, id: 'T28', typeIndex: 0, price: 35,  symbol: 5,  darkLabel: 0, labelStyle: 0, label: '28'  },
  { left: 726, top: 699, width: 56, height: 54, id: 'T29', typeIndex: 0, price: 35,  symbol: 3,  darkLabel: 0, labelStyle: 0, label: '29'  },
  { left: 480, top: 760, width: 56, height: 54, id: 'T30', typeIndex: 0, price: 35,  symbol: 3,  darkLabel: 0, labelStyle: 0, label: '30'  },
  { left: 480, top: 820, width: 56, height: 54, id: 'T31', typeIndex: 0, price: 35,  symbol: 3,  darkLabel: 0, labelStyle: 0, label: '31'  },
  { left: 480, top: 890, width: 56, height: 54, id: 'T32', typeIndex: 0, price: 35,  symbol: 3,  darkLabel: 0, labelStyle: 0, label: '32'  },
  { left: 104, top: 50,  width: 56, height: 54, id: 'T33', typeIndex: 0, price: 35,  symbol: 6,  darkLabel: 0, labelStyle: 0, label: '33'  },
  { left: 176, top: 50,  width: 56, height: 54, id: 'T34', typeIndex: 0, price: 35,  symbol: 6,  darkLabel: 0, labelStyle: 0, label: '34'  },
  { left: 212, top: 110, width: 56, height: 54, id: 'T35', typeIndex: 0, price: 35,  symbol: 5,  darkLabel: 0, labelStyle: 0, label: '35'  },
  { left: 800, top: 56,  width: 56, height: 54, id: 'T36', typeIndex: 0, price: 35,  symbol: 5,  darkLabel: 0, labelStyle: 0, label: '36'  },
  { left: 800, top: 120, width: 56, height: 54, id: 'T37', typeIndex: 0, price: 35,  symbol: 5,  darkLabel: 0, labelStyle: 0, label: '37'  },
  { left: 179, top: 190, width: 50, height: 72, id: 'L1',  typeIndex: 2, price: 80,  symbol: 7,  darkLabel: 0, labelStyle: 3, label: 'L1'  },
  { left: 179, top: 266, width: 50, height: 72, id: 'L2',  typeIndex: 2, price: 80,  symbol: 7,  darkLabel: 0, labelStyle: 3, label: 'L2'  },
  { left: 179, top: 344, width: 50, height: 72, id: 'L3',  typeIndex: 2, price: 80,  symbol: 7,  darkLabel: 0, labelStyle: 3, label: 'L3'  },
  { left: 8,   top: 378, width: 50, height: 72, id: 'L7',  typeIndex: 2, price: 80,  symbol: 7,  darkLabel: 0, labelStyle: 3, label: 'L7'  },
  { left: 680, top: 190, width: 50, height: 72, id: 'L4',  typeIndex: 2, price: 80,  symbol: 8,  darkLabel: 0, labelStyle: 4, label: 'L4'  },
  { left: 680, top: 266, width: 50, height: 72, id: 'L5',  typeIndex: 2, price: 80,  symbol: 8,  darkLabel: 0, labelStyle: 4, label: 'L5'  },
  { left: 680, top: 344, width: 50, height: 72, id: 'L6',  typeIndex: 2, price: 80,  symbol: 8,  darkLabel: 0, labelStyle: 4, label: 'L6'  },
  { left: 800, top: 502, width: 50, height: 72, id: 'L8',  typeIndex: 2, price: 80,  symbol: 8,  darkLabel: 0, labelStyle: 4, label: 'L8'  },
  { left: 2,   top: 74,  width: 82, height: 96, id: 'VIP1',typeIndex: 3, price: 150, symbol: 9,  darkLabel: 0, labelStyle: 5, label: 'VIP 1'},
  { left: 2,   top: 176, width: 82, height: 96, id: 'VIP2',typeIndex: 3, price: 150, symbol: 9,  darkLabel: 0, labelStyle: 5, label: 'VIP 2'},
  { left: 2,   top: 278, width: 82, height: 96, id: 'VIP3',typeIndex: 3, price: 150, symbol: 9,  darkLabel: 0, labelStyle: 5, label: 'VIP 3'},
  { left: 800, top: 176, width: 82, height: 96, id: 'VIP4',typeIndex: 3, price: 150, symbol: 10, darkLabel: 0, labelStyle: 6, label: 'VIP 4'},
  { left: 800, top: 282, width: 82, height: 96, id: 'VIP5',typeIndex: 3, price: 150, symbol: 10, darkLabel: 0, labelStyle: 6, label: 'VIP 5'},
  { left: 800, top: 388, width: 82, height: 96, id: 'VIP6',typeIndex: 3, price: 150, symbol: 10, darkLabel: 0, labelStyle: 6, label: 'VIP 6'},
  { left: 98,  top: 110, width: 46, height: 46, id: 'GM13',typeIndex: 1, price: 100, symbol: 11, darkLabel: 1, labelStyle: 1, label: 'M13' },
  { left: 150, top: 110, width: 46, height: 46, id: 'GM14',typeIndex: 1, price: 100, symbol: 11, darkLabel: 1, labelStyle: 1, label: 'M14' },
  { left: 188, top: 470, width: 46, height: 46, id: 'GM1', typeIndex: 1, price: 100, symbol: 12, darkLabel: 1, labelStyle: 2, label: 'M1'  },
  { left: 240, top: 470, width: 46, height: 46, id: 'GM2', typeIndex: 1, price: 100, symbol: 12, darkLabel: 1, labelStyle: 2, label: 'M2'  },
  { left: 295, top: 470, width: 46, height: 46, id: 'GM3', typeIndex: 1, price: 100, symbol: 12, darkLabel: 1, labelStyle: 2, label: 'M3'  },
  { left: 349, top: 470, width: 46, height: 46, id: 'GM4', typeIndex: 1, price: 100, symbol: 12, darkLabel: 1, labelStyle: 2, label: 'M4'  },
  { left: 405, top: 470, width: 46, height: 46, id: 'GM5', typeIndex: 1, price: 100, symbol: 12, darkLabel: 1, labelStyle: 2, label: 'M5'  },
  { left: 460, top: 470, width: 46, height: 46, id: 'GM6', typeIndex: 1, price: 100, symbol: 12, darkLabel: 1, labelStyle: 2, label: 'M6'  },
  { left: 188, top: 520, width: 46, height: 46, id: 'GM7', typeIndex: 1, price: 100, symbol: 12, darkLabel: 1, labelStyle: 2, label: 'M7'  },
  { left: 240, top: 520, width: 46, height: 46, id: 'GM8', typeIndex: 1, price: 100, symbol: 12, darkLabel: 1, labelStyle: 2, label: 'M8'  },
  { left: 295, top: 520, width: 46, height: 46, id: 'GM9', typeIndex: 1, price: 100, symbol: 12, darkLabel: 1, labelStyle: 2, label: 'M9'  },
  { left: 349, top: 520, width: 46, height: 46, id: 'GM10',typeIndex: 1, price: 100, symbol: 12, darkLabel: 1, labelStyle: 1, label: 'M10' },
  { left: 405, top: 520, width: 46, height: 46, id: 'GM11',typeIndex: 1, price: 100, symbol: 12, darkLabel: 1, labelStyle: 1, label: 'M11' },
  { left: 460, top: 520, width: 46, height: 46, id: 'GM12',typeIndex: 1, price: 100, symbol: 12, darkLabel: 1, labelStyle: 1, label: 'M12' },
];

function NewMarbellaLogo() {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = logoRef.current;
    if (!wrap) return;

    if (wrap.querySelector('.particle')) {
        return;
    }

    const colors = ['#FF00FF', '#00FFFF', '#FFFF00', '#FF69B4', '#7FFFD4'];
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 35; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const s = Math.random() * 5 + 2;
      const c = colors[Math.floor(Math.random() * colors.length)];
      p.style.cssText = `
        width:${s}px;
        height:${s}px;
        left:${Math.random() * 600}px;
        bottom:${Math.random() * 60}px;
        background:${c};
        box-shadow:0 0 ${s * 2}px ${c};
        animation-duration:${Math.random() * 4 + 3}s;
        animation-delay:${Math.random() * 6}s;
      `;
      fragment.appendChild(p);
    }
    wrap.appendChild(fragment);
  }, []);

  return (
    <div className="logo-wrapper" ref={logoRef} style={{ margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <svg width="600" height="500" viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="semi">
            <path d="M 70 260 A 230 230 0 0 1 530 260 Z" />
          </clipPath>
        </defs>

        <g clipPath="url(#semi)">
          {/* Base cian */}
          <path d="M 70 260 A 230 230 0 0 1 530 260 Z" className="rc" />

          {/* 12 rayos magenta */}
          <polygon className="rm" points="390,95  -137.3,-191.3  -98.5,-253.4" />
          <polygon className="rm" points="390,95  -190.9, -55.2 -168.3,-124.9" />
          <polygon className="rm" points="390,95  -210.0,  89.8 -204.9,  16.7" />
          <polygon className="rm" points="390,95  -193.4,235.1  -206.1,162.9" />
          <polygon className="rm" points="390,95  -142.2,372.0  -172.0,305.1" />
          <polygon className="rm" points="390,95   -59.4,492.6  -104.5,434.8" />
          <polygon className="rm" points="390,95    50.2,589.5    -7.6,544.4" />
          <polygon className="rm" points="390,95   179.9,657.0   113.0,627.2" />
          <polygon className="rm" points="390,95   322.1,691.1   249.9,678.4" />
          <polygon className="rm" points="390,95   468.3,689.9   395.2,695.0" />
          <polygon className="rm" points="390,95   609.9,653.3   540.2,675.9" />
          <polygon className="rm" points="390,95   738.4,583.5   676.3,622.3" />
          <polygon className="rm" points="390,95   846.2,484.7   795.4,537.4" />
          <polygon className="rm" points="390,95   927.0,362.7   890.3,426.2" />
        </g>

        {/* Sol */}
        <circle className="sun" cx="410" cy="60" r="110" fill="#FFFF00" clipPath="url(#semi)" />

        {/* Ola */}
        <g transform="translate(-14.02, 88.68) scale(0.244811, 0.173611)">
          <path fill="black" d="
        M 343.20957,986.79749
        V 855.93923
        l 12.25,-0.6557
        c 61.7116,-3.3032 97.68034,-7.1102 129.39267,-13.6952
        32.4101,-6.73 43.49674,-12.1933 129.35733,-63.7452
        63.58833,-38.1793 93.13744,-56.7856 153,-96.3397
        39.58453,-26.1554 41.52741,-27.3799 56.5,-35.6102
        64.56131,-35.4885 136.43825,-44.8165 190.29103,-24.6956
        19.3524,7.2306 32.963,15.4335 44.7309,26.9583
        30.99,30.3498 35.8563,68.8449 13.3303,105.4486
        l -5.1886,8.4311 -2.5316,-3.4399
        c -7.9608,-10.8167 -24.4272,-23.6426 -35.9248,-27.9823
        -10.9353,-4.1274 -19.7641,-5.391 -29.3292,-4.1976
        -13.69523,1.7085 -22.66298,5.9687 -31.94332,15.1747
        -9.15606,9.0828 -13.38438,16.9844 -15.46434,28.8987
        -3.89847,22.331 6.92998,43.9095 27.92174,55.6413
        14.63352,8.1784 40.81412,15.5987 67.10782,19.0202
        25.9171,3.3725 60.121,1.653 90.1902,-4.534
        63.055,-12.974 148.8456,-47.9217 231.1122,-94.1459
        15.2259,-8.5552 28.7228,-16.8447 50.6977,-31.1376
        24.5078,-15.9402 37.5083,-25.2485 68.1951,-48.8273
        43.4829,-33.4107 56.5196,-42.0829 83.3049,-55.4154
        20.4781,-10.1931 24.9951,-12.0846 42.5,-17.7969
        34.1389,-11.1405 62.5486,-15.8921 95.5,-15.9728
        51.3128,-0.1257 89.1487,12.7971 116.6315,39.8351
        19.2515,18.9398 28.5455,40.137 27.0202,61.6256
        -1.7055,24.0275 -16.4843,46.3246 -41.924,63.2516
        -9.6094,6.3939 -20.4913,10.8545 -19.1579,7.8531
        0.4228,-0.9517 2.0605,-5.3303 3.6393,-9.7303
        2.6456,-7.3729 2.8394,-8.8624 2.4719,-19
        -0.5104,-14.0776 -2.7612,-20.3124 -10.2553,-28.407
        -6.6186,-7.1488 -13.0852,-10.2091 -22.9527,-10.8623
        -9.2734,-0.6138 -16.8394,1.0675 -26.4502,5.8779
        -18.1415,9.0801 -28.007,28.9116 -26.7608,53.7942
        0.964,19.249 9.4398,37.0167 25.134,52.688
        9.8229,9.8086 18.2179,15.3558 30.8592,20.3911
        19.1628,7.6329 31.398,9.1796 102.7448,12.9882
        c 22.4684,1.1994 175.7797,3.9724 222.25,4.0199
        L 2222.20957,855.93923
        L 2222.20957,986.79749
        Z
      " />
        </g>

        {/* MARBELLA */}
        <text className="title"
          x="300" y="370"
          textAnchor="middle"
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="84"
          fontWeight="900"
          fill="#FF00FF">MARBELLA</text>

        {/* LET'S PARTY */}
        <text className="sub"
          x="300" y="412"
          textAnchor="middle"
          fontFamily="'Montserrat', Verdana, sans-serif"
          fontSize="16"
          fontWeight="300"
          letterSpacing="7"
          fill="#FFFFFF">LET'S PARTY</text>
      </svg>
    </div>
  );
}

function StageLight({ x, y, color, id }: { x: number; y: number; color: string; id: string }) {
  return (
    <g id={id}>
      {/* Cono de luz */}
      <polygon
        className={`light-beam beam-${id}`}
        points={`${x - 4},${y + 5} ${x + 4},${y + 5} ${x + 60},168 ${x - 60},168`}
        fill={color}
        opacity="0.09"
        style={{ transformOrigin: `${x}px ${y + 5}px`, filter: 'blur(5px)' }}
      />
      {/* Halo de la lámpara */}
      <circle cx={x} cy={y} r="10" fill={color} opacity="0.18" style={{ filter: 'blur(4px)' }} />
      {/* Núcleo brillante */}
      <circle cx={x} cy={y} r="4" fill="#ffffff" opacity="0.85" />
      <circle cx={x} cy={y} r="6" fill={color} opacity="0.55" />
    </g>
  );
}

const BEAM_DATA = [
  { x: 118, y: 10, color: '#ff2255', id: 'sl1' },
  { x: 196, y: 10, color: '#2255ff', id: 'sl2' },
  { x: 276, y: 10, color: '#00ffbb', id: 'sl3' },
  { x: 356, y: 10, color: '#ffcc00', id: 'sl4' },
  { x: 436, y: 10, color: '#cc22ff', id: 'sl5' },
  { x: 516, y: 10, color: '#ff6600', id: 'sl6' },
  { x: 596, y: 10, color: '#00ccff', id: 'sl7' },
  { x: 676, y: 10, color: '#ff2299', id: 'sl8' },
];

function StageLightsOverlay() {
  return (
    <svg
      className="stage-lights-svg"
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '175px',
        pointerEvents: 'none',
        zIndex: 6,
        overflow: 'visible',
        mixBlendMode: 'screen',
      }}
      viewBox="0 0 900 175"
      preserveAspectRatio="xMidYMin meet"
    >
      <defs>
        {/* Gradiente ambiental del escenario */}
        <radialGradient id="ambientGlow" cx="50%" cy="100%" r="70%">
          <stop offset="0%"   stopColor="#ff3366" stopOpacity="0.35" />
          <stop offset="60%"  stopColor="#6600ff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0"    />
        </radialGradient>
        {/* Gradiente de suelo del stage */}
        <linearGradient id="stageFloor" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#ff3366" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0"   />
        </linearGradient>
        <filter id="glow-hard">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Glow ambiental sobre toda el área del stage */}
      <rect
        className="stage-ambient"
        x="80" y="130" width="740" height="44"
        rx="6"
        fill="url(#ambientGlow)"
        opacity="0.6"
      />

      {/* Línea de suelo del stage con glow */}
      <rect
        className="stage-floor-glow"
        x="80" y="162" width="740" height="8"
        rx="4"
        fill="url(#stageFloor)"
        opacity="0.7"
      />

      {/* Rayos de luz */}
      {BEAM_DATA.map((l) => (
        <StageLight key={l.id} {...l} />
      ))}

      {/* Strobe flash overlay */}
      <rect
        className="strobe-flash"
        x="80" y="128" width="740" height="40"
        rx="4"
        fill="#ffffff"
        opacity="0"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────
// SEAT SYMBOL COMPONENT
// ─────────────────────────────────────────────

function SeatSymbol({ symbol, width, height }: { symbol: number; width: number; height: number }) {
  const common  = { className: 'vfill',  fill: '#282828', stroke: '#4a4a4a', strokeWidth: 1.5 };
  const common2 = { className: 'vfill2', fill: '#323232' };

  if (symbol === 1 || symbol === 2) {
    return (
      <svg width={width} height={height} viewBox="0 0 56 54">
        <rect {...common}  x="1"  y="1"  width="18" height="36" rx="5" />
        <rect {...common2} x="4"  y="4"  width="10" height="28" rx="3" />
        <rect {...common}  x="37" y="1"  width="18" height="36" rx="5" />
        <rect {...common2} x="40" y="4"  width="10" height="28" rx="3" />
        <rect {...common}  x="7"  y="30" width="42" height="22" rx="5" />
        <rect {...common2} x="11" y="34" width="34" height="14" rx="3" />
      </svg>
    );
  }
  if (symbol === 3) {
    return (
      <svg width={width} height={height} viewBox="0 0 56 54">
        <rect {...common}  x="1"  y="1"  width="18" height="40" rx="5" />
        <rect {...common2} x="4"  y="4"  width="10" height="32" rx="3" />
        <rect {...common}  x="37" y="1"  width="18" height="40" rx="5" />
        <rect {...common2} x="40" y="4"  width="10" height="32" rx="3" />
        <rect {...common}  x="7"  y="32" width="42" height="21" rx="5" />
        <rect {...common2} x="11" y="35" width="34" height="13" rx="3" />
      </svg>
    );
  }
  if (symbol === 4) {
    return (
      <svg width={width} height={height} viewBox="0 0 54 56">
        <rect {...common}  x="1"  y="1"  width="22" height="54" rx="5" />
        <rect {...common2} x="4"  y="4"  width="14" height="46" rx="3" />
        <rect {...common}  x="17" y="1"  width="36" height="20" rx="5" />
        <rect {...common2} x="20" y="4"  width="28" height="12" rx="3" />
        <rect {...common}  x="17" y="35" width="36" height="20" rx="5" />
        <rect {...common2} x="20" y="38" width="28" height="12" rx="3" />
      </svg>
    );
  }
  if (symbol === 5) {
    return (
      <svg width={width} height={height} viewBox="0 0 56 54">
        <rect {...common}  x="37" y="1"  width="18" height="50" rx="5" />
        <rect {...common2} x="40" y="4"  width="10" height="42" rx="3" />
        <rect {...common}  x="1"  y="1"  width="42" height="20" rx="5" />
        <rect {...common2} x="4"  y="4"  width="34" height="12" rx="3" />
        <rect {...common}  x="1"  y="33" width="42" height="20" rx="5" />
        <rect {...common2} x="4"  y="36" width="34" height="12" rx="3" />
      </svg>
    );
  }
  if (symbol === 6) {
    return (
      <svg width={width} height={height} viewBox="0 0 56 54">
        <rect {...common}  x="3"  y="1"  width="50" height="20" rx="5" />
        <rect {...common2} x="7"  y="4"  width="42" height="12" rx="3" />
        <rect {...common}  x="3"  y="16" width="18" height="38" rx="5" />
        <rect {...common2} x="7"  y="20" width="10" height="30" rx="3" />
        <rect {...common}  x="35" y="16" width="18" height="38" rx="5" />
        <rect {...common2} x="39" y="20" width="10" height="30" rx="3" />
      </svg>
    );
  }
  if (symbol === 7 || symbol === 8) {
    const left = symbol === 7;
    return (
      <svg width={width} height={height} viewBox="0 0 50 72">
        {left ? (
          <>
            <rect x="1"  y="10" width="12" height="52" rx="6" fill="#a93226" stroke="#1a0000" strokeWidth="2" />
            <rect x="4"  y="14" width="5"  height="44" rx="3" fill="#c0392b" />
            <rect x="11" y="1"  width="38" height="24" rx="7" fill="#a93226" stroke="#1a0000" strokeWidth="2" />
            <rect x="15" y="5"  width="30" height="15" rx="4" fill="#c0392b" />
            <rect x="15" y="5"  width="30" height="5"  rx="3" fill="#e74c3c" opacity="0.5" />
            <rect x="11" y="47" width="38" height="24" rx="7" fill="#a93226" stroke="#1a0000" strokeWidth="2" />
            <rect x="15" y="51" width="30" height="15" rx="4" fill="#c0392b" />
            <rect x="15" y="51" width="30" height="5"  rx="3" fill="#e74c3c" opacity="0.5" />
          </>
        ) : (
          <>
            <rect x="37" y="10" width="12" height="52" rx="6" fill="#a93226" stroke="#1a0000" strokeWidth="2" />
            <rect x="41" y="14" width="5"  height="44" rx="3" fill="#c0392b" />
            <rect x="1"  y="1"  width="38" height="24" rx="7" fill="#a93226" stroke="#1a0000" strokeWidth="2" />
            <rect x="5"  y="5"  width="30" height="15" rx="4" fill="#c0392b" />
            <rect x="5"  y="5"  width="30" height="5"  rx="3" fill="#e74c3c" opacity="0.5" />
            <rect x="1"  y="47" width="38" height="24" rx="7" fill="#a93226" stroke="#1a0000" strokeWidth="2" />
            <rect x="5"  y="51" width="30" height="15" rx="4" fill="#c0392b" />
            <rect x="5"  y="51" width="30" height="5"  rx="3" fill="#e74c3c" opacity="0.5" />
          </>
        )}
      </svg>
    );
  }
  if (symbol === 9 || symbol === 10) {
    const left = symbol === 9;
    return (
      <svg width={width} height={height} viewBox="0 0 82 96">
        {left ? (
          <>
            <rect x="1"  y="1"  width="20" height="94" rx="9" fill="#9e4010" stroke="#1a0800" strokeWidth="2.5" />
            <rect x="4"  y="5"  width="12" height="86" rx="6" fill="#b5541a" />
            <rect x="4"  y="5"  width="12" height="20" rx="6" fill="#d4621e" opacity="0.6" />
            <rect x="19" y="1"  width="62" height="30" rx="9" fill="#9e4010" stroke="#1a0800" strokeWidth="2.5" />
            <rect x="24" y="6"  width="52" height="18" rx="5" fill="#b5541a" />
            <rect x="24" y="6"  width="52" height="7"  rx="4" fill="#d4621e" opacity="0.6" />
            <rect x="19" y="29" width="18" height="38" rx="4" fill="#9e4010" stroke="#1a0800" strokeWidth="1.5" />
            <rect x="19" y="65" width="62" height="30" rx="9" fill="#9e4010" stroke="#1a0800" strokeWidth="2.5" />
            <rect x="24" y="70" width="52" height="18" rx="5" fill="#b5541a" />
            <rect x="24" y="70" width="52" height="7"  rx="4" fill="#d4621e" opacity="0.6" />
          </>
        ) : (
          <>
            <rect x="61" y="1"  width="20" height="94" rx="9" fill="#9e4010" stroke="#1a0800" strokeWidth="2.5" />
            <rect x="66" y="5"  width="12" height="86" rx="6" fill="#b5541a" />
            <rect x="66" y="5"  width="12" height="20" rx="6" fill="#d4621e" opacity="0.6" />
            <rect x="1"  y="1"  width="62" height="30" rx="9" fill="#9e4010" stroke="#1a0800" strokeWidth="2.5" />
            <rect x="6"  y="6"  width="52" height="18" rx="5" fill="#b5541a" />
            <rect x="6"  y="6"  width="52" height="7"  rx="4" fill="#d4621e" opacity="0.6" />
            <rect x="45" y="29" width="18" height="38" rx="4" fill="#9e4010" stroke="#1a0800" strokeWidth="1.5" />
            <rect x="1"  y="65" width="62" height="30" rx="9" fill="#9e4010" stroke="#1a0800" strokeWidth="2.5" />
            <rect x="6"  y="70" width="52" height="18" rx="5" fill="#b5541a" />
            <rect x="6"  y="70" width="52" height="7"  rx="4" fill="#d4621e" opacity="0.6" />
          </>
        )}
      </svg>
    );
  }
  if (symbol === 11 || symbol === 12) {
    return (
      <svg width={width} height={height} viewBox="0 0 46 46">
        <circle className="vfill" cx="23" cy="23" r="21" fill="#e8c200" stroke="#5a3a00" strokeWidth="2.5" />
        <circle className="inner" cx="23" cy="23" r="15" fill="#FFD700" opacity="0.6" />
        <circle cx="23" cy="20" r="5" fill="#ffe566" opacity="0.4" />
      </svg>
    );
  }
  return (
    <svg width={width} height={height} viewBox="0 0 54 56">
      <rect className="vfill"  x="1"  y="1"  width="18" height="44" rx="5" fill="#282828" stroke="#4a4a4a" strokeWidth="1.5" />
      <rect className="vfill2" x="4"  y="4"  width="10" height="36" rx="3" fill="#323232" />
      <rect className="vfill"  x="35" y="1"  width="18" height="44" rx="5" fill="#282828" stroke="#4a4a4a" strokeWidth="1.5" />
      <rect className="vfill2" x="38" y="4"  width="10" height="36" rx="3" fill="#323232" />
      <rect className="vfill"  x="7"  y="34" width="40" height="21" rx="5" fill="#282828" stroke="#4a4a4a" strokeWidth="1.5" />
      <rect className="vfill2" x="11" y="37" width="32" height="13" rx="3" fill="#323232" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────

export default function Page() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected]   = useState<Set<string>>(new Set());
  const [reserved, setReserved]   = useState<Set<string>>(new Set());
  const [nombre,   setNombre]     = useState('');
  const [telefono, setTelefono]   = useState('');
  const [fecha,    setFecha]      = useState(new Date().toISOString().split('T')[0]);
  const [personas, setPersonas]   = useState('1 persona');
  const [isModalOpen,  setIsModalOpen]  = useState(false);
  const [modalDetails, setModalDetails] = useState<ModalDetails | null>(null);

  const seatById     = useMemo(() => new Map(SEATS.map((s) => [s.id, s])), []);
  const selectedArray = useMemo(() => Array.from(selected), [selected]);
  const total         = useMemo(
    () => selectedArray.reduce((sum, id) => sum + (seatById.get(id)?.price ?? 0), 0),
    [selectedArray, seatById],
  );

  // ── ANIMACIONES GSAP ────────────────────────────────────────────────────
  useEffect(() => {
    if (!rootRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {

      // ── Animación de entrada original ──────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tl.fromTo('.decor-stage-name', { autoAlpha: 0, y: -8 }, { autoAlpha: 1, y: 0, duration: 0.28 }, '+=0.4')
        .fromTo(
          '.decor-ceiling, .decor-stage, .decor-truss, .decor-speaker, .decor-booth, .decor-bar-red, .decor-bar-table, .decor-bar-console, .decor-room, .decor-hall',
          { autoAlpha: 0, y: -12 },
          { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.02 },
          '<',
        )
        .fromTo('.sg',    { autoAlpha: 0, y: 10, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.3, stagger: { each: 0.008, from: 'start' } }, '-=0.1')
        .fromTo('.panel', { autoAlpha: 0, x: 14 }, { autoAlpha: 1, x: 0, duration: 0.28 }, '-=0.15');

      // ── Pulsación de luces del techo originales ─────────────────────────
      gsap.set('.decor-ceiling', {
        filter: 'brightness(0.95)',
        boxShadow: 'inset 0 0 24px rgba(0,0,0,0.35), 0 0 0 rgba(255,208,90,0)',
      });

      const screensTl = gsap.timeline({ repeat: -1, repeatDelay: 0.2 });
      screensTl
        .to('.decor-ceiling.c1', { duration: 0.32, filter: 'brightness(1.35)', boxShadow: 'inset 0 0 24px rgba(0,0,0,0.25), 0 0 22px rgba(255,198,92,0.45)', ease: 'power2.out' })
        .to('.decor-ceiling.c1', { duration: 0.30, filter: 'brightness(0.95)', boxShadow: 'inset 0 0 24px rgba(0,0,0,0.35), 0 0 0 rgba(255,208,90,0)',   ease: 'power1.inOut' })
        .to('.decor-ceiling.c2', { duration: 0.36, filter: 'brightness(1.42)', boxShadow: 'inset 0 0 26px rgba(0,0,0,0.20), 0 0 28px rgba(255,214,120,0.5)', ease: 'power2.out' }, '-=0.08')
        .to('.decor-ceiling.c2', { duration: 0.32, filter: 'brightness(0.95)', boxShadow: 'inset 0 0 24px rgba(0,0,0,0.35), 0 0 0 rgba(255,208,90,0)',   ease: 'power1.inOut' })
        .to('.decor-ceiling.c3', { duration: 0.32, filter: 'brightness(1.35)', boxShadow: 'inset 0 0 24px rgba(0,0,0,0.25), 0 0 22px rgba(255,198,92,0.45)', ease: 'power2.out' }, '-=0.08')
        .to('.decor-ceiling.c3', { duration: 0.30, filter: 'brightness(0.95)', boxShadow: 'inset 0 0 24px rgba(0,0,0,0.35), 0 0 0 rgba(255,208,90,0)',   ease: 'power1.inOut' })
        .to('.decor-stage-name', { duration: 0.28, textShadow: '0 2px 8px rgba(0,0,0,0.6), 0 0 16px rgba(255,226,160,0.35)', ease: 'sine.inOut', yoyo: true, repeat: 1 }, '-=0.12');

// ── LUCES DEL ESCENARIO ─────────────────────────────────────────────
      const beamColors = ['#ff2255','#2255ff','#00ffbb','#ffcc00','#cc22ff','#ff6600','#00ccff','#ff2299'];

      BEAM_DATA.forEach(({ id }, i) => {
        const beam = `.beam-${id}`;

        // Oscilación lateral del cono (skewX)
        gsap.to(beam, {
          skewX: gsap.utils.random(-20, 20),
          duration: gsap.utils.random(1.6, 3.4),
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.21,
        });

        // Pulso de opacidad del cono
        gsap.to(beam, {
          opacity: gsap.utils.random(0.05, 0.22),
          duration: gsap.utils.random(0.8, 2.0),
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.14,
        });

        // Parpadeo del núcleo de la lámpara
        gsap.to(`#${id} circle`, {
          opacity: gsap.utils.random(0.25, 1),
          duration: gsap.utils.random(0.35, 1.1),
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.17,
          stagger: 0.05,
        });
      });

      // Color cycling del ambient glow del escenario
      let ambientColorIdx = 0;
      const cycleAmbient = () => {
        ambientColorIdx = (ambientColorIdx + 1) % beamColors.length;
        gsap.to('.stage-ambient', {
          duration: 1.8,
          ease: 'sine.inOut',
          opacity: gsap.utils.random(0.4, 0.9),
          onComplete: () => gsap.delayedCall(gsap.utils.random(0.6, 1.4), cycleAmbient),
        });
        // Cambiar color del floor glow también
        gsap.to('.stage-floor-glow', {
          opacity: gsap.utils.random(0.3, 0.8),
          duration: 1.4,
          ease: 'sine.inOut',
        });
      };
      gsap.delayedCall(0.5, cycleAmbient);

      // Strobe flash — dispara cada 5–10 segundos
      const strobeLoop = () => {
        const stl = gsap.timeline({
          onComplete: () => gsap.delayedCall(gsap.utils.random(5, 10), strobeLoop),
        });
        // 2-3 destellos rápidos consecutivos
        const flashes = Math.random() > 0.5 ? 3 : 2;
        for (let f = 0; f < flashes; f++) {
          stl.to('.strobe-flash', { opacity: gsap.utils.random(0.4, 0.7), duration: 0.035, ease: 'none' })
             .to('.strobe-flash', { opacity: 0, duration: 0.07, ease: 'none' });
        }
      };
      gsap.delayedCall(3, strobeLoop);
      
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleSeatClick = (id: string) => {
    if (reserved.has(id)) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const confirmReservation = () => {
    if (!nombre.trim() || !telefono.trim()) {
      alert('Por favor completa tu nombre y telefono.');
      return;
    }
    if (selected.size === 0) {
      alert('Selecciona al menos un espacio.');
      return;
    }

    let localTotal = 0;
    const espacios: string[] = [];
    selected.forEach((id) => {
      const seat = seatById.get(id);
      if (!seat) return;
      localTotal += seat.price;
      const visible = id.startsWith('GM') ? id.replace('GM', 'M') : id.replace('T', '');
      espacios.push(`${TYPE_LABELS[seat.typeIndex]} ${visible}`);
    });

    setModalDetails({ nombre, telefono, fecha, personas, espacios: espacios.join(', '), total: localTotal });
    setReserved((prev) => { const next = new Set(prev); selected.forEach((id) => next.add(id)); return next; });
    setSelected(new Set());
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="app" ref={rootRef}>
        <header>
          <div className="logo-tag">Reservas Exclusivas</div>
          <NewMarbellaLogo />
          <div className="subtitle">Selecciona tu espacio - Vive la experiencia</div>
        </header>

        <div className="legend">
          <div className="legend-item"><div className="lb lb-vip"  /> VIP Lounge</div>
          <div className="legend-item"><div className="lb lb-lounge" /> Lounge</div>
          <div className="legend-item"><div className="lb lb-mesa"  /> Mesa</div>
          <div className="legend-item"><div className="lb lb-m"     /> Mesa M</div>
          <div className="legend-item"><div className="lb lb-sel"   /> Seleccionado</div>
        </div>

        <div className="main">
          <div className="map-section">
            <div className="map-viewport">
              <div className="map-scale">
                <div className="map">
                  <div className="map-decor" aria-hidden="true">
                    <div className="decor-top-zone" />
                    <div className="decor-ceiling c1" />
                    <div className="decor-ceiling c2" />
                    <div className="decor-ceiling c3" />
                    <div className="decor-stage" />

                    <StageLightsOverlay />

                    <div className="decor-stage-name">MARBELLA</div>
                    <div className="decor-truss" />
                    <div className="decor-speaker sp-left" />
                    <div className="decor-speaker sp-right" />
                    <div className="decor-booth">MARBELLA DJ BOOTH</div>

                    <div className="decor-bar-red">
                      <span className="decor-bar-red-label">BARRA</span>
                    </div>
                    <div className="decor-bar-table">
                      <div className="bulb" /><div className="bulb" /><div className="bulb" />
                      <div className="bulb" /><div className="bulb" />
                      <span className="decor-bar-title">BARRA</span>
                    </div>
                    <div className="decor-bar-console" />

                    <div className="decor-hall">
                      <div className="decor-logo">MARBELLA</div>
                      <div className="decor-logo-sub">LET'S PARTY</div>
                    </div>

                    <div className="decor-room room-a" />
                    <div className="decor-room room-b" />
                  </div>

                  {SEATS.map((seat) => (
                    <button
                      key={seat.id}
                      type="button"
                      className={`sg ${selected.has(seat.id) ? 'on' : ''} ${reserved.has(seat.id) ? 'off' : ''}`}
                      style={{
                        left:   `${seat.left + (MOVE_X_120_IDS.has(seat.id) ? 120 : 0)}px`,
                        top:    `${seat.top}px`,
                        width:  `${seat.width}px`,
                        height: `${seat.height}px`,
                      }}
                      onClick={() => handleSeatClick(seat.id)}
                    >
                      <SeatSymbol symbol={seat.symbol} width={seat.width} height={seat.height} />
                      <div className={`sl ${seat.darkLabel ? 'dark' : ''}`} style={LABEL_STYLES[seat.labelStyle]}>
                        {seat.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-title">Tu Reserva</div>

            <div className="fg">
              <label>Nombre completo</label>
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Carlos Ramirez" />
            </div>
            <div className="fg">
              <label>Telefono</label>
              <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="+591 70000000" />
            </div>
            <div className="fg">
              <label>Fecha</label>
              <input type="date" value={fecha} min={new Date().toISOString().split('T')[0]} onChange={(e) => setFecha(e.target.value)} />
            </div>
            <div className="fg">
              <label>Numero de personas</label>
              <select value={personas} onChange={(e) => setPersonas(e.target.value)}>
                <option>1 persona</option>
                <option>2 personas</option>
                <option>3 personas</option>
                <option>4 personas</option>
                <option>5 personas</option>
                <option>6+ personas</option>
              </select>
            </div>

            <div className="fg">
              <label>Espacios seleccionados</label>
              <div className="sel-box">
                {selectedArray.length === 0 ? (
                  <span className="no-sel">Haz clic en el mapa para seleccionar</span>
                ) : (
                  selectedArray.map((id) => {
                    const seat = seatById.get(id);
                    if (!seat) return null;
                    const visible = id.startsWith('GM') ? id.replace('GM', 'M') : id.replace('T', '');
                    return (
                      <span className="tag" key={id}>
                        {TYPE_LABELS[seat.typeIndex].split(' ')[0]} {visible}
                      </span>
                    );
                  })
                )}
              </div>
            </div>

            <div className="price-row">
              <span className="price-lbl">Total estimado</span>
              <span className="price-val">Bs. {total}</span>
            </div>

            <button className="btn" disabled={selectedArray.length === 0} onClick={confirmReservation}>
              CONFIRMAR RESERVA
            </button>

            <div className="info-box">
              <strong>VIP Lounge</strong> - Bs. 150 - Consumo min. incluido<br />
              <strong>Lounge</strong>     - Bs. 80  - Sofa privado<br />
              <strong>Mesa</strong>       - Bs. 35-40 - Mesa estandar<br />
              <strong>Mesa M</strong>     - Bs. 100 - Mesa premium
            </div>
          </div>
        </div>
      </div>

      {/* ── MODAL ─────────────────────────────────────────────────────────── */}
      <div
        className={`overlay ${isModalOpen ? 'active' : ''}`}
        onClick={(e: MouseEvent<HTMLDivElement>) => e.target === e.currentTarget && setIsModalOpen(false)}
      >
        <div className="modal">
          <div className="modal-icon">Reserva</div>
          <h2>Reserva Enviada</h2>
          <p>Tu solicitud fue registrada. Te contactaremos pronto para confirmar.</p>
          <div className="modal-det">
            <div><strong>Nombre:</strong>  <span>{modalDetails?.nombre   ?? '-'}</span></div>
            <div><strong>Telefono:</strong> <span>{modalDetails?.telefono ?? '-'}</span></div>
            <div><strong>Fecha:</strong>    <span>{modalDetails?.fecha    ?? '-'}</span></div>
            <div><strong>Personas:</strong> <span>{modalDetails?.personas ?? '-'}</span></div>
            <div><strong>Espacios:</strong> <span style={{ fontSize: '9px' }}>{modalDetails?.espacios ?? '-'}</span></div>
            <div><strong>Total:</strong>    <span>Bs. {modalDetails?.total ?? 0}</span></div>
          </div>
          <button className="btn-ok" onClick={() => setIsModalOpen(false)}>ACEPTAR</button>
        </div>
      </div>
    </>
  );
}
