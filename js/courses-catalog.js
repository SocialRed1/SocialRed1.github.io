/* ==========================================================
   Social Red — catálogo y fichas de cursos externos
   ========================================================== */
window.SR = window.SR || {};

(() => {
  // P0 (2026-11-12): data.js se carga antes que este archivo y definia 6 cursos
  // detallados en SR.COURSES. Se capturan aqui ANTES de sobrescribir el catalogo
  // para fusionarlos despues sin perder sus campos (level, rating, hours, videos,
  // intro, body y lecciones con duracion m: '09:12').
  const detailedCourses = Array.isArray(SR.COURSES) ? SR.COURSES.slice() : [];

  const imageByCategory = {
    'Informática 1': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85',
    'Informática 2': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85',
    Programación: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=85',
    Arduino: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=1400&q=85',
    Robótica: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1400&q=85',
    Electrónica: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85',
    'Taller de Tecnología': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=85',
    Diseño: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1400&q=85',
    Sistemas: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1400&q=85',
    Seguridad: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=85'
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
    },
    Diseño: {
      principle: 'Una buena interfaz se entiende sin explicaciones: la jerarquía guía la mirada, el color comunica significado, la tipografía ordena el contenido y el espacio en blanco da aire a cada elemento. Pocas reglas aplicadas con constancia bastan para lograr un resultado profesional.',
      example: 'En una pantalla de inicio de sesión, el título dice qué hacer, el campo activo resalta, el botón principal destaca por color y el enlace secundario queda discreto. Nada compite con la acción principal.',
      method: ['Define qué debe hacer la persona en esta pantalla.', 'Ordena los elementos por importancia antes de darles estilo.', 'Elige una paleta y una escala tipográfica y mantenlas en todo el proyecto.', 'Revisa contraste, espaciado y legibilidad en móvil y escritorio.'],
      checklist: ['¿Queda claro a primera vista qué hacer en la pantalla?', '¿Los colores y tamaños siguen un sistema coherente?', '¿El texto se lee bien y los botones son fáciles de encontrar?'],
      diagram: ['Jerarquía', 'Color y tipografía', 'Componentes']
    },
    Sistemas: {
      principle: 'Un sistema operativo organiza archivos, usuarios, permisos y programas sobre el hardware. Entender esa organización —dónde vive cada cosa, quién puede cambiarla y cómo se instala el software— es la base para usar cualquier sistema con confianza.',
      example: 'Al instalar un programa desde los repositorios oficiales, el gestor descarga el paquete, verifica su origen, lo coloca en las rutas del sistema y registra cómo desinstalarlo o actualizarlo después.',
      method: ['Identifica qué quieres lograr y qué parte del sistema interviene.', 'Practica primero en un entorno seguro, como una máquina virtual.', 'Anota cada comando o cambio para poder repetirlo o revertirlo.', 'Verifica el resultado antes de pasar al siguiente paso.'],
      checklist: ['¿Sabes dónde quedó instalado y cómo desinstalarlo?', '¿Comprobaste permisos y copias de seguridad?', '¿Puedes repetir el procedimiento sin la guía?'],
      diagram: ['Instalación', 'Configuración', 'Uso diario']
    },
    Seguridad: {
      principle: 'La seguridad digital se basa en hábitos más que en herramientas complicadas: contraseñas únicas gestionadas con un gestor, verificación en dos pasos, actualizaciones al día y copias de seguridad verificadas. La mayoría de los ataques aprovechan descuidos, no fallas técnicas complejas.',
      example: 'Ante un mensaje urgente que pide iniciar sesión, no abras su enlace. Visita manualmente el sitio conocido y revisa desde allí si existe una notificación real.',
      method: ['Haz inventario de tus cuentas importantes y su nivel de protección.', 'Activa la verificación en dos pasos empezando por el correo principal.', 'Guarda una copia de seguridad y comprueba que se puede restaurar.', 'Ante cualquier duda, verifica por un canal conocido antes de actuar.'],
      checklist: ['¿Tus cuentas clave tienen verificación en dos pasos?', '¿Tienes una copia de seguridad reciente y comprobada?', '¿Sabes qué hacer si una cuenta se ve comprometida?'],
      diagram: ['Prevenir', 'Proteger', 'Recuperar']
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
    const detail = course._detail || null;
    const detailLesson = detail && Array.isArray(detail.lessons) ? detail.lessons[index] : null;
    if (detail && detailLesson) {
      return {
        objective: `Al terminar este tema podrás explicar «${lesson.t}» y aplicarlo en un ejercicio concreto relacionado.`,
        explanation: detailLesson.ex,
        context: detail.context || domain.principle,
        example: detailLesson.eg,
        practice: detailLesson.pr,
        steps: detail.method || domain.method,
        checklist: detail.checklist || domain.checklist,
        diagram: detail.diagram || domain.diagram,
        review: [
          `¿Cómo explicarías «${lesson.t}» con tus propias palabras?`,
          `¿Qué ejemplo concreto demuestra que dominas «${lesson.t}»?`,
          '¿Qué comprobarías antes de dar el tema por terminado?'
        ],
        number: index + 1
      };
    }
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
    // 2026-11-12: reescritura detallada. COURSE_DETAILS (arriba) guarda por
    // título el nivel real, horas, intro y cuerpo propios, método/checklist/
    // diagrama propios de cada curso, imagen propia verificada y 5 lecciones
    // reales con duración m: 'mm:ss' y material concreto (ex/eg/pr y, donde
    // aplica, un ejemplo de código por lección). Sin detalle, se mantiene el
    // comportamiento anterior de plantilla.
    const detail = COURSE_DETAILS[title] || null;
    const slug = title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const lessons = detail
      ? detail.lessons.map((dl, index) => {
          const lesson = { t: dl.t, d: dl.d, m: dl.m };
          if (dl.code) lesson.code = dl.code;
          lesson.material = lessonMaterial({ title, category, _detail: detail }, lesson, index);
          return lesson;
        })
      : topics.split('|').map((topic, index) => {
          const lesson = { t: topic.trim(), d: `Lección ${index + 1}: conceptos, ejemplo guiado y práctica original.`, m: 'Lección' };
          lesson.material = lessonMaterial({ title, category }, lesson, index);
          return lesson;
        });
    return {
      id: `curso-${slug}`,
      title,
      short: summary,
      category,
      level: detail ? detail.level : 'Autoguiado',
      rating: null,
      hours: detail ? detail.hours : null,
      videos: 0,
      hue: ({ 'Informática 1': 220, 'Informática 2': 210, Programación: 265, Arduino: 175, Robótica: 285, Electrónica: 195, 'Taller de Tecnología': 32 })[category],
      icon: category === 'Programación' ? 'code' : category === 'Robótica' ? 'cpu' : category === 'Informática 1' || category === 'Informática 2' ? 'app' : 'bolt',
      author: 'Equipo educativo Social Red',
      intro: detail ? detail.intro : summary,
      body: detail ? detail.body : [
        `Este curso de ${title} está redactado para Social Red como una ruta de aprendizaje autónoma. Cada lección presenta una idea central, la conecta con conceptos previos y muestra cómo reconocerla en una situación concreta.`,
        'Trabaja en orden: estudia la explicación, sigue el ejemplo guiado, realiza la práctica y responde las preguntas de repaso sin mirar la solución. Si una respuesta no queda clara, vuelve al punto de la explicación que describe el concepto y construye otro ejemplo.',
        'Al finalizar, utiliza la lista de comprobación para evaluar tu comprensión y completa el ejercicio integrador de cada tema. La referencia externa se ofrece como lectura complementaria; las lecciones de esta página no requieren visitarla.'
      ],
      isDetailed: Boolean(detail),
      lessons,
      sourceUrl: url,
      image: detail && detail.image ? detail.image : imageByCategory[category],
      videoSearch: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${title} curso tutorial`)}`,
      store: url,
      tags: [category],
      downloads: 0,
      platform: 'En línea',
      provider: 'Fuente educativa'
    };
  };
const COURSE_DETAILS = {
  'Hardware de ordenador': {
    level: 'Principiante', hours: 4,
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1400&q=85',
    intro: 'Aprende a reconocer cada pieza de un ordenador, qué hace y cómo se conecta con las demás, para entender, elegir y mantener tu propio equipo.',
    body: ['Un ordenador no es una caja misteriosa: es un conjunto de piezas con funciones claras. El procesador calcula, la memoria guarda lo inmediato, el almacenamiento conserva los archivos y los periféricos comunican con el mundo exterior. Cuando entiendes ese reparto, diagnosticar un equipo lento o elegir uno nuevo deja de ser adivinar.',
      'En este curso abrirás —al menos en el papel y en la práctica guiada— cada parte del sistema: verás cómo la placa base une todos los componentes, por qué la memoria RAM se vacía al apagar y qué diferencia hay entre un disco duro y un SSD. Terminarás sabiendo montar un equipo básico y mantenerlo limpio y actualizado.'],
    context: 'Cada pieza tiene una función y un límite: si el procesador es rápido pero la memoria es escasa, el equipo se atasca igual. El rendimiento real depende del equilibrio entre todas las partes.',
    method: ['Identifica la pieza y su función antes de tocar nada.', 'Sigue el recorrido de los datos: entrada, proceso y salida.', 'Compara especificaciones reales: capacidad, velocidad y compatibilidad.', 'Comprueba el resultado con una prueba sencilla antes de cerrar el equipo.'],
    checklist: ['¿Distingues CPU, RAM, almacenamiento y placa base?', '¿Sabes qué pieza limita el rendimiento en cada caso?', '¿Puedes explicar cómo se conectan las piezas entre sí?'],
    diagram: ['Entrada', 'Procesamiento', 'Salida'],
    lessons: [
      { t: 'Componentes principales', d: 'CPU, memoria, almacenamiento y placa base: qué hace cada uno.', m: '11:20',
        ex: 'La CPU ejecuta las instrucciones de los programas, la memoria RAM guarda los datos que se usan en ese momento, el almacenamiento conserva los archivos sin electricidad y la placa base conecta todo. Ninguna pieza trabaja sola: un programa se carga del almacenamiento a la RAM y la CPU lo ejecuta instrucción a instrucción.',
        eg: 'Un procesador de 4 núcleos a 3,2 GHz con 8 GB de RAM y un SSD de 256 GB abre un navegador con diez pestañas sin atascarse; el mismo procesador con solo 2 GB de RAM se queda sin memoria y empieza a usar el disco como apoyo, mucho más lento.',
        pr: 'Busca la ficha técnica de un ordenador que conozcas y anota su procesador, su RAM y su almacenamiento. Escribe en una frase qué hace cada uno cuando abres un documento.' },
      { t: 'Placa base y procesador', d: 'Socket, chipset y compatibilidad: por qué no todo encaja con todo.', m: '10:45',
        ex: 'La placa base es el circuito que une procesador, memoria, almacenamiento y periféricos. El socket define qué procesadores encajan físicamente y el chipset define qué funciones soporta la placa: número de puertos USB, ranuras de memoria o discos NVMe.',
        eg: 'Un procesador de socket AM5 solo encaja en placas AM5; intentar colocarlo en una placa AM4 no solo no funciona, sino que puede doblar los pines. Antes de comprar, se comprueba socket, generación de RAM (DDR4 o DDR5) y potencia de la fuente.',
        pr: 'Elige un procesador y una placa base de un catálogo en línea y comprueba que el socket coincide y que la placa admite el tipo de RAM que quieres usar.' },
      { t: 'Memoria y almacenamiento', d: 'RAM frente a disco: velocidad, capacidad y qué se pierde al apagar.', m: '12:10',
        ex: 'La RAM es rápida y volátil: guarda los programas abiertos y se vacía al apagar. El almacenamiento es persistente pero más lento: un disco duro mecánico (HDD) lee a unos 120 MB/s, un SSD SATA a unos 550 MB/s y un SSD NVMe puede superar los 3.000 MB/s. Por eso el sistema arranca mucho antes con SSD.',
        eg: 'Editar un video de 2 GB con 4 GB de RAM obliga al sistema a mover datos continuamente entre RAM y disco; con 16 GB el video cabe en memoria y la edición es fluida. Guardar el proyecto en el SSD, no en el HDD, acelera cada apertura.',
        pr: 'Comprueba cuánta RAM tiene tu equipo y cuánto almacenamiento libre queda. Decide qué dos archivos grandes moverías a un respaldo para liberar espacio.' },
      { t: 'Periféricos', d: 'Entrada, salida y mixtos: teclado, monitor, impresora y más.', m: '09:35',
        ex: 'Los periféricos de entrada convierten acciones en datos (teclado, ratón, micrófono, escáner) y los de salida convierten datos en algo perceptible (monitor, altavoces, impresora). Algunos, como una pantalla táctil o unos auriculares con micrófono, hacen ambas cosas.',
        eg: 'Un teclado se conecta por USB o Bluetooth y envía códigos de tecla; el monitor recibe la señal de video por HDMI o DisplayPort y muestra la imagen que genera la tarjeta gráfica. Si el monitor no enciende, se comprueba primero el cable y la entrada seleccionada.',
        pr: 'Clasifica cinco dispositivos de tu entorno en entrada, salida o mixtos, y anota por qué conexión se unen al equipo (USB, HDMI, Bluetooth o wifi).' },
      { t: 'Montaje y mantenimiento', d: 'Abrir un equipo con seguridad, limpiar y comprobar que todo funciona.', m: '13:05',
        ex: 'Montar un equipo exige orden y seguridad: trabajar con el equipo desconectado, descargar la electricidad estática tocando una superficie metálica, colocar cada componente en su ranura sin forzar y conectar la alimentación al final. El mantenimiento básico es limpiar el polvo de los ventiladores y revisar temperaturas.',
        eg: 'Un ventilador obstruido por polvo puede subir la temperatura de la CPU de 45 °C a más de 90 °C y el equipo se apaga solo para protegerse. Limpiarlo con aire comprimido, con el equipo apagado y desconectado, suele devolver las temperaturas a valores normales.',
        pr: 'Escribe la secuencia de pasos para cambiar la memoria RAM de un equipo de sobremesa: qué desconectas, cómo abres la caja, cómo liberas los clips y cómo compruebas después que el sistema reconoce la nueva memoria.' }
    ]
  },
  'Software de ordenador': {
    level: 'Principiante', hours: 3,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1400&q=85',
    intro: 'Comprende los tipos de software, qué hace el sistema operativo y cómo elegir, instalar y mantener aplicaciones sin riesgos.',
    body: ['Todo lo que hace un ordenador lo hace mediante software: el sistema operativo gestiona el hardware y las aplicaciones resuelven tareas concretas. Distinguir entre ambos, y entre software libre, gratuito y de pago, es la base para usar un equipo con criterio.',
      'Verás cómo se organizan los archivos y sus formatos, por qué un documento puede abrirse en un equipo y no en otro, y qué comprobar antes de instalar cualquier programa: su origen, los permisos que pide y cómo desinstalarlo después.'],
    context: 'El sistema operativo administra recursos —procesador, memoria, archivos y periféricos— y ofrece servicios a las aplicaciones. Sin él, cada programa tendría que hablar directamente con el hardware.',
    method: ['Define qué necesitas hacer antes de buscar un programa.', 'Comprueba el origen, la compatibilidad y los permisos que pide.', 'Instala desde fuentes confiables y verifica que funciona.', 'Anota cómo actualizarlo y cómo desinstalarlo.'],
    checklist: ['¿Distingues sistema operativo, aplicación y archivo?', '¿Sabes qué formato elegir para compartir un documento?', '¿Puedes instalar y desinstalar un programa de forma segura?'],
    diagram: ['Sistema operativo', 'Aplicaciones', 'Archivos del usuario'],
    lessons: [
      { t: 'Conceptos de software', d: 'Qué es el software y cómo se clasifica: sistema, aplicación y utilidades.', m: '09:50',
        ex: 'El software de sistema (como Windows, Linux o macOS) gestiona el hardware; el software de aplicación (navegador, editor de texto, videojuego) resuelve tareas del usuario; las utilidades (antivirus, compresores) mantienen el equipo. Un mismo equipo combina los tres niveles.',
        eg: 'Al escribir un documento usas tres capas a la vez: el sistema operativo guarda el archivo en el disco, el procesador de textos te deja editarlo y el controlador de la impresora traduce el documento para imprimirlo.',
        pr: 'Haz una lista de cinco programas que uses y clasifica cada uno como software de sistema, aplicación o utilidad.' },
      { t: 'Sistemas operativos', d: 'Windows, macOS y Linux: qué los distingue y cómo elegir.', m: '11:15',
        ex: 'Un sistema operativo gestiona el procesador, la memoria, los archivos y los periféricos, y ofrece una interfaz para trabajar. Windows domina el escritorio y los juegos, macOS está integrado con el hardware de Apple y Linux es libre, ligero y muy usado en servidores y educación.',
        eg: 'Un equipo antiguo con 2 GB de RAM funciona con dificultad en Windows 11, pero puede rendir bien con una distribución ligera de Linux como Lubuntu. La elección depende del hardware, de los programas que necesitas y de tu comodidad.',
        pr: 'Compara los requisitos mínimos de dos sistemas operativos y decide cuál instalarías en un equipo de 4 GB de RAM y por qué.' },
      { t: 'Aplicaciones', d: 'Navegadores, ofimática, multimedia: elegir la herramienta adecuada.', m: '10:05',
        ex: 'Cada tarea tiene herramientas adecuadas: un navegador para la web, una suite ofimática para documentos, un editor para imágenes. Elegir bien evita instalar programas pesados para tareas simples y reduce riesgos de seguridad.',
        eg: 'Para recortar una imagen no hace falta instalar un editor profesional: muchas tareas se resuelven con la herramienta de recorte del sistema o un editor en línea. Para editar video en serio, en cambio, sí conviene un programa dedicado.',
        pr: 'Elige una tarea (por ejemplo, hacer un cartel) y compara dos aplicaciones que la resuelvan: anota qué ofrece cada una y cuál elegirías.' },
      { t: 'Archivos y formatos', d: 'Extensiones, formatos abiertos y cómo compartir sin sorpresas.', m: '10:40',
        ex: 'Cada archivo tiene un formato que indica cómo está guardado: .docx y .odt para texto editable, .pdf para compartir con aspecto fijo, .jpg para fotos y .png para imágenes con transparencia. El formato decide con qué programas se abre y qué se conserva.',
        eg: 'Si envías un documento .docx a alguien que no tiene ese procesador, puede verse distinto; exportarlo a PDF conserva el aspecto exacto, pero ya no es editable. Guardar siempre una copia en el formato editable evita rehacer el trabajo.',
        pr: 'Toma tres archivos de tu equipo, anota su extensión y su formato, y decide en qué formato los compartirías con otra persona y por qué.' },
      { t: 'Instalación y actualización', d: 'Instalar desde fuentes confiables, actualizar y desinstalar sin dejar restos.', m: '11:30',
        ex: 'Instalar software debe hacerse desde la web oficial del editor, la tienda del sistema o los repositorios oficiales. Antes de instalar se comprueba la compatibilidad, el espacio libre y los permisos que pide; después, se mantiene actualizado, porque las actualizaciones corrigen fallos de seguridad.',
        eg: 'Un instalador descargado de un sitio de dudosa reputación puede incluir programas adicionales no deseados. La señal de alerta típica es que el instalador ofrezca "instalación rápida" con casillas marcadas para añadir barras de herramientas.',
        pr: 'Escribe una lista de verificación de cinco puntos para instalar una aplicación nueva y aplícala a un programa que quieras instalar.' }
    ]
  },
  'Curso de EducaMadrid': {
    level: 'Principiante', hours: 3,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=85',
    intro: 'Recorrido por las herramientas y recursos digitales de un entorno educativo: aula virtual, documentos, entregas y organización del aprendizaje.',
    body: ['Un entorno educativo digital reúne en un solo lugar las clases, los materiales, las tareas y la comunicación con el profesorado. Saber moverse por él —dónde está cada recurso, cómo entregar una actividad y cómo revisar una calificación— ahorra tiempo y evita errores.',
      'Este curso sigue el flujo real de un estudiante: entrar al entorno, localizar sus cursos, trabajar con documentos, entregar actividades en plazo y repasar lo aprendido con los recursos disponibles.'],
    context: 'La plataforma educativa organiza el aprendizaje: cada curso tiene sus materiales, sus actividades y sus fechas. El estudiante que conoce esa organización encuentra todo sin depender de que alguien se lo recuerde.',
    method: ['Entra al entorno y localiza tus cursos y sus fechas clave.', 'Descarga y organiza los materiales por asignatura.', 'Trabaja la actividad y entrégala por el canal indicado.', 'Revisa la retroalimentación y anota qué mejorar.'],
    checklist: ['¿Sabes dónde están tus cursos, tareas y calificaciones?', '¿Tienes tus materiales organizados por asignatura?', '¿Conoces el plazo y el formato de cada entrega?'],
    diagram: ['Acceso', 'Materiales', 'Entrega y revisión'],
    lessons: [
      { t: 'Entorno de trabajo', d: 'Acceso, panel principal y cómo orientarse en la plataforma.', m: '09:20',
        ex: 'El entorno educativo se abre con las credenciales del centro: usuario y contraseña. El panel principal muestra los cursos matriculados, los avisos recientes y el calendario con las fechas de entrega. Personalizar el perfil y revisar los avisos al entrar evita perder plazos.',
        eg: 'Al entrar un lunes, el panel puede mostrar tres avisos: una tarea de informática que vence el miércoles, un material nuevo de matemáticas y un mensaje del tutor. Leer los avisos primero ordena toda la semana.',
        pr: 'Dibuja en papel el mapa de tu entorno educativo: acceso, cursos, avisos y calendario, y marca dónde consultarías una fecha de entrega.' },
      { t: 'Recursos educativos', d: 'Materiales del curso: documentos, enlaces, videos y actividades.', m: '10:15',
        ex: 'Cada curso organiza sus recursos por temas o semanas: apuntes en PDF, enlaces a videos, presentaciones y actividades interactivas. Descargar los materiales y guardarlos en carpetas por asignatura permite estudiar sin conexión.',
        eg: 'Un tema de informática puede incluir un apunte, un video de 8 minutos y una actividad de práctica. Ver el video antes de leer el apunte ayuda a entender los términos; hacer la actividad después confirma lo aprendido.',
        pr: 'Organiza los recursos de una asignatura en carpetas por tema y anota qué formato tiene cada uno (PDF, video, enlace).' },
      { t: 'Documentos y archivos', d: 'Crear, nombrar y guardar trabajos para encontrarlos después.', m: '10:50',
        ex: 'Un trabajo bien guardado se encuentra en segundos: nombre claro con asignatura y fecha, formato adecuado y una carpeta por asignatura. Guardar también una copia en la nube protege el trabajo si el equipo falla.',
        eg: 'El archivo "Tarea_informatica_2026-11-12.odt" se encuentra mucho antes que "Documento1.odt". Exportar una copia en PDF antes de entregarla conserva el aspecto exacto del trabajo.',
        pr: 'Renombra tres archivos de práctica con el formato Asignatura_Tema_Fecha y crea la estructura de carpetas por asignatura.' },
      { t: 'Actividades prácticas', d: 'Resolver actividades en línea y entregarlas en plazo y formato.', m: '12:00',
        ex: 'Las actividades en línea pueden ser cuestionarios, entregas de archivos o foros. Antes de enviar, se revisa el enunciado, el formato pedido y el plazo; después de enviar, se comprueba que la entrega quedó registrada y se guarda el comprobante.',
        eg: 'Un cuestionario con tres intentos permite corregir errores entre intentos; una entrega de archivo solo admite un envío, así que conviene revisar el documento completo antes de subirlo. Leer el enunciado dos veces evita entregar el archivo equivocado.',
        pr: 'Simula una entrega: prepara un documento corto, revísalo con una lista de tres puntos y anota qué comprobarías tras pulsar Enviar.' },
      { t: 'Repaso', d: 'Revisar calificaciones, retroalimentación y planificar la siguiente semana.', m: '08:40',
        ex: 'El repaso cierra el ciclo: revisar las calificaciones y los comentarios del profesorado, anotar qué falló y planificar la semana siguiente con las fechas del calendario. La retroalimentación vale más que la nota: dice exactamente qué mejorar.',
        eg: 'Si una actividad baja de nota por "falta el índice", la corrección es concreta: la próxima entrega llevará índice. Anotar ese detalle en una lista personal evita repetir el mismo error.',
        pr: 'Escribe tu plan de la próxima semana: tres tareas pendientes, sus plazos y qué harás distinto a partir de la última retroalimentación.' }
    ]
  },
  'Curso de Impress': {
    level: 'Principiante', hours: 3,
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=85',
    intro: 'Crea presentaciones claras con diapositivas, imágenes y elementos visuales que apoyen tu mensaje sin distraer.',
    body: ['Una buena presentación no es un documento proyectado: es una secuencia visual donde cada diapositiva dice una sola idea. Impress, el programa de presentaciones de LibreOffice, tiene todo lo necesario para lograrlo gratis: diseños, imágenes, gráficos y animaciones.',
      'Aprenderás a estructurar la presentación antes de diseñarla, a usar jerarquía tipográfica y contraste, y a ensayar la exposición con las notas del orador y el temporizador.'],
    context: 'Una diapositiva debe tener un propósito, jerarquía tipográfica y contraste suficiente; los elementos decorativos no deben competir con el mensaje.',
    method: ['Define el mensaje y la estructura antes de abrir el programa.', 'Una idea por diapositiva, con título que afirme la conclusión.', 'Añade una imagen o gráfico solo si apoya la idea.', 'Ensaya en voz alta y ajusta el tiempo.'],
    checklist: ['¿Cada diapositiva tiene una sola idea clara?', '¿El título afirma la conclusión, no solo el tema?', '¿El texto se lee desde el fondo de la sala?'],
    diagram: ['Mensaje', 'Diapositiva clara', 'Exposición'],
    lessons: [
      { t: 'Primeros pasos', d: 'La interfaz de Impress: diapositivas, paneles y vistas.', m: '09:30',
        ex: 'Impress muestra la diapositiva actual en el centro, la lista de diapositivas a la izquierda y las propiedades a la derecha. Las vistas —Normal, Esquema, Notas y Clasificador— sirven para editar, escribir el guion, preparar lo que dirás y reordenar la presentación.',
        eg: 'Para una exposición de 5 minutos con 6 diapositivas, la vista Clasificador permite verlas todas a la vez y arrastrar una diapositiva para cambiar su orden sin abrirla una por una.',
        pr: 'Crea una presentación vacía, añade tres diapositivas con el diseño Título y contenido y cambia al Clasificador para reordenarlas.',
        code: { label: 'Ejemplo: estructura de una presentación clara', code: 'DIAPOSITIVA 1: título y mensaje principal\nDIAPOSITIVA 2: el problema, en una frase\nDIAPOSITIVA 3: la evidencia, un gráfico legible\nDIAPOSITIVA 4: la conclusión y qué se pide' } },
      { t: 'Diseño de diapositivas', d: 'Plantillas, fondos y jerarquía visual.', m: '11:45',
        ex: 'El diseño se decide con una plantilla coherente: un fondo claro, una familia tipográfica para títulos y otra para el cuerpo, y colores con contraste suficiente. La jerarquía guía la mirada: título grande, idea principal visible y detalles en segundo plano.',
        eg: 'Una diapositiva con título de 32 puntos, cuerpo de 20 y un color de acento para los datos clave se lee bien proyectada; la misma diapositiva con cuatro colores y tres tamaños distintos parece desordenada aunque diga lo mismo.',
        pr: 'Elige una plantilla, define un color de acento y aplica el mismo diseño a tres diapositivas de prueba.' },
      { t: 'Texto e imágenes', d: 'Cuadros de texto, imágenes con buena resolución y pies de imagen.', m: '12:20',
        ex: 'El texto va en cuadros con poco contenido: frases cortas, no párrafos. Las imágenes se insertan a buena resolución y se recortan dentro de Impress; un pie breve indica qué muestra la imagen o de dónde procede.',
        eg: 'Una foto de 800 × 600 píxeles proyectada a pantalla completa se ve borrosa; la misma foto a 1920 × 1080 se ve nítida. Si la imagen pesa mucho, Impress permite comprimirla al guardar.',
        pr: 'Crea una diapositiva con un título, dos líneas de texto y una imagen con pie. Comprueba que el texto no se solape con la imagen.' },
      { t: 'Transiciones y animaciones', d: 'Movimiento con intención: cuándo animar y cuándo no.', m: '10:55',
        ex: 'Las transiciones cambian de una diapositiva a otra y las animaciones mueven elementos dentro de una diapositiva. La regla es usar pocas y siempre con el mismo estilo: una transición suave de fundido y apariciones de elementos en el orden en que se mencionan.',
        eg: 'En una lista de tres ventajas, animar cada punto para que aparezca al hacer clic mantiene la atención en lo que se explica; animar cada punto con un efecto distinto distrae y alarga la exposición.',
        pr: 'Añade una transición de fundido a toda la presentación y una animación de aparición a los puntos de una lista. Ensaya el avance con el teclado.' },
      { t: 'Presentación final', d: 'Notas del orador, ensayo con temporizador y exportación.', m: '11:10',
        ex: 'La vista Notas guarda lo que vas a decir en cada diapositiva y la vista Presentación muestra esas notas solo a ti mientras el público ve la diapositiva. Ensayar con el temporizador revela si la exposición cabe en el tiempo; exportar a PDF permite compartirla sin depender del programa.',
        eg: 'Una exposición de 10 minutos con 8 diapositivas deja algo más de un minuto por diapositiva. Si el ensayo marca 14 minutos, hay que recortar contenido, no hablar más rápido.',
        pr: 'Escribe las notas del orador para dos diapositivas, ensaya la presentación con temporizador y exporta una copia en PDF.' }
    ]
  },
  'Curso de Calc': {
    level: 'Principiante', hours: 4,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=85',
    intro: 'Aprende hojas de cálculo: celdas, formatos, fórmulas, funciones y gráficos para organizar datos y responder preguntas con números.',
    body: ['Una hoja de cálculo convierte listas de datos en respuestas: cuánto se gastó, cuál es el promedio, qué producto se vendió más. Calc, la hoja de cálculo de LibreOffice, ofrece fórmulas, funciones y gráficos sin costo.',
      'Trabajarás con datos reales de ejemplo: una lista de compras, calificaciones y ventas. Al final sabrás construir una tabla limpia, calcular totales automáticamente y presentar los resultados en un gráfico que responda una pregunta concreta.'],
    context: 'Una hoja de cálculo organiza valores en celdas y permite transformarlos con fórmulas. Las referencias a celdas, los tipos de datos y la claridad del gráfico influyen en la confiabilidad del análisis.',
    method: ['Escribe los datos en una tabla limpia, una cosa por columna.', 'Usa fórmulas con referencias, no números escritos a mano.', 'Comprueba el resultado con un cálculo manual sencillo.', 'Elige el gráfico que responda tu pregunta, no el más vistoso.'],
    checklist: ['¿Cada columna tiene un encabezado claro y un solo tipo de dato?', '¿Las fórmulas usan referencias a celdas?', '¿El gráfico tiene título y responde una pregunta?'],
    diagram: ['Datos', 'Fórmulas', 'Resultado y gráfico'],
    lessons: [
      { t: 'Interfaz y celdas', d: 'Filas, columnas, rangos y cómo moverse por la hoja.', m: '09:40',
        ex: 'Una hoja se organiza en celdas identificadas por columna y fila: B3 es la columna B, fila 3. Un rango como B2:B10 agrupa varias celdas y es la base de casi todas las operaciones. Las pestañas inferiores permiten tener varias hojas en el mismo archivo.',
        eg: 'En una lista de compras, la columna A lleva el producto, la B la cantidad y la C el precio unitario. El rango C2:C6 contiene todos los precios y se puede sumar con una sola fórmula.',
        pr: 'Crea una hoja con cinco productos en la columna A, cantidades en la B y precios en la C. Selecciona el rango B2:B6 y observa qué muestra la barra de estado.',
        code: { label: 'Ejemplo: referencias y rangos', code: 'A2:A6  productos\nB2:B6  cantidades\nC2:C6  precios unitarios\nB2 = celda de la primera cantidad\nC2:C6 = rango de todos los precios' } },
      { t: 'Datos y formatos', d: 'Texto, números, fechas y moneda: que cada dato sea lo que parece.', m: '10:25',
        ex: 'Calc distingue texto, números, fechas y valores lógicos. Un número escrito como texto no se suma y una fecha escrita como texto no se ordena. El formato (moneda, porcentaje, fecha) cambia cómo se ve el dato, no su valor.',
        eg: 'Si escribes "12,50" en una celda configurada en español, Calc lo entiende como 12,5; si la celda espera punto decimal, puede guardarlo como texto y la suma dará 0. Revisar la alineación ayuda: los números se alinean a la derecha y el texto a la izquierda.',
        pr: 'Escribe una columna de precios con formato de moneda y una columna de fechas. Cambia el formato de una fecha y observa qué cambia y qué no cambia.' },
      { t: 'Fórmulas y funciones', d: 'SUMA, PROMEDIO, multiplicaciones y referencias relativas.', m: '13:15',
        ex: 'Toda fórmula empieza con = y combina referencias a celdas con operadores y funciones. =B2*C2 multiplica cantidad por precio; =SUMA(D2:D6) suma un rango; =PROMEDIO(C2:C6) calcula el promedio. Al copiar una fórmula, las referencias relativas se ajustan solas.',
        eg: 'Con cantidad en B2 y precio en C2, la fórmula =B2*C2 en D2 da el subtotal; al copiarla hasta D6, cada fila calcula su propio subtotal. El total es =SUMA(D2:D6). Si cambia un precio, todos los resultados se actualizan solos.',
        pr: 'En tu tabla de compras, añade la columna D con =B2*C2 copiada a todas las filas y el total con =SUMA(D2:D6). Cambia un precio y comprueba que el total cambia.',
        code: { label: 'Ejemplo: total por fila y suma general', code: 'A          B          C\nProducto   Cantidad   Precio\nCuaderno   3          2.50\nLápiz      4          0.75\n\nSubtotal fila 2: =B2*C2\nTotal:           =SUMA(D2:D3)\nPromedio:        =PROMEDIO(C2:C3)' } },
      { t: 'Gráficos', d: 'Elegir el gráfico adecuado: barras, líneas y circular.', m: '11:00',
        ex: 'Un gráfico responde una pregunta visual: barras para comparar cantidades entre categorías, líneas para ver evolución en el tiempo y circular para mostrar partes de un total. Un gráfico necesita título, ejes con etiquetas y datos limpios detrás.',
        eg: 'Para comparar las ventas de cuatro meses, un gráfico de barras muestra de inmediato cuál fue el mejor mes; un gráfico circular con doce meses sería ilegible. Para ver la tendencia de un año, una línea es mejor que doce barras.',
        pr: 'Con tu tabla de compras, crea un gráfico de barras de los subtotales por producto. Ponle título y comprueba que se entiende sin leer la tabla.' },
      { t: 'Ejercicios prácticos', d: 'Presupuesto mensual y calificaciones: dos casos completos.', m: '12:30',
        ex: 'Un presupuesto mensual es una tabla de ingresos y gastos con totales por categoría y un resto final; una tabla de calificaciones usa PROMEDIO y una condición para decidir si se aprueba. Ambos casos combinan todo lo anterior: datos limpios, fórmulas con referencias y un gráfico resumen.',
        eg: 'En el presupuesto, la fórmula =SUMA(B2:B8) totaliza los gastos y =B10-B11 calcula lo que queda; si el resto es negativo, el formato condicional puede pintarlo de rojo automáticamente. En calificaciones, =SI(PROMEDIO(B2:D2)>=6;"Aprobado";"Repasar") decide el resultado.',
        pr: 'Construye un presupuesto mensual con cinco gastos, su total y el resto, y una tabla de tres calificaciones con promedio y resultado. Añade un gráfico de barras de los gastos.',
        code: { label: 'Ejemplo: condición para aprobar', code: 'Promedio: =PROMEDIO(B2:D2)\nResultado: =SI(PROMEDIO(B2:D2)>=6;"Aprobado";"Repasar")\nTotal gastos: =SUMA(B2:B8)\nResto: =B10-B11' } }
    ]
  },
  'Curso de Writer': {
    level: 'Principiante', hours: 3,
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=85',
    intro: 'Domina la edición de documentos de texto: escribir, dar formato, ordenar el contenido y exportarlo con aspecto profesional.',
    body: ['Un documento bien hecho se nota antes de leerlo: títulos claros, párrafos ordenados, tablas alineadas e imágenes en su lugar. Writer, el procesador de textos de LibreOffice, tiene todo lo necesario para lograrlo sin costo.',
      'Aprenderás a escribir con estructura desde el principio —títulos, secciones y cuerpo— para que el formato se mantenga solo y el documento sea fácil de navegar, corregir y compartir.'],
    context: 'Un documento bien estructurado usa estilos para distinguir títulos, secciones y cuerpo de texto. Los estilos globales facilitan mantener un formato consistente y generar índices; el contenido debe seguir un orden lógico.',
    method: ['Escribe primero la estructura: título y secciones.', 'Aplica estilos en vez de cambiar formato a mano.', 'Añade tablas e imágenes con pie y referencia.', 'Revisa ortografía y exporta una copia en PDF.'],
    checklist: ['¿Los títulos usan estilos, no formato manual?', '¿El documento tiene un orden lógico de secciones?', '¿Las tablas e imágenes tienen pie y se ven bien al exportar?'],
    diagram: ['Estructura', 'Contenido', 'Documento final'],
    lessons: [
      { t: 'Edición básica', d: 'Escribir, seleccionar, copiar y corregir en Writer.', m: '09:15',
        ex: 'Writer es un procesador de textos: permite escribir, borrar, mover y corregir con herramientas de selección y deshacer. Guardar con frecuencia (Ctrl+S) y activar el guardado automático protege el trabajo; el historial de deshacer permite volver atrás si algo sale mal.',
        eg: 'Para mover un párrafo no hace falta borrarlo y reescribirlo: se selecciona, se corta con Ctrl+X y se pega con Ctrl+V en su lugar nuevo. Si el resultado no convence, Ctrl+Z lo devuelve a su sitio.',
        pr: 'Escribe un texto de tres párrafos, mueve el segundo párrafo al final con cortar y pegar, y deshaz el cambio para comprobar el historial.' },
      { t: 'Formato de texto', d: 'Negrita, cursiva, tamaños y estilos de párrafo.', m: '10:30',
        ex: 'El formato directo (negrita, tamaño, color) cambia el aspecto de lo seleccionado, pero el formato con estilos cambia la estructura: un Título 1 aplicado a todas las secciones permite cambiar el aspecto de todas a la vez y generar un índice automático.',
        eg: 'Si pones cada título en negrita y tamaño 16 a mano, cambiar el diseño después exige retocarlos uno por uno; si usas el estilo Título 1, basta modificar el estilo para que todos cambien. Por eso los documentos largos se hacen con estilos.',
        pr: 'Escribe un documento con dos secciones usando los estilos Título 1 para los títulos y Texto corporal para los párrafos. Cambia el tamaño del estilo Título 1 y observa el cambio global.' },
      { t: 'Párrafos y páginas', d: 'Alineación, interlineado, sangrías y saltos de página.', m: '10:05',
        ex: 'Un párrafo se controla con alineación (izquierda, centrada, justificada), interlineado y sangrías. Los saltos de página separan secciones sin pulsar Intro muchas veces, lo que evita huecos que se desordenan al editar.',
        eg: 'Un informe con el título en una página y el cuerpo en otra debe usar un salto de página, no diez líneas vacías: si después se añade un párrafo, el salto mantiene cada sección en su página y las líneas vacías desplazarían todo.',
        pr: 'Da formato a un documento de dos secciones: títulos con estilo, párrafos justificados con interlineado 1,15 y un salto de página antes de la segunda sección.' },
      { t: 'Tablas e imágenes', d: 'Insertar tablas, darles formato y colocar imágenes con pie.', m: '11:20',
        ex: 'Una tabla organiza datos en filas y columnas con encabezados claros; se puede ordenar, dar formato a los bordes y ajustar el ancho de columna. Las imágenes se anclan al párrafo o a la página, y un pie explica qué muestran.',
        eg: 'Una tabla de horarios con columnas Día, Hora y Actividad se lee de un vistazo si el encabezado va en negrita y las celdas están alineadas; una imagen de 800 píxeles de ancho cabe bien en una página A4, pero una de 400 se verá pequeña o borrosa al ampliarla.',
        pr: 'Inserta una tabla de 3 columnas y 4 filas con un horario, y una imagen con pie. Ajusta el tamaño de la imagen para que no desborde los márgenes.' },
      { t: 'Guardar y exportar', d: 'Formatos ODT, DOCX y PDF: cuándo usar cada uno.', m: '09:50',
        ex: 'Writer guarda por defecto en ODT, su formato abierto; puede guardar en DOCX para compartir con usuarios de Word y exportar a PDF cuando el aspecto final no debe cambiar. Guardar una copia en PDF antes de enviar protege el documento de cambios accidentales.',
        eg: 'Un trabajo para entregar se exporta a PDF para que se vea igual en cualquier equipo; el archivo ODT se conserva para seguir editándolo después. Enviar solo el DOCX puede cambiar saltos y fuentes si el otro equipo no tiene las mismas.',
        pr: 'Guarda tu documento en ODT, exporta una copia en PDF y otra en DOCX. Abre el PDF y comprueba que títulos, tabla e imagen se ven como esperabas.' }
    ]
  },
  'Curso de Writer 7': {
    level: 'Principiante', hours: 4,
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1400&q=85',
    intro: 'Guía de Writer 7 para crear documentos claros y bien estructurados con estilos, índices, referencias y exportación profesional.',
    body: ['Writer 7 es la versión actual del procesador de textos de LibreOffice y añade mejoras en estilos, tablas e índices. Este curso va más allá de lo básico: aprenderás a construir documentos largos que se mantienen solos —con índice automático, referencias cruzadas y numeración coherente—.',
      'El objetivo es que un informe, un trabajo escolar o un manual quede listo para imprimir o compartir sin retoques de última hora: portada, índice, secciones numeradas y bibliografía en su lugar.'],
    context: 'En documentos largos, la estructura manda: los estilos de título generan el índice, las referencias cruzadas se actualizan solas y los campos (fecha, número de página) se mantienen correctos sin intervención manual.',
    method: ['Define la estructura con estilos de título antes de escribir.', 'Usa campos e índices automáticos en vez de escribirlos a mano.', 'Numera secciones y figuras para poder referenciarlas.', 'Revisa en vista de impresión antes de exportar.'],
    checklist: ['¿El índice se generó desde los estilos de título?', '¿Las referencias a figuras y secciones son automáticas?', '¿El documento se ve igual en vista de impresión y en PDF?'],
    diagram: ['Estilos', 'Índice y referencias', 'Exportación'],
    lessons: [
      { t: 'Interfaz de Writer', d: 'Novedades de Writer 7: barra lateral, estilos y vista de impresión.', m: '09:45',
        ex: 'Writer 7 organiza su interfaz en la barra de menús, las barras de herramientas y la barra lateral, donde viven los estilos, las propiedades y el navegador del documento. La vista de impresión muestra el documento tal como saldrá en papel o PDF, con márgenes y saltos reales.',
        eg: 'El panel de Estilos (F11) muestra todos los estilos del documento y permite aplicarlos con un clic; el Navegador (F5) lista títulos, tablas e imágenes y salta a cualquiera con doble clic. Ambos ahorran mucho tiempo en documentos largos.',
        pr: 'Abre el panel de Estilos y el Navegador en un documento de prueba. Aplica el estilo Título 1 a dos líneas y observa cómo aparecen en el Navegador.' },
      { t: 'Estilos y formato', d: 'Estilos de párrafo, de carácter y de página: el sistema completo.', m: '12:40',
        ex: 'Writer distingue estilos de párrafo (títulos, cuerpo, citas), de carácter (énfasis dentro de un párrafo) y de página (márgenes y encabezados). Modificar un estilo cambia todas sus apariciones; heredar estilos permite crear variantes sin repetir la configuración.',
        eg: 'Un informe puede tener un estilo de página "Primera página" sin encabezado para la portada y otro "Normal" con número de página para el resto. Cambiar el interlineado del estilo Texto corporal ajusta todo el documento de una vez.',
        pr: 'Crea un estilo de párrafo propio basado en Texto corporal con interlineado 1,15 y aplícalo a tres párrafos. Modifica el estilo y comprueba el cambio global.' },
      { t: 'Imágenes y tablas', d: 'Tablas con estilo, imágenes ancladas y pies automáticos.', m: '11:30',
        ex: 'Las tablas de Writer 7 admiten estilos de tabla, filas de encabezado repetidas en cada página y fórmulas sencillas. Las imágenes se anclan al párrafo, a la página o a un carácter, y los pies con numeración automática permiten referenciarlas como "Figura 1" desde el texto.',
        eg: 'Una tabla de resultados que ocupa dos páginas debe repetir su fila de encabezado; sin esa opción, la segunda página muestra números sin saber qué columna es cada una. Un pie "Figura 1: Esquema del circuito" numerado a mano se desordena si se añade una figura antes; el pie automático se renumera solo.',
        pr: 'Inserta una tabla con fila de encabezado repetida y una imagen con pie automático. Añade una segunda imagen antes y comprueba que la numeración se actualiza.' },
      { t: 'Índices y referencias', d: 'Tabla de contenido, índice de figuras y referencias cruzadas.', m: '13:10',
        ex: 'La tabla de contenido se genera desde los estilos de título: Writer recoge todos los Título 1, 2 y 3 con sus números de página y la actualiza con un clic. Las referencias cruzadas insertan el número de una figura o sección y se actualizan si el documento cambia.',
        eg: 'Escribir "como se ve en la Figura 3" a mano se rompe si se reordena el documento; insertar una referencia cruzada a esa figura mantiene el número correcto siempre. Al final, actualizar el índice (clic derecho, Actualizar índice) refleja todos los cambios.',
        pr: 'En un documento con tres secciones y dos figuras, inserta una tabla de contenido y una referencia cruzada a la Figura 1 desde el texto. Añade una sección nueva y actualiza el índice.' },
      { t: 'Impresión y exportación', d: 'Vista previa, PDF con marcadores y opciones de exportación.', m: '10:20',
        ex: 'Antes de imprimir se revisa la vista previa: márgenes, saltos de página y encabezados. Al exportar a PDF, Writer puede incluir marcadores desde los títulos, enlaces clicables en el índice y metadatos del documento, lo que convierte el PDF en un documento navegable.',
        eg: 'Un PDF exportado con marcadores permite saltar a cada capítulo desde el panel lateral del lector; sin marcadores, el lector debe desplazarse manualmente. La opción "PDF/A" guarda el documento para archivo a largo plazo.',
        pr: 'Exporta tu documento a PDF con marcadores y comprueba en el lector que el índice es clicable y que los marcadores listan las secciones.' }
    ]
  },
  'Curso de Gimp': {
    level: 'Intermedio', hours: 5,
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=1400&q=85',
    intro: 'Edición de imágenes con Gimp: selecciones, capas, máscaras y filtros para retocar fotos y crear composiciones.',
    body: ['Gimp es un editor de imágenes libre y muy completo: permite retocar fotografías, crear composiciones y preparar gráficos para web o impresión. Su idea central es el trabajo no destructivo: capas y máscaras que se pueden corregir sin borrar nada.',
      'Aprenderás el flujo completo de un retoque: seleccionar, corregir color y luz, separar un objeto de su fondo y exportar el resultado en el formato adecuado para cada uso.'],
    context: 'En edición de imagen, trabajar por capas conserva elementos separados. Una máscara controla qué partes se muestran sin borrar píxeles, lo que permite corregir el efecto después.',
    method: ['Duplica la capa antes de retocar: el original queda intacto.', 'Selecciona con la herramienta adecuada a cada borde.', 'Corrige color y luz por capas de ajuste o duplicados.', 'Exporta una copia; guarda el proyecto en XCF para seguir editando.'],
    checklist: ['¿El retoque se puede deshacer sin perder el original?', '¿Las selecciones tienen bordes limpios y naturales?', '¿El archivo exportado tiene el formato y tamaño correctos?'],
    diagram: ['Selección', 'Capas y máscara', 'Exportación'],
    lessons: [
      { t: 'Interfaz y formatos', d: 'Caja de herramientas, capas y la diferencia entre XCF, JPG y PNG.', m: '10:10',
        ex: 'Gimp guarda su trabajo en XCF, que conserva capas y máscaras; al exportar se elige JPG para fotos (con compresión y sin transparencia) o PNG para imágenes con transparencia o texto nítido. La interfaz reúne la caja de herramientas, las opciones de cada herramienta y el panel de capas.',
        eg: 'Una foto para Instagram se exporta en JPG con calidad 85 y 1080 píxeles de ancho; un logotipo con fondo transparente se exporta en PNG para conservar la transparencia. Guardar solo el JPG impediría retocar las capas después.',
        pr: 'Abre una foto, guárdala como XCF y exporta dos copias: una JPG y una PNG. Compara el peso y observa qué formato conserva la transparencia.' },
      { t: 'Selecciones', d: 'Rectángulo, elipse, lazo, varita y selección por color.', m: '12:30',
        ex: 'Seleccionar es delimitar qué parte de la imagen se va a modificar. La selección rectangular y elíptica sirven para formas simples; el lazo sigue bordes a mano alzada; la varita mágica y la selección por color eligen zonas de color similar, útiles para cielos o fondos lisos.',
        eg: 'Para cambiar el color de una camiseta, la selección por color toma el tono de la tela con un umbral que incluye sus sombras; ampliar la selección en 2 píxeles y difuminar el borde 3 píxeles evita un contorno dentado.',
        pr: 'Selecciona el cielo de una foto con la varita mágica, ajusta el umbral hasta cubrirlo sin tocar los edificios y cambia su tono con Colores > Tono-Saturación.' },
      { t: 'Capas y máscaras', d: 'Apilar elementos, opacidad, modos y máscaras de capa.', m: '14:20',
        ex: 'Cada capa es una hoja transparente apilada sobre las demás: se pueden mover, ocultar, cambiar su opacidad y su modo de fusión. Una máscara de capa pinta en blanco y negro qué parte de la capa se ve: blanco muestra, negro oculta, sin borrar píxeles.',
        eg: 'Para poner un texto sobre una foto sin taparla, se crea una capa de texto y se baja su opacidad al 90 %; para oscurecer solo el cielo, se duplica la capa, se oscurece el duplicado y se le añade una máscara que solo deja ver el cielo.',
        pr: 'Crea una composición con tres capas: fondo, un objeto recortado y un texto. Añade una máscara a la capa del objeto y oculta suavemente su borde inferior.' },
      { t: 'Retoque y filtros', d: 'Corrección de color, niveles, enfoque y filtros creativos.', m: '13:45',
        ex: 'El retoque básico corrige exposición con Niveles o Curvas, equilibra el color con Temperatura y satura con moderación. La herramienta de clonar y la de sanear eliminan manchas copiando textura cercana; los filtros (desenfoque, enfoque, efectos artísticos) se aplican en capas duplicadas para controlar su intensidad.',
        eg: 'Una foto oscura mejora moviendo el punto blanco de Niveles hasta el inicio del histograma; una mancha en la pared se elimina con la herramienta Sanear, que copia la textura vecina sin dejar bordes. Un desenfoque gaussiano de 5 píxeles en el fondo resalta al sujeto.',
        pr: 'Retoca una foto: corrige su exposición con Niveles, elimina una mancha con Sanear y aplica un ligero enfoque. Compara el antes y el después ocultando la capa.' },
      { t: 'Exportar imágenes', d: 'Tamaño, resolución y formato según el destino: web, redes o impresión.', m: '09:55',
        ex: 'Exportar bien es elegir tamaño y formato según el destino: para web, imágenes de 1200–1920 píxeles en JPG con calidad 80–85; para redes, el tamaño que pide cada plataforma; para impresión, 300 ppp y formato sin pérdidas como PNG o TIFF. Escalar se hace con Imagen > Escalar la imagen, nunca estirando la capa.',
        eg: 'Una foto de 4000 píxeles pesa varios megabytes y ralentiza una página web; escalada a 1200 píxeles y exportada en JPG al 80 % pesa menos de 300 KB y se ve igual en pantalla. Para imprimir esa foto a 10 × 15 cm hacen falta unos 1200 × 1800 píxeles a 300 ppp.',
        pr: 'Prepara la misma imagen para dos destinos: web (1200 píxeles, JPG 80 %) e impresión (300 ppp, PNG). Anota peso y dimensiones de cada exportación.' }
    ]
  },
  'Curso de Inkscape': {
    level: 'Intermedio', hours: 5,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1400&q=85',
    intro: 'Diseña ilustraciones vectoriales con Inkscape: formas, trazados, color y composición, con archivos que escalan sin perder nitidez.',
    body: ['Los gráficos vectoriales no son píxeles: son formas descritas con geometría, así que un logotipo puede imprimirse en una tarjeta o en un cartel sin perder nitidez. Inkscape, editor vectorial libre, trabaja con el formato estándar SVG.',
      'Aprenderás a construir ilustraciones con formas básicas y trazados Bézier, a combinar y recortar figuras, y a componer con color, texto y alineación hasta exportar un SVG o un PNG listo para usar.'],
    context: 'Los gráficos vectoriales describen formas mediante geometría, por lo que pueden escalarse sin pixelarse. Nodos y trazados permiten editar curvas; una composición necesita alineación, contraste y espacios consistentes.',
    method: ['Empieza con formas simples y combínalas antes de dibujar a mano.', 'Edita nodos para afinar curvas en vez de redibujar.', 'Aplica color y texto con una paleta limitada y coherente.', 'Agrupa, alinea y exporta al tamaño que pide el destino.'],
    checklist: ['¿La ilustración se ve nítida al ampliarla al doble?', '¿Las formas están alineadas y agrupadas con lógica?', '¿El archivo SVG se abre bien y el PNG tiene el tamaño pedido?'],
    diagram: ['Formas', 'Trazados y color', 'Composición'],
    lessons: [
      { t: 'Lienzo y herramientas', d: 'Documento, lienzo, zoom y las herramientas básicas de dibujo.', m: '10:05',
        ex: 'Inkscape trabaja sobre un lienzo con tamaño de documento configurable (A4, 800 × 600 píxeles, etc.). Las herramientas principales son Selección, Formas (rectángulo, elipse, estrella, espiral), Pluma para trazados Bézier y Texto. La barra de controles cambia según la herramienta activa.',
        eg: 'Para un icono de 64 × 64 píxeles se crea un documento de ese tamaño y se dibuja dentro del lienzo; al exportar, Inkscape usa el área del documento, no toda la pantalla. El zoom con Ctrl + rueda permite afinar detalles sin cambiar el tamaño real.',
        pr: 'Crea un documento de 800 × 600, dibuja un rectángulo, una elipse y una estrella, y cambia sus colores de relleno y trazo desde la barra de controles.' },
      { t: 'Formas y trazados', d: 'Nodos Bézier, curvas, unión, diferencia e intersección.', m: '14:10',
        ex: 'Un trazado Bézier es una curva definida por nodos y tiradores que controlan su forma. Las operaciones booleanas combinan formas: Unión las fusiona, Diferencia resta una de otra e Intersección conserva solo la zona común. Con pocas operaciones se construyen siluetas complejas.',
        eg: 'Una luna creciente se hace con dos círculos: uno completo menos otro desplazado, con Diferencia. Una gota se dibuja con la Pluma: dos nodos con tiradores curvos y uno puntiagudo arriba, ajustando los tiradores hasta lograr la curva.',
        pr: 'Construye una luna con Diferencia de dos círculos y una gota con la Pluma. Convierte una forma en trazado y mueve sus nodos para afinarla.' },
      { t: 'Color y rellenos', d: 'Paletas, degradados, opacidad y trazos.', m: '11:25',
        ex: 'El color en Inkscape se aplica como relleno y trazo, con colores planos, degradados lineales o radiales, y opacidad. Una paleta limitada (dos o tres colores principales más un acento) da coherencia; el panel Relleno y trazo controla color, degradado y grosor de línea.',
        eg: 'Un icono de sol con degradado radial de amarillo a naranja parece tener volumen con un solo objeto; el mismo icono en color plano se ve más simple y funciona mejor en tamaños pequeños. Para texto pequeño se evita el degradado y se usa color plano.',
        pr: 'Crea un círculo con degradado radial y un rectángulo con trazo grueso. Guarda ambos colores en la paleta y reutilízalos en una segunda figura.' },
      { t: 'Texto y composición', d: 'Texto en trazado, alineación, distribución y jerarquía.', m: '12:50',
        ex: 'El texto en Inkscape puede fluir dentro de una forma o seguir un trazado curvo, y al exportar conviene convertirlo en trazado si el destino no tiene la fuente instalada. Alinear y distribuir objetos con el panel Alinear ordena la composición; agrupar mantiene unidos los elementos de un mismo conjunto.',
        eg: 'Un logotipo con nombre curvo se logra escribiendo el texto y aplicándole Texto > Poner en trazado sobre un círculo; después se convierte en trazado para que no dependa de la fuente. Tres iconos en fila se alinean por su centro vertical y se distribuyen con espacios iguales.',
        pr: 'Compón una tarjeta: un título, un icono de dos formas y una línea de texto. Alinea los elementos al centro y agrupa el icono con su texto.' },
      { t: 'Exportación SVG', d: 'Guardar en SVG, exportar PNG y preparar archivos para web.', m: '10:40',
        ex: 'El formato nativo de Inkscape es SVG, un estándar web que conserva las formas editables y escala sin pérdida. Exportar a PNG convierte el diseño en píxeles al tamaño elegido: útil para redes o documentos. Para web se usa el SVG optimizado, que pesa menos y se ve nítido en cualquier pantalla.',
        eg: 'Un logotipo en SVG pesa unos pocos kilobytes y se ve nítido en un móvil y en un cartel; el mismo logotipo exportado a PNG de 512 píxeles sirve para un perfil de red social que no acepta SVG. Antes de exportar se comprueba que no queden objetos fuera del lienzo.',
        pr: 'Exporta tu tarjeta como SVG y como PNG de 800 píxeles de ancho. Abre el SVG en el navegador y comprueba que se ve igual que en Inkscape.' }
    ]
  },
  'Curso de HTML': {
    level: 'Principiante', hours: 5,
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1400&q=85',
    intro: 'Construye páginas web con estructura semántica HTML: encabezados, enlaces, imágenes, listas y tablas.',
    body: ['HTML es el esqueleto de la web: describe qué es cada parte de una página —un título, un párrafo, una lista, un enlace— y el navegador la dibuja. Aprender HTML es aprender a estructurar contenido para que lo entiendan personas, buscadores y lectores de pantalla.',
      'Escribirás páginas reales desde la primera lección: una tarjeta informativa, una página de artículo y un pequeño proyecto web completo, validando la estructura en cada paso.'],
    context: 'HTML describe la estructura y el significado del contenido, no su apariencia. Elegir elementos semánticos y mantener una jerarquía de encabezados mejora navegación, accesibilidad y mantenimiento.',
    method: ['Escribe primero la estructura en papel: qué secciones tiene la página.', 'Usa elementos semánticos: header, main, section, article, footer.', 'Mantén un solo h1 y una jerarquía de encabezados sin saltos.', 'Abre la página en el navegador y valida cada cambio.'],
    checklist: ['¿La página tiene un solo h1 y encabezados en orden?', '¿Cada enlace describe su destino?', '¿Las imágenes tienen texto alternativo útil?'],
    diagram: ['Estructura', 'Contenido', 'Página válida'],
    lessons: [
      { t: 'Estructura de una página', d: 'Doctype, head, body y la anatomía de un documento HTML.', m: '11:30',
        ex: 'Un documento HTML empieza con <!DOCTYPE html>, sigue con <head> (título, metadatos, enlaces a CSS) y <body> (el contenido visible). Los elementos se anidan: un <article> dentro de <main>, un <h2> y párrafos dentro del artículo. Un elemento mal cerrado rompe la estructura.',
        eg: 'Una página mínima válida tiene doctype, html con lang="es", head con meta charset y title, y body con un h1 y un párrafo. Sin el meta charset, las vocales acentuadas pueden mostrarse como símbolos extraños.',
        pr: 'Escribe una página mínima con título, un h1 y dos párrafos, guárdala como index.html y ábrela en el navegador.',
        code: { label: 'Ejemplo: página mínima válida', code: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="utf-8">\n  <title>Mi primera página</title>\n</head>\n<body>\n  <h1>Hola, mundo</h1>\n  <p>Mi primera página web.</p>\n</body>\n</html>' } },
      { t: 'Etiquetas y atributos', d: 'Párrafos, encabezados, énfasis y atributos esenciales.', m: '12:15',
        ex: 'Las etiquetas marcan el significado: <h1> a <h6> jerarquizan títulos, <p> agrupa párrafos, <strong> marca importancia y <em> énfasis. Los atributos añaden información: lang indica el idioma, id identifica un elemento único y class lo agrupa para el estilo.',
        eg: 'Un <h2> después de un <h1> indica una sección del tema principal; saltar de <h1> a <h4> confunde a los lectores de pantalla. Un enlace con href y un texto descriptivo ("Ver la guía de sensores") es útil; uno que solo dice "clic aquí" no dice a dónde lleva.',
        pr: 'Escribe una página con un h1, dos h2, tres párrafos y un fragmento con <strong> y <em>. Comprueba que los encabezados no saltan de nivel.' },
      { t: 'Enlaces e imágenes', d: 'Enlaces internos y externos, rutas y texto alternativo.', m: '12:45',
        ex: 'Un enlace <a href="guia.html"> apunta a otra página y su texto debe describir el destino. Una imagen <img src="sensor.jpg" alt="Sensor de luz sobre una mesa"> necesita el atributo alt: describe la imagen si no carga y la hace accesible. Las rutas relativas (imagenes/foto.jpg) mantienen el proyecto portable.',
        eg: 'En una página de sensores, la imagen del sensor lleva alt="Sensor de luz conectado a una placa Arduino"; el enlace a la guía dice "Ver la guía completa del sensor". Un alt vacío solo es correcto en imágenes puramente decorativas.',
        pr: 'Añade a tu página una imagen con alt descriptivo y dos enlaces: uno a otra página tuya y otro externo con su destino descrito en el texto.',
        code: { label: 'Ejemplo: estructura semántica de una tarjeta informativa', code: '<article class="card">\n  <h2>Sensor de luz</h2>\n  <p>Mide la iluminación del entorno.</p>\n  <a href="guia.html">Ver la guía</a>\n</article>' } },
      { t: 'Listas y tablas', d: 'Listas ordenadas y sin orden, tablas con encabezados y caption.', m: '11:50',
        ex: 'Las listas <ul> y <ol> agrupan elementos relacionados y <li> marca cada uno. Las tablas usan <table>, <caption> para el título, <th> para encabezados y <td> para datos; el atributo scope en <th> indica si encabeza una fila o una columna, lo que ayuda a los lectores de pantalla.',
        eg: 'Una lista de materiales es una <ul> con un <li> por componente; los pasos de montaje son una <ol> porque el orden importa. Una tabla de sensores con columnas Sensor, Rango y Uso lleva <th scope="col"> en cada encabezado.',
        pr: 'Crea una lista de materiales y una tabla de tres sensores con encabezados y caption. Comprueba que la tabla se lee bien sin estilos.' },
      { t: 'Proyecto web', d: 'Una página completa de artículo con navegación y pie.', m: '14:20',
        ex: 'El proyecto reúne todo: <header> con navegación, <main> con un <article> dividido en <section>, y <footer> con autoría. La navegación usa una lista de enlaces a las secciones con id, y cada sección tiene su encabezado en orden.',
        eg: 'Una página sobre sensores lleva header con el título del sitio y enlaces a "Qué es", "Tipos" y "Proyectos"; el main contiene el artículo con esas tres secciones y el footer indica la fuente. Los enlaces internos href="#tipos" saltan a la sección con id="tipos".',
        pr: 'Construye la página completa del artículo con navegación, tres secciones y pie. Valida la estructura revisando que no haya etiquetas sin cerrar.',
        code: { label: 'Ejemplo: página de artículo con navegación', code: '<header>\n  <h1>Guía de sensores</h1>\n  <nav><a href="#tipos">Tipos</a></nav>\n</header>\n<main>\n  <article>\n    <section id="tipos"><h2>Tipos</h2></section>\n  </article>\n</main>\n<footer>Social Red · 2026</footer>' } }
    ]
  },
  'Curso de CSS': {
    level: 'Intermedio', hours: 5,
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1400&q=85',
    intro: 'Da estilo a páginas web con selectores, color, tipografía, modelo de caja, Flexbox, Grid y diseño adaptable.',
    body: ['CSS separa el aspecto del contenido: el HTML dice qué es cada cosa y el CSS dice cómo se ve. Con selectores, cascada y un sistema de espaciado y color se logran páginas coherentes sin repetir estilos.',
      'Construirás tarjetas, cuadrículas y un diseño que se adapta de móvil a escritorio, entendiendo en cada paso por qué una regla gana sobre otra y cómo depurar cuando algo no se ve como esperabas.'],
    context: 'CSS aplica reglas visuales a elementos mediante selectores. La cascada resuelve conflictos por origen, especificidad y orden; el modelo de caja explica cómo contenido, relleno, borde y margen determinan dimensiones.',
    method: ['Empieza con el contenido sin estilo y añade reglas de lo general a lo específico.', 'Usa variables para color y espaciado: un solo lugar para cambiarlos.', 'Comprueba cada cambio en móvil y escritorio.', 'Si una regla no se aplica, revisa especificidad y orden en la cascada.'],
    checklist: ['¿Los colores y espaciados vienen de variables?', '¿El diseño se adapta sin desplazamiento horizontal en móvil?', '¿Sabes por qué ganó cada regla en conflicto?'],
    diagram: ['Selectores', 'Modelo de caja', 'Diseño adaptable'],
    lessons: [
      { t: 'Selectores y cascada', d: 'Clases, id, descendientes y cómo se resuelven los conflictos.', m: '12:30',
        ex: 'Un selector elige a qué elementos se aplica una regla: .card a la clase card, #menu al id menu, article p a los párrafos dentro de un artículo. Cuando dos reglas chocan, gana la más específica; a igualdad, gana la última en el archivo. El !important rompe la cascada y debe evitarse.',
        eg: 'Si .card p pone el texto en gris y article .card p lo pone en negro, gana la segunda por ser más específica. Cambiar el orden no bastaría. Por eso se usan clases con nombres claros y se evita encadenar demasiados selectores.',
        pr: 'Estiliza una tarjeta con clase .card y un párrafo dentro. Añade una segunda regla más específica y observa cuál gana; luego quítala y logra el mismo efecto cambiando solo el orden.',
        code: { label: 'Ejemplo: especificidad en acción', code: '.card p { color: #555; }\narticle .card p { color: #111; }\n/* Gana la segunda: es más específica */' } },
      { t: 'Color y tipografía', d: 'Paletas con variables, escalas tipográficas y contraste.', m: '11:40',
        ex: 'El color se define mejor con variables CSS (--color-principal) para cambiar la paleta en un solo lugar. La tipografía usa una escala (por ejemplo 14, 18, 24, 32 píxeles) y un interlineado de 1,5 para el cuerpo. El contraste entre texto y fondo debe ser suficiente para leerse sin esfuerzo.',
        eg: 'Una paleta con fondo #ffffff, texto #1a1a1a y acento #2563eb tiene contraste alto y un solo color de acento para enlaces y botones. Un gris #999 sobre blanco, en cambio, apenas se distingue y falla en legibilidad.',
        pr: 'Define tres variables de color y una escala de dos tamaños de título. Aplícalas a una página y comprueba que el texto se lee bien.' },
      { t: 'Modelo de caja', d: 'Contenido, relleno, borde y margen: por qué un elemento mide lo que mide.', m: '12:05',
        ex: 'Cada elemento es una caja: contenido en el centro, relleno (padding) dentro del borde, borde alrededor y margen (margin) fuera. Con box-sizing: border-box el ancho declarado incluye relleno y borde, lo que hace los cálculos previsibles.',
        eg: 'Una tarjeta con width: 300px, padding: 16px y border: 1px mide 334 píxeles con el modelo clásico, pero 300 píxeles exactos con border-box. Por eso casi todos los proyectos empiezan con * { box-sizing: border-box; }.',
        pr: 'Crea dos tarjetas de 300 píxeles, una con border-box y otra sin él, y mide la diferencia. Añade margen y observa cómo se separan.',
        code: { label: 'Ejemplo: modelo de caja previsible', code: '* { box-sizing: border-box; }\n.card {\n  width: 300px;\n  padding: 16px;\n  border: 1px solid #ddd;\n  margin: 12px;\n}' } },
      { t: 'Flexbox y Grid', d: 'Alinear con Flexbox y componer páginas con Grid.', m: '14:30',
        ex: 'Flexbox ordena elementos en una fila o columna: justify-content distribuye a lo largo del eje y align-items alinea en el transversal. Grid crea cuadrículas de filas y columnas: grid-template-columns define la estructura y repeat(auto-fit, minmax(220px, 1fr)) crea columnas que se adaptan solas.',
        eg: 'Una barra de navegación usa display: flex con justify-content: space-between para separar el logotipo de los enlaces. Una galería de tarjetas usa Grid con auto-fit para tener tres columnas en escritorio y una en móvil sin media queries adicionales.',
        pr: 'Crea una barra con Flexbox y una galería de seis tarjetas con Grid auto-fit. Reduce el ancho del navegador y observa cómo se reacomodan.',
        code: { label: 'Ejemplo: cuadrícula adaptable sin anchos rígidos', code: '.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 1rem;\n}' } },
      { t: 'Diseño adaptable', d: 'Media queries, unidades relativas y diseño mobile-first.', m: '12:50',
        ex: 'El diseño adaptable usa media queries para cambiar reglas según el ancho de pantalla, unidades relativas (rem, %, vw) en vez de píxeles fijos y el meta viewport para que el móvil no escale la página. El enfoque mobile-first escribe primero el diseño de móvil y añade reglas para pantallas grandes.',
        eg: 'Una página con .container { width: min(100% - 32px, 960px); margin: auto; } ocupa casi todo el ancho en móvil y se centra con 960 píxeles máximo en escritorio. Un @media (min-width: 768px) convierte la lista de tarjetas de una columna en dos.',
        pr: 'Haz que tu galería tenga una columna en móvil y tres en escritorio con una sola media query. Comprueba que no aparece desplazamiento horizontal en 360 píxeles de ancho.',
        code: { label: 'Ejemplo: mobile-first con una media query', code: '.cards { display: grid; gap: 1rem; }\n@media (min-width: 768px) {\n  .cards { grid-template-columns: repeat(3, 1fr); }\n}' } }
    ]
  },
  'Ciberseguridad': {
    level: 'Principiante', hours: 3,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=85',
    intro: 'Buenas prácticas para proteger dispositivos, cuentas y datos: contraseñas, verificación en dos pasos, privacidad y copias de seguridad.',
    body: ['La mayoría de los ataques no rompen sistemas: engañan personas. Por eso la ciberseguridad básica es sobre todo hábitos: contraseñas únicas con un gestor, verificación en dos pasos, actualizaciones al día y desconfianza ante mensajes urgentes.',
      'En este curso configurarás tu propia protección paso a paso: revisarás tus cuentas, activarás la verificación en dos pasos en las importantes y prepararás una copia de seguridad que realmente puedas restaurar.'],
    context: 'La seguridad digital reduce riesgos con controles defensivos: actualizaciones, autenticación multifactor, contraseñas únicas, mínimos permisos y copias recuperables. Desconfía de solicitudes inesperadas de claves o códigos y verifica por un canal conocido.',
    method: ['Haz inventario de tus cuentas importantes y su nivel de protección.', 'Activa la verificación en dos pasos empezando por el correo principal.', 'Guarda una copia de seguridad y comprueba que se puede restaurar.', 'Ante cualquier duda, verifica por un canal conocido antes de actuar.'],
    checklist: ['¿Tus cuentas clave tienen verificación en dos pasos?', '¿Tienes una copia de seguridad reciente y comprobada?', '¿Sabes qué hacer si una cuenta se ve comprometida?'],
    diagram: ['Prevenir', 'Proteger', 'Recuperar'],
    lessons: [
      { t: 'Riesgos y amenazas', d: 'Malware, phishing y ingeniería social: cómo funciona cada ataque.', m: '10:20',
        ex: 'El malware es software malicioso que se instala con engaños; el phishing son mensajes que imitan a un banco o servicio para robar claves; la ingeniería social manipula a la persona para que entregue datos voluntariamente. Todos comparten algo: necesitan que la víctima haga clic, descargue o responda.',
        eg: 'Un correo que dice "tu cuenta se cerrará en 24 horas" y enlaza a una página idéntica a la del banco es phishing: el remitente real no es el banco y la dirección del enlace no coincide con el dominio oficial. La urgencia es la señal de alerta.',
        pr: 'Analiza tres mensajes de ejemplo y marca las señales de alerta de cada uno: remitente, urgencia, enlace y errores de redacción.' },
      { t: 'Contraseñas seguras', d: 'Frases de paso, gestores y por qué no reutilizar claves.', m: '11:35',
        ex: 'Una contraseña segura es larga y única por servicio: una frase de paso como "cafe-montaña-libro-42" es más fuerte y memorable que "P@ssw0rd1". Un gestor de contraseñas genera y guarda claves distintas para cada cuenta, protegidas por una sola contraseña maestra.',
        eg: 'Si usas la misma clave en el correo y en una tienda y la tienda sufre una filtración, el atacante probará esa clave en tu correo. Con un gestor, cada servicio tiene una clave distinta y una filtración no compromete las demás cuentas.',
        pr: 'Instala un gestor de contraseñas, guarda en él tres cuentas con claves generadas distintas y cambia la clave de tu correo principal por una generada.' },
      { t: 'Privacidad y permisos', d: 'Qué datos compartes en apps y redes, y cómo limitarlos.', m: '10:45',
        ex: 'Cada aplicación pide permisos: ubicación, contactos, cámara o micrófono. Muchos no son necesarios para su función. Revisar los permisos en los ajustes del sistema y limitarlos al mínimo, y revisar qué publica tu perfil en redes, reduce la exposición de tus datos.',
        eg: 'Una linterna que pide acceso a los contactos no lo necesita para funcionar: ese permiso debe negarse. Una foto publicada con ubicación revela dónde estás; desactivar la ubicación en la cámara evita que las fotos lleven esos datos.',
        pr: 'Revisa los permisos de cinco aplicaciones de tu teléfono y quita los que no correspondan a su función. Revisa qué información muestra tu perfil público.' },
      { t: 'Fraudes y phishing', d: 'Detectar mensajes falsos y qué hacer si caíste en uno.', m: '12:10',
        ex: 'Un mensaje de phishing se reconoce por el remitente, la urgencia, el enlace y los errores: el dominio no es el oficial, pide actuar ya y el enlace lleva a otro sitio. Ante la duda, no se abre el enlace: se visita manualmente el sitio conocido y se revisa desde allí si existe una notificación real.',
        eg: 'Un SMS que dice que tu paquete está retenido y pide pagar en un enlace acortado es fraude: la paquetería real no cobra por SMS ni usa enlaces acortados. Si ya diste tus datos, se cambia la clave de inmediato y se activa la verificación en dos pasos.',
        pr: 'Escribe el plan de acción para un caso real: recibes un correo de tu banco pidiendo verificar tu cuenta. Anota cada paso que seguirías sin abrir el enlace.' },
      { t: 'Copias de seguridad', d: 'La regla 3-2-1 y cómo comprobar que la copia se restaura.', m: '11:00',
        ex: 'La regla 3-2-1 dice: tres copias de lo importante, en dos tipos de medio distintos y una fuera de casa (nube o disco externo). Una copia que nunca se probó no es una copia: hay que restaurar un archivo de prueba y comprobar que se abre bien.',
        eg: 'Fotos familiares en el teléfono, copia automática en la nube y copia mensual en un disco externo cumplen 3-2-1. Si el teléfono se pierde, las fotos siguen en la nube; si la cuenta de la nube falla, queda el disco externo.',
        pr: 'Haz una copia de seguridad de una carpeta importante siguiendo 3-2-1 y restaura un archivo de prueba en otra ubicación para comprobar que funciona.' }
    ]
  },
  'Inteligencia Artificial': {
    level: 'Principiante', hours: 4,
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1400&q=85',
    intro: 'Introducción a la inteligencia artificial y el aprendizaje automático: cómo aprenden los modelos, cómo evaluarlos y cómo usarlos con responsabilidad.',
    body: ['La inteligencia artificial ya está en el buscador, el teléfono y el aula. Entenderla no exige matemáticas avanzadas: basta comprender que un modelo aprende patrones a partir de ejemplos y que sus respuestas son estimaciones, no verdades garantizadas.',
      'Verás ejemplos reales —clasificación de imágenes, asistentes de texto, recomendaciones— y aprenderás a probar un modelo, detectar sus errores y decidir cuándo confiar en él y cuándo verificar con una persona.'],
    context: 'Un modelo de aprendizaje automático aprende patrones a partir de ejemplos. Su resultado es una estimación, no una verdad garantizada; datos incompletos o sesgados pueden producir errores y afectar a grupos de forma desigual.',
    method: ['Define qué tarea debe resolver el modelo y con qué datos.', 'Separa ejemplos de entrenamiento y de prueba.', 'Mide aciertos y errores, no solo los aciertos.', 'Decide qué revisión humana necesita cada resultado.'],
    checklist: ['¿Sabes con qué datos se entrenó el modelo?', '¿Probaste el modelo con ejemplos que no vio antes?', '¿Sabes qué errores comete y qué harías ante uno?'],
    diagram: ['Datos', 'Modelo', 'Evaluación'],
    lessons: [
      { t: 'Conceptos de IA', d: 'Qué es la IA, qué no es, y dónde ya la usas sin notarlo.', m: '10:30',
        ex: 'La inteligencia artificial es software que realiza tareas que requerirían inteligencia humana: reconocer imágenes, entender texto o predecir. No "comprende" como una persona: detecta patrones estadísticos en grandes cantidades de datos. Ya está en el teclado predictivo, el desbloqueo facial y las recomendaciones de video.',
        eg: 'El teclado que sugiere la siguiente palabra aprendió qué palabras suelen seguir a otras en millones de textos; por eso acierta mucho y a veces sugiere algo sin sentido. El reconocimiento facial compara medidas de tu rostro con un patrón guardado, no te "reconoce" como lo haría una persona.',
        pr: 'Haz una lista de cinco herramientas que uses y marca cuáles usan IA. Para cada una, escribe qué tarea concreta resuelve.' },
      { t: 'Datos y ejemplos', d: 'Por qué la calidad de los datos decide la calidad del modelo.', m: '11:50',
        ex: 'Un modelo solo aprende de los ejemplos que se le muestran: si los datos son pocos, viejos o sesgados, el modelo hereda esos problemas. Etiquetar bien los ejemplos (esta foto es un gato, esta es un perro) es el trabajo más importante y el menos visible de un proyecto de IA.',
        eg: 'Un clasificador entrenado solo con fotos de perros de día fallará con fotos nocturnas, no porque el modelo sea malo, sino porque nunca vio ese caso. Un sistema de selección entrenado con historiales de una sola empresa puede favorecer a un perfil y discriminar a otros sin que nadie lo programara así.',
        pr: 'Propón un clasificador sencillo (por ejemplo, fruta madura o verde) y escribe qué ejemplos necesitarías, cuántos y qué casos difíciles incluirías.' },
      { t: 'Aprendizaje automático', d: 'Entrenamiento, prueba y cómo un modelo mejora con ejemplos.', m: '13:20',
        ex: 'Entrenar es ajustar el modelo para que acierte con los ejemplos de entrenamiento; probar es medirlo con ejemplos nuevos que nunca vio. Si solo se mide con los ejemplos de entrenamiento, el modelo puede memorizar sin aprender: eso se llama sobreajuste y se detecta cuando acierta en entrenamiento y falla en prueba.',
        eg: 'Un modelo que clasifica correos como spam se entrena con miles de correos etiquetados; se prueba con correos nuevos y se cuentan los errores: spam que pasó como legítimo y correos buenos marcados como spam. Ajustar el umbral cambia el equilibrio entre ambos errores.',
        pr: 'Dibuja el flujo de un proyecto: datos, división en entrenamiento y prueba, entrenamiento, medición y ajuste. Marca dónde se detectaría el sobreajuste.' },
      { t: 'Evaluar resultados', d: 'Aciertos, falsos positivos y falsos negativos: medir antes de confiar.', m: '12:15',
        ex: 'Evaluar un modelo es contar sus errores por tipo: falsos positivos (dijo que sí cuando era no) y falsos negativos (dijo que no cuando era sí). En medicina, un falso negativo es grave; en un filtro de spam, un falso positivo molesta. La métrica correcta depende de qué error cuesta más.',
        eg: 'Un detector de incendios con 99 % de acierto suena bien, pero si su 1 % de error son incendios no detectados, es inaceptable. Un clasificador de imágenes con 90 % de acierto puede ser útil si sus errores son entre razas de perro parecidas y no entre perro y gato.',
        pr: 'Toma un ejemplo (detector de spam o de enfermedades) y escribe qué error es más grave y por qué. Propón una forma de medirlo.' },
      { t: 'Usos responsables', d: 'Sesgos, privacidad y cuándo debe decidir una persona.', m: '10:55',
        ex: 'Usar IA con responsabilidad es preguntar por los datos, los errores y las consecuencias: quién se ve afectado si el modelo se equivoca, qué datos personales se comparten y quién responde por la decisión. Las decisiones importantes —salud, empleo, justicia— necesitan revisión humana, no solo la salida de un modelo.',
        eg: 'Un asistente que redacta borradores de correos es un uso de bajo riesgo con revisión humana fácil; un sistema que decide a quién se le concede un crédito sin explicación es de alto riesgo. Pedirle al modelo que cite sus fuentes y verificarlas es una forma práctica de usarlo sin delegar el juicio.',
        pr: 'Escribe tres reglas personales para usar asistentes de IA: qué les pedirías, qué verificarías siempre y qué nunca les compartirías.' }
    ]
  },
  'Recursos para Informática': {
    level: 'Principiante', hours: 2,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=85',
    intro: 'Colección de materiales y actividades para ampliar informática: guías, documentación, herramientas y proyectos.',
    body: ['Aprender informática no depende de un solo libro: hay guías oficiales, documentación, videos y proyectos que cubren cada tema. Este curso enseña a encontrarlos, evaluarlos y organizarlos en una colección personal útil.',
      'El criterio clave es evaluar cada recurso antes de usarlo: quién lo hizo, para quién, cuándo se actualizó y con qué licencia se puede reutilizar.'],
    context: 'Un recurso técnico se evalúa por su autoría, propósito, fecha, requisitos y licencia. Comparar varias fuentes y registrar versiones ayuda a elegir materiales pertinentes y reutilizarlos correctamente.',
    method: ['Define qué quieres aprender y con qué nivel.', 'Busca en fuentes oficiales y educativas primero.', 'Evalúa autor, fecha, requisitos y licencia.', 'Guarda el recurso con una nota de para qué sirve.'],
    checklist: ['¿El recurso viene de una fuente confiable y actualizada?', '¿Conoces sus requisitos y su licencia?', '¿Tienes anotado para qué tema sirve?'],
    diagram: ['Buscar', 'Evaluar', 'Organizar'],
    lessons: [
      { t: 'Guías y documentación', d: 'Dónde está la documentación oficial y cómo leerla.', m: '09:10',
        ex: 'La documentación oficial es la fuente más fiable: manuales de LibreOffice, documentación de Python o guías de Ubuntu. Se lee buscando el tema concreto, no de principio a fin: índice, ejemplos y sección de errores frecuentes.',
        eg: 'Para aprender a hacer un índice en Writer, el manual oficial explica el procedimiento en cinco pasos con capturas; un video al azar puede mostrar una versión antigua con menús distintos. Comprobar la versión de la guía evita seguir pasos que ya no existen.',
        pr: 'Busca la documentación oficial de una herramienta que uses y localiza en ella un procedimiento concreto. Anota su URL y su fecha.' },
      { t: 'Actividades', d: 'Prácticas guiadas y retos para afianzar cada tema.', m: '08:45',
        ex: 'Una buena actividad tiene objetivo claro, materiales listados y un resultado comprobable. Los retos cortos —reproducir un documento, calcular una tabla, montar un circuito— afianzan más que releer apuntes, porque obligan a aplicar lo aprendido.',
        eg: 'Después de estudiar hojas de cálculo, el reto "calcula el presupuesto de una fiesta con 8 invitados" obliga a usar fórmulas, formatos y un gráfico; releer el tema de fórmulas no garantiza saber aplicarlas.',
        pr: 'Elige un tema que hayas estudiado y diseña una actividad de 20 minutos con objetivo, materiales y resultado comprobable.' },
      { t: 'Herramientas', d: 'Editores, navegadores y utilidades gratuitas para practicar.', m: '09:30',
        ex: 'Practicar exige herramientas instaladas y conocidas: un editor de texto plano, un navegador con herramientas de desarrollo, LibreOffice y, según el tema, Gimp o Inkscape. Tenerlas listas antes de empezar evita perder la sesión de práctica instalando software.',
        eg: 'Para practicar HTML basta un editor de texto y un navegador; para practicar Gimp hace falta instalarlo y descargar dos fotos de prueba. Preparar el entorno es parte de la práctica, no un trámite previo.',
        pr: 'Haz una lista de las herramientas que necesitas para tu próximo tema y comprueba que están instaladas y actualizadas.' },
      { t: 'Proyectos', d: 'De la práctica suelta al proyecto completo y publicable.', m: '10:15',
        ex: 'Un proyecto reúne varias habilidades en un resultado real: una página web, un informe con índice, una presentación. Se planifica en fases —idea, borrador, revisión y entrega— y se guarda con versiones para poder volver atrás.',
        eg: 'El proyecto "mi primera página web" combina HTML, CSS e imágenes; se entrega como carpeta con index.html, estilos e imágenes. Guardar una copia de cada fase permite recuperar el borrador si la fase final se rompe.',
        pr: 'Define un proyecto pequeño de informática con sus fases y su resultado final. Escribe qué habilidades de cada tema vas a usar.' },
      { t: 'Recursos de consulta', d: 'Organizar tu colección: marcadores, notas y licencias.', m: '08:20',
        ex: 'Una colección personal se organiza en carpetas por tema, con cada recurso anotado: para qué sirve, de qué versión es y con qué licencia se puede reutilizar. Los marcadores del navegador con carpetas y las notas breves bastan para mantenerla.',
        eg: 'Guardar "Guía de Calc — fórmulas, 2024, CC BY" en la carpeta Hojas de cálculo permite encontrarla en segundos dentro de un año; guardar solo el enlace sin nota obliga a abrirlo para recordar de qué trataba.',
        pr: 'Crea tu colección con cinco recursos reales: título, tema, URL, fecha y una línea de para qué sirve cada uno.' }
    ]
  },
  'Aprender Informática': {
    level: 'Principiante', hours: 4,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=85',
    intro: 'Temas de informática explicados y organizados para el aprendizaje autónomo: hardware, software, redes y seguridad.',
    body: ['Este curso es un mapa completo de la informática básica: qué es un ordenador por dentro, qué hace el software, cómo viajan los datos por una red y cómo protegerlos. Está pensado para estudiarse por cuenta propia, tema a tema, con comprobaciones en cada paso.',
      'Cada lección conecta con la siguiente: el hardware ejecuta el software, el software se comunica por la red y la seguridad protege todo el conjunto. Al final tendrás una visión completa y un plan para seguir profundizando.'],
    context: 'La informática conecta dispositivos, programas, datos y personas. Los conceptos se comprenden mejor al seguir el recorrido de la información: cómo se representa, dónde se procesa, cómo se comparte y qué medidas mantienen su disponibilidad y privacidad.',
    method: ['Formula una pregunta concreta sobre el sistema o concepto.', 'Divide el tema en partes y dibuja cómo se relacionan.', 'Busca un ejemplo cotidiano y describe el flujo de información.', 'Resume qué ventajas, límites y precauciones tiene la solución.'],
    checklist: ['¿Identificaste las partes del sistema y sus relaciones?', '¿Puedes seguir el recorrido de los datos?', '¿Distingues una ventaja de una limitación o riesgo?'],
    diagram: ['Dispositivo', 'Red y servicios', 'Usuario'],
    lessons: [
      { t: 'Conceptos básicos', d: 'Datos, información y cómo un ordenador representa todo con bits.', m: '10:00',
        ex: 'Un ordenador representa todo con bits: 0 y 1. Ocho bits forman un byte; con un byte se representan 256 valores, suficientes para un carácter. Los datos son valores sin interpretar; la información es el dato con significado para alguien.',
        eg: 'El número 65 guardado como byte es el dato; interpretado como código de carácter es la letra "A". Una foto es una rejilla de píxeles, cada uno con números de color; sin el programa que los interpreta, solo son números.',
        pr: 'Escribe tres ejemplos de datos de tu entorno y qué información representan cuando se interpretan (una temperatura, una calificación, una hora).' },
      { t: 'Hardware y periféricos', d: 'Componentes internos y dispositivos de entrada y salida.', m: '11:20',
        ex: 'El hardware interno —procesador, memoria, almacenamiento y placa base— ejecuta y guarda; los periféricos conectan con el mundo: teclado y ratón entran datos, monitor y altavoces los muestran, y la impresora los lleva al papel. La conexión puede ser por cable (USB, HDMI) o inalámbrica (Bluetooth, wifi).',
        eg: 'Al escribir en el teclado, cada pulsación viaja como un código al procesador, que lo muestra en pantalla y lo guarda en la RAM; al guardar el documento, pasa al almacenamiento. Si el ratón no responde, se comprueba primero su conexión y su batería.',
        pr: 'Dibuja el esquema de tu equipo: componentes internos, periféricos y sus conexiones. Marca cuáles son de entrada, salida o mixtos.' },
      { t: 'Software y sistemas', d: 'Sistema operativo, aplicaciones y cómo se instalan.', m: '11:45',
        ex: 'El sistema operativo administra el hardware y ofrece servicios; las aplicaciones resuelven tareas. Instalar es copiar el programa, registrarlo en el sistema y crear accesos; actualizar es reemplazarlo por una versión corregida. Desinstalar debe eliminar sus archivos y registros.',
        eg: 'Instalar un navegador desde su web oficial descarga un instalador verificado; instalarlo desde un sitio desconocido puede añadir programas no deseados. Las actualizaciones automáticas del sistema corrigen fallos de seguridad sin intervención.',
        pr: 'Revisa qué programas tienes instalados, anota cuáles no usas desde hace meses y desinstala uno siguiendo el procedimiento del sistema.' },
      { t: 'Redes e Internet', d: 'Qué es una red, direcciones IP y cómo viaja la información.', m: '12:30',
        ex: 'Una red conecta dispositivos que intercambian paquetes de datos. Cada dispositivo tiene una dirección IP que lo identifica; el router conecta la red local con Internet y el DNS traduce nombres como socialred1.github.io a direcciones IP. La información viaja dividida en paquetes que se reordenan al llegar.',
        eg: 'Al abrir una página web, tu equipo pregunta al DNS la IP del servidor, el router envía la petición por Internet y el servidor responde con la página en paquetes. Si el DNS falla, la página no carga aunque la conexión funcione.',
        pr: 'Consulta la dirección IP local de tu equipo y la de tu router. Escribe en una frase qué hace cada una.' },
      { t: 'Seguridad y mantenimiento', d: 'Contraseñas, actualizaciones, copias y limpieza del equipo.', m: '10:50',
        ex: 'El mantenimiento básico es: contraseñas únicas con gestor, verificación en dos pasos, actualizaciones al día, copias de seguridad y limpieza de archivos y polvo. Ninguna medida basta sola; juntas reducen mucho el riesgo de perder datos o cuentas.',
        eg: 'Un equipo con el sistema sin actualizar durante un año acumula vulnerabilidades conocidas; una copia de seguridad mensual protege contra un disco roto o un ransomware. Revisar el espacio libre cada mes evita que el disco se llene y el sistema se vuelva lento.',
        pr: 'Haz tu plan de mantenimiento mensual: qué revisarás (actualizaciones, espacio, copias, contraseñas) y en qué fecha del mes.' }
    ]
  },
  'Lenguajes de programación': {
    level: 'Principiante', hours: 3,
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=85',
    intro: 'Conoce los lenguajes y conceptos que se usan para programar: qué los distingue y cómo elegir el primero.',
    body: ['Hay cientos de lenguajes de programación, pero todos comparten las mismas ideas: variables, decisiones, repeticiones y funciones. Lo que cambia es la sintaxis y el terreno donde cada uno brilla: web, datos, juegos, sistemas o educación.',
      'Este curso compara los lenguajes más usados con ejemplos equivalentes, para que elijas tu primer lenguaje con criterio y entiendas después cualquier otro con menos esfuerzo.'],
    context: 'Programar es expresar una solución precisa para que una computadora pueda ejecutarla. Antes de escribir código, aclara el problema, las entradas, las transformaciones y el resultado esperado.',
    method: ['Describe el problema con un ejemplo de entrada y su resultado esperado.', 'Escribe los pasos en lenguaje sencillo antes de elegir lenguaje.', 'Implementa una parte pequeña con nombres claros.', 'Prueba casos normales y límite; corrige la causa, no el síntoma.'],
    checklist: ['¿Las entradas y salidas del programa están definidas?', '¿Sabes por qué elegirías un lenguaje y no otro?', '¿Probaste un caso normal y uno límite?'],
    diagram: ['Problema', 'Lenguaje', 'Programa'],
    lessons: [
      { t: 'Algoritmos y programas', d: 'Qué es un algoritmo y cómo se convierte en programa.', m: '10:10',
        ex: 'Un algoritmo es una secuencia finita y ordenada de pasos que resuelve un problema; un programa es ese algoritmo escrito en un lenguaje que la computadora entiende. El mismo algoritmo —ordenar una lista, buscar un dato— se puede escribir en muchos lenguajes.',
        eg: 'El algoritmo para preparar café es: calentar agua, poner café en el filtro, verter el agua y esperar. Como programa, cada paso sería una instrucción y "esperar" una pausa. Si un paso falta o está desordenado, el resultado cambia.',
        pr: 'Escribe el algoritmo para encontrar el número mayor de una lista de tres números, paso a paso, sin usar código.' },
      { t: 'Lenguajes y sintaxis', d: 'Python, JavaScript, Java y C: qué los distingue.', m: '12:20',
        ex: 'Python destaca por su sintaxis legible y es muy usado en datos y educación; JavaScript es el lenguaje de la web; Java se usa en aplicaciones empresariales y Android; C está cerca del hardware y es base de sistemas operativos. La sintaxis cambia, pero las ideas —variables, bucles, funciones— son las mismas.',
        eg: 'Imprimir "Hola" es print("Hola") en Python, console.log("Hola") en JavaScript y System.out.println("Hola"); en Java. Tres sintaxis, una misma idea: mostrar un texto. Aprender la segunda es más fácil porque ya se conoce la idea.',
        pr: 'Escribe "Hola, mundo" en dos lenguajes distintos y anota qué cambia entre ellos y qué se mantiene.',
        code: { label: 'Ejemplo: la misma idea en dos lenguajes', code: 'Python:\nprint("Hola, mundo")\n\nJavaScript:\nconsole.log("Hola, mundo");' } },
      { t: 'Variables y datos', d: 'Números, texto, booleanos y listas: guardar información.', m: '11:30',
        ex: 'Una variable es un nombre que guarda un valor: un número, un texto, un valor verdadero/falso o una colección. El tipo de dato decide qué operaciones tienen sentido: sumar números, concatenar textos, comparar booleanos. Un nombre claro (precio_total) vale más que un comentario.',
        eg: 'En Python, precio = 12.5 guarda un número decimal y nombre = "Ana" un texto; precio + 2 da 14.5, pero nombre + 2 da error porque no se puede sumar texto y número. La lista precios = [12.5, 8.0, 4.5] guarda varios valores en orden.',
        pr: 'Define variables para una compra: nombre del cliente, tres precios y si tiene descuento. Calcula el total con una expresión.',
        code: { label: 'Ejemplo: variables y tipos en Python', code: 'nombre = "Ana"\nprecios = [12.5, 8.0, 4.5]\ntotal = sum(precios)\ncon_descuento = True\nprint(nombre, total)' } },
      { t: 'Instrucciones', d: 'Secuencias, decisiones con if y repeticiones con bucles.', m: '12:45',
        ex: 'Todo programa combina tres estructuras: secuencia (una instrucción tras otra), decisión (if: si se cumple una condición, haz esto) y repetición (while o for: repite mientras se cumpla una condición). Con solo esas tres se puede escribir cualquier programa.',
        eg: 'Para decidir si un alumno aprueba: si calificacion >= 6, mostrar "Aprobado"; si no, "Repasar". Para sumar diez precios: un bucle for que recorra la lista y acumule cada valor en total. La condición del bucle debe poder dejar de cumplirse, o el programa no termina.',
        pr: 'Escribe en pseudocódigo un programa que lea cinco calificaciones y muestre el promedio y si el alumno aprueba (promedio >= 6).',
        code: { label: 'Ejemplo: decisión y bucle en Python', code: 'calificaciones = [8, 6, 9, 7, 10]\npromedio = sum(calificaciones) / len(calificaciones)\nif promedio >= 6:\n    print("Aprobado:", promedio)\nelse:\n    print("Repasar:", promedio)' } },
      { t: 'Primeros ejercicios', d: 'Tres programas completos: calculadora, lista y adivinanza.', m: '13:00',
        ex: 'El primer programa útil es una calculadora que pide dos números y muestra su suma; el segundo, una lista de tareas que se puede ampliar; el tercero, un juego de adivinar un número con pistas de "mayor" o "menor". Los tres usan entrada, variables, decisiones y bucles.',
        eg: 'El juego de adivinar elige un número secreto entre 1 y 100, pide intentos en un bucle y responde "mayor" o "menor" hasta acertar; al final muestra cuántos intentos tomó. Si el jugador escribe texto en vez de número, el programa debe controlarlo sin romperse.',
        pr: 'Escribe el juego de adivinar un número en el lenguaje que prefieras. Pruébalo con tres partidas y anota qué mejorarías.',
        code: { label: 'Ejemplo: juego de adivinar en Python', code: 'secreto = 42\nintento = 0\nwhile intento != secreto:\n    intento = int(input("Adivina (1-100): "))\n    if intento < secreto:\n        print("Mayor")\n    elif intento > secreto:\n        print("Menor")\nprint("¡Acertaste!")' } }
    ]
  },
  'Diagramas de flujo': {
    level: 'Principiante', hours: 3,
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1400&q=85',
    intro: 'Representa algoritmos y resuelve problemas con diagramas de flujo: símbolos, decisiones y repeticiones.',
    body: ['Un diagrama de flujo dibuja un algoritmo: cada símbolo es un paso y las flechas marcan el orden. Antes de escribir código, dibujar el flujo revela errores de lógica que en el teclado costarían mucho más encontrar.',
      'Aprenderás los símbolos estándar —inicio, proceso, decisión, entrada/salida y fin— y a usarlos para resolver problemas reales: decidir una aprobación, buscar un dato o repetir una tarea hasta cumplir una condición.'],
    context: 'Un algoritmo define pasos finitos y ordenados. Una condición elige una ruta; un bucle repite instrucciones mientras se cumpla una regla. Diagramas y pseudocódigo permiten revisar la lógica antes de programar.',
    method: ['Escribe el problema y un ejemplo de entrada con su salida.', 'Dibuja el flujo con los símbolos estándar.', 'Recorre el diagrama con un ejemplo concreto, paso a paso.', 'Comprueba los casos límite: qué pasa al inicio y al final.'],
    checklist: ['¿Cada símbolo es el correcto para su acción?', '¿Todas las rutas llegan a Fin?', '¿Probaste el diagrama con un ejemplo y un caso límite?'],
    diagram: ['Inicio', 'Decisión', 'Fin'],
    lessons: [
      { t: 'Símbolos básicos', d: 'Óvalo, rectángulo, rombo y paralelogramo: qué significa cada uno.', m: '09:35',
        ex: 'Los símbolos estándar son: óvalo para Inicio y Fin, rectángulo para procesos (cálculos, asignaciones), rombo para decisiones (preguntas sí/no) y paralelogramo para entrada y salida de datos. Las flechas unen los símbolos en el orden de ejecución.',
        eg: 'El flujo "leer un número, multiplicarlo por 2 y mostrar el resultado" usa: óvalo Inicio, paralelogramo "leer número", rectángulo "doble = número * 2", paralelogramo "mostrar doble" y óvalo Fin. Cambiar el rectángulo por un rombo sería un error: multiplicar no es una decisión.',
        pr: 'Dibuja el diagrama de flujo para calcular el área de un rectángulo a partir de su base y su altura.',
        code: { label: 'Ejemplo: símbolos de un cálculo simple', code: 'INICIO\n  leer base, altura\n  area = base * altura\n  mostrar area\nFIN' } },
      { t: 'Secuencias', d: 'Pasos en orden: el flujo más simple y su uso real.', m: '09:50',
        ex: 'Una secuencia es una lista de pasos en orden, sin decisiones ni repeticiones. Muchos procedimientos cotidianos son secuencias: seguir una receta, montar un mueble o convertir unidades. En un diagrama, la secuencia es una cadena vertical de símbolos unidos por flechas.',
        eg: 'Convertir grados Celsius a Fahrenheit es una secuencia: leer Celsius, calcular F = C * 9/5 + 32 y mostrar F. Con C = 20, el cálculo da 68 °F; recorrer el diagrama con ese ejemplo confirma que cada paso produce lo esperado.',
        pr: 'Dibuja la secuencia para preparar un té: calentar agua, poner la bolsita, esperar 3 minutos y retirar la bolsita. Recórrela con un ejemplo.' },
      { t: 'Decisiones', d: 'El rombo: rutas sí/no y decisiones anidadas.', m: '11:10',
        ex: 'Una decisión es una pregunta con dos salidas: Sí y No. El rombo contiene la condición (por ejemplo, "calificación >= 6") y cada flecha de salida lleva a una ruta distinta. Las decisiones pueden anidarse: dentro de la ruta Sí puede haber otra decisión.',
        eg: 'Para decidir si un alumno aprueba: el rombo pregunta "¿promedio >= 6?"; por Sí se muestra "Aprobado" y por No se muestra "Repasar". Si además hay que distinguir "Sobresaliente" (promedio >= 9), se añade un segundo rombo dentro de la ruta Sí.',
        pr: 'Dibuja el flujo que decide el precio de una entrada de cine: menor de 12 años paga 5, entre 12 y 64 paga 8 y 65 o más paga 6.',
        code: { label: 'Ejemplo: decisión con dos rutas', code: 'INICIO\n  leer promedio\n  ¿promedio >= 6?\n    SÍ -> mostrar "Aprobado"\n    NO -> mostrar "Repasar"\nFIN' } },
      { t: 'Repeticiones', d: 'Bucles: repetir mientras se cumpla una condición.', m: '11:40',
        ex: 'Una repetición ejecuta un bloque varias veces mientras se cumpla una condición; la flecha vuelve hacia atrás formando un ciclo. El bucle necesita una variable que cambie en cada vuelta (un contador) para que la condición pueda dejar de cumplirse y el flujo termine.',
        eg: 'Sumar los números del 1 al 5 usa un contador que empieza en 1 y un acumulador en 0: en cada vuelta se suma el contador al acumulador y el contador aumenta en 1; cuando el contador supera 5, el flujo sale del ciclo y muestra 15. Sin el aumento, el bucle no terminaría nunca.',
        pr: 'Dibuja el flujo para sumar los primeros 10 números pares. Recórrelo a mano con una tabla de contador y acumulador.',
        code: { label: 'Ejemplo: bucle con contador', code: 'INICIO\n  total = 0; contador = 1\n  MIENTRAS contador <= 5:\n    total = total + contador\n    contador = contador + 1\n  mostrar total\nFIN' } },
      { t: 'Diseño de algoritmos', d: 'Un problema completo: del enunciado al diagrama verificado.', m: '12:20',
        ex: 'Diseñar un algoritmo es: entender el problema, listar entradas y salidas, dibujar el flujo y probarlo con ejemplos, incluidos los casos límite. Un diagrama verificado se traduce a cualquier lenguaje casi sin pensar; uno sin probar esconde errores.',
        eg: 'El problema "encontrar el mayor de tres números" se resuelve con dos decisiones: primero comparar a con b y guardar el mayor, luego compararlo con c. Probarlo con (3, 9, 5), (9, 9, 9) y (-1, -5, 0) revela si los empates y negativos están bien tratados.',
        pr: 'Diseña el diagrama para encontrar el mayor de tres números y pruébalo con tres ejemplos, incluido uno con números iguales.',
        code: { label: 'Ejemplo: algoritmo para el mayor de tres', code: 'INICIO\n  leer a, b, c\n  mayor = a\n  ¿b > mayor? SÍ -> mayor = b\n  ¿c > mayor? SÍ -> mayor = c\n  mostrar mayor\nFIN' } }
    ]
  },
  'Actividades desconectadas': {
    level: 'Principiante', hours: 2,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=85',
    intro: 'Practica ideas de programación con actividades sin ordenador: instrucciones, patrones, condiciones y algoritmos en equipo.',
    body: ['Programar no exige una pantalla: las ideas —dar instrucciones precisas, detectar patrones, decidir según condiciones— se practican con tarjetas, juegos y retos en equipo. Estas actividades desconectadas son la puerta de entrada al pensamiento computacional.',
      'Cada actividad termina con una reflexión: qué parte fue algoritmo, dónde hubo una decisión y qué cambiarías para que otro equipo lo resolviera mejor.'],
    context: 'Un algoritmo es una secuencia de pasos que cualquiera puede seguir. Sin ordenador, los errores se ven de inmediato: si la instrucción es ambigua, el compañero hace otra cosa.',
    method: ['Explica la tarea con palabras simples y un ejemplo.', 'Escribe las instrucciones paso a paso, sin dar nada por hecho.', 'Pruébalas con un compañero que las siga al pie de la letra.', 'Corrige la instrucción ambigua, no a la persona.'],
    checklist: ['¿Las instrucciones se pueden seguir sin preguntar?', '¿El resultado fue el esperado al probarlas?', '¿Sabes dónde hubo una decisión o una repetición?'],
    diagram: ['Instrucción', 'Prueba', 'Corrección'],
    lessons: [
      { t: 'Instrucciones y secuencias', d: 'Dar órdenes precisas: el juego del robot humano.', m: '09:00',
        ex: 'En el juego del robot humano, una persona es el robot y solo obedece instrucciones literales: "avanza un paso", "gira a la derecha". Decir "ve hasta la puerta" no basta: el robot no sabe cuántos pasos ni hacia dónde. La precisión es la primera lección de programación.',
        eg: 'Para que el robot llegue a la puerta hacen falta instrucciones como: avanza 3 pasos, gira a la derecha, avanza 2 pasos. Si alguien dice "avanza un poco", el robot avanza un paso y se detiene: la instrucción era ambigua y el error es de quien la dio, no del robot.',
        pr: 'En pareja, guía a tu compañero hasta un objeto de la sala usando solo "avanza un paso", "gira a la izquierda" y "gira a la derecha". Anota qué instrucciones fallaron.' },
      { t: 'Patrones', d: 'Detectar repeticiones en secuencias, música y dibujos.', m: '08:40',
        ex: 'Un patrón es algo que se repite con una regla: rojo, azul, rojo, azul; o 2, 4, 6, 8. Detectar el patrón permite predecir qué sigue y describirlo con una regla corta en vez de listar cada elemento. En programación, un patrón es la pista de un bucle.',
        eg: 'En la secuencia de baldosas "cuadrado, triángulo, cuadrado, triángulo", el siguiente es un cuadrado; la regla es "alternar". En la secuencia 3, 6, 9, 12, la regla es "sumar 3" y el siguiente es 15. Describir la regla es programar sin teclado.',
        pr: 'Crea una secuencia de figuras con un patrón y pide a un compañero que adivine la regla y el siguiente elemento.' },
      { t: 'Condiciones', d: 'Si pasa esto, haz aquello: decisiones en juegos y retos.', m: '09:20',
        ex: 'Una condición es una regla del tipo "si ocurre X, haz Y; si no, haz Z". Los juegos están llenos de ellas: si caes en la casilla roja, retrocedes dos; si sacas un 6, tiras otra vez. Escribir condiciones claras evita discusiones sobre las reglas.',
        eg: 'En el juego de "simón dice", la condición es "si Simón dice la orden, obedécela; si no la dice, quédate quieto". Quien obedece sin que Simón lo diga, pierde: la condición no se cumplió y la acción era incorrecta.',
        pr: 'Inventa un juego de mesa sencillo con dos condiciones escritas. Juégalo una ronda y anota si alguna condición fue ambigua.' },
      { t: 'Algoritmos en equipo', d: 'Resolver un reto entre varios: repartir pasos y coordinarse.', m: '10:00',
        ex: 'Un algoritmo en equipo reparte pasos entre personas: una lee las instrucciones, otra ejecuta y otra comprueba. Coordinarse exige acordar el orden, las señales y qué hace cada uno cuando algo falla. Es la versión humana de un programa con funciones.',
        eg: 'Para construir una torre de vasos con una goma y cuerdas, cada persona tira de una cuerda: si una tira más que las demás, la torre cae. El equipo debe acordar pasos —"todos tensan, luego subimos 5 centímetros"— y comprobar después de cada paso.',
        pr: 'En equipo de tres, ordenen diez tarjetas numeradas sin hablar, usando solo gestos acordados. Anoten qué reglas inventaron para coordinarse.' },
      { t: 'Retos', d: 'Tres retos finales que combinan secuencias, patrones y decisiones.', m: '09:45',
        ex: 'Los retos finales combinan todo: una secuencia para cruzar un laberinto dibujado, un patrón para completar una serie y una decisión para elegir el camino según una pista. Resolverlos exige planificar antes de actuar y revisar después.',
        eg: 'En el laberinto, el reto es escribir las instrucciones antes de mover la ficha: si el plan dice "avanza 2, gira, avanza 1" y la ficha choca con una pared, el error está en el plan, no en la ficha. Corregir el plan es depurar.',
        pr: 'Resuelve el reto del laberinto escribiendo primero todas las instrucciones y ejecutándolas después sin cambiarlas. Cuenta cuántos intentos necesitaste.' }
    ]
  },
  'Curso Code': {
    level: 'Principiante', hours: 3,
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1400&q=85',
    intro: 'Aprende programación con actividades visuales e interactivas: bloques, secuencias, bucles y condicionales.',
    body: ['Code.org ofrece un camino visual para aprender a programar: bloques que encajan como piezas y muestran el resultado al instante. Es ideal para empezar sin preocuparse por la sintaxis.',
      'Recorrerás secuencias, bucles y condicionales con personajes y laberintos, y terminarás con un proyecto interactivo propio que podrás compartir.'],
    context: 'La programación visual organiza instrucciones en bloques compatibles, haciendo visibles secuencias, eventos y controles. Separar comportamientos evita que un proyecto se vuelva difícil de depurar.',
    method: ['Observa el objetivo y predice qué debe hacer el programa.', 'Arma la solución con pocos bloques y pruébala.', 'Si falla, cambia un bloque a la vez.', 'Añade una mejora solo cuando la base funciona.'],
    checklist: ['¿El programa hace lo que predijiste antes de ejecutarlo?', '¿Cada bloque tiene un propósito claro?', '¿Probaste el proyecto desde el inicio, no solo el final?'],
    diagram: ['Bloques', 'Ejecución', 'Proyecto'],
    lessons: [
      { t: 'Entorno y bloques', d: 'El área de trabajo: bloques, escenario y botón de ejecutar.', m: '09:15',
        ex: 'El entorno de Code.org muestra la paleta de bloques a la izquierda, el área de trabajo en el centro y el escenario a la derecha, donde se ve el resultado. Los bloques encajan solo si son compatibles: un bloque de movimiento no encaja dentro de uno de repetición sin sentido.',
        eg: 'Para mover un personaje dos casillas, se arrastran dos bloques "avanzar" y se pulsa Ejecutar; el personaje se mueve en el escenario. Si los bloques están en orden distinto, el personaje hace otra cosa: el orden de los bloques es el programa.',
        pr: 'Abre una actividad de laberinto, arrastra tres bloques de movimiento y ejecuta. Observa qué hace el personaje y corrige el orden si no llegó a la meta.' },
      { t: 'Secuencias', d: 'Ordenar instrucciones para resolver laberintos.', m: '10:30',
        ex: 'Una secuencia es una lista ordenada de instrucciones. En los laberintos de Code.org, cada bloque "avanzar", "girar a la izquierda" o "girar a la derecha" es un paso; el conjunto resuelve el laberinto si el orden y la cantidad son correctos.',
        eg: 'Un laberinto con un giro a la derecha a mitad de camino se resuelve con: avanzar, avanzar, girar a la derecha, avanzar. Un bloque de más hace que el personaje choque con la pared; uno de menos lo deja a mitad de camino.',
        pr: 'Resuelve un laberinto de cuatro pasos escribiendo primero la secuencia en papel y luego armándola con bloques.' },
      { t: 'Bucles', d: 'Repetir con "repetir N veces": menos bloques, mismo resultado.', m: '11:00',
        ex: 'Un bucle repite un grupo de bloques un número de veces. Si un personaje debe avanzar 4 casillas, en vez de cuatro bloques "avanzar" se usa un bloque "repetir 4 veces" con un "avanzar" dentro. Menos bloques significa menos errores y un programa más fácil de leer.',
        eg: 'Dibujar un cuadrado con el personaje exige avanzar y girar cuatro veces: con bucle son dos bloques dentro de un "repetir 4 veces"; sin bucle son ocho bloques. Si el cuadrado sale torcido, el error está en el ángulo de giro (90 grados), no en la repetición.',
        pr: 'Dibuja un cuadrado con el personaje usando un bucle. Luego cambia el número de repeticiones y observa qué figura sale.',
        code: { label: 'Ejemplo: dibujar un cuadrado con un bucle', code: 'REPETIR 4 veces:\n  avanzar 100 pasos\n  girar 90 grados' } },
      { t: 'Condicionales', d: 'Si hay un obstáculo, gira: decisiones en el programa.', m: '11:20',
        ex: 'Un condicional ejecuta bloques solo si se cumple una condición, como "si hay un camino a la derecha". Esto permite programas que reaccionan al entorno en vez de seguir una lista fija: el personaje decide en cada paso según lo que detecta.',
        eg: 'En un laberinto con bifurcaciones, el programa "si hay camino a la derecha, gira a la derecha; si no, avanza" resuelve laberintos distintos sin cambiar el código. Sin condicionales, cada laberinto necesitaría su propia secuencia.',
        pr: 'Arma un programa con un condicional que haga girar al personaje solo cuando haya un obstáculo delante. Pruébalo en dos laberintos distintos.' },
      { t: 'Proyecto interactivo', d: 'Tu propia actividad: personaje, objetivo y controles.', m: '12:40',
        ex: 'El proyecto final combina todo: un personaje, un objetivo claro (llegar a una meta o recoger objetos), controles y un mensaje final. Se planifica en papel —qué hace cada bloque y cuándo— y se construye por partes, probando cada una antes de añadir la siguiente.',
        eg: 'Un minijuego de recoger estrellas usa: un bucle para mover al personaje, un condicional para detectar estrellas y un contador que suma puntos. Si el contador no sube, el error suele estar en la condición de detección, no en el movimiento.',
        pr: 'Diseña tu proyecto en papel (personaje, objetivo, bloques necesarios) y constrúyelo por partes. Comparte el enlace con un compañero para que lo pruebe.' }
    ]
  },
  'Curso Scratch 3': {
    level: 'Principiante', hours: 4,
    image: 'https://images.unsplash.com/photo-1596496050755-c923e73e42e1?auto=format&fit=crop&w=1400&q=85',
    intro: 'Crea historias, animaciones y juegos con programación por bloques en Scratch 3.',
    body: ['Scratch convierte la programación en piezas de colores que encajan: mover, decir, esperar, repetir y decidir. Con un escenario, personajes (sprites) y sonidos se crean historias animadas y juegos completos.',
      'Aprenderás a dar vida a un personaje, a reaccionar a teclas y clics, y a organizar un proyecto en bloques ordenados que otros puedan entender y modificar.'],
    context: 'En Scratch, cada sprite tiene sus propios bloques: al presionar la bandera verde, cada uno ejecuta su guion. Los mensajes permiten que un sprite avise a otro para coordinar la historia.',
    method: ['Elige un sprite y define qué debe hacer al iniciar.', 'Añade un comportamiento a la vez y pruébalo.', 'Usa mensajes para coordinar varios sprites.', 'Guarda versiones y pide a alguien que pruebe tu proyecto.'],
    checklist: ['¿Cada sprite tiene un guion claro y con nombre?', '¿El proyecto funciona desde la bandera verde?', '¿Alguien más pudo jugarlo sin explicaciones?'],
    diagram: ['Escenario', 'Sprites', 'Historia o juego'],
    lessons: [
      { t: 'Escenario y personajes', d: 'El escenario, los sprites y sus disfraces.', m: '10:15',
        ex: 'El escenario es el fondo donde ocurre todo; los sprites son los personajes y objetos, cada uno con disfraces (apariencias) y sonidos. Un sprite se mueve con coordenadas x e y: el centro es (0, 0), la derecha es x positiva y arriba es y positiva.',
        eg: 'Un gato en (-100, 0) está a la izquierda del centro; moverlo a (100, 0) lo cruza al otro lado. Cambiar su disfraz de "gato-a" a "gato-b" simula que camina si se alternan rápido.',
        pr: 'Crea un proyecto con un fondo, dos sprites y un cambio de disfraz al presionar la bandera verde.' },
      { t: 'Movimiento y eventos', d: 'Bandera verde, teclas y clics: cómo empieza todo.', m: '11:30',
        ex: 'Todo en Scratch empieza con un evento: al presionar la bandera verde, al presionar una tecla o al hacer clic en un sprite. El movimiento se controla con bloques "mover N pasos", "ir a x, y" y "girar", y los bordes se manejan con "si toca el borde, rebotar".',
        eg: 'Un juego de naves usa "al presionar flecha derecha: cambiar x por 10" para moverse y "si toca el borde, rebotar" para no salir de la pantalla. Sin el rebote, la nave desaparecería y el jugador no sabría dónde está.',
        pr: 'Haz que un sprite se mueva con las flechas del teclado y rebote en los bordes. Añade un sonido al chocar.',
        code: { label: 'Ejemplo: secuencia de bloques para una animación', code: 'AL PRESIONAR bandera verde\n  ir a posición inicial\n  REPETIR 10 veces\n    mover 10 pasos\n    si toca el borde: rebotar\n  decir "¡Listo!"' } },
      { t: 'Bucles y decisiones', d: 'Repetir y decidir: el corazón de un juego.', m: '12:20',
        ex: 'Los bucles "repetir N veces" y "por siempre" mantienen un comportamiento activo; el bloque "si... entonces" decide según una condición, como "si toca el color rojo". Combinados crean enemigos que persiguen, puntos que se recogen y vidas que se pierden.',
        eg: 'Un enemigo que persigue al jugador usa "por siempre: apuntar hacia el jugador, mover 3 pasos"; si además tiene "si toca al jugador, quitar una vida", el juego tiene reto. Sin el bucle, el enemigo se movería una sola vez y se quedaría quieto.',
        pr: 'Crea un sprite que persiga a otro con un bucle "por siempre" y una condición que reste un punto al tocarlo.' },
      { t: 'Variables y mensajes', d: 'Puntos, vidas y coordinación entre sprites.', m: '12:45',
        ex: 'Una variable guarda un valor que cambia: puntos, vidas o tiempo. Se crea en Datos, se muestra en el escenario y se cambia con "cambiar puntos por 1". Los mensajes coordinan sprites: uno envía "¡Meta!" y otro reacciona con "al recibir ¡Meta!".',
        eg: 'En un juego de recoger monedas, cada moneda al tocar al jugador hace "cambiar puntos por 1" y se esconde; cuando puntos llega a 10, envía el mensaje "¡Ganaste!" y otro sprite muestra el cartel de victoria. Sin el mensaje, el cartel no sabría cuándo aparecer.',
        pr: 'Añade una variable de puntos a tu proyecto y un mensaje que muestre "¡Ganaste!" al llegar a 5 puntos.' },
      { t: 'Juego o animación final', d: 'Proyecto completo: plan, construcción y prueba con otros.', m: '14:10',
        ex: 'El proyecto final se planifica antes de programar: qué sprites, qué objetivo, qué variables y qué mensajes. Se construye por partes —movimiento, puntos, final— probando cada una. Al terminar se comparte para que otros lo jueguen y den retroalimentación.',
        eg: 'Un juego de laberinto completo tiene: jugador que se mueve con flechas, paredes que lo detienen, una meta que envía "¡Ganaste!" y un contador de tiempo. Si el jugador atraviesa una pared, el error está en la condición de colisión, no en el movimiento.',
        pr: 'Construye tu juego o animación final con al menos tres sprites, una variable y un mensaje. Pide a un compañero que lo juegue y anota su retroalimentación.' }
    ]
  },
  'Curso Python': {
    level: 'Principiante', hours: 6,
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1400&q=85',
    intro: 'Aprende Python con fundamentos, ejercicios y pequeños programas: el lenguaje ideal para empezar a programar en serio.',
    body: ['Python es legible, potente y muy usado en educación, datos, web y automatización. Su sintaxis cercana al lenguaje natural permite concentrarse en resolver problemas en vez de pelear con el lenguaje.',
      'Escribirás programas reales desde la primera lección y terminarás con un proyecto completo: un programa con funciones, listas y archivos que podrás ampliar por tu cuenta.'],
    context: 'Los programas representan información con tipos de datos y nombres. Las funciones agrupan tareas y reciben parámetros; las colecciones almacenan varios valores. Nombres descriptivos y funciones pequeñas hacen que el código sea más fácil de probar.',
    method: ['Escribe el problema y un ejemplo de entrada y salida.', 'Implementa una parte pequeña y pruébala en la consola.', 'Divide el programa en funciones con un solo propósito.', 'Prueba casos normales, vacíos y límite.'],
    checklist: ['¿Cada función tiene un propósito y un nombre claro?', '¿Probaste el programa con una lista vacía y con un solo dato?', '¿Los mensajes de error te llevaron a la causa?'],
    diagram: ['Entrada', 'Funciones', 'Salida'],
    lessons: [
      { t: 'Instalación y entorno', d: 'Instalar Python, usar el intérprete y tu primer programa.', m: '10:20',
        ex: 'Python se instala desde python.org y se comprueba con python --version en la terminal. El intérprete interactivo (escribir python y pulsar Enter) permite probar líneas al instante; los programas se guardan en archivos .py y se ejecutan con python archivo.py.',
        eg: 'Escribir print("Hola, mundo") en el intérprete muestra el texto de inmediato; guardarlo en saludo.py y ejecutar python saludo.py hace lo mismo desde un archivo. Un editor como VS Code con la extensión de Python resalta la sintaxis y muestra errores.',
        pr: 'Instala Python, comprueba su versión y ejecuta tu primer programa, primero en el intérprete y luego desde un archivo.',
        code: { label: 'Ejemplo: tu primer programa', code: 'print("Hola, mundo")\nprint("Estoy aprendiendo Python")' } },
      { t: 'Variables y expresiones', d: 'Números, texto, operaciones y f-strings.', m: '13:40',
        ex: 'Una variable guarda un valor con un nombre: edad = 16, nombre = "Luis", precio = 12.5. Las expresiones combinan valores con operadores (+, -, *, /) y las f-strings incrustan variables en texto: f"Total: {total:.2f}" muestra el total con dos decimales.',
        eg: 'Con precios = [12.5, 8.0, 4.5], total = sum(precios) da 25.0 y promedio = total / len(precios) da 8.33. El f-string f"Promedio: {promedio:.2f}" muestra "Promedio: 8.33" sin cálculos manuales.',
        pr: 'Escribe un programa que guarde tres precios, calcule total y promedio, y los muestre con f-strings y dos decimales.',
        code: { label: 'Ejemplo ejecutable: recorrer datos y validar el resultado', code: 'precios = [12.5, 8.0, 4.5]\ntotal = sum(precios)\n\nif precios:\n    promedio = total / len(precios)\n    print(f"Total: {total:.2f}")\n    print(f"Promedio: {promedio:.2f}")' } },
      { t: 'Condiciones y bucles', d: 'if/elif/else, while y for: decidir y repetir.', m: '15:10',
        ex: 'La condición if evalúa una expresión y ejecuta un bloque solo si es verdadera; elif añade casos y else cubre el resto. El bucle for recorre una colección elemento a elemento y while repite mientras una condición sea verdadera. La indentación marca qué pertenece a cada bloque.',
        eg: 'Para clasificar calificaciones: if nota >= 9: "Sobresaliente", elif nota >= 6: "Aprobado", else: "Repasar". Para sumar una lista: total = 0 y for precio in precios: total += precio. Un while sin condición de salida repite para siempre.',
        pr: 'Escribe un programa que recorra una lista de calificaciones y muestre cuántas aprobaron (nota >= 6) y cuál fue la mayor.',
        code: { label: 'Ejemplo: condiciones y bucle en Python', code: 'notas = [8, 5, 9, 6, 4]\naprobadas = 0\nfor nota in notas:\n    if nota >= 6:\n        aprobadas += 1\nprint("Aprobadas:", aprobadas)\nprint("Mayor:", max(notas))' } },
      { t: 'Funciones y colecciones', d: 'def, parámetros, return, listas y diccionarios.', m: '16:25',
        ex: 'Una función agrupa una tarea con nombre: def promedio(valores): calcula y devuelve con return. Las listas guardan valores en orden (precios[0] es el primero) y los diccionarios guardan pares clave-valor (alumno = {"nombre": "Ana", "nota": 9}).',
        eg: 'La función def promedio(valores): return sum(valores) / len(valores) si valores else 0 maneja el caso vacío sin romperse. Un diccionario de productos {"cuaderno": 2.5, "lápiz": 0.75} permite consultar el precio por nombre en vez de recordar posiciones.',
        pr: 'Escribe una función que reciba una lista de precios y devuelva total y promedio. Pruébala con una lista normal, una de un elemento y una vacía.',
        code: { label: 'Ejemplo: función con colecciones', code: 'def resumen(precios):\n    if not precios:\n        return 0, 0\n    total = sum(precios)\n    return total, total / len(precios)\n\ntotal, promedio = resumen([12.5, 8.0, 4.5])\nprint(f"Total: {total:.2f}, promedio: {promedio:.2f}")' } },
      { t: 'Proyecto práctico', d: 'Gestor de gastos: funciones, listas, archivos y menú.', m: '18:05',
        ex: 'El proyecto final es un gestor de gastos con menú: añadir gasto, listar gastos, mostrar total y guardar en un archivo de texto. Usa funciones para cada acción, una lista de diccionarios para los datos y manejo de archivos con open() para que los gastos sobrevivan al cerrar el programa.',
        eg: 'El menú muestra opciones 1-4 en un bucle while; la opción 1 pide descripción y cantidad y añade {"descripcion": "Café", "cantidad": 3.5} a la lista; la opción 4 guarda cada gasto como una línea en gastos.txt. Al iniciar, el programa lee el archivo si existe.',
        pr: 'Construye el gestor de gastos con menú, funciones y guardado en archivo. Pruébalo añadiendo tres gastos, cerrando el programa y volviéndolo a abrir.',
        code: { label: 'Ejemplo: guardar datos en un archivo', code: 'def guardar(gastos, ruta="gastos.txt"):\n    with open(ruta, "w", encoding="utf-8") as f:\n        for g in gastos:\n            f.write(f"{g[\'descripcion\']};{g[\'cantidad\']}\\n")' } }
    ]
  },
  'Recursos para Programación': {
    level: 'Principiante', hours: 2,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=85',
    intro: 'Material complementario para practicar algoritmos y programación: documentación, entornos, ejercicios y proyectos.',
    body: ['Programar se aprende programando, y para eso hacen falta buenos ejercicios, documentación clara y un entorno listo. Este curso reúne y evalúa esos recursos para que practiques sin perder tiempo buscando.',
      'Aprenderás a leer documentación oficial, a elegir retos adecuados a tu nivel y a organizar tus propios proyectos de práctica.'],
    context: 'Un buen recurso de programación tiene ejemplos que se pueden ejecutar, explica el porqué y no solo el cómo, y está actualizado para la versión que usas.',
    method: ['Define qué concepto quieres practicar.', 'Busca un ejercicio con resultado comprobable.', 'Resuélvelo primero en papel o pseudocódigo.', 'Compara tu solución con la propuesta y anota qué aprendiste.'],
    checklist: ['¿El ejercicio tiene un resultado que puedes comprobar?', '¿La documentación corresponde a tu versión?', '¿Guardaste tu solución con una nota de qué practica?'],
    diagram: ['Ejercicio', 'Solución', 'Revisión'],
    lessons: [
      { t: 'Documentación', d: 'Leer docs oficiales: Python, MDN y referencia de Scratch.', m: '09:05',
        ex: 'La documentación oficial —docs.python.org, developer.mozilla.org (MDN) para web, o la guía de Scratch— explica cada función con su sintaxis, parámetros y ejemplos. Se consulta buscando el nombre exacto de lo que se necesita, no leyéndola completa.',
        eg: 'Para saber cómo funciona sum() en Python, su documentación dice que recibe un iterable y un inicio opcional, y muestra sum([1, 2, 3]) → 6. Un tutorial al azar puede mostrar un uso antiguo; la documentación oficial muestra el actual.',
        pr: 'Busca en la documentación oficial cómo funciona una función que uses (por ejemplo, len o range) y anota sus parámetros y un ejemplo.' },
      { t: 'Entornos y herramientas', d: 'Editores, consolas y plataformas de práctica en línea.', m: '09:40',
        ex: 'Un entorno de práctica es un editor con resaltado de sintaxis y una forma de ejecutar el código: VS Code, Thonny para Python o el editor en línea de Scratch. Las plataformas de retos (como HackerRank o Codewars) añaden ejercicios con pruebas automáticas.',
        eg: 'Thonny muestra paso a paso cómo cambian las variables al ejecutar un programa Python, lo que ayuda a entender bucles; VS Code con extensiones sirve para proyectos mayores. Elegir el entorno según la tarea evita fricción.',
        pr: 'Prepara tu entorno: editor instalado, un archivo de prueba que se ejecute y una plataforma de retos con tu primer ejercicio resuelto.' },
      { t: 'Ejercicios', d: 'Retos graduados: de la calculadora al juego completo.', m: '10:20',
        ex: 'Los ejercicios se gradúan: primero cálculos y textos, luego listas y decisiones, después funciones y archivos. Cada reto debe tener una entrada, una salida esperada y al menos un caso límite para probar.',
        eg: 'El reto "contar vocales de un texto" tiene entrada "Hola" y salida 2; los casos límite son el texto vacío (0) y un texto sin vocales (0). Resolverlo exige recorrer el texto y decidir por cada carácter, dos ideas en un solo ejercicio.',
        pr: 'Resuelve tres retos graduados y anota para cada uno la entrada, la salida esperada y el caso límite que probaste.' },
      { t: 'Proyectos', d: 'Proyectos de práctica: qué construir para afianzar cada tema.', m: '10:05',
        ex: 'Un proyecto de práctica tiene un resultado visible y un alcance cerrado: una calculadora, un gestor de tareas, un juego de adivinanza. Se planifica en funciones pequeñas y se entrega funcionando, aunque sea simple; ampliarlo después es más fácil que empezar grande.',
        eg: 'El gestor de tareas guarda tareas en una lista, permite añadir, listar y marcar como hechas, y guarda en archivo. Cada función tiene una responsabilidad; si listar falla, el error está en esa función, no en todo el programa.',
        pr: 'Define tu próximo proyecto de práctica con sus funciones y su resultado final. Escríbelo en cinco líneas o menos.' },
      { t: 'Enlaces de consulta', d: 'Tu colección de recursos: qué guardar y cómo organizarla.', m: '08:30',
        ex: 'Una colección útil guarda pocos enlaces pero buenos: la documentación de tu lenguaje, una plataforma de retos, un par de tutoriales de referencia y tus propios proyectos. Cada enlace lleva una nota de qué resuelve.',
        eg: 'Guardar "MDN — Array en JavaScript, para consultar métodos de listas" es más útil que guardar diez tutoriales sin nota. Revisar la colección cada mes elimina enlaces rotos o desactualizados.',
        pr: 'Crea tu colección con seis recursos reales y una línea por cada uno explicando para qué sirve.' }
    ]
  },
  'Circuitos con protoboard': {
    level: 'Principiante', hours: 4,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85',
    intro: 'Monta circuitos electrónicos y prácticas usando una protoboard: conexiones, LED, resistencias y entradas y salidas.',
    body: ['La protoboard es el laboratorio del principiante: permite montar circuitos sin soldar, cambiar conexiones en segundos y comprobar ideas antes de hacerlas definitivas. Entender cómo se conectan sus filas por dentro es el primer paso.',
      'Montarás circuitos reales con LED, pulsadores y resistencias, medirás tensiones y aprenderás a diagnosticar qué falla cuando algo no enciende.'],
    context: 'Una placa o protoboard proporciona conexiones mecánicas y eléctricas entre componentes. En una protoboard, ciertos grupos de orificios comparten conexión interna; el esquema evita asumir que dos puntos están unidos cuando no lo están.',
    method: ['Dibuja el circuito y anota alimentación, señal y referencia común.', 'Comprueba polaridad, conexiones y especificaciones con el circuito apagado.', 'Prueba primero cada componente de forma aislada.', 'Integra el programa, modifica una variable por vez y registra el comportamiento.'],
    checklist: ['¿El esquema coincide con el montaje?', '¿Verificaste polaridad y límites antes de alimentar?', '¿Puedes explicar qué entrada provoca cada salida?'],
    diagram: ['Esquema', 'Montaje', 'Medición'],
    lessons: [
      { t: 'Materiales y seguridad', d: 'Protoboard, cables, resistencias y normas antes de alimentar.', m: '09:30',
        ex: 'El material básico es: protoboard, cables puente, resistencias, LED, pulsadores y una fuente de 5 V (o una placa Arduino como fuente). Las normas son: trabajar con el circuito apagado al conectar, no superar la tensión de los componentes y no cortocircuitar la fuente.',
        eg: 'Un LED rojo típico soporta unos 20 mA y cae unos 2 V; conectarlo directo a 5 V sin resistencia lo quema en segundos. Con la ley de Ohm, R = (5 − 2) / 0,02 = 150 Ω: una resistencia de 220 Ω es segura y habitual.',
        pr: 'Calcula la resistencia para un LED con una fuente de 5 V y anota qué pasaría si usaras una de 10 Ω en vez de 220 Ω.' },
      { t: 'Conexiones en protoboard', d: 'Rieles, filas y cómo la corriente viaja por dentro.', m: '10:45',
        ex: 'En una protoboard, los rieles laterales (normalmente rojo para + y azul para −) recorren toda la placa y las filas centrales conectan cinco orificios en horizontal, con un surco en medio que separa ambas mitades. Dos componentes en la misma fila de cinco están conectados; en filas distintas, no.',
        eg: 'Para alimentar un LED, el riel rojo lleva 5 V a una fila, la resistencia une esa fila con la fila del ánodo del LED y el cátodo se conecta al riel azul (tierra). Si el LED queda a caballo del surco central, sus patas no se conectan entre sí por la placa.',
        pr: 'Dibuja una protoboard con sus rieles y filas y marca dónde conectarías un LED con su resistencia. Comprueba la continuidad con el circuito apagado.' },
      { t: 'LED y resistencias', d: 'Polaridad, caída de tensión y cálculo de la resistencia.', m: '12:00',
        ex: 'Un LED es un diodo: deja pasar corriente en un solo sentido, del ánodo (pata larga) al cátodo (pata corta, lado plano). La resistencia en serie limita la corriente según la ley de Ohm: R = (Vfuente − Vled) / I. Elegir bien protege el LED y la fuente.',
        eg: 'Con 5 V, un LED de 2 V y 20 mA necesita (5 − 2) / 0,02 = 150 Ω; con 220 Ω la corriente baja a unos 14 mA y el LED brilla un poco menos pero con margen de seguridad. Con 9 V y la misma resistencia de 220 Ω, la corriente subiría a unos 32 mA y el LED se dañaría.',
        pr: 'Calcula la resistencia para un LED azul (3 V, 20 mA) con fuentes de 5 V y de 9 V. Monta el circuito de 5 V y mide la tensión en el LED.',
        code: { label: 'Ejemplo: cálculo de la resistencia del LED', code: 'Vfuente = 5 V\nVled = 2 V\nI = 0,02 A (20 mA)\n\nR = (Vfuente - Vled) / I\nR = (5 - 2) / 0,02 = 150 ohmios\nUsar 220 ohmios: seguro y habitual' } },
      { t: 'Entradas y salidas', d: 'Pulsadores, resistencias pull-up y lectura de estados.', m: '11:15',
        ex: 'Un pulsador es una entrada: al presionarlo cierra un contacto y cambia la tensión que lee el circuito. Sin una resistencia pull-up o pull-down, la entrada queda flotante y lee valores aleatorios. La resistencia fija el estado en reposo: pull-up lo deja en alto (5 V) y pull-down en bajo (0 V).',
        eg: 'Con pull-up de 10 kΩ, el pulsador en reposo lee 5 V (ALTO) y al presionarlo conecta a tierra y lee 0 V (BAJO). Sin la resistencia, el cable actúa como antena y la lectura cambia sola con el ruido eléctrico cercano.',
        pr: 'Monta un pulsador con resistencia pull-up de 10 kΩ y un LED que se encienda solo mientras el pulsador está presionado.' },
      { t: 'Prácticas guiadas', d: 'Tres circuitos completos: semáforo, luz con pulsador y divisor de tensión.', m: '13:30',
        ex: 'La práctica final combina todo: un semáforo con tres LED (rojo, ámbar, verde) y sus resistencias, un pulsador que cambia el estado y un divisor de tensión con dos resistencias para medir. Cada circuito se dibuja, se monta, se alimenta y se mide.',
        eg: 'El semáforo usa tres LED en filas distintas con resistencias de 220 Ω cada uno; el pulsador con pull-up cambia de verde a rojo al presionarlo. El divisor con dos resistencias de 10 kΩ en serie a 5 V da 2,5 V en el punto medio, medible con multímetro.',
        pr: 'Monta el semáforo completo con pulsador y mide la tensión en cada LED encendido. Anota qué cambiarías para que el ámbar parpadee.',
        code: { label: 'Ejemplo: ciclo de lectura y decisión', code: 'iniciar entradas y salidas\nrepetir:\n  lectura = leer_pulsador()\n  si lectura es BAJO (presionado):\n    encender LED rojo\n  si no:\n    encender LED verde\n  esperar un intervalo breve' } }
    ]
  },
  'Guía de Arduino': {
    level: 'Intermedio', hours: 4,
    image: 'https://images.unsplash.com/photo-1608564697071-ddf911d81370?auto=format&fit=crop&w=1400&q=85',
    intro: 'Guía para conectar componentes y empezar con proyectos Arduino: placa, entorno, sensores y actuadores.',
    body: ['Arduino es una placa con microcontrolador que se programa desde el ordenador y controla el mundo físico: lee sensores y mueve motores, luces y pantallas. Es la puerta de entrada a la electrónica programable.',
      'Aprenderás a instalar el entorno, cargar tu primer programa, leer un sensor y controlar un actuador, con prácticas que podrás ampliar hacia tus propios proyectos.'],
    context: 'El microcontrolador ejecuta un programa cargado desde un entorno de desarrollo. Un ciclo de lectura, cálculo y escritura permite responder a entradas; separar pruebas de hardware y software ayuda a localizar fallos.',
    method: ['Dibuja el circuito y anota alimentación, señal y referencia común.', 'Comprueba el circuito apagado antes de conectar la placa.', 'Prueba primero cada componente de forma aislada.', 'Carga el programa, observa el monitor serie y ajusta una variable por vez.'],
    checklist: ['¿El esquema coincide con el montaje?', '¿Verificaste polaridad y límites antes de alimentar?', '¿El monitor serie muestra lo que esperabas?'],
    diagram: ['Sensor', 'Programa', 'Actuador'],
    lessons: [
      { t: 'Placa y entorno', d: 'Arduino UNO, el IDE y tu primer programa: Blink.', m: '11:00',
        ex: 'La placa Arduino UNO tiene pines digitales (0–13), analógicos (A0–A5), alimentación de 5 V y tierra. El IDE es el programa donde se escribe el código, se verifica y se carga por USB. El programa Blink enciende y apaga el LED integrado del pin 13 y es la prueba de que todo funciona.',
        eg: 'El ejemplo Blink usa pinMode(13, OUTPUT) en setup() y digitalWrite(13, HIGH) con delay(1000) en loop(). Cambiar delay a 200 hace parpadear el LED cinco veces por segundo. Si la carga falla, casi siempre es el puerto o el cable USB.',
        pr: 'Instala el IDE, conecta la placa, selecciona puerto y modelo, carga Blink y cambia el tiempo de parpadeo a 200 ms.',
        code: { label: 'Ejemplo: Blink, el primer programa Arduino', code: 'void setup() {\n  pinMode(13, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(1000);\n  digitalWrite(13, LOW);\n  delay(1000);\n}' } },
      { t: 'Conexiones', d: 'Cableado a la protoboard: alimentación, tierra y señales.', m: '10:30',
        ex: 'Conectar un componente a Arduino exige tres cosas: alimentación (5 V o 3,3 V), tierra (GND, referencia común) y señal (un pin digital o analógico). Sin tierra común, las señales no tienen referencia y las lecturas son erráticas.',
        eg: 'Un LED en el pin 9 necesita: pin 9 → resistencia 220 Ω → ánodo del LED, cátodo → GND. Un pulsador en el pin 2 usa INPUT_PULLUP interno, sin resistencia externa, y se conecta entre el pin y GND.',
        pr: 'Conecta un LED externo al pin 9 y un pulsador al pin 2. Escribe el programa que encienda el LED mientras el pulsador está presionado.' },
      { t: 'Carga de programas', d: 'setup, loop, verificación y errores comunes de carga.', m: '09:45',
        ex: 'Todo programa Arduino tiene setup(), que se ejecuta una vez (configurar pines, iniciar el puerto serie), y loop(), que se repite siempre. Verificar compila sin cargar; cargar envía el programa a la placa. Los errores más comunes son olvidar el punto y coma, elegir mal el puerto o tener el monitor serie ocupado.',
        eg: 'El error "avrdude: stk500_recv()" suele indicar que el puerto es incorrecto o que otra aplicación lo usa; el error "expected ; before" señala un punto y coma olvidado en la línea anterior a la marcada. Leer el mensaje completo, no solo la primera línea, ahorra tiempo.',
        pr: 'Escribe un programa con un error de sintaxis a propósito, lee el mensaje del compilador y corrígelo. Anota qué decía el mensaje.' },
      { t: 'Lectura de sensores', d: 'analogRead, el monitor serie y la conversión a unidades.', m: '13:15',
        ex: 'analogRead(pin) devuelve un valor entre 0 y 1023 proporcional a la tensión (0–5 V) en un pin analógico. El monitor serie muestra esos valores en el ordenador con Serial.print(). Convertir a unidades es aplicar la regla: tensión = lectura * 5,0 / 1023.',
        eg: 'Un sensor de luz (LDR) en un divisor con 10 kΩ da lecturas cerca de 900 con mucha luz y cerca de 100 en oscuridad. Con Serial.println(lectura) se ven los valores en tiempo real y se elige un umbral, por ejemplo 500, para decidir cuándo encender una luz.',
        pr: 'Conecta un LDR, muestra sus lecturas en el monitor serie con luz y con sombra, y elige un umbral para encender un LED.',
        code: { label: 'Ejemplo: leer un sensor y decidir', code: 'void setup() {\n  Serial.begin(9600);\n  pinMode(9, OUTPUT);\n}\nvoid loop() {\n  int lectura = analogRead(A0);\n  Serial.println(lectura);\n  digitalWrite(9, lectura < 500 ? HIGH : LOW);\n  delay(200);\n}' } },
      { t: 'Control de actuadores', d: 'LED con PWM, zumbador y servomotor: salidas con matices.', m: '12:40',
        ex: 'No todas las salidas son encendido o apagado: analogWrite(pin, valor 0–255) usa PWM para variar el brillo de un LED o la velocidad de un motor, tone(pin, frecuencia) hace sonar un zumbador y un servomotor se posiciona con pulsos. Cada actuador tiene sus límites eléctricos y su librería.',
        eg: 'Un LED en un pin PWM con analogWrite(9, 128) brilla a la mitad; con un potenciómetro leyendo A0 se puede mapear su valor (0–1023) a brillo (0–255) con map(). Un servo con la librería Servo.h se mueve con servo.write(90) al centro.',
        pr: 'Controla el brillo de un LED con un potenciómetro usando map() y PWM. Añade un zumbador que suene cuando el brillo supere cierto nivel.',
        code: { label: 'Ejemplo: brillo con potenciómetro y PWM', code: 'void loop() {\n  int valor = analogRead(A0);\n  int brillo = map(valor, 0, 1023, 0, 255);\n  analogWrite(9, brillo);\n  delay(50);\n}' } }
    ]
  },
  'Recursos de Arduino': {
    level: 'Principiante', hours: 2,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=85',
    intro: 'Recursos, referencias y actividades para trabajar con Arduino: documentación, librerías, ejemplos y proyectos.',
    body: ['Arduino tiene una comunidad enorme y eso es una ventaja: casi cualquier problema ya tiene ejemplo, librería o tutorial. La habilidad está en encontrar el recurso adecuado y adaptarlo a tu montaje.',
      'Este curso organiza la documentación oficial, las librerías esenciales y una colección de ejemplos y prácticas graduadas.'],
    context: 'Antes de basar una práctica en una biblioteca o plantilla, comprueba compatibilidad, documentación y permisos de uso.',
    method: ['Define qué quieres que haga el proyecto.', 'Busca el ejemplo oficial más cercano.', 'Adáptalo a tu montaje, cambiando una cosa a la vez.', 'Documenta qué cambiaste y por qué.'],
    checklist: ['¿El ejemplo corresponde a tu placa y tu versión del IDE?', '¿La librería está documentada y mantenida?', '¿Anotaste qué adaptaste del ejemplo original?'],
    diagram: ['Ejemplo', 'Adaptación', 'Proyecto'],
    lessons: [
      { t: 'Documentación de referencia', d: 'La referencia oficial de Arduino: funciones y lenguaje.', m: '09:00',
        ex: 'La referencia oficial (arduino.cc/reference) documenta cada función: pinMode, digitalWrite, analogRead, delay, Serial y todas las demás, con su sintaxis, parámetros y un ejemplo mínimo. Es la primera parada ante cualquier duda de sintaxis.',
        eg: 'La página de map() explica que reescala un valor de un rango a otro y advierte que no limita el resultado fuera del rango. Saberlo evita sorpresas cuando el potenciómetro da valores extremos.',
        pr: 'Busca en la referencia oficial tres funciones que uses (por ejemplo, tone, pulseIn, attach) y anota sus parámetros.' },
      { t: 'Librerías y herramientas', d: 'Instalar librerías, usar el monitor serie y el graficador.', m: '10:10',
        ex: 'Una librería añade funciones para un componente: Servo para servos, LiquidCrystal para pantallas, DHT para sensores de temperatura y humedad. Se instalan desde el Gestor de librerías del IDE y cada una trae ejemplos en Archivo > Ejemplos.',
        eg: 'La librería DHT permite leer temperatura y humedad con dht.readTemperature() tras incluir DHT.h y crear el objeto con el pin y el modelo. Sin la librería, habría que implementar el protocolo del sensor a mano.',
        pr: 'Instala la librería Servo desde el Gestor, abre su ejemplo Sweep y cárgalo. Anota qué hace cada parte del ejemplo.' },
      { t: 'Ejemplos', d: 'Los ejemplos del IDE: de Blink a los sensores.', m: '09:20',
        ex: 'El IDE incluye decenas de ejemplos ordenados por tema: lo básico (Blink, DigitalReadSerial), control (Fade, toneMelody) y sensores (AnalogInOutSerial). Cada ejemplo es un programa completo y comprobado que se puede cargar tal cual y luego modificar.',
        eg: 'El ejemplo AnalogInOutSerial lee un potenciómetro y muestra el valor en el monitor serie: es la base para cualquier proyecto con sensores. Modificar su umbral convierte la lectura en una decisión.',
        pr: 'Carga tres ejemplos del IDE y anota para cada uno qué hace y qué cambiarías para usarlo en un proyecto propio.' },
      { t: 'Prácticas', d: 'Prácticas graduadas para afianzar cada concepto.', m: '09:50',
        ex: 'Las prácticas se gradúan: encender un LED, leer un pulsador, medir con un sensor, controlar un servo y combinar todo en un proyecto. Cada práctica tiene su esquema, su código y una pregunta de comprobación.',
        eg: 'La práctica "alarma de luz" combina un LDR, un LED y un zumbador: si la luz baja del umbral, suena la alarma. Reúne lectura analógica, decisión y dos actuadores en un solo montaje.',
        pr: 'Elige una práctica de la lista y realízala completa: esquema, montaje, código y comprobación. Anota qué falló y cómo lo resolviste.' },
      { t: 'Proyectos', d: 'Ideas de proyectos completos y cómo planificarlos.', m: '10:30',
        ex: 'Un proyecto Arduino se planifica en fases: qué debe hacer, qué componentes necesita, qué esquema y qué programa. Los proyectos típicos son una estación meteorológica, un semáforo, un riego automático o un robot seguidor de línea.',
        eg: 'El riego automático usa un sensor de humedad, una bomba con relé y un umbral: si la tierra está seca, riega 5 segundos. El relé es necesario porque la placa no puede alimentar la bomba directamente.',
        pr: 'Planifica un proyecto completo en una página: objetivo, componentes, esquema, funciones del programa y cómo lo comprobarás.' }
    ]
  },
  'Conductímetro': {
    level: 'Intermedio', hours: 3,
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1400&q=85',
    intro: 'Explora la conductividad eléctrica con un proyecto de medición: construye un conductímetro y mide soluciones reales.',
    body: ['La conductividad mide qué tan bien un líquido conduce la electricidad, y depende de las sales disueltas en él: el agua destilada apenas conduce y el agua salada conduce mucho. Un conductímetro casero con Arduino lo mide con dos electrodos y una lectura analógica.',
      'Construirás el circuito, calibrarás con soluciones conocidas y medirás muestras reales, analizando qué significan los resultados y cuáles son los límites del instrumento.'],
    context: 'Un sensor convierte una magnitud física en una señal interpretable. Una lectura necesita unidades, rango y contexto; calibrar compara el sensor con una referencia y ayuda a detectar desviaciones.',
    method: ['Entiende el principio físico antes de montar.', 'Monta el circuito de medición con electrodos y divisor.', 'Calibra con soluciones de conductividad conocida.', 'Mide muestras, registra y analiza los resultados.'],
    checklist: ['¿Calibraste con al menos dos soluciones conocidas?', '¿Las lecturas son estables y repetibles?', '¿Puedes explicar qué significa cada valor medido?'],
    diagram: ['Electrodos', 'Lectura', 'Calibración'],
    lessons: [
      { t: 'Principio de conductividad', d: 'Qué es la conductividad y por qué depende de los iones.', m: '10:15',
        ex: 'La conductividad eléctrica de un líquido depende de los iones disueltos: sales como el cloruro de sodio se separan en iones que transportan carga. El agua destilada, sin iones, es casi aislante; el agua de mar conduce mucho. La unidad es el siemens por metro (S/m) y en la práctica se usan µS/cm.',
        eg: 'El agua destilada mide unos pocos µS/cm, el agua del grifo entre 200 y 800 µS/cm según la zona, y el agua de mar unos 50.000 µS/cm. Esas diferencias permiten distinguir muestras solo con una medición eléctrica.',
        pr: 'Ordena de menor a mayor conductividad: agua destilada, agua del grifo, agua con una cucharada de sal y agua de mar. Justifica tu orden.' },
      { t: 'Diseño del circuito', d: 'Electrodos, divisor de tensión y protección de la placa.', m: '11:30',
        ex: 'El conductímetro usa dos electrodos sumergidos que forman una resistencia variable según el líquido, en un divisor de tensión con una resistencia conocida. Para evitar la electrólisis (que corroe los electrodos con corriente continua), se alterna la polaridad o se mide con pulsos cortos.',
        eg: 'Con una resistencia fija de 1 kΩ y electrodos que en agua del grifo equivalen a unos 2 kΩ, el divisor a 5 V da unos 3,3 V en el punto medio. En agua destilada, la resistencia de los electrodos sube mucho y la tensión medida cae cerca de 0 V.',
        pr: 'Dibuja el divisor con la resistencia fija y los electrodos. Calcula la tensión del punto medio para dos valores de resistencia de muestra.' },
      { t: 'Conexión de sensores', d: 'Montaje en protoboard, electrodos y cableado.', m: '10:20',
        ex: 'Los electrodos pueden ser dos tornillos de acero inoxidable o dos puntas de grafito separadas por una distancia fija (por ejemplo, 1 cm). La distancia y el área determinan la constante de celda: si cambia la geometría, cambia la lectura y hay que recalibrar.',
        eg: 'Dos electrodos a 1 cm en agua del grifo dan una lectura analógica cercana a 680 (de 1023); si se separan a 2 cm, la lectura baja porque la resistencia del líquido aumenta. Fijar la geometría con un soporte es parte del instrumento.',
        pr: 'Monta los electrodos con separación fija y conéctalos al divisor. Mide la lectura en aire (sin líquido) y en agua del grifo.' },
      { t: 'Lectura de datos', d: 'analogRead, promedio de muestras y conversión a µS/cm.', m: '12:10',
        ex: 'La lectura se toma con analogRead y se promedia entre 10 muestras para reducir el ruido. La conversión a conductividad usa la calibración: con dos soluciones conocidas se obtiene la recta que relaciona lectura con µS/cm, y el programa aplica esa recta a cada medición.',
        eg: 'Si una solución de 1000 µS/cm da lectura 500 y una de 2000 µS/cm da lectura 750, la relación es aproximadamente conductividad = lectura * 4. El programa calcula conductividad = lectura * 4 y la muestra en el monitor serie con su unidad.',
        pr: 'Escribe el programa que promedia 10 lecturas y las convierte con tu factor de calibración. Muestra el valor en µS/cm en el monitor serie.',
        code: { label: 'Ejemplo: promedio y conversión a µS/cm', code: 'long suma = 0;\nfor (int i = 0; i < 10; i++) {\n  suma += analogRead(A0);\n  delay(20);\n}\nint lectura = suma / 10;\nfloat conductividad = lectura * 4.0; // factor de calibración\nSerial.print(conductividad);\nSerial.println(" uS/cm");' } },
      { t: 'Pruebas y análisis', d: 'Medir muestras reales y discutir errores y límites.', m: '11:45',
        ex: 'Medir muestras reales —agua del grifo, agua mineral, agua con sal— y comparar con valores esperados revela los límites del instrumento: la temperatura afecta la conductividad (sube ~2 % por °C), los electrodos se ensucian y la calibración se desplaza con el tiempo.',
        eg: 'Si el agua mineral mide 400 µS/cm y su etiqueta indica residuo seco compatible, la medición es coherente; si el agua del grifo mide 50 µS/cm un día y 600 al siguiente, algo cambió: electrodos sucios, temperatura distinta o calibración perdida.',
        pr: 'Mide tres muestras, anota temperatura y valor, y escribe una conclusión de dos frases: qué muestra conduce más y qué fuente de error podría afectar tu medición.' }
    ]
  },
  'Panel de control PC42': {
    level: 'Intermedio', hours: 4,
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=85',
    intro: 'Construye prácticas de control usando el panel PC42: entradas, salidas y programación de sistemas reales.',
    body: ['El panel PC42 es una plataforma didáctica con entradas y salidas reales —pulsadores, interruptores, LED, zumbadores y motores— conectadas a una placa programable. Permite practicar control sin montar cada circuito desde cero.',
      'Trabajarás con el panel como un sistema: leer sus entradas, programar decisiones y controlar sus salidas, hasta resolver ejercicios de control completos.'],
    context: 'Un sistema de control compara el estado observado con un objetivo y ajusta la acción. La realimentación permite corregir desviaciones, aunque una respuesta demasiado intensa puede causar oscilaciones.',
    method: ['Identifica en el panel cada entrada y cada salida.', 'Prueba cada elemento por separado antes de combinarlos.', 'Programa una regla de decisión simple y predice el resultado.', 'Ajusta una variable a la vez y registra el comportamiento.'],
    checklist: ['¿Sabes qué entrada activa cada salida?', '¿Probaste cada elemento del panel por separado?', '¿La regla de control se comporta como predijiste?'],
    diagram: ['Entradas', 'Programa', 'Salidas'],
    lessons: [
      { t: 'Componentes del panel', d: 'Qué trae el PC42 y cómo se organiza.', m: '10:00',
        ex: 'El panel PC42 reúne en una placa entradas (pulsadores, interruptores, potenciómetros, sensores) y salidas (LED, zumbadores, relés, motores) con sus conexiones rotuladas y protegidas. Cada elemento tiene su borna o conector y su documentación indica tensión y corriente máximas.',
        eg: 'Un pulsador del panel ya trae su resistencia pull-up, así que se conecta directo al pin digital; un LED del panel ya trae su resistencia en serie. Conocer qué está integrado evita añadir componentes duplicados.',
        pr: 'Haz el inventario del panel: lista cada entrada y cada salida con su rótulo, su tipo y su conexión.' },
      { t: 'Conexiones', d: 'Conectar el panel a la placa: alimentación y señales.', m: '10:40',
        ex: 'Conectar el panel es unir sus bornas con la placa programable: alimentación de 5 V, tierra común y una señal por elemento. La tierra común es imprescindible: sin ella, las lecturas no tienen referencia y las salidas no se activan de forma fiable.',
        eg: 'Para usar un pulsador y un LED del panel se conectan: la borna del pulsador al pin 2, la del LED al pin 9, y el 5 V y GND del panel a los de la placa. Con INPUT_PULLUP en el pin 2, el pulsador se lee sin resistencia externa.',
        pr: 'Conecta un pulsador y un LED del panel a la placa y comprueba con un programa mínimo que el LED responde al pulsador.' },
      { t: 'Entradas y salidas', d: 'Leer entradas digitales y analógicas, activar salidas.', m: '12:15',
        ex: 'Las entradas digitales se leen con digitalRead (ALTO o BAJO) y las analógicas con analogRead (0–1023). Las salidas digitales se activan con digitalWrite y las variables con analogWrite (PWM). Un potenciómetro del panel es una entrada analógica ideal para controlar un brillo o una velocidad.',
        eg: 'El potenciómetro del panel en A0 da 0 al girarlo a un extremo y 1023 al otro; map(valor, 0, 1023, 0, 255) lo convierte en brillo para un LED en un pin PWM. El monitor serie muestra el valor en tiempo real para elegir umbrales.',
        pr: 'Lee el potenciómetro del panel y úsalo para controlar el brillo de un LED. Muestra ambos valores en el monitor serie.',
        code: { label: 'Ejemplo: entrada analógica a salida PWM', code: 'void loop() {\n  int valor = analogRead(A0);\n  int brillo = map(valor, 0, 1023, 0, 255);\n  analogWrite(9, brillo);\n  Serial.println(valor);\n  delay(100);\n}' } },
      { t: 'Programación', d: 'Reglas de control: secuencias, decisiones y temporización.', m: '12:30',
        ex: 'Programar el panel es escribir reglas: si el pulsador está presionado, enciende el LED; si la temperatura supera el umbral, activa el ventilador; cada 5 segundos, cambia de estado. La temporización con millis() permite varias cosas a la vez sin bloquear el programa con delay().',
        eg: 'Un semáforo en el panel usa millis() para cambiar de verde a ámbar a los 5 segundos y a rojo a los 2 segundos más, mientras un pulsador puede forzar el rojo en cualquier momento. Con delay() el pulsador no se leería durante la espera.',
        pr: 'Programa un semáforo con el panel usando millis() y un pulsador que fuerce el rojo. Comprueba que el pulsador responde en cualquier momento.' },
      { t: 'Ejercicios de control', d: 'Tres ejercicios completos con el panel.', m: '13:20',
        ex: 'Los ejercicios finales combinan entradas y salidas: una alarma que suena si se abre una puerta (interruptor), un control de temperatura con ventilador y un contador de piezas con pulsador. Cada uno se resuelve con una regla de decisión, una temporización y una comprobación.',
        eg: 'El control de temperatura lee un sensor, compara con 28 °C y activa el ventilador si lo supera, con histéresis: se apaga solo cuando baja de 26 °C, para evitar que se encienda y apague continuamente en el límite.',
        pr: 'Implementa el control de temperatura con histéresis en el panel. Registra a qué temperaturas se enciende y se apaga el ventilador.' }
    ]
  },
  'Ardublock': {
    level: 'Principiante', hours: 3,
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1400&q=85',
    intro: 'Programa Arduino mediante un entorno visual basado en bloques: sin sintaxis, con resultados reales en la placa.',
    body: ['Ardublock es un entorno visual que genera código Arduino a partir de bloques: arrastras, encajas y el programa aparece. Es ideal para empezar con Arduino sin pelear con la sintaxis y para entender la lógica antes de escribir código.',
      'Controlarás LED, pulsadores y sensores con bloques, verás el código generado en cada paso y terminarás con una práctica que combina entradas y salidas.'],
    context: 'La programación visual organiza instrucciones en bloques compatibles. En Ardublock, cada bloque tiene su equivalente en código Arduino, así que el paso a la sintaxis es natural.',
    method: ['Arma la solución con bloques y observa el código generado.', 'Prueba cada bloque en la placa antes de añadir el siguiente.', 'Si algo falla, revisa el bloque, no el código generado.', 'Cuando funcione, lee el código y reconoce cada parte.'],
    checklist: ['¿El programa hace lo esperado en la placa?', '¿Reconoces en el código cada bloque que usaste?', '¿Probaste el programa con el pulsador y el sensor?'],
    diagram: ['Bloques', 'Código generado', 'Placa'],
    lessons: [
      { t: 'Entorno Ardublock', d: 'Instalar, abrir y conocer la paleta de bloques.', m: '09:20',
        ex: 'Ardublock se instala como complemento del IDE de Arduino y se abre desde Herramientas. Su paleta agrupa bloques por categorías: lógica, control, pines, variables, comunicación y tiempo. Al pulsar "Subir", genera el código y lo carga en la placa.',
        eg: 'El bloque "configurar pin 13 como salida" genera pinMode(13, OUTPUT) en setup(). Ver el código generado junto a los bloques muestra la correspondencia entre lo visual y la sintaxis real.',
        pr: 'Abre Ardublock, arrastra el bloque de parpadeo del LED integrado y súbelo a la placa. Observa el código generado.' },
      { t: 'Bloques y secuencias', d: 'Encadenar bloques para una secuencia de acciones.', m: '10:15',
        ex: 'Una secuencia en Ardublock es una pila vertical de bloques que se ejecuta en orden: encender LED, esperar 1 segundo, apagar LED, esperar 1 segundo. Los bloques encajan solo si son compatibles, lo que evita muchos errores de sintaxis.',
        eg: 'Un semáforo con bloques es una secuencia: encender verde 3 s, apagar, encender ámbar 1 s, apagar, encender rojo 3 s, apagar, y repetir. Si el orden cambia, el semáforo muestra los colores en otro orden.',
        pr: 'Construye el semáforo con bloques y súbelo a la placa. Cambia los tiempos y observa el resultado.' },
      { t: 'Entradas y salidas', d: 'Leer pulsadores y sensores con bloques.', m: '11:00',
        ex: 'Ardublock tiene bloques para leer pines digitales y analógicos y para escribir en ellos. Un bloque "leer pin digital 2" devuelve verdadero o falso; un bloque "leer pin analógico A0" devuelve 0–1023. La lectura se guarda en una variable para usarla en decisiones.',
        eg: 'Para encender un LED solo si hay poca luz, se lee A0 en una variable "luz" y se decide con un bloque "si luz < 500". El monitor serie de Ardublock muestra el valor de la variable para elegir el umbral.',
        pr: 'Lee un sensor de luz con bloques, muestra su valor y enciende un LED cuando baje del umbral que elijas.' },
      { t: 'Control de componentes', d: 'Decisiones y bucles con bloques: el programa reacciona.', m: '11:45',
        ex: 'Los bloques de control añaden decisiones ("si... entonces... si no") y repeticiones ("repetir mientras" o "repetir N veces"). Con ellos, el programa reacciona al entorno en vez de seguir una lista fija: el LED parpadea solo si el pulsador está presionado.',
        eg: 'Un programa que hace parpadear un LED mientras se mantiene presionado un pulsador usa "repetir mientras pulsador presionado" con encender, esperar y apagar dentro. Al soltar el pulsador, el bucle termina y el LED queda apagado.',
        pr: 'Programa un LED que parpadee solo mientras el pulsador está presionado, usando un bucle y una decisión.' },
      { t: 'Práctica final', d: 'Proyecto con bloques: alarma de luz con zumbador.', m: '12:20',
        ex: 'La práctica final combina todo: un sensor de luz, un LED y un zumbador. Si la luz baja del umbral, se enciende el LED y suena el zumbador; si no, todo apagado. Se construye por partes y se comprueba cada una antes de añadir la siguiente.',
        eg: 'Si la alarma suena con luz normal, el umbral está mal elegido o el sensor está mal conectado; el monitor serie muestra la lectura real y permite ajustar el umbral con datos, no a ciegas.',
        pr: 'Construye la alarma completa con bloques y ajústala con las lecturas del monitor serie. Lee el código generado y reconoce cada bloque.' }
    ]
  },
  'Shield Picuino UNO': {
    level: 'Intermedio', hours: 4,
    image: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&w=1400&q=85',
    intro: 'Aprende a usar la shield Picuino UNO con prácticas progresivas: actuadores, sensores y proyectos de aplicación.',
    body: ['Una shield es una placa que se conecta sobre Arduino y añade componentes listos para usar: en el caso de Picuino UNO, LED, pulsadores, potenciómetros, zumbador y conexiones para sensores y motores, todo rotulado.',
      'Las prácticas progresivas te llevan de encender un LED a proyectos completos con sensores y actuadores, aprovechando que la shield elimina el cableado más propenso a errores.'],
    context: 'Una shield amplía Arduino sin cableado suelto: los componentes ya están conectados a pines conocidos. El trabajo pasa del montaje a la programación y la lógica.',
    method: ['Identifica en la shield cada componente y su pin.', 'Prueba cada componente por separado con un ejemplo mínimo.', 'Combina sensores y actuadores en una regla de decisión.', 'Documenta el proyecto con esquema y código.'],
    checklist: ['¿Sabes a qué pin está conectado cada componente?', '¿Probaste cada componente por separado?', '¿El proyecto responde como predijiste?'],
    diagram: ['Shield', 'Programa', 'Proyecto'],
    lessons: [
      { t: 'Placa y conexiones', d: 'Qué trae la shield y a qué pin va cada cosa.', m: '10:10',
        ex: 'La shield Picuino UNO se enchufa sobre el Arduino UNO y sus componentes (LED, pulsadores, potenciómetro, zumbador, LDR) quedan conectados a pines fijos documentados en su guía. Conocer esa tabla pin-componente es el primer paso de cualquier práctica.',
        eg: 'Si la guía indica que el LED rojo está en el pin 9 y el pulsador en el 2, el programa usa esos pines sin cablear nada. Confundir los pines es el error más común: el programa compila bien, pero el componente no responde.',
        pr: 'Haz la tabla pin-componente de tu shield a partir de su guía y comprueba un LED y un pulsador con un programa mínimo.' },
      { t: 'Actuadores', d: 'LED, zumbador y salidas: controlar lo que se ve y se oye.', m: '11:20',
        ex: 'Los actuadores de la shield se controlan con digitalWrite (encendido/apagado), analogWrite (brillo por PWM) y tone (sonido del zumbador con frecuencia). Cada uno tiene su pin y sus límites: el zumbador suena con tone(pin, 1000) y se calla con noTone(pin).',
        eg: 'Una melodía simple usa tone() con una secuencia de frecuencias (523 Hz para Do, 659 para Mi, 784 para Sol) y pausas con delay(). Un LED con analogWrite(9, 128) brilla a la mitad sin componentes externos.',
        pr: 'Haz sonar tres notas con el zumbador y controla el brillo de un LED con el potenciómetro de la shield.',
        code: { label: 'Ejemplo: melodía con el zumbador', code: 'tone(8, 523); delay(300);  // Do\ntone(8, 659); delay(300);  // Mi\ntone(8, 784); delay(300);  // Sol\nnoTone(8);' } },
      { t: 'Sensores', d: 'LDR, potenciómetro y pulsadores: leer el entorno.', m: '12:00',
        ex: 'Los sensores de la shield se leen con analogRead (LDR y potenciómetro, 0–1023) y digitalRead (pulsadores, ALTO/BAJO). La lectura cruda se convierte en decisión con un umbral o en magnitud con map(). El monitor serie muestra los valores para calibrar.',
        eg: 'El LDR de la shield da lecturas cerca de 900 con luz intensa y cerca de 150 en penumbra; un umbral de 500 distingue ambos casos. El potenciómetro da 0–1023 en todo su recorrido y sirve como control manual.',
        pr: 'Lee el LDR y el potenciómetro en el monitor serie. Elige un umbral de luz y enciende un LED cuando se supere.' },
      { t: 'Programación', d: 'Del ejemplo mínimo al programa con decisiones y estados.', m: '12:45',
        ex: 'Programar la shield es combinar lecturas y salidas con decisiones: si el pulsador se presiona, cambia el estado; si la luz baja, enciende el LED. Usar variables de estado (por ejemplo, encendido = true/false) permite que un pulsador alterne en vez de solo actuar mientras se presiona.',
        eg: 'Un pulsador que alterna un LED necesita detectar el cambio de estado (de suelto a presionado) y no solo el estado actual; si no, el LED parpadearía mientras se mantiene presionado. Guardar el estado anterior y comparar es el patrón clave.',
        pr: 'Programa un pulsador que alterne un LED (encender/apagar con cada pulsación) usando detección de cambio de estado.',
        code: { label: 'Ejemplo: alternar un LED con un pulsador', code: 'bool estado = false;\nbool anterior = HIGH;\nvoid loop() {\n  bool actual = digitalRead(2);\n  if (actual == LOW && anterior == HIGH) {\n    estado = !estado;\n    digitalWrite(9, estado);\n  }\n  anterior = actual;\n}' } },
      { t: 'Proyectos de aplicación', d: 'Tres proyectos con la shield: alarma, semáforo y medidor.', m: '13:30',
        ex: 'Los proyectos finales combinan todo lo anterior: una alarma que suena si baja la luz, un semáforo con pulsador peatonal y un medidor que muestra el nivel de luz con varios LED. Cada proyecto se documenta con su objetivo, sus pines y su código.',
        eg: 'El medidor de luz usa tres LED: con mucha luz se encienden los tres, con luz media dos y con poca uno. La lógica es una cadena de decisiones sobre la lectura del LDR, y el monitor serie muestra el valor para ajustar los umbrales.',
        pr: 'Construye el medidor de luz con tres LED y umbrales calibrados con el monitor serie. Documenta pines, umbrales y código.' }
    ]
  },
  'Control de sistemas': {
    level: 'Intermedio', hours: 4,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1400&q=85',
    intro: 'Introducción al control, las señales y los sistemas automáticos: cómo un sistema mide, decide y corrige.',
    body: ['Un sistema de control mantiene algo en su objetivo: la temperatura de una habitación, la velocidad de un motor o el nivel de un depósito. Lo logra midiendo, comparando con la referencia y corrigiendo la acción.',
      'Aprenderás los bloques de un sistema —referencia, medición, controlador, actuador y proceso— y a razonar con ejemplos cotidianos antes de programar un control real.'],
    context: 'Un sistema de control compara el estado observado con un objetivo y ajusta la acción. La realimentación permite corregir desviaciones, aunque una respuesta demasiado intensa puede causar oscilaciones.',
    method: ['Define la variable a controlar y su objetivo.', 'Dibuja el lazo: referencia, medición, controlador, actuador y proceso.', 'Elige una regla de corrección simple y predice su respuesta.', 'Prueba con cambios controlados y ajusta una variable cada vez.'],
    checklist: ['¿Identificaste la variable controlada y su referencia?', '¿El lazo de realimentación está completo?', '¿Probaste la respuesta ante un cambio?'],
    diagram: ['Referencia', 'Controlador', 'Proceso'],
    lessons: [
      { t: 'Sistema y variables', d: 'Qué es un sistema, sus entradas, salidas y variables.', m: '10:20',
        ex: 'Un sistema tiene entradas (lo que lo afecta), salidas (lo que produce) y variables de estado (lo que cambia por dentro). En una calefacción, la entrada es la potencia, la salida es la temperatura de la habitación y la variable controlada es esa temperatura.',
        eg: 'En un depósito de agua, la entrada es el caudal de la bomba, la salida es el caudal de consumo y el nivel es la variable controlada. Si entra más de lo que sale, el nivel sube; el control debe equilibrar ambos.',
        pr: 'Elige un sistema cotidiano (ducha, horno, ventilador) y anota sus entradas, su salida y su variable controlada.' },
      { t: 'Entrada y salida', d: 'Señales, actuadores y cómo el controlador actúa.', m: '10:45',
        ex: 'La entrada del controlador es la medición y su salida es la acción sobre el actuador. Entre ambas hay una regla: por ejemplo, si la temperatura está por debajo del objetivo, enciende la calefacción; si está por encima, apágala. La acción puede ser todo o nada, o proporcional.',
        eg: 'Un ventilador con control todo o nada se enciende al 100 % o se apaga; con control proporcional, gira más rápido cuanto mayor es la diferencia con el objetivo. El segundo es más suave pero más complejo de ajustar.',
        pr: 'Dibuja el diagrama de bloques de un control de temperatura: sensor, controlador, calefactor y habitación, con sus flechas.' },
      { t: 'Realimentación', d: 'Lazo cerrado: medir, comparar y corregir.', m: '12:00',
        ex: 'La realimentación (feedback) es medir la salida y compararla con la referencia para corregir. En lazo abierto no hay medición: se actúa a ciegas. En lazo cerrado, el error (referencia menos medición) guía la acción y el sistema se corrige solo ante perturbaciones.',
        eg: 'Un horno en lazo abierto calienta un tiempo fijo y puede quedar frío o quemar; en lazo cerrado, el termostato mide la temperatura y apaga al llegar a 180 °C. Si se abre la puerta y entra aire frío, el lazo cerrado lo detecta y vuelve a calentar.',
        pr: 'Compara un riego por temporizador (lazo abierto) con uno por sensor de humedad (lazo cerrado). ¿Qué pasa en cada uno si llueve?' },
      { t: 'Respuesta del sistema', d: 'Tiempo de respuesta, sobreimpulso y oscilaciones.', m: '12:30',
        ex: 'La respuesta de un sistema tiene tiempo (cuánto tarda en acercarse al objetivo), sobreimpulso (cuánto lo supera) y estabilidad (si oscila o se asienta). Una corrección muy fuerte llega rápido pero oscila; una muy suave tarda pero es estable.',
        eg: 'Un termostato que enciende la calefacción al máximo hasta llegar al objetivo y la apaga de golpe puede oscilar entre 19 °C y 21 °C; con un margen (enciende a 19,5 °C y apaga a 20,5 °C) evita conmutaciones continuas y alarga la vida del equipo.',
        pr: 'Dibuja la respuesta de temperatura en el tiempo para un control demasiado fuerte y para uno suave. Marca sobreimpulso y tiempo de establecimiento.' },
      { t: 'Ejemplos de control', d: 'Termostato, control de nivel y velocidad: tres casos completos.', m: '11:50',
        ex: 'Los tres casos usan el mismo patrón: medir, comparar con la referencia y actuar. El termostato controla temperatura con un calefactor; el control de nivel mantiene un depósito con una bomba; el control de velocidad mantiene un motor con PWM. Cambia la variable, no la lógica.',
        eg: 'En el control de nivel, si el nivel baja del mínimo se enciende la bomba y si sube del máximo se apaga; un margen entre ambos evita que la bomba se encienda y apague cada segundo por el oleaje. Es la misma histéresis del termostato.',
        pr: 'Diseña el control de nivel de un depósito con dos umbrales y explica por qué el margen entre ellos evita conmutaciones continuas.' }
    ]
  },
  'Actuadores': {
    level: 'Intermedio', hours: 3,
    image: 'https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?auto=format&fit=crop&w=1400&q=85',
    intro: 'Conoce actuadores que convierten señales en movimiento o acción: motores, servos, relés y solenoides.',
    body: ['Un actuador es el músculo de un sistema: convierte una señal eléctrica en movimiento, fuerza, luz o sonido. Elegir el adecuado exige conocer su carga, su precisión y su alimentación.',
      'Compararás motores de corriente continua, servos, motores paso a paso y relés con ejemplos reales, y aprenderás a controlarlos sin dañar la placa que los gobierna.'],
    context: 'Un actuador transforma una señal de control en una acción física. Motores, servos y relés tienen requisitos eléctricos y mecánicos distintos; el controlador puede requerir una etapa de potencia y una alimentación apropiada.',
    method: ['Define el movimiento o la acción que necesitas.', 'Compara actuadores por carga, precisión y alimentación.', 'Añade la etapa de potencia o el driver que corresponda.', 'Limita el recorrido y la corriente antes de probar.'],
    checklist: ['¿El actuador soporta la carga y el recorrido?', '¿La alimentación es la adecuada y está separada si hace falta?', '¿Probaste el movimiento con límites antes de integrarlo?'],
    diagram: ['Señal', 'Driver', 'Movimiento'],
    lessons: [
      { t: 'Tipos de actuadores', d: 'Motores, servos, relés y solenoides: qué hace cada uno.', m: '10:00',
        ex: 'Los motores de corriente continua giran sin parar y su velocidad se controla con PWM; los servos se posicionan en un ángulo; los motores paso a paso avanzan en pasos precisos; los relés son interruptores eléctricos que permiten controlar cargas grandes con una señal pequeña; los solenoides empujan o tiran en línea recta.',
        eg: 'Una puerta automática usa un servo para girar 90 grados; una cinta transportadora usa un motor de continua con PWM para variar su velocidad; una lámpara de 220 V se enciende con un relé gobernado por 5 V. Cada tarea pide un actuador distinto.',
        pr: 'Para tres tareas (abrir una compuerta, mover una cinta, encender una lámpara), elige el actuador adecuado y justifica tu elección.' },
      { t: 'Motores', d: 'Motor de continua: giro, velocidad con PWM y cambio de sentido.', m: '11:20',
        ex: 'Un motor de continua gira al aplicarle tensión; su velocidad depende de la tensión media, que se controla con PWM, y su sentido con un puente H que invierte la polaridad. La placa Arduino no puede alimentar un motor directamente: necesita un driver o transistor y alimentación externa.',
        eg: 'Un motor con un driver L298N se conecta a una fuente de 9 V y la placa solo envía las señales de control. Sin el driver, el motor pediría más corriente de la que el pin puede dar (40 mA) y dañaría la placa.',
        pr: 'Dibuja el esquema de un motor con driver y fuente externa. Anota qué pin controla la velocidad y cuáles el sentido.' },
      { t: 'Servos y mecanismos', d: 'Posición angular, librería Servo y límites mecánicos.', m: '12:10',
        ex: 'Un servo se posiciona en un ángulo (típicamente 0–180°) mediante pulsos: la librería Servo de Arduino lo controla con servo.write(ángulo). Tiene fuerza limitada (torque) y no debe forzarse más allá de sus topes mecánicos.',
        eg: 'Un servo de 9 g con torque de 1,8 kg·cm mueve una compuerta ligera; para una puerta pesada haría falta uno mayor o un mecanismo con palanca. El programa debe limitar los ángulos a 10–170° para no golpear los topes.',
        pr: 'Programa un servo que barra de 0 a 180 grados y vuelva, y luego que se mueva a la posición indicada por un potenciómetro.',
        code: { label: 'Ejemplo: servo con potenciómetro', code: '#include <Servo.h>\nServo miServo;\nvoid setup() {\n  miServo.attach(9);\n}\nvoid loop() {\n  int valor = analogRead(A0);\n  int angulo = map(valor, 0, 1023, 0, 180);\n  miServo.write(angulo);\n  delay(15);\n}' } },
      { t: 'Control y alimentación', d: 'Drivers, transistores y por qué separar alimentaciones.', m: '11:30',
        ex: 'Controlar un actuador es separar dos mundos: la lógica (5 V, poca corriente) y la potencia (más tensión y corriente). Un transistor o un driver hace de intermediario; un diodo protege contra la corriente inversa del motor al apagarse. La alimentación del motor debe ser externa y compartir tierra con la placa.',
        eg: 'Un motor que consume 500 mA no puede alimentarse del pin de 5 V de Arduino (límite ~500 mA para toda la placa): se alimenta de una fuente externa y solo se comparte el GND. Sin el diodo en antiparalelo, el pico de tensión al apagar el motor puede dañar el transistor.',
        pr: 'Dibuja el esquema de un motor con transistor, diodo y fuente externa. Marca dónde va la tierra común.' },
      { t: 'Aplicaciones', d: 'Robot móvil, brazo articulado y puerta automática.', m: '10:50',
        ex: 'Las aplicaciones combinan actuadores: un robot móvil usa dos motores con puente H para avanzar y girar; un brazo articulado usa servos por articulación; una puerta automática usa un servo y un sensor. En todos, el programa limita recorridos y protege los mecanismos.',
        eg: 'Un robot con dos motores avanza si ambos giran igual y gira si uno se detiene; un brazo con tres servos necesita coordinar sus ángulos para no chocar consigo mismo. Probar cada articulación por separado antes de coordinarlas evita daños.',
        pr: 'Diseña un robot móvil con dos motores: escribe qué hace cada motor para avanzar, girar a la izquierda y girar a la derecha.' }
    ]
  },
  'Sensores': {
    level: 'Intermedio', hours: 4,
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1400&q=85',
    intro: 'Estudia sensores, magnitudes físicas y adquisición de datos: qué miden, cómo se leen y cómo se calibran.',
    body: ['Un robot o un sistema automático solo sabe lo que sus sensores le dicen. Entender qué mide cada sensor, en qué unidades, con qué rango y con qué error es lo que separa un proyecto que funciona de uno que se comporta de forma errática.',
      'Trabajarás con sensores de luz, temperatura, distancia y posición: leerás sus valores, los convertirás a unidades reales y los calibrarás con referencias conocidas.'],
    context: 'Un sensor convierte una magnitud física en una señal interpretable. Una lectura necesita unidades, rango y contexto; calibrar compara el sensor con una referencia y ayuda a detectar desviaciones.',
    method: ['Identifica qué magnitud mide el sensor y en qué unidades.', 'Lee el rango y la precisión de su hoja de datos.', 'Toma varias lecturas y calcula el promedio y la dispersión.', 'Calibra con una referencia conocida y anota el factor.'],
    checklist: ['¿Sabes qué mide el sensor, en qué unidades y con qué rango?', '¿Las lecturas son estables y repetibles?', '¿Calibraste con una referencia antes de confiar en el valor?'],
    diagram: ['Magnitud', 'Sensor', 'Dato útil'],
    lessons: [
      { t: 'Magnitudes y sensores', d: 'Luz, temperatura, distancia y sonido: qué mide cada sensor.', m: '10:30',
        ex: 'Cada sensor mide una magnitud: el LDR mide luz (resistencia que baja con la iluminación), el DHT11 mide temperatura y humedad, el HC-SR04 mide distancia por ultrasonido y el micrófono mide nivel de sonido. La magnitud define la unidad: lux, °C, centímetros o decibelios.',
        eg: 'Un LDR no mide "luz" en general: su resistencia varía con la iluminación y hay que convertirla con una calibración. Un sensor de temperatura digital como el DS18B20 entrega directamente grados Celsius con su protocolo.',
        pr: 'Haz una tabla con cuatro sensores: magnitud, unidad, rango típico y un uso concreto de cada uno.' },
      { t: 'Sensores digitales', d: 'Pulsadores, PIR e infrarrojos: estados ALTO y BAJO.', m: '10:50',
        ex: 'Un sensor digital entrega dos estados: ALTO o BAJO. Un pulsador indica presionado o no; un PIR detecta movimiento por cambios de infrarrojo; un sensor de línea devuelve blanco o negro. Su lectura es digitalRead y su reto es el ruido: un rebote o una falsa detección.',
        eg: 'Un PIR en un pasillo enciende la luz al detectar movimiento y la apaga tras 30 segundos sin detectar nada. Un sensor de línea en un robot seguidor devuelve BAJO sobre la línea negra y ALTO sobre el fondo blanco.',
        pr: 'Conecta un sensor PIR y haz que encienda un LED al detectar movimiento. Anota cuánto tarda en apagarse tras dejar de detectar.' },
      { t: 'Sensores analógicos', d: 'LDR, potenciómetro y temperatura: valores 0–1023.', m: '11:40',
        ex: 'Un sensor analógico entrega una tensión proporcional a la magnitud, que Arduino lee como un valor 0–1023 con analogRead. El LDR y el potenciómetro son divisores de tensión; el LM35 entrega 10 mV por °C. La conversión a unidades es una regla lineal.',
        eg: 'Un LM35 a 25 °C entrega 250 mV; analogRead lee unos 51 (250 mV / 5 V * 1023) y la temperatura se calcula como lectura * 5,0 / 1023 * 100. Sin la conversión, el número 51 no significa nada.',
        pr: 'Lee un sensor de temperatura analógico, convierte la lectura a °C y muéstrala en el monitor serie cada segundo.',
        code: { label: 'Ejemplo: LM35 a grados Celsius', code: 'void loop() {\n  int lectura = analogRead(A0);\n  float voltaje = lectura * 5.0 / 1023.0;\n  float temp = voltaje * 100.0; // LM35: 10 mV por °C\n  Serial.print("Temperatura: ");\n  Serial.print(temp);\n  Serial.println(" C");\n  delay(1000);\n}' } },
      { t: 'Lectura y calibración', d: 'Promedios, ruido y calibración con referencias.', m: '12:20',
        ex: 'Las lecturas reales tienen ruido: varían aunque la magnitud no cambie. Promediar 10 muestras reduce el ruido; calibrar compara el sensor con una referencia (hielo fundente a 0 °C, agua hirviendo a 100 °C) y corrige el error sistemático con un factor o un desplazamiento.',
        eg: 'Un sensor de temperatura que marca 27 °C en una habitación a 25 °C tiene un error de +2 °C; restar 2 a cada lectura lo corrige. Un LDR sin calibrar distingue luz y oscuridad, pero no mide lux: para medir lux hace falta una referencia conocida.',
        pr: 'Toma 20 lecturas de un sensor en condiciones estables, calcula su promedio y su dispersión, y decide si necesitas promediar en tu programa.' },
      { t: 'Aplicaciones', d: 'Estación meteorológica, alarma y seguidor de línea.', m: '11:15',
        ex: 'Las aplicaciones combinan sensores: una estación meteorológica une temperatura, humedad y luz; una alarma une PIR y zumbador; un seguidor de línea usa dos sensores infrarrojos y dos motores. En todas, la calibración y los umbrales deciden si el sistema funciona.',
        eg: 'Un seguidor de línea con dos sensores decide: si el izquierdo ve la línea, gira a la izquierda; si el derecho la ve, gira a la derecha; si ninguno la ve, avanza. Sin calibrar el umbral de blanco y negro, el robot no distingue la línea del suelo.',
        pr: 'Diseña un seguidor de línea con dos sensores: escribe la tabla de decisión (qué ve cada sensor → qué hace cada motor).' }
    ]
  },
  'Micro:bit': {
    level: 'Intermedio', hours: 4,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=85',
    intro: 'Crea proyectos de robótica y programación con micro:bit: sensores integrados, radio y proyectos interactivos.',
    body: ['La micro:bit es una placa pequeña con mucho integrado: matriz de LED 5×5, botones, acelerómetro, brújula, sensor de temperatura y radio. Se programa por bloques en MakeCode o con Python, y es ideal para proyectos rápidos y portables.',
      'Crearás proyectos que usan sus sensores integrados, se comunican por radio entre dos placas y responden a gestos y movimientos.'],
    context: 'La micro:bit integra sensores y salidas en la propia placa: la programación se centra en la lógica, no en el cableado. La radio permite que varias placas se comuniquen.',
    method: ['Explora qué sensores y salidas trae la placa.', 'Programa un comportamiento a la vez y pruébalo en el simulador.', 'Pásalo a la placa real y comprueba los sensores.', 'Añade radio o comunicación solo cuando la base funciona.'],
    checklist: ['¿El programa funciona en el simulador y en la placa?', '¿Cada sensor se probó en condiciones reales?', '¿El proyecto responde como predijiste?'],
    diagram: ['Sensores', 'Programa', 'Respuesta'],
    lessons: [
      { t: 'Placa y entorno', d: 'La micro:bit, MakeCode y el simulador.', m: '10:05',
        ex: 'La micro:bit tiene una matriz de LED de 5×5, dos botones (A y B), acelerómetro, brújula, sensor de temperatura y radio Bluetooth. MakeCode es su editor por bloques con simulador: se prueba el programa en pantalla antes de pasarlo a la placa por USB.',
        eg: 'El bloque "al presionar el botón A, mostrar un corazón" se prueba en el simulador pulsando el botón virtual; al descargar el archivo .hex a la placa, el botón físico hace lo mismo. El simulador ahorra muchas descargas.',
        pr: 'En MakeCode, crea un programa que muestre tu inicial al presionar el botón A y un corazón al presionar B. Pruébalo en el simulador.' },
      { t: 'Entradas y sensores', d: 'Botones, acelerómetro, temperatura y luz.', m: '12:00',
        ex: 'Las entradas de la micro:bit son: botones A y B, acelerómetro (inclinación y sacudidas), brújula, temperatura del chip y nivel de luz (medido con los LED). Cada una tiene su bloque de lectura y su rango: la temperatura se lee en °C y la aceleración en milig.',
        eg: 'Un podómetro cuenta pasos detectando sacudidas con el acelerómetro; un termómetro muestra la temperatura con "temperatura en °C". La temperatura del chip es unos grados mayor que la ambiente, algo a tener en cuenta al medir.',
        pr: 'Crea un programa que muestre la temperatura al presionar A y que cuente sacudidas con el acelerómetro.' },
      { t: 'Programación', d: 'Bucles, decisiones y variables en MakeCode.', m: '12:30',
        ex: 'MakeCode usa los mismos bloques de siempre: "por siempre" para bucles, "si... entonces" para decisiones y variables para guardar valores. La matriz de LED se controla con "mostrar icono", "mostrar número" y "trazar x, y" para dibujar píxeles.',
        eg: 'Un juego de atrapar un punto usa "por siempre: mover el punto, si el punto toca el jugador, sumar un punto". La variable de puntos se muestra al final con "mostrar número".',
        pr: 'Programa un dado: al sacudir la placa, muestra un número aleatorio del 1 al 6 con "elegir al azar".',
        code: { label: 'Ejemplo: dado con sacudida (bloques)', code: 'AL SACUDIR:\n  mostrar número (elegir al azar 1 a 6)\nAL PRESIONAR botón A:\n  mostrar icono corazón' } },
      { t: 'Comunicación', d: 'Radio entre dos micro:bit: enviar y recibir.', m: '11:45',
        ex: 'La radio permite que dos micro:bit se comuniquen: se configura un grupo (número de 0 a 255) y se envían números o cadenas con "radio enviar". La otra placa reacciona con "al recibir radio". Es la base de juegos multijugador y de sensores remotos.',
        eg: 'Un mando a distancia es una micro:bit que envía 1 al presionar A y 2 al presionar B; la receptora enciende un LED o mueve un servo según el número recibido. Si los grupos no coinciden, no hay comunicación.',
        pr: 'Con dos placas (o el simulador y una placa), envía un número al presionar A y muestra en la receptora el número recibido.' },
      { t: 'Proyecto interactivo', d: 'Proyecto completo: juego o instrumento con la placa.', m: '13:15',
        ex: 'El proyecto final combina sensores, salidas y radio: un juego de reacción (quién presiona antes), un instrumento que suena al inclinar la placa o un semáforo peatonal con dos placas comunicadas. Se planifica, se construye por partes y se prueba con otra persona.',
        eg: 'El juego de reacción usa la radio: una placa envía "¡Ya!" y ambas muestran un icono; quien presiona su botón antes gana y su placa muestra el resultado. La radio sincroniza el inicio para que sea justo.',
        pr: 'Construye tu proyecto interactivo con al menos un sensor, una variable y comunicación por radio. Pide a un compañero que lo pruebe.' }
    ]
  },
  'Recursos para Robótica': {
    level: 'Principiante', hours: 2,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=85',
    intro: 'Materiales, guías y proyectos para ampliar robótica educativa: componentes, actividades y recursos externos.',
    body: ['La robótica educativa tiene muchos recursos: guías de montaje, simuladores, retos y competiciones. Este curso los organiza para que encuentres el adecuado a tu nivel y a tu material.',
      'Aprenderás a evaluar un recurso de robótica —qué componentes exige, qué edad y nivel cubre— y a organizar tus proyectos con documentación.'],
    context: 'Un recurso de robótica se evalúa por sus componentes, su nivel, su documentación y su licencia. Comparar varias fuentes evita comprar material incompatible.',
    method: ['Define qué quieres construir y con qué material cuentas.', 'Busca la guía o el proyecto más cercano.', 'Comprueba componentes, nivel y licencia.', 'Documenta tu montaje y tu código.'],
    checklist: ['¿Tienes todos los componentes que pide el proyecto?', '¿La guía corresponde a tu placa y tu nivel?', '¿Documentaste tu montaje y tu código?'],
    diagram: ['Guía', 'Componentes', 'Proyecto'],
    lessons: [
      { t: 'Guías de robótica', d: 'Dónde encontrar guías fiables y cómo seguirlas.', m: '09:00',
        ex: 'Las guías fiables de robótica vienen de los fabricantes (Arduino, micro:bit, LEGO Education), de comunidades educativas y de museos de ciencia. Una buena guía lista componentes, muestra el esquema y explica el código paso a paso.',
        eg: 'La guía oficial de un robot seguidor de línea indica los sensores, el esquema de conexión y el código con comentarios; una guía sin esquema obliga a adivinar el cableado y suele fallar.',
        pr: 'Busca una guía oficial de un proyecto de robótica y anota sus componentes, su esquema y su código.' },
      { t: 'Componentes', d: 'Qué comprar y qué no: kits, sensores y repuestos.', m: '09:30',
        ex: 'Un kit básico de robótica lleva placa, protoboard, cables, LED, resistencias, pulsadores, un servo y un sensor de distancia. Comprar por kit sale más barato que por piezas y garantiza compatibilidad; los repuestos (cables, resistencias) se agotan antes que las placas.',
        eg: 'Un kit con Arduino UNO, sensor HC-SR04 y servo permite construir un robot que evita obstáculos; sin el sensor, el mismo kit solo permite prácticas de LED. Elegir el kit según el proyecto evita compras inútiles.',
        pr: 'Haz la lista de componentes de tu próximo proyecto y marca cuáles ya tienes y cuáles necesitas comprar.' },
      { t: 'Actividades', d: 'Retos y actividades para practicar en equipo.', m: '09:15',
        ex: 'Las actividades de robótica funcionan mejor en equipo y con retos claros: recorrer un circuito, recoger objetos o resolver un laberinto. Cada reto tiene reglas, una meta medible y un tiempo límite.',
        eg: 'El reto "el robot debe recorrer el circuito en menos de 30 segundos sin salirse" se mide con cronómetro y se repite mejorando el programa. Sin meta medible, no se sabe si se mejoró.',
        pr: 'Diseña un reto de robótica con reglas, meta medible y tiempo límite para tu equipo.' },
      { t: 'Proyectos', d: 'De la práctica al proyecto: planificar y documentar.', m: '10:00',
        ex: 'Un proyecto de robótica se planifica en fases: idea, componentes, esquema, programa y pruebas. Documentarlo con fotos del montaje y el código comentado permite repetirlo y mejorarlo después.',
        eg: 'El proyecto "robot que evita obstáculos" se documenta con el esquema, el código y un video de la prueba. Sin esa documentación, reconstruirlo un mes después llevaría el doble de tiempo.',
        pr: 'Planifica un proyecto de robótica en una página: objetivo, componentes, esquema y pruebas.' },
      { t: 'Recursos externos', d: 'Simuladores, competiciones y comunidades.', m: '08:45',
        ex: 'Los simuladores (como Tinkercad Circuits) permiten probar circuitos y código sin hardware; las competiciones (como FIRST LEGO League) dan retos reales; las comunidades (foros de Arduino) resuelven dudas concretas. Combinarlos acelera el aprendizaje.',
        eg: 'Probar un circuito en Tinkercad antes de montarlo revela errores de conexión sin quemar componentes. Preguntar en un foro con el esquema y el código obtiene respuestas útiles; preguntar sin ellos, no.',
        pr: 'Prueba un circuito en un simulador y anota qué errores encontraste antes de montarlo en físico.' }
    ]
  },
  'Robots actuales': {
    level: 'Principiante', hours: 2,
    image: 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&w=1400&q=85',
    intro: 'Panorama de robots y aplicaciones en el mundo actual: industria, servicios, hogar y los retos que plantean.',
    body: ['Los robots ya trabajan en fábricas, hospitales, almacenes y hogares: brazos que sueldan, robots que entregan medicamentos, aspiradoras que mapean la casa y drones que inspeccionan cultivos.',
      'Este curso recorre qué hacen hoy, cómo perciben y actúan, y qué retos plantean: empleo, seguridad y decisiones.'],
    context: 'Un robot percibe el entorno mediante sensores, interpreta sus lecturas con un controlador y actúa a través de motores u otros actuadores. Este ciclo de percepción, decisión y acción permite automatizar tareas.',
    method: ['Define qué tarea hace el robot y en qué entorno.', 'Identifica sus sensores y sus actuadores.', 'Explica su ciclo: percibir, decidir, actuar.', 'Valora sus ventajas, límites y riesgos.'],
    checklist: ['¿Puedes explicar el ciclo percibir-decidir-actuar de un robot?', '¿Sabes qué sensores y actuadores usa?', '¿Distingues sus ventajas de sus riesgos?'],
    diagram: ['Percepción', 'Decisión', 'Acción'],
    lessons: [
      { t: 'Qué es un robot', d: 'Definición, partes y el ciclo percibir-decidir-actuar.', m: '09:10',
        ex: 'Un robot es una máquina que percibe su entorno con sensores, decide con un controlador y actúa con actuadores. Una lavadora automática no es un robot (no percibe ni decide); una aspiradora que mapea la casa y evita obstáculos sí lo es.',
        eg: 'Una aspiradora robot usa sensores de distancia para no chocar, un mapa para cubrir toda la casa y motores para moverse; si detecta un escalón, retrocede. Su ciclo es percibir (sensores), decidir (mapa y reglas) y actuar (motores).',
        pr: 'Elige tres máquinas de tu entorno y decide cuáles son robots según el ciclo percibir-decidir-actuar. Justifica cada caso.' },
      { t: 'Sensores y actuadores', d: 'Cómo perciben y cómo actúan los robots reales.', m: '10:20',
        ex: 'Los robots industriales usan cámaras, sensores de fuerza y encoders para saber dónde están sus brazos; los de servicio usan lidar, ultrasonido y cámaras para navegar. Sus actuadores son motores, servos y pinzas con control de fuerza.',
        eg: 'Un brazo de fábrica que suelda usa cámaras para localizar la pieza y sensores de fuerza para no aplastarla; un robot de almacén usa lidar para mapear pasillos y ruedas con encoders para saber cuánto avanzó.',
        pr: 'Elige un robot real y anota sus sensores y actuadores. Explica qué pasaría si fallara uno de sus sensores.' },
      { t: 'Robots industriales', d: 'Fábricas, almacenes y agricultura: dónde trabajan.', m: '10:45',
        ex: 'En la industria, los robots sueldan, pintan, ensamblan y mueven materiales con precisión y sin cansarse; en los almacenes, robots móviles llevan estanterías a los operarios; en la agricultura, drones y tractores autónomos monitorean cultivos.',
        eg: 'Un brazo industrial suelda la misma pieza mil veces con un error menor a un milímetro; un robot de almacén recorre kilómetros al día llevando estanterías. Su valor está en la repetición precisa y en trabajos peligrosos o pesados.',
        pr: 'Investiga un robot industrial concreto y escribe qué tarea hace, qué sensores usa y qué ventaja aporta frente a hacerlo a mano.' },
      { t: 'Robots de servicio', d: 'Hogares, hospitales y calles: robots entre personas.', m: '10:30',
        ex: 'Los robots de servicio trabajan cerca de personas: aspiradoras, cortacéspedes, robots de entrega, asistentes en hospitales que llevan medicamentos y robots sociales que acompañan. Deben ser seguros: detectar personas, moverse despacio y detenerse ante obstáculos.',
        eg: 'Un robot de entrega en una acera usa cámaras y GPS para navegar y se detiene si detecta a un peatón; un robot hospitalario transporta muestras por pasillos sin cruzarse con el personal. La seguridad es su requisito principal.',
        pr: 'Elige un robot de servicio y anota cómo garantiza la seguridad de las personas a su alrededor.' },
      { t: 'Retos y aplicaciones', d: 'Empleo, seguridad, privacidad y el futuro de la robótica.', m: '09:55',
        ex: 'Los retos de la robótica son técnicos y sociales: que los robots sean seguros, que no desplacen empleos sin alternativas, que protejan la privacidad de lo que perciben y que sus decisiones sean explicables. El futuro pasa por robots que colaboren con personas, no que las reemplacen.',
        eg: 'Un robot colaborativo (cobot) trabaja junto a un operario y se detiene si lo toca; un robot de vigilancia con cámaras plantea preguntas de privacidad. Cada aplicación exige valorar beneficios y riesgos antes de desplegarla.',
        pr: 'Escribe un párrafo con tu opinión: ¿qué tarea te gustaría que hiciera un robot y qué límite le pondrías? Justifica ambas.' }
    ]
  },
  'Componentes electrónicos': {
    level: 'Principiante', hours: 4,
    image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=1400&q=85',
    intro: 'Identifica componentes electrónicos y aprende para qué se utilizan: resistencias, condensadores, diodos, transistores y más.',
    body: ['Cada componente electrónico tiene una función y una forma de reconocerse: el código de colores de una resistencia, la banda de un diodo, las patas de un transistor. Leerlos es el primer paso para entender cualquier circuito.',
      'Aprenderás a identificarlos por su aspecto y su símbolo, a leer sus valores y a elegir el adecuado para cada uso, con prácticas de medición real.'],
    context: 'Un circuito es un camino organizado para la corriente eléctrica. La tensión impulsa el movimiento de carga, la corriente describe cuánto circula y los componentes transforman o limitan ese comportamiento.',
    method: ['Lee el esquema y reconoce símbolos, nodos y polaridades.', 'Anota la función de cada componente y sus límites indicados.', 'Calcula o verifica valores antes de conectar la alimentación.', 'Mide el circuito y compara la observación con la predicción.'],
    checklist: ['¿Puedes seguir el recorrido de la corriente?', '¿Reconoces polaridad y valor nominal?', '¿El montaje se verificó antes de alimentarlo?'],
    diagram: ['Fuente', 'Componentes', 'Carga'],
    lessons: [
      { t: 'Magnitudes eléctricas', d: 'Tensión, corriente y resistencia: la ley de Ohm.', m: '11:00',
        ex: 'La tensión (voltios) es la diferencia de potencial que impulsa la corriente; la corriente (amperios) es el flujo de carga; la resistencia (ohmios) se opone a ese flujo. La ley de Ohm las relaciona: V = I × R. Con dos valores se calcula el tercero.',
        eg: 'Una resistencia de 220 Ω con 5 V deja pasar I = 5 / 220 ≈ 0,023 A (23 mA). Si la tensión sube a 10 V con la misma resistencia, la corriente se duplica a 45 mA: por eso cambiar la fuente sin recalcular puede quemar componentes.',
        pr: 'Calcula la corriente de una resistencia de 1 kΩ con 5 V y con 9 V. Anota qué cambiarías para mantener 20 mA con 9 V.',
        code: { label: 'Ejemplo: ley de Ohm', code: 'V = I x R\nI = V / R\nR = V / I\n\nEjemplo: V = 5 V, R = 220 ohmios\nI = 5 / 220 = 0,023 A = 23 mA' } },
      { t: 'Resistencias y condensadores', d: 'Código de colores, valores y qué hace un condensador.', m: '12:15',
        ex: 'Una resistencia se lee por su código de colores: las dos primeras bandas son dígitos, la tercera el multiplicador y la cuarta la tolerancia. Un condensador almacena carga y se usa para filtrar, temporizar o acoplar señales; su valor se mide en faradios (habitualmente µF o nF).',
        eg: 'Una resistencia con bandas marrón-negro-rojo-dorado es 1 kΩ con 5 % de tolerancia (10 × 100). Un condensador de 100 µF en paralelo a la alimentación suaviza las caídas de tensión cuando un motor arranca.',
        pr: 'Lee el valor de tres resistencias por su código de colores y compruébalo con el multímetro. Anota la tolerancia de cada una.' },
      { t: 'Diodos y LED', d: 'Sentido único, caída de tensión y polaridad.', m: '11:30',
        ex: 'Un diodo deja pasar corriente en un solo sentido: del ánodo al cátodo, marcado con una banda en el cátodo. Un LED es un diodo que emite luz y tiene una caída de tensión típica (2 V el rojo, 3 V el azul o blanco) que se usa para calcular su resistencia.',
        eg: 'Un diodo en serie con una fuente protege contra la inversión de polaridad: si se conecta al revés, el diodo bloquea la corriente y el circuito no se daña. Un LED conectado al revés simplemente no enciende.',
        pr: 'Identifica el ánodo y el cátodo de tres diodos y LED distintos. Monta un LED con su resistencia y comprueba qué pasa al invertirlo.' },
      { t: 'Transistores', d: 'El transistor como interruptor y como amplificador.', m: '12:40',
        ex: 'Un transistor (por ejemplo, el NPN 2N2222) es un interruptor controlado por corriente: una pequeña corriente en la base permite una mayor entre colector y emisor. También amplifica señales. Sus límites son la corriente máxima y la tensión máxima entre colector y emisor.',
        eg: 'Con un transistor, un pin de Arduino (5 V, 20 mA) puede encender un motor de 12 V y 500 mA: la base recibe la señal pequeña y el colector maneja la corriente grande. Sin el transistor, el pin se dañaría.',
        pr: 'Monta un transistor como interruptor para un LED de alta potencia. Calcula la resistencia de base para una corriente de base de 5 mA.' },
      { t: 'Lectura de componentes', d: 'Hojas de datos, símbolos y cómo elegir el componente.', m: '10:50',
        ex: 'La hoja de datos (datasheet) de un componente indica sus valores máximos, su encapsulado y sus curvas de funcionamiento. Leerla antes de usar un componente evita quemarlo: tensión máxima, corriente máxima y temperatura de trabajo son los datos clave.',
        eg: 'El datasheet de un 2N2222 indica 800 mA de corriente máxima de colector y 40 V entre colector y emisor; usarlo con 1 A lo destruiría. El símbolo en el esquema muestra sus tres patas: base, colector y emisor.',
        pr: 'Busca la hoja de datos de un transistor o un LED que tengas y anota sus tres valores máximos. Comprueba que tu circuito los respeta.' }
    ]
  },
  'Electrónica analógica': {
    level: 'Intermedio', hours: 4,
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=1400&q=85',
    intro: 'Comprende señales y circuitos analógicos básicos: divisores, filtros, amplificación y medición.',
    body: ['La electrónica analógica trabaja con señales continuas: la voz de un micrófono, la luz de un sensor, la música de un altavoz. Entender cómo se dividen, filtran y amplifican esas señales es la base de la instrumentación.',
      'Estudiarás divisores de tensión, filtros RC, amplificadores operacionales y técnicas de medición con el multímetro y el osciloscopio.'],
    context: 'Las señales analógicas varían de forma continua dentro de un rango. Un divisor reparte tensión, un filtro atenúa ciertas frecuencias y un amplificador modifica amplitud; los valores y límites del circuito determinan el resultado.',
    method: ['Dibuja la señal de entrada y predice cómo cambiará.', 'Calcula valores con las fórmulas del circuito.', 'Monta y mide con el multímetro antes de darlo por bueno.', 'Compara la medición con la predicción y explica la diferencia.'],
    checklist: ['¿Puedes predecir la salida antes de medirla?', '¿Los valores calculados coinciden con los medidos?', '¿Conoces los límites del circuito (tensión, frecuencia)?'],
    diagram: ['Señal', 'Circuito', 'Medición'],
    lessons: [
      { t: 'Señales analógicas', d: 'Tensión continua, alterna y qué mide un osciloscopio.', m: '10:40',
        ex: 'Una señal analógica varía de forma continua: la tensión continua (DC) mantiene su valor y la alterna (AC) oscila, como la senoidal de 50 Hz de la red eléctrica. Un osciloscopio muestra la señal en el tiempo: su amplitud, su frecuencia y su forma.',
        eg: 'La salida de un micrófono es una señal alterna de pocos milivoltios que sigue la voz; la de un sensor de temperatura es una continua que cambia despacio. Ver ambas en el osciloscopio muestra de inmediato su diferencia.',
        pr: 'Dibuja una señal senoidal de 1 V de amplitud y 50 Hz y una continua de 3 V. Marca amplitud y periodo en cada una.' },
      { t: 'Divisores y filtros', d: 'Divisor de tensión y filtro RC paso bajo.', m: '12:20',
        ex: 'Un divisor de tensión con dos resistencias reparte la tensión de entrada en proporción a sus valores: Vsal = Vent × R2 / (R1 + R2). Un filtro RC (resistencia y condensador) atenúa las frecuencias altas y deja pasar las bajas: es un paso bajo con frecuencia de corte fc = 1 / (2πRC).',
        eg: 'Con R1 = R2 = 10 kΩ y 5 V de entrada, el divisor da 2,5 V. Un filtro con R = 1,6 kΩ y C = 100 nF tiene su corte en unos 1 kHz: una señal de 100 Hz pasa casi intacta y una de 10 kHz se atenúa mucho.',
        pr: 'Calcula la salida de un divisor con R1 = 1 kΩ y R2 = 2 kΩ a 9 V. Monta el filtro RC y mide su salida con dos frecuencias distintas.',
        code: { label: 'Ejemplo: divisor y frecuencia de corte', code: 'Divisor: Vsal = Vent x R2 / (R1 + R2)\nEjemplo: 5 V, R1 = R2 = 10k -> Vsal = 2,5 V\n\nFiltro RC: fc = 1 / (2 x pi x R x C)\nR = 1,6k, C = 100 nF -> fc ~ 1 kHz' } },
      { t: 'Amplificación', d: 'El amplificador operacional y sus configuraciones básicas.', m: '13:00',
        ex: 'Un amplificador operacional (como el LM358) amplifica la diferencia entre sus dos entradas con una ganancia muy alta; con realimentación se controla esa ganancia. En configuración no inversora, la ganancia es 1 + Rf/R1; como seguidor de tensión, la ganancia es 1 y sirve para adaptar impedancias.',
        eg: 'Un micrófono que entrega 10 mV necesita un amplificador con ganancia 100 para llegar a 1 V: con Rf = 99 kΩ y R1 = 1 kΩ en configuración no inversora, la ganancia es 100. Sin realimentación, el operacional saturaría con cualquier señal.',
        pr: 'Monta un amplificador no inversor con ganancia 11 (Rf = 10 kΩ, R1 = 1 kΩ) y mide su salida con una entrada de 0,2 V.' },
      { t: 'Medición', d: 'Multímetro, osciloscopio y cómo medir sin perturbar.', m: '11:10',
        ex: 'Medir bien es medir sin perturbar: el voltímetro se conecta en paralelo y debe tener alta impedancia; el amperímetro en serie y baja. El osciloscopio muestra la forma de la señal y su sonda ×10 reduce la carga sobre el circuito.',
        eg: 'Medir la tensión en un divisor de 1 MΩ con un multímetro de 1 MΩ de impedancia altera el resultado a la mitad; con uno de 10 MΩ el error es del 10 %. Elegir el instrumento según el circuito es parte de la medición.',
        pr: 'Mide la tensión de un divisor con el multímetro y con el osciloscopio. Anota ambas lecturas y explica cualquier diferencia.' },
      { t: 'Circuitos prácticos', d: 'Fuente regulada, sensor con amplificador y detector de luz.', m: '12:30',
        ex: 'Los circuitos prácticos combinan todo: una fuente regulada con un 7805 da 5 V estables; un sensor con amplificador convierte una señal débil en una útil; un detector de luz con LDR y comparador enciende una salida al cruzar un umbral.',
        eg: 'El detector de luz usa un LDR en un divisor, un comparador LM358 que compara esa tensión con una referencia ajustable y un LED a la salida. Al oscurecer, la tensión del divisor cruza la referencia y el LED se enciende.',
        pr: 'Monta el detector de luz con LDR y comparador. Ajusta la referencia para que se encienda solo en penumbra.' }
    ]
  },
  'Electrónica digital': {
    level: 'Intermedio', hours: 4,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=85',
    intro: 'Explora lógica digital, puertas y circuitos combinacionales: binario, tablas de verdad y diseño.',
    body: ['La electrónica digital representa la información con dos estados: 0 y 1. Con esos dos valores, las puertas lógicas construyen desde una alarma sencilla hasta un ordenador completo.',
      'Aprenderás el sistema binario, las puertas AND, OR y NOT, las tablas de verdad y el diseño de circuitos combinacionales, con prácticas en protoboard y simulador.'],
    context: 'La lógica digital representa estados discretos. Las puertas AND, OR y NOT combinan entradas; una tabla de verdad enumera sistemáticamente cada combinación y permite verificar el diseño.',
    method: ['Escribe la tabla de verdad del problema.', 'Obtén la expresión lógica de cada salida.', 'Simplifica si es posible y dibuja el circuito.', 'Monta o simula y comprueba todas las combinaciones.'],
    checklist: ['¿La tabla de verdad cubre todas las combinaciones?', '¿La expresión lógica coincide con la tabla?', '¿Comprobaste el circuito con todas las entradas?'],
    diagram: ['Entradas', 'Puertas', 'Salida'],
    lessons: [
      { t: 'Números binarios', d: 'Del decimal al binario: contar y sumar en base 2.', m: '11:00',
        ex: 'El sistema binario usa solo 0 y 1: cada posición vale el doble que la anterior (1, 2, 4, 8...). El número decimal 13 es 1101 en binario (8 + 4 + 0 + 1). Sumar en binario sigue las mismas reglas que en decimal, con acarreos.',
        eg: 'Sumar 5 (0101) y 3 (0011) en binario da 8 (1000): 1 + 1 = 10 (0 y llevo 1). Un byte (8 bits) representa 256 valores, de 0 a 255: por eso un color RGB usa tres bytes.',
        pr: 'Convierte 25 y 42 a binario y súmalos en binario. Comprueba el resultado en decimal.',
        code: { label: 'Ejemplo: conversión y suma binaria', code: '13 decimal = 1101 binario (8+4+0+1)\n  0101  (5)\n+ 0011  (3)\n= 1000  (8)\n\nUn byte: 8 bits, valores 0-255' } },
      { t: 'Puertas lógicas', d: 'AND, OR, NOT, NAND y NOR: símbolos y comportamiento.', m: '12:10',
        ex: 'Una puerta AND da 1 solo si todas sus entradas son 1; OR da 1 si alguna es 1; NOT invierte su entrada. NAND y NOR son sus negaciones y son universales: con solo puertas NAND se puede construir cualquier circuito. Los integrados 74HC08 (AND) o 74HC32 (OR) agrupan cuatro puertas.',
        eg: 'Una lámpara que se enciende solo si hay presencia Y es de noche usa una AND: sensor de presencia y sensor de luz como entradas. Una alarma que suena si se abre la puerta O la ventana usa una OR.',
        pr: 'Con una tabla de verdad, decide qué puerta usarías para una luz que se enciende si el interruptor A o el B están activos.' },
      { t: 'Tablas de verdad', d: 'Enumerar combinaciones y verificar diseños.', m: '11:30',
        ex: 'Una tabla de verdad lista todas las combinaciones de las entradas (2^n filas para n entradas) y el valor de cada salida. Es la especificación completa de un circuito combinacional y la herramienta para verificarlo: si una fila falla, el diseño está mal.',
        eg: 'Un circuito de dos entradas tiene 4 filas; uno de tres, 8. La alarma "armado Y sensor" tiene 4 filas y solo da 1 en la fila (1, 1). Escribir la tabla antes del circuito evita olvidar un caso.',
        pr: 'Escribe la tabla de verdad de un circuito con dos entradas que dé 1 solo cuando las entradas son distintas (XOR).' },
      { t: 'Circuitos combinacionales', d: 'Del problema al circuito: sumador y multiplexor.', m: '13:20',
        ex: 'Un circuito combinacional calcula su salida solo a partir de sus entradas actuales. El semisumador suma dos bits con una XOR (suma) y una AND (acarreo); el sumador completo añade el acarreo entrante. Un multiplexor elige una de varias entradas según sus líneas de selección.',
        eg: 'El semisumador de 1 + 1 da suma 0 y acarreo 1. Encadenando sumadores completos se suma un byte entero: es como funciona la ALU de un procesador. Un multiplexor 2 a 1 con selección S da la entrada A si S = 0 y B si S = 1.',
        pr: 'Dibuja el semisumador con sus puertas y escribe su tabla de verdad. Comprueba las cuatro combinaciones.',
        code: { label: 'Ejemplo: semisumador', code: 'Entradas: A, B\nSuma = A XOR B\nAcarreo = A AND B\n\nA B | Suma Acarreo\n0 0 |  0     0\n0 1 |  1     0\n1 0 |  1     0\n1 1 |  0     1' } },
      { t: 'Aplicaciones', d: 'Alarma, semáforo y decodificador: tres circuitos completos.', m: '12:00',
        ex: 'Las aplicaciones combinan puertas: una alarma con armado y sensor, un semáforo con contadores y un decodificador BCD a 7 segmentos que muestra dígitos en un display. Cada una se especifica con su tabla de verdad antes de montarla.',
        eg: 'El decodificador de 7 segmentos recibe 4 bits BCD y enciende los segmentos del dígito: el 1 enciende dos segmentos y el 8 los siete. Un error en una fila muestra el dígito equivocado, así que la tabla se comprueba dígito a dígito.',
        pr: 'Diseña la alarma "armado Y (puerta O ventana)": escribe su tabla de verdad y dibuja el circuito con puertas.' }
    ]
  },
  'Cableado de componentes electrónicos': {
    level: 'Principiante', hours: 3,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1400&q=85',
    intro: 'Aprende conexiones y cableado seguro de componentes electrónicos: herramientas, bornas y verificación.',
    body: ['Un buen cableado es la mitad de un buen circuito: conexiones firmes, cables de la sección adecuada, bornas bien apretadas y una verificación antes de alimentar. Muchos fallos "misteriosos" son en realidad un cable suelto.',
      'Aprenderás las herramientas, las técnicas de pelado y conexión, y la rutina de verificación que evita daños y ahorra horas de diagnóstico.'],
    context: 'La seguridad empieza antes de trabajar: identifica riesgos, elige protección adecuada, desconecta fuentes de energía cuando corresponda y utiliza herramientas según su propósito.',
    method: ['Desconecta la alimentación antes de tocar el cableado.', 'Pela, prepara y conecta un cable a la vez.', 'Aprieta bornas y comprueba que el cable no se suelta.', 'Verifica continuidad y ausencia de cortos antes de alimentar.'],
    checklist: ['¿Todos los cables están firmes y en su borna?', '¿No hay hilos sueltos ni cortos entre bornas?', '¿Verificaste continuidad con el circuito apagado?'],
    diagram: ['Preparación', 'Conexión', 'Verificación'],
    lessons: [
      { t: 'Herramientas y seguridad', d: 'Pelacables, destornilladores, multímetro y protección.', m: '09:40',
        ex: 'Las herramientas básicas de cableado son el pelacables, el destornillador adecuado a cada borna, el alicate de corte y el multímetro. La seguridad exige trabajar sin tensión, usar gafas si se corta o suelda y mantener el área ordenada.',
        eg: 'Pelar un cable con la medida correcta del pelacables deja el cobre intacto; pelarlo con un cúter puede cortar hilos y debilitar la conexión. Un destornillador demasiado grande daña la cabeza del tornillo de la borna.',
        pr: 'Prepara tu puesto de trabajo: herramientas ordenadas, circuito sin tensión y una bandeja para tornillos y piezas pequeñas.' },
      { t: 'Bornas y conductores', d: 'Tipos de borna, secciones de cable y qué aguanta cada uno.', m: '10:30',
        ex: 'Las bornas de tornillo, de resorte y de inserción sujetan el conductor de formas distintas; la sección del cable (0,5 mm², 1 mm², 2,5 mm²) decide cuánta corriente soporta sin calentarse. Un cable fino para un motor se calienta y puede fundir su aislante.',
        eg: 'Un cable de 0,5 mm² soporta unos 3 A; un motor que consume 5 A necesita al menos 1 mm². En una borna de tornillo, el cable debe quedar bajo el tornillo sin hilos fuera, y un terminal de puntera evita que se deshilache.',
        pr: 'Elige la sección de cable para tres cargas (un LED de 20 mA, un motor de 2 A y una lámpara de 5 A) y justifica cada elección.' },
      { t: 'Preparación de cables', d: 'Pelar, estañar y poner terminales: conexiones que duran.', m: '10:50',
        ex: 'Preparar un cable es pelar la longitud justa (unos 6–8 mm para una borna), retorcer los hilos para que no se abran y, si se suelda, estañar la punta. Un terminal de puntera crimpado da una conexión firme y reutilizable.',
        eg: 'Un cable pelado demasiado largo deja cobre al descubierto y puede tocar la borna vecina; uno demasiado corto no queda sujeto y se suelta al tirar. La regla es pelar lo que entra en la borna y ni un milímetro más.',
        pr: 'Prepara tres cables: pela, retuerce y coloca una puntera en uno de ellos. Comprueba que ninguno se suelta al tirar suavemente.' },
      { t: 'Conexiones', d: 'Unir cables, conectar a bornas y organizar el cableado.', m: '11:15',
        ex: 'Una conexión se hace un cable a la vez, siguiendo el esquema y anotando cada una. Los cables se agrupan por función (alimentación, señal, tierra) y se fijan con bridas para que no se muevan. Un cableado ordenado se diagnostica en minutos; uno enredado, en horas.',
        eg: 'En un panel con 12 conexiones, usar cables rojos para +5 V, negros para tierra y amarillos para señales permite seguir cada circuito a simple vista. Etiquetar los extremos con cinta evita confusiones.',
        pr: 'Cablea un circuito de tres componentes con colores por función y fíjalos con bridas. Pide a un compañero que siga tu cableado con el esquema.' },
      { t: 'Verificación del montaje', d: 'Continuidad, cortos y primera alimentación con precaución.', m: '10:40',
        ex: 'Antes de alimentar se verifica: continuidad de cada conexión con el multímetro (circuito apagado), ausencia de cortos entre alimentación y tierra, y que cada cable esté en la borna correcta según el esquema. La primera alimentación se hace con la fuente limitada en corriente si es posible.',
        eg: 'Un corto entre 5 V y tierra al alimentar haría caer la tensión a cero y calentaría la fuente; detectarlo antes con el multímetro en modo continuidad (que pita si hay corto) evita el daño. Una conexión intercambiada se detecta comparando borna por borna con el esquema.',
        pr: 'Verifica un montaje completo con el multímetro: continuidad de cada cable y ausencia de corto entre alimentación y tierra. Anota los resultados.' }
    ]
  },
  'Circuito impreso con luces LED': {
    level: 'Intermedio', hours: 4,
    image: 'https://images.unsplash.com/photo-1618410320928-25228d811631?auto=format&fit=crop&w=1400&q=85',
    intro: 'Diseña y monta una placa electrónica con luces LED: esquema, diseño de placa, soldadura y prueba.',
    body: ['Un circuito impreso (PCB) convierte un montaje de protoboard en una placa duradera: los componentes se sueldan en pistas de cobre diseñadas para ese circuito. Este proyecto guía el proceso completo con luces LED.',
      'Diseñarás el esquema, distribuirás los componentes en la placa, soldarás y probarás el resultado, aprendiendo en cada paso los errores típicos y cómo evitarlos.'],
    context: 'Un circuito impreso organiza las conexiones en pistas de cobre. El diseño decide dónde va cada componente, qué ancho tiene cada pista y cómo se verificará la placa antes de soldar.',
    method: ['Dibuja el esquema y calcula cada resistencia.', 'Distribuye los componentes pensando en pistas cortas.', 'Revisa el diseño antes de fabricar o soldar.', 'Suelda de uno en uno y prueba después de cada etapa.'],
    checklist: ['¿El esquema y la placa coinciden componente a componente?', '¿Las pistas soportan la corriente que llevarán?', '¿Probaste la placa antes de darla por terminada?'],
    diagram: ['Esquema', 'Placa', 'Prueba'],
    lessons: [
      { t: 'Esquema del circuito', d: 'El circuito de LED: fuente, resistencias y conexiones.', m: '11:00',
        ex: 'El esquema del proyecto es una fuente de 5 V que alimenta varios LED en paralelo, cada uno con su resistencia en serie calculada con la ley de Ohm. El esquema usa símbolos estándar y anota el valor de cada componente para que la placa se diseñe sin ambigüedades.',
        eg: 'Con 5 V y LED rojos de 2 V y 20 mA, cada resistencia es (5 − 2) / 0,02 = 150 Ω (se usa 220 Ω por seguridad). Poner los LED en paralelo con una sola resistencia común sería un error: el LED con menor caída se llevaría casi toda la corriente.',
        pr: 'Dibuja el esquema con tres LED (rojo, verde y azul) y calcula la resistencia de cada uno. Anota la caída de tensión de cada color.' },
      { t: 'Componentes y polaridad', d: 'LED, resistencias y conectores: qué va dónde y en qué sentido.', m: '10:30',
        ex: 'Cada componente tiene su huella en la placa y su polaridad: el LED tiene ánodo y cátodo, la resistencia no tiene polaridad y el conector de alimentación tiene + y −. En el diseño, la serigrafía marca la orientación para no soldar un LED al revés.',
        eg: 'Un LED soldado al revés no enciende y hay que desoldarlo para corregirlo; la marca de la serigrafía (el lado plano del círculo) indica el cátodo. Las resistencias se montan con el mismo valor agrupado para facilitar la revisión.',
        pr: 'Haz la lista de materiales del proyecto con valor, cantidad y polaridad de cada componente. Marca en el esquema el cátodo de cada LED.' },
      { t: 'Diseño de placa', d: 'Distribución, pistas, ancho y reglas de diseño.', m: '13:10',
        ex: 'Diseñar la placa es colocar los componentes y unirlos con pistas: las de alimentación más anchas (por ejemplo, 0,8 mm) y las de señal más finas (0,4 mm). Las pistas no deben cruzarse sin cambiar de capa ni pasar demasiado cerca entre sí; un plano de tierra mejora la estabilidad.',
        eg: 'Una pista de 0,4 mm soporta unos 500 mA con seguridad; la alimentación de tres LED (60 mA) cabe sin problema, pero un motor de 2 A necesitaría una pista mucho más ancha o un cable. Dejar margen alrededor de los agujeros evita que la broca rompa la pista.',
        pr: 'Distribuye los tres LED y sus resistencias en una placa de 5 × 5 cm, con pistas cortas y la alimentación en un lateral. Revisa que no haya cruces.' },
      { t: 'Montaje y soldadura', d: 'Soldar componentes: técnica, temperatura y revisión.', m: '12:45',
        ex: 'Soldar es calentar a la vez la pista y la pata del componente (unos 350 °C) y aplicar el estaño hasta que fluya y forme un cono brillante. Una soldadura fría (opaca y granulada) falla con el tiempo; demasiado estaño puede unir dos pistas vecinas.',
        eg: 'Para soldar un LED: se inserta en su huella, se doblan ligeramente las patas para que no se caiga, se calienta la unión 2–3 segundos y se aplica el estaño. Después se corta el sobrante de la pata y se revisa con lupa que no haya puentes.',
        pr: 'Suelda una resistencia de práctica en una placa de pruebas y revisa la soldadura: debe ser brillante, con forma de cono y sin puentes.' },
      { t: 'Prueba del circuito', d: 'Primera alimentación, medición y qué hacer si no enciende.', m: '11:20',
        ex: 'La prueba empieza sin alimentar: continuidad de cada pista y ausencia de cortos. Al alimentar, se mide la tensión en cada LED y la corriente total; si un LED no enciende, se revisa su polaridad, su soldadura y su resistencia, en ese orden.',
        eg: 'Si dos LED encienden y uno no, el problema está en ese LED o su rama: medir la tensión en su resistencia dice si le llega corriente. Si ningún LED enciende, el problema está en la alimentación común.',
        pr: 'Prueba tu placa: mide la tensión en cada LED encendido y la corriente total. Anota qué harías si un LED no encendiera.' }
    ]
  },
  'Señales de seguridad y salud': {
    level: 'Principiante', hours: 2,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1400&q=85',
    intro: 'Identifica señales de seguridad y aplica normas de prevención en el taller: colores, formas y equipos de protección.',
    body: ['En un taller, las señales hablan antes que las personas: un pictograma indica peligro, obligación, prohibición o salvamento con su color y su forma. Conocerlas es la primera medida de prevención.',
      'Aprenderás el código de colores y formas, los equipos de protección personal y las normas de trabajo seguro, con una actividad de identificación en un taller real o simulado.'],
    context: 'La seguridad empieza antes de trabajar: identifica riesgos, elige protección adecuada, desconecta fuentes de energía cuando corresponda y utiliza herramientas según su propósito. Detén la actividad si una condición no es segura.',
    method: ['Observa el taller y lista sus riesgos antes de empezar.', 'Identifica cada señal por su color y su forma.', 'Elige el equipo de protección que corresponde a la tarea.', 'Trabaja con orden y detente si algo no es seguro.'],
    checklist: ['¿Reconoces las señales de tu taller por color y forma?', '¿Llevas el equipo de protección adecuado?', '¿Sabes dónde están el botiquín y la salida de emergencia?'],
    diagram: ['Riesgo', 'Señal', 'Protección'],
    lessons: [
      { t: 'Riesgos del taller', d: 'Cortes, golpes, electricidad y polvo: qué puede pasar.', m: '09:00',
        ex: 'Los riesgos típicos del taller son los cortes con herramientas afiladas, los golpes con piezas sueltas, las quemaduras, el contacto eléctrico y la inhalación de polvo o vapores. Cada riesgo tiene su medida: protección, orden, ventilación y desconexión.',
        eg: 'Serrar sin sujetar la pieza puede hacer que se mueva y la sierra se desvíe; lijar sin mascarilla levanta polvo que se respira. Identificar el riesgo antes de empezar es lo que permite prevenirlo.',
        pr: 'Recorre un taller (o imagínalo) y anota cinco riesgos con su medida de prevención correspondiente.' },
      { t: 'Señales y colores', d: 'Prohibición, obligación, advertencia y salvamento.', m: '10:15',
        ex: 'Las señales usan color y forma: el círculo rojo con barra es prohibición, el círculo azul es obligación, el triángulo amarillo es advertencia y el rectángulo verde es salvamento o emergencia. El pictograma dentro dice qué: un casco, una llama o una salida.',
        eg: 'Un triángulo amarillo con una llama advierte de material inflamable; un círculo azul con gafas obliga a usar protección ocular; un rectángulo verde con una cruz indica el botiquín. Reconocer el código permite entender la señal sin leer texto.',
        pr: 'Dibuja cuatro señales (una de cada tipo) y escribe qué indican y dónde las colocarías en un taller.' },
      { t: 'Equipos de protección', d: 'Gafas, guantes, mascarilla y casco: cuándo usar cada uno.', m: '09:45',
        ex: 'El equipo de protección personal (EPP) se elige según la tarea: gafas para cortar o lijar, guantes para manipular piezas con bordes, mascarilla para polvo, casco para riesgo de caída de objetos y calzado cerrado siempre. El EPP no sustituye a las normas: es la última barrera.',
        eg: 'Para taladrar metal hacen falta gafas (virutas) y sujetar la pieza; los guantes no se usan con máquinas giratorias porque pueden engancharse. Cada tarea tiene su EPP y sus prohibiciones.',
        pr: 'Para tres tareas (serrar madera, soldar un circuito, lijar una pieza), anota el EPP necesario y qué no debe usarse.' },
      { t: 'Normas de trabajo', d: 'Orden, limpieza, herramientas y qué hacer ante un accidente.', m: '10:30',
        ex: 'Las normas básicas son: mantener el puesto ordenado, guardar cada herramienta en su lugar, desconectar máquinas antes de ajustarlas, no trabajar solo con máquinas peligrosas y conocer la ubicación del botiquín y el extintor. Ante un accidente, lo primero es avisar y no mover a la persona si no se sabe cómo.',
        eg: 'Dejar una herramienta en el suelo es un riesgo de tropiezo; trabajar con el pelo suelto cerca de un taladro es un riesgo de atrapamiento. Las normas parecen obvias hasta que ocurre el accidente que prevenían.',
        pr: 'Escribe las cinco normas de tu taller ideal y explica qué riesgo previene cada una.' },
      { t: 'Actividad de identificación', d: 'Recorrido de señales: encuentra y explica cada señal.', m: '09:20',
        ex: 'La actividad final es un recorrido: localizar cada señal del taller, fotografiarla o dibujarla, decir su tipo por color y forma, y explicar qué riesgo cubre y qué hacer ante ella. Es la prueba de que el código se entiende en contexto.',
        eg: 'Encontrar la señal de salida de emergencia, la de extintor y la de obligación de gafas en un taller real y explicarlas en voz alta demuestra más que memorizar una lista: demuestra reconocerlas donde importan.',
        pr: 'Haz el recorrido de señales de un taller real o de imágenes: identifica diez señales, clasifícalas y explica cada una en una frase.' }
    ]
  },
  'Tablas DIN A4': {
    level: 'Principiante', hours: 2,
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1400&q=85',
    intro: 'Recurso práctico para organizar medidas, trazados y trabajo técnico con el formato DIN A4.',
    body: ['El formato DIN A4 (210 × 297 mm) es el estándar de trabajo técnico y escolar: sus proporciones permiten doblarlo, archivarlo y escalarlo con reglas simples. Trabajar con él exige medir bien, trazar con precisión y comprobar antes de cortar.',
      'Aprenderás a leer medidas, trazar líneas y figuras con escuadra y compás, y a usar una tabla de trabajo como guía para proyectos técnicos.'],
    context: 'Un modelo físico depende de medidas, líneas de corte, pliegues y uniones. Distinguir cada marca en la plantilla evita deformar piezas; un prototipo barato permite validar encajes antes del montaje definitivo.',
    method: ['Lee la medida y anota qué representa.', 'Traza con regla y escuadra, sin apoyar la mano en la línea.', 'Comprueba la medida antes de cortar o doblar.', 'Registra el resultado y qué corregirías.'],
    checklist: ['¿Las medidas están en milímetros y sin ambigüedad?', '¿El trazado se comprobó antes de cortar?', '¿El resultado coincide con lo planeado?'],
    diagram: ['Medida', 'Trazado', 'Comprobación'],
    lessons: [
      { t: 'Material y preparación', d: 'Papel A4, regla, escuadra y lápiz: el puesto de trabajo.', m: '08:30',
        ex: 'El trabajo técnico en A4 necesita papel de gramaje adecuado, regla milimetrada, escuadra, compás y lápiz afilado. El puesto debe estar limpio, bien iluminado y con espacio para girar la hoja sin mover las herramientas de referencia.',
        eg: 'Un lápiz sin punta traza líneas gruesas que no permiten medir con precisión; una regla con el cero desgastado introduce errores desde el inicio. Revisar las herramientas antes de empezar evita errores que se descubren al final.',
        pr: 'Prepara tu puesto: revisa la regla, afila el lápiz y marca el cero de la regla con una comprobación.' },
      { t: 'Lectura de medidas', d: 'Milímetros, escalas y cómo leer una cota.', m: '09:15',
        ex: 'Las medidas técnicas se expresan en milímetros y se leen en cotas: una línea con flechas y un número indica la distancia entre dos puntos. La escala indica la relación con la realidad: 1:1 es tamaño real y 1:2 es la mitad.',
        eg: 'Una cota "120" entre dos líneas indica 120 mm; una escala 1:2 significa que 60 mm en el papel son 120 mm reales. Confundir la escala duplica o reduce el modelo a la mitad.',
        pr: 'Lee cinco cotas de un plano sencillo y anota cada medida en milímetros. Comprueba una con la regla.' },
      { t: 'Trazado', d: 'Líneas, ángulos y figuras con escuadra y compás.', m: '10:00',
        ex: 'Trazar es dibujar con precisión: líneas rectas con regla, ángulos de 90° y 45° con escuadra, y círculos con compás. Las líneas de construcción se trazan suaves para borrarlas después; las definitivas, firmes.',
        eg: 'Para trazar un rectángulo de 120 × 80 mm, se marca la base de 120, se levantan perpendiculares de 80 con la escuadra y se cierra. Medir las diagonales (deben ser iguales) comprueba que es un rectángulo y no un rombo.',
        pr: 'Traza un rectángulo de 120 × 80 mm y comprueba sus diagonales. Traza un círculo de 40 mm de diámetro con el compás.' },
      { t: 'Comprobación', d: 'Verificar medidas y ángulos antes de cortar.', m: '08:50',
        ex: 'Comprobar es medir de nuevo lo trazado antes de cortar: cada lado, cada ángulo y cada diagonal. Un error de 2 mm en el trazado es un error de 2 mm en la pieza; descubrirlo antes de cortar cuesta un borrador, después cuesta una pieza.',
        eg: 'En un cuadrado de 100 mm, las diagonales deben medir unos 141,4 mm; si una mide 138 y otra 144, el trazado está torcido. Corregirlo es mover una esquina hasta igualarlas.',
        pr: 'Comprueba tu rectángulo: mide lados, ángulos y diagonales y anota qué corregirías.' },
      { t: 'Aplicación práctica', d: 'Una tabla de trabajo A4 completa: medidas y trazado.', m: '10:10',
        ex: 'La aplicación final es una tabla de trabajo en A4: un marco, una tabla de medidas y un trazado (por ejemplo, la plantilla de una caja). Se entrega con las medidas anotadas y la comprobación hecha, lista para usar como guía de un proyecto.',
        eg: 'La plantilla de una caja de 100 × 60 × 40 mm en A4 incluye base, laterales y pestañas con sus medidas; doblarla en papel permite comprobar el encaje antes de cortarla en cartón.',
        pr: 'Dibuja la plantilla de una caja en A4 con todas sus medidas y comprueba el encaje doblando una copia en papel.' }
    ]
  },
  'Robots Cucabot': {
    level: 'Intermedio', hours: 4,
    image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1400&q=85',
    intro: 'Construye y programa robots Cucabot con actividades paso a paso: montaje, sensores, motores y retos.',
    body: ['Cucabot es un robot educativo de construcción sencilla: una base con motores, sensores y una placa programable, pensado para aprender robótica montando y programando desde el primer día.',
      'Lo construirás pieza a pieza, le añadirás sensores y motores, lo programarás para moverse y reaccionar, y terminarás con retos de movimiento que pondrán a prueba tu robot.'],
    context: 'Un robot percibe el entorno mediante sensores, interpreta sus lecturas con un controlador y actúa a través de motores. Este ciclo de percepción, decisión y acción permite automatizar tareas.',
    method: ['Monta la estructura siguiendo el orden indicado.', 'Comprueba cada conexión antes de alimentar.', 'Programa un comportamiento a la vez y pruébalo.', 'Ajusta una variable cada vez y registra el resultado.'],
    checklist: ['¿La estructura está firme y las ruedas giran libres?', '¿Cada sensor responde como esperabas?', '¿El robot supera el reto sin ayuda?'],
    diagram: ['Montaje', 'Sensores', 'Reto'],
    lessons: [
      { t: 'Materiales y montaje', d: 'Piezas del Cucabot y montaje de la base con ruedas.', m: '11:00',
        ex: 'El Cucabot se monta con una base, dos motores con ruedas, una rueda loca, la placa, la batería y los tornillos. El orden importa: primero la estructura, luego los motores, después la electrónica y por último el cableado.',
        eg: 'Si los motores quedan desalineados, el robot gira solo al avanzar; si la rueda loca queda demasiado alta, el robot se balancea. Comprobar que las ruedas giran libres antes de cablear evita desmontar después.',
        pr: 'Monta la base del Cucabot y comprueba que las ruedas giran libres y que la estructura no se tambalea.' },
      { t: 'Estructura del robot', d: 'Chasis, soportes y distribución de peso.', m: '10:20',
        ex: 'La estructura debe ser rígida y equilibrada: la batería y la placa se colocan centradas para que el peso se reparta entre las ruedas motrices y la rueda loca. Los sensores van en el frontal, despejados, para medir sin obstáculos.',
        eg: 'Una batería colocada en un extremo hace que una rueda cargue más y el robot se desvíe; centrarla corrige el desvío sin tocar el programa. Los cables se fijan para que no rocen las ruedas.',
        pr: 'Coloca la electrónica en tu Cucabot, equilibra el peso y fija los cables. Comprueba que nada roza las ruedas.' },
      { t: 'Sensores y motores', d: 'Sensor de distancia, seguidor de línea y control de motores.', m: '12:30',
        ex: 'El Cucabot típico lleva un sensor de distancia por ultrasonido (HC-SR04) y sensores de línea infrarrojos. Los motores se controlan con un driver y PWM: la velocidad y el sentido de cada rueda se programan por separado.',
        eg: 'El HC-SR04 mide la distancia con un pulso de ultrasonido y su eco: a 20 cm de un obstáculo, el robot debe detenerse o girar. Los sensores de línea devuelven blanco o negro y permiten seguir una línea en el suelo.',
        pr: 'Conecta el sensor de distancia y muestra sus lecturas en el monitor serie. Acerca y aleja un objeto y anota los valores.',
        code: { label: 'Ejemplo: medir distancia y decidir', code: 'void loop() {\n  int distancia = leerDistancia(); // en cm\n  Serial.println(distancia);\n  if (distancia < 20) {\n    girar();\n  } else {\n    avanzar();\n  }\n  delay(100);\n}' } },
      { t: 'Programación', d: 'Avanzar, girar, evitar obstáculos y seguir líneas.', m: '13:00',
        ex: 'Programar el Cucabot es combinar movimientos: avanzar con ambas ruedas iguales, girar con una detenida o en sentido contrario, y decidir con los sensores. El programa típico es un bucle: leer sensores, decidir y actuar.',
        eg: 'Para evitar obstáculos: si la distancia es menor de 20 cm, gira a la derecha 0,5 segundos; si no, avanza. Para seguir una línea: si el sensor izquierdo ve negro, gira a la izquierda; si lo ve el derecho, gira a la derecha.',
        pr: 'Programa tu Cucabot para que avance y gire al encontrar un obstáculo. Pruébalo en un espacio con dos obstáculos.' },
      { t: 'Retos de movimiento', d: 'Circuito, laberinto y carrera: pon a prueba tu robot.', m: '12:15',
        ex: 'Los retos finales miden lo aprendido: recorrer un circuito sin salirse, salir de un laberinto sencillo o completar una carrera contra el tiempo. Cada reto exige ajustar velocidad y umbrales, y registrar qué cambió en cada intento.',
        eg: 'En el circuito, un robot demasiado rápido se sale en las curvas; bajar la velocidad un 20 % y aumentar el giro lo mantiene en pista. Anotar velocidad y resultado de cada intento muestra qué ajuste funcionó.',
        pr: 'Supera el reto del circuito con tu Cucabot. Anota velocidad, umbral y tiempo de cada intento hasta lograrlo.' }
    ]
  },
  'Modelos de papel de figuras en 3D': {
    level: 'Principiante', hours: 3,
    image: 'https://images.unsplash.com/photo-1607453998774-d533f65dac99?auto=format&fit=crop&w=1400&q=85',
    intro: 'Construye modelos tridimensionales de papel a partir de plantillas: corte, pliegue, pestañas y ensamblaje.',
    body: ['El papercraft convierte una hoja plana en un objeto tridimensional: se recorta una plantilla (desarrollo) con caras, pestañas y líneas de pliegue, y se ensambla hasta cerrar la figura.',
      'Aprenderás a leer una plantilla, a cortar y marcar con precisión, y a ensamblar figuras cada vez más complejas, del cubo a un animal articulado.'],
    context: 'Un modelo físico depende de medidas, líneas de corte, pliegues y uniones. Distinguir cada marca en la plantilla evita deformar piezas; un prototipo barato permite validar encajes antes del montaje definitivo.',
    method: ['Lee la plantilla: caras, pestañas y líneas de pliegue.', 'Marca los pliegues con regla antes de doblar.', 'Corta con precisión y sin prisas.', 'Ensambla en seco y pega al final, una unión a la vez.'],
    checklist: ['¿Distingues líneas de corte, de pliegue y de pestaña?', '¿Las piezas encajan en seco antes de pegar?', '¿El modelo se sostiene por sí solo?'],
    diagram: ['Plantilla', 'Corte y pliegue', 'Modelo'],
    lessons: [
      { t: 'Plantillas y materiales', d: 'Qué es un desarrollo, papel adecuado y herramientas.', m: '09:10',
        ex: 'Una plantilla o desarrollo es la figura desplegada en el plano: sus caras unidas por aristas y sus pestañas para pegar. El papel ideal es cartulina de 160–200 g/m²: rígida pero doblable. Las herramientas son regla, cúter o tijeras, lápiz y pegamento de barra o cola blanca.',
        eg: 'El desarrollo de un cubo son seis cuadrados en cruz con pestañas; el de una pirámide, un cuadrado con cuatro triángulos. Un papel demasiado fino se deforma y uno demasiado grueso se rompe al doblar.',
        pr: 'Elige una plantilla sencilla y prepara los materiales. Marca en la plantilla qué son caras, pestañas y líneas de pliegue.' },
      { t: 'Corte y marcado', d: 'Cortar con precisión y marcar pliegues sin romper.', m: '10:20',
        ex: 'Cortar con precisión es seguir la línea sin desviarse y sin cortar las pestañas. Marcar los pliegues es pasar la punta sin filo (o el reverso del cúter) por la línea con una regla, para que el papel doble limpio sin romperse.',
        eg: 'Un pliegue marcado con la regla queda recto y nítido; uno doblado a mano se tuerce y la figura queda irregular. En cartulina gruesa, marcar es imprescindible: sin marca, el pliegue se rompe.',
        pr: 'Recorta el desarrollo de un cubo y marca todos sus pliegues con regla antes de doblar. Comprueba que cada pliegue queda recto.' },
      { t: 'Pestañas y pliegues', d: 'Tipos de pestaña y cómo doblar en el sentido correcto.', m: '09:45',
        ex: 'Las pestañas son las tiras que se pegan a la cara vecina; se doblan en el mismo sentido que la cara que unen. Doblar en sentido contrario deja la pestaña fuera y la figura no cierra. Los pliegues valle (hacia dentro) y montaña (hacia fuera) se distinguen en la plantilla por su símbolo.',
        eg: 'En un cubo, cada pestaña se dobla hacia dentro y se pega a la cara siguiente; si una se dobla hacia fuera, sobresale y estropea el acabado. Probar el cierre en seco revela qué pestaña está mal doblada.',
        pr: 'Dobla todas las pestañas de tu cubo en el sentido correcto y ensambla en seco sin pegar. Anota qué pestaña costó más.' },
      { t: 'Ensamblaje', d: 'Pegar en orden y sujetar mientras seca.', m: '10:30',
        ex: 'Ensamblar es pegar en orden: primero las uniones que dan forma, luego el cierre final. Se aplica poco pegamento, se presiona unos segundos y se deja secar antes de seguir; sujetar con pinzas o gomas ayuda mientras seca.',
        eg: 'En un cubo, se pegan cuatro caras en tira, luego la base y por último la tapa; pegar la tapa antes que la base deja la figura sin acceso para presionar por dentro. El orden es parte del diseño.',
        pr: 'Ensambla tu cubo pegando una unión a la vez y dejando secar entre ellas. Comprueba que las aristas quedan rectas.' },
      { t: 'Acabado del modelo', d: 'Limpieza, refuerzo y decoración del modelo terminado.', m: '09:00',
        ex: 'El acabado es limpiar restos de pegamento, reforzar por dentro las uniones débiles con una tira de papel y, si se quiere, decorar con color o rotuladores antes de ensamblar (es más fácil decorar en plano que en 3D).',
        eg: 'Un modelo decorado antes de recortar queda limpio; decorarlo después exige llegar a caras ya cerradas. Un refuerzo interior en la base evita que la figura se hunda al apoyarla.',
        pr: 'Termina tu modelo: limpia, refuerza y decóralo. Expón el resultado y explica qué cambiarías en el siguiente.' }
    ]
  },
  'Tangram': {
    level: 'Principiante', hours: 2,
    image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&w=1400&q=85',
    intro: 'Resuelve retos geométricos y crea figuras con las piezas del tangram: siete piezas, infinitas siluetas.',
    body: ['El tangram es un rompecabezas chino de siete piezas —cinco triángulos, un cuadrado y un paralelogramo— que forman un cuadrado y, reordenadas, cientos de siluetas: animales, personas, objetos.',
      'Practicarás composición geométrica: reconocer formas, girar y reflejar piezas, y crear tus propias figuras con reglas claras.'],
    context: 'En un tangram, conservar proporciones permite componer nuevas siluetas. Cada pieza tiene una relación exacta con las demás: los dos triángulos grandes forman la mitad del cuadrado.',
    method: ['Observa la silueta y busca sus formas principales.', 'Coloca primero las piezas grandes y luego las pequeñas.', 'Gira y refleja piezas antes de descartarlas.', 'Comprueba que no queden huecos ni solapamientos.'],
    checklist: ['¿Usaste las siete piezas sin solaparlas?', '¿La silueta se reconoce a primera vista?', '¿Puedes explicar dónde va cada pieza?'],
    diagram: ['Piezas', 'Composición', 'Silueta'],
    lessons: [
      { t: 'Piezas y reglas', d: 'Las siete piezas y las reglas del juego.', m: '08:40',
        ex: 'El tangram tiene siete piezas: dos triángulos grandes, uno mediano, dos pequeños, un cuadrado y un paralelogramo. Las reglas son: usar las siete piezas, sin solaparlas, para formar la silueta pedida. Las piezas se pueden girar y dar la vuelta.',
        eg: 'Las siete piezas forman un cuadrado perfecto; los dos triángulos grandes juntos forman la mitad de ese cuadrado. El paralelogramo es la única pieza que necesita darse la vuelta para algunas figuras.',
        pr: 'Recorta o dibuja las siete piezas y forma el cuadrado. Anota qué pieza te costó más colocar.' },
      { t: 'Figuras geométricas', d: 'Cuadrados, rectángulos y triángulos con las piezas.', m: '09:20',
        ex: 'Con las piezas se forman figuras geométricas: un rectángulo con los dos triángulos grandes, un triángulo mayor con varias piezas o un trapecio combinando triángulos y cuadrado. Cada figura exige pensar en ángulos y proporciones.',
        eg: 'Un rectángulo de 2 × 1 se forma con los dos triángulos grandes unidos por su hipotenusa; un triángulo con los cinco triángulos exige colocar el mediano en el centro. Las proporciones son exactas: no hay piezas que "casi" encajen.',
        pr: 'Forma un rectángulo y un triángulo grande con las piezas. Dibuja cada solución y anota qué piezas usaste.' },
      { t: 'Composición', d: 'De la silueta a las piezas: descomponer una figura.', m: '09:50',
        ex: 'Componer es descomponer: mirar una silueta (un gato, una casa) y ver qué piezas la forman. Se empieza por las formas grandes y evidentes —el cuerpo, el tejado— y se rellenan los detalles con las piezas pequeñas.',
        eg: 'En la silueta de un gato sentado, el cuerpo es un triángulo grande, la cabeza un triángulo mediano y la cola el paralelogramo. Si el cuerpo no encaja, la figura entera falla: por eso se empieza por lo grande.',
        pr: 'Elige una silueta sencilla y descompónla en piezas antes de colocarlas. Compara tu plan con el resultado.' },
      { t: 'Retos de siluetas', d: 'Resolver siluetas dadas: animales, personas y objetos.', m: '10:10',
        ex: 'Los retos de siluetas dan solo el contorno y hay que rellenarlo con las siete piezas. La estrategia es probar las piezas grandes en las zonas grandes, girar el paralelogramo cuando algo no encaja y no tener miedo a deshacer y empezar de nuevo.',
        eg: 'La silueta de un cisne se resuelve con el triángulo grande como cuerpo, el mediano como cuello y el pequeño como cabeza; el paralelogramo forma el ala. Si el cuello no encaja, suele ser el triángulo mediano girado al revés.',
        pr: 'Resuelve tres siluetas de dificultad creciente. Anota en cuál tardaste más y qué estrategia te funcionó.' },
      { t: 'Diseños propios', d: 'Crea tu propia silueta y reta a otros a resolverla.', m: '09:30',
        ex: 'Crear una silueta propia es el reto inverso: componer una figura reconocible con las siete piezas y dibujar solo su contorno para que otro la resuelva. Una buena silueta se reconoce sin ver las piezas interiores.',
        eg: 'Un pez con las siete piezas usa un triángulo grande como cuerpo, el cuadrado como ojo y el paralelogramo como cola; su contorno debe ser claro: si el contorno es ambiguo, nadie podrá resolverlo.',
        pr: 'Crea tu propia silueta, dibuja solo su contorno y pide a un compañero que la resuelva con las piezas.' }
    ]
  },
  'Teselados periódicos': {
    level: 'Intermedio', hours: 3,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1400&q=85',
    intro: 'Explora patrones periódicos y crea teselados con formas regulares: polígonos, simetría y repetición.',
    body: ['Un teselado cubre el plano con formas repetidas sin huecos ni solapamientos, como las baldosas de un suelo o los panales de abejas. Los teselados periódicos repiten un mismo motivo con traslaciones.',
      'Aprenderás qué polígonos regulares teselan solos, cómo se combinan varios y cómo diseñar tu propio patrón con simetría y repetición.'],
    context: 'Un patrón geométrico usa transformaciones como traslación, giro y reflexión. En una teselación las piezas cubren el plano sin huecos ni solapamientos.',
    method: ['Elige la pieza y comprueba que cubre sin huecos.', 'Define la regla de repetición: traslación, giro o reflexión.', 'Construye el motivo mínimo que se repite.', 'Repite el motivo y comprueba los encajes en los bordes.'],
    checklist: ['¿El patrón cubre sin huecos ni solapamientos?', '¿La regla de repetición es clara y constante?', '¿Los bordes del motivo encajan con sus vecinos?'],
    diagram: ['Pieza', 'Motivo', 'Plano cubierto'],
    lessons: [
      { t: 'Teselación y patrones', d: 'Qué es teselar y qué patrones se repiten en la naturaleza.', m: '10:00',
        ex: 'Teselar es cubrir una superficie con formas sin dejar huecos ni solaparlas. En la naturaleza, los panales de abejas usan hexágonos y las escamas de los peces se solapan en patrones regulares; en la arquitectura, los suelos de baldosas son teselados.',
        eg: 'Un suelo de baldosas cuadradas es un teselado periódico simple; un panal es un teselado hexagonal. Ambos repiten una pieza con traslaciones y cubren el plano completo.',
        pr: 'Busca tres teselados en tu entorno (suelo, pared, naturaleza) y anota qué pieza se repite en cada uno.' },
      { t: 'Polígonos regulares', d: 'Triángulo, cuadrado y hexágono: los únicos que teselan solos.', m: '11:20',
        ex: 'Solo tres polígonos regulares teselan el plano por sí solos: el triángulo equilátero (6 en cada vértice), el cuadrado (4) y el hexágono regular (3). La razón es angular: los ángulos que se juntan en cada vértice deben sumar 360°. El pentágono no lo logra: 3 pentágonos suman 324° y 4 se pasan a 432°.',
        eg: 'En un vértice de un teselado cuadrado se juntan 4 ángulos de 90° = 360°, exacto. En uno hexagonal, 3 ángulos de 120° = 360°. Con pentágonos (108°), ni 3 ni 4 suman 360°, así que siempre queda un hueco o un solape.',
        pr: 'Comprueba con los ángulos por qué el triángulo equilátero (60°), el cuadrado (90°) y el hexágono (120°) teselan, y el pentágono (108°) no.' },
      { t: 'Repetición y simetría', d: 'Traslación, giro y reflexión: las transformaciones del patrón.', m: '11:40',
        ex: 'Un teselado periódico se genera con transformaciones: traslación (desplazar la pieza), giro (rotarla) y reflexión (reflejarla como en un espejo). El motivo mínimo es la pieza o grupo de piezas que, repetido con esas transformaciones, cubre el plano.',
        eg: 'Un patrón de triángulos que alternan orientación usa reflexión: cada triángulo es el espejo del vecino. Un patrón de cuadrados con un diseño girado 90° en cada baldosa usa rotación. Identificar la transformación es describir el patrón.',
        pr: 'Dibuja un motivo de dos cuadrados y repítelo con traslación y con giro. Anota qué cambia en cada caso.' },
      { t: 'Construcción del diseño', d: 'Del motivo al plano: dibujar y comprobar encajes.', m: '12:10',
        ex: 'Construir un teselado es dibujar el motivo, repetirlo con la regla elegida y comprobar que las piezas encajan en los bordes. Los errores típicos son dejar huecos en las uniones o usar una pieza que no encaja con su vecina al repetir.',
        eg: 'Un teselado de hexágonos con un punto en el centro de cada uno exige que los puntos queden alineados al repetir; si el motivo está desplazado medio hexágono, el patrón se rompe. Comprobar tres repeticiones seguidas revela el error.',
        pr: 'Construye un teselado con hexágonos regulares en papel. Repite el motivo al menos tres veces en cada dirección y comprueba los encajes.' },
      { t: 'Composición final', d: 'Tu teselado con color: composición y presentación.', m: '10:30',
        ex: 'La composición final añade color con una regla: colores que se repiten con el motivo, no al azar. Un teselado con dos o tres colores que siguen la repetición se lee como un patrón; con colores aleatorios se ve desordenado.',
        eg: 'Colorear los hexágonos alternando dos colores por filas crea franjas; colorearlos según su orientación crea un patrón de estrellas. El color debe seguir la misma regla de repetición que la forma.',
        pr: 'Colorea tu teselado con dos colores siguiendo la regla de repetición. Expón el resultado y explica tu regla.' }
    ]
  },
  'Teselado del sombrero': {
    level: 'Intermedio', hours: 3,
    image: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=1400&q=85',
    intro: 'Estudia y construye un teselado con la forma conocida como sombrero: la baldosa aperiódica que cubre el plano sin repetirse.',
    body: ['En 2023 se descubrió la baldosa "sombrero" (hat): una sola forma con 13 lados que cubre el plano sin huecos y sin que el patrón se repita nunca de forma periódica. Es la primera baldosa aperiódica de una sola pieza.',
      'Estudiarás su forma, sus propiedades y cómo construir su teselado, y reflexionarás sobre qué significa que un patrón no se repita jamás.'],
    context: 'El teselado del sombrero es aperiódico: cubre el plano sin huecos, pero su patrón nunca se repite por traslación. Es un descubrimiento matemático reciente (2023) que resolvió un problema abierto durante décadas.',
    method: ['Dibuja la baldosa sombrero con sus medidas exactas.', 'Comprueba sus encajes: qué lados se unen con cuáles.', 'Construye el teselado por agrupaciones, no pieza a pieza.', 'Observa el patrón a varias escalas y busca repeticiones.'],
    checklist: ['¿Las baldosas encajan sin huecos ni solapamientos?', '¿El patrón no se repite por traslación?', '¿Puedes explicar por qué es aperiódico?'],
    diagram: ['Baldosa', 'Agrupación', 'Plano aperiódico'],
    lessons: [
      { t: 'Forma y propiedades', d: 'La baldosa sombrero: 13 lados y sus ángulos.', m: '10:30',
        ex: 'La baldosa sombrero tiene 13 lados y se construye sobre una retícula de hexágonos: es como un hexágono al que le faltan y sobran piezas. Sus ángulos son de 90° y 120°, y tiene una versión reflejada (su imagen especular) que también se usa en el teselado.',
        eg: 'El sombrero se puede dibujar sobre papel hexagonal: se marca un hexágono central, se añaden tres "alas" y se recorta el contorno de 13 lados. Su área equivale a la de varios hexágonos pequeños, lo que permite comprobar el dibujo contando celdas.',
        pr: 'Dibuja la baldosa sombrero sobre papel hexagonal siguiendo las medidas. Comprueba que tiene 13 lados.' },
      { t: 'Repetición de piezas', d: 'Cómo se agrupan: clusters y jerarquía.', m: '11:45',
        ex: 'El teselado del sombrero no se construye pieza a pieza al azar: las baldosas se agrupan en clusters (grupos de 4 o más) que a su vez se agrupan en metaclusters. Esa jerarquía es la clave de su aperiodicidad: el patrón se repite a escalas mayores, pero nunca por simple traslación.',
        eg: 'Un cluster típico es un sombrero rodeado por otros tres en orientaciones concretas; esos clusters se combinan en grupos mayores con la misma lógica. Es parecido a un fractal: la estructura se repite al ampliar, pero no al desplazar.',
        pr: 'Construye un cluster de cuatro baldosas sombrero en papel. Anota la orientación de cada una.' },
      { t: 'Encaje del patrón', d: 'Qué lados se unen y por qué no hay huecos.', m: '12:00',
        ex: 'Cada lado del sombrero tiene una longitud (hay lados cortos y largos) y solo encaja con lados de igual longitud en la orientación correcta. Las reglas de encaje —qué lado va con cuál— determinan el teselado completo: no hay libertad total, el patrón se deduce de los encajes.',
        eg: 'Si dos baldosas se unen por lados de distinta longitud, queda un hueco o un solape que revela el error. Las plantillas con los lados codificados por color ayudan a no equivocarse: mismo color con mismo color.',
        pr: 'Codifica por color los lados de tu baldosa según su longitud. Une dos baldosas y comprueba que los lados coinciden.' },
      { t: 'Construcción', d: 'Construir el teselado: de la plantilla al plano.', m: '12:30',
        ex: 'Construir el teselado es recortar varias baldosas (y sus reflejos) y unirlas siguiendo las reglas de encaje y los clusters. Se empieza por un cluster central y se crece hacia fuera, comprobando en cada paso que no queden huecos.',
        eg: 'Con 16 baldosas se cubre una zona visible del plano; con 32, el patrón empieza a mostrar su estructura jerárquica. Fotografiar el resultado desde arriba permite ver los clusters y sus orientaciones.',
        pr: 'Construye un teselado con al menos 12 baldosas sombrero. Fotografía el resultado y marca un cluster.' },
      { t: 'Exploración de diseños', d: 'Colorear el teselado y buscar patrones a varias escalas.', m: '10:45',
        ex: 'Colorear el teselado por orientación o por cluster revela su estructura: aparecen franjas y agrupaciones que no se ven en blanco y negro. Buscar el mismo motivo a distintas escalas muestra la autosimilitud del patrón aperiódico.',
        eg: 'Colorear cada baldosa según su orientación (hay 6 orientaciones y sus reflejos) muestra que ninguna orientación domina y que el patrón no tiene un periodo. Es una forma visual de demostrar la aperiodicidad.',
        pr: 'Colorea tu teselado por orientación y escribe en dos frases qué observas: ¿se repite el patrón? ¿Aparecen agrupaciones?' }
    ]
  }
};

  SR.COURSES = [
    source('Hardware de ordenador', 'Informática 1', 'https://www.picuino.com/es/informatica-hardware-index.html', 'Conoce las piezas de un ordenador, sus funciones y cómo se relacionan.', 'Componentes principales|Placa base y procesador|Memoria y almacenamiento|Periféricos|Montaje y mantenimiento'),
    source('Software de ordenador', 'Informática 1', 'https://www.picuino.com/es/informatica-software-index.html', 'Comprende los tipos de software, el sistema operativo y las aplicaciones.', 'Conceptos de software|Sistemas operativos|Aplicaciones|Archivos y formatos|Instalación y actualización'),
    source('Curso de EducaMadrid', 'Informática 1', 'https://www.picuino.com/es/informatica-av-index.html', 'Recorrido por herramientas y recursos digitales para el aprendizaje.', 'Entorno de trabajo|Recursos educativos|Documentos y archivos|Actividades prácticas|Repaso'),
    source('Curso de Impress', 'Informática 1', 'https://www.picuino.com/es/informatica-tutoimpress.html', 'Crea presentaciones con diapositivas, imágenes y elementos visuales.', 'Primeros pasos|Diseño de diapositivas|Texto e imágenes|Transiciones y animaciones|Presentación final'),
    source('Curso de Calc', 'Informática 1', 'https://www.picuino.com/es/informatica-calc-index.html', 'Aprende hojas de cálculo, fórmulas, formatos y gráficos.', 'Interfaz y celdas|Datos y formatos|Fórmulas y funciones|Gráficos|Ejercicios prácticos'),
    source('Curso de Writer', 'Informática 1', 'https://www.picuino.com/es/informatica-writer-index.html', 'Domina la edición y presentación de documentos de texto.', 'Edición básica|Formato de texto|Párrafos y páginas|Tablas e imágenes|Guardar y exportar'),
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

  // P0 (2026-11-12): fusionar los 6 cursos detallados de data.js. Sus lecciones
  // solo traen t/d/m, así que se les genera el material de estudio con
  // lessonMaterial() (igual que a los 47 de plantilla) y se les completan los
  // campos que la vista de detalle exige (image, sourceUrl, store, videoSearch,
  // tags, downloads, platform, provider). Se conservan intactos level, rating,
  // hours, videos, intro, body y las duraciones m: '09:12'. Al ser contenido
  // original de Social Red, su fuente apunta a su propia ficha en el sitio.
  const normalizeDetailedCourse = (course) => ({
    ...course,
    isDetailed: true,
    lessons: (course.lessons || []).map((lesson, index) => {
      const enriched = { t: lesson.t, d: lesson.d, m: lesson.m };
      enriched.material = lessonMaterial(course, enriched, index);
      return enriched;
    }),
    sourceUrl: `https://socialred1.github.io/#/cursos/${course.id}`,
    store: `https://socialred1.github.io/#/cursos/${course.id}`,
    image: imageByCategory[course.category] || imageByCategory['Informática 1'],
    videoSearch: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${course.title} curso tutorial`)}`,
    tags: [course.category],
    downloads: 0,
    platform: 'En línea',
    provider: 'Social Red'
  });
  SR.COURSES = SR.COURSES.concat(detailedCourses.map(normalizeDetailedCourse));

  SR.COURSES.sort((a, b) => a.category.localeCompare(b.category, 'es') || a.title.localeCompare(b.title, 'es'));
  const courseCategories = [...new Set(SR.COURSES.map((course) => course.category))];

  SR.COURSE_CATEGORIES = courseCategories;
  SR.COURSE_SOURCES = [...new Map(SR.COURSES.map((course) => {
    const url = new URL(course.sourceUrl);
    return [url.hostname, { label: url.hostname.replace(/^www\./, ''), href: `${url.protocol}//${url.hostname}/` }];
  })).values()].sort((a, b) => a.label.localeCompare(b.label, 'es'));

  // 2026-11-12: getAllApps() YA incluye SR.PLATFORM_APPS, así que el concat
  // anterior contaba las 33 apps multiplataforma dos veces (22.100.384).
  // Se deduplica por id y solo se suma downloadCount numérico real; las apps
  // del catálogo principal guardan sus descargas como objeto de enlaces, no
  // como cifra, y aportan 0. Sin dato numérico real el total es 0.
  SR.courseDownloadTotal = function () {
    const apps = SR.appsEngine ? SR.appsEngine.getAllApps() : (SR.ITEMS.apps || []);
    const seen = new Set();
    let total = 0;
    (apps || []).concat(SR.PLATFORM_APPS || []).forEach((app) => {
      if (!app) return;
      const id = app.id || app.name;
      if (!id || seen.has(id)) return;
      seen.add(id);
      if (typeof app.downloadCount === 'number' && Number.isFinite(app.downloadCount)) total += app.downloadCount;
    });
    return total;
  };

  const courseDetailView = function (course) {
    if (!course) return SR.views.notFound();
    const lessons = course.lessons.map((lesson, index) => `
      <li><button type="button" class="course-lesson-select${index === 0 ? ' is-active' : ''}" data-course-lesson="${index}" aria-pressed="${index === 0}">
        <span>${String(index + 1).padStart(2, '0')}</span><span class="course-lesson-title"><b>${SR.esc(lesson.t)}</b><small>${SR.esc(lesson.d)}</small></span>
        ${/^\d{1,2}:\d{2}$/.test(lesson.m || '') ? `<span class="course-lesson-duration">${SR.esc(lesson.m)}</span>` : ''}
        <span class="course-lesson-open">Abrir tema ${SR.icon('arrow')}</span></button></li>`).join('');
    const detailMeta = [
      course.level && course.level !== 'Autoguiado' ? `Nivel ${SR.esc(course.level)}` : '',
      typeof course.rating === 'number' ? `★ ${course.rating.toFixed(1)}` : '',
      typeof course.hours === 'number' ? `${course.hours} h` : '',
      typeof course.videos === 'number' && course.videos > 0 ? `${course.videos} videos` : ''
    ].filter(Boolean).map((meta) => `<span class="course-learning-badge">${meta}</span>`).join('');
    const renderLesson = (index) => {
      const lesson = course.lessons[index];
      const material = lesson.material;
      const codeExample = lesson.code || lessonCodeExample(course);
      return `<article class="course-lesson-reader">
        <span class="course-eyebrow">LECCIÓN ${String(index + 1).padStart(2, '0')} · CONTENIDO ORIGINAL SOCIAL RED</span>
        <h4>${SR.esc(lesson.t)}</h4>
        ${/^\d{1,2}:\d{2}$/.test(lesson.m || '') ? `<p class="course-lesson-meta">Duración: ${SR.esc(lesson.m)}</p>` : ''}
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
          <div class="course-detail-actions"><span class="course-learning-badge">${course.lessons.length} lecciones · 100% en esta página</span>${detailMeta}</div>
          <a class="course-back-link" href="#/cursos">← Volver al catálogo</a>
        </header>
        <div class="course-detail-content">
          <section><span class="course-eyebrow">DESCRIPCIÓN GENERAL</span><h3>Sobre este curso</h3><p>${SR.esc(course.intro)}</p>${course.isDetailed && Array.isArray(course.body) ? course.body.map((paragraph) => `<p>${SR.esc(paragraph)}</p>`).join('') : `<p>${SR.esc(teachingDomains[course.category].principle)}</p>`}</section>
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
    const downloadTotal = SR.courseDownloadTotal();
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
              <div><b>${downloadTotal > 0 ? SR.fmtNum(downloadTotal) : 'N/D'}</b><small>Descargas registradas en aplicaciones del catálogo</small></div>
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
                <p>${SR.esc(course.short)}</p><div><span>${course.lessons.length} temas${typeof course.rating === 'number' ? ` · ★ ${course.rating.toFixed(1)}` : ''}${typeof course.hours === 'number' ? ` · ${course.hours} h` : ''}</span><a href="#/cursos/${encodeURIComponent(course.id)}" target="_blank" rel="noopener noreferrer">Ver curso ${SR.icon('arrow')}</a></div>
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
