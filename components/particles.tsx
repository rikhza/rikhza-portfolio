"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Container, Engine } from "tsparticles-engine";

export default function ParticlesBackground() {
	const particlesInit = useCallback(async (engine: Engine) => {
		await loadSlim(engine);
	}, []);

	const particlesLoaded = useCallback(
		async (container: Container | undefined) => {
			// console.log(container);
		},
		[]
	);

	return (
		<Particles
			id="tsparticles"
			init={particlesInit}
			loaded={particlesLoaded}
			options={{
				background: {
					color: {
						value: "transparent",
					},
				},
				fpsLimit: 120,
				interactivity: {
					events: {
						onClick: {
							enable: true,
							mode: "push",
						},
						onHover: {
							enable: true,
							mode: "grab",
						},
						resize: true,
					},
					modes: {
						push: {
							quantity: 3,
						},
						grab: {
							distance: 150,
							links: {
								opacity: 0.4,
							},
						},
					},
				},
				particles: {
					color: {
						value: ["#3b82f6", "#60a5fa", "#93c5fd"],
					},
					links: {
						color: "#3b82f6",
						distance: 150,
						enable: true,
						opacity: 0.8,
						width: 1,
					},
					move: {
						direction: "none",
						enable: true,
						outModes: {
							default: "bounce",
						},
						random: true,
						speed: 0.8,
						straight: false,
					},
					number: {
						density: {
							enable: true,
							area: 1000,
						},
						value: 60,
					},
					opacity: {
						value: { min: 0.1, max: 0.3 },
						animation: {
							enable: true,
							speed: 1,
							minimumValue: 0.1,
						},
					},
					shape: {
						type: ["circle", "triangle"],
					},
					size: {
						value: { min: 1, max: 3 },
						animation: {
							enable: true,
							speed: 2,
							minimumValue: 0.1,
						},
					},
				},
				detectRetina: true,
			}}
			className="absolute inset-0 -z-10"
		/>
	);
}
