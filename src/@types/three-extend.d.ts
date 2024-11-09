declare module 'three/examples/jsm/controls/OrbitControls' {
    import { Camera, EventDispatcher, Vector3 } from 'three';
  
    export class OrbitControls extends EventDispatcher {
      constructor(object: Camera, domElement?: HTMLElement);
  
      object: Camera;
      domElement: HTMLElement | undefined;
  
      // API
      enabled: boolean;
      target: Vector3;
  
      // Options
      minDistance: number;
      maxDistance: number;
      enableDamping: boolean;
      dampingFactor: number;
      enablePan: boolean;
  
      update(): void;
      dispose(): void;
    }
  }
  