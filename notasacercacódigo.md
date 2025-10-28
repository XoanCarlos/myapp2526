se puede construir la tabla sin usar un <template> interno dentro del v-for, pero para agrupar varias filas (<tr>) por cada noticia (por ejemplo, una fila para el título y otra para el contenido), Vue requiere que el v-for esté aplicado a un único elemento padre.

Como <tr> no puede contener directamente otro <tr>, y en HTML una tabla sólo puede tener <tr> hijos directos de <tbody>, no puedes simplemente envolver varias filas en un div o cualquier otro elemento que no sea permitido en tablas.

Por eso, la solución más limpia y correcta es usar un solo <template v-for="noticia in noticias" :key="noticia.id"> que actúe como un fragmento invisible que agrupe las filas,

Dentro de ese <template>, escribir tantas filas <tr> como necesites para mostrar título, contenido, etc.

¿Por qué no usar otro método? No puedes usar un <div> para agrupar filas en una tabla (rompe el HTML válido).

Poner un v-for en cada fila por separado no agrupa las filas por noticia, lo que provoca que se liste primero todos los títulos y luego todos los contenidos, no el título con su contenido juntos.

Alternativa sin <template>

Si quieres evitar el <template>, otra opción es combinar el contenido en una sola fila con varias celdas:

<tr v-for="noticia in noticias" :key="noticia.id">
  <td>
    <strong>{{ noticia.titulo }}</strong><br />
    <small class="text-muted">{{ noticia.fecha }}</small>
  </td>
  <td>
    {{ isExpanded[noticia.id] ? noticia.contenido : noticia.contenido.slice(0, Math.floor(noticia.contenido.length / 2)) + '...' }}
    <a href="#" @click.prevent="toggleExpand(noticia.id)" class="text-decoration-none ms-2">
      {{ isExpanded[noticia.id] ? 'Mostrar menos' : 'Mostrar más' }}
    </a>
  </td>
</tr>


