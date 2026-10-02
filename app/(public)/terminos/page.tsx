import type { Metadata } from "next"
import Link from "next/link"
import { LegalPage } from "@/components/legal-page"
import { LEGAL } from "@/lib/legal"

export const metadata: Metadata = {
  title: "Términos de uso",
  description: "Condiciones para usar LOBBY.",
  alternates: { canonical: "/terminos" },
}

export default function TerminosPage() {
  const mail = <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>

  return (
    <LegalPage title="Términos de uso">
      <p>
        Estos términos regulan el uso de <strong>LOBBY</strong>{" "}(el &quot;Servicio&quot;),
        operado por {LEGAL.entity}. Al crear una cuenta o usar el Servicio aceptás estos
        términos y la <Link href="/privacidad">Política de privacidad</Link>. Si no estás de
        acuerdo, no uses el Servicio.
      </p>

      <h2>1. El Servicio</h2>
      <p>
        LOBBY es una red profesional para el ecosistema del gaming y los esports. Permite
        crear un perfil público, conectar canales de plataformas como YouTube, Twitch, TikTok
        e Instagram para verificar la audiencia, y que marcas, agencias y otros usuarios
        encuentren perfiles. El Servicio se ofrece &quot;tal cual&quot; y puede cambiar,
        sumar o quitar funciones.
      </p>

      <h2>2. Tu cuenta</h2>
      <ul>
        <li>Tenés que tener al menos 13 años. Si sos menor de 18, necesitás autorización de tu madre, padre o tutor.</li>
        <li>Los datos que cargues tienen que ser verdaderos y estar actualizados.</li>
        <li>Sos responsable de mantener segura tu contraseña y de la actividad de tu cuenta.</li>
        <li>Una persona u organización no puede hacerse pasar por otra ni reservar nombres de usuario de terceros.</li>
      </ul>

      <h2>3. Plataformas conectadas y verificación</h2>
      <p>
        Al conectar un canal nos autorizás a leer los datos que se detallan en la{" "}
        <Link href="/privacidad">Política de privacidad</Link> para mostrar tu audiencia
        verificada. Solo podés conectar canales que sean tuyos o que estés autorizado a
        administrar. El uso de cada plataforma se rige además por sus propios términos (por
        ejemplo, las{" "}
        <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">
          Condiciones del Servicio de YouTube
        </a>
        ). Las estadísticas dependen de lo que informa cada plataforma: no garantizamos que
        estén libres de errores ni que la plataforma no cambie o corte su acceso.
      </p>

      <h2>4. Tu contenido</h2>
      <p>
        Lo que publicás en tu perfil sigue siendo tuyo. Nos das una licencia no exclusiva,
        gratuita y mundial para alojarlo, mostrarlo y difundirlo dentro del Servicio y para
        promocionar el Servicio (por ejemplo, mostrar tu perfil público en resultados de
        búsqueda). La licencia termina cuando lo borrás o eliminás tu cuenta.
      </p>

      <h2>5. Qué no está permitido</h2>
      <ul>
        <li>Inflar, falsear o manipular estadísticas de audiencia, o intentar engañar al sistema de verificación.</li>
        <li>Publicar contenido ilegal, ofensivo, discriminatorio o que infrinja derechos de terceros.</li>
        <li>Acosar, hacer spam o contactar usuarios con fines fraudulentos.</li>
        <li>Extraer datos del Servicio de forma automatizada (scraping) sin autorización escrita.</li>
        <li>Intentar acceder a cuentas o datos ajenos, o afectar la seguridad o el funcionamiento del Servicio.</li>
      </ul>
      <p>
        Podemos quitar contenido o suspender cuentas que incumplan estos términos, y retirar
        el sello de verificado si detectamos manipulación.
      </p>

      <h2>6. Relación entre usuarios</h2>
      <p>
        LOBBY facilita que creadores, marcas y organizaciones se encuentren. Los acuerdos que
        hagan entre ellos (campañas, sponsoreos, contrataciones) son responsabilidad exclusiva
        de las partes; LOBBY no es parte de esos acuerdos salvo que se pacte expresamente.
      </p>

      <h2>7. Planes pagos</h2>
      <p>
        Hoy el Servicio es gratuito para creadores. Si en el futuro ofrecemos planes pagos
        (por ejemplo, para marcas y agencias), sus precios y condiciones se van a informar
        antes de contratarlos.
      </p>

      <h2>8. Propiedad intelectual</h2>
      <p>
        La marca LOBBY, el diseño y el software del Servicio son de {LEGAL.entity}. Las marcas
        de terceros (YouTube, Twitch, TikTok, Instagram, juegos, etc.) pertenecen a sus
        titulares y se mencionan solo para identificar sus servicios.
      </p>

      <h2>9. Limitación de responsabilidad</h2>
      <p>
        En la máxima medida permitida por la ley, no somos responsables por daños indirectos,
        lucro cesante o pérdida de datos derivados del uso del Servicio, ni por el contenido
        que publiquen otros usuarios. Nada de esto limita los derechos que te correspondan
        como consumidor según la ley aplicable.
      </p>

      <h2>10. Baja</h2>
      <p>
        Podés dejar de usar el Servicio y pedir la eliminación de tu cuenta en cualquier
        momento (ver{" "}
        <Link href="/privacidad#eliminar-datos">cómo eliminar tus datos</Link>). Nosotros
        podemos dar de baja cuentas que incumplan estos términos.
      </p>

      <h2>11. Cambios a estos términos</h2>
      <p>
        Podemos actualizar estos términos. Si el cambio es relevante te lo avisamos en el
        Servicio o por email; si seguís usándolo después del aviso, se entiende que aceptás la
        nueva versión.
      </p>

      <h2>12. Ley aplicable</h2>
      <p>
        Estos términos se rigen por las leyes de la {LEGAL.country}. Cualquier controversia
        se somete a los tribunales ordinarios de la {LEGAL.city}, sin perjuicio de los
        derechos que te otorgue la normativa de defensa del consumidor.
      </p>

      <h2>13. Contacto</h2>
      <p>{mail}</p>
    </LegalPage>
  )
}
