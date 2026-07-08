import React, { useState, useEffect, useRef } from 'react';

export const imagesList = [
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
    const [camera, setCamera] = useState({ x: 0, y: 0, z: 1 });
    const [selectedImage, setSelectedImage] = useState(null);

    const isDragging = useRef(false);
    const activePointers = useRef(new Map());
    const initialPinchDist = useRef(null);
    const initialScale = useRef(1);
    const dragDistance = useRef(0);

    const lastMouse = useRef({ x: 0, y: 0 });
    const velocity = useRef({ x: 0, y: 0 });
    const requestRef = useRef(null);
    const cameraRef = useRef({ x: 0, y: 0, z: 1 });

    useEffect(() => {
        const newNodes = [];
        let imgIdx = 0;

        for (let rx = 0; rx < REPEAT_X; rx++) {
            for (let ry = 0; ry < REPEAT_Y; ry++) {
                basePattern.forEach((rect, idx) => {
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

        const animate = () => {
            if (!isDragging.current) {
                velocity.current.x *= 0.92;
                velocity.current.y *= 0.92;

                if (Math.abs(velocity.current.x) < 0.1) velocity.current.x = 0;
                if (Math.abs(velocity.current.y) < 0.1) velocity.current.y = 0;

                cameraRef.current.x -= velocity.current.x / cameraRef.current.z;
                cameraRef.current.y -= velocity.current.y / cameraRef.current.z;

                setCamera({ x: cameraRef.current.x, y: cameraRef.current.y, z: cameraRef.current.z });
            }
            requestRef.current = requestAnimationFrame(animate);
        };
        requestRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    const handlePointerDown = (e) => {
        activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

        if (activePointers.current.size === 1) {
            isDragging.current = true;
            dragDistance.current = 0;
            lastMouse.current = { x: e.clientX, y: e.clientY };
            velocity.current = { x: 0, y: 0 };
        } else if (activePointers.current.size === 2) {
            isDragging.current = false; // Disable pan while pinching
            const pts = Array.from(activePointers.current.values());
            initialPinchDist.current = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
            initialScale.current = cameraRef.current.z;
        }
    };

    const handlePointerMove = (e) => {
        if (!activePointers.current.has(e.pointerId)) return;
        activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

        if (activePointers.current.size === 1 && isDragging.current) {
            const dx = e.clientX - lastMouse.current.x;
            const dy = e.clientY - lastMouse.current.y;
            dragDistance.current += Math.hypot(dx, dy);

            velocity.current = { x: dx, y: dy };
            cameraRef.current.x -= dx / cameraRef.current.z;
            cameraRef.current.y -= dy / cameraRef.current.z;

            setCamera({ x: cameraRef.current.x, y: cameraRef.current.y, z: cameraRef.current.z });
            lastMouse.current = { x: e.clientX, y: e.clientY };
        } else if (activePointers.current.size === 2 && initialPinchDist.current) {
            const pts = Array.from(activePointers.current.values());
            const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
            const ratio = dist / initialPinchDist.current;

            let newZ = initialScale.current * ratio;
            newZ = Math.max(0.6, Math.min(newZ, 1.5)); // Zoom limits
            cameraRef.current.z = newZ;
            setCamera(prev => ({ ...prev, z: newZ }));
        }
    };

    const handlePointerUp = (e) => {
        activePointers.current.delete(e.pointerId);

        if (activePointers.current.size < 2) {
            initialPinchDist.current = null;
        }

        if (activePointers.current.size === 1) {
            const remaining = Array.from(activePointers.current.values())[0];
            lastMouse.current = { x: remaining.x, y: remaining.y };
            isDragging.current = true;
        } else if (activePointers.current.size === 0) {
            isDragging.current = false;
        }
    };

    const handleWheel = (e) => {
        let newZ = cameraRef.current.z - e.deltaY * 0.0015;
        newZ = Math.max(0.6, Math.min(newZ, 1.5));
        cameraRef.current.z = newZ;
        setCamera(prev => ({ ...prev, z: newZ }));
    };

    const handleImageClick = (e, image) => {
        // Only open modal if the user didn't drag the grid
        if (dragDistance.current < 5) {
            setSelectedImage(image);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-slate-950 overflow-hidden cursor-grab active:cursor-grabbing z-0"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onWheel={handleWheel}
            style={{ touchAction: 'none' }}
        >
            <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 text-white/50 text-sm tracking-widest uppercase pointer-events-none bg-slate-900/50 px-4 py-2 rounded-full backdrop-blur-md">
                Drag or pinch to explore
            </div>

            {/* Flat Infinite Interlocking Masonry Viewport */}
            <div 
                className="absolute top-1/2 left-1/2 pointer-events-none"
                style={{ transform: `scale(${camera.z})` }}
            >
                {nodes.map((node) => {
                    const screenX = wrap(node.startX - camera.x, GRID_W);
                    const screenY = wrap(node.startY - camera.y, GRID_H);

                    return (
                        <div
                            key={node.id}
                            className="absolute pointer-events-auto"
                            style={{
                                transform: `translate(${screenX}px, ${screenY}px)`,
                                width: node.w,
                                height: node.h,
                                padding: '6px'
                            }}
                            onClick={(e) => handleImageClick(e, node.image)}
                        >
                            <div className="w-full h-full rounded-xl overflow-hidden bg-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-slate-700/50 hover:border-blue-400 group relative">
                                <img
                                    src={node.image}
                                    alt="Gallery"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                                    draggable="false"
                                />
                                <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition-colors duration-500 pointer-events-none"></div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal Overlay for viewing a single image */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 p-4 cursor-pointer backdrop-blur-md"
                    onClick={() => setSelectedImage(null)}
                    onPointerDown={(e) => e.stopPropagation()} // Prevent interacting with the background grid
                    onWheel={(e) => e.stopPropagation()}
                >
                    <img 
                        src={selectedImage} 
                        className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
                        alt="Expanded view" 
                        draggable="false"
                    />
                    <button 
                        className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-colors"
                        onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default GalleryPage;
