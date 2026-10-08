# 🚀 Code Review & Clean Code - AI Skill

![Code Review & Clean Code Banner](https://img.shields.io/badge/AI%20Skill-Code%20Review%20%26%20Clean%20Code-06b6d4?style=for-the-badge&logo=openai&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active%20%26%20Production%20Ready-10b981?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-8b5cf6?style=for-the-badge)

---

## 📌 Descripción General

**Code Review & Clean Code** es una habilidad de inteligencia artificial (*AI Skill*) diseñada para actuar como un **Software Engineer Senior** y auditor de código automatizado. 

Su principal valor es analizar fragmentos de código, funciones o módulos completos en cualquier lenguaje de programación, detectando instantáneamente **malas prácticas**, **code smells**, **vulnerabilidades de seguridad** e **ineficiencias de rendimiento**, ofreciendo a su vez una versión refactorizada lista para producción.

---

## 🎯 Objetivo

Garantizar que todo código desarrollado mantenga los estándares más altos de **mantenibilidad, legibilidad, seguridad y eficiencia**, permitiendo a desarrolladores y equipos acelerar sus revisiones de código (*Code Reviews*) sin sacrificar la calidad arquitectónica del software.

---

## ✨ Funcionalidades Principales

* 🔍 **Análisis Estructural y Legibilidad:** Revisa convenciones de estilo (PEP8, TypeScript style guide, Clean Code guidelines), nombres descriptivos de variables/métodos y niveles de anidamiento.
* 🧩 **Verificación de Principios SOLID:** Evalúa si las clases o componentes cumplen con los principios de diseño orientado a objetos y modularidad.
* 🎨 **Sugerencia de Patrones de Diseño:** Identifica oportunidades para aplicar patrones como *Strategy*, *Factory*, *Observer*, *Adapter*, *Repository*, entre otros.
* 🛡️ **Auditoría de Seguridad (OWASP Top 10):** Detecta inyecciones SQL/Command, falta de saneamiento de inputs, exposición de secretos y manejo inseguro de excepciones.
* ⚡ **Optimización Algorítmica y Rendimiento:** Analiza complejidad temporal $O(n)$ y espacial $O(1)$, cuellos de botella en bucles y uso ineficiente de memoria.
* 🛠️ **Refactorización Completa:** Entrega el código corregido, tipado y comentado, preservando la lógica de negocio intacta.

---

## 🕒 ¿Cuándo utilizar la Skill?

1. **Antes de abrir un Pull Request (PR):** Para realizar un pre-audit personal y corregir observaciones antes de la revisión por pares.
2. **Durante sesiones de Refactorización:** Al trabajar con código legado (*legacy code*) desordenado o difícil de mantener.
3. **Al detectar problemas de rendimiento:** Cuando un módulo consume excesivos recursos de CPU o memoria.
4. **Como herramienta de aprendizaje:** Para desarrolladores Juniors/Intermedios que desean entender el porqué de una mala práctica y cómo solucionarla aplicando buenas prácticas.

---

## 📐 Principios SOLID Analizados

La skill evalúa cuantitativa y cualitativamente cada uno de los 5 principios SOLID:

1. **S - Single Responsibility Principle (SRP):** Garantiza que cada clase/función tenga una sola razón para cambiar.
2. **O - Open/Closed Principle (OCP):** Asegura que las entidades estén abiertas a la extensión pero cerradas a la modificación.
3. **L - Liskov Substitution Principle (LSP):** Verifica que las subclases puedan sustituir a sus clases base sin romper la aplicación.
4. **I - Interface Segregation Principle (ISP):** Evita interfaces infladas forzando contratos específicos y pequeños.
5. **D - Dependency Inversion Principle (DIP):** Promueve la inyección de dependencias y el desacoplamiento mediante abstracciones.

---

## 📋 Estructura de la Respuesta de la Skill

Cuando envías código a la skill, la respuesta sigue un formato estandarizado en 4 secciones:

```markdown
1. 📊 Resumen General:
   - Valoración global de calidad (0 a 100).
   - Diagnóstico inicial del fragmento enviado.

2. ⚠️ Puntos Críticos & Code Smells:
   - Explicación detallada de las fallas encontradas (Legibilidad, SOLID, Seguridad, Rendimiento).

3. ✨ Propuesta de Mejora / Refactorización:
   - Código limpio corregido, con anotaciones de tipo y comentarios explicativos.

4. 💡 Buenas Prácticas Adicionales:
   - Recomendaciones de arquitectura o testing para llevar el módulo al siguiente nivel.
```

---

## 💻 Ejemplo de Uso

### Código Original (Antes)

```python
# usuario.py
def obtener_datos(usuario):
    datos = []
    for u in usuario:
        datos.append({"id": u["id"], "nombre": u["nombre"]})
    return datos
```

### Respuesta Refactorizada por la Skill (Después)

```python
# usuario.py
def obtener_datos(usuarios: list[dict]) -> list[dict]:
    """Obtiene y filtra los datos esenciales de una lista de usuarios.
    
    Aplica compresión de listas para optimizar la ejecución O(N).
    """
    return [
        {"id": u["id"], "nombre": u["nombre"]} 
        for u in usuarios
    ]
```

---

## 🏗️ Arquitectura del Proyecto por Capas

El proyecto sigue una arquitectura frontend limpia, desacoplada y orientada a capas:

```text
Skillanalicode/
├── index.html                     # Punto de entrada / Capa de Presentación HTML
├── README.md                      # Documentación técnica completa
├── skill_code_review.md           # Especificación y prompt formal del AI Skill
└── src/                           # Código fuente estructurado por responsabilidades
    ├── assets/                    # Recursos multimedia y estáticos
    │   ├── images/
    │   │   └── Infografia.png     # Infografía oficial de alta resolución
    │   └── videos/
    │       └── Video.mp4          # Video demostrativo de escaneo y refactor
    ├── css/                       # Capa de Estilos y Diseño Visual
    │   └── styles.css             # Tokens CSS, glassmorphism, glows y animaciones
    └── js/                        # Capa de Lógica e Interactividad Frontend
        ├── snippets.js            # Capa de Datos (Modelos de código y diagnósticos)
        ├── simulator.js           # Capa de Servicio (Motor de auditoría en 4 fases)
        └── app.js                 # Capa de Controlador (Eventos DOM, Lightbox y UI)
```

---

## 🛠️ Tecnologías Utilizadas en la Landing Page

La landing page de presentación ha sido construida con tecnologías modernas de desarrollo web:

* **HTML5 Semantic:** Estructura limpia y accesible.
* **Tailwind CSS (v3 CDN):** Framework de utilidades para estilizado responsive y diseño de vanguardia.
* **CSS3 Modular (`src/css/styles.css`):** Tokens de diseño, efectos Glassmorphism, resplandores ambientales y keyframes.
* **JavaScript ES6+ Modular (`src/js/`):** Separación de datos, servicio y controlador UI.
* **Lucide Icons:** Iconografía vectorial moderna para desarrolladores.
* **Google Fonts (Inter & JetBrains Mono):** Tipografía optimizada para lectura de texto y bloques de código.

---

## ⚙️ Instrucciones para Ejecutar el Proyecto

No se requieren dependencias complejas ni procesos de compilación.

### Opción 1: Abrir directamente en el navegador
1. Clona o descarga este repositorio.
2. Haz doble clic en el archivo `index.html` o ábrelo desde tu navegador web preferido (Chrome, Edge, Firefox, Safari).

### Opción 2: Ejecutar un servidor local simple
Si deseas servir el proyecto a través de HTTP:

**Con Python:**
```bash
python -m http.server 3000
```
Luego abre `http://localhost:3000` en tu navegador.

**Con Node.js (npx serve):**
```bash
npx serve .
```

---

## 👨‍💻 Autor
* **Autores:** Samul Villa & Jaider Gallego
* **Skill Developer & Architect:** AI Code Review Specialist
* **Proyecto:** Code Review & Clean Code AI Skill
* **Contacto / Feedback:** [Soporte & Sugerencias]

---

# Como ejecutar: 


´python -m http.server 3000´


*“No se trata solo de que el código funcione, sino de que sea un buen código.”* 💡
