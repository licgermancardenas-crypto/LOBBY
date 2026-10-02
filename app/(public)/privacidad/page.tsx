import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { LEGAL } from "@/lib/legal"

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Qué datos recolecta Lobby, para qué los usa y cómo podés controlarlos.",
  alternates: { canonical: "/privacidad" },
}

// Ojo al editar: YouTube (Google), TikTok y Meta revisan este texto antes de
// aprobar el OAuth en producción. Cada plataforma conectada tiene que estar
// nombrada con los datos que se leen, y la sección #eliminar-datos es la URL
// de "instrucciones de eliminación de datos" que pide Meta.
export default function PrivacidadPage() {
  const mail = <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>

  return (
    <LegalPage title="Política de privacidad">
      <p>
        Esta política explica qué datos personales recolecta <strong>Lobby</strong>{" "}(el
        &quot;Servicio&quot;), operado por {LEGAL.entity}{" "}(&quot;nosotros&quot;), para qué
        los usamos, con quién los compartimos y cómo podés ejercer tus derechos. Al usar el
        Servicio aceptás esta política.
      </p>

      <h2>1. Qué es Lobby</h2>
      <p>
        Lobby es una red profesional para gamers, creadores de contenido, streamers,
        equipos y organizaciones del gaming y los esports. Los creadores arman un perfil
        público con su audiencia verificada, y las marcas y agencias pueden encontrarlos.
      </p>

      <h2>2. Datos que recolectamos</h2>
      <p><strong>Datos que nos das vos:</strong></p>
      <ul>
        <li>Datos de cuenta: email y contraseña (la contraseña se guarda cifrada y no la vemos), o los datos básicos que te comparte Google o Discord si iniciás sesión con ellos.</li>
        <li>Datos de perfil: nombre visible, nombre de usuario, tipo de perfil, país, biografía, foto, juegos, links, experiencia y estadísticas que cargues a mano.</li>
        <li>Si te anotás en la lista de acceso anticipado para marcas: email, empresa y rol.</li>
      </ul>

      <p><strong>Datos de las plataformas que conectás (solo si vos lo autorizás):</strong></p>
      <p>
        Para verificar tu audiencia podés conectar tus canales mediante OAuth. Solo pedimos
        permisos de <strong>lectura</strong>; nunca publicamos, comentamos ni modificamos
        nada en tus cuentas.
      </p>
      <ul>
        <li><strong>YouTube (Google):</strong> con el permiso <em>youtube.readonly</em> leemos el ID, el nombre y las estadísticas públicas de tu canal (suscriptores y vistas).</li>
        <li><strong>Twitch:</strong> leemos tu ID y nombre de usuario de Twitch y la cantidad de seguidores de tu canal.</li>
        <li><strong>TikTok:</strong> con los permisos <em>user.info.basic</em>, <em>user.info.profile</em> y <em>user.info.stats</em> leemos tu ID, nombre de usuario y cantidad de seguidores.</li>
        <li><strong>Instagram (Meta):</strong> con el permiso <em>instagram_business_basic</em> leemos el ID, el nombre de usuario y la cantidad de seguidores de tu cuenta profesional.</li>
      </ul>
      <p>
        Para poder actualizar esas estadísticas automáticamente guardamos los tokens de
        acceso que entrega cada plataforma. Los tokens se almacenan en nuestra base de datos
        con acceso restringido al servidor: nunca son visibles desde el navegador ni para
        otros usuarios.
      </p>

      <p><strong>Datos de uso:</strong></p>
      <ul>
        <li>Eventos de uso del Servicio (por ejemplo, visitas a perfiles y clics en links) asociados a un identificador de sesión anónimo guardado en tu navegador.</li>
        <li>Cookies estrictamente necesarias para mantener tu sesión iniciada. No usamos cookies de publicidad.</li>
      </ul>

      <h2>3. Para qué usamos tus datos</h2>
      <ul>
        <li>Crear y mostrar tu perfil profesional y tu media kit.</li>
        <li>Verificar tu audiencia y mostrar el sello de &quot;verificado&quot;.</li>
        <li>Permitir que marcas, agencias y otros usuarios encuentren perfiles en el buscador.</li>
        <li>Mostrarte métricas de quién visita tu perfil.</li>
        <li>Mejorar el Servicio, prevenir fraude y abuso, y cumplir obligaciones legales.</li>
      </ul>
      <p>
        <strong>No vendemos tus datos personales</strong> ni usamos los datos obtenidos de
        las plataformas conectadas para publicidad.
      </p>

      <h2>4. Qué es público</h2>
      <p>
        Tu perfil (nombre visible, usuario, tipo, país, biografía, foto, juegos, links,
        experiencia y estadísticas de audiencia con su estado de verificación) es
        <strong> público</strong>: cualquiera puede verlo y los buscadores pueden indexarlo.
        Tu email, tus tokens y tus métricas de visitas no son públicos.
      </p>

      <h2>5. Uso de datos de Google y YouTube</h2>
      <p>
        El uso y la transferencia a otras aplicaciones de la información recibida de las
        APIs de Google cumple con la{" "}
        <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">
          Política de datos de usuario de los servicios de API de Google
        </a>
        , incluidos los requisitos de Uso Limitado. Lobby usa los Servicios de API de
        YouTube; al conectar tu canal aceptás también las{" "}
        <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">
          Condiciones del Servicio de YouTube
        </a>{" "}
        y la{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Política de Privacidad de Google
        </a>
        .
      </p>

      <h2>6. Con quién compartimos datos</h2>
      <p>Solo con proveedores que necesitamos para operar el Servicio:</p>
      <ul>
        <li><strong>Supabase</strong> — base de datos, autenticación y almacenamiento de archivos.</li>
        <li><strong>Vercel</strong> — hosting de la aplicación.</li>
      </ul>
      <p>
        Estos proveedores pueden procesar datos fuera de tu país (por ejemplo, en Estados
        Unidos), con medidas de seguridad adecuadas. También podemos compartir datos si una
        ley o una autoridad competente lo exige.
      </p>

      <h2>7. Cuánto tiempo guardamos los datos</h2>
      <p>
        Guardamos tus datos mientras tengas una cuenta. Si desconectás una plataforma o
        eliminás tu cuenta, borramos los tokens y las estadísticas asociadas. Los eventos
        de uso pueden conservarse de forma agregada o anonimizada.
      </p>

      <h2 id="eliminar-datos">8. Cómo desconectar plataformas y eliminar tus datos</h2>
      <p>Podés revocar el acceso de Lobby en cualquier momento desde cada plataforma:</p>
      <ul>
        <li>Google / YouTube: <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">myaccount.google.com/permissions</a></li>
        <li>Twitch: <a href="https://www.twitch.tv/settings/connections" target="_blank" rel="noopener noreferrer">Configuración → Conexiones</a></li>
        <li>TikTok: Configuración y privacidad → Seguridad → Apps y servicios</li>
        <li>Instagram: Configuración → Apps y sitios web</li>
      </ul>
      <p>
        Para <strong>eliminar tu cuenta y todos tus datos</strong>, escribinos a {mail}{" "}
        desde el email de tu cuenta con el asunto &quot;Eliminar mi cuenta&quot;. Lo
        procesamos dentro de los 30 días y te confirmamos por email.
      </p>

      <h2>9. Tus derechos</h2>
      <p>
        Tenés derecho a acceder, rectificar, actualizar y suprimir tus datos personales, y a
        oponerte a su tratamiento. Podés ejercerlos escribiendo a {mail}. Muchos datos
        también los podés editar directamente desde tu perfil.
      </p>
      <p>
        Si estás en Argentina: el titular de los datos personales tiene la facultad de
        ejercer el derecho de acceso a los mismos en forma gratuita a intervalos no
        inferiores a seis meses, salvo que se acredite un interés legítimo al efecto
        (art. 14, inc. 3 de la Ley 25.326). La Agencia de Acceso a la Información Pública,
        órgano de control de la Ley 25.326, tiene la atribución de atender las denuncias y
        reclamos que se interpongan con relación al incumplimiento de las normas sobre
        protección de datos personales.
      </p>

      <h2>10. Menores</h2>
      <p>
        El Servicio no está dirigido a menores de 13 años. Si tenés entre 13 y 18 años,
        necesitás la autorización de tu madre, padre o tutor para usarlo.
      </p>

      <h2>11. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas razonables para proteger tus datos:
        conexiones cifradas (HTTPS), control de acceso por usuario a nivel de base de datos
        y acceso a tokens restringido al servidor. Ningún sistema es 100% seguro; si
        detectamos un incidente que te afecte, te lo vamos a informar.
      </p>

      <h2>12. Cambios</h2>
      <p>
        Si cambiamos esta política de forma relevante te lo vamos a avisar en el Servicio o
        por email. La fecha de última actualización está arriba.
      </p>

      <h2>13. Contacto</h2>
      <p>
        {LEGAL.entity} · {LEGAL.city}, {LEGAL.country} · {mail}
      </p>
    </LegalPage>
  )
}
