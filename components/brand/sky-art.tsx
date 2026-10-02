import Image from "next/image"

// Capa de arte de marca (cielo + wordmark + mascota asomándose). Va dentro de
// un contenedor `.lobby-sky relative overflow-hidden`; el contenido encima
// tiene que arrancar en SKY_CARD_OFFSET para que la mascota "apoye las manos"
// sobre la tarjeta, como en el mockup de bienvenida.
//
// El PNG es 1024×760 y su franja inferior oscura es el borde de la tarjeta del
// mockup: se difumina con máscara para que no se vea el corte.
// - Mobile: cubre 460px de alto (recorta los costados, se agranda la mascota).
// - Desktop: tamaño natural, centrado, con los costados fundidos al cielo.
export const SKY_CARD_OFFSET = "mt-[372px] sm:mt-[690px]"

export function SkyArt() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[460px] w-full sm:h-[760px] sm:w-[1024px]
        [mask-image:linear-gradient(to_bottom,black_80%,transparent_97%)]
        sm:[mask-image:linear-gradient(to_bottom,black_82%,transparent_96%),linear-gradient(to_right,transparent,black_14%,black_86%,transparent)]
        sm:[mask-composite:intersect]"
    >
      <Image
        src="/brand/welcome-world.png"
        alt=""
        fill
        priority
        sizes="(min-width: 640px) 1024px, 100vw"
        className="object-cover object-top"
      />
    </div>
  )
}
