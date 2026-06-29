import React, { useState, useEffect, useRef } from 'react';

const imagesList = [
    '/WhatsApp Image 2026-06-28 at 7.01.24 PM.jpeg',
    '/WhatsApp Image 2026-06-28 at 7.01.25 PM.jpeg',
    '/WhatsApp Image 2026-06-28 at 7.01.27 PM.jpeg',
    '/WhatsApp Image 2026-06-28 at 7.01.29 PM.jpeg',
    '/WhatsApp Image 2026-06-28 at 7.01.33 PM.jpeg',
    '/WhatsApp Image 2026-06-28 at 7.01.34 PM.jpeg',
    '/WhatsApp Image 2026-06-28 at 7.01.35 PM.jpeg',
    '/WhatsApp Image 2026-06-28 at 7.17.04 PM.jpeg',
    '/WhatsApp Image 2026-06-28 at 7.18.36 PM.jpeg',
    '/WhatsApp Image 2026-06-28 at 7.18.37 PM.jpeg',
    '/WhatsApp Image 2026-06-28 at 7.18.38 PM.jpeg'
];

const U = 320; // Unit size in pixels - Large so user is "close" and pictures are clear
const PATTERN_SIZE = 6; // The base pattern is a 6x6 square of units
const REPEAT_X = 4; // Repeat pattern 4 times horizontally
const REPEAT_Y = 4; // Repeat pattern 4 times vertically

const GRID_W = PATTERN_SIZE * REPEAT_X * U;
const GRID_H = PATTERN_SIZE * REPEAT_Y * U;

// A 14-piece puzzle that perfectly fills a 6x6 grid
const basePattern = [
    { x: 0, y: 0, w: 2, h: 2 },
    { x: 2, y: 0, w: 1, h: 2 },
    { x: 3, y: 0, w: 3, h: 1 },
    { x: 3, y: 1, w: 1, h: 1 },
    { x: 4, y: 1, w: 2, h: 1 },
    { x: 0, y: 2, w: 1, h: 3 },
    { x: 1, y: 2, w: 2, h: 1 },
    { x: 3, y: 2, w: 3, h: 3 }, // Massive 3x3 block
    { x: 1, y: 3, w: 1, h: 2 },
    { x: 2, y: 3, w: 1, h: 1 },
    { x: 2, y: 4, w: 1, h: 1 },
    { x: 0, y: 5, w: 3, h: 1 },
    { x: 3, y: 5, w: 1, h: 1 },
    { x: 4, y: 5, w: 2, h: 1 },
];

function wrap(val, max) {
    return ((val + max / 2) % max + max) % max - max / 2;
}

const GalleryPage = () => {
    const [nodes, setNodes] = useState([]);
    const [camera, setCamera] = useState({ x: 0, y: 0 });
    const isDragging = useRef(false);
    const lastMouse = useRef({ x: 0, y: 0 });
    const velocity = useRef({ x: 0, y: 0 });
    const requestRef = useRef(null);
    const cameraRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const newNodes = [];
        let imgIdx = 0;

        for (let rx = 0; rx < REPEAT_X; rx++) {
            for (let ry = 0; ry < REPEAT_Y; ry++) {
                basePattern.forEach((rect, idx) => {
                    // Top-left coordinate of the rectangle
                    const startX = (rx * PATTERN_SIZE + rect.x) * U - GRID_W / 2;
                    const startY = (ry * PATTERN_SIZE + rect.y) * U - GRID_H / 2;

                    const image = imagesList[imgIdx % imagesList.length];
                    imgIdx++;

                    newNodes.push({
                        startX,
                        startY,
                        w: rect.w * U,
                        h: rect.h * U,
                        image,
                        id: `${rx}-${ry}-${idx}`
                    });
                });
            }
        }
        setNodes(newNodes);

        // Animation loop for inertia
        const animate = () => {
            if (!isDragging.current) {
                // Apply friction
                velocity.current.x *= 0.92;
                velocity.current.y *= 0.92;

                // Stop completely if very slow
                if (Math.abs(velocity.current.x) < 0.1) velocity.current.x = 0;
                if (Math.abs(velocity.current.y) < 0.1) velocity.current.y = 0;

                cameraRef.current.x -= velocity.current.x;
                cameraRef.current.y -= velocity.current.y;

                setCamera({ x: cameraRef.current.x, y: cameraRef.current.y });
            }
            requestRef.current = requestAnimationFrame(animate);
        };
        requestRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    const handlePointerDown = (e) => {
        isDragging.current = true;
        lastMouse.current = { x: e.clientX, y: e.clientY };
        velocity.current = { x: 0, y: 0 };
    };

    const handlePointerMove = (e) => {
        if (!isDragging.current) return;
        const dx = e.clientX - lastMouse.current.x;
        const dy = e.clientY - lastMouse.current.y;

        velocity.current = { x: dx, y: dy };

        // Move camera in opposite direction of drag
        cameraRef.current.x -= dx;
        cameraRef.current.y -= dy;

        setCamera({ x: cameraRef.current.x, y: cameraRef.current.y });
        lastMouse.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
        isDragging.current = false;
    };

    return (
        <div
            className="fixed inset-0 bg-slate-950 overflow-hidden cursor-grab active:cursor-grabbing z-0"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            style={{ touchAction: 'none' }}
        >
            <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 text-white/50 text-sm tracking-widest uppercase pointer-events-none bg-slate-900/50 px-4 py-2 rounded-full backdrop-blur-md">
                Drag to explore gallery
            </div>

            {/* Flat Infinite Interlocking Masonry Viewport */}
            <div className="absolute top-1/2 left-1/2 pointer-events-none">
                {nodes.map((node) => {
                    // Calculate wrapped position relative to camera
                    const screenX = wrap(node.startX - camera.x, GRID_W);
                    const screenY = wrap(node.startY - camera.y, GRID_H);

                    // Skip rendering if it is way off screen to save GPU/CPU
                    // Screen is at most ~2500px wide, so if it's > 2500 away, don't render it.
                    // But we rely on the DOM for transitions, so we render them all.
                    // 14 * 16 = 224 nodes is perfectly fine for modern browsers.

                    return (
                        <div
                            key={node.id}
                            className="absolute pointer-events-auto"
                            style={{
                                transform: `translate(${screenX}px, ${screenY}px)`,
                                width: node.w,
                                height: node.h,
                                padding: '6px' // Creates the perfect gap between interlocking rectangles
                            }}
                        >
                            <div className="w-full h-full rounded-xl overflow-hidden bg-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-slate-700/50 hover:border-blue-400 group relative">
                                <img
                                    src={node.image}
                                    alt="Gallery"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    draggable="false"
                                />
                                <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition-colors duration-500 pointer-events-none"></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GalleryPage;
