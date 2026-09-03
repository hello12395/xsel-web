"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

type LandGeometry =
  | { type: "Polygon"; coordinates: number[][][] }
  | { type: "MultiPolygon"; coordinates: number[][][][] };

type LandFeature = {
  type: "Feature";
  geometry: LandGeometry;
  properties?: Record<string, unknown>;
};

type LandCollection = {
  type: "FeatureCollection";
  features: LandFeature[];
};

type DotData = {
  lng: number;
  lat: number;
};

type RotatingEarthProps = {
  width?: number;
  height?: number;
  className?: string;
  marker?: { lat: number; lng: number };
  autoRotate?: boolean;
  onGlobeClick?: () => void;
};

function pointInPolygon(point: [number, number], polygon: number[][]): boolean {
  const [x, y] = point;
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];

    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }

  return inside;
}

function pointInFeature(point: [number, number], feature: LandFeature): boolean {
  const geometry = feature.geometry;

  if (geometry.type === "Polygon") {
    const coordinates = geometry.coordinates;
    if (!pointInPolygon(point, coordinates[0])) return false;
    for (let i = 1; i < coordinates.length; i++) {
      if (pointInPolygon(point, coordinates[i])) return false;
    }
    return true;
  }

  if (geometry.type === "MultiPolygon") {
    for (const polygon of geometry.coordinates) {
      if (pointInPolygon(point, polygon[0])) {
        let inHole = false;
        for (let i = 1; i < polygon.length; i++) {
          if (pointInPolygon(point, polygon[i])) {
            inHole = true;
            break;
          }
        }
        if (!inHole) return true;
      }
    }
  }

  return false;
}

function generateDotsInPolygon(feature: LandFeature, dotSpacing = 16) {
  const dots: [number, number][] = [];
  const bounds = d3.geoBounds(feature as d3.GeoPermissibleObjects);
  const [[minLng, minLat], [maxLng, maxLat]] = bounds;
  const stepSize = dotSpacing * 0.08;

  for (let lng = minLng; lng <= maxLng; lng += stepSize) {
    for (let lat = minLat; lat <= maxLat; lat += stepSize) {
      const point: [number, number] = [lng, lat];
      if (pointInFeature(point, feature)) dots.push(point);
    }
  }

  return dots;
}

const PIN_PATH =
  "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z";
const PIN_TIP_X = 12;
const PIN_TIP_Y = 22;

function drawLocationMarker(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  centerX: number,
  centerY: number,
  scaleFactor: number,
) {
  const dx = x - centerX;
  const dy = y - centerY;
  const length = Math.hypot(dx, dy) || 1;
  const outwardX = dx / length;
  const outwardY = dy / length;
  const angle = Math.atan2(outwardY, outwardX) + Math.PI / 2;
  const pinScale = 1.55 * scaleFactor;

  context.save();
  context.translate(x, y);
  context.rotate(angle);
  context.scale(pinScale, pinScale);
  context.translate(-PIN_TIP_X, -PIN_TIP_Y);

  context.shadowColor = "rgba(0, 0, 0, 0.4)";
  context.shadowBlur = 4;
  context.shadowOffsetY = 2;

  const pin = new Path2D(PIN_PATH);
  const gradient = context.createLinearGradient(6, 2, 18, 22);
  gradient.addColorStop(0, "#ff5a5a");
  gradient.addColorStop(0.55, "#ef2b2b");
  gradient.addColorStop(1, "#c41a1a");
  context.fillStyle = gradient;
  context.fill(pin);

  context.shadowColor = "transparent";
  context.shadowBlur = 0;
  context.shadowOffsetY = 0;
  context.strokeStyle = "#8f1414";
  context.lineWidth = 0.75;
  context.stroke(pin);

  context.beginPath();
  context.arc(12, 9, 2.35, 0, Math.PI * 2);
  context.fillStyle = "#fff";
  context.fill();

  context.beginPath();
  context.arc(11.1, 8.1, 0.75, 0, Math.PI * 2);
  context.fillStyle = "rgba(255, 255, 255, 0.55)";
  context.fill();

  context.restore();
}

