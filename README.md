# Chat-anne

## Descripción

Chat-anne ofrece una forma intuitiva y conveniente de explorar y comprender el contenido de un PDF, facilitando la extracción de información relevante y la interacción con el documento de una manera conversacional. Con la capacidad de procesar y analizar documentos PDF, Chat-anne amplía las posibilidades de uso de los chatbots más allá de la simple conversación, brindando una herramienta poderosa para la búsqueda de información y el análisis de documentos.

## Estructura del proyecto

La estructura general de las dependencias, bibliotecas y herramientas del proyecto es la siguiente:

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

Por otra parte, para poder correr la aplicacion de manera local, se requerirán ciertas dependencias y bibliotecas tanto para el frontend como para el backend. Estas últimas están principalmente relacionadas a Vite, Tailwind y React para el frontend y a Flask, Langchain, MongoDB y ChromaDB para el backend.

Así que, para simplificar el trabajo de la instalación de las mismas, se desarrolló un script "setup.sh" que hace este trabajo (en el apartado de `Instalación de Dependencias del Proyecto` se amplía más al respecto). 

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

Para la instalación automática de las dependencias del proyecto, primero que nada deberá ejecutarse el script `setup.sh`, proporcionado en el directorio raíz del proyecto:

```bash
./setup.sh
```

Este script abrirá una nueva terminal de CMD y realizará las siguientes tareas:

- Consultará si se desean instalar las dependencias del frontend y del backend de manera local (recomendado ya que por el momento no se cuenta con ningún servidor externo para el alojamiento de la aplicación). Esto puede rechazarse, mientras que si se elige hacerlo:
  - Instalará las dependencias del backend utilizando un entorno virtual de Python ("venv") en el directorio `backend` .
  - Instalará las dependencias del frontend utilizando npm en el directorio `frontend` .
- Seguidamente, solicitará la API key de Gemini obtenida según los pasos descriptos en el apartado de `Requisitos` . Esta última deberá copiarse y pegarse, y a continuación el script creará un archivo .env en el subdirectorio de backend\src\rag\model. De este modo, la aplicación podrá comunicarse con el modelo provisto por Gemini.
- Por último, consultará si se quiere o no correr la aplicación. Si se elige que sí, dará la posibilidad de hacerlo en modo de desarrollo o producción (preferentemente elegir el de producción). Entonces, dependiendo el caso ejecutará automáticamente el comando de `docker compose -f compose.yml up --build`  o `docker compose -f compose-dev.yml up --build`, que automáticamente creará los contenedores de Docker, y también los levantará, comenzando a correr así tanto el frontend como el backend. Cuando esto último ocurra, se informará al respecto sobre la misma terminal abierta. No intentar acceder antes a la aplicación puesto que aún no estará ejecutándose completamente, por lo que será inaccesible mientras tanto.

Es importante aclarar que una vez que se desee dejar de ejecutar la aplicación, será necesario dar de baja los contenedores. Para ello, ejecutar el paso número 3 de la sección de `Desarrollo` o de `Producción` (según corresponda) en el apartado de `Uso` .

#### Nota: Tener en cuenta que si se está trabajando desde Windows, será necesario primero iniciar el demonio de Docker Engine para poder levantar los contenedores mientras este se ejecuta en segundo plano. Por el contrario, desde Linux esto no será necesario.

## Uso

Si bien el script anteriormente mencionado permite correr la aplicación directamente en modo de producción, también se creó un modo de desarrollo para trabajar sobre la misma.

A continuación se explica brevemente cómo se puede levantar la aplicación de ambas maneras sin necesidad de utilizar el script (tener en cuenta que de todos modos al menos una vez será necesario correrlo dado que los siguientes comandos no incluyen la instalación de dependencias, bibliotecas ni creación del archivo asociado a la API key).

#### Nota: Tener en cuenta que si se está trabajando desde Windows, será necesario primero iniciar el demonio de Docker Engine para poder levantar los contenedores mientras este se ejecuta en segundo plano. Por el contrario, desde Linux esto no será necesario.


### $Modo$ $de$ $Desarrollo$

Para ejecutar la aplicación en modo de desarrollo, sigue estos pasos:

1. Ejecuta el siguiente comando para construir y levantar los contenedores de Docker en el entorno de desarrollo:

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

### $Modo$ $de$ $Producción$

Para desplegar la aplicación en un entorno de producción, puedes utilizar los mismos comandos de Docker Compose.


1. Ejecuta el siguiente comando para construir y levantar los contenedores de Docker en el entorno de producción:

   ```bash
   docker compose -f compose.yml up --build
   ```

2. En este caso ya no es necesario especificar el puerto, dado que Nginx actúa como un proxy inverso, haciendo que ahora el backend ya no sea accesible (corre en el puerto 8080 del contenedor pero no se mapea con ninguno del host, solo puede ser accedido por Nginx). Por otro lado, el frontend corre en el puerto 80 del host. De esta manera, puede accederse a la aplicación a través del siguiente link:
   - Chat-anne : [http://localhost/](http://localhost/)

3. Cuando hayas terminado de trabajar, puedes detener los contenedores presionando `Ctrl + C` en la terminal donde se están ejecutando, y luego ejecutar el siguiente comando para detenerlos y eliminarlos:

   ```bash
   docker compose -f compose.yml up down
   ```
