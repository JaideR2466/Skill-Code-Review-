/**
 * ==========================================================================
 * Data Layer: Snippets & Auditoría Dataset
 * Repositorio de ejemplos de código, diagnósticos y refactorizaciones
 * ==========================================================================
 */

const CODE_SNIPPETS = {
  python: {
    id: 'python',
    name: 'Python 3',
    label: '🐍 Python (usuario.py)',
    langTag: 'Lenguaje: Python 3',
    filename: 'usuario.py',
    code: `def obtener_datos(usuario):
    datos = []
    for u in usuario:
        datos.append({"id": u["id"], "nombre": u["nombre"]})
    return datos`,
    score: '98 / 100',
    status: 'OPTIMIZADO',
    statusColor: 'emerald',
    summary: 'El fragmento original resuelve la obtención de datos pero infringe convenciones PEP8 de nomenclatura plural para colecciones, carece de anotaciones de tipo (Type Hints) y recurre a un bucle for imperativo con append() en lugar de una comprensión de lista idiomática.',
    metrics: {
      time: '0.34s',
      tokens: 320,
      complexity: 'O(N) -> Bytecode Optimizado'
    },
    smells: [
      {
        type: 'red',
        badge: 'NOMBRE AMBIGUO',
        text: 'Variable <code>usuario</code> en singular cuando en realidad representa un conjunto iterable.'
      },
      {
        type: 'amber',
        badge: 'FALTA DE TIPADO',
        text: 'Ausencia de Type Hints formales para parámetros (<code>list[dict]</code>) y tipo de retorno.'
      },
      {
        type: 'blue',
        badge: 'ESTILO IMPERATIVO',
        text: 'Bucle <code>for ... append</code> evitable mediante list comprehension de una sola línea.'
      }
    ],
    refactoredHTML: `<span class="text-emerald-400"># usuario.py (Refactorizado con Clean Code & Type Hints)</span>
<span class="text-purple-400">def</span> <span class="text-blue-400">obtener_datos</span>(usuarios: <span class="text-yellow-300">list</span>[<span class="text-yellow-300">dict</span>]) -> <span class="text-yellow-300">list</span>[<span class="text-yellow-300">dict</span>]:
    <span class="text-gray-400">"""Obtiene y filtra los datos esenciales de una lista de usuarios.
    
    Aplica compresión de listas para optimizar la ejecución en O(N).
    """</span>
    <span class="text-purple-400">return</span> [
        {<span class="text-emerald-300">"id"</span>: u[<span class="text-emerald-300">"id"</span>], <span class="text-emerald-300">"nombre"</span>: u[<span class="text-emerald-300">"nombre"</span>]} 
        <span class="text-purple-400">for</span> u <span class="text-purple-400">in</span> usuarios
    ]`,
    practices: [
      {
        title: 'Esquemas Fuertemente Tipados (Pydantic / Dataclasses)',
        desc: 'Para respuestas de API en producción, reemplaza dicts genéricos con modelos de datos para validación estricta en tiempo de ejecución.'
      },
      {
        title: 'Pruebas Unitarias Exhaustivas',
        desc: 'Agrega tests unitarios con pytest cubriendo casos borde como listas vacías o diccionarios con claves ausentes (KeyError).'
      }
    ]
  },

  typescript: {
    id: 'typescript',
    name: 'TypeScript',
    label: '📘 TypeScript (Auth & SQL)',
    langTag: 'Lenguaje: TypeScript / Node.js',
    filename: 'UserController.ts',
    code: `// UserController.ts
export async function getUser(req: any, res: any) {
  const id = req.query.id;
  // Vulnerabilidad de inyección SQL directa
  const query = "SELECT * FROM users WHERE id = " + id;
  const user = await db.raw(query);
  res.json({ status: 200, user: user });
}`,
    score: '45 / 100',
    status: 'RIESGO ALTO',
    statusColor: 'red',
    summary: 'Detectada vulnerabilidad crítica de seguridad (SQL Injection OWASP A03:2021) debido a concatenación cruda de parámetros HTTP. Además, el tipado con any suprime los beneficios del compilador y el controlador acopla lógica de base de datos directamente.',
    metrics: {
      time: '0.48s',
      tokens: 412,
      complexity: 'Vulnerabilidad OWASP A03'
    },
    smells: [
      {
        type: 'red',
        badge: 'CRÍTICO - SQL INJECTION',
        text: 'Concatenación directa de <code>req.query.id</code> sin parametrizar ni saneamiento previo.'
      },
      {
        type: 'amber',
        badge: 'TIPADO DEGRADADO',
        text: 'Uso de <code>any</code> en controladores Express anulando la seguridad estática de TypeScript.'
      },
      {
        type: 'blue',
        badge: 'VIOLACIÓN SRP',
        text: 'Controlador HTTP ejecutando consultas SQL crudas en lugar de delegar a la capa de Repositorio.'
      }
    ],
    refactoredHTML: `<span class="text-emerald-400">// UserController.ts (Refactorizado con Parameterized Query & DTOs)</span>
<span class="text-purple-400">import</span> { Request, Response } <span class="text-purple-400">from</span> <span class="text-emerald-300">'express'</span>;
<span class="text-purple-400">import</span> { userRepository } <span class="text-purple-400">from</span> <span class="text-emerald-300">'../repositories/user.repository'</span>;

<span class="text-purple-400">export async function</span> <span class="text-blue-400">getUser</span>(req: Request, res: Response): Promise&lt;Response&gt; {
  <span class="text-purple-400">const</span> userId = Number(req.query.id);
  
  <span class="text-purple-400">if</span> (isNaN(userId)) {
    <span class="text-purple-400">return</span> res.status(400).json({ error: <span class="text-emerald-300">'ID de usuario inválido'</span> });
  }

  <span class="text-purple-400">const</span> user = <span class="text-purple-400">await</span> userRepository.findById(userId);
  <span class="text-purple-400">if</span> (!user) {
    <span class="text-purple-400">return</span> res.status(404).json({ error: <span class="text-emerald-300">'Usuario no encontrado'</span> });
  }

  <span class="text-purple-400">return</span> res.status(200).json({ data: user });
}`,
    practices: [
      {
        title: 'Capa de Acceso a Datos (Repository Pattern)',
        desc: 'Separa la lógica de consulta mediante repositorios reutilizables y desacoplados de la capa web.'
      },
      {
        title: 'Validación de Entradas con Zod / Joi',
        desc: 'Protege las rutas validando tipos numéricos y formatos antes de ingresar a la función controladora.'
      }
    ]
  },

  solid: {
    id: 'solid',
    name: 'Java / OOP',
    label: '🧱 Java / OOP (Violación SRP)',
    langTag: 'Lenguaje: Java 17+ / Spring',
    filename: 'OrderManager.java',
    code: `// OrderManager.java
public class OrderManager {
    public void processOrder(Order order) {
        if (order.getTotal() <= 0) throw new IllegalArgumentException();
        db.save(order);
        smtpClient.sendEmail(order.getCustomerEmail(), "Orden confirmada");
        printer.printTicket(order);
    }
}`,
    score: '58 / 100',
    status: 'VIOLACIÓN SOLID',
    statusColor: 'amber',
    summary: 'Violación severa del Principio de Responsabilidad Única (SRP) y del Principio de Inversión de Dependencias (DIP). OrderManager asume 4 responsabilidades ajenas: validación, persistencia en BD, mensajería SMTP e impresión por hardware.',
    metrics: {
      time: '0.41s',
      tokens: 388,
      complexity: 'Alto Acoplamiento Aferente'
    },
    smells: [
      {
        type: 'red',
        badge: 'VIOLACIÓN SOLID (SRP)',
        text: 'Clase monolítica con múltiples razones para cambiar (lógica, BD, email, hardware).'
      },
      {
        type: 'amber',
        badge: 'ACOPLAMIENTO RÍGIDO (DIP)',
        text: 'Dependencia de singletons o instancias concretas sin inyección de abstracciones.'
      },
      {
        type: 'blue',
        badge: 'IMPOSIBLE DE TESTEAR',
        text: 'No es posible hacer pruebas unitarias aisladas sin dependencias de red o periféricos.'
      }
    ],
    refactoredHTML: `<span class="text-emerald-400">// OrderService.java (Refactorizado con Inyección de Dependencias & Eventos)</span>
<span class="text-purple-400">public class</span> <span class="text-yellow-300">OrderService</span> {
    <span class="text-purple-400">private final</span> OrderValidator validator;
    <span class="text-purple-400">private final</span> OrderRepository repository;
    <span class="text-purple-400">private final</span> ApplicationEventPublisher eventPublisher;

    <span class="text-purple-400">public</span> <span class="text-blue-400">OrderService</span>(
        OrderValidator validator, 
        OrderRepository repository, 
        ApplicationEventPublisher eventPublisher
    ) {
        <span class="text-purple-400">this</span>.validator = validator;
        <span class="text-purple-400">this</span>.repository = repository;
        <span class="text-purple-400">this</span>.eventPublisher = eventPublisher;
    }

    <span class="text-purple-400">public void</span> <span class="text-blue-400">processOrder</span>(Order order) {
        validator.validate(order);
        repository.save(order);
        eventPublisher.publishEvent(<span class="text-purple-400">new</span> OrderCompletedEvent(order));
    }
}`,
    practices: [
      {
        title: 'Arquitectura Basada en Eventos (Observer)',
        desc: 'El envío de emails y la impresión de recibos se delegan a escuchadores de eventos independientes.'
      },
      {
        title: 'Inversión de Control (IoC)',
        desc: 'Favorece la inyección de dependencias por constructor para mockear componentes en pruebas unitarias.'
      }
    ]
  }
};

// Exposición global para compatibilidad directa sin CORS en file://
if (typeof window !== 'undefined') {
  window.CODE_SNIPPETS = CODE_SNIPPETS;
}
