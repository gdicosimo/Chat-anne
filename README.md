# Chat-anne

## Descripción

Chat-anne ofrece una forma intuitiva y conveniente de explorar y comprender el contenido de un PDF, facilitando la extracción de información relevante y la interacción con el documento de una manera conversacional. Con la capacidad de procesar y analizar documentos PDF, Chat-anne amplía las posibilidades de uso de los chatbots más allá de la simple conversación, brindando una herramienta poderosa para la búsqueda de información y el análisis de documentos

## Estructura del proyecto

~~~
project/
├── backend/
│   ├── src/ # Flask + LangChain + MongoDB + ChromaDB
│   └── requirements.txt/ # Dependencias de Flask y LangChain
├── frontend/
│   ├── src/ # Vite + Tailwind CSS + React
│   └── package.json # Dependencias de Vite
├── nginx/
│   └── nginx.conf # Configuración del proxy
├── compose.yml # Configuración de la aplicación en producción
└── compose-dev.yml # Configuración de la aplicación en desarrollo
~~~

## Requisitos

Previo a utilizar la aplicación, se requerirá una API key de Gemini para utilizar el modelo ya entrenado por Google. Se puede obtener fácilmente a través de Google AI Studio, utilizando el siguiente enlace:
> https://aistudio.google.com/app/u/0/apikey

- Docker: [Instalación de Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Instalación de Docker Compose](https://docs.docker.com/compose/install/)

## Configuración

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/gdicosimo/Chat-anne
   ```

2. Cambia al directorio del repositorio:

   ```bash
   cd Chat-anne
   ```

## Instalación de Dependencias del Proyecto

setup.sh automatiza el proceso de instalación de las dependencias del proyecto tanto para el backend como para el frontend. Segui estos pasos para utilizar el script:

Ejecuta el script `setup.sh` proporcionado en el directorio raíz del proyecto.

```bash
./setup.sh
```

Este script realizará las siguientes tareas:

- Instalará las dependencias del backend utilizando un entorno virtual de Python en el directorio `backend`.
- Instalará las dependencias del frontend utilizando npm en el directorio `frontend`.

## Uso

### Desarrollo

Para ejecutar la aplicación en modo de desarrollo, sigue estos pasos:

1. Ejecuta el siguiente comando para construir y levantar los contenedores de Docker:

   ```bash
   docker compose -f compose-dev.yml up --build
   ```

   > No es necesario realizar un --build cada vez que se desea iniciar el proyecto en desarrollo. Este proceso se lleva a cabo solo una vez o cuando se modifica el archivo compose-dev.yml


2. Una vez que todos los contenedores estén levantados, podrás acceder a la aplicación en tu navegador web:

   - Backend (Flask): [http://localhost:5000](http://localhost:5000)
   - Frontend (React): [http://localhost:4200](http://localhost:4200)

3. Realiza los cambios necesarios en el código fuente. Los cambios realizados en el código se reflejarán automáticamente en la aplicación sin necesidad de reiniciar los contenedores.

4. Cuando hayas terminado de trabajar, puedes detener los contenedores presionando `Ctrl + C` en la terminal donde se están ejecutando, y luego ejecutar el siguiente comando para detenerlos y eliminarlos:

   ```bash
   docker compose -f compose-dev.yml up down
   ```

### Produccion

Para desplegar la aplicación en un entorno de producción, puedes utilizar los mismos comandos de Docker Compose.


1. Ejecuta el siguiente comando para construir y levantar los contenedores en el entorno de producción:q

   ```bash
   docker compose -f compose.yml up --build
   ```

2. Accede a la aplicación utilizando la URL correspondiente
   - Chat-anne : [http://localhost/](http://localhost/)

3. Cuando hayas terminado de trabajar, puedes detener los contenedores presionando `Ctrl + C` en la terminal donde se están ejecutando, y luego ejecutar el siguiente comando para detenerlos y eliminarlos:

   ```bash
   docker compose -f compose.yml up down
   ```
