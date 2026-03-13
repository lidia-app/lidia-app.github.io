// i18n — English / Spanish toggle
const translations = {
  es: {
    // Nav
    'nav.features': 'Funciones',
    'nav.how': 'Como Funciona',
    'nav.providers': 'Proveedores',
    'nav.story': 'Historia',

    // Hero
    'hero.badge': 'Codigo Abierto &middot; Licencia MIT',
    'hero.title': 'Inteligencia para reuniones<br><span class="gradient-text">que se queda en tu Mac.</span>',
    'hero.subtitle': 'Transcribe, resume y chatea con tus reuniones usando IA local. Tus datos no salen de tu dispositivo a menos que tu lo decidas.',
    'hero.download': 'Descargar para macOS',
    'hero.github': 'Ver en GitHub',
    'hero.req': 'Requiere macOS 26 (Tahoe) &middot; Apple Silicon recomendado',

    // Screenshot tabs
    'tabs.home': 'Inicio',
    'tabs.summary': 'Resumen',
    'tabs.actions': 'Tareas',
    'slider.dark': 'Oscuro',
    'slider.light': 'Claro',

    // Features
    'features.title': 'Todo sucede <span class="gradient-text">en tu dispositivo.</span>',
    'features.subtitle': 'Sin servidores, sin suscripciones, sin recoleccion de datos. Solo tus reuniones, tu Mac, tu IA.',
    'feat.transcription': 'Transcripcion en Tiempo Real',
    'feat.transcription.desc': 'Parakeet, WhisperKit o Apple Speech — todo ejecutandose en tu Mac. El audio nunca sale de tu dispositivo.',
    'feat.private': 'Privado por Defecto',
    'feat.private.desc': 'Datos almacenados localmente con SwiftData. Claves API en el Keychain de macOS. Cero telemetria. Cero analiticas.',
    'feat.summaries': 'Resumenes con IA',
    'feat.summaries.desc': 'Titulos automaticos, resumenes multi-seccion, decisiones clave y tareas — con MLX local o LLMs en la nube.',
    'feat.chat': 'Chatea con tus Reuniones',
    'feat.chat.desc': 'Haz preguntas sobre cualquier reunion. "Que decidimos sobre la API?" — respuestas instantaneas de tus transcripciones.',
    'feat.actions': 'Tareas Pendientes',
    'feat.actions.desc': 'Extraidas automaticamente con niveles de prioridad y fechas limite. Envia a Notion, ClickUp, Recordatorios de Apple o webhooks de n8n.',
    'feat.voice': 'Asistente de Voz',
    'feat.voice.desc': 'Pulsa para hablar con una interfaz de orbe animado. Pregunta sobre tareas, proximas reuniones o discusiones pasadas — completamente local.',

    // Steps
    'steps.title': 'Tres pasos. <span class="gradient-text">Cero configuracion.</span>',
    'step1.title': 'Descarga y Abre',
    'step1.desc': 'Clona el repositorio y ejecuta <code>./run.sh</code>. O descarga el DMG desde GitHub Releases. Funciona de inmediato — sin claves API necesarias.',
    'step2.title': 'Graba una Reunion',
    'step2.desc': 'Haz clic en grabar en cualquier evento del calendario — o inicia una nota rapida. Una transcripcion flotante muestra las palabras mientras se capturan.',
    'step3.title': 'Obtiene Inteligencia',
    'step3.desc': 'LidIA refina la transcripcion, genera un resumen y extrae tareas — todo automaticamente cuando detienes la grabacion.',

    // Providers
    'providers.title': 'Tu eliges los <span class="gradient-text">proveedores de IA.</span>',
    'providers.subtitle': 'Local por defecto. En la nube cuando quieras.',
    'providers.stt': 'Voz a Texto',
    'providers.llm': 'Proveedores LLM',
    'tag.local': 'Local',
    'tag.cloud': 'Nube',
    'tag.free': 'Gratis',
    'prov.parakeet': 'ASR en streaming de NVIDIA — mayor precision',
    'prov.whisper': 'OpenAI Whisper en Apple Silicon',
    'prov.apple': 'Integrado, sin descarga necesaria',
    'prov.mlx': 'Inferencia en dispositivo — gratis, privado',
    'prov.ollama': 'Ejecuta modelos grandes localmente',
    'prov.openai': 'GPT-4o — maxima calidad',
    'prov.anthropic': 'Claude — comprension matizada',
    'prov.cerebras': '1M tokens/dia en plan gratuito',

    // Integrations
    'integrations.title': 'Se conecta a tu <span class="gradient-text">flujo de trabajo.</span>',

    // CTA
    'cta.title': 'Listo para ser dueno de tus datos de reuniones?',
    'cta.subtitle': 'Gratis. Codigo abierto. Se ejecuta completamente en tu Mac.',
    'cta.download': 'Descargar DMG',
    'cta.star': 'Estrella en GitHub',

    // Footer
    'footer.tagline': 'Nombrada en honor a mi mama. Hecha con amor.',
    'footer.license': 'Licencia MIT',
  }
};

// English strings are the defaults in HTML — we store them on first load
const englishStrings = {};

function applyLanguage(lang) {
  const isSpanish = lang === 'es';
  const strings = isSpanish ? translations.es : englishStrings;

  // data-i18n: plain text / innerHTML without nested elements
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (!englishStrings[key]) {
      // Store original English
      englishStrings[key] = el.innerHTML;
    }
    if (strings[key]) {
      el.innerHTML = strings[key];
    }
  });

  // data-i18n-html: innerHTML with nested HTML (gradient spans, <code>, etc.)
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (!englishStrings[key]) {
      englishStrings[key] = el.innerHTML;
    }
    if (strings[key]) {
      el.innerHTML = strings[key];
    }
  });

  // Update html lang attribute
  document.documentElement.lang = isSpanish ? 'es' : 'en';

  // Update toggle button — shows the OTHER language you can switch to
  const btn = document.getElementById('lang-toggle');
  if (btn) btn.textContent = isSpanish ? 'EN' : 'ES';

  // Persist choice
  localStorage.setItem('lidia-lang', lang);
}

// Toggle handler
document.getElementById('lang-toggle')?.addEventListener('click', () => {
  const current = localStorage.getItem('lidia-lang') || 'en';
  applyLanguage(current === 'en' ? 'es' : 'en');
});

// Apply saved preference on load
const savedLang = localStorage.getItem('lidia-lang');
if (savedLang === 'es') {
  applyLanguage('es');
}
