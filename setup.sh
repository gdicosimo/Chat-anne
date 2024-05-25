#!/usr/bin/env bash

ROOT_DIR=$(pwd)


get_api_key() {
    local env_file="${ROOT_DIR}/backend/src/rag/model/.env"
    if [[ -f "$env_file" ]]; then
        local existing_api_key=$(grep -oP 'GOOGLE_API_KEY=\K.*' "$env_file")
        if [[ -n "$existing_api_key" ]]; then
            echo "Ya existe una API key."
            read -p "¿Quieres usar la API Key existente? (y/n): " use_existing
            if [[ "$use_existing" =~ ^[Yy]$ ]]; then
                echo "Usando la API Key existente."
                return
            fi
        fi
    fi

    read -p "Inserta la API Key de Google Gemini: " api_key

    if [[ -z "$api_key" ]]; then
        echo "No has ingresado ninguna API Key!"
        echo "No podrás ejecutar el backend sin una API Key válida."
        exit 1
    fi

    if [[ "$api_key" =~ [[:space:]] ]]; then
        echo "La API Key no puede contener espacios en blanco!"
        echo "No podrás ejecutar el backend sin una API Key válida."
        exit 1
    fi

    echo "GOOGLE_API_KEY=$api_key" > "$env_file"
    echo "Se ha creado el archivo .env con la API Key."
}

install_pip_dependencies() {
    local project_directory=$1
    if [ ! -d "$project_directory/venv" ]; then
        echo "Creando entorno virtual en $project_directory..."
        cd "$project_directory" || exit
        python3 -m venv venv || py -m venv venv

        source venv/bin/activate || . venv/Scripts/activate
        pip install --upgrade pip
        pip install -r requirements.txt || { echo "Fallo al instalar dependencias de Python para $project_directory"; exit 1; }

        deactivate || { echo "Fallo al desactivar el entorno virtual para $project_directory"; exit 1; }
        cd "$ROOT_DIR" || exit
        echo "Dependencias de Python instaladas para $project_directory."
    else
        echo "El entorno virtual ya existe en $project_directory."
    fi
}

install_node_dependencies() {
    local project_directory=$1
    if [ ! -d "$project_directory/node_modules" ]; then
        echo "Instalando dependencias para $project_directory..."
        cd "$project_directory" || exit
        npm install || { echo "Fallo al instalar dependencias de Node.js para $project_directory"; exit 1; }
        cd "$ROOT_DIR" || exit
        echo "Dependencias instaladas para $project_directory."
    else
        echo "Las dependencias ya existen en $project_directory."
    fi
}

show_spinner() {
    local pid=$1
    local delay=0.1
    local spinstr='|/-\'
    while ps -p $pid &> /dev/null; do
        local temp=${spinstr#?}
        printf " [%c]  " "$spinstr"
        spinstr=$temp${spinstr%"$temp"}
        sleep $delay
        printf "\b\b\b\b\b\b"
    done
    printf "    \b\b\b\b"
}

check_docker_engine() {
    if ! docker info &> /dev/null; then
        echo "Docker Engine no está corriendo. Intentando iniciarlo..."
        if command -v dockerd &> /dev/null; then
            nohup sudo dockerd &> /dev/null &
            sleep 5
            if ! docker info &> /dev/null; then
                echo "No se pudo iniciar Docker Engine. Por favor, inicia Docker manualmente y vuelve a intentar."
                exit 1
            else
                echo "Docker Engine iniciado exitosamente."
            fi
        else
            echo "dockerd no encontrado. Por favor, asegúrate de que Docker esté instalado correctamente."
            exit 1
        fi
    fi
}

open_docker_desktop() {
    echo "Opening Docker Desktop..."
    docker_desktop_path=$(powershell.exe -Command "(Get-Process 'Docker Desktop').Path")
    start "$docker_desktop_path"
}


run_docker() {
    local mode=$1
    if [ "$mode" == "dev" ]; then
        docker compose -f compose-dev.yml up --build -d &> /dev/null &
        show_spinner $!
        echo "El proyecto está corriendo en modo desarrollo. Backend (Flask): http://localhost:5000, Frontend (Vite): http://localhost:4200"
    elif [ "$mode" == "prod" ]; then
        docker compose -f compose.yml up --build -d &> /dev/null &
        show_spinner $!
        echo "El proyecto está corriendo en modo producción en http://localhost/"
    else
        echo "Modo no válido seleccionado."
    fi
}

main() {
    read -p "¿Quieres instalar las dependencias del proyecto localmente? (y/n): " install_local

    if [[ "$install_local" =~ ^[Yy]$ ]]; then
        # Check if Python command is available
        if command -v python3 &> /dev/null || command -v py &> /dev/null; then
            echo "Python encontrado."
            if [ -d "backend" ]; then
                install_pip_dependencies "backend"
            else
                echo "Error: directorio 'backend' no encontrado."
                exit 1
            fi
        else
            echo "Python no encontrado. Saliendo."
            exit 1
        fi

        # Check if npm command is available
        if command -v npm &> /dev/null; then
            echo "npm encontrado."
            if [ -d "frontend" ]; then
                install_node_dependencies "frontend"
            else
                echo "Error: directorio 'frontend' no encontrado."
                exit 1
            fi
        else
            echo "npm no encontrado. Por favor, instala Node.js y npm para continuar."
            exit 1
        fi
    else
        echo "No se instalarán las dependencias localmente."
    fi

    get_api_key
    check_docker_engine

    read -p "¿Quieres ejecutar el proyecto? (y/n): " run_project
    if [[ "$run_project" =~ ^[Yy]$ ]]; then
        read -p "¿En qué modo quieres ejecutar el proyecto? (dev/prod): " mode
        if [[ $(uname) == "MINGW"* ]]; then
            open_docker_desktop
        fi
        run_docker "$mode"
    fi

    read -rp "Presiona Enter para salir..." input
}

main

