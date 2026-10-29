/* ==========================================================
   REEVA · Blog
   - #blog              -> lista "All Posts"
   - #blog/<slug>       -> entrada completa + entradas recientes + comentarios
   Para agregar una entrada nueva: copia un bloque de POSTS, cambia
   slug, titulo, imagen y contenido. Los tipos de contenido son:
     ['h2','texto']  ['h3','texto']  ['p','texto']
     ['ol',[ 'Negrita|resto del texto', ... ]]   lista numerada
     ['ul',[ 'Negrita|resto del texto', ... ]]   lista con viñetas
   La imagen principal va dentro de images/blog/.
   ========================================================== */
(function () {
  var root = document.getElementById('blogView');
  if (!root) return;

  var AUTOR = 'enockrios20275';
  var FECHA = '4 ago';
  var LECTURA = '4 min de lectura';

  var POSTS = [
    {
      slug: 'upcycling-transformando-ropa-vieja-en-nuevas-historias',
      titulo: 'Upcycling: Transformando Ropa Vieja en Nuevas Historias',
      imagen: 'images/blog/upcycling.jpg',
      pie: 'Eye-level view of a colorful upcycled clothing display',
      vistas: 1,
      intro: 'La moda rápida ha llevado a un aumento en la cantidad de ropa desechada, lo que plantea un desafío ambiental significativo. Sin embargo, el upcycling, o la reutilización creativa de prendas viejas, se ha convertido en una solución innovadora y sostenible. En este artículo, exploraremos cómo transformar ropa vieja en nuevas historias, no solo para reducir el desperdicio, sino también para expresar nuestra creatividad y estilo personal.',
      cuerpo: [
        ['h2', '¿Qué es el Upcycling?'],
        ['p', 'El upcycling es el proceso de transformar productos o materiales que ya no se utilizan en algo de mayor valor o utilidad. A diferencia del reciclaje, que a menudo implica descomponer materiales para crear nuevos productos, el upcycling busca dar una nueva vida a los objetos sin alterar su forma original de manera significativa. En el contexto de la moda, esto significa tomar ropa vieja y convertirla en algo nuevo y emocionante.'],
        ['h3', 'Beneficios del Upcycling'],
        ['ol', [
          'Reducción de Residuos|: Al reutilizar prendas, se disminuye la cantidad de ropa que termina en vertederos.',
          'Ahorro Económico|: Crear nuevas piezas a partir de ropa vieja puede ser más económico que comprar nuevas.',
          'Expresión Personal|: El upcycling permite a las personas mostrar su estilo único y creatividad.',
          'Sostenibilidad|: Contribuye a un enfoque más sostenible de la moda, ayudando a reducir la huella de carbono.'
        ]],
        ['h2', 'Ideas Creativas para Upcycling'],
        ['h3', 'Transformación de Camisas en Bolsos'],
        ['p', 'Una de las formas más sencillas de comenzar con el upcycling es transformar camisas viejas en bolsos. Aquí hay un paso a paso básico:'],
        ['ol', [
          'Selecciona una camisa|: Escoge una camisa que ya no uses, preferiblemente de un material resistente.',
          'Corta las mangas|: Retira las mangas para crear la forma básica del bolso.',
          'Cose el fondo|: Cierra la parte inferior de la camisa con una costura simple.',
          'Agrega un cierre|: Puedes añadir un botón o una cremallera para mantener tus pertenencias seguras.'
        ]],
        ['h3', 'De Jeans a Pantalones Cortos'],
        ['p', 'Los jeans viejos pueden ser transformados en pantalones cortos de verano. Este proyecto es ideal para aquellos que buscan un look fresco y cómodo.'],
        ['ol', [
          'Corta los jeans|: Decide la longitud deseada y corta los jeans.',
          'Desgaste|: Usa una lija o tijeras para crear un efecto desgastado en los bordes.',
          'Personaliza|: Agrega parches, bordados o pintura para un toque personal.'
        ]],
        ['h3', 'Chaquetas Vintage a Cojines'],
        ['p', 'Si tienes chaquetas que ya no usas, considera convertirlas en cojines decorativos.'],
        ['ol', [
          'Corta la chaqueta|: Desmonta la chaqueta y corta las piezas que usarás.',
          'Cose las piezas|: Une las piezas de tela para formar la funda del cojín.',
          'Rellena|: Agrega un relleno suave y cierra la funda.'
        ]],
        ['h2', 'Herramientas y Materiales Necesarios'],
        ['p', 'Para comenzar con el upcycling, necesitarás algunas herramientas y materiales básicos:'],
        ['ul', [
          'Tijeras|: Para cortar la tela.',
          'Hilo y aguja|: Para coser las piezas.',
          'Máquina de coser|: Opcional, pero facilita el proceso.',
          'Pintura textil|: Para personalizar tus creaciones.',
          'Parches y adornos|: Para añadir un toque único.'
        ]],
        ['h2', 'Consejos para el Upcycling Exitoso'],
        ['ol', [
          'Sé Creativo|: No tengas miedo de experimentar con diferentes técnicas y estilos.',
          'Inspírate|: Busca inspiración en redes sociales, blogs de moda o tiendas de segunda mano.',
          'Comienza Pequeño|: Si eres nuevo en el upcycling, comienza con proyectos sencillos antes de pasar a los más complejos.',
          'Comparte tus Creaciones|: Una vez que hayas terminado, comparte tus proyectos en línea para inspirar a otros.'
        ]],
        ['h2', 'La Comunidad del Upcycling'],
        ['p', 'El upcycling no solo es una actividad individual; también ha dado lugar a comunidades enteras dedicadas a la moda sostenible. Participar en talleres, ferias y grupos en línea puede ser una excelente manera de aprender nuevas técnicas y conocer a personas con intereses similares.'],
        ['h3', 'Talleres y Eventos'],
        ['p', 'Muchos lugares ofrecen talleres de upcycling donde puedes aprender de expertos y compartir ideas. Busca eventos en tu área o en línea que se centren en la moda sostenible.'],
        ['h3', 'Redes Sociales'],
        ['p', 'Las plataformas como Instagram y Pinterest están llenas de ideas de upcycling. Sigue a creadores que se especializan en esta práctica para obtener inspiración constante.'],
        ['h2', 'Historias de Éxito en Upcycling'],
        ['h3', 'Marcas que Hacen la Diferencia'],
        ['p', 'Varias marcas han adoptado el upcycling como parte de su modelo de negocio. Estas empresas no solo crean productos únicos, sino que también promueven la sostenibilidad en la moda.'],
        ['ol', [
          'Reformation|: Esta marca utiliza materiales reciclados y promueve el upcycling en sus colecciones.',
          'Patagonia|: Con su programa Worn Wear, Patagonia alienta a los clientes a reparar y reutilizar su ropa.',
          'Eileen Fisher|: Ofrece un programa de devolución donde las prendas viejas se transforman en nuevas piezas.'
        ]],
        ['h3', 'Proyectos Comunitarios'],
        ['p', 'En muchas ciudades, hay iniciativas comunitarias que se centran en el upcycling. Estos proyectos no solo ayudan a reducir residuos, sino que también fomentan la cohesión social.'],
        ['h2', 'El Futuro del Upcycling'],
        ['p', 'A medida que la conciencia sobre el impacto ambiental de la moda continúa creciendo, el upcycling se está convirtiendo en una tendencia cada vez más popular. Las personas buscan formas de ser más sostenibles y creativas en su estilo personal.'],
        ['h3', 'Innovaciones en Materiales'],
        ['p', 'El futuro del upcycling también incluye la innovación en materiales. Nuevas tecnologías están permitiendo la creación de tejidos a partir de materiales reciclados, lo que abre un mundo de posibilidades para los diseñadores y creadores.'],
        ['h3', 'Educación y Conciencia'],
        ['p', 'La educación sobre la moda sostenible y el upcycling es crucial. A medida que más personas se informan sobre el impacto de sus elecciones de moda, es probable que veamos un aumento en la demanda de prácticas sostenibles.'],
        ['h2', 'Resumen y Llamado a la Acción'],
        ['p', 'El upcycling es una forma poderosa de transformar ropa vieja en nuevas historias, contribuyendo a un futuro más sostenible. Al adoptar esta práctica, no solo reduces el desperdicio, sino que también expresas tu creatividad y estilo personal.'],
        ['p', 'Te animamos a que empieces hoy mismo. Busca en tu armario esas prendas que ya no usas y dale una nueva vida. Comparte tus creaciones y únete a la comunidad del upcycling. Juntos, podemos hacer una diferencia significativa en el mundo de la moda.'],
        ['p', '¡Comienza tu viaje de upcycling y transforma tu ropa vieja en algo extraordinario!']
      ]
    },
    {
      slug: 'moda-sostenible-el-futuro-de-la-ropa-circular',
      titulo: 'Moda Sostenible: El Futuro de la Ropa Circular',
      imagen: 'images/blog/moda-sostenible.jpg',
      pie: 'Eye-level view of a clothing rack displaying eco-friendly garments',
      vistas: 4,
      intro: 'La moda sostenible ha dejado de ser una tendencia pasajera para convertirse en una necesidad urgente en el mundo actual. Con el aumento de la conciencia sobre el impacto ambiental de la industria de la moda, cada vez más consumidores buscan alternativas que no solo sean estéticamente agradables, sino también responsables. La ropa circular, un concepto que promueve la reutilización y el reciclaje de materiales, se presenta como una solución viable para reducir el desperdicio y fomentar un futuro más sostenible.',
      cuerpo: [
        ['h2', '¿Qué es la moda sostenible?'],
        ['p', 'La moda sostenible se refiere a la creación de prendas que tienen un menor impacto ambiental y social. Esto incluye el uso de materiales orgánicos, prácticas de producción éticas y la promoción de un ciclo de vida prolongado para las prendas. En lugar de seguir el modelo tradicional de "usar y tirar", la moda sostenible busca crear un sistema donde las prendas puedan ser reutilizadas, recicladas o compostadas.'],
        ['h3', 'Principios de la moda sostenible'],
        ['ol', [
          'Materiales sostenibles|: Utilizar fibras orgánicas, recicladas o de origen responsable.',
          'Producción ética|: Asegurar condiciones laborales justas y seguras para los trabajadores.',
          'Durabilidad|: Crear prendas que sean resistentes y que puedan ser usadas durante mucho tiempo.',
          'Ciclo de vida|: Fomentar el reciclaje y la reutilización de las prendas al final de su vida útil.'
        ]],
        ['h2', 'La ropa circular y su importancia'],
        ['p', 'La ropa circular es un enfoque dentro de la moda sostenible que se centra en el ciclo de vida completo de una prenda. Este modelo busca minimizar el desperdicio y maximizar el uso de recursos. La idea es que, en lugar de desechar la ropa, se pueda devolver al ciclo de producción para ser reciclada o reutilizada.'],
        ['h3', 'Beneficios de la ropa circular'],
        ['ul', [
          'Reducción de residuos|: Al fomentar la reutilización y el reciclaje, se disminuye la cantidad de ropa que termina en vertederos.',
          'Ahorro de recursos|: La producción de nuevas prendas consume grandes cantidades de agua y energía. La ropa circular ayuda a conservar estos recursos.',
          'Menor impacto ambiental|: Al reducir la necesidad de nuevas materias primas, se disminuye la contaminación y el uso de productos químicos en la producción textil.'
        ]],
        ['h2', 'Ejemplos de marcas que lideran el cambio'],
        ['p', 'Cada vez más marcas están adoptando prácticas de moda sostenible y circular. Aquí hay algunos ejemplos destacados:'],
        ['h3', 'Patagonia'],
        ['p', 'Patagonia es conocida por su compromiso con la sostenibilidad. La marca ofrece un programa de reparación de prendas y fomenta la devolución de ropa usada para su reciclaje. Su lema, "No compres esta chaqueta", invita a los consumidores a reflexionar sobre sus hábitos de compra.'],
        ['h3', 'Eileen Fisher'],
        ['p', 'Eileen Fisher ha implementado un programa de reciclaje llamado "Renew", que permite a los clientes devolver prendas usadas a cambio de crédito en la tienda. La marca también utiliza materiales sostenibles y promueve la producción ética.'],
        ['h3', 'H&M'],
        ['p', 'H&M ha lanzado su línea "Conscious", que incluye prendas hechas de materiales reciclados y orgánicos. Además, la marca ha establecido contenedores de reciclaje en sus tiendas para fomentar la devolución de ropa usada.'],
        ['h2', 'Cómo los consumidores pueden contribuir'],
        ['p', 'Los consumidores juegan un papel crucial en la promoción de la moda sostenible y circular. Aquí hay algunas formas en que pueden contribuir:'],
        ['h3', 'Comprar de manera consciente'],
        ['p', 'Optar por marcas que priorizan la sostenibilidad y la ética en su producción. Investigar sobre las prácticas de las marcas antes de realizar una compra puede marcar la diferencia.'],
        ['h3', 'Reutilizar y reciclar'],
        ['p', 'Antes de desechar una prenda, considerar opciones como la donación, el intercambio o el reciclaje. Muchas comunidades tienen programas de reciclaje de ropa que facilitan este proceso.'],
        ['h3', 'Apoyar iniciativas locales'],
        ['p', 'Participar en mercados de segunda mano o en eventos de intercambio de ropa puede ayudar a reducir el desperdicio y fomentar una economía circular en la comunidad.'],
        ['h2', 'Desafíos de la moda sostenible'],
        ['p', 'A pesar de los avances en la moda sostenible y circular, todavía existen desafíos significativos que deben abordarse:'],
        ['h3', 'Costos de producción'],
        ['p', 'La producción sostenible a menudo implica costos más altos, lo que puede hacer que las prendas sean menos accesibles para algunos consumidores. Sin embargo, es importante considerar la inversión a largo plazo en prendas de calidad.'],
        ['h3', 'Conciencia del consumidor'],
        ['p', 'Aún hay una falta de conocimiento general sobre la moda sostenible. La educación y la sensibilización son clave para impulsar un cambio en los hábitos de consumo.'],
        ['h3', 'Infraestructura de reciclaje'],
        ['p', 'La infraestructura para reciclar ropa no está tan desarrollada como la de otros materiales. Se necesita una inversión en sistemas que faciliten el reciclaje de textiles.'],
        ['h2', 'El futuro de la moda circular'],
        ['p', 'El futuro de la moda circular parece prometedor, con un creciente número de consumidores que exigen prácticas más sostenibles. Las marcas están comenzando a reconocer que la sostenibilidad no es solo una tendencia, sino una necesidad.'],
        ['h3', 'Innovaciones en materiales'],
        ['p', 'La investigación en nuevos materiales sostenibles, como tejidos hechos de algas o plásticos reciclados, está en aumento. Estas innovaciones pueden ayudar a reducir el impacto ambiental de la moda.'],
        ['h3', 'Colaboraciones entre marcas'],
        ['p', 'Las colaboraciones entre marcas para crear colecciones sostenibles están en auge. Estas alianzas pueden ayudar a compartir recursos y conocimientos, promoviendo un enfoque más circular en la industria.'],
        ['h3', 'Políticas gubernamentales'],
        ['p', 'Los gobiernos están comenzando a implementar regulaciones que fomentan la sostenibilidad en la moda. Esto incluye incentivos para marcas que adoptan prácticas responsables y penalizaciones para aquellas que no lo hacen.'],
        ['h2', 'Conclusión'],
        ['p', 'La moda sostenible y la ropa circular son esenciales para un futuro más responsable y consciente. A medida que más consumidores se informan y exigen cambios, las marcas deben adaptarse y evolucionar. La transición hacia una industria de la moda más sostenible no solo es posible, sino necesaria. Cada pequeño paso cuenta, y juntos podemos construir un futuro donde la moda no solo sea hermosa, sino también ética y sostenible.'],
        ['p', 'La próxima vez que vayas de compras, recuerda que tus decisiones pueden tener un impacto significativo. Opta por la sostenibilidad y sé parte del cambio hacia un mundo más circular.']
      ]
    },
    {
      slug: 'conectando-talento-diseñadores-emergentes-y-moda-ecológica',
      titulo: 'Conectando Talento: Diseñadores Emergentes y Moda Ecológica',
      imagen: 'images/blog/conectando-talento.jpg',
      pie: 'Eye-level view of a sustainable fashion collection displayed on a rack',
      vistas: 1,
      intro: 'La moda ecológica ha dejado de ser una tendencia pasajera para convertirse en un movimiento esencial dentro de la industria. A medida que el mundo se enfrenta a desafíos ambientales cada vez más graves, los diseñadores emergentes están tomando la delantera, creando piezas que no solo son estéticamente agradables, sino también sostenibles. Este artículo explora cómo estos diseñadores están conectando su talento con la necesidad urgente de una moda más responsable.',
      cuerpo: [
        ['h2', 'La Necesidad de la Moda Ecológica'],
        ['p', 'La industria de la moda es una de las más contaminantes del mundo. Desde la producción de textiles hasta el transporte y la venta, cada etapa del proceso tiene un impacto significativo en el medio ambiente. Según un informe de la ONU, la moda representa el 10% de las emisiones de carbono globales. Esto ha llevado a un aumento en la demanda de prácticas más sostenibles.'],
        ['h3', '¿Qué es la Moda Ecológica?'],
        ['p', 'La moda ecológica se refiere a la creación de ropa y accesorios que minimizan el impacto ambiental. Esto incluye el uso de materiales reciclados, procesos de producción éticos y prácticas de comercio justo. Los diseñadores emergentes están a la vanguardia de este movimiento, utilizando su creatividad para desafiar las normas tradicionales de la moda.'],
        ['h2', 'Diseñadores Emergentes que Marcan la Diferencia'],
        ['h3', '1. Patricia González'],
        ['p', 'Patricia González es una diseñadora mexicana que ha ganado reconocimiento por su enfoque en la moda sostenible. Utiliza telas recicladas y técnicas de teñido natural para crear piezas únicas. Su última colección, "Raíces", se inspira en la flora local y promueve la conservación del medio ambiente.'],
        ['h3', '2. Javier López'],
        ['p', 'Javier López, un joven diseñador de España, ha creado una línea de ropa hecha completamente de materiales orgánicos. Su compromiso con la sostenibilidad se refleja en cada prenda, que no solo es elegante, sino también respetuosa con el planeta. Javier también trabaja con comunidades locales para asegurar que sus prácticas sean éticas y justas.'],
        ['h3', '3. Ana María Torres'],
        ['p', 'Ana María Torres es conocida por su enfoque innovador en la moda circular. Su marca, "Ciclo", se centra en la reutilización de prendas. Cada pieza está diseñada para ser desmantelada y reciclada al final de su vida útil, cerrando así el ciclo de producción y consumo.'],
        ['h2', 'La Conexión entre Talento y Sostenibilidad'],
        ['p', 'Los diseñadores emergentes están utilizando su talento no solo para crear moda, sino también para contar historias. Cada prenda lleva consigo un mensaje sobre la importancia de cuidar nuestro planeta. Esta conexión entre el talento y la sostenibilidad es lo que hace que la moda ecológica sea tan poderosa.'],
        ['h3', 'La Importancia de la Narrativa'],
        ['p', 'La narrativa detrás de cada colección es fundamental. Los consumidores de hoy buscan más que solo una prenda; quieren saber de dónde viene, cómo se hizo y qué impacto tiene en el medio ambiente. Los diseñadores emergentes están aprovechando esta tendencia, creando colecciones que cuentan historias significativas.'],
        ['h2', 'Desafíos en el Camino hacia la Sostenibilidad'],
        ['p', 'A pesar del creciente interés en la moda ecológica, los diseñadores emergentes enfrentan varios desafíos. Uno de los principales obstáculos es el costo de los materiales sostenibles. A menudo, estos materiales son más caros que sus contrapartes convencionales, lo que puede dificultar la producción a gran escala.'],
        ['h3', 'La Necesidad de Apoyo'],
        ['p', 'Para superar estos desafíos, es crucial que los diseñadores emergentes reciban apoyo. Esto puede venir en forma de subvenciones, asociaciones con marcas establecidas o incluso crowdfunding. La comunidad juega un papel vital en el éxito de estos diseñadores, y el apoyo local puede marcar la diferencia.'],
        ['h2', 'El Futuro de la Moda Ecológica'],
        ['p', 'A medida que más diseñadores emergentes se unen al movimiento de la moda ecológica, el futuro parece prometedor. La innovación y la creatividad están en el corazón de este cambio, y los consumidores están cada vez más dispuestos a apoyar marcas que priorizan la sostenibilidad.'],
        ['h3', 'Tendencias a Observar'],
        ['ol', [
          'Materiales Innovadores|: La investigación en nuevos materiales sostenibles, como tejidos hechos de algas o plásticos reciclados, está en aumento.',
          'Producción Local|: La tendencia hacia la producción local está ganando impulso, lo que reduce la huella de carbono asociada con el transporte.',
          'Moda Inclusiva|: La moda ecológica también está comenzando a incluir una mayor diversidad en sus representaciones, asegurando que todos se sientan representados.'
        ]],
        ['h2', 'Cómo los Consumidores Pueden Contribuir'],
        ['p', 'Los consumidores también tienen un papel importante en la promoción de la moda ecológica. Aquí hay algunas formas en que pueden contribuir:'],
        ['ul', [
          'Investigar Marcas|: Antes de comprar, investigar sobre las prácticas de sostenibilidad de las marcas.',
          'Apoyar a Diseñadores Locales|: Comprar de diseñadores emergentes y marcas locales que priorizan la sostenibilidad.',
          'Optar por la Calidad sobre la Cantidad|: Elegir prendas de alta calidad que duren más tiempo en lugar de seguir las tendencias rápidas.'
        ]],
        ['h2', 'Conclusión'],
        ['p', 'La conexión entre talento y sostenibilidad en la moda ecológica es más fuerte que nunca. Los diseñadores emergentes están liderando el camino, creando piezas que no solo son hermosas, sino que también cuentan historias sobre el cuidado del planeta. A medida que este movimiento continúa creciendo, es esencial que tanto los diseñadores como los consumidores trabajen juntos para construir un futuro más sostenible en la moda.'],
        ['p', 'La próxima vez que pienses en tu guardarropa, considera cómo puedes apoyar a estos talentosos diseñadores y hacer una elección consciente. La moda puede ser una forma de expresión, pero también puede ser una herramienta poderosa para el cambio.']
      ]
    }
  ];

  /* ---------- iconos ---------- */
  var ICO = {
    eye: '<svg viewBox="0 0 20 20" width="19" height="19" aria-hidden="true"><path d="M1.2 10S4.3 4.6 10 4.6 18.8 10 18.8 10 15.7 15.4 10 15.4 1.2 10 1.2 10z" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/><circle cx="10" cy="10" r="2.9" fill="none" stroke="currentColor" stroke-width="1.1"/></svg>',
    chat: '<svg viewBox="0 0 20 20" width="17" height="17" aria-hidden="true"><path d="M2.5 3.5h15v10h-8l-4 3.5v-3.5h-3z" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/></svg>',
    heart: '<svg viewBox="0 0 20 20" width="19" height="19" aria-hidden="true"><path class="hp" d="M10 17.1S2.6 12.6 2.6 7.4A3.9 3.9 0 0 1 10 5.6a3.9 3.9 0 0 1 7.4 1.8c0 5.2-7.4 9.7-7.4 9.7z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>',
    dots: '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><circle cx="8" cy="3" r="1.15" fill="currentColor"/><circle cx="8" cy="8" r="1.15" fill="currentColor"/><circle cx="8" cy="13" r="1.15" fill="currentColor"/></svg>',
    user: '<svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="#a9a9a9"/><circle cx="16" cy="12.6" r="5.2" fill="#e9e9e9"/><path d="M5.6 27c1.4-4.8 5.4-7.4 10.4-7.4S25 22.2 26.4 27a15.9 15.9 0 0 1-20.8 0z" fill="#e9e9e9"/></svg>'
  };

  /* ---------- guardado local: vistas y "me gusta" ---------- */
  var KEY = 'reeva-blog';
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} }
  var data = load();
  function st(slug) { return (data[slug] = data[slug] || { extra: 0, liked: false }); }
  function views(p) { return p.vistas + st(p.slug).extra; }
  function likes(p) { return (st(p.slug).liked ? 1 : 0); }
  function countView(p) {
    var k = 'reeva-seen-' + p.slug;
    try { if (sessionStorage.getItem(k)) return; sessionStorage.setItem(k, '1'); } catch (e) {}
    st(p.slug).extra += 1;
    save(data);
  }

  /* ---------- utilidades ---------- */
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function find(slug) {
    for (var i = 0; i < POSTS.length; i++) if (POSTS[i].slug === slug) return POSTS[i];
    return null;
  }
  function resumen(p) { return p.intro; }
  function permalink(p) { return location.href.split('#')[0] + '#blog/' + p.slug; }
  function toast(m) { if (window.REEVA && window.REEVA.toast) window.REEVA.toast(m); }

  function metaRow(p, kebab) {
    return '<div class="bl-meta">' +
      '<span class="bl-ava">' + ICO.user + '</span>' +
      '<span class="bl-who"><span class="bl-name">' + AUTOR + '</span>' +
      '<span class="bl-when">' + FECHA + '<i>·</i>' + LECTURA + '</span></span>' +
      (kebab ? '<span class="bl-more"><button type="button" class="bl-dots" aria-label="Más acciones" aria-expanded="false">' + ICO.dots + '</button>' +
        '<ul class="bl-menu" hidden><li><button type="button" data-act="copy">Copiar enlace</button></li></ul></span>' : '<span class="bl-more"><span class="bl-dots" aria-hidden="true">' + ICO.dots + '</span></span>') +
      '</div>';
  }

  function foot(p) {
    var l = likes(p);
    return '<div class="bl-foot">' +
      '<span class="bl-stat" title="Visualizaciones">' + ICO.eye + '<b>' + views(p) + '</b></span>' +
      '<span class="bl-stat" title="Comentarios">' + ICO.chat + '<b>0</b></span>' +
      '<button type="button" class="bl-like' + (st(p.slug).liked ? ' on' : '') + '" data-like="' + p.slug + '" aria-pressed="' + (st(p.slug).liked ? 'true' : 'false') + '" aria-label="Me gusta">' + ICO.heart + (l ? '<b>' + l + '</b>' : '') + '</button>' +
      '</div>';
  }

  /* ---------- tarjeta de la lista ---------- */
  function card(p, mini) {
    var href = '#blog/' + p.slug;
    var h = '<article class="bl-card' + (mini ? ' mini' : '') + '" data-href="' + href + '">' +
      '<a class="bl-thumb" href="' + href + '" tabindex="-1" aria-hidden="true"><img src="' + p.imagen + '" alt="" loading="lazy"></a>' +
      '<div class="bl-card-in">';
    if (!mini) h += metaRow(p, false);
    h += '<h2 class="bl-ct"><a href="' + href + '">' + esc(p.titulo) + '</a></h2>';
    if (!mini) h += '<p class="bl-ex">' + esc(resumen(p)) + '</p>';
    h += foot(p) + '</div></article>';
    return h;
  }

  /* ---------- LISTA ---------- */
  function renderList() {
    var h = '<div class="bl-wrap bl-in">' +
      '<a class="bl-all on" href="#blog">All Posts</a>' +
      '<div class="bl-grid">';
    POSTS.forEach(function (p) { h += card(p, false); });
    h += '</div></div>';
    root.innerHTML = h;
  }

  /* ---------- ENTRADA ---------- */
  function bodyHtml(p) {
    var h = '<p>' + esc(p.intro) + '</p>' +
      '<figure class="bl-fig"><img src="' + p.imagen + '" alt="' + esc(p.pie) + '"><figcaption>' + esc(p.pie) + '</figcaption></figure>';
    p.cuerpo.forEach(function (b) {
      var t = b[0], v = b[1];
      if (t === 'ol' || t === 'ul') {
        h += '<' + t + '>';
        v.forEach(function (it) {
          var i = it.indexOf('|');
          h += '<li><strong>' + esc(it.slice(0, i)) + '</strong>' + esc(it.slice(i + 1)) + '</li>';
        });
        h += '</' + t + '>';
      } else {
        h += '<' + t + '>' + esc(v) + '</' + t + '>';
      }
    });
    return h;
  }

  function renderPost(p) {
    var others = POSTS.filter(function (x) { return x !== p; });
    var h = '<div class="bl-wrap bl-in">' +
      '<a class="bl-all" href="#blog">All Posts</a>' +
      '<article class="bl-post">' +
        metaRow(p, true) +
        '<h1 class="bl-title">' + esc(p.titulo) + '</h1>' +
        '<div class="bl-body">' + bodyHtml(p) + '</div>' +
        '<div class="bl-share" role="group" aria-label="Compartir">' +
          '<a href="#" data-share="fb" aria-label="Compartir en Facebook"><i class="fa-brands fa-facebook-f"></i></a>' +
          '<a href="#" data-share="x" aria-label="Compartir en X"><i class="fa-brands fa-x-twitter"></i></a>' +
          '<a href="#" data-share="in" aria-label="Compartir en LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>' +
          '<a href="#" data-share="link" aria-label="Copiar enlace"><i class="fa-solid fa-link"></i></a>' +
        '</div>' +
        '<div class="bl-stats"><span id="blViews">' + views(p) + ' visualizaciones</span><span>0 comentarios</span>' +
          '<button type="button" class="bl-like' + (st(p.slug).liked ? ' on' : '') + '" data-like="' + p.slug + '" aria-pressed="' + (st(p.slug).liked ? 'true' : 'false') + '" aria-label="Me gusta">' + ICO.heart + (likes(p) ? '<b>' + likes(p) + '</b>' : '') + '</button>' +
        '</div>' +
      '</article>' +
      '<section class="bl-recent"><div class="bl-rh"><h2>Entradas recientes</h2><a href="#blog">Ver todo</a></div>' +
        '<div class="bl-rgrid">' + others.map(function (o) { return card(o, true); }).join('') + '</div></section>' +
      '<section class="bl-comments"><h2>Comentarios</h2><div class="bl-write"><button type="button" id="blWrite">Escribir un comentario...</button></div></section>' +
      '</div>';
    root.innerHTML = h;
  }

  /* ---------- rutas ---------- */
  function onRoute(page, arg) {
    if (page !== 'blog') return;
    var slug = '';
    try { slug = decodeURIComponent(arg || ''); } catch (e) { slug = arg || ''; }
    var p = slug ? find(slug) : null;
    if (p) { countView(p); renderPost(p); } else renderList();
    /* en una entrada, "Blog" no queda subrayado (igual que en Wix) */
    document.querySelectorAll('.menu a[data-p="blog"]').forEach(function (a) { a.classList.toggle('active', !p); });
  }
  document.addEventListener('reeva:route', function (e) { onRoute(e.detail.page, e.detail.arg); });
  var first = (location.hash || '').slice(1).split('/');
  if (first[0] === 'blog') onRoute('blog', first.slice(1).join('/'));

  /* ---------- clics (lista, entrada, me gusta, compartir, menú) ---------- */
  function copy(p) {
    var url = permalink(p);
    function ok() { toast('Enlace copiado.'); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(ok, ok);
    else { var t = document.createElement('textarea'); t.value = url; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch (er) {} t.remove(); ok(); }
  }
  function current() {
    var s = (location.hash || '').slice(1).split('/');
    if (s[0] !== 'blog' || !s[1]) return null;
    try { return find(decodeURIComponent(s.slice(1).join('/'))); } catch (e) { return null; }
  }

  root.addEventListener('click', function (e) {
    var t = e.target;

    var like = t.closest('.bl-like');
    if (like) {
      e.stopPropagation();
      var s = st(like.dataset.like); s.liked = !s.liked; save(data);
      var p0 = find(like.dataset.like);
      document.querySelectorAll('.bl-like[data-like="' + p0.slug + '"]').forEach(function (b) {
        b.classList.toggle('on', s.liked);
        b.setAttribute('aria-pressed', s.liked ? 'true' : 'false');
        var n = b.querySelector('b'); if (n) n.remove();
        if (s.liked) { var nb = document.createElement('b'); nb.textContent = '1'; b.appendChild(nb); }
      });
      return;
    }

    var dots = t.closest('button.bl-dots');
    if (dots) {
      e.stopPropagation();
      var m = dots.parentNode.querySelector('.bl-menu');
      var open = m.hidden;
      m.hidden = !open;
      dots.setAttribute('aria-expanded', open ? 'true' : 'false');
      return;
    }
    var act = t.closest('[data-act="copy"]');
    if (act) { var pc = current(); if (pc) copy(pc); var mm = act.closest('.bl-menu'); if (mm) mm.hidden = true; return; }

    var sh = t.closest('[data-share]');
    if (sh) {
      e.preventDefault();
      var p = current(); if (!p) return;
      var u = encodeURIComponent(permalink(p)), tt = encodeURIComponent(p.titulo), k = sh.dataset.share;
      if (k === 'link') { copy(p); return; }
      var url = k === 'fb' ? 'https://www.facebook.com/sharer/sharer.php?u=' + u
        : k === 'x' ? 'https://twitter.com/intent/tweet?url=' + u + '&text=' + tt
        : 'https://www.linkedin.com/sharing/share-offsite/?url=' + u;
      window.open(url, '_blank', 'noopener,noreferrer,width=640,height=560');
      return;
    }

    if (t.closest('#blWrite')) {
      /* en Wix hay que iniciar sesión para comentar */
      var lg = document.querySelector('.login'); if (lg) lg.click();
      return;
    }

    /* toda la tarjeta es clicable */
    var c = t.closest('.bl-card');
    if (c && !t.closest('a')) { location.hash = c.dataset.href; }
  });

  /* cerrar el menú de los tres puntos al hacer clic fuera */
  document.addEventListener('click', function (e) {
    if (e.target.closest('.bl-more')) return;
    root.querySelectorAll('.bl-menu').forEach(function (m) { m.hidden = true; });
    root.querySelectorAll('button.bl-dots').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
  });
})();
