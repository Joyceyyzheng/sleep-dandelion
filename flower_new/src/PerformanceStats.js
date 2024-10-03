import React, { useEffect, useRef } from 'react';
import Stats from 'stats.js';

function PerformanceStats() {
    const statsRef = useRef(null);

    useEffect(() => {
        const stats = new Stats();
        stats.showPanel(1); // Change to 0 for FPS, 1 for ms, 2 for memory, etc.
        statsRef.current.appendChild(stats.dom);

        const animate = () => {
            stats.begin();
            // monitored code goes here
            stats.end();
            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);

        // Cleanup function to remove stats when component unmounts
        return () => {
            if (statsRef.current && stats.dom) {
                statsRef.current.removeChild(stats.dom);
            }
            cancelAnimationFrame(animate); // You might need to adjust this part
        };
    }, []);

    return <div ref={statsRef} />;
}

export default PerformanceStats;
