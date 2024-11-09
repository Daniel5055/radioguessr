"use client";

// THIS FILE GIVES A 500 ERROR WHEN RENDERED
// IGNORE THIS FOR NOW

// Globe.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Country reverse geocoding
import crgInit from 'country-reverse-geocoding';
const crg = crgInit.country_reverse_geocoding();

// SVG overlay
import geoJson from '@/assets/countries.geo.json';
import { Country } from '@/types/country';
import { getCountry } from '@/utils/coords';

const Globe = ({ onSelectCountry }: {
    onSelectCountry?: (country: Country) => void;
}) => {
  const globeRef = useRef<HTMLDivElement>(null);
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const globeObj = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    if (!globeRef.current || typeof window == "undefined") return;

    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    globeRef.current.appendChild(renderer.domElement);
    
    // Initialize the globe
    const globe = new ThreeGlobe()
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .polygonsData(geoJson.features)
      .polygonCapColor(() => 'rgba(99, 102, 241, 0.7)')
      .polygonSideColor(() => 'rgba(165, 180, 252, 0.5)')
      .polygonStrokeColor(() => '#111')
      .polygonsTransitionDuration(300)

    // Add the globe to the scene#
    globeObj.current = globe;
    scene.add(globe);
    camera.position.z = 350;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Make background white
    renderer.setClearColor(0xffffff, 1);

    // Orbit controls to rotate the globe
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.minDistance = 50;
    controls.maxDistance = 350;
    
    // Only allow zooming and rotating, not panning
    controls.enablePan = false;

    // Handle window resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    const handleClick = (event: MouseEvent) => {
        if (!globeObj.current) return;
  
        // Calculate mouse position in normalized device coordinates (-1 to +1)
        mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
        // Update raycaster with camera and mouse position
        raycaster.current.setFromCamera(mouse.current, camera);
  
        // Calculate intersects
        const intersects = raycaster.current.intersectObject(globeObj.current, true);
        if (intersects.length > 0) {
            const intersect = intersects[0];
            const point = intersect.point;
    
            // Convert 3D coordinates to latitude and longitude
            const lon = ((180 + (Math.atan2(point.x, point.z) * 180) / Math.PI) % 360) - 180;
            const lat = 90 - (Math.acos(point.y / point.length()) * 180) / Math.PI;
  
            // Get country name
            const country = crg.get_country(lat, lon);
            if (country) {
              const alpha3 = country.code;
              const alpha2 = getCountry(lat, lon)?.alpha2 || '';

              onSelectCountry?.(
                { alpha2, alpha3, name: country.name }
              );

              globe.polygonAltitude((d: Record<string, any>) => {
                return d.properties.ISO_A2 === alpha2 ? 0.05 : 0.01;
              });
            }
        }
      };
  
      window.addEventListener('click', handleClick);

    // Animation loop
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Clean up on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
      if (globeRef.current) {
        globeRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="flex-1"><div ref={globeRef} style={{ width: '100vw', height: '100%' }} /></div>;
};

export default Globe;
