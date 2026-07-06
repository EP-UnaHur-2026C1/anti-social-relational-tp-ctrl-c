# Feedback del Trabajo Práctico

## Integrantes

Integrantes identificados a partir de los commits del repositorio:

- **Nicolás Urdiales** (`NicolasUrdiales`)
- **Miguel Seco** (`Miguel-Seco`)
- **Bruno Tundis**

> Se observa trabajo repartido entre los tres integrantes. 👏

---

## Resumen General

¡Muy buen trabajo! 🎉 La entrega cubre el MVP de `ENUNCIADO.md` con una arquitectura en capas ordenada (controllers / db / middlewares / routes / schemas), migraciones, y un conjunto de funcionalidades amplio. De hecho, abordaron **tres bonus**: caché en memoria (`node-cache`), seguidores y upload de imágenes con `multer`. Es un alcance muy ambicioso.

Hay un punto central a resolver —la regla de los comentarios antiguos quedó **modelada pero no aplicada**— y un bug puntual en la actualización de posts. Son ajustes acotados, y la base sobre la que se apoyan está muy bien armada.

### Estado por criterio

| Criterio        | Estado | Comentario breve |
|-----------------|:------:|------------------|
| Arquitectura    |   ✅   | Capas claras + middlewares genéricos reutilizables. |
| Modelado        |   ✅   | Relaciones completas, `nickName` único, atributo virtual `es_visible`. |
| Validaciones    |   ✅   | Joi con mensajes propios, `stripUnknown` y `@joi/date`. |
| Middlewares     |   ✅   | `validaExiste(Modelo)`, `validaIdNumerico`, `validaFollow`. |
| API REST        |   ⚠️   | CRUD + relaciones; `updatePost` no actualiza (Obs. 2). |
| Configuración   |   ⚠️   | Puerto y motor por `.env`; la ventana de meses está fija (Obs. 1). |
| Documentación   |   ✅   | Swagger (`/api-docs`), colección de Postman y `test.http`. |

---

## Fortalezas

### 1. Atributo virtual `es_visible` bien calculado ⏳
**Ubicación:** `src/db/models/comment.js`

Modelaron la visibilidad como atributo **VIRTUAL**, calculando la diferencia de meses con aritmética correcta (años·12 + meses):

```js
es_visible: {
  type: DataTypes.VIRTUAL,
  get() {
    const diferenciaMeses = (fechaActual.getFullYear() - fechaComentario.getFullYear()) * 12
      + (fechaActual.getMonth() - fechaComentario.getMonth());
    return diferenciaMeses < 6;
  }
}
```

Es la herramienta correcta para el problema. Solo falta usarla para filtrar (ver Observación 1). 👌

### 2. Middlewares genéricos reutilizables ♻️
**Ubicación:** `src/middlewares/validaciones.middleware.js`

`validaExisteMiddleware(Modelo)` valida la existencia para **cualquier** modelo, `validaIdNumerico` chequea el formato del id, y `validaFollow(ModeloUser)` contempla incluso el caso de “seguirse a sí mismo”. Componerlos en las rutas deja todo declarativo y consistente.

### 3. Configuración portable de base de datos 🔌
**Ubicación:** `src/db/config/config.js`, `.env`

La config lee del entorno (`DB_DIALECT`, `DB_HOST`, etc.) y contempla sqlite para desarrollo y mysql para producción, cumpliendo el requisito de poder cambiar de motor. El puerto también es configurable.

### 4. Tres bonus abordados 🌟
**Ubicación:** `src/controllers/post.controller.js` (caché), `src/controllers/user.controller.js` (seguidores), `src/controllers/post_image.controller.js` (upload)

Implementaron caché con `node-cache` (con invalidación al crear/eliminar posts), la relación de seguidores (`addFollowing`/`removeFollowing`) y la subida de imágenes con `multer`. Es bastante más de lo pedido.

