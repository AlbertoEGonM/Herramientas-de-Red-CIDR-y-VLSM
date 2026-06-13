# Herramientas de Red: Calculadora CIDR y VLSM 

Este proyecto es una aplicación web estática, minimalista y funcional que contiene dos calculadoras esenciales para el diseño y administración de redes de computadoras: una calculadora de enrutamiento entre dominios sin clases (CIDR) y una calculadora de máscaras de subred de longitud variable (VLSM).

---

##  Características

### 1. Calculadora CIDR
Permite calcular los parámetros de una subred a partir de una dirección IP y su prefijo de red.
* **Entradas:** Dirección IP (ej. `192.168.1.10`) y Prefijo de Red (ej. `24`).
* **Salidas:** Máscara de red, Dirección de red, Primer host útil, Último host útil, Dirección de Broadcast y el número total de hosts utilizables.

### 2. Calculadora VLSM
Automatiza la división de una red principal en múltiples subredes de diferentes tamaños, optimizando el espacio de direcciones IP y evitando el desperdicio.
* **Entradas:** Dirección de la red principal, Prefijo principal y una lista de los hosts requeridos por cada subred separados por comas (ej. `50, 20, 10`).
* **Salidas:** Una tabla detallada que ordena los requerimientos de mayor a menor y muestra para cada subred: la IP de red, prefijo, máscara, rango de direcciones útiles, dirección de broadcast y cantidad de hosts disponibles vs. requeridos.

---

## Tecnologías Utilizadas

Este proyecto fue desarrollado utilizando tecnologías web estándar, sin dependencias externas ni frameworks, garantizando una ejecución rápida y compatibilidad universal.

* **HTML5:** Estructura semántica de las calculadoras.
* **CSS3:** Diseño responsivo, limpio y minimalista basado en variables para fácil personalización.
* **JavaScript (Vanilla JS):** Lógica matemática a nivel de bits para la conversión de IPs, cálculos lógicos (AND, OR) y ordenamiento de arrays.

---


## Explicación Técnica Breve

Para realizar los cálculos de manera precisa, el código en JavaScript transforma las direcciones IP de su formato legible (4 octetos separados por puntos) a un número entero de 32 bits usando operaciones de desplazamiento de bits (Bitwise shifts). 

* La **Dirección de Red** se obtiene aplicando una compuerta lógica `AND` entre la IP y la Máscara.
* La **Dirección de Broadcast** se obtiene aplicando una compuerta lógica `OR` entre la red y la máscara invertida.
* Para **VLSM**, el algoritmo ordena dinámicamente las subredes de mayor a menor requerimiento y calcula el logaritmo base 2 para encontrar el tamaño exacto del bloque de bits necesario.

---

## Equipo de Desarrollo
Gonzalez Martinez Alberto Ezequiel
