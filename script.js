// --- THREE.JS: THE DIGITAL ARCHITECTURE ---
const canvas = document.getElementById('three-canvas');
if (canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create "Modules" (Cubes & Wireframes)
    const moduleGroup = new THREE.Group();
    const modules = [];
    const moduleCount = 40;
    
    for (let i = 0; i < moduleCount; i++) {
        const size = Math.random() * 0.4 + 0.1;
        const isWireframe = Math.random() > 0.7;
        
        const geometry = new THREE.BoxGeometry(size, size, size);
        const material = new THREE.MeshStandardMaterial({ 
            color: isWireframe ? 0xffffff : 0x0071e3, 
            transparent: true, 
            opacity: isWireframe ? 0.2 : 0.9,
            metalness: 0.9,
            roughness: 0.1,
            wireframe: isWireframe,
            emissive: isWireframe ? 0xffffff : 0x0071e3,
            emissiveIntensity: isWireframe ? 0.5 : 0.2
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        
        // Random initial scatter
        mesh.position.set(
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30
        );
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        
        moduleGroup.add(mesh);
        modules.push(mesh);
    }
    scene.add(moduleGroup);

    // Connecting Lines (Network Architecture)
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0071e3, transparent: true, opacity: 0.1 });
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(moduleCount * 3 * 2);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const mainLight = new THREE.PointLight(0x0071e3, 10, 50);
    mainLight.position.set(10, 10, 10);
    scene.add(mainLight);

    const rimLight = new THREE.PointLight(0xffffff, 5, 50);
    rimLight.position.set(-10, -10, 10);
    scene.add(rimLight);

    camera.position.z = 15;

    // Animation Loop
    const animate = () => {
        requestAnimationFrame(animate);
        
        moduleGroup.rotation.y += 0.0005;
        moduleGroup.rotation.x += 0.0002;

        // Update lines to follow modules
        const positions = lines.geometry.attributes.position.array;
        for (let i = 0; i < moduleCount; i++) {
            const nextIdx = (i + 1) % moduleCount;
            const m1 = modules[i].position;
            const m2 = modules[nextIdx].position;
            
            positions[i * 6] = m1.x;
            positions[i * 6 + 1] = m1.y;
            positions[i * 6 + 2] = m1.z;
            
            positions[i * 6 + 3] = m2.x;
            positions[i * 6 + 4] = m2.y;
            positions[i * 6 + 5] = m2.z;
        }
        lines.geometry.attributes.position.needsUpdate = true;

        modules.forEach((mod, i) => {
            mod.rotation.x += 0.005 * (i % 2 === 0 ? 1 : -1);
            mod.rotation.y += 0.003;
        });

        renderer.render(scene, camera);
    };
    animate();

    // --- SCROLL ORCHESTRATION ---
    const sections = ["#hero", "#story", "#expertise", "#exp-c3", "#exp-c3-intern", "#exp-stratzy", "#education", "#edu-djsce", "#projects", "#contact"];
    
    sections.forEach((id, index) => {
        const section = document.querySelector(id);
        const content = section?.querySelector('.section-content');
        
        if (content) {
            // Content Reveal/Hide with Parallax
            gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1,
                }
            })
            .fromTo(content, 
                { opacity: 0, y: 100, scale: 0.95 }, 
                { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power3.out" }
            )
            .to(content, { opacity: 0, y: -100, scale: 1.05, duration: 1.5, ease: "power3.in" }, "+=1");
        }

        // 3D Scene Transitions
        const tl3d = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top top",
                scrub: 2
            }
        });

        if (id === "#hero") {
            // Assembly into a structured core
            modules.forEach((mod, i) => {
                const row = Math.floor(i / 8);
                const col = i % 8;
                tl3d.to(mod.position, {
                    x: (col - 3.5) * 1.8,
                    y: (row - 2) * 1.8,
                    z: 0,
                    ease: "power2.inOut"
                }, 0);
                tl3d.to(mod.rotation, { x: 0, y: 0, z: 0 }, 0);
            });
            tl3d.to(camera.position, { z: 10 }, 0);
        }

        if (id === "#story") {
            // Shift to side and rotate for narrative
            tl3d.to(moduleGroup.position, { x: 8, z: -5, y: 0 }, 0);
            tl3d.to(moduleGroup.rotation, { y: Math.PI / 2, x: Math.PI / 6 }, 0);
            tl3d.to(camera.position, { z: 12 }, 0);
        }

        if (id === "#expertise") {
            // Deep background grid
            tl3d.to(moduleGroup.position, { x: 0, y: 0, z: -15 }, 0);
            tl3d.to(moduleGroup.rotation, { x: 0, y: 0 }, 0);
            modules.forEach((mod, i) => {
                tl3d.to(mod.position, {
                    x: (Math.random() - 0.5) * 40,
                    y: (Math.random() - 0.5) * 40,
                    z: -10,
                    ease: "power1.inOut"
                }, 0);
            });
        }

        if (id === "#exp-c3") {
            // Dense cluster for full-time experience
            tl3d.to(moduleGroup.position, { x: -6, y: 0, z: 0 }, 0);
            tl3d.to(moduleGroup.rotation, { y: -Math.PI / 4, x: 0 }, 0);
            modules.forEach((mod, i) => {
                const angle = (i / moduleCount) * Math.PI * 2;
                const radius = 4;
                tl3d.to(mod.position, {
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                    z: (i % 5) * 2 - 5,
                    ease: "power2.out"
                }, 0);
            });
        }

        if (id === "#exp-c3-intern") {
            // Floating orbit for intern experience
            tl3d.to(moduleGroup.position, { x: 0, y: 0, z: -5 }, 0);
            tl3d.to(moduleGroup.rotation, { y: Math.PI * 2, x: Math.PI / 4 }, 0);
            modules.forEach((mod, i) => {
                tl3d.to(mod.position, {
                    x: (Math.random() - 0.5) * 15,
                    y: (Math.random() - 0.5) * 15,
                    z: (Math.random() - 0.5) * 15,
                    ease: "elastic.out(1, 0.3)"
                }, 0);
            });
        }

        if (id === "#exp-stratzy") {
            // Wireframe scatter for early experience
            tl3d.to(moduleGroup.position, { x: 5, y: 0, z: 0 }, 0);
            tl3d.to(moduleGroup.rotation, { y: -Math.PI / 2 }, 0);
            modules.forEach((mod, i) => {
                tl3d.to(mod.position, {
                    x: (i % 4 - 1.5) * 3,
                    y: (Math.floor(i / 4) % 4 - 1.5) * 3,
                    z: -5,
                    ease: "power3.inOut"
                }, 0);
            });
        }

        if (id === "#education") {
            // Structured vertical pillars for USC
            tl3d.to(moduleGroup.position, { x: 10, z: 0, y: 0 }, 0);
            tl3d.to(moduleGroup.rotation, { y: -Math.PI / 3, x: 0 }, 0);
            modules.forEach((mod, i) => {
                tl3d.to(mod.position, {
                    x: (i % 3) * 2 - 2,
                    y: (i - 20) * 0.5,
                    z: 0,
                    ease: "back.out(1.2)"
                }, 0);
            });
        }

        if (id === "#edu-djsce") {
            // Symmetrical grid for DJSCE
            tl3d.to(moduleGroup.position, { x: -8, z: -2, y: 0 }, 0);
            tl3d.to(moduleGroup.rotation, { y: Math.PI / 6 }, 0);
            modules.forEach((mod, i) => {
                const x = (i % 5 - 2) * 2;
                const y = (Math.floor(i / 5) - 4) * 2;
                tl3d.to(mod.position, {
                    x: x,
                    y: y,
                    z: 0,
                    ease: "power2.inOut"
                }, 0);
            });
        }

        if (id === "#projects") {
            // Complex network for projects
            tl3d.to(moduleGroup.position, { x: 0, y: 0, z: -10 }, 0);
            tl3d.to(moduleGroup.rotation, { x: Math.PI / 4, y: Math.PI / 4 }, 0);
            modules.forEach((mod, i) => {
                tl3d.to(mod.position, {
                    x: (Math.random() - 0.5) * 30,
                    y: (Math.random() - 0.5) * 30,
                    z: (Math.random() - 0.5) * 30,
                    ease: "power2.inOut"
                }, 0);
            });
        }

        if (id === "#contact") {
            // Final Explosion / Expansion
            modules.forEach((mod) => {
                tl3d.to(mod.position, {
                    x: (Math.random() - 0.5) * 60,
                    y: (Math.random() - 0.5) * 60,
                    z: (Math.random() - 0.5) * 60,
                    ease: "power4.out"
                }, 0);
            });
            tl3d.to(camera.position, { z: 20 }, 0);
        }
    });

    // Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize Icons
lucide.createIcons();
