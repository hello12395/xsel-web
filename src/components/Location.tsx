"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { location } from "@/data/site";
import { CloseIcon, MailIcon, PhoneIcon, PinIcon, ArrowIcon } from "./Icons";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { RotatingEarth } from "./RotatingEarth";
import { Shimmer } from "./Shimmer";
import { ShimmerGate } from "./ShimmerGate";

const ease = [0.22, 1, 0.36, 1] as const;

function useGlobeSize() {
  const [size, setSize] = useState(300);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width >= 1280) setSize(480);
      else if (width >= 1024) setSize(420);
      else if (width >= 768) setSize(380);
      else if (width >= 640) setSize(340);
      else setSize(Math.min(300, Math.max(240, width - 48)));
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
                    <PinIcon className="h-3.5 w-3.5 shrink-0" />
                    {location.addressLines[1]}
                  </span>
                </div>

                <div className="location-satellite-popout-map">
                  <iframe
                    title="Sarwar English Lab satellite map"
                    src={location.mapSatelliteSrc}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="location-satellite-popout-footer">
                <a
                  href={location.mapUrl}
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
    <section id="location" className="bg-location-section relative section-anchor overflow-hidden border-t border-ink/8">
      <div className="relative mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:gap-10 sm:px-5 sm:py-20 md:gap-12 md:px-8 md:py-28 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
        {/* Mobile: heading → globe → cards. Desktop: heading+cards | globe */}
        <Reveal className="order-1 min-w-0 lg:col-start-1 lg:row-start-1">
          <h2 className="font-display text-[clamp(1.75rem,7vw,4.625rem)] leading-[1.08] tracking-[-0.055em] text-heading sm:leading-[1.03]">
            On the map
          </h2>
          <p className="mt-3.5 max-w-md text-[14px] leading-[1.7] text-muted sm:mt-5 sm:text-base sm:leading-[1.75]">
            Find us in G-11 Markaz, Islamabad — walk in, or reach us by phone and email anytime.
          </p>
        </Reveal>

        <Reveal
          variant="scale"
          delay={0.08}
          className="order-2 min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1"
        >
          <LocationOrbit />
        </Reveal>

        <ShimmerGate
          minMs={450}
          className="order-3 mt-1 min-w-0 sm:mt-2 lg:col-start-1 lg:row-start-2 lg:mt-8"
          skeleton={
            <div className="flex flex-col gap-3 sm:gap-4">
              <Shimmer className="h-28 w-full rounded-2xl bg-[#152F29]/90" />
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <Shimmer className="h-24 rounded-2xl bg-[#152F29]/90" />
                <Shimmer className="h-24 rounded-2xl bg-[#152F29]/90" />
              </div>
            </div>
          }
        >
          <Stagger className="flex flex-col gap-2.5 sm:gap-4">
            {location.studios.map((studio) => (
              <StaggerItem key={studio.label}>
                <a
                  href={location.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="location-contact-row"
                >
                  <span className="location-contact-icon">
                    <PinIcon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold tracking-[0.18em] text-[#EFAA93] uppercase">
                      {studio.label}
                    </p>
                    <p className="font-display mt-1 text-lg text-white">{studio.name}</p>
                    <p className="mt-1.5 text-xs leading-6 text-white/60">
                      {studio.addressLines.join(", ")}
                    </p>
                  </div>
                </a>
              </StaggerItem>
            ))}

            <StaggerItem>
              <div className="location-contact-grid">
                <a
                  href={`tel:${location.phone.replace(/\s/g, "")}`}
                  className="location-contact-row location-contact-row--compact"
                >
                  <span className="location-contact-icon">
                    <PhoneIcon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold tracking-[0.18em] text-[#EFAA93] uppercase">
                      Phone
                    </p>
                    <p className="mt-1 text-[12px] leading-snug text-white/85 sm:text-sm">
                      {location.phone}
                    </p>
                  </div>
                </a>

                <a
                  href={`mailto:${location.email}`}
                  className="location-contact-row location-contact-row--compact"
                >
                  <span className="location-contact-icon">
                    <MailIcon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold tracking-[0.18em] text-[#EFAA93] uppercase">
                      Email
                    </p>
                    <p className="mt-1 text-[11px] leading-snug break-all text-white/85 sm:text-sm">
                      {location.email}
                    </p>
                  </div>
                </a>
              </div>
            </StaggerItem>
          </Stagger>
        </ShimmerGate>
      </div>
    </section>
  );
}
