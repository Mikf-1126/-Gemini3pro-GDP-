import React, { useEffect, useState, useRef, useMemo } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { scaleSequential } from 'd3-scale';
import { interpolateInferno } from 'd3-scale-chromatic';
import { GDP_2024_DATA, GEOJSON_URL, GLOBE_IMAGE_URL, BACKGROUND_IMAGE_URL } from '../constants';
import { GDPData, GeoFeature } from '../types';

interface GlobeVizProps {
  onCountrySelect: (data: GDPData | null) => void;
  selectedIso: string | null;
}

const GlobeViz: React.FC<GlobeVizProps> = ({ onCountrySelect, selectedIso }) => {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);
  const [countries, setCountries] = useState<GeoFeature[]>([]);
  const [hoverD, setHoverD] = useState<GeoFeature | null>(null);
  const [windowDimensions, setWindowDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Load GeoJSON
  useEffect(() => {
    fetch(GEOJSON_URL)
      .then(res => res.json())
      .then(data => setCountries(data.features));

    const handleResize = () => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Setup color scale based on GDP
  // Using a power scale or log scale effect visually by clamping nicely
  const colorScale = useMemo(() => {
    // Max GDP approx 30T (USA)
    return scaleSequential(interpolateInferno)
      .domain([0, 20]); // Domain 0 to 20T gets most variation, USA will be max bright
  }, []);

  const getCountryGDP = (iso: string): number => {
    return GDP_2024_DATA[iso]?.gdp || 0;
  };

  useEffect(() => {
    // Auto-rotate
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  useEffect(() => {
    // If a country is selected via prop (e.g. from a list), aim at it
    if (selectedIso && globeEl.current) {
      const country = countries.find(c => c.properties.ISO_A3 === selectedIso);
      if (country) {
        // Calculate centroid simply or use polygon lookup if robust
        // react-globe.gl doesn't expose centroid easily on raw geojson without processing
        // but we can disable auto-rotate on interaction
        globeEl.current.controls().autoRotate = false;
      }
    } else if (globeEl.current && !selectedIso) {
        globeEl.current.controls().autoRotate = true;
    }
  }, [selectedIso, countries]);

  return (
    <div className="cursor-move">
      <Globe
        ref={globeEl}
        width={windowDimensions.width}
        height={windowDimensions.height}
        globeImageUrl={GLOBE_IMAGE_URL}
        backgroundImageUrl={BACKGROUND_IMAGE_URL}
        lineHoverPrecision={0}
        
        // Polygon Layer
        polygonsData={countries}
        polygonAltitude={d => {
            const data = d as GeoFeature;
            return data.properties.ISO_A3 === selectedIso ? 0.06 : (data === hoverD ? 0.03 : 0.01);
        }}
        polygonCapColor={d => {
            const data = d as GeoFeature;
            const iso = data.properties.ISO_A3;
            const gdp = getCountryGDP(iso);
            // If no data, render dark gray transparent
            if (!gdp) return 'rgba(255, 255, 255, 0.1)';
            
            // Highlight selected
            if (iso === selectedIso) return '#3b82f6'; // Blue-500
            
            // Highlight hover
            if (data === hoverD) return '#60a5fa'; // Blue-400

            // Normal GDP color
            // We use the color scale but add transparency
            return colorScale(gdp);
        }}
        polygonSideColor={() => 'rgba(0, 0, 0, 0.5)'}
        polygonStrokeColor={() => '#111'}
        polygonLabel={({ properties: d }: any) => {
            const iso = d.ISO_A3;
            const data = GDP_2024_DATA[iso];
            return `
              <div class="bg-black/80 text-white px-3 py-1 rounded border border-white/20 backdrop-blur-md text-sm font-sans">
                <b>${data ? data.country : d.ADMIN} (${iso})</b> <br />
                ${data ? `GDP: $${data.gdp}万亿 (排名 #${data.rank})` : '暂无数据'}
              </div>
            `;
        }}
        onPolygonHover={setHoverD as any}
        onPolygonClick={(d: any) => {
            const iso = d.properties.ISO_A3;
            const data = GDP_2024_DATA[iso];
            if (data) {
                onCountrySelect(data);
                // Point globe at country
                if (globeEl.current) {
                     globeEl.current.pointOfView({ lat: d.bbox ? (d.bbox[1]+d.bbox[3])/2 : undefined, lng: d.bbox ? (d.bbox[0]+d.bbox[2])/2 : undefined, altitude: 2 }, 1000);
                }
            } else {
                onCountrySelect(null);
            }
        }}
        
        // Atmosphere
        atmosphereColor="#3a228a"
        atmosphereAltitude={0.15}
      />
    </div>
  );
};

export default GlobeViz;