#!/usr/bin/env bash

ROOT_DIR=$(pwd)

# Function to install Python dependencies
install_pip_dependencies() {
    local path=$1
    # Check if a virtual environment already exists
    if [ ! -d "$path/venv" ]; then
        echo "Creating virtual environment at $path..."
        cd "$path" || exit
        python3 -m venv venv || py -m venv venv

        # Activate the virtual environment and install backend dependencies
        source venv/bin/activate || call venv/Scripts/activate
        pip install --upgrade pip
        pip install -r requirements.txt

        # Deactivate the virtual environment
        deactivate
        cd "$ROOT_DIR"
        echo "Pip dependencies installed for $path."
    else
        echo "$path: virtual environment already exists."
    fi
}

# Function to install Node.js dependencies
install_node_dependencies() {
    local path=$1
    # Check if node_modules already exist
    if [ ! -d "$path/node_modules" ]; then
        # Install dependencies
        echo "Installing dependencies for $path..."
        cd "$path" || exit
        npm install 
        cd "$ROOT_DIR"
        echo "Dependencies installed for $path."
    else
        echo "$path: dependencies already exist."
    fi
}

# Check if Python command is available
if command -v python3 &> /dev/null || command -v py &> /dev/null ; then
    echo "You have Python!"
    # Install backend dependencies for api_rag
    install_pip_dependencies "backend/api_rag"
else
    echo "You don't have Python. Exiting."
    exit 1
fi

# Check if npm command is available
if command -v npm &> /dev/null; then
    echo "You have npm!"
    # Check if frontend directory exists
    if [ -d "frontend" ]; then
        # Install frontend dependencies
        install_node_dependencies "frontend"
    else
        echo "Error: 'frontend' directory not found."
    fi
    # Check if backend/api_crud directory exists
    if [ -d "backend/api_crud" ]; then
        # Install backend dependencies for api_crud
        install_node_dependencies "backend/api_crud"
    else
        echo "Error: 'backend/api_crud' directory not found."
    fi
else
    echo "You don't have npm. Please install Node.js and npm to continue."
    exit 1
fi

# Wait for user input to exit
read -rp "Press Enter to exit..." input