### 5. Endpoints de relaciones 🔗
**Ubicación:** `src/routes/post.route.js`, `src/routes/user.route.js`

Hay rutas para ver el usuario, los comentarios y los tags de un post, asociar un tag (`/:id/create-tag`), y seguir/dejar de seguir usuarios. Buena cobertura de la gestión de relaciones.

---

## Observaciones

### 1. La regla de los comentarios antiguos no se aplica (y el umbral está fijo)

**Estado:** ❌  **Severidad:** 🔴 Crítico
**Ubicación:** `src/controllers/post.controller.js` (`getPostById`, `getCommentsByPostId`), `src/db/models/comment.js`

**Descripción:**
El enunciado pide que los comentarios más antiguos que X meses **no se muestren** en la visualización de los posts. El atributo `es_visible` está muy bien calculado, pero **no se usa para filtrar en ningún lado**: `getPostById` incluye `comentarios` sin condición, y `getCommentsByPostId` devuelve todos los comentarios del post. Es decir, hoy un comentario viejo se sigue mostrando.

Además, el “6” está escrito de forma fija dentro del getter, cuando el enunciado pide que sea **configurable por variable de entorno**.

**Impacto:**
Es la regla de negocio central del trabajo, y actualmente no tiene efecto. Lo bueno es que están a un paso: ya tienen la herramienta (`es_visible`), solo falta usarla y leer el umbral del entorno.

**Recomendación:**
Filtrar los comentarios al traerlos. Como `es_visible` es virtual (no se puede usar en un `where`), pueden filtrar por fecha en la consulta o en memoria:

```js
const meses = Number(process.env.MESES ?? 6);
const limite = new Date();
limite.setMonth(limite.getMonth() - meses);
// include: [{ model: Comment, as: 'comentarios', where: { fecha: { [Op.gte]: limite } }, required: false }]
```

Y mover el `6` del getter a `process.env.MESES` para que el modelo y la consulta usen el mismo valor configurable.

---

### 2. `updatePost` no actualiza porque lee un parámetro inexistente

**Estado:** ⚠️  **Severidad:** 🟠 Importante
**Ubicación:** `src/controllers/post.controller.js` (`updatePost`), `src/routes/post.route.js`

**Descripción:**
La ruta es `PUT /posts/:id`, pero el controlador toma el id de `req.params.userId`, que no existe en esa ruta:

```js
const id = req.params.userId;   // undefined: la ruta define :id, no :userId
await Post.update({ texto, fecha }, { where: { id } });
```

**Impacto:**
Como `id` queda `undefined`, la actualización no afecta al post esperado (no actualiza, o falla). El endpoint de edición de posts no funciona.

**Recomendación:**
Tomar el parámetro correcto:

```js
const id = req.params.id;
```

---

### 3. Detalles menores (para una próxima pasada)

**Estado:** ⚠️  **Severidad:** 🟡 Mejora recomendada

- En `src/routes/user.route.js` la ruta `DELETE /:id` está **declarada dos veces** (líneas 34 y 35); la segunda es código muerto.
- La invalidación de caché se hace al crear y borrar posts, pero no en `updatePost` ni al asociar tags, así que tras una edición el caché puede quedar desactualizado.
- En el upload, la URL de la imagen se arma con `http://localhost:3000/...` fijo, pero el servidor corre en el puerto del `.env` (4002). Conviene construir la URL con el host/puerto reales (`req.protocol`/`req.get('host')`).

---

## Conclusión

Es una entrega con mucho trabajo y ambición: arquitectura clara, middlewares genéricos, configuración portable y nada menos que tres bonus. 🌟 Se nota que el equipo se animó a ir más allá del mínimo.

El foco principal es **conectar la regla de los comentarios** (ya tienen casi todo hecho) y corregir el parámetro de `updatePost`; con esos dos cambios el núcleo del TP queda redondo. ¡Felicitaciones por el esfuerzo y sigan así! 🚀
