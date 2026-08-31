"use client";

import { useEffect, useRef } from "react";
import { Viewer, utils } from "@photo-sphere-viewer/core";
import { AutorotatePlugin } from "@photo-sphere-viewer/autorotate-plugin";
import { RotateCcw } from "lucide-react";
import ReactDOMServer from "react-dom/server";
import "@photo-sphere-viewer/core/index.css";

const PanoramaIntro = () => {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const baseUrl = "https://photo-sphere-viewer-data.netlify.app/assets/";

    const animatedValues = {
      pitch: { start: -Math.PI / 2, end: 0 },
      yaw: { start: Math.PI / 2, end: 0 },
      zoom: { start: 0, end: 50 },
      maxFov: { start: 130, end: 90 },
      fisheye: { start: 2, end: 0 },
    };

    let isInit = true;

    const resetIconSvg = ReactDOMServer.renderToString(
      <RotateCcw size={18} />
    );

    const viewer = new Viewer({
      container: containerRef.current,
      panorama: "https://admin.yaduvanshigroup.edu.in/uploads/branches/35/360-image/Room-1.jpg",
      caption: "Parc national du Mercantour <b>&copy; Damien Sorel</b>",
      defaultPitch: animatedValues.pitch.start,
      defaultYaw: animatedValues.yaw.start,
      defaultZoomLvl: animatedValues.zoom.start,
      maxFov: animatedValues.maxFov.start,
      fisheye: animatedValues.fisheye.start,
      mousemove: false,
      mousewheel: false,
      navbar: [
        "autorotate",
        "zoom",
        {
          id: "rerun-animation",
          title: "Rerun animation",
          content: resetIconSvg,
          onClick: () => reset(),
        },
        "caption",
        "fullscreen",
      ],
      plugins: [
        [
          AutorotatePlugin,
          {
            autostartDelay: null,
            autostartOnIdle: false,
            autorotatePitch: 0,
          },
        ],
      ],
    });

    viewerRef.current = viewer;
    const autorotate = viewer.getPlugin(AutorotatePlugin);

    function intro(pitch, yaw) {
      isInit = false;
      autorotate?.stop();
      viewer.navbar.hide();

      new utils.Animation({
        properties: {
          ...animatedValues,
          pitch: { start: animatedValues.pitch.start, end: pitch },
          yaw: { start: animatedValues.yaw.start, end: yaw },
        },
        duration: 2500,
        easing: "inOutQuad",
        onTick: (properties) => {
          viewer.setOptions({
            fisheye: properties.fisheye,
            maxFov: properties.maxFov,
          });
          viewer.rotate({ yaw: properties.yaw, pitch: properties.pitch });
          viewer.zoom(properties.zoom);
        },
      }).then(() => {
        autorotate?.start();
        viewer.navbar.show();
        viewer.setOptions({
          mousemove: true,
          mousewheel: true,
        });
      });
    }

    function reset() {
      isInit = true;
      autorotate?.stop();
      viewer.navbar.hide();
      viewer.setOptions({
        mousemove: false,
        mousewheel: false,
      });

      new utils.Animation({
        properties: {
          pitch: {
            start: viewer.getPosition().pitch,
            end: animatedValues.pitch.start,
          },
          yaw: {
            start: viewer.getPosition().yaw,
            end: animatedValues.yaw.start,
          },
          zoom: {
            start: viewer.getZoomLevel(),
            end: animatedValues.zoom.start,
          },
          maxFov: {
            start: animatedValues.maxFov.end,
            end: animatedValues.maxFov.start,
          },
          fisheye: {
            start: animatedValues.fisheye.end,
            end: animatedValues.fisheye.start,
          },
        },
        duration: 1500,
        easing: "inOutQuad",
        onTick: (properties) => {
          viewer.setOptions({
            fisheye: properties.fisheye,
            maxFov: properties.maxFov,
          });
          viewer.rotate({ yaw: properties.yaw, pitch: properties.pitch });
          viewer.zoom(properties.zoom);
        },
      });
    }

    const handleReady = () => {
      viewer.navbar.hide();
      setTimeout(() => {
        if (isInit) {
          intro(animatedValues.pitch.end, animatedValues.pitch.end);
        }
      }, 5000);
    };

    const handleClick = ({ data }) => {
      if (isInit) {
        intro(data.pitch, data.yaw);
      }
    };

    viewer.addEventListener("ready", handleReady, { once: true });
    viewer.addEventListener("click", handleClick);

    return () => {
      viewer.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "500px", overflow: "hidden" }}
    />
  );
};

export default PanoramaIntro;