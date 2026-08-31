'use client';
import { useEffect, useRef } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import '@photo-sphere-viewer/core/index.css';

const Panorama360 = () => {
    const containerRef = useRef(null);
    const viewerInstanceRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        viewerInstanceRef.current = new Viewer({
            container: containerRef.current,
            panorama: 'https://admin.yaduvanshigroup.edu.in/uploads/branches/35/360-image/Room-1.jpg',
            caption: '360° View',
            loadingImg: 'https://photo-sphere-viewer-data.netlify.app/assets/photosphere-logo.gif',
            touchmoveTwoFingers: false,
            mousewheelCtrlKey: false,
            defaultZoomLvl: 50,
            navbar: [
                'autorotate',
                'zoom',
                'move',
                'pipe',
                'caption',
                'spacer',
                'fullscreen',
            ]
        });

        return () => {
            if (viewerInstanceRef.current) {
                viewerInstanceRef.current.destroy();
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{ width: '100%', height: '500px', borderRadius: '8px', overflow: 'hidden' }}
        />
    );
};

export default Panorama360;