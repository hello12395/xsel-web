"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { location } from "@/data/site";
import { ClockIcon, CloseIcon, MailIcon, PhoneIcon, PinIcon, ArrowIcon } from "./Icons";
import { RotatingEarth } from "./RotatingEarth";

const ease = [0.22, 1, 0.36, 1] as const;

function useGlobeSize() {
  const [size, setSize] = useState(400);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1280) setSize(480);
      else if (window.innerWidth >= 768) setSize(440);
      else if (window.innerWidth >= 640) setSize(380);
      else setSize(320);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}

function SatellitePopout({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close satellite map"
            className="location-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <motion.div
            className="location-satellite-popout-layer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="location-satellite-title"
              className="location-satellite-popout"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.45, ease }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="location-satellite-popout-accent" aria-hidden />

              <div className="location-satellite-popout-header">
                <div className="location-satellite-popout-brand">
                  <span className="location-satellite-popout-icon">
                    <PinIcon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="location-satellite-kicker">Satellite view</p>
                    <h3 id="location-satellite-title" className="font-display mt-1 text-xl text-white sm:text-[1.35rem]">
                      {location.name}
                    </h3>
                    <p className="location-satellite-address">
                      {location.addressLines.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="location-satellite-close"
                  aria-label="Close satellite map"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              </div>

              <div className="location-satellite-popout-body">
                <div className="location-satellite-popout-meta">
                  <span className="location-satellite-meta-chip">
                    <ClockIcon className="h-3.5 w-3.5 shrink-0" />
                    {location.hours}
                  </span>
                  <span className="location-satellite-meta-chip">
                    <PinIcon className="h-3.5 w-3.5 shrink-0" />
                    {location.addressLines[1]}
                  </span>
                </div>

                <div className="location-satellite-popout-map">
                  <iframe
                    title="English Sarwar Lab satellite map"
                    src={location.mapSatelliteSrc}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="location-satellite-popout-footer">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${location.coordinates.lat},${location.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="location-satellite-maps-link"
                >
                  Open in Google Maps
                </a>
                <a
                  href={location.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="location-satellite-directions"
                >
                  Get directions
                  <ArrowIcon className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function LocationOrbit() {
  const [satelliteOpen, setSatelliteOpen] = useState(false);
  const globeSize = useGlobeSize();

  return (
    <>
      <div className="location-orbit-stage location-orbit-stage-earth">
        <div className="location-earth-wrap">
          <RotatingEarth
            width={globeSize}
            height={globeSize}
            marker={location.coordinates}
            autoRotate={!satelliteOpen}
            onGlobeClick={() => setSatelliteOpen(true)}
          />
        </div>
      </div>

      <SatellitePopout open={satelliteOpen} onClose={() => setSatelliteOpen(false)} />
    </>
  );
}

export function Location() {
  return (
    <section id="location" className="bg-location-section relative scroll-mt-24 border-t border-white/[0.06]">
      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 py-24 md:px-8 md:py-28 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-gold-soft uppercase">
            08 — Find us
          </p>
          <h2 className="font-display mt-4 text-[2.35rem] leading-[1.08] tracking-tight text-white sm:text-5xl">
            On the map
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-7 text-white/55 sm:text-base sm:leading-8">
            Two rooms on the map — Lahore by Liberty Market, and a Peshawar campus on University Road.
          </p>

          <div className="location-contact-grid mt-10">
            {location.studios.map((studio) => (
              <div key={studio.label} className="location-contact-row">
                <span className="location-contact-icon">
                  <PinIcon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold tracking-[0.18em] text-white/35 uppercase">
                    {studio.label}
                  </p>
                  <p className="font-display mt-1 text-lg text-white">{studio.name}</p>
                  <p className="mt-1.5 text-xs leading-6 text-white/55">
                    {studio.addressLines.join(", ")}
                  </p>
                </div>
              </div>
            ))}

            <div className="location-contact-row">
              <span className="location-contact-icon">
                <PhoneIcon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold tracking-[0.18em] text-white/35 uppercase">
                  Phone
                </p>
                <a
                  href={`tel:${location.phone.replace(/\s/g, "")}`}
                  className="mt-1 inline-block text-sm text-white/70 transition hover:text-gold-soft"
                >
                  {location.phone}
                </a>
              </div>
            </div>

            <div className="location-contact-row">
              <span className="location-contact-icon">
                <MailIcon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold tracking-[0.18em] text-white/35 uppercase">
                  Email
                </p>
                <a
                  href={`mailto:${location.email}`}
                  className="mt-1 inline-block text-sm text-white/70 break-all transition hover:text-gold-soft"
                >
                  {location.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <LocationOrbit />
      </div>
    </section>
  );
}
