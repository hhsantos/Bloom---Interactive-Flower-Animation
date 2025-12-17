import React from 'react';
import { motion, Variants } from 'framer-motion';

interface FlowerSceneProps {
  state: 'idle' | 'blooming' | 'resetting';
}

const FlowerScene: React.FC<FlowerSceneProps> = ({ state }) => {
  const isBlooming = state === 'blooming';

  // --- Animation Variants ---

  const stemVariants: Variants = {
    idle: { pathLength: 0, opacity: 0 },
    blooming: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut" } 
    },
    resetting: { 
      pathLength: 0, 
      opacity: 0,
      transition: { duration: 0.5 } 
    }
  };

  const leafLeftVariants: Variants = {
    idle: { scale: 0, rotate: -45, opacity: 0 },
    blooming: { 
      scale: 1, 
      rotate: 0, 
      opacity: 1,
      transition: { delay: 1.0, duration: 0.8, type: "spring", bounce: 0.4 } 
    },
    resetting: { scale: 0, opacity: 0, transition: { duration: 0.3 } }
  };

  const leafRightVariants: Variants = {
    idle: { scale: 0, rotate: 45, opacity: 0 },
    blooming: { 
      scale: 1, 
      rotate: 0, 
      opacity: 1,
      transition: { delay: 1.2, duration: 0.8, type: "spring", bounce: 0.4 } 
    },
    resetting: { scale: 0, opacity: 0, transition: { duration: 0.3 } }
  };

  const flowerHeadVariants: Variants = {
    idle: { scale: 0, opacity: 0 },
    blooming: { 
      scale: 1, 
      opacity: 1,
      transition: { delay: 1.8, duration: 0.5, when: "beforeChildren", staggerChildren: 0.1 } 
    },
    resetting: { scale: 0, opacity: 0, transition: { duration: 0.3 } }
  };

  const petalVariants: Variants = {
    idle: { scale: 0, opacity: 0 },
    blooming: { 
      scale: 1, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 100 } 
    },
    resetting: { scale: 0, opacity: 0 }
  };

  const centerVariants: Variants = {
    idle: { scale: 0 },
    blooming: { 
      scale: 1,
      transition: { delay: 2.5, type: "spring" }
    },
    resetting: { scale: 0 }
  };

  return (
    <div className="relative w-full max-w-[400px] aspect-[2/3] flex items-end justify-center">
      <svg 
        viewBox="0 0 400 600" 
        className="w-full h-full drop-shadow-2xl overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="potGradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#D87A54" />
            <stop offset="50%" stopColor="#E59878" />
            <stop offset="100%" stopColor="#BF5E39" />
          </linearGradient>
        </defs>

        {/* --- Pot (Back Layer) --- */}
        <g transform="translate(200, 500)">
          {/* Pot Shadow */}
          <ellipse cx="0" cy="85" rx="100" ry="15" fill="black" opacity="0.2" />
          
          {/* Pot Body */}
          <path 
            d="M -60 80 L -75 0 L 75 0 L 60 80 Z" 
            fill="url(#potGradient)" 
            stroke="#5D4037" 
            strokeWidth="2"
          />
          {/* Pot Rim (Back) */}
          <path 
            d="M -80 0 L 80 0 L 75 15 L -75 15 Z" 
            fill="#A64D2B" 
          />
        </g>

        {/* --- Plant --- */}
        <g>
          {/* Stem */}
          <motion.path
            d="M 200 500 Q 200 400 200 350 C 200 300 210 280 200 200"
            fill="transparent"
            stroke="#4CAF50"
            strokeWidth="12"
            strokeLinecap="round"
            initial="idle"
            animate={isBlooming ? "blooming" : "resetting"}
            variants={stemVariants}
          />

          {/* Leaves */}
          <g transform="translate(200, 350)">
            {/* Left Leaf */}
            <motion.path
              d="M 0 0 Q -40 -10 -60 -40 Q -20 -40 0 0"
              fill="#388E3C"
              stroke="#2E7D32"
              strokeWidth="1"
              initial="idle"
              animate={isBlooming ? "blooming" : "resetting"}
              variants={leafLeftVariants}
              style={{ originX: 0, originY: 1 }}
            />
            {/* Right Leaf */}
            <motion.path
              d="M 0 20 Q 40 10 60 -20 Q 20 -20 0 20"
              fill="#388E3C"
              stroke="#2E7D32"
              strokeWidth="1"
              initial="idle"
              animate={isBlooming ? "blooming" : "resetting"}
              variants={leafRightVariants}
              style={{ originX: 0, originY: 1 }}
            />
          </g>

          {/* Flower Head */}
          {/* We wrap the motion group in a static group to handle positioning (translation).
              This prevents Framer Motion's 'transform' style (used for scale) from overriding the SVG 'transform' attribute. */}
          <g transform="translate(200, 200)">
            <motion.g
              initial="idle"
              animate={isBlooming ? "blooming" : "resetting"}
              variants={flowerHeadVariants}
            >
              {/* Petals - Generated in a loop for rotational symmetry */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
                <g key={index} transform={`rotate(${angle})`}>
                  <motion.ellipse 
                    cx="0" 
                    cy="-50" 
                    rx="20" 
                    ry="50" 
                    fill={index % 2 === 0 ? "#F06292" : "#EC407A"}
                    stroke="#C2185B"
                    strokeWidth="0.5"
                    variants={petalVariants}
                  />
                </g>
              ))}

              {/* Inner Petals (Smaller layer for depth) */}
              {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, index) => (
                <g key={`inner-${index}`} transform={`rotate(${angle})`}>
                  <motion.ellipse 
                    cx="0" 
                    cy="-30" 
                    rx="15" 
                    ry="30" 
                    fill="#F48FB1"
                    stroke="#C2185B"
                    strokeWidth="0.5"
                    variants={petalVariants}
                  />
                </g>
              ))}

              {/* Flower Center */}
              <motion.circle 
                cx="0" 
                cy="0" 
                r="25" 
                fill="#FFEB3B" 
                stroke="#FBC02D"
                strokeWidth="2"
                variants={centerVariants}
              />
              {/* Center Details */}
              <motion.circle 
                cx="0" 
                cy="0" 
                r="20" 
                fill="#FBC02D"
                fillOpacity="0.5"
                variants={centerVariants}
              />
            </motion.g>
          </g>
        </g>

        {/* --- Pot (Front Rim Layer for depth) --- */}
        <g transform="translate(200, 500)">
           <path 
            d="M -80 0 L 80 0 L 80 15 L -80 15 Z" 
            fill="#D87A54"
            stroke="#BF5E39"
            strokeWidth="1"
          />
        </g>
      </svg>
    </div>
  );
};

export default FlowerScene;