export function RotatingEarth({
  width = 360,
  height = 360,
  className = "",
  marker,
  autoRotate = true,
  onGlobeClick,
}: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onGlobeClickRef = useRef(onGlobeClick);
  const autoRotateRef = useRef(autoRotate);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    onGlobeClickRef.current = onGlobeClick;
  }, [onGlobeClick]);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const containerWidth = width;
    const containerHeight = height;
    const radius = Math.min(containerWidth, containerHeight) / 2.35;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    context.scale(dpr, dpr);

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection).context(context);

    const allDots: DotData[] = [];
    let landFeatures: LandCollection | null = null;

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight);

      const currentScale = projection.scale();
      const scaleFactor = currentScale / radius;

      context.beginPath();
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI);
      context.fillStyle = "#050814";
      context.fill();
      context.strokeStyle = "rgba(55, 204, 248, 0.45)";
      context.lineWidth = 2 * scaleFactor;
      context.stroke();

      if (landFeatures) {
        const graticule = d3.geoGraticule();
        context.beginPath();
        path(graticule());
        context.strokeStyle = "rgba(255, 255, 255, 0.18)";
        context.lineWidth = 0.8 * scaleFactor;
        context.stroke();

        context.beginPath();
        landFeatures.features.forEach((feature) => {
          path(feature as d3.GeoPermissibleObjects);
        });
        context.strokeStyle = "rgba(255, 255, 255, 0.55)";
        context.lineWidth = 0.9 * scaleFactor;
        context.stroke();

        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat]);
          if (!projected) return;
          const [x, y] = projected;
          if (x < 0 || x > containerWidth || y < 0 || y > containerHeight) return;

          context.beginPath();
          context.arc(x, y, 1.15 * scaleFactor, 0, 2 * Math.PI);
          context.fillStyle = "rgba(180, 198, 220, 0.85)";
          context.fill();
        });
      }

      if (marker) {
        const projected = projection([marker.lng, marker.lat]);
        if (projected) {
          const [x, y] = projected;
          const centerX = containerWidth / 2;
          const centerY = containerHeight / 2;
          const visible =
            (x - centerX) ** 2 + (y - centerY) ** 2 <= (currentScale - 4 * scaleFactor) ** 2;

          if (visible) {
            drawLocationMarker(
              context,
              x,
              y,
              centerX,
              centerY,
              scaleFactor,
            );
          }
        }
      }
    };

    const loadWorldData = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json",
        );
        if (!response.ok) throw new Error("Failed to load land data");

        landFeatures = (await response.json()) as LandCollection;

        landFeatures.features.forEach((feature) => {
          const dots = generateDotsInPolygon(feature, 16);
          dots.forEach(([lng, lat]) => {
            allDots.push({ lng, lat });
          });
        });

        if (marker) {
          projection.rotate([-marker.lng, -marker.lat, 0]);
        }

        render();
        setIsLoading(false);
      } catch {
        setError("Failed to load land map data");
        setIsLoading(false);
      }
    };

    const rotation: [number, number, number] = marker
      ? [-marker.lng, -marker.lat, 0]
      : [0, 0, 0];
    const rotationSpeed = 0.35;
    let interactionPaused = false;

    const rotate = () => {
      if (!autoRotateRef.current || interactionPaused) return;

      rotation[0] += rotationSpeed;
      projection.rotate(rotation);
      render();
    };

    const rotationTimer = d3.timer(rotate);

    let dragStartX = 0;
    let dragStartY = 0;
    let dragDistance = 0;

    const handleMouseDown = (event: MouseEvent) => {
      interactionPaused = true;
      dragDistance = 0;
      dragStartX = event.clientX;
      dragStartY = event.clientY;
      const startRotation: [number, number, number] = [...rotation];

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const sensitivity = 0.45;
        const dx = moveEvent.clientX - dragStartX;
        const dy = moveEvent.clientY - dragStartY;
        dragDistance = Math.hypot(dx, dy);

        rotation[0] = startRotation[0] + dx * sensitivity;
        rotation[1] = startRotation[1] - dy * sensitivity;
        rotation[1] = Math.max(-90, Math.min(90, rotation[1]));

        projection.rotate(rotation);
        render();
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);

        if (dragDistance < 6 && onGlobeClickRef.current) {
          interactionPaused = false;
          onGlobeClickRef.current();
          return;
        }

        window.setTimeout(() => {
          interactionPaused = false;
        }, 1200);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    canvas.addEventListener("mousedown", handleMouseDown);

    loadWorldData();

    return () => {
      rotationTimer.stop();
      canvas.removeEventListener("mousedown", handleMouseDown);
    };
  }, [width, height, marker]);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] p-8 ${className}`}
      >
        <p className="text-center text-sm text-white/55">{error}</p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className={`block cursor-grab rounded-full active:cursor-grabbing ${isLoading ? "opacity-0" : "opacity-100"}`}
        style={{ width, height }}
        aria-label="Rotating globe. Drag to spin, click for satellite map."
      />
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-gold-soft" />
        </div>
      ) : null}
    </div>
  );
}
