# Chat-anne

## Descripción

Este repositorio contiene una aplicación web desarrollada con [React](https://reactjs.org/) en el frontend y [Flask](https://flask.palletsprojects.com/) en el backend, desplegada utilizando [Docker Compose](https://docs.docker.com/compose/).

## Estructura del proyecto

~~~
project/
├── backend/
│   ├── app.py #flask
│   └── requirements.txt #Dependencias de la API
├── frontend/
│   ├── src/ #vite + tailwindcss
│   └── package.json #Dependencias de vite
├── nginx/
│   └── nginx.conf #Configuracion del proxy
├── compose.yml #Configuracion de la aplicacion en produccion
├── compose-dev.yml #Configuracion de la aplicacion en desarrollo
/
~~~

## Requisitos

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

setup.sh automatiza el proceso de instalación de las dependencias del proyecto tanto para el backend como para el frontend. Sigue estos pasos para utilizar el script:

Ejecuta el script `setup.sh` proporcionado en el directorio raíz del proyecto.

```bash
./setup.sh
```

Este script realizará las siguientes tareas:

- Creará un entorno virtual para el backend si no existe.
- Instalará las dependencias del backend desde el archivo `requirements.txt`.
- Instalará las dependencias del frontend utilizando npm en el directorio `frontend`.

## Uso

### Desarrollo

Para ejecutar la aplicación en modo de desarrollo, sigue estos pasos:

1. Ejecuta el siguiente comando para construir y levantar los contenedores de Docker:

   ```bash
   docker-compose -f compose-dev.yml up --build
   ```

2. Una vez que todos los contenedores estén levantados, podrás acceder a la aplicación en tu navegador web:

   - Frontend (React): [http://localhost:3000](http://localhost:4200)
   - Backend (Flask): [http://localhost:5000](http://localhost:5000)

3. Realiza los cambios necesarios en el código fuente. Los cambios realizados en el código se reflejarán automáticamente en la aplicación sin necesidad de reiniciar los contenedores.

4. Cuando hayas terminado de trabajar, puedes detener los contenedores presionando `Ctrl + C` en la terminal donde se están ejecutando, y luego ejecutar el siguiente comando para detenerlos y eliminarlos:

   ```bash
   docker-compose down
   ```

### Produccion

Para desplegar la aplicación en un entorno de producción, puedes utilizar los mismos comandos de Docker Compose.


1. Ejecuta el siguiente comando para construir y levantar los contenedores en el entorno de producción:q

   ```bash
   docker-compose -f compose.yml up --build
   ```

2. Accede a la aplicación utilizando la URL correspondiente
   - Chat-anne : [http://localhost/](http://localhost/)

3. Cuando hayas terminado de trabajar, puedes detener los contenedores presionando `Ctrl + C` en la terminal donde se están ejecutando, y luego ejecutar el siguiente comando para detenerlos y eliminarlos:

   ```bash
   docker-compose down
   ```
