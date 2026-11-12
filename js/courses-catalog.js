/* ==========================================================
   Social Red — catálogo y fichas de cursos externos
   ========================================================== */
window.SR = window.SR || {};

(() => {
  const imageByCategory = {
    'Informática 1': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85',
    'Informática 2': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85',
    Programación: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=85',
    Arduino: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=1400&q=85',
    Robótica: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1400&q=85',
    Electrónica: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85',
    'Taller de Tecnología': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=85'
  };
  const commonsApi = 'https://commons.wikimedia.org/w/api.php';

  const loadCommonsMedia = async (term, type) => {
    const params = new URLSearchParams({
      action: 'query',
      generator: 'search',
      gsrsearch: `filetype:${type} ${term}`,
      gsrnamespace: '6',
      gsrlimit: '10',
      prop: 'imageinfo',
      iiprop: 'url|extmetadata|mime',
      iiurlwidth: '800',
      format: 'json',
      origin: '*'
    });
    const response = await fetch(`${commonsApi}?${params.toString()}`);
    if (!response.ok) throw new Error(`Wikimedia Commons respondió ${response.status}`);
    const payload = await response.json();
    return Object.values(payload.query && payload.query.pages || []).flatMap((page) => page.imageinfo || [])
      .filter((info) => {
        const license = info.extmetadata && info.extmetadata.LicenseShortName;
        const allowed = license && /^(?:CC0|CC BY(?:-SA)?(?: \d(?:\.\d)?)?|Public domain)$/i.test(license.value.trim());
        const url = info.url || '';
        const media = type === 'video' ? /\.(mp4|webm|ogv)(?:[?#]|$)/i.test(url) : /^image\//i.test(info.mime || '');
        return allowed && media && url.startsWith('https://upload.wikimedia.org/') &&
          (info.descriptionurl || '').startsWith('https://commons.wikimedia.org/wiki/File:');
      })
      .map((info) => ({
        title: (info.extmetadata && info.extmetadata.ObjectName && info.extmetadata.ObjectName.value) || 'Recurso educativo',
        url: info.url,
        thumbnail: info.thumburl || info.url,
        source: info.descriptionurl || '',
        license: (info.extmetadata && info.extmetadata.LicenseShortName && info.extmetadata.LicenseShortName.value) || 'Licencia abierta',
        mime: info.mime || ''
      }));
  };

  const teachingDomains = {
    'Informática 1': {
      principle: 'Un equipo digital funciona como un sistema: recibe datos, los procesa siguiendo instrucciones, guarda resultados y los comunica a una persona u otro dispositivo. Para entender cualquier herramienta conviene distinguir qué parte interviene, qué información maneja y qué resultado produce.',
      example: 'Al preparar un documento, el teclado introduce caracteres, el procesador ejecuta el editor, la memoria mantiene el trabajo disponible y el almacenamiento conserva el archivo. Si algo falla, comprobar cada etapa por separado ayuda a localizar la causa.',
      method: ['Define el objetivo de la tarea y los datos que necesitas.', 'Identifica la herramienta y los componentes que participan.', 'Realiza una acción pequeña y comprueba el resultado.', 'Guarda el trabajo en un formato adecuado y verifica que se pueda volver a abrir.'],
      checklist: ['¿Puedes explicar el concepto sin repetir la definición?', '¿Sabes qué herramienta o componente participa y por qué?', '¿Comprobaste el resultado y guardaste el trabajo de forma segura?'],
      diagram: ['Entrada de datos', 'Procesamiento', 'Resultado útil']
    },
    'Informática 2': {
      principle: 'La informática conecta dispositivos, programas, datos y personas. Los conceptos se comprenden mejor al seguir el recorrido de la información: cómo se representa, dónde se procesa, cómo se comparte y qué medidas mantienen su disponibilidad y privacidad.',
      example: 'En una videollamada, el micrófono transforma sonido en datos, la aplicación organiza la comunicación, la red transporta paquetes y el dispositivo receptor reconstruye el audio. Un problema puede estar en cualquiera de esas etapas.',
      method: ['Formula una pregunta concreta sobre el sistema o concepto.', 'Divide el tema en partes y dibuja cómo se relacionan.', 'Busca un ejemplo cotidiano y describe el flujo de información.', 'Resume qué ventajas, límites y precauciones tiene la solución.'],
      checklist: ['¿Identificaste las partes y sus relaciones?', '¿Puedes seguir el recorrido de los datos?', '¿Distingues una ventaja de una limitación o riesgo?'],
      diagram: ['Dispositivo', 'Red y servicios', 'Usuario o destino']
    },
    Programación: {
      principle: 'Programar es expresar una solución precisa para que una computadora pueda ejecutarla. Antes de escribir código, aclara el problema, las entradas, las transformaciones y el resultado esperado. Después divide la solución en instrucciones comprobables.',
      example: 'Para calcular el total de una compra, recibe precios y cantidades, multiplica cada par, suma los subtotales y muestra el resultado. Una prueba pequeña —por ejemplo, dos artículos con valores conocidos— permite verificar la lógica antes de ampliarla.',
      method: ['Describe el problema con un ejemplo de entrada y su resultado esperado.', 'Escribe los pasos en lenguaje sencillo y detecta decisiones o repeticiones.', 'Implementa una parte pequeña con nombres claros y comentarios útiles.', 'Prueba casos normales y límite; corrige la causa, no solo el síntoma.'],
      checklist: ['¿Las entradas y salidas están definidas?', '¿Cada paso tiene un propósito claro?', '¿Probaste un caso normal y uno límite?'],
      diagram: ['Entrada', 'Algoritmo', 'Salida comprobada']
    },
    Arduino: {
      principle: 'Un proyecto con microcontrolador une un circuito físico y un programa. Las entradas representan mediciones o acciones, el código decide qué hacer y las salidas controlan componentes. La alimentación, las conexiones y los límites eléctricos deben verificarse antes de energizar el montaje.',
      example: 'Un LED puede encenderse cuando un pulsador está activo: el circuito entrega una señal de entrada, el programa evalúa su estado y una salida gobierna el LED mediante una conexión adecuada. Cambiar una sola variable facilita observar la relación causa-efecto.',
      method: ['Dibuja el circuito y anota alimentación, señal y referencia común.', 'Comprueba polaridad, conexiones y especificaciones con el circuito apagado.', 'Prueba primero cada componente de forma aislada.', 'Integra el programa, modifica una variable por vez y registra el comportamiento.'],
      checklist: ['¿El esquema coincide con el montaje?', '¿Verificaste polaridad y límites antes de alimentar?', '¿Puedes explicar qué entrada provoca cada salida?'],
      diagram: ['Sensor o botón', 'Programa en la placa', 'Actuador']
    },
    Robótica: {
      principle: 'Un robot percibe el entorno mediante sensores, interpreta sus lecturas con un controlador y actúa a través de motores u otros actuadores. Este ciclo de percepción, decisión y acción permite automatizar tareas; medir y ajustar la respuesta es tan importante como construir el mecanismo.',
      example: 'Un robot que sigue una línea compara las lecturas de sensores de luz. Si la línea queda a un lado, corrige el giro; si vuelve al centro, avanza. La velocidad y el umbral de lectura afectan la estabilidad.',
      method: ['Define la tarea y las condiciones del entorno.', 'Elige una medición útil y un actuador que pueda producir la acción necesaria.', 'Escribe una regla de decisión simple y predice qué ocurrirá.', 'Prueba con cambios controlados y ajusta una variable cada vez.'],
      checklist: ['¿Qué mide el sensor y qué limitaciones tiene?', '¿La decisión conecta claramente medición con acción?', '¿Probaste más de una condición del entorno?'],
      diagram: ['Percepción', 'Decisión', 'Acción y respuesta']
    },
    Electrónica: {
      principle: 'Un circuito es un camino organizado para la corriente eléctrica. La tensión impulsa el movimiento de carga, la corriente describe cuánto circula y los componentes transforman o limitan ese comportamiento. Un esquema ayuda a razonar antes de montar; los valores nominales y la polaridad importan.',
      example: 'En un circuito sencillo con una fuente, una resistencia y un LED en serie, la resistencia limita la corriente y el LED emite luz cuando está polarizado correctamente. Cambiar componentes sin comprobar sus valores puede dañarlos.',
      method: ['Lee el esquema y reconoce símbolos, nodos y polaridades.', 'Anota la función de cada componente y sus límites indicados.', 'Calcula o verifica valores antes de conectar la alimentación.', 'Mide el circuito y compara la observación con la predicción.'],
      checklist: ['¿Puedes seguir el recorrido de la corriente?', '¿Reconoces polaridad y valor nominal?', '¿El montaje se verificó antes de alimentarlo?'],
      diagram: ['Fuente', 'Componentes', 'Carga y medición']
    },
    'Taller de Tecnología': {
      principle: 'Un proyecto tecnológico convierte una necesidad en una solución fabricable. El proceso combina investigación, criterios de diseño, planificación, construcción y evaluación. Trabajar con seguridad, medir antes de cortar y comprobar cada etapa reduce errores y desperdicio.',
      example: 'Para construir una estructura de cartón estable, primero define qué carga debe soportar, elige una forma, traza piezas con medidas, realiza un prototipo y observa dónde se deforma. Esa evidencia guía una mejora concreta.',
      method: ['Describe la necesidad, el uso previsto y los criterios de éxito.', 'Haz un boceto con medidas y prepara materiales y herramientas.', 'Construye en etapas, manteniendo el área de trabajo segura.', 'Prueba el resultado, registra fallos y explica qué cambiarías.'],
      checklist: ['¿El diseño responde a la necesidad definida?', '¿Las medidas y herramientas se verificaron?', '¿Probaste el resultado y documentaste una mejora?'],
      diagram: ['Necesidad y diseño', 'Construcción segura', 'Prueba y mejora']
    }
  };

  const topicKnowledge = [
    [/procesador|cpu/i, 'El procesador ejecuta instrucciones y coordina operaciones; su rendimiento también depende de la memoria, el almacenamiento, el software y la carga de trabajo.', 'Al abrir varias aplicaciones, el sistema reparte tiempo de procesamiento entre tareas. Un procesador rápido no compensa por sí solo una memoria insuficiente o un disco muy lento.', 'Dibuja el recorrido de una instrucción: programa, memoria, procesamiento y resultado.'],
    [/memoria|ram/i, 'La memoria de trabajo guarda temporalmente los datos que usan los programas activos. Es rápida y volátil: su contenido deja de conservarse al apagar el equipo.', 'Al editar una imagen grande, el programa mantiene datos de la imagen en memoria para responder con rapidez. Guardar crea una copia persistente en almacenamiento.', 'Compara qué información iría a memoria de trabajo y cuál a un archivo guardado.'],
    [/almacenamiento|archivos|formatos/i, 'El almacenamiento persistente conserva archivos sin alimentación. La organización por carpetas, el formato y una estrategia de copias determinan si los datos se encuentran, abren y recuperan correctamente.', 'Un documento puede exportarse a PDF para compartir su aspecto y conservarse también en su formato editable para continuar trabajando.', 'Crea una estructura de carpetas por proyecto y define nombres, formatos y ubicación de respaldo.'],
    [/perif|entrada|salida|sensores/i, 'Los dispositivos de entrada convierten acciones o mediciones en datos; los de salida comunican resultados. Algunos equipos hacen ambas cosas. Distinguir la función ayuda a conectar el componente correcto.', 'Un micrófono captura sonido como entrada y unos altavoces reproducen el audio como salida; una pantalla táctil realiza ambas funciones.', 'Clasifica cinco dispositivos de tu entorno y explica qué información reciben o entregan.'],
    [/placa base|conexiones|cableado|protoboard/i, 'Una placa o protoboard proporciona conexiones mecánicas y eléctricas entre componentes. En una protoboard, ciertos grupos de orificios comparten conexión interna; el esquema evita asumir que dos puntos están unidos cuando no lo están.', 'Antes de alimentar un circuito, marca en el dibujo los rieles de tensión, la referencia común y las filas conectadas; después verifica cada cable.', 'Representa un montaje pequeño y comprueba continuidad de cada conexión con el circuito apagado.'],
    [/montaje|herramientas|seguridad|riesgos/i, 'La seguridad empieza antes de trabajar: identifica riesgos, elige protección adecuada, desconecta fuentes de energía cuando corresponda y utiliza herramientas según su propósito. Detén la actividad si una condición no es segura.', 'Antes de manipular un circuito, desconecta su alimentación y revisa que no existan cables dañados ni componentes calientes.', 'Prepara una lista de riesgos y medidas preventivas para la práctica que vas a realizar.'],
    [/sistema operativo|instalación|actualización|software|aplicaciones/i, 'El sistema operativo administra recursos del equipo y ofrece servicios a las aplicaciones. Instalar o actualizar software debe hacerse desde fuentes confiables, verificando compatibilidad, permisos y espacio disponible.', 'Antes de instalar una aplicación, comprueba el editor, el sistema compatible, los permisos solicitados y cómo desinstalarla o actualizarla.', 'Escribe una lista de verificación para instalar una aplicación de forma responsable.'],
    [/presentación|diapositivas|diseño de diapositivas/i, 'Una presentación comunica una idea mediante una secuencia visual. Una diapositiva debe tener un propósito, jerarquía tipográfica y contraste suficiente; los elementos decorativos no deben competir con el mensaje.', 'Una diapositiva de resultados puede mostrar un título que afirma la conclusión, un gráfico sencillo y una nota breve sobre el periodo medido.', 'Reduce una diapositiva saturada a una idea principal y tres apoyos visuales o textuales.'],
    [/fórmulas|funciones|celdas|datos y formatos|gráficos/i, 'Una hoja de cálculo organiza valores en celdas y permite transformarlos con fórmulas. Las referencias a celdas, los tipos de datos y la claridad del gráfico influyen en la confiabilidad del análisis.', 'Para calcular subtotales, multiplica cantidad por precio en cada fila y suma la columna. Comprueba el resultado con una operación manual sencilla.', 'Crea una tabla pequeña, calcula un total y genera un gráfico que responda una pregunta concreta.'],
    [/writer|texto|párrafos|páginas|documentos|índices|tablas e imágenes/i, 'Un documento bien estructurado usa estilos para distinguir títulos, secciones y cuerpo de texto. Los estilos globales facilitan mantener formato consistente y generar índices; el contenido debe seguir un orden lógico.', 'Aplica estilos de título a las secciones en vez de cambiar manualmente tamaño y negrita. Luego genera una tabla de contenido a partir de esa estructura.', 'Escribe una página con título, dos secciones y una tabla; navega por ella usando su estructura.'],
    [/capas|máscaras|retoque|selecciones|imágenes/i, 'En edición de imagen, trabajar por capas conserva elementos separados. Una máscara controla qué partes se muestran sin borrar píxeles, lo que permite corregir el efecto después.', 'Duplica una capa antes de retocar y usa una máscara para ocultar el fondo gradualmente. Si el borde queda mal, ajusta la máscara en vez de reconstruir la imagen.', 'Propón un flujo no destructivo para corregir color y separar un objeto del fondo.'],
    [/vector|trazados|svg|formas|composición/i, 'Los gráficos vectoriales describen formas mediante geometría, por lo que pueden escalarse sin pixelarse. Nodos y trazados permiten editar curvas; una composición necesita alineación, contraste y espacios consistentes.', 'Un logotipo vectorial puede ampliarse para un cartel y reducirse para un icono sin perder nitidez, siempre que sus formas y texto se exporten correctamente.', 'Diseña un icono usando pocas formas y prueba su legibilidad en tamaños distintos.'],
    [/html|etiquetas|estructura|enlaces e imágenes/i, 'HTML describe la estructura y el significado del contenido, no su apariencia. Elegir elementos semánticos y mantener una jerarquía de encabezados mejora navegación, accesibilidad y mantenimiento.', 'Una página de artículo puede organizarse con encabezado, navegación, contenido principal, secciones y pie. Un enlace debe describir su destino.', 'Escribe la estructura semántica de una página informativa y verifica el orden de los encabezados.'],
    [/css|selectores|cascada|tipografía|color|modelo de caja|flexbox|grid|adaptable/i, 'CSS aplica reglas visuales a elementos mediante selectores. La cascada resuelve conflictos por origen, especificidad y orden; el modelo de caja explica cómo contenido, relleno, borde y margen determinan dimensiones.', 'Una cuadrícula puede usar columnas flexibles y cambiar a una sola columna en una pantalla estrecha, evitando anchos fijos que causen desplazamiento horizontal.', 'Diseña una tarjeta con espaciado consistente y una regla adaptable para móvil.'],
    [/ciberseguridad|contraseñas|privacidad|phishing|fraudes|copias de seguridad/i, 'La seguridad digital reduce riesgos con controles defensivos: actualizaciones, autenticación multifactor, contraseñas únicas, mínimos permisos y copias recuperables. Desconfía de solicitudes inesperadas de claves o códigos y verifica por un canal conocido.', 'Ante un mensaje urgente que pide iniciar sesión, no abras su enlace. Visita manualmente el sitio conocido y revisa desde allí si existe una notificación real.', 'Diseña una lista de protección para tus propias cuentas y un plan de recuperación con copias verificadas.'],
    [/inteligencia artificial|aprendizaje automático|datos y ejemplos|evaluar resultados/i, 'Un modelo de aprendizaje automático aprende patrones a partir de ejemplos. Su resultado es una estimación, no una verdad garantizada; datos incompletos o sesgados pueden producir errores y afectar a grupos de forma desigual.', 'Un clasificador de imágenes debe probarse con fotos distintas a las usadas para entrenarlo. Revisa falsos positivos y negativos antes de confiar en sus predicciones.', 'Propón una tarea apta para clasificación y señala datos, errores posibles y una forma de revisión humana.'],
    [/algoritmos|secuencias|condiciones|bucles|repeticiones|diagramas|símbolos/i, 'Un algoritmo define pasos finitos y ordenados. Una condición elige una ruta; un bucle repite instrucciones mientras se cumpla una regla. Diagramas y pseudocódigo permiten revisar la lógica antes de programar.', 'Para decidir si una temperatura requiere alerta, compara la lectura con un umbral y muestra un mensaje solo cuando la condición se cumple.', 'Escribe un algoritmo para una tarea cotidiana, identifica decisiones y prueba qué ocurre en los límites.'],
    [/variables|datos|lenguajes|sintaxis|funciones|colecciones/i, 'Los programas representan información con tipos de datos y nombres. Las funciones agrupan tareas y reciben parámetros; las colecciones almacenan varios valores. Nombres descriptivos y funciones pequeñas hacen que el código sea más fácil de probar.', 'Una función puede recibir una lista de precios y devolver su suma. Un caso vacío y otro con un solo precio revelan supuestos que conviene documentar.', 'Esboza una función con propósito, entradas, salida y dos pruebas pequeñas.'],
    [/bloques|scratch|code|escenario|personajes|eventos/i, 'La programación visual organiza instrucciones en bloques compatibles, haciendo visibles secuencias, eventos y controles. Los personajes y objetos reaccionan a eventos; separar comportamientos evita que un proyecto se vuelva difícil de depurar.', 'Al presionar una tecla, un personaje puede avanzar una cantidad fija. Un límite del escenario evita que desaparezca de la pantalla.', 'Planifica una animación con evento inicial, movimiento, condición de parada y mensaje final.'],
    [/arduino|placa y entorno|ardublock|programa|programación/i, 'El microcontrolador ejecuta un programa cargado desde un entorno de desarrollo. Un ciclo de lectura, cálculo y escritura permite responder a entradas; separar pruebas de hardware y software ayuda a localizar fallos.', 'Lee un botón, guarda su estado en una variable y activa una salida cuando está presionado. Comprueba primero la entrada en el monitor antes de conectar el actuador.', 'Escribe pseudocódigo para leer una entrada y cambiar una salida; indica qué pruebas confirmarían su comportamiento.'],
    [/led|luces|resistencia|polaridad|diodos/i, 'Un LED es un diodo: deja pasar corriente principalmente en una dirección. Una resistencia en serie limita la corriente; el valor se selecciona considerando la tensión de alimentación y las especificaciones del LED.', 'Con una alimentación baja, primero calcula la caída aproximada de tensión y escoge una resistencia que mantenga corriente dentro del límite del componente. No conectes el LED directamente a la fuente.', 'Identifica ánodo, cátodo y resistencia en un esquema y explica la función de cada pieza.'],
    [/sensores|lectura|medición|calibración|analógicos|digitales/i, 'Un sensor convierte una magnitud física en una señal interpretable. Una lectura necesita unidades, rango y contexto; calibrar compara el sensor con una referencia y ayuda a detectar desviaciones.', 'Registra varias lecturas de luz en condiciones conocidas, calcula un promedio y define un umbral con margen para evitar cambios rápidos por ruido.', 'Diseña una tabla con mediciones, unidades, condición de prueba y una conclusión sobre su consistencia.'],
    [/actuadores|motores|servos|movimiento/i, 'Un actuador transforma una señal de control en una acción física. Motores, servos y relés tienen requisitos eléctricos y mecánicos distintos; el controlador puede requerir una etapa de potencia y una alimentación apropiada.', 'Un servo se posiciona mediante una señal de control dentro de su rango. Un programa debe limitar órdenes para no forzar el mecanismo.', 'Compara el movimiento requerido en un proyecto y elige un actuador según carga, precisión y alimentación.'],
    [/circuitos combinacionales|puertas|tablas de verdad|binarios|digital/i, 'La lógica digital representa estados discretos. Las puertas AND, OR y NOT combinan entradas; una tabla de verdad enumera sistemáticamente cada combinación y permite verificar el diseño.', 'Una alarma lógica podría activarse cuando el sistema está armado y el sensor detecta apertura. La expresión AND hace explícita esa dependencia.', 'Completa una tabla de verdad de dos entradas y explica cada fila antes de construir el circuito.'],
    [/analógic|señales|amplificación|filtros|divisores|medición/i, 'Las señales analógicas varían de forma continua dentro de un rango. Un divisor reparte tensión, un filtro atenúa ciertas frecuencias y un amplificador modifica amplitud; los valores y límites del circuito determinan el resultado.', 'Un divisor puede escalar una señal para que un sensor entregue un rango compatible con una entrada. Verifica tensiones máximas antes de conectar equipos.', 'Dibuja una señal de entrada y predice cómo cambiaría al pasar por el circuito estudiado.'],
    [/realimentación|control|respuesta del sistema|entrada y salida/i, 'Un sistema de control compara el estado observado con un objetivo y ajusta la acción. La realimentación permite corregir desviaciones, aunque una respuesta demasiado intensa puede causar oscilaciones.', 'Un termostato mide temperatura, compara con el valor elegido y enciende o apaga la calefacción. El margen entre estados evita conmutaciones continuas.', 'Dibuja referencia, medición, controlador, actuador y proceso para un sistema cotidiano.'],
    [/tesel|polígonos|simetría|figuras|tangram|geometría/i, 'Un patrón geométrico usa transformaciones como traslación, giro y reflexión. En una teselación las piezas cubren el plano sin huecos ni solapamientos; en un tangram, conservar proporciones permite componer nuevas siluetas.', 'Una pieza puede repetirse mediante traslaciones y giros. Si las aristas no coinciden, aparecerán huecos que revelan un error en la construcción.', 'Construye un patrón con una pieza y marca qué transformaciones generan las repeticiones.'],
    [/papel|plantillas|corte|ensamblaje|trazado|tablero/i, 'Un modelo físico depende de medidas, líneas de corte, pliegues y uniones. Distinguir cada marca en la plantilla evita deformar piezas; un prototipo barato permite validar encajes antes del montaje definitivo.', 'Marca pliegues con una regla antes de doblar. Ensambla en seco las piezas principales para comprobar orientación y ajuste.', 'Prepara una secuencia de montaje y una lista de verificación de medidas y uniones.'],
    [/recursos|documentación|herramientas|proyectos|actividades/i, 'Un recurso técnico se evalúa por su autoría, propósito, fecha, requisitos y licencia. Comparar varias fuentes y registrar versiones ayuda a elegir materiales pertinentes y reutilizarlos correctamente.', 'Antes de basar una práctica en una biblioteca o plantilla, comprueba compatibilidad, documentación y permisos de uso.', 'Evalúa un recurso según autor, objetivo, vigencia, requisitos y condiciones de reutilización.']
  ];

  const normalized = (text) => text.toLowerCase();

  const lessonMaterial = (course, lesson, index) => {
    const topic = normalized(`${course.title} ${lesson.t}`);
    const knowledge = topicKnowledge.find(([pattern]) => pattern.test(topic));
    const domain = teachingDomains[course.category];
    return {
      objective: `Al terminar este tema podrás explicar «${lesson.t}», identificar dónde se aplica y resolver una tarea básica relacionada.`,
      explanation: knowledge
        ? knowledge[1]
        : `${lesson.t} es una parte importante de ${course.title}. Para estudiarla, identifica sus elementos, la función de cada uno y cómo se relacionan con el objetivo del curso. No memorices una lista aislada: intenta explicar qué cambia cuando se modifica una parte y qué evidencia permite comprobarlo.`,
      context: domain.principle,
      example: knowledge ? knowledge[2] : domain.example,
      practice: knowledge ? knowledge[3] : `Prepara un ejemplo sencillo de «${lesson.t}», describe el resultado esperado y contrástalo con una comprobación sencilla.`,
      steps: domain.method,
      checklist: domain.checklist,
      diagram: domain.diagram,
      review: [
        `¿Cómo definirías «${lesson.t}» con tus propias palabras?`,
        `¿Qué ejemplo concreto demuestra que entendiste este concepto?`,
        '¿Qué comprobación harías antes de dar por terminado el ejercicio?'
      ],
      number: index + 1
    };
  };

  const lessonCodeExample = (course) => {
    if (course.title === 'Curso Python') {
      return {
        label: 'Ejemplo ejecutable: recorrer datos y validar el resultado',
        code: 'precios = [12.5, 8.0, 4.5]\\ntotal = sum(precios)\\n\\nif precios:\\n    promedio = total / len(precios)\\n    print(f\"Total: {total:.2f}\")\\n    print(f\"Promedio: {promedio:.2f}\")'
      };
    }
    if (course.title === 'Curso de HTML') {
      return {
        label: 'Ejemplo: estructura semántica de una tarjeta informativa',
        code: '<article class=\"card\">\\n  <h2>Sensor de luz</h2>\\n  <p>Mide la iluminación del entorno.</p>\\n  <a href=\"guia.html\">Ver la guía</a>\\n</article>'
      };
    }
    if (course.title === 'Curso de CSS') {
      return {
        label: 'Ejemplo: cuadrícula adaptable sin anchos rígidos',
        code: '.cards {\\n  display: grid;\\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\\n  gap: 1rem;\\n}'
      };
    }
    if (course.title === 'Curso de Impress') {
      return {
        label: 'Ejemplo: estructura de una diapositiva clara',
        code: 'TÍTULO: una conclusión completa\\nEVIDENCIA: un gráfico legible\\nCONTEXTO: unidad, fecha y fuente\\nCIERRE: qué debería recordar la audiencia'
      };
    }
    if (course.title === 'Curso de Calc') {
      return {
        label: 'Ejemplo: total por fila y suma general',
        code: 'A                 B          C\\nProducto          Cantidad   Precio\\nCuaderno          3          2.50\\nLápiz             4          0.75\\n\\nSubtotal fila 2: =B2*C2\\nTotal:            =SUMA(D2:D3)'
      };
    }
    if (/Arduino|Ardublock|PC42|Picuino UNO|protoboard|Conductímetro/i.test(course.title)) {
      return {
        label: 'Ejemplo didáctico: ciclo de lectura y decisión',
        code: 'iniciar entradas y salidas\\nrepetir:\\n  lectura = leer_sensor()\\n  si lectura supera el umbral:\\n    activar_salida()\\n  si no:\\n    desactivar_salida()\\n  esperar un intervalo breve'
      };
    }
    if (/Scratch|Curso Code/i.test(course.title)) {
      return {
        label: 'Ejemplo: secuencia de bloques para una animación',
        code: 'AL PRESIONAR bandera verde\\n  ir a posición inicial\\n  REPETIR 10 veces\\n    mover 10 pasos\\n    si toca el borde: rebotar\\n  decir \"¡Listo!\"'
      };
    }
    if (/Diagramas de flujo|Actividades desconectadas/i.test(course.title)) {
      return {
        label: 'Ejemplo: algoritmo para decidir si hace falta una pausa',
        code: 'INICIO\\n  leer minutos_de_trabajo\\n  ¿minutos_de_trabajo >= 50?\\n    SÍ -> recomendar pausa\\n    NO -> continuar tarea\\nFIN'
      };
    }
    return null;
  };

  const source = (title, category, url, summary, topics) => {
    const slug = title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return {
      id: `curso-${slug}`,
      title,
      short: summary,
      category,
      level: 'Autoguiado',
      rating: null,
      hours: null,
      videos: 0,
      hue: ({ 'Informática 1': 220, 'Informática 2': 210, Programación: 265, Arduino: 175, Robótica: 285, Electrónica: 195, 'Taller de Tecnología': 32 })[category],
      icon: category === 'Programación' ? 'code' : category === 'Robótica' ? 'cpu' : category === 'Informática 1' || category === 'Informática 2' ? 'app' : 'bolt',
      author: 'Equipo educativo Social Red',
      intro: summary,
      body: [
        `Este curso de ${title} está redactado para Social Red como una ruta de aprendizaje autónoma. Cada lección presenta una idea central, la conecta con conceptos previos y muestra cómo reconocerla en una situación concreta.`,
        'Trabaja en orden: estudia la explicación, sigue el ejemplo guiado, realiza la práctica y responde las preguntas de repaso sin mirar la solución. Si una respuesta no queda clara, vuelve al punto de la explicación que describe el concepto y construye otro ejemplo.',
        'Al finalizar, utiliza la lista de comprobación para evaluar tu comprensión y completa el ejercicio integrador de cada tema. La referencia externa se ofrece como lectura complementaria; las lecciones de esta página no requieren visitarla.'
      ],
      lessons: topics.split('|').map((topic, index) => {
        const lesson = { t: topic.trim(), d: `Lección ${index + 1}: conceptos, ejemplo guiado y práctica original.`, m: 'Lección' };
        lesson.material = lessonMaterial({ title, category }, lesson, index);
        return lesson;
      }),
      sourceUrl: url,
      image: imageByCategory[category],
      videoSearch: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${title} curso tutorial`)}`,
      store: url,
      tags: [category],
      downloads: 0,
      platform: 'En línea',
      provider: 'Fuente educativa'
    };
  };

  SR.COURSES = [
    source('Hardware de ordenador', 'Informática 1', 'https://www.picuino.com/es/informatica-hardware-index.html', 'Conoce las piezas de un ordenador, sus funciones y cómo se relacionan.', 'Componentes principales|Placa base y procesador|Memoria y almacenamiento|Periféricos|Montaje y mantenimiento'),
    source('Software de ordenador', 'Informática 1', 'https://www.picuino.com/es/informatica-software-index.html', 'Comprende los tipos de software, el sistema operativo y las aplicaciones.', 'Conceptos de software|Sistemas operativos|Aplicaciones|Archivos y formatos|Instalación y actualización'),
    source('Curso de EducaMadrid', 'Informática 1', 'https://www.picuino.com/es/informatica-av-index.html', 'Recorrido por herramientas y recursos digitales para el aprendizaje.', 'Entorno de trabajo|Recursos educativos|Documentos y archivos|Actividades prácticas|Repaso'),
    source('Curso de Impress', 'Informática 1', 'https://www.picuino.com/es/informatica-tutoimpress.html', 'Crea presentaciones con diapositivas, imágenes y elementos visuales.', 'Primeros pasos|Diseño de diapositivas|Texto e imágenes|Transiciones y animaciones|Presentación final'),
    source('Curso de Calc', 'Informática 1', 'https://www.picuino.com/es/informatica-calc-index.html', 'Aprende hojas de cálculo, fórmulas, formatos y gráficos.', 'Interfaz y celdas|Datos y formatos|Fórmulas y funciones|Gráficos|Ejercicios prácticos'),
    source('Curso de Writer', 'Informática 1', 'https://www.picuino.com/es/informatica-calc-index.html', 'Domina la edición y presentación de documentos de texto.', 'Edición básica|Formato de texto|Párrafos y páginas|Tablas e imágenes|Guardar y exportar'),
    source('Curso de Writer 7', 'Informática 1', 'https://www.picuino.com/es/writer-index.html', 'Guía de Writer 7 para crear documentos claros y bien estructurados.', 'Interfaz de Writer|Estilos y formato|Imágenes y tablas|Índices y referencias|Impresión y exportación'),
    source('Curso de Gimp', 'Informática 1', 'https://www.picuino.com/es/informatica-tutogimp.html', 'Edición de imágenes con selecciones, capas, máscaras y filtros.', 'Interfaz y formatos|Selecciones|Capas y máscaras|Retoque y filtros|Exportar imágenes'),
    source('Curso de Inkscape', 'Informática 1', 'https://www.picuino.com/es/inkscape-index.html', 'Diseña ilustraciones vectoriales, formas, trazados y composiciones.', 'Lienzo y herramientas|Formas y trazados|Color y rellenos|Texto y composición|Exportación SVG'),
    source('Curso de HTML', 'Informática 1', 'https://www.picuino.com/es/html-index.html', 'Construye páginas web con estructura semántica HTML.', 'Estructura de una página|Etiquetas y atributos|Enlaces e imágenes|Listas y tablas|Proyecto web'),
    source('Curso de CSS', 'Informática 1', 'https://www.picuino.com/es/css-index.html', 'Da estilo a páginas web con selectores, diseño adaptable y componentes.', 'Selectores y cascada|Color y tipografía|Modelo de caja|Flexbox y Grid|Diseño adaptable'),
    source('Ciberseguridad', 'Informática 1', 'https://www.picuino.com/es/informatica-ciberseguridad-index.html', 'Buenas prácticas para proteger dispositivos, cuentas y datos.', 'Riesgos y amenazas|Contraseñas seguras|Privacidad y permisos|Fraudes y phishing|Copias de seguridad'),
    source('Inteligencia Artificial', 'Informática 1', 'https://www.picuino.com/es/informatica-machine-learning.html', 'Introducción a la inteligencia artificial y el aprendizaje automático.', 'Conceptos de IA|Datos y ejemplos|Aprendizaje automático|Evaluar resultados|Usos responsables'),
    source('Recursos para Informática', 'Informática 1', 'https://www.picuino.com/es/informatica-recursos.html', 'Colección de materiales y actividades para ampliar informática.', 'Guías y documentación|Actividades|Herramientas|Proyectos|Recursos de consulta'),
    source('Aprender Informática', 'Informática 2', 'https://www.areatecnologia.com/INFORMATICA.htm', 'Temas de informática explicados y organizados para el aprendizaje autónomo.', 'Conceptos básicos|Hardware y periféricos|Software y sistemas|Redes e Internet|Seguridad y mantenimiento'),

    source('Lenguajes de programación', 'Programación', 'https://www.picuino.com/es/prog-lang-edu.html', 'Conoce los lenguajes y conceptos que se usan para programar.', 'Algoritmos y programas|Lenguajes y sintaxis|Variables y datos|Instrucciones|Primeros ejercicios'),
    source('Diagramas de flujo', 'Programación', 'https://www.picuino.com/es/prog-flowchart.html', 'Representa algoritmos y resuelve problemas con diagramas de flujo.', 'Símbolos básicos|Secuencias|Decisiones|Repeticiones|Diseño de algoritmos'),
    source('Actividades desconectadas', 'Programación', 'https://www.picuino.com/es/prog-unplugged.html', 'Practica ideas de programación con actividades sin ordenador.', 'Instrucciones y secuencias|Patrones|Condiciones|Algoritmos en equipo|Retos'),
    source('Curso Code', 'Programación', 'https://www.picuino.com/es/prog-codeorg.html', 'Aprende programación con actividades visuales e interactivas.', 'Entorno y bloques|Secuencias|Bucles|Condicionales|Proyecto interactivo'),
    source('Curso Scratch 3', 'Programación', 'https://www.picuino.com/es/scratch3-index.html', 'Crea historias, animaciones y juegos con programación por bloques.', 'Escenario y personajes|Movimiento y eventos|Bucles y decisiones|Variables y mensajes|Juego o animación final'),
    source('Curso Python', 'Programación', 'https://www.picuino.com/es/python-index.html', 'Aprende Python con fundamentos, ejercicios y pequeños programas.', 'Instalación y entorno|Variables y expresiones|Condiciones y bucles|Funciones y colecciones|Proyecto práctico'),
    source('Recursos para Programación', 'Programación', 'https://www.picuino.com/es/prog-recursos.html', 'Material complementario para practicar algoritmos y programación.', 'Documentación|Entornos y herramientas|Ejercicios|Proyectos|Enlaces de consulta'),

    source('Circuitos con protoboard', 'Arduino', 'https://www.picuino.com/es/arduprog/protoboard-index.html', 'Monta circuitos electrónicos y prácticas usando una protoboard.', 'Materiales y seguridad|Conexiones en protoboard|LED y resistencias|Entradas y salidas|Prácticas guiadas'),
    source('Guía de Arduino', 'Arduino', 'https://www.picuino.com/es/arduprog/protoboard-guia.html', 'Guía para conectar componentes y empezar con proyectos Arduino.', 'Placa y entorno|Conexiones|Carga de programas|Lectura de sensores|Control de actuadores'),
    source('Recursos de Arduino', 'Arduino', 'https://www.picuino.com/es/arduprog/resource-index.html', 'Recursos, referencias y actividades para trabajar con Arduino.', 'Documentación de referencia|Librerías y herramientas|Ejemplos|Prácticas|Proyectos'),
    source('Conductímetro', 'Arduino', 'https://www.picuino.com/es/ardu-conduct-meter.html', 'Explora la conductividad eléctrica con un proyecto de medición.', 'Principio de conductividad|Diseño del circuito|Conexión de sensores|Lectura de datos|Pruebas y análisis'),
    source('Panel de control PC42', 'Arduino', 'https://www.picuino.com/es/arduprog/pc42-index.html', 'Construye prácticas de control usando el panel PC42.', 'Componentes del panel|Conexiones|Entradas y salidas|Programación|Ejercicios de control'),
    source('Ardublock', 'Arduino', 'https://www.picuino.com/es/arduprog/ardublock-index.html', 'Programa Arduino mediante un entorno visual basado en bloques.', 'Entorno Ardublock|Bloques y secuencias|Entradas y salidas|Control de componentes|Práctica final'),
    source('Shield Picuino UNO', 'Arduino', 'https://www.picuino.com/es/picuino-uno-index.html', 'Aprende a usar la shield Picuino UNO con prácticas progresivas.', 'Placa y conexiones|Actuadores|Sensores|Programación|Proyectos de aplicación'),

    source('Control de sistemas', 'Robótica', 'https://www.picuino.com/es/control-index.html', 'Introducción al control, las señales y los sistemas automáticos.', 'Sistema y variables|Entrada y salida|Realimentación|Respuesta del sistema|Ejemplos de control'),
    source('Actuadores', 'Robótica', 'https://www.picuino.com/es/control-actuator-index.html', 'Conoce actuadores que convierten señales en movimiento o acción.', 'Tipos de actuadores|Motores|Servos y mecanismos|Control y alimentación|Aplicaciones'),
    source('Sensores', 'Robótica', 'https://www.picuino.com/es/control-sensor-index.html', 'Estudia sensores, magnitudes físicas y adquisición de datos.', 'Magnitudes y sensores|Sensores digitales|Sensores analógicos|Lectura y calibración|Aplicaciones'),
    source('Micro:bit', 'Robótica', 'https://www.picuino.com/es/robotica-microbit-index.html', 'Crea proyectos de robótica y programación con micro:bit.', 'Placa y entorno|Entradas y sensores|Programación|Comunicación|Proyecto interactivo'),
    source('Recursos para Robótica', 'Robótica', 'https://www.picuino.com/es/robotica-recursos.html', 'Materiales, guías y proyectos para ampliar robótica educativa.', 'Guías de robótica|Componentes|Actividades|Proyectos|Recursos externos'),
    source('Robots actuales', 'Robótica', 'https://www.picuino.com/es/robotica-robots-actuales.html', 'Panorama de robots y aplicaciones en el mundo actual.', 'Qué es un robot|Sensores y actuadores|Robots industriales|Robots de servicio|Retos y aplicaciones'),

    source('Componentes electrónicos', 'Electrónica', 'https://www.picuino.com/es/electronic-components-index.html', 'Identifica componentes electrónicos y aprende para qué se utilizan.', 'Magnitudes eléctricas|Resistencias y condensadores|Diodos y LED|Transistores|Lectura de componentes'),
    source('Electrónica analógica', 'Electrónica', 'https://www.picuino.com/es/electronic-analog-index.html', 'Comprende señales y circuitos analógicos básicos.', 'Señales analógicas|Divisores y filtros|Amplificación|Medición|Circuitos prácticos'),
    source('Electrónica digital', 'Electrónica', 'https://www.picuino.com/es/electronic-digital-index.html', 'Explora lógica digital, puertas y circuitos combinacionales.', 'Números binarios|Puertas lógicas|Tablas de verdad|Circuitos combinacionales|Aplicaciones'),
    source('Cableado de componentes electrónicos', 'Electrónica', 'https://www.picuino.com/es/electronic-bornas-index.html', 'Aprende conexiones y cableado seguro de componentes electrónicos.', 'Herramientas y seguridad|Bornas y conductores|Preparación de cables|Conexiones|Verificación del montaje'),
    source('Circuito impreso con luces LED', 'Electrónica', 'https://www.picuino.com/es/electronic-pcb-luces-led.html', 'Diseña y monta una placa electrónica con luces LED.', 'Esquema del circuito|Componentes y polaridad|Diseño de placa|Montaje y soldadura|Prueba del circuito'),

    source('Señales de seguridad y salud', 'Taller de Tecnología', 'https://www.picuino.com/es/taller-seniales-seguridad.html', 'Identifica señales de seguridad y aplica normas de prevención en el taller.', 'Riesgos del taller|Señales y colores|Equipos de protección|Normas de trabajo|Actividad de identificación'),
    source('Tablas DIN A4', 'Taller de Tecnología', 'https://www.picuino.com/es/taller-tablero.html', 'Recurso práctico para organizar medidas, trazados y trabajo técnico.', 'Material y preparación|Lectura de medidas|Trazado|Comprobación|Aplicación práctica'),
    source('Robots Cucabot', 'Taller de Tecnología', 'https://www.picuino.com/es/cucabot-index.html', 'Construye y programa robots Cucabot con actividades paso a paso.', 'Materiales y montaje|Estructura del robot|Sensores y motores|Programación|Retos de movimiento'),
    source('Modelos de papel de figuras en 3D', 'Taller de Tecnología', 'https://www.picuino.com/es/taller-papercraft.html', 'Construye modelos tridimensionales de papel a partir de plantillas.', 'Plantillas y materiales|Corte y marcado|Pestañas y pliegues|Ensamblaje|Acabado del modelo'),
    source('Tangram', 'Taller de Tecnología', 'https://www.picuino.com/es/taller-tangram.html', 'Resuelve retos geométricos y crea figuras con las piezas del tangram.', 'Piezas y reglas|Figuras geométricas|Composición|Retos de siluetas|Diseños propios'),
    source('Teselados periódicos', 'Taller de Tecnología', 'https://www.picuino.com/es/taller-tesela-regular.html', 'Explora patrones periódicos y crea teselados con formas regulares.', 'Teselación y patrones|Polígonos regulares|Repetición y simetría|Construcción del diseño|Composición final'),
    source('Teselado del sombrero', 'Taller de Tecnología', 'https://www.picuino.com/es/taller-tesela-sombrero.html', 'Estudia y construye un teselado con la forma conocida como sombrero.', 'Forma y propiedades|Repetición de piezas|Encaje del patrón|Construcción|Exploración de diseños')
  ];

  SR.COURSES.sort((a, b) => a.category.localeCompare(b.category, 'es') || a.title.localeCompare(b.title, 'es'));
  const courseCategories = [...new Set(SR.COURSES.map((course) => course.category))];

  SR.COURSE_CATEGORIES = courseCategories;
  SR.COURSE_SOURCES = [...new Map(SR.COURSES.map((course) => {
    const url = new URL(course.sourceUrl);
    return [url.hostname, { label: url.hostname.replace(/^www\./, ''), href: `${url.protocol}//${url.hostname}/` }];
  })).values()].sort((a, b) => a.label.localeCompare(b.label, 'es'));

  SR.courseDownloadTotal = function () {
    const apps = SR.appsEngine ? SR.appsEngine.getAllApps() : (SR.ITEMS.apps || []);
    const allApps = apps.concat(SR.PLATFORM_APPS || []);
    return allApps.reduce((total, app) => total + (Number(app.downloadCount || app.downloads) || 0), 0);
  };

  const courseDetailView = function (course) {
    if (!course) return SR.views.notFound();
    const lessons = course.lessons.map((lesson, index) => `
      <li><button type="button" class="course-lesson-select${index === 0 ? ' is-active' : ''}" data-course-lesson="${index}" aria-pressed="${index === 0}">
        <span>${String(index + 1).padStart(2, '0')}</span><span class="course-lesson-title"><b>${SR.esc(lesson.t)}</b><small>${SR.esc(lesson.d)}</small></span>
        <span class="course-lesson-open">Abrir tema ${SR.icon('arrow')}</span></button></li>`).join('');
    const renderLesson = (index) => {
      const lesson = course.lessons[index];
      const material = lesson.material;
      const codeExample = lessonCodeExample(course);
      return `<article class="course-lesson-reader">
        <span class="course-eyebrow">LECCIÓN ${String(index + 1).padStart(2, '0')} · CONTENIDO ORIGINAL SOCIAL RED</span>
        <h4>${SR.esc(lesson.t)}</h4>
        <section><h5>Objetivo de aprendizaje</h5><p>${SR.esc(material.objective)}</p></section>
        <section><h5>Explicación</h5><p>${SR.esc(material.explanation)}</p><p>${SR.esc(material.context)}</p></section>
        <section class="course-worked-example"><h5>Ejemplo guiado</h5><p>${SR.esc(material.example)}</p></section>
        <div class="course-lesson-diagram" role="img" aria-label="${material.diagram.map(SR.esc).join(' → ')}">
          ${material.diagram.map((label, step) => `<span><small>${step + 1}</small><b>${SR.esc(label)}</b></span>`).join('')}
        </div>
        ${codeExample ? `<section class="course-code-example"><h5>${SR.esc(codeExample.label)}</h5><pre><code>${SR.esc(codeExample.code)}</code></pre></section>` : ''}
        <section><h5>Procedimiento recomendado</h5><ol>${material.steps.map((step) => `<li>${SR.esc(step)}</li>`).join('')}</ol></section>
        <section class="course-lesson-exercise"><b>Práctica</b><p>${SR.esc(material.practice)}</p></section>
        <section><h5>Comprueba lo aprendido</h5><ul class="course-review-list">${material.review.map((question) => `<li>${SR.esc(question)}</li>`).join('')}</ul></section>
        <section><h5>Lista de comprobación</h5><ul class="course-review-list">${material.checklist.map((check) => `<li>${SR.esc(check)}</li>`).join('')}</ul></section>
        <p class="course-source-note">Lección redactada originalmente para Social Red. <a href="${SR.esc(course.sourceUrl)}" target="_blank" rel="noopener noreferrer">Abrir la referencia opcional</a>; no es necesaria para completar el tema.</p>
      </article>`;
    };
    return {
      title: course.title,
      view: 'course-detail',
      theme: 'light',
      accent: 'cursos',
      html: `<article class="course-page">
        <div class="course-detail">
        <header class="course-detail-hero" style="--course-art:url('${SR.esc(course.image)}')">
          <span class="course-detail-label">${SR.esc(course.category)} · CURSO AUTÓNOMO SOCIAL RED</span>
          <h2>${SR.esc(course.title)}</h2>
          <p>${SR.esc(course.short)}</p>
          <div class="course-detail-actions"><span class="course-learning-badge">${course.lessons.length} lecciones · 100% en esta página</span></div>
          <a class="course-back-link" href="#/cursos">← Volver al catálogo</a>
        </header>
        <div class="course-detail-content">
          <section><span class="course-eyebrow">DESCRIPCIÓN GENERAL</span><h3>Sobre este curso</h3><p>${SR.esc(course.intro)}</p><p>${SR.esc(teachingDomains[course.category].principle)}</p></section>
          <section class="course-detail-media">
            <img src="${SR.esc(course.image)}" alt="Imagen temática: ${SR.esc(course.category)}" loading="lazy">
            <div><span class="course-eyebrow">RECURSO VISUAL</span><h3>Explora y practica</h3>
              <p>Ilustración temática del área. Cada tema incluye además un esquema explicativo, ejemplos guiados, actividades y preguntas de repaso originales dentro de esta ficha.</p>
            </div>
          </section>
              <section class="course-open-media">
                <div class="course-media-heading"><div><span class="course-eyebrow">RECURSOS CON LICENCIA ABIERTA</span><h3>Imágenes y videos del tema</h3></div>
                  <span>Wikimedia Commons · CC / Dominio público</span></div>
                <div class="course-media-gallery" id="courseImageGallery"><p class="course-media-status" role="status">Buscando imágenes abiertas relacionadas…</p></div>
                <div class="course-video-gallery" id="courseVideoGallery"><p class="course-media-status" role="status">Buscando videos educativos con licencia abierta…</p></div>
                <p class="course-media-credit">Los recursos se cargan desde Wikimedia Commons y muestran su página de archivo y licencia para facilitar atribución y verificación.</p>
              </section>
              <section><span class="course-eyebrow">RUTA DE APRENDIZAJE</span><h3>Selecciona un tema para estudiarlo aquí</h3>
            <div class="course-learning-layout">
              <ol class="course-lesson-list">${lessons}</ol>
              <div id="courseLessonPanel">${renderLesson(0)}</div>
            </div>
          </section>
          <p class="course-source-note">Contenido de aprendizaje original desarrollado para Social Red. Puedes consultar como lectura complementaria la fuente indicada en el catálogo, pero no es necesaria para seguir el curso.</p>
        </div>
        </div>
      </article>`,
      mount(root) {
      const lessonList = SR.$('.course-lesson-list', root);
      const panel = SR.$('#courseLessonPanel', root);
      const renderMedia = (host, media, kind) => {
        if (!media.length) {
          host.innerHTML = `<p class="course-media-status">No se encontraron ${kind === 'video' ? 'videos' : 'imágenes'} con licencia abierta para esta búsqueda. La ilustración temática y las lecciones continúan disponibles.</p>`;
          return;
        }
        host.innerHTML = media.slice(0, 4).map((item) => {
          if (kind === 'video') {
            const mime = /\.webm(?:[?#]|$)/i.test(item.url) ? 'video/webm'
              : /\.ogv(?:[?#]|$)/i.test(item.url) ? 'video/ogg'
                : item.mime.startsWith('video/') ? item.mime : 'video/mp4';
            return `<article class="course-video-card">
              <video controls preload="none" poster="${SR.esc(item.thumbnail)}" aria-label="${SR.esc(item.title)}"><source src="${SR.esc(item.url)}" type="${SR.esc(mime)}">Tu navegador no puede reproducir este video.</video>
              <div><b>${SR.esc(item.title)}</b><small>${SR.esc(item.license)}</small><a href="${SR.esc(item.source)}" target="_blank" rel="noopener noreferrer">Créditos y licencia</a></div>
            </article>`;
          }
          return `<a class="course-open-image" href="${SR.esc(item.source)}" target="_blank" rel="noopener noreferrer">
            <img src="${SR.esc(item.thumbnail)}" alt="${SR.esc(item.title)}" loading="lazy"><span>${SR.esc(item.title)}</span><small>${SR.esc(item.license)}</small>
          </a>`;
        }).join('');
      };
      const loadMedia = async (hostId, kind) => {
        const host = SR.$(`#${hostId}`, root);
        try {
          const media = await loadCommonsMedia(`${course.title} ${course.category}`, kind);
          if (!document.body.contains(host)) return;
          renderMedia(host, media, kind);
        } catch (error) {
          console.error(`No se pudieron cargar ${kind} abiertos para ${course.title}:`, error);
          if (document.body.contains(host)) host.innerHTML = `<p class="course-media-status">No se pudieron cargar ${kind === 'video' ? 'videos' : 'imágenes'} ahora. Puedes continuar con las lecciones locales.</p>`;
        }
      };
      loadMedia('courseImageGallery', 'bitmap');
      loadMedia('courseVideoGallery', 'video');
      lessonList.addEventListener('click', (event) => {
        const button = event.target.closest('[data-course-lesson]');
        if (!button) return;
        const index = Number(button.dataset.courseLesson);
        if (!Number.isInteger(index) || !course.lessons[index]) return;
        SR.$$('.course-lesson-select', lessonList).forEach((item) => {
          const active = item === button;
          item.classList.toggle('is-active', active);
          item.setAttribute('aria-pressed', String(active));
        });
        panel.innerHTML = renderLesson(index);
      });
      }
    };
  };

  SR.coursesCatalogView = function ({ query = {}, courseId = '' } = {}) {
    if (courseId) return courseDetailView(SR.COURSES.find((course) => course.id === courseId));
    const selectedCategory = query.category || '';
    const featured = courseCategories.map((category) => SR.COURSES.find((course) => course.category === category)).slice(0, 5);
    const categoriesMarkup = courseCategories.map((category, index) => `
      <button class="course-category-card" type="button" data-course-category="${SR.esc(category)}">
        <span>${SR.icon(['app', 'book', 'code', 'cpu', 'bolt', 'layers', 'pen'][index] || 'book')}</span>
        <b>${SR.esc(category)}</b><small>${SR.COURSES.filter((course) => course.category === category).length} cursos</small>
      </button>`).join('');

    return {
      title: 'Cursos', view: 'courses', theme: 'dark', accent: 'cursos',
      html: `
        <section class="courses-hub">
          <div class="courses-hero">
            <div class="courses-hero-inner container">
              <div class="courses-hero-copy">
                <span class="courses-badge">${SR.icon('star')} APRENDE A TU RITMO</span>
                <h1>Aprende hoy.<br><strong>Construye el futuro.</strong></h1>
                <p>Explora cursos de informática, programación, electrónica, Arduino, robótica y tecnología práctica.</p>
                <div class="courses-hero-actions"><a class="btn btn-accent" href="#courseCatalog">Explorar cursos ${SR.icon('arrow')}</a>
                  <a class="btn courses-outline" href="#coursePrograms">Ver áreas de aprendizaje</a></div>
                <div class="courses-hero-proof"><span>${SR.icon('book')} ${SR.COURSES.length} rutas de aprendizaje</span><span>${SR.icon('globe')} Fuentes educativas enlazadas</span></div>
              </div>
              <div class="courses-hero-art" style="--course-art:url('${SR.esc(imageByCategory.Programación)}')">
                <span class="courses-float courses-float-top">${SR.icon('shield')} Recursos de referencia</span>
                <span class="courses-float courses-float-bottom">${SR.icon('play')} Guías y prácticas</span>
              </div>
            </div>
          </div>
          <div class="courses-trust container">
            ${['Aprendizaje por pasos', 'Material de fuentes originales', 'Temas para todos los niveles', 'Acceso libre a las referencias'].map((text, index) => `
              <div><span>${SR.icon(['user', 'star', 'code', 'clock'][index])}</span><b>${text}</b><small>${['Rutas organizadas', 'Contenido actualizado en origen', 'Desde fundamentos a proyectos', 'Enlaces directos al autor'][index]}</small></div>`).join('')}
          </div>
          <div class="courses-main container">
            <section class="courses-section" aria-labelledby="courseFeaturedTitle">
              <div class="courses-section-heading"><div><span class="courses-eyebrow">EMPIEZA POR AQUÍ</span><h2 id="courseFeaturedTitle">Cursos destacados</h2></div>
                <a href="#courseCatalog">Ver todos ${SR.icon('arrow')}</a></div>
              <div class="courses-feature-grid">${featured.map((course) => `
                <a class="courses-feature-card" href="#/cursos/${encodeURIComponent(course.id)}" target="_blank" rel="noopener noreferrer" style="--course-image:url('${SR.esc(course.image)}')">
                  <span class="courses-feature-art"></span><span class="courses-feature-content"><small>${SR.esc(course.category)}</small><b>${SR.esc(course.title)}</b><span>${SR.esc(course.short)}</span><i>Ver curso ${SR.icon('arrow')}</i></span>
                </a>`).join('')}
              </div>
            </section>
            <section class="courses-section" id="coursePrograms">
              <div class="courses-section-heading"><div><span class="courses-eyebrow">APRENDE POR ÁREAS</span><h2>Programas y categorías</h2></div></div>
              <div class="course-categories">${categoriesMarkup}</div>
            </section>
            <section class="courses-section" id="courseCatalog">
              <div class="courses-section-heading courses-catalog-heading"><div><span class="courses-eyebrow">CATÁLOGO EDUCATIVO</span><h2>Encuentra tu próximo curso</h2></div>
                <label class="courses-search">${SR.icon('search')}<input id="coursesSearch" type="search" placeholder="Buscar cursos o temas" autocomplete="off"></label>
              </div>
              <div class="courses-filters" id="coursesFilters">
                <button type="button" data-course-category="" class="${selectedCategory ? '' : 'is-active'}">Todos</button>
                ${courseCategories.map((category) => `<button type="button" data-course-category="${SR.esc(category)}" class="${selectedCategory === category ? 'is-active' : ''}">${SR.esc(category)}</button>`).join('')}
              </div>
              <div class="courses-grid" id="coursesGrid"></div>
              <p class="courses-empty" id="coursesEmpty" hidden>No hay cursos que coincidan con la búsqueda.</p>
            </section>
            <section class="courses-stats">
              <div><b>${SR.COURSES.length}</b><small>Cursos organizados</small></div>
              <div><b>${courseCategories.length}</b><small>Áreas de aprendizaje</small></div>
              <div><b>N/D</b><small>Calificaciones verificadas</small></div>
              <div><b>${SR.fmtNum(SR.courseDownloadTotal())}</b><small>Descargas registradas en aplicaciones del catálogo</small></div>
            </section>
            <p class="courses-catalog-note">Los cursos enlazan a materiales de terceros. Sus autores controlan el temario, los medios y las actualizaciones; las fuentes listadas no ofrecen un feed común para sincronizar automáticamente su catálogo. El contador de descargas corresponde a las cifras del catálogo local de aplicaciones, no a descargas de cursos.</p>
          </div>
        </section>`,
      mount(root) {
        const grid = SR.$('#coursesGrid', root);
        const search = SR.$('#coursesSearch', root);
        const empty = SR.$('#coursesEmpty', root);
        let category = selectedCategory;
        const draw = () => {
          const term = SR.norm(search.value.trim());
          const list = SR.COURSES.filter((course) =>
            (!category || course.category === category) &&
            (!term || SR.norm([course.title, course.short, course.category, course.lessons.map((lesson) => lesson.t).join(' ')].join(' ')).includes(term)));
          grid.innerHTML = list.map((course) => `
            <article class="course-tile">
              <a class="course-tile-art" href="#/cursos/${encodeURIComponent(course.id)}" target="_blank" rel="noopener noreferrer" style="--course-image:url('${SR.esc(course.image)}')">
                <span>${SR.esc(course.category)}</span><b>${SR.icon(course.icon)}</b>
              </a>
              <div class="course-tile-info"><small>${SR.esc(course.category)}</small><h3>${SR.esc(course.title)}</h3>
                <p>${SR.esc(course.short)}</p><div><span>${course.lessons.length} temas</span><a href="#/cursos/${encodeURIComponent(course.id)}" target="_blank" rel="noopener noreferrer">Ver curso ${SR.icon('arrow')}</a></div>
              </div>
            </article>`).join('');
          empty.hidden = list.length > 0;
          SR.$$('#coursesFilters button', root).forEach((button) => button.classList.toggle('is-active', button.dataset.courseCategory === category));
        };
        draw();
        search.addEventListener('input', SR.debounce(draw, 120));
        root.addEventListener('click', (event) => {
          const categoryButton = event.target.closest('[data-course-category]');
          if (categoryButton) {
            category = categoryButton.dataset.courseCategory;
            draw();
            if (categoryButton.closest('.course-category-card')) SR.$('#courseCatalog', root).scrollIntoView({ behavior: SR.reducedMotion() ? 'auto' : 'smooth' });
            return;
          }
        });
      }
    };
  };
})();
